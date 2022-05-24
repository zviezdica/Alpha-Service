import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "sassy-datepicker";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { BrownButton, Logo, Service } from "../components";
import { UserContext } from "../contexts/UserContext";
import { auth, db } from "../firebase-config";

import { arrow, clock } from "../images";
import servicesData from "../services-data.json";
import { serviceBrands } from "../service-brands";

let brands = serviceBrands();

//hour termins 8-15, without 16 - to close service on time :)
let startWorkingHour = 8;
let endWorkingHour = 16;
let hourTermins = [];
for (let i = startWorkingHour; i < endWorkingHour; i++) {
  hourTermins.push(i);
}

const NewOrderPage = ({ newOrderUpdate }) => {
  const [brand, setBrand] = useState("");
  const [isBrandDropdownActive, setIsBrandDropdownActive] = useState(false);
  const [model, setModel] = useState("");
  const [isModelDropdownActive, setIsModelDropdownActive] = useState(false);
  const [modelTempYear, setModelTempYear] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [isYearAlertActive, setIsYearAlertActive] = useState(false);
  const [mileage, setMileage] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [selectedMotorcycle, setSelectedMotorcycle] = useState("");
  const [isServiceTabActive, setIsServiceTabActive] = useState(false);
  const [tempPrice, setTempPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isChainChange, setIsChainChange] = useState(false);
  const [isOilChange, setIsOilChange] = useState(false);
  const [isAirChange, setIsAirChange] = useState(false);
  const [isBrakeChange, setIsBrakeChange] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState("");

  console.log(appliedDiscount);
  console.log(appliedDiscount);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const addedServiceRef = useRef(null);

  const handleSubmitOrder = async () => {
    console.log("radim nesto");
    const orderId = `${Math.random().toString().replace(".", "").slice(0, 10)}`;
    const order = {
      orderId,
      brand,
      model,
      modelYear,
      mileage,
      date,
      hour,
      selectedServices,
      tempPrice,
      appliedDiscount,
      finalPrice,
    };
    const userRef = doc(db, "users", user.uid, "orders", orderId);
    try {
      await setDoc(userRef, order);
      navigate("/my-orders");
      newOrderUpdate(order.orderId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSelectedBrand = (brand) => {
    setBrand(brand);
    setIsBrandDropdownActive(false);
  };

  const handleSelectedModel = (model) => {
    setModel(model);
    setIsModelDropdownActive(false);
  };

  const handleModelYear = () => {
    if (!modelTempYear) return;
    let lastSupportedYear = servicesData.filter(
      (data) => data["Brand"] === brand && data["Model"] === model
    )[0]["Last supported year"];
    if (lastSupportedYear) {
      if (parseInt(modelTempYear) < lastSupportedYear) {
        setIsYearAlertActive(true);
      } else {
        setIsYearAlertActive(false);
        setModelYear(modelTempYear);
      }
    } else setIsYearAlertActive(false);
  };

  const handleDate = (date) => {
    let selectedDate = new Date(date);
    console.log(selectedDate.getDate());
    console.log(selectedDate.getMonth());
    let day = selectedDate.getDate();
    let month = selectedDate.getMonth();
    let year = selectedDate.getFullYear();
    setDate({
      day,
      month,
      year,
    });
  };

  const handleHour = (hour) => {
    setHour(hour);
  };

  const handleAddService = (objectKey, isClicked) => {
    if (isClicked) {
      objectKey == "Chain change price"
        ? setIsChainChange(true)
        : objectKey == "Oil and oil filter change price"
        ? setIsOilChange(true)
        : objectKey == "Air filter change price"
        ? setIsAirChange(true)
        : setIsBrakeChange(true);
      setTempPrice(tempPrice + selectedMotorcycle["Service"][objectKey]);
      setSelectedServices([...selectedServices, { objectKey }]);
    } else {
      objectKey == "Chain change price"
        ? setIsChainChange(false)
        : objectKey == "Oil and oil filter change price"
        ? setIsOilChange(false)
        : objectKey == "Air filter change price"
        ? setIsAirChange(false)
        : setIsBrakeChange(false);
      setTempPrice(tempPrice - selectedMotorcycle["Service"][objectKey]);
      let filteredServices = selectedServices.filter(
        (selectedService) => selectedService.objectKey != objectKey
      );
      setSelectedServices(filteredServices);
    }
    let date = new Date();
    let month = date.toLocaleString("default", { month: "long" });
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    console.log(minutes);
    let fullTime = `${month} ${day}, ${year} at ${hours}:${minutes}`;
    setCurrentTime(fullTime);
  };

  const handleFinalPrice = () => {
    if (isChainChange && isOilChange && isAirChange && isBrakeChange) {
      //40 $ off
      setFinalPrice(tempPrice - 40);
      setAppliedDiscount("40$");
    } else if (isChainChange && isOilChange && isAirChange) {
      //20% off
      setFinalPrice(Math.round((tempPrice * 0.8 + Number.EPSILON) * 100) / 100);
      setAppliedDiscount("20%");
    } else if (isOilChange && isAirChange) {
      //20 $ off
      setFinalPrice(tempPrice - 20);
      setAppliedDiscount("20$");
    } else if (isChainChange && isBrakeChange) {
      //15% off
      setFinalPrice(
        Math.round((tempPrice * 0.85 + Number.EPSILON) * 100) / 100
      );
      setAppliedDiscount("15%");
    } else {
      setFinalPrice(tempPrice);
      setAppliedDiscount("");
    }
  };

  useEffect(() => {
    handleFinalPrice();
  }, [tempPrice]);

  useEffect(() => {
    // if (!(brand || model)) return;
    if (brand && model) {
      let selectedBike = servicesData.filter(
        (data) => data["Brand"] === brand && data["Model"] === model
      )[0];
      setSelectedMotorcycle(selectedBike);
    }
    if (brand && model && modelYear) {
      setIsServiceTabActive(true);
    } else {
      setSelectedMotorcycle("");
      setIsServiceTabActive(false);
    }
  }, [brand, model, modelYear]);

  const resetOrderData = () => {
    setModelTempYear("");
    setModelYear("");
    setIsServiceTabActive(false);
    setSelectedServices([]);
    setTempPrice(0);
    setFinalPrice(0);
    setIsChainChange(false);
    setIsOilChange(false);
    setIsAirChange(false);
    setIsBrakeChange(false);
    setAppliedDiscount("");
    setCurrentTime("");
    setDate("");
    setHour("");
    setMileage("");
  };

  const handleCancelOrder = () => {
    setBrand("");
  };

  useEffect(() => {
    resetOrderData();
  }, [model]);

  useEffect(() => {
    setModel("");
    resetOrderData();
  }, [brand]);

  return (
    <section className="container pt-95 pb-50 flex justify-between">
      <div className="pr-45 w-7/10">
        <Logo />
        <h1 className="mt-25 text-24 font-semibold text-primary pt-4 capitalize">
          new order
        </h1>
        <div className="flex">
          <div className="w-295 pr-45">
            {/* select brand */}
            <p className="text-10 pt-12 pb-4 w-max text-secondary capitalize">
              select brand
            </p>
            <div
              className="w-full px-16 py-10 border-solid border-1 border-input-grey rounded-lg bg-transparent flex justify-between items-center cursor-pointer"
              onClick={() => setIsBrandDropdownActive(!isBrandDropdownActive)}
            >
              <p className="inline-block text-primary-50 text-14">
                {brand ? brand : "Select brand"}
              </p>
              <span
                style={{ backgroundImage: `url(${arrow})` }}
                className="inline-block h-10 w-10 bg-contain bg-center bg-no-repeat"
              ></span>
            </div>
            <div
              className={
                "mt-4 w-full transition-all h-100 px-16 border-1 border-solid border-input-grey rounded-lg bg-transparent overflow-auto origin-top " +
                (!isBrandDropdownActive
                  ? "scale-y-0 max-h-0 py-0"
                  : "scale-y-100 max-h-32 py-10")
              }
            >
              {brands.map((brand) => {
                return (
                  <p
                    key={brand}
                    onClick={() => handleSelectedBrand(brand)}
                    className="text-14 text-primary-50 cursor-pointer hover:text-secondary pb-8"
                  >
                    {brand}
                  </p>
                );
              })}
            </div>
            {/* select model */}
            <p className="text-10 pt-12 pb-4 w-max text-secondary capitalize">
              model
            </p>
            <div
              className="w-full px-16 py-10 border-1 border-solid border-input-grey rounded-lg bg-transparent flex justify-between items-center cursor-pointer"
              onClick={
                brand
                  ? () => setIsModelDropdownActive(!isModelDropdownActive)
                  : null
              }
            >
              <p className="inline-block text-primary-50 text-14">
                {model ? model : "Select model"}
              </p>
              <span
                style={{ backgroundImage: `url(${arrow})` }}
                className="inline-block h-10 w-10 bg-contain bg-center bg-no-repeat"
              ></span>
            </div>
            <div
              className={
                "mt-4 w-full transition-all h-100 px-16 border-1 border-solid border-input-grey rounded-lg bg-transparent overflow-auto origin-top " +
                (!isModelDropdownActive
                  ? "scale-y-0 max-h-0 py-0"
                  : "scale-y-100 max-h-32  py-10")
              }
            >
              {servicesData
                .filter((data) => data["Brand"] === brand)
                .map((filteredService) => {
                  const model = filteredService["Model"];
                  return (
                    <p
                      key={model}
                      onClick={() => handleSelectedModel(model)}
                      className="text-14 text-primary-50 cursor-pointer hover:text-secondary  pb-8"
                    >
                      {model}
                    </p>
                  );
                })}
            </div>
            {/* model year */}
            <p className="text-10 pt-12 pb-4 w-max text-secondary capitalize">
              model year
            </p>
            <input
              type="number"
              id="modelYear"
              name="modelYear"
              placeholder="Enter model year"
              value={modelTempYear}
              onChange={(e) => setModelTempYear(e.target.value)}
              onBlur={handleModelYear}
              className={
                "w-full text-primary text-14 px-16 py-10 border-1 border-solid rounded-lg bg-transparent placeholder-primary-50 " +
                (isYearAlertActive ? "border-alert-red" : "border-input-grey")
              }
            />
            {isYearAlertActive && (
              <p className="text-10 text-alert-red pt-4">
                *Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            )}
            {/* mileage */}
            <p className="text-10 pt-12 pb-4 w-max text-secondary capitalize">
              milleage
            </p>
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={mileage}
              placeholder="Enter mileage"
              onChange={(e) => setMileage(e.target.value)}
              className="w-full text-primary text-14 px-16 py-10 border-1 rounded-lg bg-transparent placeholder-primary-50 border-input-grey"
            />
          </div>

          <div className="mt-30">
            {/* select date and time */}
            <div className="border-1 border-solid rounded-lg border-input-grey h-160 flex w-max">
              <DatePicker onChange={(date) => handleDate(date)} />
              <div
                className={
                  "h-full flex flex-col items-center transition-all " +
                  (date ? "scale-x-1 max-w-16" : "scale-x-0 max-w-0 ")
                }
              >
                <img src={clock} className="h-15/100 p-2"></img>
                <div className="h-85/100 overflow-y-auto overflow-x-hidden p-4">
                  {hourTermins.map((hourTermin) => {
                    return (
                      <p
                        key={`h${hourTermin}`}
                        className={
                          "text-14 cursor-pointer " +
                          (hourTermin == hour ? "text-white" : "text - primary")
                        }
                        onClick={() => handleHour(hourTermin)}
                      >
                        {hourTermin}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* type of service */}
            <p className="text-10 pt-25 pb-4 w-max text-secondary capitalize">
              type of service
            </p>
            {isServiceTabActive && (
              <div className="w-full pb-22">
                {Object.keys(selectedMotorcycle["Service"]).map((key) => {
                  return (
                    <Service
                      selectedMotorcycle={selectedMotorcycle}
                      key={key}
                      objectKey={key}
                      addService={handleAddService}
                      serviceCheckbox={true}
                    />
                  );
                })}
              </div>
            )}
            {/* discount options */}
            <h4 className="text-secondary text-12 font-bold pb-8">
              Note: Consider discount options
            </h4>
            <ul className="text-10 text-discounts-grey">
              <li>
                <span className="font-semibold">40 $ OFF</span> for full service
              </li>
              <li>
                <span className="font-semibold">20% OFF</span> - Chain change +
                Oil and oil filter change + Air filter change
              </li>
              <li>
                <span className="font-semibold">20 $ OFF</span> - Oil and oil
                filter change + Air filter change
              </li>
              <li>
                <span className="font-semibold">15% OFF</span> - Chain change +
                Brake fluid change
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* order summary */}
      <div className="w-3/10">
        <div className="border-1 border-solid rounded-lg border-input-grey pl-30 pt-25 pr-24 pb-15">
          <h2 className="text-16 text-secondary font-semibold capitalize pb-5">
            order summary
          </h2>
          {currentTime && (
            <p className="text-12 text-secondary pb-10">
              Order date: {currentTime}
            </p>
          )}
          {date && hour && (
            <p className="text-14 text-secondary pb-40">
              Service date: {date.day}/{date.month + 1}/{date.year} at {hour}:00
            </p>
          )}
          {selectedServices.length != 0 && (
            <div className="border-b-1 border-solid border-prev-grey pb-8 px-4">
              {selectedServices.map((selectedService) => {
                return (
                  <Service
                    selectedMotorcycle={selectedMotorcycle}
                    key={`prev${selectedService.objectKey}`}
                    objectKey={selectedService.objectKey}
                  />
                );
              })}
            </div>
          )}
          {(tempPrice != 0 || appliedDiscount || finalPrice != 0) && (
            <div className="pt-24 pb-150 w-max ml-auto mr-0 text-14 text-secondary capitalize flex flex-col">
              {tempPrice != 0 && (
                <div className="pb-2 flex justify-between">
                  <p>full price:</p>
                  <p className="pl-20">{tempPrice}$</p>
                </div>
              )}
              {appliedDiscount && (
                <div className="pb-2 flex justify-between">
                  <p>discount:</p>
                  <p className="pl-20">{appliedDiscount}</p>
                </div>
              )}
              {finalPrice != 0 && (
                <div className="mr-0 ml-auto">
                  <p className="font-semibold text-16 inline">price:</p>
                  <p className="pl-20 inline">{finalPrice}$</p>
                </div>
              )}
            </div>
          )}
          {finalPrice != 0 && (
            <div className="w-max flex items-center ml-auto mr-0">
              <p
                className="text-12 text-secondary capitalize pr-16 cursor-pointer"
                onClick={handleCancelOrder}
              >
                cancel order
              </p>
              <div className="w-max" onClick={handleSubmitOrder}>
                <BrownButton text={"create order"} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewOrderPage;
