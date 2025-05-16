import { lazy } from "react";
const AdminDashboard = lazy(() => import("../../views/pages/AdminDashboard"));
export const adminRoutes = [
  {
    path: "/",
    element: <AdminDashboard />,
    role: "admin"
  }
];
