import { createBrowserRouter, Navigate } from "react-router";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Pricing from "../pages/Pricing";
import Products from "../pages/Products";
import Signup from "../pages/Signup";
import Support from "../pages/Support";
import NotFound from "../pages/NotFound";
import EquityTable from "../components/pricing/dynamicTables/EquityTable";
import CurrencyTable from "../components/pricing/dynamicTables/CurrencyTable";
import CommodityTable from "../components/pricing/dynamicTables/CommodityTable";
import FandOTable from "../components/pricing/dynamicTables/F&O";
import Login from "../pages/Login";
import EmailVerify from "../pages/EmailVerify";
import UserInfo from "../pages/UserInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "pricing",
        element: <Pricing />,
        children: [
          {
            index: true,
            element: <Navigate to="equities" replace />,
          },
          {
            path: "equities",
            element: <EquityTable />,
          },
          {
            path: "F&O",
            element: <FandOTable />,
          },
          {
            path: "currency",
            element: <CurrencyTable />,
          },
          {
            path: "commodity",
            element: <CommodityTable />,
          },
        ],
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "support",
        element: <Support />,
      },
      { path: "/profile",
        element:<UserInfo/>
       },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-email/:token",
    element: <EmailVerify />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
