import { Response, Request, NextFunction } from "express";
import { ITodo } from '../models/Todo';
import { isValidObjectId, Model } from "mongoose";

export function isExist(DB: Model<ITodo>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		if (isValidObjectId(id)) {
			const todo = await DB.findById(id);
			todo ? next() : res.status(400).send({ message: "Todo with sych ID is not found" });
		}
		else {
			res.status(400).send({ message: "ID is invalid" });
		}
	};
};

