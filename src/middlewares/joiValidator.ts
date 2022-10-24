import { Response, Request, NextFunction } from "express";
import Joi from "joi";


export function JoiValidator(schema: Joi.Schema) {
	return (_: Request, res: Response, next: NextFunction) => {
		try {
			const result = schema.validate(_.body);
			if (result.error) throw new Error(String(result.error));
			next();
		} catch (err: any) {
			res.status(400).json({ message: err.message });
		}
	}
}