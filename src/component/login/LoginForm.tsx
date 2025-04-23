import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import './loginForm.css';
import { Link } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Obtener el estado del mensaje desde la redirección
  const location = useLocation();
  const message = location.state?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario autenticado');
      navigate('/home'); // Redirige a Home después de iniciar sesión
    } catch (err: any) {
      setError('Error al iniciar sesión: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      {/* Mostrar el mensaje de bienvenida si está presente */}
      {message && <p className="success-message">{message}</p>}
        <div className="input-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Iniciar sesión</button>
        <p className="switch-form">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};