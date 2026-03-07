import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const RoleGuard = ({ allowedRoles, children }: { allowedRoles: string[]; children: React.ReactNode }) => {
  const { userProfile, loading } = useAuth();

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center">Verifying permissions...</div>;
  }

  if (userProfile && !allowedRoles.includes(userProfile.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
