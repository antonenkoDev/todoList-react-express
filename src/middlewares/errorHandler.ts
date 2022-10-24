import { Response, Request } from "express";

const errorHandler = (error: any, _: Request, res: Response) => {
	res.status(error.statusCode || 500).json({ message: error.message });
};

export default errorHandler;