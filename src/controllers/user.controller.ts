import { Response, Request } from "express";
import UserService from "../services/user.service";

export class UserController {
	constructor(private userService: UserService) {}
	async addUser(_: Request, res: Response) {
		const userItem = _.body;
		const user = await this.userService.addUser(userItem);
		if (user) {
			res.status(201).json({ message: "user created" });
		}
	}
	async loginUser(_: Request, res: Response) {
		const { name, password } = _.body;
		try {
			const accessToken = await this.userService.loginUser(name, password);
			return accessToken;
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
}

const userController = new UserController(new UserService());
export default userController;
