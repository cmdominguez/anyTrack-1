import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const database = getDatabase(appFirebase);
