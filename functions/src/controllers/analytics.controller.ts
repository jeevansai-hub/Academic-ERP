import { Request, Response } from 'express';

export const analyticsController = {
  summary: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  studentSummary: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  facultySummary: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  }
};
