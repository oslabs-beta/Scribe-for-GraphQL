import { NextFunction, Request, Response } from 'express';

export const generateResolverTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { schema, resolvers } = req.body;
  try {
    const reqResolverJSON = {
      resolvers:
        'Query: { allBooks: () => books, book: (parent, { id }) => books.find(book => book.id === id), allAuthors: () => authors, author: (parent, { id }) => authors.find(author => author.id === id), allUsers: () => users, user: (parent, { id }) => users.find(user => user.id === id),}, Mutation: { createBook: (parent, { title, authorId, genre }) => { const book = { id: String(books.length + 1), title, authorId, genre }; books.push(book); return book; }, updateBook: (parent, { id, title, authorId, genre }) => { const bookIndex = books.findIndex(book => book.id === id); if (bookIndex === -1) throw new Error(`No book with id ${id}`); const book = { ...books[bookIndex], title, authorId, genre }; books[bookIndex] = book; return book;}, deleteBook: (parent, { id }) => { const bookIndex = books.findIndex(book => book.id === id); if (bookIndex === -1) throw new Error(`No book with id ${id}`); const deletedBook = books.splice(bookIndex, 1)[0]; return deletedBook;}, createUser: (parent, { name, email, age, favoriteBookId }) => { const user = { id: String(users.length + 1), name, email, age, favoriteBookId }; users.push(user); return user;}, updateUser: (parent, { id, name, email, age, favoriteBookId }) => { const userIndex = users.findIndex(user => user.id === id); if (userIndex === -1) throw new Error(`No user with id ${id}`); const user = { ...users[userIndex], name, email, age, favoriteBookId }; users[userIndex] = user; return user;}, deleteUser: (parent, { id }) => { const userIndex = users.findIndex(user => user.id === id); if (userIndex === -1) throw new Error(`No user with id ${id}`); const deletedUser = users.splice(userIndex, 1)[0]; return deletedUser;},}, Book: { author: (parent) => authors.find(author => author.id === parent.authorId),},Author: { books: (parent) => books.filter(book => book.authorId === parent.id),},User: { favoriteBook: (parent) => {if (!parent.favoriteBookId) return null; return books.find(book => book.id === parent.favoriteBookId);},},',
    };

    const reqResolver = { resolvers: JSON.parse(reqResolverJSON.resolvers) };

    let onlyQueries: Object[] = []; //-> {Query: { arrow function: return , arrow function return , arrow function return, arrow function return}}

    let onlyMutations: Object[] = []; //-> {Mutation: { arrow function: return , arrow function return , arrow function return, arrow function return}}

    let onlyResolvers: Object[] = []; //-> {}

    const sorter = () => {
      for (let key of reqResolver.resolvers) {
        if (key === 'Query') {
          for (let funcName of key) {
            onlyQueries.push({ funcName: key[funcName] });
          }
        } else if (key === 'Mutation') {
          for (let funcName of key) {
            onlyMutations.push({ funcName: key[funcName] });
          }
        } else {
          for (let funcName of key) {
            onlyResolvers.push({ funcName: key[funcName] });
          }
        }
      }
    };

    const generateTests = () => {
      let tests: String[] = [];
      sorter();
      const QueryTestGenerator = (onlyQueries: Object[]) => {
        let queryTests: string[] = [];
        let queryFrontBoiler: string = ``;
        queryTests.push(queryFrontBoiler);
        let queryEndBoiler: string = ``;
        /*

        Test Generation Logic Here

        */
        queryTests.push(queryEndBoiler);
        tests.push(queryTests.toString());
      };

      const MutationTestGenerator = (onlyMutations: Object[]) => {
        let mutationTests: string[] = [];
        let mutationFrontBoiler: string = ``;
        mutationTests.push(mutationFrontBoiler);
        let mutationEndBoiler: string = ``;
        /*

        Test Generation Logic Here

        */
        mutationTests.push(mutationEndBoiler);
        tests.push(mutationTests.toString());
      };

      const ResolverTestGenerator = (onlyResolvers: Object[]) => {
        let resolverTests: string[] = [];
        let resolverFrontBoiler: string = ``;
        resolverTests.push(resolverFrontBoiler);
        let resolverEndBoiler: string = ``;
        /*

        Test Generation Logic Here

        */
        resolverTests.push(resolverEndBoiler);
        tests.push(resolverTests.toString());
      };
      QueryTestGenerator(onlyQueries);
      MutationTestGenerator(onlyMutations);
      ResolverTestGenerator(onlyResolvers);
      const AllFrontBoiler = `//> npm install graphql-tools casual @jest/globals jest babel-jest
      //> for typescript tests, npm install ts-jest @types/jest
      const { makeExecutableSchema, addMocksToSchema } = require('graphql-tools');
      const typeDefs = require(/* schema file */)
      const resolvers = require(/* schema file */)
      import * as casual from "casual"
      
      describe('Queries, mutations, and other resolvers return the correct values', () => {
        const schema = makeExecutableSchema({ typeDefs, resolvers})
        const mocks = { 
          String: () => casual.sentence,
          Int: () => casual.integer(1,100),
          Float: () => 22.7,
          Boolean: () => casual.boolean,
          /*
          If you'd like more specific mocks for any of your fields, add them below, using this as an example:
          
          User: () => ({ 
            id: casual.uuid, 
            name: casual.name, 
            email: casual.email, 
            age: casual.integer(18,100),
          }),
      
          Please refer to the npm package 'casual' for random javascript generator calls.
          */
        }
        const preserveResolvers = true;
        const mockedSchema = addMocksToSchema({
          schema,
          mocks,
          preserveResolvers
        })`;
      const AllEndBoiler = `
    })`;
      tests.unshift(AllFrontBoiler);
      tests.push(AllEndBoiler);
      return tests.toString();
    };

    return res.status(200).json(generateTests());
  } catch (error) {
    return next(error);
  }
};

/*

const testResolver = async (resolver: Function, args: any, context: Object, expected: Object) => {
            const output = await resolver(null, args, context)
            expect(output).toEqual(expected);
        }

        test('RESOLVERNAME returns the correct information', async () => {
            const args = { 'USER ARG?'}
            const context = { ' USER CONTEXT?'}
            const expected = { ' USER EXPECTED? '}
            const output = await testResolver(RESOLVERNAME, args, context, expected);
        })

*/
