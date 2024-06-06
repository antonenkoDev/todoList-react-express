import { Response, Request, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function isExistUser() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email;
    const user = await prisma.user.findUnique({ where: { email } });
    user
      ? next()
      : res.status(404).send({ message: 'User with sych ID is not found' });
  };
}
