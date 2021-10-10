// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACNGDgo8rlF045rAWXjqPr3obbZV6qCTQ",
  authDomain: "anibase-ea69d.firebaseapp.com",
  projectId: "anibase-ea69d",
  storageBucket: "anibase-ea69d.appspot.com",
  messagingSenderId: "664546706380",
  appId: "1:664546706380:web:b7d38e942e3b6aa953d369"
};


let db = null; 
// Initialize Firebase
 

export const  initializeFirebase = () => {
const app = initializeApp(firebaseConfig);
db = getFirestore(app) // updating db 
// to get in getDB function 
}


export const  getDB =  () => {
    return db; 
}