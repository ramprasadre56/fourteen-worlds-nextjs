import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { GoogleAuthProvider as GoogleAuthProviderType } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Cache the initialized instances
let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _googleProvider: GoogleAuthProviderType | undefined;
let _db: Firestore | undefined;

/**
 * All Firebase modules are loaded via dynamic import() so the SDK
 * is never evaluated during Next.js server-side rendering / static
 * generation (which was causing auth/invalid-api-key build crashes).
 */

export async function getFirebaseApp(): Promise<FirebaseApp | undefined> {
    if (typeof window === 'undefined') return undefined;
    if (_app) return _app;

    const { initializeApp, getApps, getApp } = await import('firebase/app');
    _app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    return _app;
}

export async function getAuthInstance(): Promise<Auth | undefined> {
    if (typeof window === 'undefined') return undefined;
    if (_auth) return _auth;

    const app = await getFirebaseApp();
    if (!app) return undefined;

    const { getAuth } = await import('firebase/auth');
    _auth = getAuth(app);
    return _auth;
}

export async function getGoogleProvider(): Promise<GoogleAuthProviderType | undefined> {
    if (typeof window === 'undefined') return undefined;
    if (_googleProvider) return _googleProvider;

    const { GoogleAuthProvider } = await import('firebase/auth');
    _googleProvider = new GoogleAuthProvider();
    return _googleProvider;
}

export async function getDbInstance(): Promise<Firestore | undefined> {
    if (typeof window === 'undefined') return undefined;
    if (_db) return _db;

    const app = await getFirebaseApp();
    if (!app) return undefined;

    const { getFirestore } = await import('firebase/firestore');
    _db = getFirestore(app);
    return _db;
}
