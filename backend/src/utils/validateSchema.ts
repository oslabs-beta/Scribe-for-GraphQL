const { buildSchema, parse } = require('graphql');

export const validateSchema = (schemaString: any) => {
  try {
    const schemaAST = parse(schemaString);
    const schema = buildSchema(schemaAST);
    console.log(schema);
    return true;
  } catch (error) {
    return false;
  }
};
