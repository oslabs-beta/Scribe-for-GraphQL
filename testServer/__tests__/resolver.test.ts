import { describe, expect, test } from "@jest/globals";
const typeDef = require("../schema2/schema");
const resolver = require("../schema2/resolver");
import * as casual from "casual";

const testResolver = async (resolverFunction, args, context, expected) => {
  const output = await resolverFunction(null, args, context);
  expect(output).toEqual(expected);
};

describe("Resolvers should return the correct values", () => {
  test("Resolver should return the correct value", async () => {
    const args = {
      title: casual.title,
      authorId: casual.uuid,
      genre: casual.word,
    };
    const context = {}; // If you have a context, define it here
    const expected = {};

    const output = await testResolver(resolver.Post, args, context, expected);
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
