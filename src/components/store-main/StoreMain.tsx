import { useNavigate } from 'react-router-dom'
import { Button } from '../button/button'
import { ChestButton } from '../chest-button/ChestButton'
import './StoreMain.css'
import { ChestButtonType } from '../../types/hyrule.types'

export const StoreMain = () => {
    const navigate = useNavigate(); //hay que igualar useNavigate a una var const 

    const handleSelect = (rarity: ChestButtonType[`rarity`], price: number) => { //al clickar te lleva a purchase y te dice el estado que tiene que tener
        navigate('/purchase' , {
            state: {rarity, price},
        });
    };

    return (
        <>
            <div className="store-main">
                <div onClick={ ()=> handleSelect( 'rare', 500)}>
                    <ChestButton rarity="rare" price={500} />
                </div>
                <div onClick={()=> handleSelect('common', 200)}>
                    <ChestButton rarity="common" price={200} />
                </div>
                <div onClick={()=> handleSelect('epic', 800)}>
                    <ChestButton rarity="epic" price={800} />
                </div>
            </div>
            <div className='store-main__textbox'>
                <p className='store-main__textbox__text'>Select a chest to continue...</p>
                <div className='store-main__textbox__buttons'>
                    <Button onClick={() => navigate('/collection')}>COLLECTION</Button>
                    <Button>MORE GEMS</Button>
                </div>
            </div>
        </>
    )
}