import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "../firebase-config";
import { Routes, Alert } from ".";
import { UserContext } from "../contexts/UserContext";
import { AlertContext } from "../contexts/AlertContext";

const AlphaServiceApp = () => {
  const [userCredentials, setUserCredentials] = useState(null);
  const [userAction, setUserAction] = useState("login");
  const [user, setUser] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertPurpose, setAlertPurpose] = useState("");

  console.log(userCredentials);

  const showAlert = (text, purpose) => {
    setIsAlert(true);
    setAlertText(text);
    setAlertPurpose(purpose);
    setTimeout(() => {
      setIsAlert(false);
    }, 1000);
  };

  //authentication
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  //sign up
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  //login
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  //logout
  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (!userCredentials) return;
    userAction === "register" ? register() : login();
  }, [userCredentials]);

  return (
    <section className="container font-poppins">
      <AlertContext.Provider value={{ showAlert }}>
        <UserContext.Provider
          value={{ setUserCredentials, userAction, setUserAction }}
        >
          <Router>
            <Routes />
          </Router>
        </UserContext.Provider>
      </AlertContext.Provider>
      {isAlert && <Alert text={alertText} purpose={alertPurpose} />}
    </section>
  );
};

export default AlphaServiceApp;
