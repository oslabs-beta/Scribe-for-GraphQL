import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';
import { validateRegister } from '../utils/validateRegister';
import '../utils/types'

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
    console.log('user: ', user)
    if (user) {
      res.status(400);
      throw new Error('user already exists');
    }
    //if they dont make new thing
    const newUser = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password: await bcrypt.hash(password, 12),
      },
    });
    console.log('newUser: ', newUser);
    //save session
    req.session.userId = newUser.id;
    //send response back
    res.status(200).json({
      firstName,
      lastName,
      username,
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
  const { usernameOrEmail, password } = req.body;
  try {
    if (!usernameOrEmail || !password) {
      res.status(400);
      throw new Error('please enter all required fields');
    }
    const user = await prisma.user.findUnique({
      //@ts-ignore
      where: {
        ...(usernameOrEmail.includes('@')
          ? { email: usernameOrEmail }
          : { username: usernameOrEmail }),
      },
    });

    if(user &&(await bcrypt.compare(password, user.password))) {
      req.session.userId = user.id
      res.status(200).json({
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      })
    } else {
      res.status(400);
      throw new Error('invalid login credentials')
    }
  } catch (err) {
    return next(err);
  }
};
