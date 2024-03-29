//-> npm install
//-> npm install
// const { expect } = require("@jest/globals");
import { describe, test, expect } from "@jest/globals";
import { gql } from "apollo-server";
import { createTestServer } from "./testServer";

const MUTATION_NAME = gql`
mutation {
    MUTATIONfn(/*INPUT*/) {
        /* DATA SENT BACK */
    }
}
`;

const QUERY2_NAME = gql`
/* QUERY STRING */
`;
/*NOTE IN INSTRUCTIONS THAT THE FIRST TEST WILL PASS AUTOMATICALLY WITH MATCH SNAPSHOT */
describe("mutations", () => {
  test("MUTATION_NAME", async () => {
    const { mutate } = createTestServer({
      /* CONTEXT OBJECT - MOCK MUTATION CONTEXT REQUIREMENTS HERE */
    });
    const res = await mutate({ query: QUERY_NAME });
    expect(res).toMatchSnapshot();
  });

  test("QUERY2_NAME", async () => {
    const { query } = createTestServer({
      /* CONTEXT OBJECT - MOCK MUTATION CONTEXT REQUITEMENTS HERE */
    });
    const res = await query({ query: QUERY2_NAME });
    expect(res).toMatchSnapshot();
  });
});
