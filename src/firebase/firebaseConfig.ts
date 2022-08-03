// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClvJjL4JylGaoFlPCYtmbVNIvlD7ue5JI",
  authDomain: "react-learning-e707f.firebaseapp.com",
  projectId: "react-learning-e707f",
  storageBucket: "react-learning-e707f.appspot.com",
  messagingSenderId: "60905879114",
  appId: "1:60905879114:web:15856d65d620d7034698b3",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
