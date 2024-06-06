import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../@types/express';
import logger from '../logger';
import * as process from 'node:process';
import UserService from '../services/user.service';

interface JwtPayload {
  userId: string;
}

export function checkToken() {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization required' });
    }
    try {
      const jwtSecret: string = process.env.JWT_SECRET as string;
      const { userId } = jwt.verify(token, jwtSecret) as JwtPayload;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const userService = new UserService();
      const user = await userService.getUserById(userId);

      if (!user) {
        throw new Error('Malformed request');
      }

      req.tokenData = { userId };
      next();
    } catch (error) {
      logger.error(error);
      return res.status(400).json({ message: 'Error. Check logs for details' });
    }
  };
}
