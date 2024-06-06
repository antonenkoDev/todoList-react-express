import mongoose, { ConnectOptions } from 'mongoose';
import logger from '../logger';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

export const connectPostgresDB = async () => {
  try {
    await prisma.$connect();
    logger.info('PostgreSQL connected...');
  } catch (err) {
    logger.error('Unable to connect to PostgreSQL:', err);
    process.exit(1);
  }
};

export const connectMongoDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
  }

  const options: ConnectOptions = {
    autoIndex: true,
    autoCreate: true,
  };

  await mongoose.connect(mongoURI, options);
  logger.info('MongoDB Connected...');
};
