import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { HyruleCardType } from "../types/hyrule.types";

export const CollectionFavorites = (shouldFetch: boolean) => {
  const [favoriteCards, setFavoriteCards] = useState<HyruleCardType[]>([]); // Cartas favoritas
  const [loading, setLoading] = useState(false); // Estado de carga
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]); // IDs de las cartas favoritas

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userId = user.uid;

        // Obtener las cartas favoritas desde Firebase
        const cardsRef = collection(db, "users", userId, "hyrule_cards");
        const q = query(cardsRef, where("favorite", "==", true)); // Filtramos por cartas favoritas

        const querySnapshot = await getDocs(q);

        const fetchedFavoriteCards = querySnapshot.docs.map((doc) => {
          const card = doc.data() as HyruleCardType;
          return card;
        });

        // Extraer los IDs de las cartas favoritas
        const fetchedFavoriteIds = fetchedFavoriteCards.map((card) => card.id);

        setFavoriteCards(fetchedFavoriteCards); // Establecer las cartas favoritas
        setFavoriteIds(fetchedFavoriteIds); // Establecer los IDs de las cartas favoritas
        setLoading(false); // Terminar la carga
      } catch (error) {
        console.error("Error al obtener las cartas favoritas:", error);
        setLoading(false);
      }
    };

    if (shouldFetch) {
      console.log("Fetching favorites...");
      fetchFavorites();
    }
  }, [shouldFetch]);

  return { favoriteCards, loading, favoriteIds }; // Devolver las cartas favoritas, la carga y los IDs
};
