// firebase.js

// Import Firebase modules (for use with modules or bundlers like Vite, Webpack)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual API key
  authDomain: "your-project-id.firebaseapp.com", // Replace with your actual auth domain
  projectId: "your-project-id", // Replace with your actual project ID
  storageBucket: "your-project-id.appspot.com", // Replace with your actual storage bucket
  messagingSenderId: "YOUR_SENDER_ID", // Replace with your actual sender ID
  appId: "YOUR_APP_ID" // Replace with your actual app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore db to use it in other files
export { db };