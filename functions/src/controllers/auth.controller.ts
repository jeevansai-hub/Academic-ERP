import { Request, Response } from 'express';

export const authController = {
  register: async (req: Request, res: Response) => {
    res.json({ success: true, message: 'Register placeholder' });
  },
  profile: async (req: Request, res: Response) => {
    res.json({ success: true, message: 'Profile placeholder' });
  },
  updateProfile: async (req: Request, res: Response) => {
    res.json({ success: true, message: 'Update profile placeholder' });
  }
};
