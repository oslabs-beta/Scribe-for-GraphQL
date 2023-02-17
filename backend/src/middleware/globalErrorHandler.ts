import {Request, Response, NextFunction} from 'express'

export const globalErrorHandler = (err: any, _: Request, res: Response, __: NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const message = err.message ? err.message : 'unknwon error occured';
  res.status(statusCode).json({ message });
}