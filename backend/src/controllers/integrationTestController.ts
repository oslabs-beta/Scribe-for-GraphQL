import { NextFunction, Request, Response } from 'express';

export const generateIntegrationTests = async (
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
  } catch (error) {
    return next(error);
  }
};
