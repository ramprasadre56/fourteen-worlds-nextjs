'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    User
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    sendMagicLink: (email: string, redirectUrl: string) => Promise<void>;
    verifyMagicLink: (email: string, href: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        if (!auth || !googleProvider) throw new Error("Firebase Auth is not initialized.");
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    };

    const sendMagicLink = async (email: string, redirectUrl: string) => {
        if (!auth) throw new Error("Firebase Auth is not initialized.");
        try {
            await sendSignInLinkToEmail(auth, email, {
                url: redirectUrl,
                handleCodeInApp: true,
            });
        } catch (error) {
            console.error('Error sending magic link:', error);
            throw error;
        }
    };

    const verifyMagicLink = async (email: string, href: string) => {
        if (!auth) throw new Error("Firebase Auth is not initialized.");
        try {
            if (isSignInWithEmailLink(auth, href)) {
                await signInWithEmailLink(auth, email, href);
            } else {
                throw new Error('Not a valid magic link.');
            }
        } catch (error) {
            console.error('Error verifying magic link:', error);
            throw error;
        }
    };

    const logout = async () => {
        if (!auth) return;
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signInWithGoogle,
            logout,
            sendMagicLink,
            verifyMagicLink
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
