import chuchu from '../../assets/images/chuchu.png'
import './hyruleCard.css'
import '../../assets/fonts/title.css';
import cardFrame from '../../assets/decorations/card-frame.svg'
import enemyIcon from '../../assets/icons/enemy-icon.svg'

export const HyruleCard = () => {
    
    return (
        <div className='hyrule-card__border'>
            <div className="hyrule-card">
                <div className="hyrule-card__header">
                    <h2>CHUCHU</h2>
                    <div className='hyrule-card__type'>
                        <span className='hyrule-card__points'>200</span>
                        <img className='hyrule-card__icon'src={enemyIcon} alt='enemy-icon' />
                    </div>
                </div>
                <div className="hyrule-card__image">
                    <img src={chuchu} alt='chuchu'></img>
                </div>
                <div className='hyrule-card__content'>
                    <img className='hyrule-card__content__frame' src={cardFrame} alt='hola' />
                    <div className='hyrule-card__content__info'>
                        <div className='hyrule-card__description'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                        </div>
                        <div className='hyrule-card__section'>
                            <h3>Comon Locations</h3>
                            <p>Lorem ipsum dolor sit amet,</p>
                        </div>
                        <div className='hyrule-card__section'>
                            <h3>Droppable Items</h3>
                            <p>Lorem ipsum dolor sit amet,</p>
                        </div>
                    </div>
                </div>
                <div className='hyrule-card__footer'>84/389</div>
            </div>
        </div>
    )
}