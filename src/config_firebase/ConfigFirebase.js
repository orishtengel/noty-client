import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBMMo5BxMgQIJxf7uEfISWJm06cDrJHruE",
    authDomain: "ezlinks-1b7b7.firebaseapp.com",
    projectId: "ezlinks-1b7b7",
    storageBucket: "ezlinks-1b7b7.appspot.com",
    messagingSenderId: "68159852275",
    appId: "1:68159852275:web:53dbce4e53b628c9d9b186",
    measurementId: "G-F0RYWJM6DQ"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase