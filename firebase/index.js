// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzlsRUUkaNmSpnL6cP2vO0cKMgaCBnOU0",
  authDomain: "week7-f3deb.firebaseapp.com",
  projectId: "week7-f3deb",
  storageBucket: "week7-f3deb.appspot.com",
  messagingSenderId: "5599340126",
  appId: "1:5599340126:web:10575fd10f1aca9a1bb6cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//connect for authentication
const auth = getAuth(app);

//connect for Firestore DB
const db = getFirestore(app);

export { auth, db };