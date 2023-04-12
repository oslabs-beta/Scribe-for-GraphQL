const { ApolloServer } = require("apollo-server");
const { createTestClient } = require("apollo-server-test");
const typeDef = require("../schema2/schema");
const typeDefs = require("../schema1/schema");

const resolvers = require("../schema1/resolvers");
const resolver = require("../schema2/resolver");

const createTestServer1 = (context) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false,
    mocks: true,
    context: () => context,
  });
  return createTestClient(server);
};

const createTestServer2 = (context) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false,
    mocks: true,
    context: () => context,
  });
  return createTestClient(server);
};
