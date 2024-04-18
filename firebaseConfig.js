// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2PL3jGeIPvT-ula3Ipjya8aR9Gxr3SqM",
  authDomain: "eurovision2024-3ea50.firebaseapp.com",
  databaseURL: "https://eurovision2024-3ea50-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eurovision2024-3ea50",
  storageBucket: "eurovision2024-3ea50.appspot.com",
  messagingSenderId: "96101661247",
  appId: "1:96101661247:web:a36b1d4528a3549b5ed68a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication
const auth = getAuth(app);

const database = getDatabase(app);

export { app, auth, database };
