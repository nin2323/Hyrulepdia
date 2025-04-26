import './App.css'
import { HyruleCard } from './components/hyrule-card/HyruleCard.tsx'
import { StoreOpening } from './components/store-opening/StoreOpening.tsx'
import { Header } from './components/header/header'
import { Outlet } from 'react-router-dom'

export const App = () => {
  return (
    <>
      <Header/>
      {/* <HyruleCard />
      <StoreOpening /> */}
      <Outlet />
    </>
  )
};


