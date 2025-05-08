import { useEffect, useState } from "react";
import { getAllCards } from "../../services/getAllCards";
import { HyruleCard } from "../hyrule-card/HyruleCard";
import { HyruleCardType } from "../../types/hyrule.types";
import { Filters } from "../filters/filters";
import { useFilters } from "../../hooks/useFilters";
import { CardCounter } from "../cardCounter/CardCounter";
import { ModalCard } from "../modalCard/ModalCard";
import '../hyrule-card/hyruleCard.css';
import './collection-all.css'
import '../cardCounter/card-counter.css'
import '../modalCard/modal-card.css'
import { Button } from "../button/button";
import { useNavigate } from "react-router-dom";

interface CollectionAllProps {
  variant?: 'default' | 'library';
};

export const CollectionAll = ({ variant = 'default' }: CollectionAllProps) => {
  const [cards, setCards] = useState<HyruleCardType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCards();
      if (data) setCards(data);
    };
    fetchData();
  }, []);

  const [selectedCard, setSelectedCard] = useState<HyruleCardType | null>(null);


  const { filteredCards, setFilterRarity, setFilterCategory , setSearchQuery, setIsReversed} = useFilters(cards);

  return (
    <>
      <Filters
        onFilterTypesChange={setFilterRarity}
        onFilterCategoryChange={setFilterCategory}
        onSearchChange={setSearchQuery}
        setIsReversed={setIsReversed}
      />
      <div className="collection-page">
        <div className="collection-page__buttons">
          <Button onClick={() => navigate("/collection")} size="lg">My Cards</Button>
          <Button onClick={() => navigate("/collection/decks")} size="lg">Decks</Button>
          <Button onClick={() => navigate("/collection/library")} size="lg">Library</Button>
        </div>
      <div className="cards-wrapped">
        <CardCounter obtained={filteredCards.length} total={cards.length}/>
        <div className="collection-container">
          {filteredCards.map((card) => (
            <div key={card.id} onClick={() => setSelectedCard(card)}>
            <HyruleCard key={card.id} {...card} variant={variant} />
            </div>  
          ))}
        </div>
      </div>
      </div>
      {selectedCard && (
      <ModalCard
        selectedCard={selectedCard}
        onClose={() => setSelectedCard(null)}
        onAddToFavorites={(cardId) => {
          console.log("Añadida a favoritos:", cardId);
        }}
      />
    )}
    </>
  );
};