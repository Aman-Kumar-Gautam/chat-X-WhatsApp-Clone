import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1HHR1kdZMksp2ow2Cell80YQvAl-Gcd4",
  authDomain: "chat-x-2862a.firebaseapp.com",
  projectId: "chat-x-2862a",
  storageBucket: "chat-x-2862a.appspot.com",
  messagingSenderId: "846121162838",
  appId: "1:846121162838:web:71b6a43d82e730f8f4c3f7",
  measurementId: "G-DZYLNF7W6E"
};

const app = initializeApp(firebaseConfig);


 

export const authentication = getAuth(app);
export default getFirestore();