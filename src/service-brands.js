import servicesData from "./services-data.json";

export const serviceBrands = () => {
  const serviceBrandsArr = [];
  servicesData.forEach((serviceData) => {
    serviceBrandsArr.push(serviceData["Brand"]);
  });
  let uniqueServiceBrands = [...new Set(serviceBrandsArr)];
  return uniqueServiceBrands;
};
