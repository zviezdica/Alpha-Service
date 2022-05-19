import React from "react";
import { useRoutes } from "react-router-dom";

import { Login, MyOrders, NewOrder, OrderConfirmation } from ".";

const Routes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/new-order", element: <NewOrder /> },
    { path: "/order-confirmation", element: <OrderConfirmation /> },
  ]);
  return routes;
};

export default Routes;
