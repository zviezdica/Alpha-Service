import React from "react";
import { Logo, LoginPageForm } from "../components";
import { motorcycle1 } from "../images";

const LoginPage = () => {
  return (
    <section className="container container-home pt-110 flex">
      <div className="w-1/3">
        <Logo />
        <h2 className="mt-50 text-16 font-semibold text-secondary">
          Welcome to
        </h2>
        <h1 className="text-24 font-semibold text-primary pt-4">
          alpha service
        </h1>
        <LoginPageForm />
      </div>
      {/* <div
        style={{ backgroundImage: `url(${motorcycle1})` }}
        className="absolute top-1/2 -translate-y-1/2 right-0 w-60vw h-80vh bg-contain bg-center bg-no-repeat"
      >
        <div className="relative w-full h-full">
          <h1 className="absolute right-10 -bottom-40 text-60 leading-none font-bold text-white">
            Alpha
            <br />
            Service
          </h1>
        </div>
      </div> */}
      <div className="w-2/3">
        <div className="w-max relative ">
          <h1 className="absolute right-10 -bottom-40 text-60 leading-none font-bold text-white">
            Alpha
            <br />
            Service
          </h1>
          <img
            src={motorcycle1}
            alt="motorcycle photo"
            className="w-3/4 border-red border-solid border-1"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
