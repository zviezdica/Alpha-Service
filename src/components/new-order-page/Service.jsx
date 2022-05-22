import React, { useState } from "react";

const Service = ({ selectedMotorcycle, objectKey, addService }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    addService(objectKey, !isClicked);
    setIsClicked(!isClicked);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center" onClick={handleClick}>
        <div className="mr-12 h-11 w-11 border-1 border-solid border-input-grey rounded-full flex justify-center items-center">
          <div
            className={
              "h-7 w-7 rounded-full " +
              (isClicked ? "bg-primary" : "bg-transparent")
            }
          ></div>
        </div>
        <p>{objectKey}</p>
      </div>
      <p>{selectedMotorcycle["Service"][objectKey]}</p>
    </div>
  );
};

export default Service;
