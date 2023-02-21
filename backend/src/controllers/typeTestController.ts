import { NextFunction, Request, Response } from 'express';
import { getTypeName } from '../utils/getTypeName';
import { validateSchema } from '../utils/validateSchema';
import { astFromValue, buildSchema, GraphQLObjectType } from 'graphql'

export const generateTypeTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { schema } = req.body;
  try {
    /*VALIDATING AND BUILDLING OUR SCHEMA */

    validateSchema(schema);
    if (!validateSchema) {
      throw new Error('Schema is invalid GraphQL Schema');
    }
    const typeName = getTypeName(schema);
    if (!typeName) {
      throw new Error('Schema is invalid GraphQL Schema');
    }
    const schemaBuilt = buildSchema(schema)

    /* FILTERING SCHEMA TYPE MAP TO ONLY INCLUDE OUR OBJECT TYPES THAT WE WANT TO TEST */
    const types = Object.values(schemaBuilt.getTypeMap()).filter(
        (type) => !type.name.startsWith('__') && type.constructor.name === 'GraphQLObjectType')


        
    /* CREATING AN ARRAY OF TYPE NAMES AND THEIR FIELDS WITH THEIR RESPECTIVE TYPES */    
    let tests: any = [];
    types.forEach((type) => {
      //@ts-ignore
      let name = typeName; console.log('NAME', name);
      //@ts-ignore
      let obj = {type : {}}
      //@ts-ignore
      for (let i = 0; i < type.astNode.fields.length; i++) {
        //@ts-ignore
        obj.type[type.astNode.fields[i].name.value] = type.astNode.fields[i].type.name.value
      }
      tests.push(obj)
    })

    /* THIS FUNCTION FORMATS THE TEST OBJECT INTO ACTAUL JEST TESTS' */
    const formattedTests = types.map((type, i) => {
      let fields = Object.entries(tests[i].type).map(([key, value]) => `${key} : ${value}`).join(',');
      return {test:`it('check if type ${type.name} has correct fields', () => {
        expect(${type.name}.toBe(${fields}))
      })
    `}
    }).map(obj => obj.test).join('\n');
   
    /*SENDING OUR RESPONSE */
    res.status(200).json(formattedTests);


  } catch (err) {
    return next(err);
  }
};

// type TeamType {
//   id: Int
//   name: String
//   link: String
// }



// it('check if type Team has correct fields', () => {
// expect(TeamType).toBe({
//   id: Int
//   name: String
//   link: String
// })
// })

// {TeamType: {id: Int, name: String, link: String}}
