//> npm install graphql-tools @jest/globals jest babel-jest
//> for typescript tests, npm install ts-jest @types/jest
import { describe, expect, test } from "@jest/globals";
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("../schema1/schema");

describe("Schema Types Are Correct", () => {
  const schema = makeExecutableSchema({ typeDefs });
  test("Book should have the correct types", () => {
    const type = schema.getType("Book");
    expect(type).toBeDefined();

    expect(type.getFields().id.type.name).toBe("ID");
    expect(type.getFields().title.type.name).toBe("String");
    expect(JSON.stringify(type.getFields().author.type)).toBe(
      JSON.stringify("Author!")
    );
    expect(type.getFields().genre.type.name).toBe("String");
  }),
    test("Author should have the correct types", () => {
      const type = schema.getType("Author");
      expect(type).toBeDefined();

      expect(type.getFields().id.type.name).toBe("ID");
      expect(type.getFields().name.type.name).toBe("String");
      expect(JSON.stringify(type.getFields().books.type)).toBe(
        JSON.stringify("[Book!]")
      );
    }),
    test("User should have the correct types", () => {
      const type = schema.getType("User");
      expect(type).toBeDefined();

      expect(type.getFields().id.type.name).toBe("ID");
      expect(JSON.stringify(type.getFields().name.type)).toBe(
        JSON.stringify("String!")
      );
      expect(type.getFields().email.type.name).toBe("String");
      expect(type.getFields().age.type.name).toBe("Int");
      expect(JSON.stringify(type.getFields().favoriteBook.type)).toBe(
        JSON.stringify("Book!")
      );
    }),
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
      expect(JSON.stringify(type.getFields().author.type)).toBe(
        JSON.stringify("Author!")
      );
      expect(JSON.stringify(type.getFields().allUsers.type)).toBe(
        JSON.stringify("[User]")
      );
      expect(type.getFields().user.type.name).toBe("User");
    });

  test("Mutation should have the correct types", () => {
    const type = schema.getType("Mutation");
    expect(type).toBeDefined();

    expect(JSON.stringify(type.getFields().createBook.type)).toBe(
      JSON.stringify("Book!")
    );
    expect(JSON.stringify(type.getFields().updateBook.type)).toBe(
      JSON.stringify("Book!")
    );
    expect(JSON.stringify(type.getFields().deleteBook.type)).toBe(
      JSON.stringify("Book!")
    );
    expect(JSON.stringify(type.getFields().createUser.type)).toBe(
      JSON.stringify("User!")
    );
    expect(JSON.stringify(type.getFields().updateUser.type)).toBe(
      JSON.stringify("User!")
    );
    expect(JSON.stringify(type.getFields().deleteUser.type)).toBe(
      JSON.stringify("User!")
    );
  });
});
