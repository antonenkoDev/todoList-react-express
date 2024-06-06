import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export default class UserService {
  async addUser(userItem: { email: string; password: string }) {
    const hashPassword = await bcrypt.hash(userItem.password, 10);
    const user = await prisma.user.create({
      data: {
        email: userItem.email,
        password: hashPassword,
      },
    });
    return user;
  }

  async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new Error('Invalid credentials');
    }

    const jwtSecret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ userId: user.uuid }, jwtSecret, {
      expiresIn: '1h',
    });

    return { user, token };
  }

  async getUserById(uuid: string) {
    return await prisma.user.findUnique({ where: { uuid } });
  }
}
