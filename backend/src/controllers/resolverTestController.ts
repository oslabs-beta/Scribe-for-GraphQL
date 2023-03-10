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


    const ResolverFrontBoiler = `describe('Resolvers return the correct values', () => {
        const schema = makeExecutableSchema({ typeDefs, resolvers})
        const mocks = { 
          String: () => casual.sentence,
          Int: () => casual.integer(1,100),
          Float: () => 22.7,
          Boolean: () => casual.boolean,
          /*
          If you'd like more specific mocks for any of your fields, add them below, using this as an example:
          
          User: () => ({ 
            id: casual.uuid, 
            name: casual.name, 
            email: casual.email, 
            age: casual.integer(18,100),
          }),
      
          Please refer to the npm package 'casual' for random javascript generator calls.
          */
        }
        const preserveResolvers = true;
        const mockedSchema = addMocksToSchema({
          schema,
          mocks,
          preserveResolvers
        })`    
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