import { createBrowserRouter, Navigate } from "react-router";

import DashboardLayout from "../layouts/Dashboard";

import Summary from "../pages/Summary";
import Orders from "../pages/Orders";
import Holdings from "../pages/Holdings";
import Positions from "../pages/Positions";
import Funds from "../pages/Funds";
import Apps from "../pages/Apps";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/Auth/ProtectedRoutes";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <Summary />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "holdings",
            element: <Holdings />,
          },
          {
            path: "positions",
            element: <Positions />,
          },
          {
            path: "funds",
            element: <Funds />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
