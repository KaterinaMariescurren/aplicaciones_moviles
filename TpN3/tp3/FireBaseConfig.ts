// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";



const firebaseConfig = {
  apiKey: "AIzaSyDveiTzlCbUNA67zvw8BpgGX9HDwYKq2BY",
  authDomain: "tpn3-33b7b.firebaseapp.com",
  projectId: "tpn3-33b7b",
  storageBucket: "tpn3-33b7b.firebasestorage.app",
  messagingSenderId: "41830974465",
  appId: "1:41830974465:web:64c1f85cef31470d426c00",
  measurementId: "G-9M4832H9Y5"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: indexedDBLocalPersistence // Usa `indexedDBLocalPersistence` o `AsyncStorage`
});

