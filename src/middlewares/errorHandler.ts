import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';  // Import the logger

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    logger.error(`Error: ${err.message}`);  // Log the error message
    res.status(500).json({ error: err.message });
  } else {
    logger.error('An unknown error occurred');  // Log a generic error message
    res.status(500).json({ error: 'An unknown error occurred' });
  }
};

export default errorHandler;
