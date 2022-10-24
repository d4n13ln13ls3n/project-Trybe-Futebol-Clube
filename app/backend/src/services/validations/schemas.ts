import * as Joi from 'joi';

const credentialsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default credentialsSchema;
