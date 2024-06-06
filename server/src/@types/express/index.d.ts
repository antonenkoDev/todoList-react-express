import { ObjectId } from 'mongoose';
import { Request } from 'express';

interface TokenData {
  userId: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    tokenData?: TokenData;
  }
}

export interface CustomRequest extends Request {
  tokenData?: TokenData;
}
