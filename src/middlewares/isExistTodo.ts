import { Response, Request, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import Todo from "../models/Todo";

export function isExist() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		if (isValidObjectId(id)) {
			const todo = await Todo.findById(id);
			todo ? next() : res.status(404).send({ message: "Todo with sych ID is not found" });
		} else {
			res.status(400).send({ message: "ID is invalid" });
		}
	};
}
