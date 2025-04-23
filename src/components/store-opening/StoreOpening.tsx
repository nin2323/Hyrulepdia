import { useEffect, useState } from "react";
import { getRandomHyruleData } from "../../services/hyrule-card.service"; // Ajustá la ruta si cambia
import { HyruleCardType } from "../../types/hyrule.types";
import { HyruleCard } from "../hyrule-card/HyruleCard";


export const StoreOpening = () => {
    const [cards, setCards] = useState<HyruleCardType[]>([]);

    useEffect(() => { //se ejecuta una vez al mostrarse el componente, el array de dependencias está vacío
        const fetchCards = async () => { //la función fetchCards, asíncrona se encarga de llamar a la api y guardar los datos en el estado cards
            const result = await getRandomHyruleData(3);
            if (result) setCards(result); //si la función devuelve algo, guardamos las cartas en el estado
        };
        fetchCards();
    }, []);

    return (
        <div className="cards-container">
        {cards.length === 0 ? (
        <p>Loading cards...</p>
        ) : (
        cards.map((card) => <HyruleCard key={card.id} {...card} />)
        )}
    </div>
    )
}