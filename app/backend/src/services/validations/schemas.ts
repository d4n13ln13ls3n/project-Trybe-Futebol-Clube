import * as Joi from 'joi';

const credentialsSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'All fields must be filled',
      'string.email': 'Invalid email or password',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'any.required': 'All fields must be filled',
      'string.min': 'Invalid email or password',
    }),
});

export default credentialsSchema;
