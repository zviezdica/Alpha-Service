import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase-config";
import { Routes, Alert } from ".";
import { UserContext } from "../contexts/UserContext";
import { AlertContext } from "../contexts/AlertContext";

const AlphaServiceApp = () => {
  const [userCredentials, setUserCredentials] = useState(null);
  const [userAction, setUserAction] = useState("login");
  const [successfullAuth, setSuccessfullAuth] = useState(false);
  const [user, setUser] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertPurpose, setAlertPurpose] = useState("");
  const [newOrderId, setNewOrderId] = useState("");
  const [navigateToMyOrders, setNavigateToMyOrders] = useState(false);

  const handleNewOrderUpdate = (orderId) => {
    setNewOrderId(orderId);
  };

  const showAlert = (text, purpose) => {
    setIsAlert(true);
    setAlertText(text);
    setAlertPurpose(purpose);
    setTimeout(() => {
      setIsAlert(false);
    }, 1000);
  };

  // authentication
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (successfullAuth) {
        setUser(user);
      } else setUser("");
    });
  }, [successfullAuth]);

  //sign up
  const register = async () => {
    setSuccessfullAuth(false);
    try {
      if (userCredentials.password.length >= 6) {
        const user = await createUserWithEmailAndPassword(
          auth,
          userCredentials.email,
          userCredentials.password
        );
        setSuccessfullAuth(true);
        setNavigateToMyOrders(true);
        showAlert(`User successfully registered`, "success");
      } else {
        setNavigateToMyOrders(false);
        return;
      }
    } catch {
      setSuccessfullAuth(false);
      setNavigateToMyOrders(false);
      showAlert("Please provide correct email and password", "danger");
    }
  };

  //login
  const login = async () => {
    try {
      if (userCredentials.password.length >= 6) {
        const user = await signInWithEmailAndPassword(
          auth,
          userCredentials.email,
          userCredentials.password
        );
        setSuccessfullAuth(true);
        setNavigateToMyOrders(true);
        showAlert(`User successfully logged in`, "success");
      } else {
        setNavigateToMyOrders(false);
        return;
      }
    } catch {
      setSuccessfullAuth(false);
      setNavigateToMyOrders(false);
      showAlert("Please provide correct email and password", "danger");
    }
  };

  useEffect(() => {
    if (!userCredentials) return;
    userAction === "login" && login();
    userAction === "register" && register();
  }, [userCredentials]);

  return (
    <section className="font-poppins">
      <AlertContext.Provider value={{ showAlert }}>
        <UserContext.Provider
          value={{
            userCredentials,
            setUserCredentials,
            userAction,
            setUserAction,
            user,
            successfullAuth,
            setSuccessfullAuth,
            setUserAction,
          }}
        >
          <Router>
            <Routes
              newOrderUpdate={handleNewOrderUpdate}
              newOrderId={newOrderId}
              navigateToMyOrders={navigateToMyOrders}
            />
          </Router>
        </UserContext.Provider>
      </AlertContext.Provider>
      {isAlert && <Alert text={alertText} purpose={alertPurpose} />}
    </section>
  );
};

export default AlphaServiceApp;
