import { Response, Request } from 'express';
import UserService from '../services/user.service';
import { CustomRequest } from '../@types/express';

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    try {
      const user = await this.userService.addUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.userService.loginUser(email, password);
      res.json({ user, token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUser(req: CustomRequest, res: Response) {
    try {
      if (!req.tokenData) {
        throw new Error('Malformed request');
      }
      const user = await this.userService.getUserById(req.tokenData.userId);
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

const userController = new UserController(new UserService());
export default userController;
