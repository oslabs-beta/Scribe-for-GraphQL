import express from "express";
import { ApolloServer } from "apollo-server-express";
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen(4000, () => {
  console.log("testServer running on port 4000");
  console.log(
    `🚀 GraphQL endpoint available at http://localhost:4000${server.graphqlPath}`
  );
});
