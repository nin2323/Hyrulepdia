import './App.css'
import { Button } from './component/button'

function App() {

  return (
    <>
    <div className='buttons-contain'>
      <Button>Mi colección</Button>
      <Button color='secondary'>Mi colección</Button>
      <Button disabled={true}>Mi colección</Button> 
      <Button size='sm'>Mi colección</Button> 
      <Button size='lg' color='secondary'>Mi colección</Button> 
      <Button color='error'>Mi colección</Button> 
    </div>
    </>
  )
}

export default App
