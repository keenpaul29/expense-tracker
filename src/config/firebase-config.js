// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzej6EDxNhOh4o08QhaBNwUR0sumff3Zk",
  authDomain: "expense-tracker-1faab.firebaseapp.com",
  projectId: "expense-tracker-1faab",
  storageBucket: "expense-tracker-1faab.appspot.com",
  messagingSenderId: "772270567015",
  appId: "1:772270567015:web:2e01546c04921cb491eec2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);