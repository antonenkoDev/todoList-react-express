import { Response, Request, NextFunction } from "express";
import User, { IUser } from "../models/User";
import { isValidObjectId, Model } from "mongoose";

export function isExistUser() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const name: string = req.body.name;
		const user = await User.find({ name });
		user ? next() : res.status(404).send({ message: "User with sych ID is not found" });
	};
}
