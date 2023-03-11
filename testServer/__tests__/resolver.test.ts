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

describe("Resolvers", () => {
  Object.keys(resolvers).forEach((type) => {
    describe(type, () => {
      Object.keys(resolvers[type]).forEach((fieldName) => {
        const resolver = resolvers[type][fieldName];
        test(`Resolver ${type}.${fieldName} should resolve`, async () => {
          // Generate mock arguments for the resolver
          const args = {};
          if (resolver.length > 1) {
            const argNames = resolver
              .toString()
              .match(/\((.*?)\)/)[1]
              .split(",")
              .map((arg) => arg.trim());
            argNames.forEach((argName) => {
              args[argName] = casual.word;
            });
          }

          // Call the resolver function with the mock arguments
          const result = await resolver(null, args, { schema: mockedSchema });

          // Expect the resolver to return a value
          expect(result).toBeDefined();
        });
      });
    });
  });
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
