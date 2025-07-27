
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  projectId: "khadi-kraft",
  appId: "1:939770024402:web:6420144252931b1682b80b",
  storageBucket: "khadi-kraft.firebasestorage.app",
  apiKey: "AIzaSyDW5eTpAsQzxRfz7wlrZgC9K_l1Unq74Tg",
  authDomain: "khadi-kraft.firebaseapp.com",
  messagingSenderId: "939770024402"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
