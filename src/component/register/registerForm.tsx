import { useState, FormEvent, ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './registerForm.css';

export const RegisterForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Cuenta creada con éxito');
      navigate('/login', {
        state: {
          message: 'Cuenta creada con éxito. Ahora, por favor, inicia sesión.',
        },
      });
    } catch (err: any) {
      setError('Error al crear la cuenta: ' + err.message);
    }
  };

  const handleChange = (setter: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

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
            onChange={handleChange(setEmail)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange(setPassword)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="register-button">Crear cuenta</button>
      </form>
    </div>
  );
};
