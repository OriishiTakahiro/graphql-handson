import fastify, { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import mercurius from "mercurius";
import resolvers from "./resolvers";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { join } from "path";

const schema = loadSchemaSync(join(__dirname, "../../schema/post.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: false });

app.register(mercurius, {
  schema,
  resolvers,
});

app.get("/health", async (_req, _rep) => {
  return "ok";
});

app.listen({ port: 8080, host: "::" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server started at ${address}`);
});
