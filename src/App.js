import React from "react";
import { Router } from "react-router-dom";
import "./App.css";

import { AlphaServiceApp } from "./components";

function App() {
  return (
    <main className="min-w-100vw min-h-100vh bg-gradient-to-b from-whiteish to-light-grey pt-95 pb-107 pl-107 pr-84">
      <AlphaServiceApp />
    </main>
  );
}

export default App;
