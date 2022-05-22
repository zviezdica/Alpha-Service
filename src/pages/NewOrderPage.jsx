import React, { useEffect, useState } from "react";
import DatePicker from "sassy-datepicker";

import { Logo } from "../components";

import { arrow, clock } from "../images";
import servicesData from "../services-data.json";
import { serviceBrands } from "../service-brands";
let brands = serviceBrands();

//hour termins 8-15, without 16 - to close service on time
let startWorkingHour = 8;
let endWorkingHour = 16;
let hourTermins = [];
for (let i = startWorkingHour; i < endWorkingHour; i++) {
  hourTermins.push(i);
}
console.log(hourTermins);

const NewOrder = () => {
  const [brand, setBrand] = useState("");
  const [isBrandDropdownActive, setIsBrandDropdownActive] = useState(false);
  const [model, setModel] = useState("");
  const [isModelDropdownActive, setIsModelDropdownActive] = useState(false);
  const [modelTempYear, setModelTempYear] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [isYearAlertActive, setIsYearAlertActive] = useState(false);
  const [milleage, setMilleage] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [selectedMotorcycle, setSelectedMotorcycle] = useState("");
  const [isServiceTabActive, setIsServiceTabActive] = useState(false);

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
    if (parseInt(modelTempYear) < lastSupportedYear) {
      setIsYearAlertActive(true);
    } else {
      setIsYearAlertActive(false);
      setModelYear(modelTempYear);
    }
  };

  const handleDate = (date) => {
    setDate(new Date(date));
  };

  const handleHour = (hour) => {
    setHour(hour);
  };

  useEffect(() => {
    // if (!(brand || model)) return;
    if (brand && model) {
      let selectedBike = servicesData.filter(
        (data) => data["Brand"] === brand && data["Model"] === model
      )[0];
      setSelectedMotorcycle(selectedBike);
      console.log(selectedMotorcycle);
    }
    if (brand && model && modelYear) {
      setIsServiceTabActive(true);
    }
  }, [brand, model, modelYear]);

  return (
    <section className="container pt-95 flex justify-between">
      <div className="pr-45 w-7/10">
        <Logo />
        <h1 className="mt-25 text-24 font-semibold text-primary pt-4 capitalize">
          new order
        </h1>
        <div className="flex">
          <div className="w-295 pr-45 pb-45">
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
                    className="text-14 text-primary-50 cursor-pointer hover:text-secondary"
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
              onClick={() => setIsModelDropdownActive(!isModelDropdownActive)}
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
                      className="text-14 text-primary-50 cursor-pointer hover:text-secondary"
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
            {/* milleage */}
            <p className="text-10 pt-12 pb-4 w-max text-secondary capitalize">
              milleage
            </p>
            <input
              type="number"
              id="milleage"
              name="milleage"
              placeholder="Enter milleage"
              onChange={(e) => setMilleage(e.target.value)}
              className="w-full text-primary text-14 px-16 py-10 border-1 rounded-lg bg-transparent placeholder-primary-50 border-input-grey"
            />
          </div>

          <div className="mt-30">
            {/* select date and time */}
            <div className="border-1 border-solid rounded-lg border-input-grey h-160 flex">
              <DatePicker onChange={(date) => handleDate(date)} />
              <div
                className={
                  "h-full flex flex-col items-center transition-all " +
                  (date ? "scale-x-1 max-w-16" : "scale-x-0 max-w-0")
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
                          (hourTermin === hour
                            ? "text-white"
                            : "text - primary")
                        }
                        onClick={(hourTermin) => handleHour(hourTermin)}
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
              <div className="w-full border-red border-solid border-2">
                {Object.keys(selectedMotorcycle["Service"]).map((key) => {
                  console.log(key === "Chain change price");
                  return (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="mr-12 h-11 w-11 border-1 border-solid border-input-grey rounded-full flex justify-center items-center">
                          <div className="h-7 w-7 bg-primary rounded-full "></div>
                        </div>
                        <p>{key}</p>
                      </div>
                      <p>{selectedMotorcycle["Service"][key]}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default NewOrder;
