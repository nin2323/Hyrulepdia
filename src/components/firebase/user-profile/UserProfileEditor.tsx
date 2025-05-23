// Importamos hooks y funciones necesarias de Firebase y React
import { useAuth } from '../../../context/authContext'; // Para obtener el usuario actual
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth'; // Funciones para actualizar en Firebase Auth
import { doc, updateDoc, getDoc } from 'firebase/firestore'; // Funciones para acceder y editar Firestore
import { auth, db } from '../../../firebaseConfig/firebaseConfig';
import { useEffect, useState } from 'react'; // Hooks de React

// Componente principal
export const UserProfileEditor = () => {
  const { user } = useAuth(); // Obtenemos el usuario actual desde el authContext

  // Estados para manejar los datos del formulario
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [oneLiner, setOneLiner] = useState('');
  const [gems, setGems] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Mensaje de éxito o error

  // Cuando se monta el componente, cargamos los datos del usuario
  useEffect(() => {
    if (!user) return;

    // Datos de Firebase Auth
    setDisplayName(user.displayName || '');
    setPhotoURL(user.photoURL || '');
    setEmail(user.email || '');

    // Datos personalizados de Firestore
    const fetchProfileData = async () => {
      const docRef = doc(db, 'users', user.uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setOneLiner(data.oneLiner || '');
        setGems(data.gems || 0);
        // Si ya tienes photoURL en Firestore, podrías cargarlo aquí también:
        // setPhotoURL(data.photoURL || user.photoURL || '');
      }
    };

    fetchProfileData();
  }, [user]);

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Si hay cambios en nombre o foto, los actualizamos en Firebase Auth
      if (auth.currentUser) {
        if (displayName || photoURL) {
          await updateProfile(auth.currentUser, { displayName, photoURL });
        }

        // Si cambió el email
        if (email && email !== user.email) {
          await updateEmail(auth.currentUser, email);
        }

        // Si se quiere cambiar la contraseña
        if (password) {
          await updatePassword(auth.currentUser, password);
        }
      }

      // Actualizamos los datos en Firestore
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        oneLiner,
        gems,
        photoURL,
      });

      // Mostramos mensaje de éxito
      setMessage('Perfil actualizado correctamente ✅');
    } catch (err: any) {
      // Mostramos el error si falla algo
      setMessage(`Error: ${err.message}`);
    }
  };

  // JSX: formulario de edición de perfil
  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Perfil</h2>
      {message && <p>{message}</p>}

      <label>Nombre:</label>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <label>Foto de perfil (URL):</label>
      <input value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />

      <label>Email:</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Nueva contraseña:</label>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label>One-liner:</label>
      <input value={oneLiner} onChange={(e) => setOneLiner(e.target.value)} />

      <label>gems:</label>
      <input
        type='number'
        value={gems}
        onChange={(e) => {
          const value = e.target.value;
          setGems(value === '' ? 0 : parseInt(value, 10));
        }}
      />

      <button type='submit'>Guardar cambios</button>
    </form>
  );
};
