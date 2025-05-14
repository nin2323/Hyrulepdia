import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { HyruleCardType } from "../types/hyrule.types";

export const useAddFavorites = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const toggleFavorite = async (card: HyruleCardType) => {
    if (!user) {
      console.log("Usuario no está logueado");
      return;
    }

    const userId = user.uid;
    const cardId = card.id;

    // Referencia al documento de la carta dentro de la subcolección 'hyrule_cards'
    const cardDocRef = doc(db, "users", userId, "hyrule_cards", String(cardId));

    try {
      // Verificar si la carta ya existe en la subcolección
      const cardSnap = await getDoc(cardDocRef);

      if (!cardSnap.exists()) {
        // Si la carta no existe, la creamos con el campo `favorite: true` o `false` según se marque
        await setDoc(cardDocRef, {
          ...card, // Mantener el resto de los datos de la carta
          favorite: true, // Inicializamos como favorita
        });
        console.log(`Carta ${cardId} añadida a favoritos.`);
      } else {
        const currentData = cardSnap.data();
        const isFavorite = currentData.favorite === true;

        // Actualizamos el campo `favorite` para alternarlo entre `true` y `false`
        await updateDoc(cardDocRef, {
          favorite: !isFavorite,
        });

        console.log(
          `Carta ${cardId} ${!isFavorite ? "añadida a" : "eliminada de"} favoritos.`
        );
      }
    } catch (error) {
      console.error("Error al gestionar las cartas favoritas:", error);
    }
  };

  return { toggleFavorite };
};
