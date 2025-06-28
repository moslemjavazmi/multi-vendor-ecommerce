// import React, { useEffect, useState } from "react";
// import Router from "./router/Router";
// import publicRoutes from "./router/routes/publicRoutes";
// import { useDispatch, useSelector } from "react-redux";
// import Navbar from "./components/Navbar";
// import ProductCard from "./components/ProductCard";
// import { getRoutes } from "./router/routes";
// import { all } from "axios";
// import { get_user_info } from "./store/Reducers/authReducer";
// function App() {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
//   console.log(allRoutes);
//   useEffect(() => {
//     const routes = getRoutes();
//     // console.log(routes);
//     setAllRoutes([...allRoutes, ...routes]);
//   }, []);
//   useEffect(() => {
//     if (token) {
//       dispatch(get_user_info());
//     }
//   }, [token]);
//   return (
//     <>
//       {/* <Navbar /> */}
//       <Router allRoutes={allRoutes} />
//     </>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";
import { get_user_info } from "./store/Reducers/authReducer";
function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }
  }, [token]);
  return <Router allRoutes={allRoutes} />;
}

export default App;
