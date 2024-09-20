// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chap-app-b8fe3.firebaseapp.com",
  projectId: "react-chap-app-b8fe3",
  storageBucket: "react-chap-app-b8fe3.appspot.com",
  messagingSenderId: "765871230600",
  appId: "1:765871230600:web:ba28b281ad3ef08986193d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
