//-> npm install
//-> npm install
const { expect } = require("@jest/globals");
const gql = require("graphql-tag");
const createTestServer = require(/*path to testServer*/);

const QUERY_NAME = gql`
/* QUERY STRING */
`;

const QUERY2_NAME = gql`
/* QUERY STRING */
`;
/*NOTE IN INSTRUCTIONS THAT THE FIRST TEST WILL PASS AUTOMATICALLY WITH MATCH SNAPSHOT */
describe("queries", () => {
  test("QUERY_NAME", async () => {
    const { query } = createTestServer({
      /* CONTEXT OBJECT - MOCK QUERY/RESOLVER CONTEXT REQUIREMENTS HERE */
    });
    const res = await query({ query: QUERY_NAME });
    expect(res).toMatchSnapshot();
  });

  test("QUERY2_NAME", async () => {
    const { query } = createTestServer({
      /* CONTEXT OBJECT - MOCK QUERY/RESOLVER CONTEXT REQUIREMENTS HERE */
    });
    const res = await query({ query: QUERY2_NAME });
    expect(res).toMatchSnapshot();
  });
});
