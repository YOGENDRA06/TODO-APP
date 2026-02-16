import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpawdRD5laSjAojWOeGq2aCtESQ92h3jE",
  authDomain: "todo-app-mvp.firebaseapp.com",
  projectId: "todo-app-mvp",
  storageBucket: "todo-app-mvp.firebasestorage.app",
  messagingSenderId: "600558301664",
  appId: "1:600558301664:web:68ec2cd1cf054faf287b85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
