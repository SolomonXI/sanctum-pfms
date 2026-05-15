import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ role: allowedRole }) => {
  const { role } = useAuth();
  
  if (!role || (allowedRole && role !== allowedRole)) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
