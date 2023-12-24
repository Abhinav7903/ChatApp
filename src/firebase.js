// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,setPersistence, browserSessionPersistence} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";  
const firebaseConfig = {
  apiKey: "AIzaSyDfsK4hE41h4ri8xNWjo1e-vHsWxgcTg7w",
  authDomain: "chatapp-fc269.firebaseapp.com",
  projectId: "chatapp-fc269",
  storageBucket: "chatapp-fc269.appspot.com",
  messagingSenderId: "997640361989",
  appId: "1:997640361989:web:5a25720a663beba7d6646c",
  measurementId: "G-RNFXX1M2R9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const db=getFirestore()

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    
  })
  .catch((error) => {
    console.error('Error setting session persistence:', error);
  });