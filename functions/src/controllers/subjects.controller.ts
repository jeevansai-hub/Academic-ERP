import { Request, Response } from 'express';

export const subjectsController = {
  list: async (req: Request, res: Response) => {
    res.json({ success: true, data: [] });
  },
  create: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  update: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  deleteSubject: async (req: Request, res: Response) => {
    res.json({ success: true, message: 'Deleted' });
  }
};
