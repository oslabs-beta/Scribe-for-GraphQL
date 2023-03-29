import { describe, expect, test } from "@jest/globals";
const { makeExecutableSchema, addMocksToSchema } = require("graphql-tools");
const typeDefs = require("../schema");
const resolvers = require("../schema");
import * as casual from "casual";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const mocks = {
  String: () => casual.sentence,
  Int: () => casual.integer(1, 100),
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
};
const preserveResolvers = true;
const mockedSchema = addMocksToSchema({
  schema,
  mocks,
  preserveResolvers,
});

const testResolver = async (resolverFunction, args, context, expected) => {
  const output = await resolverFunction(null, args, context);
  expect(output).toEqual(expected);
};

describe("Mutations return the correct values", () => {
  test("createBook adds a new book to the list", async () => {
    const createBook = resolvers.createBook;
    const args = {
      title: casual.title,
      authorId: casual.uuid,
      genre: casual.word,
    };
    const context = {}; // If you have a context, define it here

    const newBook = await createBook(null, args, context);
    expect(newBook.title).toEqual(args.title);
    expect(newBook.authorId).toEqual(args.authorId);
    expect(newBook.genre).toEqual(args.genre);
  });

  // USER: Add more tests for different scenarios (e.g., error handling, edge cases)
});

// describe("Queries return the correct values", () => {
//     test("QUERY1 should return the correct value", () => {

//       })
//     test("QUERY2 should return the correct values", () => {

//     })

// });

// describe("Mutations return the correct values", () => {
//     test("MUTATION1 should return the correct value", () => {

//     })
//     test("MUTATION2 should return the correct values", () => {

//   })

// });

// describe("Resolvers return the correct values", () => {
//     const testResolver = async (resolver: Function, args: any, context: Object, expected: Object) => {
//         const output = await resolver(null, args, context)
//         expect(output).toEqual(expected);
//     }

//     test("RESOLVER1 should return the correct value", async () => {
//         let resolver; /* get from schema file */
//         const args = {/* USER ARGS */}
//             const context = mockedSchema
//             const expected = {/* USER EXPECTED */}
//             const output = await testResolver(resolver, args, context, expected);
//         })

//         test("RESOLVER2 should return the correct values", async () => {
//             let resolver; /* get from schema file */
//             const args = {/* USER ARGS */}
//                 const context = {/*USER CONTEXT */}
//                 const expected = {/* USER EXPECTED */}
//                 const output = await testResolver(resolver, args, context, expected);
//         })
//  });
