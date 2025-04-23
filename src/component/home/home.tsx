import React from 'react';
import { useAuth } from '../../context/authContext'; // Usamos el contexto de autenticación
import './home.css'; // Asegúrate de tener un archivo CSS para Home

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
      {/* Aquí puedes agregar más contenido según lo que desees mostrar en la home */}
    </div>
  );
};