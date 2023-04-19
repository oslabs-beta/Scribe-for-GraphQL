const { ApolloServer } = require("apollo-server");
const { createTestClient } = require("apollo-server-test");
const typeDefs = require(/* path to schema */);
const resolvers = require(/* path to resolvers */);

const createTestServer = (cntext) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false, // -> since we are passing in a schema and resolvers, we need this to be false
    mocks: true, // -> mocks random data according to type definitions in schema
    context: () => cntext,
  });

  return createTestClient(server);
};

module.exports = createTestServer;

//INCLUDE IN INSTRUCTIONS
