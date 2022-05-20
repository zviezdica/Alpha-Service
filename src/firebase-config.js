import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfPiZsaAr5uIkli8A4EzAGfeGjLvjeRK8",
  authDomain: "alpha-service-11471.firebaseapp.com",
  projectId: "alpha-service-11471",
  storageBucket: "alpha-service-11471.appspot.com",
  messagingSenderId: "206056992185",
  appId: "1:206056992185:web:765174004763ac2133da68",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
