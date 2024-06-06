import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

interface ErrorWithStatus extends Error {
  status?: number;
}

const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error('Error: %O', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message,
  });
};

export default errorHandler;
