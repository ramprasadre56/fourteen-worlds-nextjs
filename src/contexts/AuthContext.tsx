'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { getAuthInstance, getGoogleProvider } from '@/lib/firebase';

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
        let unsubscribe: (() => void) | undefined;

        (async () => {
            const auth = await getAuthInstance();
            if (!auth) {
                setLoading(false);
                return;
            }

            const { onAuthStateChanged } = await import('firebase/auth');
            unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            });
        })();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const signInWithGoogle = async () => {
        const auth = await getAuthInstance();
        const provider = await getGoogleProvider();
        if (!auth || !provider) throw new Error("Firebase Auth is not initialized.");
        const { signInWithPopup } = await import('firebase/auth');
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    };

    const sendMagicLink = async (email: string, redirectUrl: string) => {
        const auth = await getAuthInstance();
        if (!auth) throw new Error("Firebase Auth is not initialized.");
        const { sendSignInLinkToEmail } = await import('firebase/auth');
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
        const auth = await getAuthInstance();
        if (!auth) throw new Error("Firebase Auth is not initialized.");
        const { isSignInWithEmailLink, signInWithEmailLink } = await import('firebase/auth');
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
        const auth = await getAuthInstance();
        if (!auth) return;
        const { signOut } = await import('firebase/auth');
        try {
            await signOut(auth);
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
