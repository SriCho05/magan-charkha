import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "khadi-kraft",
  appId: "1:939770024402:web:6420144252931b1682b80b",
  storageBucket: "khadi-kraft.firebasestorage.app",
  apiKey: "AIzaSyDW5eTpAsQzxRfz7wlrZgC9K_l1Unq74Tg",
  authDomain: "khadi-kraft.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "939770024402",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
