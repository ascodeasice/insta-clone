import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJJ8mm5EZuBqbi_ZyJzMmMxGINka78AbM",
  authDomain: "instagram-clone-9075e.firebaseapp.com",
  projectId: "instagram-clone-9075e",
  storageBucket: "instagram-clone-9075e.appspot.com",
  messagingSenderId: "436791359429",
  appId: "1:436791359429:web:514093e8f1c419f5bfbdac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };