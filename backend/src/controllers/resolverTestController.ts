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
    console.log('eval', resolvers.Query.allBooks);

    let onlyQueries: Object[] = []; //-> {Query: { arrow function: return , arrow function return , arrow function return, arrow function return}}

    let onlyMutations: Object[] = []; //-> {Mutation: { arrow function: return , arrow function return , arrow function return, arrow function return}}

    let onlyResolvers: Object[] = []; //-> {}

    const sorter = () => {
      for (let key of resolvers) {
        if (key === 'Query') {
          for (let funcName of key) {
            onlyQueries.push({ funcName: key[funcName] });
          }
        } else if (key === 'Mutation') {
          for (let funcName of key) {
            onlyMutations.push({ funcName: key[funcName] });
          }
        } else {
          for (let funcName of key) {
            onlyResolvers.push({ funcName: key[funcName] });
          }
        }
      }
    };

    const generateTests = () => {
      let tests: String[] = [];
      sorter();
      const QueryTestGenerator = (onlyQueries: Object[]) => {
        let queryTests: string[] = [];
        let queryFrontBoiler: string = ``;
        queryTests.push(queryFrontBoiler);
        let queryEndBoiler: string = ``;
        /*

        Test Generation Logic Here

        */
        queryTests.push(queryEndBoiler);
        tests.push(queryTests.toString());
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
      QueryTestGenerator(onlyQueries);
      MutationTestGenerator(onlyMutations);
      ResolverTestGenerator(onlyResolvers);
      const AllFrontBoiler = `//> npm install graphql-tools
      //> npm install casual
      const typeDefs = require(/* schema file */)
      const resolvers = require(/* schema file */)
      
        `;
      const AllEndBoiler = ``;
      tests.unshift(AllFrontBoiler);
      tests.push(AllEndBoiler);
      return tests.toString();
    };

    return res.status(200).json(generateTests());
  } catch (error) {
    return next(error);
  }
};
