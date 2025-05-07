import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { auth, app } from '../firebaseConfig/firebaseConfig';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      const userDocRef = doc(db, 'users', newUser.uid);
      await setDoc(userDocRef, {
        email: email,
        nombreUsuario: '',
        oneliner: '',
        gems: 0,
      });
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
