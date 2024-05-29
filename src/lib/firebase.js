// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcruK-J7tXdLziRimUjFEgwNG-cHtzEJs",
  authDomain: "n3portfolio.firebaseapp.com",
  projectId: "n3portfolio",
  storageBucket: "n3portfolio.appspot.com",
  messagingSenderId: "1037164995828",
  appId: "1:1037164995828:web:f2569701b0d1b10629aaa1",
  measurementId: "G-78PHSVKFRB",
};

const firestore = firebase.firestore();

export { firestore };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
