import { collection, getDocs, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig/firebaseConfig";

export type UserCardData = {
  id: number;
  rareza: "common" | "rare" | "epic";
};

export const getUserCards = async (): Promise<UserCardData[]> => {
  const user = auth.currentUser;

  if (!user) {
    console.warn("Usuario no autenticado");
    return [];
  }

  const userCardsRef = collection(doc(db, "users", user.uid), "hyrule_cards");

  try {
    const snapshot = await getDocs(userCardsRef);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: parseInt(doc.id),
        rareza: data.rarity || "common", // fallback por si no está
      };
    });
  } catch (error) {
    console.error("Error al obtener cartas del usuario:", error);
    return [];
  }
};
