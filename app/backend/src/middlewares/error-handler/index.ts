import { NextFunction, Request, Response } from 'express';
import { AppError, AppErrorTypes } from '../../errors/AppError';
import defaultErrorHandler from './DefaultErrorHandler';
import { ErrorHandler } from './ErrorHandler';
import httpErrorHandler from './HttpErrorHandler';

const errorHandlers: Record<AppErrorTypes, ErrorHandler> = {
  [AppErrorTypes.HTTP]: httpErrorHandler,
  [AppErrorTypes.DEFAULT]: defaultErrorHandler,
};

const errorHandlerMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  const errorType = err.type || AppErrorTypes.DEFAULT;
  const handleError = errorHandlers[errorType];

  handleError(err, req, res, next);
};

export default errorHandlerMiddleware;
