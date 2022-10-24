import { ObjectId } from "mongoose";
interface TokenData {
	userId: ObjectId;
}
declare module "express-serve-static-core" {
	interface Request {
		tokenData: TokenData;
	}
}
