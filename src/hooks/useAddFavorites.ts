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
    const userDocRef = doc(db, "users", userId);

    try {
      const userDocSnap = await getDoc(userDocRef);
      let favorites: { id: number; rarity: string }[] = [];

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        favorites = Array.isArray(userData?.favorites) ? userData.favorites : [];

        // Verifica si ya existe
        const alreadyExists = favorites.some(fav => fav.id === cardId);

        if (alreadyExists) {
          const updatedFavorites = favorites.filter(fav => fav.id !== cardId);
          await updateDoc(userDocRef, { favorites: updatedFavorites });
          console.log(`Card ${cardId} removed from favorites`);
        } else {
          await updateDoc(userDocRef, {
            favorites: [...favorites, { id: cardId, rarity: card.rarity }],
          });
          console.log(`Card ${cardId} added to favorites with rarity ${card.rarity}`);
        }
      } else {
        // Crear documento si no existe
        await setDoc(userDocRef, {
          favorites: [{ id: cardId, rarity: card.rarity }],
        });
        console.log(`User document created with card ${cardId} as favorite`);
      }
    } catch (error) {
      console.error("Error managing favorites:", error);
    }
  };

  return { toggleFavorite };
};
