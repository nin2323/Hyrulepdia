import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './registerForm.css';

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Crear una nueva cuenta con el email y la contraseña
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Cuenta creada con éxito');
      navigate('/login', { state: { message: 'Cuenta creada con éxito. Ahora, por favor, inicia sesión.' } }); // Redirige al login con mensaje
    } catch (err: any) {
      setError('Error al crear la cuenta: ' + err.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>

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

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="register-button">Crear cuenta</button>
      </form>
    </div>
  );
};