import React, { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import { getRoutes } from "./router/routes";
import { all } from "axios";
function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  console.log(allRoutes);
  useEffect(() => {
    const routes = getRoutes();
    console.log(routes);
    setAllRoutes([...allRoutes, ...routes]);
  }, []);
  return (
    <>
      {/* <Navbar /> */}
      <Router allRoutes={allRoutes} />
    </>
  );
}

export default App;
