import './App.css'
import { Header } from './component/header'
import { Outlet } from 'react-router-dom'

export const App = () => {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  )
};


