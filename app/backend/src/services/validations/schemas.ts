import * as Joi from 'joi';

const credentialsSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.required': 'All fields must be filled',
      'string.email': 'Incorrect email or password',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.required': 'All fields must be filled',
      'string.min': 'Incorrect email or password',
    }),
});

export default credentialsSchema;
