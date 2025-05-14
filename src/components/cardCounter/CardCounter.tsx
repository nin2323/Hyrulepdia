import '../button/button.css'

interface CardCounterProps {
    total: number;
    obtained: number;
}

export const CardCounter = ({total, obtained}: CardCounterProps) => {
    return (
        <div className='card-counter-container'>
            <div className="card-counter">
            {obtained}/{total}
            <span className="right-line-top" />
            <span className="right-line-bottom" />
            <span className="left-line-top" />
            <span className="left-line-bottom" />
            <span className="top-line-left" />
            <span className="top-line-right" />
            <span className="bottom-line-left" />
            <span className="bottom-line-right" />
        </div>
      </div>
    );
};