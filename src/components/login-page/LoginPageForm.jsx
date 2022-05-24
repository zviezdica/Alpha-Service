import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { AlertContext } from "../../contexts/AlertContext";

const LoginPageForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showAlert } = useContext(AlertContext);
  const { userCredentials, setUserCredentials, userAction, setUserAction } =
    useContext(UserContext);

  const navigate = useNavigate();

  const handleEmailTyping = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordTyping = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginPageForm = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showAlert("Please provide email and password", "danger");
      return;
    }
    if (email && password) {
      setUserCredentials({ email, password });
      console.log(userCredentials);
      navigate("/my-orders");
    }
  };

  return (
    <form className="w-full 2xs:w-295 pt-20" onSubmit={handleLoginPageForm}>
      <label htmlFor="email" className="text-10 text-secondary">
        Email Adress:
      </label>
      <br />
      <input
        type="email"
        id="email"
        name="email"
        onChange={handleEmailTyping}
        className="w-full text-primary text-14 px-16 py-10 border-1 border-input-grey rounded-lg bg-transparent"
      />
      <br />
      <label htmlFor="pass" className="block text-10 text-secondary pt-12 pb-8">
        Password:
      </label>
      <input
        type="password"
        id="pass"
        name="pass"
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
          <h4 className="w-max mr-0 ml-auto">Forgot password?</h4>
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
  );
};

export default LoginPageForm;
