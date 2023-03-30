import { NextFunction, Response, Request } from 'express';
import { prisma } from '..';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};
