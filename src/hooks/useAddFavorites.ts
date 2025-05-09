import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { HyruleCardType } from "../types/hyrule.types";

export const useAddFavorites = () => {

  //  ID del usuario
  const auth = getAuth();
  const user = auth.currentUser; 
  const toggleFavorite = async (card: HyruleCardType) => {
    if (!user) {
      console.log("Usuario no está logueado");
      return;
    }

    const userId = user.uid;
    const cardId = card.id;
    const userDocRef = doc(db, "users", userId); // doc del usuario

    try {
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // obtenemos sus favoritos
        const userData = userDocSnap.data();
        const favorites: number[] = userData?.favorites || [];

        if (favorites.includes(cardId)) {
          // Si la carta está en favoritos la eliminamos
          const updatedFavorites = favorites.filter((id: number) => id !== cardId);
          await updateDoc(userDocRef, { favorites: updatedFavorites });
          console.log(`Card ${cardId} removed from favorites`);
        } else {
          // Si no está en favoritos la agregamos
          await updateDoc(userDocRef, { favorites: [...favorites, cardId] });
          console.log(`Card ${cardId} added to favorites`);
        }
      } else {
        // Si el documento del usuario no existe, lo creamos con un array de favoritos
        await setDoc(userDocRef, { favorites: [cardId] });
        console.log(`User document created with card ${cardId} as favorite`);
      }
    } catch (error) {
      console.error("Error managing favorites:", error);
    }
  };

  return { toggleFavorite };
};
