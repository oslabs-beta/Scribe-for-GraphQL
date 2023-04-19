import { NextFunction, Request, Response } from 'express';

export const generateResolverTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { schema, resolvers } = req.body;
  try {
    console.log(req.body);
    // resolvers = JSON.stringify(schema)
    console.log('stringify', resolvers);
    resolvers = resolvers.concat('\n resolvers;'); //need frontend to send resolvers instead of schema
    resolvers = eval(resolvers);

    let onlyQueries: Object[] = []; //-> {Query: { arrow function: return , arrow function return , arrow function return, arrow function return}}

    let onlyMutations: Object[] = []; //-> {Mutation: { arrow function: return , arrow function return , arrow function return, arrow function return}}

    let onlyResolvers: Object[] = []; //-> {}

    const sorter = () => {
      for (let key in resolvers) {
        console.log('KEY', key);
        if (key === 'Query') {
          console.log(key);
          //@ts-ignore
          for (let funcName in resolvers[key]) {
            console.log('funcName', funcName);
            //@ts-ignore
            onlyQueries.push({ funcName: funcName });
          }
        } else if (key === 'Mutation') {
          //@ts-ignore
          for (let funcName in resolvers[key]) {
            // console.log('funcName', funcName)
            //@ts-ignore
            onlyMutations.push({ funcName: funcName });
          }
        } else {
          //@ts-ignore
          for (let funcName in resolvers[key]) {
            // console.log('funcName', funcName)
            //@ts-ignore
            onlyResolvers.push({ funcName: funcName });
          }
        }
      }
    };

    const generateTests = () => {
      let tests: String[] = [];
      sorter();
      console.log(onlyQueries, onlyMutations, onlyResolvers);
      const QueryIntegrationTestGenerator = (onlyQueries: Object[]) => {
        let queryIntegrationTests: string[] = [];
        let queryFrontBoiler: string = `//-> npm install
//-> npm install
const { expect } = require("@jest/globals");
const gql = require("graphql-tag");
const createTestServer = require(/*path to testServer*/);
        `;
        let queryDefinitions = Object.entries(onlyQueries)
          .map(([typeName, fields]) => {
            //@ts-ignore
            //@ts-ignore
            let name = fields.funcName;
            console.log('hi', name);
            //@ts-ignore
            return `
const ${name}_query = gql\`
/* QUERY STRING*/
\`
          `;
          })
          .join('');
        console.log('queryDefs', queryDefinitions);

        let testFrontBoiler: string = `
describe("queries", () => {`;
        let integrationTests = Object.entries(onlyQueries)
          .map(([typeName, fields]) => {
            //@ts-ignore
            let name = fields.funcName;
            return `
  test("${name}_query returns the correct values", async () => {
    const {query} = createTestServer({
        /*CONTEXT OBJECT - MOCK QUERY/RESOLVER CONTEXT REQUIREMENTS */
      });
    const res = await query({query: ${name}_query});
    expect(res).toMatchSnapshot(); // -> first run will always pass
  })`;
          })
          .join('');
        let testEndBoiler: string = `
})`;
        queryIntegrationTests.push(queryFrontBoiler);
        queryIntegrationTests.push(queryDefinitions);
        queryIntegrationTests.push(testFrontBoiler);
        queryIntegrationTests.push(integrationTests);
        queryIntegrationTests.push(testEndBoiler);
        let queryEndBoiler: string = ``;
        let queryMid: string = ``;
        console.log('TESTS', queryIntegrationTests);
        tests.push(queryIntegrationTests.join('').toString());
      };

      const MutationTestGenerator = (onlyMutations: Object[]) => {
        let mutationTests: string[] = [];
        let mutationFrontBoiler: string = ``;
        mutationTests.push(mutationFrontBoiler);
        let mutationEndBoiler: string = ``;
        /*

        Test Generation Logic Here

        */
        mutationTests.push(mutationEndBoiler);
        tests.push(mutationTests.toString());
      };

      const ResolverTestGenerator = (onlyResolvers: Object[]) => {
        let resolverTests: string[] = [];
        let resolverFrontBoiler: string = ``;
        resolverTests.push(resolverFrontBoiler);
        let resolverEndBoiler: string = ``;
        /*

        Test Generation Logic Here

        */
        resolverTests.push(resolverEndBoiler);
        tests.push(resolverTests.toString());
      };
      QueryIntegrationTestGenerator(onlyQueries);
      return tests.toString();
    };

    return res.status(200).json(generateTests());
  } catch (error) {
    return next(error);
  }
};
