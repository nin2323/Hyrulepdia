import { useEffect, useState } from "react";
import { getUserCards, UserCardData } from "../services/getUserCardsIds";

export const useUserCollection = () => {
  const [userCards, setUserCards] = useState<UserCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cards = await getUserCards();
        setUserCards(cards);
      } catch (err) {
        setError("Error loading user cards");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return { userCards, loading, error };
};