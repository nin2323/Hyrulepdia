import  './StoreOpening.css'
import { useEffect, useState } from "react";
import { getRandomHyruleData } from "../../services/hyrule-card.service"; // Ajustá la ruta si cambia
import { HyruleCardType } from "../../types/hyrule.types";
import { HyruleCard } from "../hyrule-card/HyruleCard";
import { CardContainer } from '../CardContainer/CardContainer';
import { Button } from '../button/button';
import { useNavigate } from 'react-router-dom';

type ChestRarity = {
    rarity: 'common' | 'rare' | 'epic';
}

export const StoreOpening = ({rarity}: ChestRarity) => {
    const [cards, setCards] = useState<HyruleCardType[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => { //se ejecuta una vez al mostrarse el componente, el array de dependencias está vacío
        
        //esta parte del código es para que al recargar en storeOpening no genere nuevas cartas
        const entries = performance.getEntriesByType("navigation");
        const navEntry = entries[0] as PerformanceNavigationTiming | undefined;

        const tipo = navEntry?.type;
        const esRecargaOBackForward =
            tipo === "reload" || tipo === "back_forward";

        if (esRecargaOBackForward) {
            navigate("/shop") ;
            return;
        }

        //esto es para guardar las cartas en una var llamada result
        const fetchCards = async () => { //la función fetchCards, asíncrona se encarga de llamar a la api y guardar los datos en el estado cards
            const result = await getRandomHyruleData(3, rarity );
            if (result) setCards(result); //si la función devuelve algo, guardamos las cartas en el estado
        };
        fetchCards();
    }, [navigate]);

    return (
    <>
        <div className='store-opening'>
            <CardContainer>
            <div className="hyrule-cards-wrapper">

                <div className="hyrule-cards-container">
                    {cards.length === 0 ? (
                    <p className='hyrule-cards-container__loading-info'>Loading cards...</p>
                    ) : (
                    cards.map((card) => <HyruleCard key={card.id} {...card} />)
                    )}
                </div>
            </div>
            </CardContainer>
            <div className='hyrule-cards__textbox'>
                <p>Cards are savd automaticaly. <br></br>You'll find your cards in your <span>COLLECTION</span></p>
                <div className='hyrule-cards__textbox__buttons'>
                    <Button onClick={() => navigate('/collection')}>MY CARDS</Button>
                    <Button>UNLOCK CHESTS</Button>
                </div>
            </div>
        </div>
    </>
    )
}