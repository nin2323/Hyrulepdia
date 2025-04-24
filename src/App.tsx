import { Link, NavLink } from 'react-router-dom'
import './App.css'
import { Button } from './component/button'
import './styles/variables.css'

export function App() {

  return (
    <>
    <div className='buttons-contain'>
      <Button component={NavLink} to='/Home'>My Collection</Button>
      <Button>My Collection</Button>
    </div>
    </>
  )
};


