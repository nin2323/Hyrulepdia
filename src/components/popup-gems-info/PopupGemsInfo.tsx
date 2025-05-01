import './PopupGemsInfo.css'
import { Button } from '../button/button';

interface PopupGems {
    visible: boolean; //un boolean que cambiará de estado según lo que hagamos, será false, y el botón usara setShowPopup para convertir el estado en true
    onClose: () => void; //función definida en main que se encargará de gestionar el popup (setShowPopup)
}

export const PopupGemsInfo = ({visible, onClose}: PopupGems) => {
    if(!visible) return null; 

    return (
        <div className='popup-gems-info' onClick={onClose}>
            <div className='popup-gems-info__content' onClick={(e) => e.stopPropagation()}>
                <p>Here is some information about gems!</p>
                <Button onClick={onClose}>Close</Button>
            </div>
        </div>
    )
}