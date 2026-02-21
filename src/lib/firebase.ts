import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase only if we have the config or are in the browser
let app;
let auth;
let googleProvider;

try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    
    // Only initialize auth if we are actually in the browser OR we have an API key
    if (typeof window !== 'undefined' || process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
    }
} catch (error) {
    console.error('Firebase initialization error', error);
}

export { app, auth, googleProvider };
