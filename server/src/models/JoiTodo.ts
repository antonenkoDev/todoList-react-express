import Joi from 'joi';

export const joiTodoSchema = Joi.object().keys({
  description: Joi.string().min(5).max(100).required().messages({
    'string.empty': `Description cannot be an empty field`,
    'string.min': `Description should have a minimum length of {#limit}`,
    'string.max': `"Description should have a maximum length of {#limit}`,
    'any.required': `Description is a required field`,
  }),
  isCompleted: Joi.boolean().required().messages({
    'boolean.base': `isComplete should be a type of boolean`,
    'any.required': `isCompleted is a required field`,
  }),
});
