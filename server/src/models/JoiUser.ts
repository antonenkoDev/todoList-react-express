import Joi from 'joi';

export const joiUserSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'any.required': `Email is a required field`,
  }),
  password: Joi.string().min(8).max(32).required().messages({
    'string.empty': `Password cannot be an empty field`,
    'string.min': `Password should have a minimum length of {#limit}`,
    'string.max': `Password should have a maximum length of {#limit}`,
    'any.required': `Password is a required field`,
  }),
});
