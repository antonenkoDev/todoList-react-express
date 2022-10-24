import Joi from "joi";

export const joiTodoSchema = Joi.object().keys({
	description: Joi.string().min(5).max(100).required(),
	isCompleted: Joi.boolean(),
});

