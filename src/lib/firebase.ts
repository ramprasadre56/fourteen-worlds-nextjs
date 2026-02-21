import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA5MctsqnAz--NwyZFZJ1ujkZCTWJScKnI",
    authDomain: "fourteen-worlds-auth.firebaseapp.com",
    projectId: "fourteen-worlds-auth",
    storageBucket: "fourteen-worlds-auth.firebasestorage.app",
    messagingSenderId: "253748789803",
    appId: "1:253748789803:web:f74b44be334378f421606e"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
