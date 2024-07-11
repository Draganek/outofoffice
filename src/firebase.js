// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJTqBMshzzR0WL_xQLmIz-jxttj9-ysLM",
  authDomain: "out-of-office-3705d.firebaseapp.com",
  projectId: "out-of-office-3705d",
  storageBucket: "out-of-office-3705d.appspot.com",
  databaseURL: "https://out-of-office-3705d-default-rtdb.firebaseio.com/",
  messagingSenderId: "241739198188",
  appId: "1:241739198188:web:60b525cab849d11b57ffc9",
  measurementId: "G-MGWC9T1HY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, database };
