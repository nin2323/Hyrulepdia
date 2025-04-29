import  './StoreOpening.css'
import { HyruleCardType } from "../../types/hyrule.types";
import { HyruleCard } from "../hyrule-card/HyruleCard";
import { CardContainer } from '../CardContainer/CardContainer';
import { Button } from '../button/button';
import { useNavigate } from 'react-router-dom';

type storeOpening = {
    cards: HyruleCardType[],
}

export const StoreOpening = ({cards}: storeOpening) => {
    const navigate = useNavigate();

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