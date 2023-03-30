// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//google authProvider
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ZiTBCJ5Hwcxni7LDsz3Eyzn8Tur39IA",
  authDomain: "clone-6dbd2.firebaseapp.com",
  projectId: "clone-6dbd2",
  storageBucket: "clone-6dbd2.appspot.com",
  messagingSenderId: "1055804185858",
  appId: "1:1055804185858:web:e060d75c0dc3742008761b",
  measurementId: "G-RYYR669TB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
