//> npm install graphql-tools @jest/globals jest babel-jest
//> for typescript tests, npm install ts-jest @types/jest
import { describe, expect, test } from "@jest/globals";
const { makeExecutableSchema, addMocksToSchema } = require("graphql-tools");
const typeDefs = require("../schema");

describe("Schema Types Are Correct", () => {
  const schema = makeExecutableSchema({ typeDefs });
  test("Book should have the correct types", () => {
    const type = schema.getType("Book");
    expect(type).toBeDefined();

    expect(type.getFields().id.type.name).toBe("ID");
    expect(type.getFields().title.type.name).toBe("String");
    expect(type.getFields().author.type.name).toBe("Author");
    expect(type.getFields().genre.type.name).toBe("String");
  }),
    test("Author should have the correct types", () => {
      const type = schema.getType("Author");
      expect(type).toBeDefined();

      expect(type.getFields().id.type.name).toBe("ID");
      expect(type.getFields().name.type.name).toBe("String");
      expect(JSON.stringify(type.getFields().books.type)).toBe(
        JSON.stringify("[Book]")
      );
    });
  test("User should have the correct types", () => {
    const type = schema.getType("User");
    expect(type).toBeDefined();

    expect(type.getFields().id.type.name).toBe("ID");
    expect(type.getFields().name.type.name).toBe("String");
    expect(type.getFields().email.type.name).toBe("String");
    expect(type.getFields().age.type.name).toBe("Int");
    expect(type.getFields().favoriteBook.type.name).toBe("Book");
  });
  test("Query should have the correct types", () => {
    const type = schema.getType("Query");
    expect(type).toBeDefined();

    expect(JSON.stringify(type.getFields().allBooks.type)).toBe(
      JSON.stringify("[Book]")
    );
    expect(type.getFields().book.type.name).toBe("Book");
    expect(JSON.stringify(type.getFields().allAuthors.type)).toBe(
      JSON.stringify("[Author]")
    );
    expect(type.getFields().author.type.name).toBe("Author");
    expect(JSON.stringify(type.getFields().allUsers.type)).toBe(
      JSON.stringify("[User]")
    );
    expect(type.getFields().user.type.name).toBe("User");
  });
});
