const graphql = require("graphql");
const { gql } = require("apollo-server");
const { makeExecutableSchema } = require("graphql-tools");
// const { validate } = require("graphql/validation");
// const fetch = require('node-fetch')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLBoolean,
} = graphql;

const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author: Author!
    genre: String
  }

  type Author {
    id: ID
    name: String
    books: [Book!]
  }

  type User {
    id: ID
    name: String!
    email: String
    age: Int
    favoriteBook: Book!
  }

  type Query {
    allBooks: [Book]
    book(id: ID): Book
    allAuthors: [Author]
    author(id: ID): Author!
    allUsers: [User]
    user(id: ID): User
  }

  type Mutation {
    createBook(title: String!, authorId: ID!, genre: String!): Book!
    updateBook(id: ID!, title: String, authorId: ID, genre: String): Book!
    deleteBook(id: ID!): Book!
    createUser(
      name: String!
      email: String!
      age: Int
      favoriteBookId: ID
    ): User!
    updateUser(
      id: ID!
      name: String
      email: String
      age: Int
      favoriteBookId: ID
    ): User!
    deleteUser(id: ID!): User!
  }
`;

/* ROOT QUERY */
module.exports = typeDefs;
