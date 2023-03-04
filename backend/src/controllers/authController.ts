import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';
import { validateRegister } from '../utils/validateRegister';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get response from req body
  const { firstName, lastName, username, email, password, confirmPassword } =
    req.body;
  try {
    const validated = validateRegister(
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    );

    if (validated.errorMessage) {
      res.status(400);
      throw new Error(validated.errorMessage);
    }

    //make sure they dont exist in db
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (user) {
      res.status(400);
      throw new Error('user already exists');
    }
    //if they dont make new thing
    await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password: await bcrypt.hash(password, 12),
      },
    });
    //save session
    req.session.userId = user!.id;
    //send response back
    res.status(200).json('user created');
  } catch (err) {
    return next(err);
  }
};

export const 