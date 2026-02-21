import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Lazy-initialize Firebase only on the client side to prevent SSR build crashes
let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _googleProvider: GoogleAuthProvider | undefined;

function getFirebaseApp(): FirebaseApp | undefined {
    if (typeof window === 'undefined') return undefined;
    if (!_app) {
        _app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    }
    return _app;
}

function getFirebaseAuth(): Auth | undefined {
    if (typeof window === 'undefined') return undefined;
    if (!_auth) {
        const app = getFirebaseApp();
        if (app) {
            _auth = getAuth(app);
        }
    }
    return _auth;
}

function getGoogleProvider(): GoogleAuthProvider | undefined {
    if (typeof window === 'undefined') return undefined;
    if (!_googleProvider) {
        _googleProvider = new GoogleAuthProvider();
    }
    return _googleProvider;
}

export { getFirebaseApp as getApp, getFirebaseAuth as getAuthInstance, getGoogleProvider };
