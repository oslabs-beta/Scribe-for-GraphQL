import { NextFunction, Request, Response } from 'express';
import { getTypeName } from '../utils/getTypeName';
import { validateSchema } from '../utils/validateSchema';
import { buildSchema, Source, parse } from 'graphql'


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

    function generateTypeTests(schema: any) {
      const ast = parse(schema);
      console.log('ast', ast.definitions) // TYPES
      //@ts-ignore
      console.log('ast fields', ast.definitions[0].fields[1])

      const typeDefs = ast.definitions.reduce((acc, def) => {
        if (def.kind === 'ObjectTypeDefinition') {
          //@ts-ignore
          const fields = def.fields.map((field) => ({
            name: field.name.value,
            //@ts-ignore
            type: field.type.type?.name.value ? field.type.type.name.value : field.type.name.value,
          }));
          //@ts-ignore
          acc[def.name.value] = fields;
        }
        return acc;
      }, {});

      const tests = Object.entries(typeDefs).map(([typeName, fields]) => {
        return `
            test('${typeName} should have the correct types', () => {
              const type = schema.getType('${typeName}');
              expect(type).toBeDefined();
              ${/*@ts-ignore*/''}
              ${fields
                .map((field: any) => {
                  return `
                    expect(type.getFields().${field.name}.type.name).toBe('${
                    field.type
                  }');
                  `;
                })
                .join('')}
            });
          });
        `;
      });
      const boilerplate = `describe('Schema Types Are Correct', () => {
        const schema = makeExecutableSchema({ typeDefs });`
      const endboiler = `
      });`
      // console.log(tests)
      tests.unshift(boilerplate)
      tests.push(endboiler);
      console.log('tests after:', tests.toString());
      return tests.toString();
    }

    return res.status(200).json(generateTypeTests(schema))
    
  } catch (err) {
    return next(err);
  }
};

/*
describe('Schema Types Are Correct', () => {
  const schema = makeExecutableSchema({ typeDefs });
  
  test('type such and such should have the correct types', () => {
    const TeamType = schema.getType('TeamType');
    expect(TeamType).toBeDefined();
    expect(TeamType.getFields().id.type.name).toBe('Int');
    expect(TeamType.getFields().name.type.name).toBe('String');
    expect(TeamType.getFields().link.type.name).toBe('Int');
  });
  
  test('type so and so should have the correct types', () => {
    const StatsType = schema.getType('StatsType');
    expect(StatsType).toBeDefined()
    ...
  })
  
  
  
});


      // const types = Object.values(schemaBuilt.getTypeMap()).filter(
      //     (type) => !type.name.startsWith('__') && type.constructor.name === 'GraphQLObjectType')
      
      // console.log(types)
      
          
      // /* CREATING AN ARRAY OF TYPE NAMES AND THEIR FIELDS WITH THEIR RESPECTIVE TYPES */    
      // let tests: any = [];
      // types.forEach((type) => {
      //   //@ts-ignore
      //   let name = typeName; 
      //   //@ts-ignore
      //   let obj = {type : {}}
      //   //@ts-ignore
      //   for (let i = 0; i < type.astNode.fields.length; i++) {
      //     //@ts-ignore
      //     console.log(`TYPE FIELDS FOR ${name}:`, type.astNode.fields)
      //     //@ts-ignore
      //     obj.type[type.astNode.fields[i].name.value] = type.astNode.fields[i].type.name.value
      //   }
      //   tests.push(obj)
      // })
      
      // console.log('tests', tests)
      
      // /* THIS FUNCTION FORMATS THE TEST OBJECT INTO ACTAUL JEST TESTS' */
      // const formattedTests = types.map((type, i) => {
      //   let fields = Object.entries(tests[i].type).map(([key, value]) => `${key} : ${value}`);
      //   return {test:`it('check if type ${type.name} has correct fields', () => {
      //     expect(${type.name}.toBe(${fields}))
      //   })
      // `}
      // }).map(obj => obj.test).join('\n');
      
      // console.log('tests', formattedTests)
      // /*SENDING OUR RESPONSE */
      // res.status(200).json(formattedTests);