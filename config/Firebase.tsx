// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app"
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9tTcDK7rmLCLT9wFeL8-VzcDIHjUWcBY",
  authDomain: "insta-clone-4331c.firebaseapp.com",
  projectId: "insta-clone-4331c",
  storageBucket: "insta-clone-4331c.appspot.com",
  messagingSenderId: "715211279924",
  appId: "1:715211279924:web:763ee925a76779dcc6c461",
  measurementId: "G-13Z1XFWQ4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);



const db=getFirestore();
export {db,auth,storage};