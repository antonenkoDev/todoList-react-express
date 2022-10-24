import { Response, Request, NextFunction } from "express";
import Joi from "joi";


export function JoiValidator(schema: Joi.Schema) {
	return (_: Request, res: Response, next: NextFunction) => {
		try {
			console.log('validator');
			const result = schema.validate(_.body);
			if (result.error) throw new Error('Validation Error')
			next();
		} catch (err: any) {
			res.status(400).json({ message: err.message });
		}
	}
}