import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import HttpError from '../../errors/httpErrors/HttpError';
import { ErrorHandler } from './ErrorHandler';

const httpErrorHandler: ErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
) => {
  const httpError = err as HttpError;
  res.status(httpError.status).send({ message: httpError.message });
};

export default httpErrorHandler;
