import React, { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import getRoutes from "./router/routes";
function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  console.log(allRoutes);
  useEffect(() => {
    const routes = getRoutes();
    console.log(routes);
  }, []);
  return (
    <>
      <Navbar />
      <Router allRoutes={allRoutes} />
    </>
  );
}

export default App;
