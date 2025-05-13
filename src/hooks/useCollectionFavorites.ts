import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { HyruleCardType } from "../types/hyrule.types";
import { getFavoriteCards } from "../services/getFavoritesCards";

export const CollectionFavorites = (shouldFetch: boolean) => {
  const [favoriteCards, setFavoriteCards] = useState<HyruleCardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]); // Asegúrate de definir el estado para los IDs

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      // Validación de si existe el documento y si contiene la propiedad 'favorites'
      const fetchedFavoriteData = userDocSnap.exists() && userDocSnap.data()?.favorites
        ? userDocSnap.data()?.favorites : [];

      setFavoriteIds(fetchedFavoriteData.map((fav: any) => fav.id)); // solo si necesitas los IDs

      const cards = await getFavoriteCards(fetchedFavoriteData); // le pasas el array de objetos
      setFavoriteCards(cards);


      // Ahora que tenemos los IDs, obtenemos las cartas favoritas
      if (fetchedFavoriteData.length > 0) {
        const cards = await getFavoriteCards(fetchedFavoriteData);
        setFavoriteCards(cards);
      }

      setLoading(false);
    };

    if (shouldFetch) {
      console.log("Fetching favorites...");
      fetchFavorites();
    }
  }, [shouldFetch]);

  return { favoriteCards, loading, favoriteIds }; // Devuelves 'favoriteIds' para su uso
};
