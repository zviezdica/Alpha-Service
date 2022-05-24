import React from "react";

const SubmittedOrder = ({ orderData }) => {
  const { orderId, date, brand, mileage } = orderData;

  return (
    <div className="flex w-max justify-between items-center pb-16 xs:w-full">
      <div className="flex justify-between items-center w-9/10 mr-15 px-24 py-6 rounded-xl bg-orders-grey text-10 xs:text-12 sm:text-14 text-secondary">
        <p className="pr-10">{orderId}</p>
        {date && (
          <p className="pr-10">
            {date.day}/{date.month + 1}/{date.year}
          </p>
        )}
        <p className="pr-10">{brand}</p>
        <p className="pr-10">{mileage}</p>
      </div>
      <p className="text-10 text-brown capitalize underline w-1/10 cursor-pointer hover:font-bold transition-all">
        description
      </p>
    </div>
  );
};

export default SubmittedOrder;
