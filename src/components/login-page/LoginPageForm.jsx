import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";

import { UserContext } from "../../contexts/UserContext";
import { AlertContext } from "../../contexts/AlertContext";

const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$"
);

const LoginPageForm = ({ navigateToMyOrders }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetWindowOpened, setIsResetWindowOpened] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const { showAlert } = useContext(AlertContext);
  const { user, setUserCredentials, userAction, setUserAction } =
    useContext(UserContext);

  const navigate = useNavigate();

  const handleEmailTyping = (e) => {
    if (validEmail.test(e.target.value)) {
      setEmail(e.target.value);
    } else return;
  };

  const handlePasswordTyping = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPasswordTyping = (e) => {
    setResetPassword(e.target.value);
  };

  const handleResetPassword = () => {
    updatePassword(user, resetPassword)
      .then(() => {
        isResetWindowOpened(false);
      })
      .catch(() => showAlert("Ooops something went wrong! Please try again"));
  };

  const handleForgotPassword = () => {
    setIsResetWindowOpened(!isResetWindowOpened);
  };

  const handleLoginPageForm = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showAlert("Please provide email and password", "danger");
      return;
    }
    if (email && password) {
      setUserCredentials({ email, password });
    }
  };

  useEffect(() => {
    if (navigateToMyOrders) {
      navigate("/my-orders");
    } else return;
  }, [navigateToMyOrders]);

  return (
    <div className="w-full 2xs:w-295 pt-20">
      <form className="w-full " onSubmit={handleLoginPageForm}>
        <label htmlFor="email" className="text-10 text-secondary">
          Email Adress:
        </label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          onChange={handleEmailTyping}
          className="w-full text-primary text-14 px-16 py-10 border-1 border-input-grey rounded-lg bg-transparent"
        />
        <br />
        <label
          htmlFor="pass"
          className="block text-10 text-secondary pt-12 pb-8"
        >
          Password:
        </label>
        <input
          type="password"
          id="pass"
          name="pass"
          autoComplete="current-password"
          onChange={handlePasswordTyping}
          className="w-full text-primary text-14 px-16 py-10 mb-10 border-1 border-input-grey rounded-lg bg-transparent"
        />
        {userAction === "login" && (
          <div className="flex justify-between text-10 text-secondary">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberUser"
                name="rememberUser"
                className="h-15 w-15 mr-10 border-input-grey border-solid border-1 rounded-full bg-transparent text-primary"
              ></input>
              <label htmlFor="rememberUser">Remember me</label>
            </div>
            <h4 className="w-max mr-0 ml-auto" onClick={handleForgotPassword}>
              Forgot password?
            </h4>
          </div>
        )}
        <button
          type="submit"
          value="submit"
          className="w-full mt-25 mb-16 py-14 text-12 font-bold bg-brown text-white rounded-xl"
        >
          {userAction === "register" ? "Register" : "Login"}
        </button>
        {userAction === "register" ? (
          <h4 className="text-10 text-secondary text-center">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => setUserAction("login")}
            >
              Login
            </span>
          </h4>
        ) : (
          <h4 className="text-10 text-secondary text-center">
            Don't have an account?
            <span
              className="text-primary cursor-pointer"
              onClick={() => setUserAction("register")}
            >
              {" "}
              Sign Up
            </span>
          </h4>
        )}
      </form>
      <div
        className={
          "absolute left-1/2 -translate-x-1/2 p-10 border-2 border-input-grey transition-all duration-200 rounded-lg w-20vw z-1 " +
          (isResetWindowOpened
            ? "top-1/2 -translate-y-1/2"
            : "top-0 -translate-y-full")
        }
      >
        <h2 className="text-16 font-semibold text-secondary">
          Reset your password
        </h2>
        <form>
          <label htmlFor="emailConfirm" className="text-10 text-secondary">
            Email Adress:
          </label>
          <br />
          <input
            type="email"
            id="emailConfirm"
            name="emailConfirm"
            autoComplete="email"
            className="w-full text-primary text-14 px-16 py-10 border-1 border-input-grey rounded-lg bg-transparent"
          />
          <br />
          <label
            htmlFor="newPass"
            className="block text-10 text-secondary pt-12 pb-8"
          >
            Password:
          </label>
          <input
            type="password"
            id="newPass"
            name="newPass"
            autoComplete="new-password"
            onChange={handleResetPasswordTyping}
            className="w-full text-primary text-14 px-16 py-10 mb-10 border-1 border-input-grey rounded-lg bg-transparent"
          />
          <button
            type="submit"
            value="submit"
            className="w-1/2 mt-25 mb-16 py-14 text-12 font-bold bg-brown text-white rounded-xl"
            onClick={handleResetPassword}
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPageForm;
