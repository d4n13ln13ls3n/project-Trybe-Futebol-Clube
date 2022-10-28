import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login.service';
import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    throw new UnauthorizedHttpError('Token not found');
  }

  const decodedUser = LoginService.validateAccessToken(token);
  // req.user = decodedUser;
  req.body.user = decodedUser;
  next();
};
