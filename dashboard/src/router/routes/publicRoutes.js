//src/router/routes/publicRoutes.js
import { lazy } from "react";
const Home = lazy(() => import("../../views/pages/Home"));

const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const UnAuthorized = lazy(() => import("../../views/UnAuthorized"));
const publicRoutes = [
  {
    path: "/",
    element: <Home />,
    ability: ["admin", "seller"]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin/login",
    element: <AdminLogin />
  },
  {
    path: "/anauthorized",
    element: <UnAuthorized />
  }
];
export default publicRoutes;
