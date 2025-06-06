import { useAuth } from '../../../context/authContext';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig/firebaseConfig';
import { useEffect, useState } from 'react';
import styles from './UserProfileEditor.module.css';
import { Button } from '../../button/button';
import imageCompression from 'browser-image-compression'; // Asegúrate de que esta librería esté instalada

// Si usas react-toastify, descomenta estas líneas y asegúrate de que esté instalado y configurado.
// import { toast } from 'react-toastify';
// Si no, las alertas básicas (`alert()`) se usarán.

export const UserProfileEditor = () => {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState(''); // Esta será la Data URL
  const [oneLiner, setOneLiner] = useState('');
  const [gems, setGems] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showSensitive, setShowSensitive] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false); // Estado para feedback de carga de imagen

  // Carga inicial de datos del usuario
  useEffect(() => {
    if (!user) return;

    setDisplayName(user.displayName || '');
    setEmail(user.email || '');

    const fetchProfileData = async () => {
      const docRef = doc(db, 'users', user.uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setOneLiner(data.oneLiner || '');
        setGems(data.gems || 0);
        // SIEMPRE lee la photoURL de Firestore si existe, porque ahí es donde la guardaremos.
        setPhotoURL(data.photoURL || ''); // Si no hay foto en Firestore, será una cadena vacía
      } else {
        // Si no hay doc en Firestore o no tiene photoURL, usa un valor por defecto o vacío
        setPhotoURL(''); // O user.photoURL si quieres el de Firebase Auth como fallback si es corto
      }
    };

    fetchProfileData();
  }, [user]);

  // --- Función para transformar File/Blob a Data URL (integrada) ---
  const transformFileToDataUrl = (file: File): Promise<string | null> => {
    const imageAllowedTypes = ['image/webp', 'image/jpeg', 'image/png'];

    if (!imageAllowedTypes.includes(file.type)) {
      // toast.error('Solo se permiten imágenes en formato WEBP, JPEG o PNG.'); // Si usas toast
      alert('Solo se permiten imágenes en formato WEBP, JPEG o PNG.'); // Si no usas toast
      return Promise.resolve(null);
    }

    // El tamaño de 550 KB es para el archivo COMPRIMIDO.
    // Si la compresión a 0.5MB (512KB) es efectiva, esto no debería activarse a menos que el archivo original ya sea pequeño y WebP no lo reduzca significativamente.
    // Recuerda que la Data URL será ~33% más grande que el archivo binario.
    // Un archivo de 550KB binario se convierte en ~730KB de Data URL, lo cual está DENTRO del límite de 1MB de Firestore.
    if (file.size > 550 * 1024) { // 550 KB
      // toast.error('La imagen no debe exceder los 550 KB después de la compresión.'); // Si usas toast
      alert('La imagen no debe exceder los 550 KB después de la compresión.'); // Si no usas toast
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        console.error("Error al leer el archivo con FileReader.");
        // toast.error("Ocurrió un error al cargar la imagen. Inténtalo de nuevo."); // Si usas toast
        alert("Ocurrió un error al cargar la imagen. Inténtalo de nuevo."); // Si no usas toast
        resolve(null);
      };

      reader.readAsDataURL(file);
      console.log("Image conversion to Data URL started.");
    });
  };

  // --- Manejo de la subida de la imagen ---
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return;

    setLoadingImage(true);
    setMessage('');

    const options = {
      maxSizeMB: 0.5, // Comprime a 0.5 MB (512 KB)
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      // fileType: "image/webp", // Puedes especificar esto si quieres forzar la conversión a WebP
    };

    try {
      // 1. Comprimir la imagen
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob);
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

      // 2. Convertir el Blob (imagen comprimida) a Data URL
      const dataUrl = await transformFileToDataUrl(compressedFile);
      
      if (dataUrl) {
        setPhotoURL(dataUrl); // Actualizar el estado con la Data URL
        setMessage('✅ Imagen lista para guardar. ¡No olvides hacer clic en "Guardar"!');
      } else {
        setMessage('❌ No se pudo procesar la imagen.'); // El alert ya lo mostró transformFileToDataUrl
      }
    } catch (error: any) {
      console.error('Error al procesar la imagen:', error);
      setMessage(`❌ Error al subir la imagen: ${error.message || 'Intenta de nuevo.'}`);
    } finally {
      setLoadingImage(false);
    }
  };

  // --- Manejo del guardado de perfil ---
  const handleSave = async () => {
    if (!user || !auth.currentUser) {
      setMessage('❌ No hay usuario autenticado.');
      return;
    }

    setMessage('');

    try {
      // ¡¡LA CLAVE ESTÁ AQUÍ!!
      // NO actualices el photoURL del perfil de Firebase Auth con la Data URL.
      // Firebase Auth tiene un límite muy bajo para photoURL.
      await updateProfile(auth.currentUser, { 
        displayName,
        // photoURL: photoURL, // <--- COMENTA o QUITA esta línea si `photoURL` puede ser muy larga
        // Si tienes una photoURL corta (ej. de un Gravatar o una URL de Storage)
        // puedes usarla aquí, pero NO si es una Data URL grande.
        // Si la foto solo se guardará en Firestore, déjalo sin `photoURL` aquí.
      });

      if (email && email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      if (password) {
        await updatePassword(auth.currentUser, password);
      }

      // Esto es lo importante: GUARDA LA DATA URL EN FIRESTORE.
      // Firestore soporta cadenas mucho más largas (hasta 1MB por documento).
      await updateDoc(doc(db, 'users', user.uid), {
        oneLiner,
        gems,
        photoURL, // <-- Aquí guardas la Data URL en tu documento de Firestore
      });

      setMessage('✅ Cambios guardados correctamente');
      setPassword('');
    } catch (err: any) {
      console.error('Error al guardar el perfil:', err);
      if (err.code === 'auth/requires-recent-login') {
        setMessage('❌ Por favor, vuelve a iniciar sesión para actualizar tu email o contraseña.');
      } else {
        setMessage(`❌ Error al guardar: ${err.message}`);
      }
    }
  };

  return (
    <div className={styles.containerProfile}>
      {message && <p className={message.startsWith('❌') ? styles.errorMessage : styles.successMessage}>{message}</p>}

      <label className={styles.clickableImg}>
        <img
          src={photoURL || 'src/assets/black 1.png'} // Muestra la Data URL desde el estado
          alt='Foto de perfil'
        />
        <input
          type='file'
          accept='image/webp, image/jpeg, image/png'
          style={{ display: 'none' }}
          onChange={handleImageUpload}
          disabled={loadingImage}
        />
        {loadingImage && <p>Cargando imagen...</p>}
      </label>

      <div className={styles.inputTextCardName}>
        <div className={styles.leftTopLine}></div>
        <div className={styles.leftBottomLine}></div>
        <div className={styles.rightTopLine}></div>
        <div className={styles.rightBottomLine}></div>
        <div className={styles.topLeftLine}></div>
        <div className={styles.topRightLine}></div>
        <div className={styles.bottomLeftLine}></div>
        <div className={styles.bottomRightLine}></div>
        <input
          className={styles.inputText}
          placeholder='NAME'
          type='text'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div className={styles.inputTextCardOneLiner}>
        <div className={styles.leftTopLine}></div>
        <div className={styles.leftBottomLine}></div>
        <div className={styles.rightTopLine}></div>
        <div className={styles.rightBottomLine}></div>
        <div className={styles.topLeftLine}></div>
        <div className={styles.topRightLine}></div>
        <div className={styles.bottomLeftLine}></div>
        <div className={styles.bottomRightLine}></div>
        <input
          className={styles.inputText}
          placeholder='ONE LINER'
          type='text'
          value={oneLiner}
          onChange={(e) => setOneLiner(e.target.value)}
        />
      </div>

      <Button
        color='primary'
        size='sm'
        onClick={() => setShowSensitive((prev) => !prev)}
      >
        {showSensitive ? 'Ocultar' : 'Editar'}
      </Button>

      {showSensitive && (
        <>
          <div className={styles.inputTextCardOneLiner}>
            <div className={styles.leftTopLine}></div>
            <div className={styles.leftBottomLine}></div>
            <div className={styles.rightTopLine}></div>
            <div className={styles.rightBottomLine}></div>
            <div className={styles.topLeftLine}></div>
            <div className={styles.topRightLine}></div>
            <div className={styles.bottomLeftLine}></div>
            <div className={styles.bottomRightLine}></div>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputText}
            />
          </div>

          <div className={styles.inputTextCardOneLiner}>
            <div className={styles.leftTopLine}></div>
            <div className={styles.leftBottomLine}></div>
            <div className={styles.rightTopLine}></div>
            <div className={styles.rightBottomLine}></div>
            <div className={styles.topLeftLine}></div>
            <div className={styles.topRightLine}></div>
            <div className={styles.bottomLeftLine}></div>
            <div className={styles.bottomRightLine}></div>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña (dejar en blanco para no cambiar)'
              className={styles.inputText}
            />
          </div>
        </>
      )}

      <Button color='primary' size='sm' onClick={handleSave} disabled={loadingImage}>
        Guardar
      </Button>
    </div>
  );
};