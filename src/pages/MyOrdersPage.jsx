import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { BrownButton, Logo, SubmittedOrder } from "../components";
import { UserContext } from "../contexts/UserContext";
import { auth, db } from "../firebase-config";

import { alphaWhite, motorcycle2, motorcycle3 } from "../images";

const MyOrdersPage = ({ newOrderId }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);
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
          console.log(result.data());
        });
        setOrders(ordersArr);
      } else return;
    } catch (error) {
      console.log(error.message);
    }
    console.log(orders);
  };

  useEffect(() => {
    if (user) {
      handleGetOrders();
      console.log(user.uid);
    }
  }, [user]);

  return (
    <section className="container pt-95 flex justify-between">
      <div className="pr-25 w-7/10">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-14 text-secondary pb-10">You have no orders</p>
              <p
                className="text-12 font-bold text-brown capitalize cursor-pointer hover:text-primary transition-color"
                onClick={handleNewOrder}
              >
                create new order
              </p>
            </div>
          )}
          {orders && (
            <div className="pt-30">
              <div className="flex justify-between items-center w-9/10 mr-15 px-24 py-6 text-10 text-secondary capitalize">
                <p>order ID</p>
                <p>service date</p>
                <p>brand</p>
                <p>mileage</p>
              </div>
              <div className="h-50vh overflow-y-scroll">
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

      <div className="flex w-3/10 items-center justify-center relative">
        {!newOrderId && (
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
            className="w-full h-80vh p-30 border-1 border-solid border-input-grey rounded-lg relative bg-contain bg-no-repeat bg-bottom  text-secondary"
            style={{ backgroundImage: `url(${motorcycle3})` }}
          >
            <h2 className="text-24 font-semibold leading-8">
              Thank you <br />
              for your order: <br />
              {/* <span className="text-16">#{newOrderId}!</span> */}
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
