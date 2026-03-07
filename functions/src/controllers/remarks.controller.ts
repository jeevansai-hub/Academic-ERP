import { Request, Response } from 'express';

export const remarksController = {
  getStudentRemarks: async (req: Request, res: Response) => {
    res.json({ success: true, data: [] });
  },
  addRemark: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  editRemark: async (req: Request, res: Response) => {
    res.json({ success: true, data: {} });
  },
  deleteRemark: async (req: Request, res: Response) => {
    res.json({ success: true, message: 'Deleted' });
  }
};
