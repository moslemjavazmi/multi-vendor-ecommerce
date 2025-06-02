import { lazy } from "react";
const Home = lazy(() => import("../../views/pages/Home"));
const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const Products = lazy(() => import("../../views/seller/Products"));
const DiscountProducts = lazy(() =>
  import("../../views/seller/DiscountProducts")
);
const Orders = lazy(() => import("../../views/seller/Orders"));
const Payments = lazy(() => import("../../views/seller/Payments"));

export const sellerRoutes = [
  {
    path: "/",
    element: <Home />,
    ability: ["admin", "seller"],
  },
  {
    path: "seller/dashboard",
    element: <SellerDashboard />,
    ability: ["admin", "seller"],
  },
  {
    path: "seller/dashboard/add-product",
    element: <AddProduct />,
    ability: ["admin", "seller"],
  },
  {
    path: "seller/dashboard/products",
    element: <Products />,
    ability: ["admin", "seller"],
  },
  {
    path: "seller/dashboard/discount-products",
    element: <DiscountProducts />,
    ability: ["admin", "seller"],
  },
  {
    path: "seller/dashboard/orders",
    element: <Orders />,
    ability: ["admin", "seller"],
  },
  {
    path: "seller/dashboard/payments",
    element: <Payments />,
    ability: ["admin", "seller"],
  },
];
