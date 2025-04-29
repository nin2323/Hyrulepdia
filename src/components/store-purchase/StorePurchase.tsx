import { useNavigate } from "react-router-dom";
import { ChestButtonType } from "../../types/hyrule.types"
import { Button } from "../button/button"
import { ChestButton } from "../chest-button/ChestButton"
import './StorePurchase.css'

type StorePurchaseProps = {
    selectedChest: {
        rarity: ChestButtonType['rarity'],
        price: number,
    },
    onOpen: () => void 
};

export const StorePurchase = ({selectedChest, onOpen}: StorePurchaseProps) => {
    const navigate = useNavigate();
    if (!selectedChest) return null
    const {rarity, price} = selectedChest;
    
    return (
            <div className="store-purchase">
                <Button onClick={() => navigate(-1)}>BACK</Button>
                <Button color='secondary' onClick={onOpen}>OPEN</Button>
                {/* Pasamos los datos al ChestButton */}
                <ChestButton rarity={rarity} price={price} />
                <div className="store-purchase__info">
                    <h1>
                        CHEST <br/>
                        { rarity === 'common' && <span className='store-purchase__title-common' style={{ textTransform: 'uppercase' }}>{rarity}</span>}
                        { rarity === 'rare' && <span className='store-purchase__title-rare' style={{ textTransform: 'uppercase' }}>{rarity}</span>}
                        { rarity === 'epic' && <span className='store-purchase__title-epic' style={{ textTransform: 'uppercase' }}>{rarity}</span>}
                    </h1>
                    <p>
                        {rarity === 'common' && 'This may look like an ordinary chest… but even the most modest of treasures can hold great potential. The Common Chest contains a selection of useful cards to help you grow your collection — perfect for those just starting their adventure across the Zelda universe.'}
                        {rarity === 'rare' && 'The Rare Chest glows with a mysterious energy… Within it lie powerful cards rarely seen by most adventurers. Opening this chest gives you the chance to uncover rare finds that could turn the tide of your journey and bring unexpected strength to your deck.'}
                        {rarity === 'epic' && 'Radiating with brilliance, the Epic Chest is no simple treasure. It holds within it cards of great power and prestige — the kind sought by seasoned heroes across Hyrule. Open it, and you may discover epic cards that mark a true turning point in your legend.'}
                    </p>
                        { rarity === 'common' && <h2 className='store-purchase__title-common' style={{ textTransform: 'uppercase' }}>DROP RATE</h2>}
                        { rarity === 'rare' && <h2 className='store-purchase__title-rare' style={{ textTransform: 'uppercase' }}>DROP RATE</h2>}
                        { rarity === 'epic' && <h2 className='store-purchase__title-epic' style={{ textTransform: 'uppercase' }}>DROP RATE</h2>}
                    <ul>
                        {rarity === 'common' && (
                            <>
                                <li>80% Common</li>
                                <li>15% Rare</li>
                                <li>5% Epic</li>
                            </>
                        )}
                        {rarity === 'rare' && (
                            <>
                                <li>70% Common</li>
                                <li>25% Rare</li>
                                <li>5% Epic</li>
                            </>
                        )}
                        {rarity === 'epic' && (
                            <>
                                <li>55% Common</li>
                                <li>25% Rare</li>
                                <li>15% Epic</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        )
}