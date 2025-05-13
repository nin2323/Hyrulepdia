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
                <div>
                    <h1>GEMS - <span>QUICK<br/>GUIDE</span></h1>
                    <p>Collect gems to unlock powerful cards, decks, and exclusive content!</p>
                </div>
                <div className='popup-gems-info__gem-guide'>
                    <div className='popup-gems-info__gem-guide__hourly'>
                        <h2>HOURLY REWARD</h2>
                        <p>Get gems every hour just by being active!</p>
                        <p>- Log in regularly and collect your free hourly gems.</p>
                        <p>- Tip: Set a reminder to maximize your earnings!</p>
                    </div>
                    <div className='popup-gems-info__gem-guide__quests'>
                        <h2>COMPLET DAILY QUESTS</h2>
                        <p>Finish simple challenges like:</p>
                        <p>Win 3 matches | Use a Fire-type card |</p>
                        <p>Log in 3 days in a row</p>
                    </div>
                </div>
                <div className='popup-gems-info__gem-guide__battel'>
                    <h2>BATTEL WINS</h2>
                    <p>Win PvP or CPU matches to earn gems.</p>
                    <p>The tougher the opponent, the more gems you earn!</p>
                    <p>Streak bonuses available!</p>
                </div>
                <div/>
                <Button onClick={onClose}>Close</Button>
            </div>
        </div>
    )
}