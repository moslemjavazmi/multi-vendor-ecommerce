import { lazy } from "react";
const Home = lazy(() => import("../../views/pages/Home"));
export const sellerRoutes = [
  {
    path: "/",
    element: <Home />,
    ability: ["admin", "seller"]
  }
];
