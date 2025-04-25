import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import DataSource from "./dataLoader.js";
import authenticate from "./auth.js";
import authDirective from "./directives/auth.js";

const dataSources = new DataSource();

const { authDirectiveTransformer } = authDirective();

async function startServer() {
  let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  schema = authDirectiveTransformer(schema);

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const user = authenticate(req);
      return {
        user,
        token: req.headers.authorization?.split(" ")[1] || "",
        dataSources: {
          getAllNodes: () => dataSources.getAllNodes(),
          getAllActions: () => dataSources.getAllActions(),
          getAllResponses: () => dataSources.getAllResponses(),
          getAllTriggers: () => dataSources.getAllTriggers(),
          getNodeById: (id) => dataSources.getNodeById(id),
          getTriggerById: (id) => dataSources.getTriggerById(id),
          getResponseById: (id) => dataSources.getResponseById(id),
          getActionById: (id) => dataSources.getActionById(id),
          getResourceTemplateById: (id) =>
            dataSources.getResourceTemplateById(id),
          getAllResourceTemplates: () => dataSources.getAllResourceTemplates(),
        },
      };
    },
  });

  console.log(`--> Server running at ${url}`);
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
