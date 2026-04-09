import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

// Controllers
import { authController } from './controllers/auth.controller';
import { studentController } from './controllers/student.controller';
import { facultyController } from './controllers/faculty.controller';
import { analyticsController } from './controllers/analytics.controller';
import { remarksController } from './controllers/remarks.controller';
import { marksController } from './controllers/marks.controller';
import { subjectsController } from './controllers/subjects.controller';

// Middleware
import { verifyToken } from './middleware/auth.middleware';
import { checkRole } from './middleware/role.middleware';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Auth & Setup
app.post('/api/auth/register', authController.register);
app.get('/api/auth/profile', verifyToken, authController.profile);
app.put('/api/auth/profile', verifyToken, authController.updateProfile);

// Students
app.get('/api/students', verifyToken, checkRole(['admin', 'faculty']), studentController.list);
app.get('/api/students/:id', verifyToken, checkRole(['admin', 'faculty']), studentController.getOne);
app.post('/api/students', verifyToken, checkRole(['admin']), studentController.create);
app.put('/api/students/:id', verifyToken, checkRole(['admin']), studentController.update);
app.delete('/api/students/:id', verifyToken, checkRole(['admin']), studentController.deactivate);

// Faculty
app.get('/api/faculty', verifyToken, checkRole(['admin']), facultyController.list);
app.post('/api/faculty', verifyToken, checkRole(['admin']), facultyController.create);

// Marks
app.get('/api/marks/:studentId', verifyToken, marksController.getStudentMarks);
app.post('/api/marks', verifyToken, checkRole(['admin', 'faculty']), marksController.addMarks);

// Subjects
app.get('/api/subjects', verifyToken, subjectsController.list);

// Remarks
app.get('/api/remarks/:studentId', verifyToken, remarksController.getStudentRemarks);
app.post('/api/remarks', verifyToken, checkRole(['faculty']), remarksController.addRemark);

// Analytics
app.get('/api/analytics/summary', verifyToken, checkRole(['admin']), analyticsController.summary);

export const api = functions.https.onRequest(app);

// Parent Portal Functions
export { 
  onMarksUpdate, 
  onAttendanceUpdate, 
  onAnnouncementCreate 
} from './parentNotifications';
