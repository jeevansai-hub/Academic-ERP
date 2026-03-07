import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { auth } from '../config/firebase';

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: { code: 'unauthorized', message: 'No token provided' } });
    return;
  }

  const token = bearerHeader.split(' ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: { code: 'unauthorized', message: 'Invalid token' } });
    return;
  }
};
