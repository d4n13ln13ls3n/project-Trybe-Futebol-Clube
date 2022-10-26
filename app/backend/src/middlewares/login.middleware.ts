import { RequestHandler } from 'express';

import BadRequestHttpError from '../errors/httpErrors/BadRequest';
import credentialsSchema from '../services/validations/schemas';

const userValidation: RequestHandler = async (req, res, next) => {
  const { error } = credentialsSchema.validate(req.body);
  console.log('error no middleware:', error);
  if (error) {
    // throw new BadRequestHttpError(error.details[0].message);
    throw new BadRequestHttpError('All fields must be filled');
  }

  next();
};

export default userValidation;
