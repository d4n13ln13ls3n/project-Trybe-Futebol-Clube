import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppError';

export type ErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
