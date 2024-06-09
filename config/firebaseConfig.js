// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF0lY8XThDil5bngvd5U1hYQ-Bm1DCWSM",
  authDomain: "stockify-ef5e0.firebaseapp.com",
  projectId: "stockify-ef5e0",
  storageBucket: "stockify-ef5e0.appspot.com",
  messagingSenderId: "350457007464",
  appId: "1:350457007464:web:1a0d9b71fd38e4a1201add",
  measurementId: "G-XJWMRSM4W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, storage, auth };
