
declare var require: NodeRequire;
declare var module: NodeModule;
const graphql = require('graphql')
const { gql } = require("apollo-server");
const { makeExecutableSchema } = require('graphql-tools')
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

const typeDefs = gql `
  type Book {
    id: ID!
    title: String!
    author: Author!
    genre: String!
  }

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    favoriteBook: Book
  }

  type Query {
    allBooks: [Book!]!
    book(id: ID!): Book
    allAuthors: [Author!]!
    author(id: ID!): Author
    allUsers: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createBook(title: String!, authorId: ID!, genre: String!): Book!
    updateBook(id: ID!, title: String, authorId: ID, genre: String): Book!
    deleteBook(id: ID!): Book!
    createUser(name: String!, email: String!, age: Int, favoriteBookId: ID): User!
    updateUser(id: ID!, name: String, email: String, age: Int, favoriteBookId: ID): User!
    deleteUser(id: ID!): User!
  }
`;



const resolvers = {
    Query: {
      allBooks: () => books,
      book: (parent, { id }) => books.find(book => book.id === id),
      allAuthors: () => authors,
      author: (parent, { id }) => authors.find(author => author.id === id),
      allUsers: () => users,
      user: (parent, { id }) => users.find(user => user.id === id),
    },
    Mutation: {
      createBook: (parent, { title, authorId, genre }) => {
        const book = { id: String(books.length + 1), title, authorId, genre };
        books.push(book);
        return book;
      },
      updateBook: (parent, { id, title, authorId, genre }) => {
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex === -1) throw new Error(`No book with id ${id}`);
        const book = { ...books[bookIndex], title, authorId, genre };
        books[bookIndex] = book;
        return book;
      },
      deleteBook: (parent, { id }) => {
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex === -1) throw new Error(`No book with id ${id}`);
        const deletedBook = books.splice(bookIndex, 1)[0];
        return deletedBook;
      },
      createUser: (parent, { name, email, age, favoriteBookId }) => {
        const user = { id: String(users.length + 1), name, email, age, favoriteBookId };
        users.push(user);
        return user;
      },
      updateUser: (parent, { id, name, email, age, favoriteBookId }) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) throw new Error(`No user with id ${id}`);
        const user = { ...users[userIndex], name, email, age, favoriteBookId };
        users[userIndex] = user;
        return user;
      },
      deleteUser: (parent, { id }) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) throw new Error(`No user with id ${id}`);
        const deletedUser = users.splice(userIndex, 1)[0];
        return deletedUser;
      },
    },
    Book: {
      author: (parent) => authors.find(author => author.id === parent.authorId),
    },
    Author: {
      books: (parent) => books.filter(book => book.authorId === parent.id),
    },
    User: {
      favoriteBook: (parent) => {
        if (!parent.favoriteBookId) return null;
        return books.find(book => book.id === parent.favoriteBookId);
      },
    },
  };

  const books = [
    { id: '1', title: 'The Great Gatsby', authorId: '1', genre: 'Fiction' },
    { id: '2', title: 'To Kill a Mockingbird', authorId: '2', genre: 'Fiction' },
    { id: '3', title: 'The Catcher in the Rye', authorId: '3', genre: 'Fiction' },
    { id: '4', title: '1984', authorId: '4', genre: 'Fiction' },
    { id: '5', title: 'Pride and Prejudice', authorId: '5', genre: 'Romance' },
  ];
  
  const authors = [
    { id: '1', name: 'F. Scott Fitzgerald' },
    { id: '2', name: 'Harper Lee' },
    { id: '3', name: 'J.D. Salinger' },
    { id: '4', name: 'George Orwell' },
    { id: '5', name: 'Jane Austen' },
  ];
  
  const users = [
    { id: '1', name: 'John', email: 'john@example.com', age: 30, favoriteBookId: '1' },
    { id: '2', name: 'Jane', email: 'jane@example.com', age: 25, favoriteBookId: '2' },
    { id: '3', name: 'Bob', email: 'bob@example.com', age: 35, favoriteBookId: '3' },
  ];

/* ROOT QUERY */
const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

module.exports = schema
