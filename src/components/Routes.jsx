import React, { useState } from "react";
import { useRoutes } from "react-router-dom";

import { LoginPage, MyOrdersPage, NewOrderPage } from "../pages";

const Routes = ({ newOrderUpdate, newOrderId }) => {
  let routes = useRoutes([
    { path: "/", element: <LoginPage /> },
    { path: "/login", element: <LoginPage /> },
    {
      path: "/my-orders",
      element: <MyOrdersPage newOrderId={newOrderId} />,
    },
    {
      path: "/new-order",
      element: <NewOrderPage newOrderUpdate={newOrderUpdate} />,
    },
  ]);
  return routes;
};

export default Routes;
