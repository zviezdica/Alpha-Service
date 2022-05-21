import React from "react";

const BrownButton = ({ text }) => {
  return (
    <div className="w-170 py-8 text-12 font-bold bg-brown text-white text-center rounded-xl capitalize cursor-pointer hover:text-primary transition-color">
      {text}
    </div>
  );
};

export default BrownButton;
