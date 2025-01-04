// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDh2E41Yy61n3R4awnK9rcbtm46ba8m1y0",
    authDomain: "gift-tracker-ed1d1.firebaseapp.com",
    databaseURL: "https://gift-tracker-ed1d1-default-rtdb.firebaseio.com",
    projectId: "gift-tracker-ed1d1",
    storageBucket: "gift-tracker-ed1d1.firebasestorage.app",
    messagingSenderId: "861141687961",
    appId: "1:861141687961:web:26fa6dfebd998ddc882208"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
