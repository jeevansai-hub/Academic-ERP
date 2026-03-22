import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { AdminAuthGuard } from './components/AdminAuthGuard';
import AdminLayout from './layout/AdminLayout';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const StudentManagement = lazy(() => import('./pages/StudentManagement'));
const StudentDetailPage = lazy(() => import('./pages/StudentDetailPage'));
const FacultyManagement = lazy(() => import('./pages/FacultyManagement'));
const FacultyDetailPage = lazy(() => import('./pages/FacultyDetailPage'));
const Subjects = lazy(() => import('./pages/Subjects'));
const Marks = lazy(() => import('./pages/Marks'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Access = lazy(() => import('./pages/Access'));
const Settings = lazy(() => import('./pages/Settings'));
const AuditLogs = lazy(() => import('./pages/AuditLogs'));
const AdminExternalMarks = lazy(() => import('./pages/AdminExternalMarks'));

const PageSkeleton = () => (
  <div className="adm-root" style={{ padding: '24px' }}>
    <div className="adm-skeleton" style={{ height: '40px', width: '200px', marginBottom: '24px', borderRadius: '8px' }}></div>
    <div className="adm-skeleton" style={{ height: '200px', width: '100%', borderRadius: '14px' }}></div>
  </div>
);

const AdminRoutes = () => (
  <AdminProvider>
    <AdminAuthGuard>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"              element={<Dashboard />} />
            <Route path="students"               element={<StudentManagement />} />
            <Route path="students/:rollNumber"   element={<StudentDetailPage />} />
            <Route path="faculty"                element={<FacultyManagement />} />
            <Route path="faculty/:employeeId"    element={<FacultyDetailPage />} />
            <Route path="subjects"               element={<Subjects />} />
            <Route path="marks"                  element={<Marks />} />
            <Route path="analytics"              element={<Analytics />} />
            <Route path="notifications"          element={<Notifications />} />
            <Route path="access"                 element={<Access />} />
            <Route path="settings"               element={<Settings />} />
            <Route path="audit"                  element={<AuditLogs />} />
            <Route path="external-marks"         element={<AdminExternalMarks />} />
          </Route>
        </Routes>
      </Suspense>
    </AdminAuthGuard>
  </AdminProvider>
);

export default AdminRoutes;
