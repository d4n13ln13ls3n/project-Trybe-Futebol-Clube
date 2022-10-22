import { RequestHandler } from 'express';

// import BadRequestHttpError from '../errors/httpErrors/BadRequest';

// import NotFoundHttpError from '../errors/httpErrors/UnauthorizedHttpError';

import UserModel from '../models/user.model';

import connection from '../models/connection';

const userModel = new UserModel(connection);

const validateBody: RequestHandler = async (req, res, next) => {
  // console.log('entered login.middleware');
  const { username, password } = req.body;
  // console.log('username and password:', username, password);
  if (!username) {
    console.log('entered first if');
    return res.status(400).json({ message: '"username" is required' });
    // throw new BadRequestHttpError('"username" is required');
  }

  if (!password) {
    console.log('entered second if');
    // throw new BadRequestHttpError('"password" is required');
    return res.status(400).json({ message: '"password" is required' });
  }

  const existingUsername = await userModel.getByUsernameAndPassword(username, password);
  // console.log('existing username:', existingUsername);
  if (!existingUsername) {
    // throw new NotFoundHttpError('Username or password invalid');
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  next();
};

export default validateBody;
