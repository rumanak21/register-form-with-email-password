// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqnvZwqU1mygl53mxVmRsNiSPMWgZk54A",
  authDomain: "register-with-email-password.firebaseapp.com",
  projectId: "register-with-email-password",
  storageBucket: "register-with-email-password.appspot.com",
  messagingSenderId: "708595574216",
  appId: "1:708595574216:web:d8b145b6c28103bb458cfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;