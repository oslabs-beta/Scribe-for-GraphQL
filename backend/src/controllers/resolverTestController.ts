import { NextFunction, Request, Response } from 'express';

export const generateResolverTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { schema, resolvers } = req.body;
  try {
    console.log(req.body);
    console.log('stringify', resolvers);
    resolvers = resolvers.concat('\n resolvers;');
    resolvers = eval(resolvers);

    let onlyQueries: Object[] = [];

    let onlyMutations: Object[] = [];

    let onlyResolvers: Object[] = [];

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
            //@ts-ignore
            onlyMutations.push({ funcName: funcName });
          }
        } else {
          //@ts-ignore
          for (let funcName in resolvers[key]) {
            //@ts-ignore
            onlyResolvers.push({ funcName: [funcName, key] });
          }
        }
      }
    };

    const generateTests = () => {
      let tests = {};
      let finalQueryIntTests: any = [];
      let finalMutationIntTests: any = [];
      sorter();
      console.log(onlyQueries, onlyMutations, onlyResolvers);
      const QueryIntegrationTestGenerator = (onlyQueries: Object[]) => {
        let queryIntegrationTests: string[] = [];
        let queryFrontBoiler: string = `//-> ensure packages are installed
import { describe, test, expect } from '@jest/globals'
import { gql } from 'apollo-server'
import { createTestServer } from '/*path to testServer*/'
        `;
        let queryDefinitions = Object.entries(onlyQueries)
          .map(([typeName, fields]) => {
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
describe("queries work as intended", () => {`;
        let integrationTests = Object.entries(onlyQueries)
          .map(([typeName, fields]) => {
            //@ts-ignore
            let name = fields.funcName;
            return `
  test("${name}_query returns the correct values", async () => {
    const { query } = createTestServer({
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
        console.log('TESTS', queryIntegrationTests);
        finalQueryIntTests.push(queryIntegrationTests.join('').toString());
        //@ts-ignore
        tests['queryIntTests'] = finalQueryIntTests.toString();
      };

      const MutationTestGenerator = (onlyMutations: Object[]) => {
        let mutationTests: string[] = [];
        let mutationFrontBoiler: string = `//-> ensure packages are installed
import { describe, expect, test } from '@jest/globals'
import { gql } from 'apollo-server'
import { createTestServer } from '*/path to testServer*/'
`;
        let mutationDefinitions = Object.entries(onlyMutations)
          .map(([typeName, fields]) => {
            //@ts-ignore
            console.log(typeName, fields);
            //@ts-ignore
            let name = fields.funcName;
            //@ts-ignore
            return `
const ${name}_mutation = gql\`
mutation {
    ${name}(/*INPUT*/) {
      /*DATA TO BE SENT BACK*/
    }
}
\`
        `;
          })
          .join('');
        let testFrontBoiler: string = `
describe("mutations work as intended", () => {
        `;
        let integrationTests = Object.entries(onlyQueries)
          .map(([typeName, fields]) => {
            //@ts-ignore
            let name = fields.funcName;
            return `
  test("${name}_mutation mutates data correctly and returns the correct values", async () => {
    const { mutate } = createTestServer({
        /* CONTEXT OBJECT - MOCK MUTATION CONTEXT REQUIREMENTS HERE */
      });
    const res = await mutate({query: ${name}_mutation});
    expect(res).toMatchSnapshot(); // -> first test run will always pass
  })`;
          })
          .join('');
        let testEndBoiler: string = `
})`;
        let mutationEndBoiler: string = ``;
        mutationTests.push(mutationFrontBoiler);
        mutationTests.push(mutationDefinitions);
        mutationTests.push(testFrontBoiler);
        mutationTests.push(integrationTests);
        mutationTests.push(testEndBoiler);
        mutationTests.push(mutationEndBoiler);
        finalMutationIntTests.push(mutationTests.join('').toString());
        //@ts-ignore
        tests['mutationIntTests'] = finalMutationIntTests.toString('');
      };

      const ResolverTestGenerator = (onlyResolvers: Object[]) => {
        let resolverTests: string[] = [];
        let resolverFrontBoiler: string = `//-> ensure packages are installed
import { describe, test, expect } from '@jest/globals'
const resolvers = require(/*path to resolvers*/)

describe ('resolvers return the correct values', ()=> {`;

        let resolverEndBoiler: string = `
})`;

        let resolverUnits = Object.entries(onlyResolvers)
          .map(([typeName, fields]) => {
            //@ts-ignore
            let name = fields.funcName[0];
            //@ts-ignore
            let pre = fields.funcName[1];
            return `
  test('Resolver ${pre}.${name} works as intended', () => {
    const result = resolvers.${pre}.${name}(/*resolver mock parameters*/)
            
    expect(result).toEqual(/*expected result*/)
  })`;
          })
          .join('');

        resolverTests.push(resolverFrontBoiler);
        resolverTests.push(resolverUnits);
        resolverTests.push(resolverEndBoiler);
        console.log(resolverUnits);
        //@ts-ignore
        tests['resolverUnitTests'] = resolverTests.join('').toString();
      };
      QueryIntegrationTestGenerator(onlyQueries); // -> dropdown: Query Mock Integration Tests | queryIntTests
      MutationTestGenerator(onlyMutations); // -> dropdown: Mutation Mock Integration Tests | mutationIntTests
      ResolverTestGenerator(onlyResolvers); // -> dropdown: Resolver Unit Tests | resolverUnitTests
      //@ts-ignore
      return tests; //{'queryIntTests': [], 'mutationIntTests': [], 'resolverUnitTests': []}
    };

    return res.status(200).json(generateTests());
  } catch (error) {
    return next(error);
  }
};
