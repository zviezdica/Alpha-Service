import React, { useState } from "react";

import { Logo } from "../components";

import { arrow } from "../images";
import servicesData from "../services-data.json";
import { serviceBrands } from "../service-brands";
let brands = serviceBrands();

const NewOrder = () => {
  const [brand, setBrand] = useState("");
  const [isBrandDropdownActive, setIsBrandDropdownActive] = useState(false);
  const [model, setModel] = useState("");
  const [isModelDropdownActive, setIsModelDropdownActive] = useState(false);
  const [modelYear, setModelYear] = useState("");
  const [isYearAlertActive, setIsYearAlertActive] = useState(false);
  const [milleage, setMilleage] = useState("");

  const handleSelectedBrand = (brand) => {
    setBrand(brand);
    setIsBrandDropdownActive(false);
  };

  const handleSelectedModel = (model) => {
    setModel(model);
    setIsModelDropdownActive(false);
  };

  const handleModelYear = () => {
    if (!modelYear) return;
    let lastSupportedYear = servicesData.filter(
      (data) => data["Brand"] === brand && data["Model"] === model
    )[0]["Last supported year"];
    if (parseInt(modelYear) < lastSupportedYear) {
      setIsYearAlertActive(true);
    } else setIsYearAlertActive(false);
  };

  return (
    <section className="container pt-95 flex justify-between">
      <div className="pr-25 w-7/10 flex">
        <div className="w-295">
          <Logo />
          <h1 className="mt-25 text-24 font-semibold text-primary pt-4 capitalize">
            new order
          </h1>
          {/* select brand */}
          <p className="text-10 pt-12 pb-4 w-max text-secondary capitalize">
            select brand
          </p>
          <div
            className="w-full px-16 py-10 border-1 border-input-grey rounded-lg bg-transparent flex justify-between items-center cursor-pointer"
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
              "mt-4 w-full transition-all h-100 px-16 border-1 border-input-grey rounded-lg bg-transparent overflow-auto origin-top " +
              (!isBrandDropdownActive
                ? "scale-y-0 max-h-0 py-0"
                : "scale-y-100 max-h-32  py-10")
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
            className="w-full px-16 py-10 border-1 border-input-grey rounded-lg bg-transparent flex justify-between items-center cursor-pointer"
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
              "mt-4 w-full transition-all h-100 px-16 border-1 border-input-grey rounded-lg bg-transparent overflow-auto origin-top " +
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
            onChange={(e) => setModelYear(e.target.value)}
            onBlur={handleModelYear}
            className={
              "w-full text-primary text-14 px-16 py-10 border-1  rounded-lg bg-transparent placeholder-primary-50 " +
              (isYearAlertActive ? "border-alert-red" : "border - input - grey")
            }
          />
          {isYearAlertActive && (
            <p className="text-10 text-alert-red pt-4">
              *Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          )}
          {/* milleage */}
        </div>
        <div></div>
      </div>
      <div></div>
    </section>
  );
};

export default NewOrder;
