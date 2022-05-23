import React, { useState } from "react";
import { useRoutes } from "react-router-dom";

import {
  LoginPage,
  MyOrdersPage,
  NewOrderPage,
  OrderConfirmationPage,
} from "../pages";

const Routes = ({ updateOrderState, isNewOrder }) => {
  let routes = useRoutes([
    { path: "/", element: <LoginPage /> },
    { path: "/login", element: <LoginPage /> },
    {
      path: "/my-orders",
      element: <MyOrdersPage isNewOrder={isNewOrder} />,
    },
    {
      path: "/new-order",
      element: <NewOrderPage updateOrderState={updateOrderState} />,
    },
    { path: "/order-confirmation", element: <OrderConfirmationPage /> },
  ]);
  return routes;
};

export default Routes;
