import { useEffect, useMemo, useState } from "react";
import { getAllCards } from "../../services/getAllCards";
import { HyruleCard } from "../hyrule-card/HyruleCard";
import { HyruleCardType } from "../../types/hyrule.types";
import { Category } from "../filters/filters";
import { Filters } from "../filters/filters";
import '../hyrule-card/hyruleCard.css'
import './collection-all.css'

export const CollectionAll = () => {
    const [cards, setCards] = useState<HyruleCardType[]>([]);
    const [filterRarity, setFilterRarity] = useState<"common" | "rare" | "epic" | "">("");
    const [filterCategory, setFilterCategory] = useState<Category | "">("");

    useEffect (() =>{
        const fetchData = async () => {
            const data = await getAllCards();
            console.log("Fetched cards:", data); // <-- Asegurate de que esto tenga contenido
            if (data) setCards(data);
        };
        fetchData();
    }, []);

    const cardsFiltered = useMemo(() => {
        return cards.filter((card) => {
          const matchRarity = filterRarity ? card.rarity === filterRarity : true;
          const matchCategory = filterCategory ? card.category === filterCategory : true;
          return matchRarity && matchCategory;
        });
      }, [cards, filterRarity, filterCategory]);

    return (
    <>
        <Filters
          onFilterRarityChange={setFilterRarity}
          onFilterCategoriaChange={setFilterCategory}
        />
        <div className="collection-container">
          {cardsFiltered.map((card) => (
            <HyruleCard key={card.id} {...card} />
          ))}
        </div>
      </>
    );
};