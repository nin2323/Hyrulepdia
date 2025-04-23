import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return user ? <>{children}</> : <Navigate to="/login" />;
};
