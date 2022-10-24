import { RequestHandler } from 'express';
// import { AuthenticationCredentials } from '../interfaces';
import credentialsSchema from '../services/validations/schemas';

// import BadRequestHttpError from '../errors/httpErrors/BadRequest';

// import NotFoundHttpError from '../errors/httpErrors/UnauthorizedHttpError';

// import UserModel from '../database/models/Users';

// const validateBody: RequestHandler = async (req, res, next) => {
// console.log('entered login.middleware');
// const { email, password } = req.body;
// console.log('email and password:', email, password);
// if (!email) {
//   console.log('entered first if');
//   return res.status(400).json({ message: '"email" is required' });
// throw new BadRequestHttpError('"email" is required');
// }

// if (!password) {
//   console.log('entered second if');
// throw new BadRequestHttpError('"password" is required');
//   return res.status(400).json({ message: '"password" is required' });
// }

// const existingUsername = await userModel.getByUsernameAndPassword(username, password);
// console.log('existing username:', existingUsername);
// if (!existingUsername) {
//   // throw new NotFoundHttpError('Username or password invalid');
//   return res.status(401).json({ message: 'Username or password invalid' });
// }

const userValidation: RequestHandler = async (req, res, next) => {
  const { error } = credentialsSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};

export default userValidation;
