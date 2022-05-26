import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { collection, getDocs } from "firebase/firestore";

import { BrownButton, Logo, SubmittedOrder } from "../components";
import { UserContext } from "../contexts/UserContext";
import { AlertContext } from "../contexts/AlertContext";
import { db } from "../firebase-config";

import { alphaWhite, motorcycle2, motorcycle3 } from "../images";

const MyOrdersPage = ({ newOrderId }) => {
  const isMediumScreen = useMediaQuery({ query: "(min-width: 992px)" });
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleNewOrder = () => {
    navigate("/new-order");
  };

  const handleGetOrders = async () => {
    let ordersArr = [];
    try {
      const userRef = collection(db, "users", user.uid, "orders");
      const results = await getDocs(userRef);
      if (results) {
        results.forEach((result) => {
          ordersArr.push(result.data());
        });
        setOrders(ordersArr);
      } else return;
    } catch {
      showAlert("Ooops something went wrong! Try again later", "danger");
    }
  };

  useEffect(() => {
    if (user) {
      handleGetOrders();
    }
  }, [user]);

  return (
    <section className="container pt-60 flex flex-col justify-between xs:pt-95 md:flex-row">
      <div className=" w-full md:w-7/10 md:pr-25">
        <div className="flex justify-between">
          <Logo />
          <div className="w-max" onClick={handleNewOrder}>
            <BrownButton text={"create new order"} />
          </div>
        </div>
        <h1 className="mt-25 text-24 font-semibold text-primary pt-4 capitalize">
          my orders
        </h1>
        <p className="text-14 text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="w-full h-350 relative">
          {orders.length === 0 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center ">
              <p className="text-14 text-secondary pb-10">You have no orders</p>
              <p
                className="text-12 font-bold text-brown capitalize cursor-pointer hover:text-primary transition-color"
                onClick={handleNewOrder}
              >
                create new order
              </p>
            </div>
          )}
          {orders.length > 0 && (
            <div className="pt-30 ">
              <div className="flex justify-between items-center w-9/10 mr-15 px-24 py-6 text-10 text-secondary capitalize">
                <p className="pr-10">order ID</p>
                <p className="pr-10">service date</p>
                <p className="pr-10">brand</p>
                <p className="pr-10">mileage</p>
              </div>
              <div className="h-50vh overflow-y-auto overflow-x-auto">
                {orders.map((order) => {
                  return (
                    <SubmittedOrder orderData={order} key={order.orderId} />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full py-30 mx-auto items-center justify-center relative xs:w-3/5 sm:w-1/2 md:w-3/10 md:py-0">
        {!newOrderId && isMediumScreen && (
          <div className="w-max relative ">
            <img
              src={alphaWhite}
              alt="Alpha text"
              className="absolute top-25 left-30"
            />
            <img
              src={motorcycle2}
              alt="motorcycle photo"
              className="rounded-lg bg-input-grey"
            />
          </div>
        )}
        {newOrderId && (
          <div
            className="w-full h-80vh mt-20 md:mt-0 p-30 border-1 border-solid border-input-grey rounded-lg relative bg-contain bg-no-repeat bg-bottom text-secondary"
            style={{ backgroundImage: `url(${motorcycle3})` }}
          >
            <h2 className="text-24 font-semibold leading-8">
              Thank you <br />
              for your order: <br />
            </h2>
            <p className="text-16 font-semibold pb-20">#{newOrderId}!</p>
            <p className="text-14">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrdersPage;
