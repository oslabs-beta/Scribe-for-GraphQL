import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';
import { validateRegister } from '../utils/validateRegister';
import '../utils/types';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get response from req body
  const { name, email, password, confirmPassword } = req.body;
  try {
    const validated = validateRegister(name, email, password, confirmPassword);

    if (validated.errorMessage) {
      res.status(400);
      throw new Error(validated.errorMessage);
    }

    //make sure they dont exist in db
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    console.log('user: ', user);
    if (user) {
      res.status(400);
      throw new Error('user already exists');
    }
    //if they dont make new thing
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 12),
      },
    });
    console.log('newUser: ', newUser.id);
    //save session
    req.session.userId = newUser.id;
    //send response back
    res.status(201).json({
      name,
      email,
    });
  } catch (err) {
    return next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400);
      throw new Error('please enter all required fields');
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user.id;
      res.status(200).json({
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error('invalid login credentials');
    }
  } catch (err) {
    return next(err);
  }
};
