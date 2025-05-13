import React, { useState, FormEvent, ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerForm.css';
import { Button } from '../../button/button';
import { useAuth } from '../../../context/authContext';

export const RegisterForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await signup(email, password);
      console.log(
        'Cuenta creada con éxito. La información del perfil se completará más tarde.'
      );
      navigate('/profile', {
        state: {
          message: 'Cuenta creada con éxito. Por favor, completa tu perfil.',
        },
      });
    } catch (err: any) {
      setError('Error al crear la cuenta: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <h2>Registro</h2>

        <div className='input-group'>
          <label htmlFor='email'>Correo electrónico:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleChange(setEmail)}
            required
          />
        </div>

        <div className='input-group'>
          <label htmlFor='password'>Contraseña:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handleChange(setPassword)}
            required
          />
        </div>

        <div className='input-group'>
          <label htmlFor='confirmPassword'>Confirmar contraseña:</label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword)}
            required
          />
        </div>

        {error && <p className='error-message'>{error}</p>}

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>
    </div>
  );
};
