import React from 'react';
import { useAuth } from '../../context/authContext'; 
import './home.css'; 

export const Home: React.FC = () => {
  const { user } = useAuth(); // Obtenemos el usuario del contexto de autenticación

  if (!user) {
    // Si no hay usuario, redirigimos al login
    return <div>No estás autenticado. Redirigiendo al login...</div>;
  }

  return (
    <div className="home-container">
      <h2>Bienvenido, {user.email}</h2>
      <p>¡Estás en la página de inicio!</p>
    </div>
  );
};