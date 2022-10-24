import { Response, Request, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "config";
import { ObjectId } from "mongoose";
interface JwtPayload {
	userId: ObjectId;
}

export function checkToken() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if (token == null) {
			return res.status(401).json({ message: "Authorizatuin required" });
		}
		try {
			const jwtSecret: string = config.get("jwtSecret");
			const { userId } = jwt.verify(token, jwtSecret) as JwtPayload;

			const user = await User.findById(userId);

			if (!user) {
				throw new Error("Malformed request");
			} else {
				req.tokenData = { userId: userId };
				next();
			}
		} catch (error) {
			return res.status(400).json({ message: "Malformed request" });
		}
	};
}
