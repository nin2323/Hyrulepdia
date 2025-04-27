import type { ChestButtonType } from "../../types/hyrule.types"
import './ChestButton.css'
import commonChest from '../../assets/chests/chest-common.svg'
import rareChest from '../../assets/chests/chest-rare.svg'
import epicChest from '../../assets/chests/chest-epic.svg'
import rupiaIcon from '../../assets/rupia-icon.png'

//para que cambie la descripción según el tipo de cofre
const displayDescription = (rarity: ChestButtonType['rarity']) => {
    switch (rarity) {
        case 'common':
            return <h3>Contains mostly <br/><span className="chest-button__text__common">COMMON</span> cards</h3>;
        case 'rare':
            return <h3>High chance of <br/><span className="chest-button__text__rare">RARE</span> card</h3>;
        case 'epic':
            return <h3>High chance of <br/><span className="chest-button__text__epic">EPIC</span> card</h3>;
    }
}

//para que cambie el color del texto h1 según el tipo de cofre
const displayRarity = (rarity: ChestButtonType['rarity']) => {
    switch (rarity) {
        case 'common':
            return <span className="chest-button__text__common">{rarity.toUpperCase()}</span>;
        case 'rare':
            return <span className="chest-button__text__rare">{rarity.toUpperCase()}</span>;
        case 'epic':
            return <span className="chest-button__text__epic">{rarity.toUpperCase()}</span>;
    }
}

//para que cambie la imágen según el tipo de cofre
const displayChestType = (rarity: ChestButtonType['rarity']) => {
    switch (rarity) {
        case 'common':
            return <img className="chest-button__img" src={commonChest} alt={commonChest}></img>;
        case 'rare':
            return <img className="chest-button__img" src={rareChest} alt={rareChest}></img>;
        case 'epic':
            return <img className="chest-button__img" src={epicChest} alt={epicChest}></img>
    }
}

export const ChestButton = ({
    rarity = 'epic',
    price = 500,
} : ChestButtonType ) => {

    console.log(rarity, price)

    return (
        <div className="chest-button">
            <h1>
                CHEST
                <br />
                {displayRarity(rarity)}
            </h1>
            {displayChestType(rarity)}
            <h2>{price} <span><img src={rupiaIcon} alt={rupiaIcon}></img></span></h2>
            <div className="chest-button__text">
                {displayDescription(rarity)}
            </div>
        </div>

    );
    
}