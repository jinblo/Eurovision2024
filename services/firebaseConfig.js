import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_DB_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_DOMAIN,
  databaseURL: "https://eurovision2024-3ea50-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_DB_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_DB_SENDER,
  appId: process.env.EXPO_PUBLIC_DB_APPID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app);

export { app, auth, database };
