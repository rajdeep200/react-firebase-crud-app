import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNDj5-dE2CV4hKIQ3gZnMDcztIAllu9bA",
    authDomain: "react-firebase-crud-35bd9.firebaseapp.com",
    projectId: "react-firebase-crud-35bd9",
    storageBucket: "react-firebase-crud-35bd9.appspot.com",
    messagingSenderId: "881193742883",
    appId: "1:881193742883:web:d2ccb4a156a944af273796",
    measurementId: "G-M5ZX9V193K"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();