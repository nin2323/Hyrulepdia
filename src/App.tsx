import './App.css'
import { Button } from './component/button'
import './styles/variables.css'

function App() {

  return (
    <>
    <div className='buttons-contain'>
      <Button color='primary' size='md'>My Collection</Button>
      <Button color='secondary' size='md'>My Collection</Button>
      <Button color='primary' disabled={true} size='md'>My Collection</Button> 
      <Button color='primary' size='sm'>My Collection</Button> 
      <Button size='lg' color='secondary'>My Collection</Button> 
      <Button color='error' size='md'>My Collection</Button>
      <Button color='succes' size='md'>My Collection</Button>
      <Button color='info' size='md'>My Collection</Button>
      <Button color='warning' size='md'>My Collection</Button>
    </div>
    </>
  )
};

export default App
