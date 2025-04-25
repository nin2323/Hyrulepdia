// import { FC } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/authContext';
// import { LoginForm } from './component/login/LoginForm';
// import { RegisterForm } from './component/register/registerForm';
// import { Home } from './component/home/home'; 
// import {PrivateRoute} from './component/privateRoute/privateRoute'; 
// import './component/login/LoginForm.css'
// import './component/register/registerForm.css'
// import './component/home/home.css'

// const App: FC = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/register" element={<RegisterForm />} />
//           <Route path="/login" element={<LoginForm />} />
          
//           {/* Ruta protegida para la home */}
//           <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

//           {/* Ruta por defecto, redirige a login si no existe otra ruta */}
//           <Route path="/" element={<Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

import './App.css'
import { Header } from './components/header/header'
import { Outlet } from 'react-router-dom'

export const App = () => {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  )
};


