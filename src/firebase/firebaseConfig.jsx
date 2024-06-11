import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyByYaT17Gqw-MDtT2HL0NRaAXW5lPImsWs",
  authDomain: "amaliyot-10dars.firebaseapp.com",
  projectId: "amaliyot-10dars",
  storageBucket: "amaliyot-10dars.appspot.com",
  messagingSenderId: "706360042390",
  appId: "1:706360042390:web:bc5d7bd6e3632fbd2c33b7"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
