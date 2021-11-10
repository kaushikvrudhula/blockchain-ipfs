import React from 'react'
    // Import the functions you need from the SDKs you need
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
function Auth() {

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIUZLbv-a8NXSnWciYm98oJbic_P9Xk3k",
  authDomain: "decentralized-storage.firebaseapp.com",
  projectId: "decentralized-storage",
  storageBucket: "decentralized-storage.appspot.com",
  messagingSenderId: "213479136658",
  appId: "1:213479136658:web:3ef6fc740ff85c51cbb54b",
  measurementId: "G-KQFGT93DJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

    return (
      
        <div>
            <h1>Auth page</h1>   
        </div>
    )
}

export default Auth
