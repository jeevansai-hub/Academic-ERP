import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LoginPage } from './pages/auth/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import ScrollToTop from './components/common/ScrollToTop';

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
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
