import { Response, Request, NextFunction } from "express";
import User from "../models/User";

export function checkDuplicateUser() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const name = req.body.name;
		const user = await User.findOne({ name });
		user ? res.status(400).send({ message: "User with such name exists" }) : next();
	};
}
