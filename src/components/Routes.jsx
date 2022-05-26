import { useRoutes } from "react-router-dom";

import { LoginPage, MyOrdersPage, NewOrderPage } from "../pages";

const Routes = ({ newOrderUpdate, newOrderId, navigateToMyOrders }) => {
  let routes = useRoutes([
    {
      path: "/",
      element: <LoginPage navigateToMyOrders={navigateToMyOrders} />,
    },
    {
      path: "/login",
      element: <LoginPage navigateToMyOrders={navigateToMyOrders} />,
    },
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
