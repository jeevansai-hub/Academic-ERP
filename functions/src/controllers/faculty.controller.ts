import { Request, Response } from 'express';

export const facultyController = {
  list: async (req: Request, res: Response) => {
    res.json({ success: true, data: [] });
  },
  getOne: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  create: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  update: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  deleteFaculty: async (req: Request, res: Response) => {
    res.json({ success: true, message: 'Deleted' });
  }
};
