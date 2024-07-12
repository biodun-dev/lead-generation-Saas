import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../config/logger';  // Import the logger

export const loginSuccess = (req: Request, res: Response) => {
  if (!req.user) {
    logger.warn('Login success attempted without user in request.');
    return res.status(401).send('Unauthorized');
  }

  try {
    const token = jwt.sign({ id: (req.user as any)._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    logger.info(`User ${(req.user as any)._id} logged in successfully.`);
    res.redirect(`/?token=${token}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error generating JWT for user ${(req.user as any)._id}: ${error.message}`);
      res.status(500).send('Internal Server Error');
    } else {
      logger.error('An unknown error occurred during login success handling');
      res.status(500).send('Internal Server Error');
    }
  }
};

export const loginFailure = (req: Request, res: Response) => {
  logger.warn('Login failed');
  res.status(401).send('Login failed');
};
