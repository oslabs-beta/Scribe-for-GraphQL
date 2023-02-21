import { NextFunction, Request, Response } from 'express';
import { getTypeName } from '../utils/getTypeName';
import { validateSchema } from '../utils/validateSchema';
import { buildSchema, GraphQLObjectType } from 'graphql'

export const generateTypeTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { schema } = req.body;
  try {
    console.log('testing schema in postman', schema);
    validateSchema(schema);
    if (!validateSchema) {
      throw new Error('Schema is invalid GraphQL Schema');
    }
    const typeName = getTypeName(schema);
    if (!typeName) {
      throw new Error('Schema is invalid GraphQL Schema');
    }
    const schemaBuilt = buildSchema(schema)
    //create array of types from schema
    const types = Object.values(schemaBuilt.getTypeMap()).filter(
        (type) => !type.name.startsWith('__'))

    console.log('types in backend before array', types)
    //for each on that array, create an array of strings of tests where tests = [{type: 'test'}]
    //@ts-ignore
    let tests = types.filter((ele) => {
      console.log('element',ele)
      //@ts-ignore
      return ele.includes('isTypeOf')
    })
      .map((type) => {
      return {type: `
      it('check if type ${type.name} has correct fields', () => {
        expect(${type.name}.toBe(${type.astNode}))
      })
    `}
    })
    console.log('tests to be printed', tests)
    res.status(200).json({
      test: `
        it('check if type ${typeName} has correct fields', () => {
          expect(${typeName}.toBe(${schema}))
        })
      `,
    });


  } catch (err) {
    return next(err);
  }
};

// type TeamType {
//   id: Int
//   name: String
//   link: String
// }

// {TeamType: {id: Int, name: String, link: String}}

// it('check if type Team has correct fields', () => {
// expect(TeamType).toBe({
//   id: Int
//   name: String
//   link: String
// })
// })
