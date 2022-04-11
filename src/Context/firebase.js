import firebase from 'firebase/compat/app'
import 'firebase/auth'


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDh9y-lNKTyovfa2fBC4dleIjJFCg7J6j4",
    authDomain: "react-otp-demo.firebaseapp.com",
    projectId: "react-otp-demo",
    storageBucket: "react-otp-demo.appspot.com",
    messagingSenderId: "988177275906",
    appId: "1:988177275906:web:684da45e762aca386d1b1b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase