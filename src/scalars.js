import { GraphQLScalarType, Kind } from "graphql";

export const Long = new GraphQLScalarType({
  name: "Long",
  description: "Long integer scalar type",
  serialize(value) {
    return Number(value);
  },
  parseValue(value) {
    return BigInt(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      return BigInt(ast.value);
    }
    return null;
  },
});

export const JSON = new GraphQLScalarType({
  name: "JSON",
  description: "JSON scalar type",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return typeof value === "string" ? JSON.parse(value) : value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return JSON.parse(ast.value);
    }
    return null;
  },
});
