import  './StoreOpening.css'
import { useEffect, useState } from "react";
import { getRandomHyruleData } from "../../services/hyrule-card.service"; // Ajustá la ruta si cambia
import { HyruleCardType } from "../../types/hyrule.types";
import { HyruleCard } from "../hyrule-card/HyruleCard";
import { CardContainer } from '../CardContainer/CardContainer';
import { Button } from '../button/button';


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
    <>
        <div className='store-opening'>
            <CardContainer>
            <div className="hyrule-cards-wrapper">

                <div className="hyrule-cards-container">
                    {cards.length === 0 ? (
                    <p>Loading cards...</p>
                    ) : (
                    cards.map((card) => <HyruleCard key={card.id} {...card} />)
                    )}
                </div>
            </div>
            </CardContainer>
            <div className='hyrule-cards__textbox'>
                <p>Cards are savd automaticaly. <br></br>You'll find your cards in your <span>COLLECTION</span></p>
                <div className='hyrule-cards__textbox__buttons'>
                    <Button>MY CARDS</Button>
                    <Button>UNLOCK CHESTS</Button>
                </div>
            </div>
        </div>
    </>
    )
}