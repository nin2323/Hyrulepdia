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
import { Button } from "../button/button.tsx";
import { useNavigate } from "react-router-dom";
import { CollectionFavorites } from "../../hooks/useCollectionFavorites.ts";

interface CollectionAllProps {
  variant?: 'default' | 'library';
}

export const CollectionAll = ({ variant = 'default' }: CollectionAllProps) => {
  const [cards, setCards] = useState<HyruleCardType[]>([]); // Estado para todas las cartas
  const [favoriteCards, setFavoriteCards] = useState<HyruleCardType[]>([]); // Estado para cartas favoritas
  const [isShowingFavorites, setIsShowingFavorites] = useState(false);
  const [selectedCard, setSelectedCard] = useState<HyruleCardType | null>(null);

  const { favoriteIds, favoriteCards: fetchedFavoriteCards } = CollectionFavorites(isShowingFavorites); // Usamos los IDs de favoritos
  const navigate = useNavigate();

  // Cargar todas las cartas
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCards();
      if (data) setCards(data);
    };
    fetchData();
  }, []);

  // Cargar cartas favoritas cuando los IDs cambian
  useEffect(() => {
    if (fetchedFavoriteCards.length > 0) {
      setFavoriteCards(fetchedFavoriteCards); // Si ya tenemos las cartas favoritas
    }
  }, [fetchedFavoriteCards]);

  // Filtros
  const filtersForAll = useFilters(cards);
  const filtersForFavorites = useFilters(favoriteCards);

  const {
    filteredCards,
    setFilterRarity,
    setFilterCategory,
    setSearchQuery,
    setIsReversed,
  } = isShowingFavorites ? filtersForFavorites : filtersForAll;

  const handleFavoritesToggle = () => {
    setIsShowingFavorites(prev => !prev);
  };

  const handleRemoveFavoriteLocally = (id: number) => {
    setFavoriteCards(prev => prev.filter(card => card.id !== id)); // Elimina la carta localmente de los favoritos
  };

  

  // Las cartas a mostrar: si estamos mostrando favoritos, usamos 'favoriteCards', si no, usamos las cartas filtradas
  const cardsToDisplay = isShowingFavorites ? filtersForFavorites.filteredCards : filteredCards;

  return (
    <>
      <Filters
        onFilterTypesChange={setFilterRarity}
        onFilterCategoryChange={setFilterCategory}
        onSearchChange={setSearchQuery}
        setIsReversed={setIsReversed}
        onFavoritesToggle={handleFavoritesToggle}
        isShowingFavorites={isShowingFavorites}
      />
      <div className="collection-page">
        <div className="collection-page__buttons">
          <Button onClick={() => navigate("/collection")} size="lg">My Cards</Button>
          <Button onClick={() => navigate("/collection/decks")} size="lg">Decks</Button>
          <Button onClick={() => navigate("/collection/library")} size="lg">Library</Button>
        </div>
        <div className="cards-wrapped">
          <CardCounter obtained={filteredCards.length} total={cards.length} />
          <div className="collection-container">
            {cardsToDisplay.length === 0 && !isShowingFavorites ? (
              <p>No cards found</p>
            ) : (
              cardsToDisplay.map((card) => (
                <div key={card.id} onClick={() => setSelectedCard(card)}>
                  <HyruleCard key={card.id} {...card} variant={variant} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {selectedCard && (
        <ModalCard
          selectedCard={selectedCard}
          onClose={() => setSelectedCard(null)}
          favoriteIds={favoriteIds}
          onRemoveFavorite={handleRemoveFavoriteLocally}
        />
      )}
    </>
  );
};