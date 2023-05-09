//-> npm install
const { expect } = require("@jest/globals");
const resolvers = require(/*path to resolvers*/);

describe("resolvers return the correct values", () => {
  test("RESOLVER_NAME", () => {
    const result = resolvers.RESOLVER_NAME(/*resolver mock parameters*/);

    expect(result).toEqual(/*expected result*/);
  });
  test("RESOLVER_NAME2", () => {
    const result = resolvers.RESOLVER_NAME(/*resolver mock parameters*/);

    expect(result).toEqual(/*expected result*/);
  });
});
