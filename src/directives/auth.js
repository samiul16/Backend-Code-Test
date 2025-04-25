import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";
import lodash from "lodash";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

const { head, intersection, size } = lodash;
const JWT_SECRET_KEY =
  process.env.JWT_SECRET_KEY ||
  "629e31fd1f5e6a0aa0f87c2eb6f206a3144eaa9e751c5c77b57c7dac993980f0";

export default function authDirective(directiveName = "auth") {
  const typeDirectiveArgumentMaps = {};

  return {
    authDirectiveTransformer: (schema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authDirective = head(getDirective(schema, type, directiveName));
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            head(getDirective(schema, fieldConfig, directiveName)) ??
            typeDirectiveArgumentMaps[typeName];

          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;

            fieldConfig.resolve = async function (source, args, context, info) {
              const token = context.token;
              if (!token) {
                throw new GraphQLError("Authentication token is required", {
                  extensions: { code: "UNAUTHENTICATED" },
                });
              }

              try {
                const decoded = jwt.verify(token, JWT_SECRET_KEY);

                const { roles: userRoles = [] } = decoded;
                const intersectingRoles = intersection(
                  authDirective.roles,
                  userRoles || []
                );

                if (size(authDirective.roles) && intersectingRoles.length <= 0)
                  throw new Error(401, "NOT_AUTHORIZED");

                context.user = decoded;
              } catch {
                throw new GraphQLError("Invalid or expired token", {
                  extensions: { code: "UNAUTHENTICATED" },
                });
              }

              return resolve(source, args, context, info);
            };
            return fieldConfig;
          }
        },
      }),
  };
}
