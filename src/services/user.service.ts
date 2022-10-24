import { IUser } from "../models/User";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

export default class UserService {
	async addUser(userItem: IUser) {
		const hashPassword = await bcrypt.hash(userItem.password, 10);
		userItem.password = hashPassword;
		return await User.create(userItem);
	}
	async loginUser(name: string, password: string) {
		const candidate = await User.findOne({ name });

		if (candidate) {
			const passwordsMatch = await bcrypt.compare(password, candidate.password);

			if (passwordsMatch) {
				const user = candidate;
				const jwtSecret: string = config.get("jwtSecret");
				const accessToken = jwt.sign({ userId: user._id }, jwtSecret);

				return accessToken;
			} else {
				throw new Error("Login using valid name and password");
			}
		}
	}
}
