import React from "react";
import { useRoutes } from "react-router-dom";

import {
  LoginPage,
  MyOrdersPage,
  NewOrderPage,
  OrderConfirmationPage,
} from "../pages";

const Routes = () => {
  let routes = useRoutes([
    { path: "/", element: <LoginPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/my-orders", element: <MyOrdersPage /> },
    { path: "/new-order", element: <NewOrderPage /> },
    { path: "/order-confirmation", element: <OrderConfirmationPage /> },
  ]);
  return routes;
};

export default Routes;
