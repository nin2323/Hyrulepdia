import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { CollectionPage } from './views/CollectionPage.tsx';
import { PorfilePage } from './views/ProfilePage.tsx';
import { ShopPage } from './views/ShopPage.tsx';
import { HomePage } from './views/HomePage.tsx';
import { AuthProvider } from './context/authContext.tsx';
import { LoginForm } from './components/firebase/login/LoginForm.tsx';
import { RegisterForm } from './components/firebase/register/registerForm.tsx';
import { PrivateRoute } from './components/firebase/privateRoute/privateRoute.tsx';


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/" element={<App />}>
          <Route index element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          <Route path="collection" element={
            <PrivateRoute>
              <CollectionPage />
            </PrivateRoute>
          } />
          <Route path="profile" element={
            <PrivateRoute>
              <PorfilePage />
            </PrivateRoute>
          } />
          <Route path="shop" element={
            <PrivateRoute>
              <ShopPage />
            </PrivateRoute>
          } />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
