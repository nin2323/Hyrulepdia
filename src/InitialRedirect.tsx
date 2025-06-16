import { Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext';

export const InitialRedirect = () => {
  const { user } = useAuth();
  return user ? <Navigate to='/app' /> : <Navigate to='/landing' />;
};
