import { describe, expect, test } from "@jest/globals";
const typeDef = require("../schema2/schema");
const resolver = require("../schema2/resolver");

describe("Resolvers should return the correct values", () => {
  test("Resolver should return the correct value", async () => {
    const args = {};
    const context = {}; // If you have a context, define it here
    const expected = {};
  });
});

describe("resolvers", () => {
  test("RESOLVER NAME", () => {
    const result = resolvers.Query.FEED(null, null, {
      models: {
        Post: {
          findMany() {
            return ["hello"];
          },
        },
      },
    });
    expect(result).toEqual(["hello"]);
  });
});
