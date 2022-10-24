import { Response, Request, NextFunction } from "express";

const asyncFunc = (cb: Function) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await cb(req, res, next);

			res.status(200).send(data);
		} catch (error) {
			next(error);
		}
	};
};

export default asyncFunc;