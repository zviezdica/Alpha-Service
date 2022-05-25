import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { signOut } from "firebase/auth";

import { Logo, LoginPageForm } from "../components";
import { motorcycle1 } from "../images";
import { auth } from "../firebase-config";
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const { setSuccessfullAuth, setUserAction } = useContext(UserContext);

  useEffect(() => {
    //logout
    const logout = async () => {
      await signOut(auth);
    };
    setSuccessfullAuth(false);
    logout();
  }, []);

  return (
    <section className="h-screen sm:flex container container-home pt-110 relative">
      <div className="mx-auto 2xs:w-max sm:w-1/2">
        <Logo />
        <h2 className="mt-50 text-16 font-semibold text-secondary">
          Welcome to
        </h2>
        <h1 className="text-24 font-semibold text-primary pt-4">
          alpha service
        </h1>
        <LoginPageForm />
      </div>
      {isTablet && (
        <div className="w-1/2 relative overflow-hidden -mt-100">
          <div
            className="absolute top-0 right-0 w-full h-full bg-no-repeat bg-center bg-contain scale-110 "
            style={{ backgroundImage: `url(${motorcycle1})` }}
          ></div>
          <div className="fixed bottom-0 right-0 p-50">
            <h1 className="text-45 lg:text-60 leading-none font-bold text-white">
              Alpha
              <br />
              Service
            </h1>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoginPage;
