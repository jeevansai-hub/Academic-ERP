import React from 'react';
import { ParentProvider } from '../context/ParentContext';
import ParentProtectedRoute from '../components/ParentProtectedRoute';
import ParentLayout from '../components/ParentLayout';

interface ParentRoutesProps {
  children: React.ReactNode;
}

const ParentRoutes: React.FC<ParentRoutesProps> = ({ children }) => {
  return (
    <ParentProvider>
      <ParentProtectedRoute>
        <ParentLayout>
          {children}
        </ParentLayout>
      </ParentProtectedRoute>
    </ParentProvider>
  );
};

export default ParentRoutes;
