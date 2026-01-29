import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Các thông số này đồng chí lấy trong Project Settings trên Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSy...", 
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
