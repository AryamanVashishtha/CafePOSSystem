// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyDeKpxog91qk7T5hcn28No3DWW4SYVDM2k",
  authDomain: "jiit-cafeteria.firebaseapp.com",
  projectId: "jiit-cafeteria",
  storageBucket: "jiit-cafeteria.appspot.com",
  messagingSenderId: "694869017624",
  appId: "1:694869017624:web:a8a4d765c2721b6d8caf6d",
  measurementId: "G-FN18TBMGRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}