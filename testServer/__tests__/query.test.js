const { jest, expect } = require("@jest/globals");
const gql = require("graphql-tag");
const { describe } = require("node:test");
const resolvers = require("../schema1/resolvers");
const createTestServer = require("./helper");
const QUERY = gql``;

describe("queries", () => {
  test("QUERY NAME", async () => {
    const { query } = createTestServer({
      //CONTEXT OBJECT
    });
    // const res = await query({query: /* QUERY VAR */})
  });
});

const FEED = gql`
  {
    feed {
      id
      message
      createdAt
      likes
      views
    }
  }
`;

describe("queries", () => {
  test("QUERY NAME", async () => {
    const { query } = createTestServer({
      user: { id: 1 },
      models: {
        Post: {
          findMany: jest.fn(() => [
            { id: 1, message: "hello", createdAt: "123" },
          ]), //RESOLVERS NEED TO RETURN SOMETHING
        },
      },
    });
    const res = await query({ query: FEED });
    expect(res).toMatchSnapshot();
  });
});

const CREATE_POST = gql`
  mutation {
    createPost(input: { message: "hello" }) {
      message
    }
  }
`;

describe("mutations", () => {
  test("QUERY NAME", async () => {
    const { mutate } = createTestServer({
      user: { id: 1 },
      models: {
        Post: {
          createOne() {
            return {
              message: "hello",
            };
          },
        },
        user: { id: 1 },
      },
    });
    const res = await mutate({ query: CREATE_POST });
    expect(res).toMatchSnapshot();
  });
});

//import resolvers

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
