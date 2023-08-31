import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "instagram-clone-9075e.firebaseapp.com",
  projectId: "instagram-clone-9075e",
  storageBucket: "instagram-clone-9075e.appspot.com",
  messagingSenderId: "436791359429",
  appId: "1:436791359429:web:514093e8f1c419f5bfbdac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };