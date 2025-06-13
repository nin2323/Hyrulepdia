import './LandingPage.css';
import { Button } from '../../components/button/button';
import { CardContainer } from '../../components/CardContainer/CardContainer';

export const LandingPage = () => {
  return (
    <>
      <header>
        <div className='header-content'>
          <h2 className='name-header'>HYRULEPEDIA</h2>
          <Button size='lg'>
            <a href='https://ejemplo.com' className='btn-link-header'>
              LOGIN
            </a>
          </Button>
        </div>
      </header>
      <div className='logo-intro-action'>
        <img src={'src/assets/logo-login.svg'} alt='logo' />
        <Button size='lg'>
          <a href='https://ejemplo.com' className='btn-link-header'>
            PLAY FREE
          </a>
        </Button>
        <h2>BEGIN YOUR ADVENTURE</h2>
        <p className='description-logo-landing'>
          Open chests, collect epic cards, and build the ultimate deck.
        </p>
      </div>
      <div className='containers-whit--cardContainer'>
        <CardContainer
          className='container-callToaction--with-button'
          colorClass='blue-theme'
        >
          <div className='call-to-action-content'>
            <div className='call-to-action-text'>
              <h2>
                <span className='highlight-blue'>CHESTS TO OPEN </span>
                <span>AND EPIC REWARDS</span>
              </h2>
              <p className='card-container-text-blue'>
                Explore magical chests and discover unique cards from the most
                iconic heroes and enemies of the Zelda world. Each opening is a
                new surprise on your journey through Hyrule.
              </p>
              <br />
              <br />
              <br />
              <Button size='lg'>
                <a href='https://ejemplo.com' className='btn-link-header'>
                  START
                </a>
              </Button>
            </div>
            <div className='call-to-action-image-blue'>
              <img
                src='dist/assets/chest-rare-Cqgg7ku4.svg'
                alt='Zelda Chest'
              />
            </div>
          </div>
        </CardContainer>
        <CardContainer
          className='container-callToaction--with-button'
          colorClass='golden-theme'
        >
          <div className='call-to-action-content'>
            <div className='call-to-action-image-golden'>
              <img
                src='dist/assets/chest-common-CPlnIn8-.svg'
                alt='Zelda Chest'
              />
            </div>
            <div className='call-to-action-text'>
              <h2>
                <span>COLLECT </span>
                <span className='highlight-golden'>UNIQUE AND POWERFUL</span>
                <span> CARDS</span>
              </h2>
              <p className='card-container-text-golden'>
                Embark on an epic journey to collect unique and powerful cards.
                Each card you find brings you closer to mastering your deck and
                conquering new challenges across Hyrule.
              </p>
              <br />
              <br />
              <br />
              <Button size='lg'>
                <a href='https://ejemplo.com' className='btn-link-header'>
                  START
                </a>
              </Button>
            </div>
          </div>
        </CardContainer>
        <CardContainer
          className='container-callToaction--with-button'
          colorClass='purple-theme'
        >
          <div className='call-to-action-content'>
            <div className='call-to-action-text'>
              <h2>
                <span>COLLECT </span>
                <span className='highlight-purple'>UNIQUE AND POWERFUL</span>
                <span> CARDS</span>
              </h2>
              <p className='card-container-text-purple'>
                Embark on an epic journey to collect unique and powerful cards.
                Each card you find brings you closer to mastering your deck and
                conquering new challenges across Hyrule.
              </p>
              <br />
              <br />
              <br />
              <Button size='lg'>
                <a href='https://ejemplo.com' className='btn-link-header'>
                  START
                </a>
              </Button>
            </div>
            <div className='call-to-action-image-purple'>
              <img
                src='dist/assets/chest-epic-CAYVncT6.svg'
                alt='Zelda Chest'
              />
            </div>
          </div>
        </CardContainer>
      </div>
      <div className='infodump-images--container'>
        <div className='indofump-image'>
          <img src='dist/images/Frame 19.png' alt='Zelda Chest' />
          <br />
          <br />
          <br />
          <div className='indofump-image'>
            <img src='dist/images/CARDS INFORMACION.png' alt='Zelda Chest' />
          </div>
        </div>
      </div>
      <CardContainer
        className='container-callToaction--with-button'
        colorClass='golden-theme'
      >
        <div className='call-to-action-content'>
          <div className='call-to-action-text'>
            <h2>
              <span className='highlight-blue'>CLIMB YOUR </span>
              <span>FREE WELCOME CHEST</span>
            </h2>
            <p className='card-container-text-blue'>
              Unlock your free Welcome Chest and start your adventure with
              powerful cards. Each chest brings you closer to building the
              ultimate deck and conquering new challenges.
            </p>
            <br />
            <br />
            <br />
            <Button size='lg'>
              <a href='https://ejemplo.com' className='btn-link-header'>
                OPEN NOW
              </a>
            </Button>
          </div>
          <div className='call-to-action-image-blue'>
            <img src='dist/assets/chest-rare-Cqgg7ku4.svg' alt='Zelda Chest' />
          </div>
        </div>
      </CardContainer>
    </>
  );
};
