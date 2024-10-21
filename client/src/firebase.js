// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "research-paper-recommend-b0b70.firebaseapp.com",
  projectId: "research-paper-recommend-b0b70",
  storageBucket: "research-paper-recommend-b0b70.appspot.com",
  messagingSenderId: "566562396041",
  appId: "1:566562396041:web:f40d34794525bde2fc3358"
};


export const app = initializeApp(firebaseConfig);
