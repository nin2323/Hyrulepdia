import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../button/button'
import { ChestButton } from '../chest-button/ChestButton'
import './StoreMain.css'
import { ChestButtonType } from '../../types/hyrule.types'
import { PopupGemsInfo } from '../popup-gems-info/PopupGemsInfo'

export const StoreMain = () => {
    const [showPopup, setShowPopup] = useState(false); //maneja el estado del popup, inicia en falso para que no se muestre
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
                    <Button onClick={() => setShowPopup(true)}>MORE GEMS</Button> {/* Cuando se clicke, cambiará el estado de ShowPopup a true */}
                </div>
            </div>
            <PopupGemsInfo visible={showPopup} onClose={() => setShowPopup(false)}/>
        </>
    )
}
//PoppuGemsInfo no puede cerrarse por si mimo. Necesita avisar al componente padre que quiere cerrarse. Esto se hace llamando a la función onClose
// la función se define en SoreMain y luego se puede llevar de vuelta a PopupGemInfo
//Esa función se pasa como prop al componente hijo (PopupGemsInfo), y es lo que se ejecuta cuando el hijo llama a onClose().