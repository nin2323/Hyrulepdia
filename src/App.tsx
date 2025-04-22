import './App.css'
import { Button } from './component/button'

function App() {

  return (
    <>
    <div className='buttons-contain'>
      <Button color='primary' size='md'>Mi colección</Button>
      <Button color='secondary' size='md'>Mi colección</Button>
      <Button color='primary' disabled={true} size='md'>Mi colección</Button> 
      <Button color='primary' size='sm'>Mi colección</Button> 
      <Button size='lg' color='secondary'>Mi colección</Button> 
      <Button color='error' size='md'>Mi colección</Button>
      <Button color='succes' size='md'>Mi colección</Button>
      <Button color='info' size='md'>Mi colección</Button>
      <Button color='warning' size='md'>Mi colección</Button>
    </div>
    </>
  )
};

export default App
