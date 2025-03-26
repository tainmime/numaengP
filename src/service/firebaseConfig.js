import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJYQaOVXQxTxjJPk01uxaZwUpvIuqKbTc",
  authDomain: "reactnativeapp-f5f30.firebaseapp.com",
  projectId: "reactnativeapp-f5f30",
  storageBucket: "reactnativeapp-f5f30.appspot.com",
  messagingSenderId: "134513512208",
  appId: "1:134513512208:web:1128b8e8bd19cc067a1f95",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Web Client ID for Google Sign-In
const googleClientId = '134513512208-hke46l7bdsgs6g9bsm6at9b950n512cd.apps.googleusercontent.com';

export { auth, googleClientId };