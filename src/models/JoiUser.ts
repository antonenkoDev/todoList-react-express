import Joi from "joi";

export const joiUserSchema = Joi.object().keys({
	name: Joi.string().min(3).max(50).required().messages({
		"string.empty": `Name cannot be an empty field`,
		"string.min": `Name should have a minimum length of {#limit}`,
		"string.max": `Name should have a maximum length of {#limit}`,
		"any.required": `Name is a required field`,
	}),
	password: Joi.string().min(8).max(32).required().messages({
		"string.empty": `Password cannot be an empty field`,
		"string.min": `Password should have a minimum length of {#limit}`,
		"string.max": `Password should have a maximum length of {#limit}`,
		"any.required": `Password is a required field`,
	}),
});
