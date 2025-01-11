// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "profile-app-d3853.firebaseapp.com",
  projectId: "profile-app-d3853",
  storageBucket: "profile-app-d3853.firebasestorage.app",
  messagingSenderId: "241270396830",
  appId: "1:241270396830:web:96aeca523151ce1de7e88f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);