import { Request, Response } from 'express';

export const marksController = {
  getStudentMarks: async (req: Request, res: Response) => {
    res.json({ success: true, data: [] });
  },
  addMarks: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  updateMarks: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  deleteMarks: async (req: Request, res: Response) => {
    res.json({ success: true, message: 'Deleted' });
  }
};
