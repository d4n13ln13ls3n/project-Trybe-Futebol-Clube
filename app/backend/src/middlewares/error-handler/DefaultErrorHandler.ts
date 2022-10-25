import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { ErrorHandler } from './ErrorHandler';

const defaultErrorHandler: ErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
) => {
  res.status(500).send({ message: err.message });
};

export default defaultErrorHandler;
