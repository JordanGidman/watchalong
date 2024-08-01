import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdtZ62oP4iiWu7gG6S9npkoeN8XUyKQxY",
  authDomain: "react-watchalong.firebaseapp.com",
  projectId: "react-watchalong",
  storageBucket: "react-watchalong.appspot.com",
  messagingSenderId: "381360107503",
  appId: "1:381360107503:web:292b0af7ad6a5da08f101a",
  databaseURL:
    "https://react-watchalong-default-rtdb.europe-west1.firebasedatabase.app",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const db = getDatabase(app);
export default db;
