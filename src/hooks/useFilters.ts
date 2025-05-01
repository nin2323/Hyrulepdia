
const cardsFiltered = useMemo(() => {
    return cards.filter((card) => {
      const matchRarity = filterRarity ? card.rarity === filterRarity : true;
      const matchCategory = filterCategory ? card.category === filterCategory : true;
      return matchRarity && matchCategory;
    });
  }, [cards, filterRarity, filterCategory]);