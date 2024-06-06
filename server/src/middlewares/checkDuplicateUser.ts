import { Response, Request, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function checkDuplicateUser() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        res.status(400).send({ message: 'User with such email exists' });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).send({ message: 'Error checking for duplicate user' });
    }
  };
}
