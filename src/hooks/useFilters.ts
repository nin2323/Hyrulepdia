import { useState, useMemo } from "react";
import { HyruleCardType } from "../types/hyrule.types";

export const useFilters = (cards: HyruleCardType[]) => {
  const [filterRarity, setFilterRarity] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const clearFilters = () => {
    setFilterRarity('All');
    setFilterCategory('All');
  };

  const filteredCards = useMemo(() => {
    let result = cards.filter((card) => {
      const matchesRarity = filterRarity === 'All' || card.rarity === filterRarity;
      const matchesCategory = filterCategory === 'All' || card.category === filterCategory;
      const matchesSearch = searchQuery
        ? card.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
        : true;
      return matchesRarity && matchesCategory && matchesSearch;
    });
  
    if (isReversed) {
      result = [...result].reverse();
    }
  
    return result;
  }, [cards, filterRarity, filterCategory, searchQuery, isReversed]);

  return {
    filteredCards,
    setFilterRarity,
    setFilterCategory,
    clearFilters,
    setSearchQuery,
    setIsReversed,
    isReversed,
  };
};
