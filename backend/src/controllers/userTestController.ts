import { Request, Response, NextFunction } from 'express';
import { prisma, redis } from '..';

export const getSavedTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cachedTests = await redis.get(`tests-${req.session.userId}`);
    if (cachedTests) return res.status(200).json(JSON.parse(cachedTests));

    const tests = await prisma.test.findMany({
      select: {
        id: true,
        generated_test: true,
        test_type: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        user_id: req.session.userId,
      },
    });

    if (!tests) {
      res.status(400);
      throw new Error('No tests saved');
    }

    res.status(200).json(tests);
  } catch (err) {
    return next(err);
  }
};

export const saveTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { test, testType } = req.body;

  try {
    const savedTest = await prisma.test.create({
      data: {
        generated_test: test,
        test_type: testType,
        user: {
          connect: {
            id: req.session.userId,
          },
        },
      },
    });

    const cachedTestsString = await redis.get(`tests-${req.session.userId}`);
    if (cachedTestsString) {
      const cachedTests = JSON.parse(cachedTestsString);
      cachedTests.unshift(savedTest);
      await redis.set(
        `feed-${req.session.userId}`,
        JSON.stringify(cachedTests),
        'EX',
        3600
      );
    }

    res.status(201).json(savedTest);
  } catch (err) {
    return next(err);
  }
};
export const getTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
