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
    // Free Bird
    const schemaBuilt = buildSchema(schema)
    //Free Bird
    
    const nestedTypes = (field: any) => {
      let resultType = '';
      let currentNode = field.loc.startToken

      //@ts-ignore
      let start = field.loc.start
      //@ts-ignore
      let end = field.loc.end

      for (let i = field.loc.start; i <= end; i) {
        if (currentNode.kind === '}' || currentNode.kind === ':') return resultType
        let iterate = currentNode.end - currentNode.start
        if (currentNode.kind === 'Name') {
          resultType += currentNode.value
        } else {
          resultType += currentNode.kind
        }
        currentNode = currentNode.next
        i += iterate
      }
      console.log('RESULTS:', resultType)
      return resultType
    }
    
   // Free Bird,  
    function generateTypeTests(schema: string) {
      const ast = parse(schema); //converts to AST
      console.log('ast', ast.definitions) // TYPES
      //@ts-ignore
      console.log('startToken LOC, field 1', ast.definitions[0].fields[1].type)
      //@ts-ignore
      console.log('startToken LOC, field 2', ast.definitions[1].fields[2].type)
      
      //@ts-ignore
      // console.log('start token next next', ast.definitions[1].fields[1].type.loc.startToken.next.next)
      //@ts-ignore
      console.log('TESTING', nestedTypes(ast.definitions[1].fields[2].type));
      
      const typeDefs = ast.definitions.reduce((acc: any, def: any) => {
        if (def.kind === 'ObjectTypeDefinition') {
          //@ts-ignore
          const fields = def.fields.map((field) => ({
            name: field.name.value,
            //@ts-ignore
            type: field.type.type?.kind ? nestedTypes(field.type.type) : field.type.name.value,
          }));
          //@ts-ignore
          acc[def.name.value] = fields;
        
        }
        return acc;
      }, {});
      console.log('typeDefs', typeDefs)
      const tests = Object.entries(typeDefs).map(([typeName, fields]) => {
        return `
            test('${typeName} should have the correct types', () => {
              const type = schema.getType('${typeName}');
              expect(type).toBeDefined();
              ${/*@ts-ignore*/''}
              ${fields
                .map((field: any) => {
                  if (Array.isArray(field.type)) {
                    //NEED TO ACCOUNT FOR EXCLAMATION POINTS HERE?
                    console.log('FIELD TYPE:', field.type)
                    return`expect(JSON.stringify(type.getFields().${field.name}.type)).toBe(JSON.stringify("[${field.type}]"));
                    `;
                  }      
                  else {
                  return `expect(type.getFields().${field.name}.type.name).toBe('${field.type}');
                `;
                }
                })
                .join('')}
              })`;
      });
      const boilerplate = `//> npm install graphql-tools
      const { makeExecutableSchema, addMocksToSchema } = require('graphql-tools');
      const typeDefs = require(/* schema file */)
      
      describe('Schema Types Are Correct', () => {
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