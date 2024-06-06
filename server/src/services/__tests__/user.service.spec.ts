// src/services/__tests__/user.service.spec.ts
import { PrismaClient } from '@prisma/client';
import UserService from '../user.service';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

describe('UserService', () => {
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany(); // Очистка базы данных перед каждым тестом
  });

  it('should register a new user', async () => {
    const userData = { email: 'test@example.com', password: 'password123' };
    const user = await userService.addUser(userData);
    expect(user.email).toBe(userData.email);

    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );
    expect(isPasswordValid).toBe(true);
  });

  it('should login a user', async () => {
    const userData = { email: 'login@example.com', password: 'password123' };
    await userService.addUser(userData);
    const { user, token } = await userService.loginUser(
      userData.email,
      userData.password,
    );
    expect(user.email).toBe(userData.email);
    expect(token).toBeDefined();
  });
});
