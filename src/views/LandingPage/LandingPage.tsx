import './LandingPage.css';
import { Button } from '../../components/button/button';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import SVGSpotlight from '../../components/SVGSpotlight/SVGSpotlight';
import { Footer } from '../../components/footer/footer';
import chestRare from '../../../dist/assets/chest-rare-landing.png'
import chestRare2 from '../../../dist/assets/chest-rare-landing2.png'
import chestRare3 from '../../../dist/assets/chest-rare-landing3.png'
import { PeopleIcon } from '../../components/iconsCards/PeopleIcon';
import { TrophyIcon } from '../../components/iconsCards/TrophyIcon';
import { TreasureChestIcon } from '../../components/iconsCards/TreasureChestIcon';
import { CardsIcon } from '../../components/iconsCards/CardsIcons';

export const LandingPage = () => {
  return (
    <>
      <header className='header-landing'>
        <div className='header-content-landing'>
          <h2 className='name-header'>HYRULEPEDIA</h2>
          <Button size='lg'>
            <a
              href='https://hyrulepedia.firebaseapp.com/register'
              className='btn-link-header'
            >
              LOGIN
            </a>
          </Button>
        </div>
      </header>
      <div className='logo-intro-action'>
        <img src={'src/assets/logo-login.svg'} alt='logo' />
        <Button size='lg'>
          <a
            href='https://hyrulepedia.firebaseapp.com/register'
            className='btn-link-header'
          >
            PLAY FREE
          </a>
        </Button>
        <h2 className='texto--img--padding'>BEGIN YOUR ADVENTURE</h2>
        <p className='description-logo-landing'>
          Open chests, collect epic cards, and build the ultimate deck.
        </p>
      </div>
      <div className='containers-whit--cardContainer'>
        <div className='container--position'>
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
                <p className='card-container-text blue'>
                  Explore magical chests and discover unique cards from the most
                  iconic heroes and enemies of the Zelda world. Each opening is
                  a new surprise on your journey through Hyrule.
                </p>
                <div>
                  <Button size='lg'>
                    <a
                      href='https://hyrulepedia.firebaseapp.com/register'
                      className='btn-link-header'
                    >
                      START
                    </a>
                  </Button>
                </div>
              </div>
              <div className='call-to-action-image'>
                <img
                  src={ chestRare }
                  alt='Zelda Chest'
                />
              </div>
            </div>
          </CardContainer>
        </div>

        <div className='container--position right'>
          <CardContainer
            className='container-callToaction--with-button'
            colorClass='golden-theme'
          >
            <div className='call-to-action-content'>
              <div className='call-to-action-image golden'>
                <img
                  src={ chestRare2 }
                  alt='Zelda Chest'
                />
              </div>
              <div className='call-to-action-text'>
                <h2>
                  <span>COLLECT </span>
                  <span className='highlight-golden'>UNIQUE AND POWERFUL</span>
                  <span> CARDS</span>
                </h2>
                <p className='card-container-text golden'>
                  Embark on an epic journey to collect unique and powerful
                  cards. Each card you find brings you closer to mastering your
                  deck and conquering new challenges across Hyrule.
                </p>
                <div>
                  <Button size='lg' color='secondary'>
                    <a
                      href='https://hyrulepedia.firebaseapp.com/register'
                      className='btn-link-header'
                    >
                      START
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContainer>
        </div>

        <div className='container--position'>
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
                <p className='card-container-text'>
                  Embark on an epic journey to collect unique and powerful
                  cards. Each card you find brings you closer to mastering your
                  deck and conquering new challenges across Hyrule.
                </p>
                <div>
                  <Button size='lg'>
                    <a
                      href='https://hyrulepedia.firebaseapp.com/register'
                      className='btn-link-header'
                    >
                      START
                    </a>
                  </Button>
                </div>
              </div>
              <div className='call-to-action-image purple'>
                <img
                  src={ chestRare3 }
                  alt='Zelda Chest'
                />
              </div>
            </div>
          </CardContainer>
        </div>
      </div>
      <div className='landing-banner'>
        <div className='banner-item golden'>
          <div className='heading'>
            <div className='banner-item--icon'>
              <CardsIcon />
            </div>
            <h3>CARDS</h3>
          </div>
          <div className='content'>
            <p>Over 300 cards to discover.</p>
          </div>
        </div>
        <div className='banner-item'>
          <div className='heading'>
            <div className='banner-item--icon'>
              <TreasureChestIcon />
            </div>
            <h3>CHEST</h3>
          </div>
          <div className='content'>
            <p>Chests of different rarities</p>
          </div>
        </div>
        <div className='banner-item'>
          <div className='heading'>
            <div className='banner-item--icon'>
              <TrophyIcon />
            </div>
            <h3>ACHIEVEMENTS</h3>
          </div>
          <div className='content'>
            <p>Level up, unlock special cards...</p>
          </div>
        </div>
        <div className='banner-item'>
          <div className='heading'>
            <div className='banner-item--icon'>
              <PeopleIcon />
            </div>
            <h3>FRIENDS</h3>
          </div>
          <div className='content'>
            <p>Compare and enjoy with friends.</p>
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
            <p className='card-container-text blue'>
              Unlock your free Welcome Chest and start your adventure with
              powerful cards. Each chest brings you closer to building the
              ultimate deck and conquering new challenges.
            </p>
            <div>
              <Button size='lg'>
                <a
                  href='https://hyrulepedia.firebaseapp.com/register'
                  className='btn-link-header'
                >
                  OPEN NOW
                </a>
              </Button>
            </div>
          </div>
          <div className='call-to-action-image'>
            <img src='dist/assets/chest-rare-Cqgg7ku4.svg' alt='Zelda Chest' />
          </div>
        </div>
      </CardContainer>
      <SVGSpotlight />
      <Footer />
    </>
  );
};
