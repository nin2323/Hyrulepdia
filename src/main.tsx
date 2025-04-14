import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { CollectionPage } from './CollectionPage.tsx';
import { PorfilePage } from './ProfilePage.tsx';
import { ShopPage } from './ShopPage.tsx';
import { HomePage } from './HomePage.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="collection" element={<CollectionPage />} />
        <Route path="profile" element={<PorfilePage />} />
        <Route path="shop" element={<ShopPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
