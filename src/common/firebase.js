// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwGMjrdMDxItBfYJkwuzIUuekqY1QAc_k",
  authDomain: "theocratic-software.firebaseapp.com",
  projectId: "theocratic-software",
  storageBucket: "theocratic-software.appspot.com",
  messagingSenderId: "441138730087",
  appId: "1:441138730087:web:9877f590cadb16467af0c2",
  measurementId: "G-KHGDKVZKNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);