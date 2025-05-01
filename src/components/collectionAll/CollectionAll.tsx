import { useEffect, useState } from "react";
import { getAllCards } from "../../services/getAllCards";
import { HyruleCard } from "../hyrule-card/HyruleCard";
import { HyruleCardType } from "../../types/hyrule.types";
import { Filters } from "../filters/filters";
import { useFilters } from "../../hooks/useFilters"; // <- importa tu hook
import '../hyrule-card/hyruleCard.css';
import './collection-all.css';

export const CollectionAll = () => {
  const [cards, setCards] = useState<HyruleCardType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCards();
      if (data) setCards(data);
    };
    fetchData();
  }, []);

  const {
    filteredCards,
    setFilterRarity,
    setFilterCategory,
  } = useFilters(cards);

  return (
    <>
      <Filters
        onFilterRarityChange={setFilterRarity}
        onFilterCategoriaChange={setFilterCategory}
      />
      <div className="collection-container">
        {filteredCards.map((card) => (
          <HyruleCard key={card.id} {...card} />
        ))}
      </div>
    </>
  );
};