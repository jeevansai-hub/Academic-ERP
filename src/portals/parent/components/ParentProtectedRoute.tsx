import React from 'react';
import { useParentAuth } from '../hooks/useParentAuth';
import { Navigate } from 'react-router-dom';
import ParentSkeletonLoader from './ParentSkeletonLoader';

interface ParentProtectedRouteProps {
  children: React.ReactNode;
}

const ParentProtectedRoute: React.FC<ParentProtectedRouteProps> = ({ children }) => {
  const { loading, accessDenied, parentProfile } = useParentAuth();

  if (loading) return <ParentSkeletonLoader type="fullpage" />;
  if (accessDenied || !parentProfile) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ParentProtectedRoute;
