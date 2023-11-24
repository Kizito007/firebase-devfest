// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgW2dFiWmCGgnrPzuMRK70aFAHUjsQe-A",
    authDomain: "devfest-firebase-54ce5.firebaseapp.com",
    projectId: "devfest-firebase-54ce5",
    storageBucket: "devfest-firebase-54ce5.appspot.com",
    messagingSenderId: "249910337628",
    appId: "1:249910337628:web:8428239384700c5d5dc699",
    measurementId: "G-0LEVQN8Y06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const imageDb = getStorage(app)
const db = getFirestore(app)

export { auth, provider, imageDb, db }