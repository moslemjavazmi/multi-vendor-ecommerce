import React, { useState } from 'react';
import Router  from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  console.log( allRoutes);
  return (
    <>
    <Navbar />
    <Router allRoutes={allRoutes} />
    </>
  );
}

export default App;
