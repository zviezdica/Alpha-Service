import React from "react";
import { useNavigate } from "react-router-dom";

import { BrownButton, Logo } from "../components";

import { alphaWhite, motorcycle2 } from "../images";

const MyOrdersPage = () => {
  const navigate = useNavigate();

  const handleNewOrder = () => {
    navigate("/new-order");
  };

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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-14 text-secondary pb-10">You have no orders</p>
            <p
              className="text-12 font-bold text-brown capitalize cursor-pointer hover:text-primary transition-color"
              onClick={handleNewOrder}
            >
              create new order
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-3/10 items-center justify-center relative">
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
      </div>
    </section>
  );
};

export default MyOrdersPage;
