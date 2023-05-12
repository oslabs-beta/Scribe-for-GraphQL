const { ApolloServer } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");
const typeDefs = require(/* path to schema */);
const resolvers = require(/* path to resolvers */);

export const createTestServer = (cntext) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false, // -> since we are passing in a schema and resolvers, we need this to be false
    mocks: true, // -> mocks random data according to type definitions in schema
    context: () => cntext,
  });

  return createTestClient(server);
};

//INCLUDE IN INSTRUCTIONS
