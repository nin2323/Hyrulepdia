import './LandingPage.css';
import { Button } from '../../components/button/button';
import { CardContainer } from '../../components/CardContainer/CardContainer';

export const LandingPage = () => {
  return (
    <>
      <header>
        <div className='header-content'>
          <h2 className='name-header'>HYRULEPEDIA</h2>
          <Button>
            <a href='https://ejemplo.com' className='btn-link-header'>
              LOGIN
            </a>
          </Button>
        </div>
      </header>
      <div className='logo-intro-action'>
        <img src={'src/assets/logo-login.svg'} alt='logo' />
        <Button>
          <a href='https://ejemplo.com' className='btn-link-header'>
            PLAY FREE
          </a>
        </Button>
        <h2>BEGIN YOUR ADVENTURE</h2>
        <p className='description-logo-landing'>
          Open chests, collect epic cards, and build the ultimate deck.
        </p>
      </div>
    </>
  );
};
