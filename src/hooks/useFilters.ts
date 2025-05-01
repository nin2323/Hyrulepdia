import { useMemo, useState } from "react";
import { HyruleCardType } from "../types/hyrule.types";
import { Category } from "../components/filters/filters";

export const useFilters = (cards: HyruleCardType[]) => {
  const [filterRarity, setFilterRarity] = useState<"common" | "rare" | "epic" | "">("");
  const [filterCategory, setFilterCategory] = useState<Category | "">("");

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchRarity = filterRarity ? card.rarity === filterRarity : true;
      const matchCategory = filterCategory ? card.category === filterCategory : true;
      return matchRarity && matchCategory;
    });
  }, [cards, filterRarity, filterCategory]);

  return {
    filteredCards,
    setFilterRarity,
    setFilterCategory,
  };
};