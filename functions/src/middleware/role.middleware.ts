import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { db } from '../config/firebase';

export const checkRole = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ success: false, error: { code: 'unauthorized', message: 'No user context' } });
      return;
    }

    try {
      const userDoc = await db.collection('users').doc(req.user.uid).get();
      
      if (!userDoc.exists) {
         res.status(404).json({ success: false, error: { code: 'not-found', message: 'User not found' } });
         return;
      }

      const userData = userDoc.data();
      const userRole = userData?.role;

      if (!allowedRoles.includes(userRole)) {
        res.status(403).json({ success: false, error: { code: 'forbidden', message: 'Role mismatch' } });
        return;
      }

      next();
    } catch (error) {
       res.status(500).json({ success: false, error: { code: 'server-error', message: 'Error checking role' } });
       return;
    }
  };
};
