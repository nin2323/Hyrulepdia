import { Button } from '../button/button'
import { ChestButton } from '../chest-button/ChestButton'
import './StoreMain.css'

export const StoreMain = () => {
    return (
        <>
            <div className="store-main">
                <ChestButton rarity="rare" price={500} />
                <ChestButton rarity="common" price={500} />
                <ChestButton rarity="epic" price={500} />
            </div>
            <div className='store-main__textbox'>
                <p className='store-main__text'>Select a chest to continue...</p>
                <div className='hyrule-cards__textbox__buttons'>
                    <Button>COLLECTION</Button>
                    <Button>MORE GEMS</Button>
                </div>
            </div>
        </>
    )
}