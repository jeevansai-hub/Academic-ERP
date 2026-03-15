import React from 'react';
import { Navigate } from 'react-router-dom';

export const AdminAuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const role = localStorage.getItem('ecap_userRole');
  
  if (role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
