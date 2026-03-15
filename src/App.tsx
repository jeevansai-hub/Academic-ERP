import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LoginPage } from './pages/auth/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';

// Faculty Imports
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultySubjects from './pages/faculty/Subjects';
import MarksManagement from './pages/faculty/MarksManagement';
import StudentPerformance from './pages/faculty/StudentPerformance';
import ClassAnalytics from './pages/faculty/ClassAnalytics';
import AssessmentControl from './pages/faculty/AssessmentControl';
import ReportsAttendance from './pages/faculty/ReportsAttendance';
import SettingsPage from './pages/faculty/Settings';
import FacultyLayout from './components/faculty/FacultyLayout';
import AdminRoutes from './admin/AdminRoutes';

// Basic scaffolding for pages
const RegisterPage = () => <div className="p-8">Register Page Placeholder</div>;

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Student Routes */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Faculty Routes */}
            <Route 
              path="/faculty/dashboard" 
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyLayout>
                    <FacultyDashboard />
                  </FacultyLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/faculty/subjects" 
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyLayout>
                    <FacultySubjects />
                  </FacultyLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/faculty/marks" 
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyLayout>
                    <MarksManagement />
                  </FacultyLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/faculty/performance" 
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyLayout>
                    <StudentPerformance />
                  </FacultyLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/faculty/analytics" 
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyLayout>
                    <ClassAnalytics />
                  </FacultyLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/faculty/assessments" 
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyLayout>
                    <AssessmentControl />
                  </FacultyLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/faculty/reports" 
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyLayout>
                    <ReportsAttendance />
                  </FacultyLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/faculty/settings" 
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyLayout>
                    <SettingsPage />
                  </FacultyLayout>
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
