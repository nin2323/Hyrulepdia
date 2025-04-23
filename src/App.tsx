import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Cambios en las importaciones
import { AuthProvider } from './context/authContext';
import { LoginForm } from './component/login/LoginForm';
import { RegisterForm } from './component/register/registerForm';
import { Home } from './component/home/home'; // Asegúrate de tener este componente
import {PrivateRoute} from './component/privateRoute/privateRoute'; // Asegúrate de que PrivateRoute también se actualice
import './component/login/LoginForm.css'
import './component/register/registerForm.css'
import './component/home/home.css'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Las rutas ahora usan `element` en lugar de `component` */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          
          {/* Ruta protegida para la home */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

          {/* Ruta por defecto, redirige a login si no existe otra ruta */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
