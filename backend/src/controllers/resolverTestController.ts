import { NextFunction, Request, Response } from 'express';
import { getTypeName } from '../utils/getTypeName';
import { validateSchema } from '../utils/validateSchema';
import { buildSchema, Source, parse } from 'graphql';
// allows use of addMocksToSchema function that takes in a schema and creates a make database
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';


export const generateResolverTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const { schema, resolvers } = req.body; 
    try {

    console.log('resolvers', resolvers)


    const ResolverFrontBoiler = `describe('Resolvers return the correct information', () => {
        const schema = makeExecutableSchema({ schema, resolvers })
        const mocks = {
            Int: () => 6,
            Float: () => 22.7,
            String: () => 'Hello',
          };`    
    const ResolverEndBoiler = `
    })`    
    res.status(200).json(resolvers)
    } catch (error) {
        return next(error);
    }

}


/*

const testResolver = async (resolver: Function, args: any, context: Object, expected: Object) => {
            const output = await resolver(null, args, context)
            expect(output).toEqual(expected);

        }

        test('RESOLVERNAME returns the correct information', async () => {
            const args = { 'USER ARG?'}
            const context = { ' USER CONTEXT?'}
            const expected = { ' USER EXPECTED? '}
            const output = await testResolver(RESOLVERNAME, args, context, expected);
        })


*/