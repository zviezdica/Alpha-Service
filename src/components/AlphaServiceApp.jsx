import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Routes } from ".";

const AlphaServiceApp = () => {
  return (
    <section className="font-Poppins border-red border-solid border-2">
      <Router>
        <Routes />
      </Router>
    </section>
  );
};

export default AlphaServiceApp;
