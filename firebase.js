// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBjS8GfMr4E5yPDlSompjTgktSVzV6D710",
    authDomain: "ratingsreviewsapp.firebaseapp.com",
    projectId: "ratingsreviewsapp",
    storageBucket: "ratingsreviewsapp.firebasestorage.app",
    messagingSenderId: "780245033545",
    appId: "1:780245033545:web:361279377ab5b665255598",
    measurementId: "G-36YBS76YRC"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
