'use client';

import Link from 'next/link';
import { Chrome, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isSignInWithEmailLink } from 'firebase/auth';
import { getAuthInstance } from '@/lib/firebase';

export default function SignInPage() {
    const { user, signInWithGoogle, sendMagicLink, verifyMagicLink } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [magicLinkStatus, setMagicLinkStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

    // Handle Auth redirect if already signed in
    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    // Handle incoming Magic Link authentication
    useEffect(() => {
        const verifyLink = async () => {
            const auth = getAuthInstance();
            if (auth && isSignInWithEmailLink(auth, window.location.href)) {
                let emailForSignIn = window.localStorage.getItem('emailForSignIn');
                if (!emailForSignIn) {
                    // User opened the link on a different device. Provide an opportunity to get their email.
                    emailForSignIn = window.prompt('Please provide your email for confirmation');
                }

                if (emailForSignIn) {
                    setMagicLinkStatus({ type: 'loading', message: 'Verifying your link...' });
                    try {
                        await verifyMagicLink(emailForSignIn, window.location.href);
                        window.localStorage.removeItem('emailForSignIn');
                        // Auth state observer will redirect to '/' when user is set
                    } catch (error: unknown) {
                        console.error('Error signing in with magic link', error);
                        const errorMessage = error instanceof Error ? error.message : 'The link is invalid or has expired.';
                        setMagicLinkStatus({ type: 'error', message: errorMessage });
                    }
                }
            }
        };

        verifyLink();
    }, [verifyMagicLink]);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Failed to sign in', error);
        }
    };

    const handleSendMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setMagicLinkStatus({ type: 'loading', message: 'Sending link...' });
        try {
            await sendMagicLink(email, window.location.href);
            window.localStorage.setItem('emailForSignIn', email);
            setMagicLinkStatus({ type: 'success', message: 'Check your email for the sign-in link!' });
        } catch (error: unknown) {
            console.error('Failed to send magic link', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to send magic link. Please try again.';
            setMagicLinkStatus({ type: 'error', message: errorMessage });
        }
    };

    return (
        <div
            className="min-h-[80vh] flex items-center justify-center"
            style={{ background: 'var(--color-bg)' }}
        >
            <div
                className="w-full max-w-md p-10 rounded-2xl"
                style={{
                    background: 'var(--color-surface)',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--color-border-light)',
                    borderTop: '4px solid var(--color-secondary)',
                }}
            >
                <div className="flex flex-col items-center gap-6">
                    {/* Header */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="w-6 h-px" style={{ background: 'var(--color-secondary)' }} />
                            <Sparkles size={14} style={{ color: 'var(--color-secondary)' }} />
                            <div className="w-6 h-px" style={{ background: 'var(--color-secondary)' }} />
                        </div>
                        <h1
                            className="text-2xl font-bold mb-2"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                        >
                            Welcome Back
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            Sign in to access your account
                        </p>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="flex flex-col w-full gap-3">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg font-medium cursor-pointer"
                            style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text)',
                                transition: 'all var(--transition-fast)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-secondary)';
                                e.currentTarget.style.background = 'var(--color-surface-warm)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                                e.currentTarget.style.background = 'var(--color-surface)';
                            }}
                        >
                            <Chrome size={20} style={{ color: '#4285F4' }} />
                            Continue with Google
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center w-full gap-3">
                        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                        <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>or</span>
                        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                    </div>

                    {/* Email Sign In */}
                    <form onSubmit={handleSendMagicLink} className="flex flex-col w-full gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={magicLinkStatus.type === 'loading' || magicLinkStatus.type === 'success'}
                            className="w-full py-3 px-4 rounded-lg disabled:opacity-60"
                            style={{
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-surface)',
                                color: 'var(--color-text)',
                                outline: 'none',
                                fontSize: 'var(--text-sm)',
                                transition: 'border-color var(--transition-fast)',
                            }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-secondary)'; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                            required
                        />
                        <button
                            type="submit"
                            disabled={magicLinkStatus.type === 'loading' || magicLinkStatus.type === 'success' || !email}
                            className="btn-golden w-full justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {magicLinkStatus.type === 'loading' && magicLinkStatus.message === 'Sending link...' ? 'Sending...' : 'Send Magic Link'}
                        </button>

                        {/* Status Messages */}
                        {magicLinkStatus.message && (
                            <div
                                className={`text-sm text-center mt-2 p-3 rounded-lg ${
                                    magicLinkStatus.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' :
                                    magicLinkStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' :
                                    'text-[var(--color-text-muted)]'
                                }`}
                            >
                                {magicLinkStatus.message}
                            </div>
                        )}
                    </form>

                    {/* Footer */}
                    <p className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
                        By signing in, you agree to our{' '}
                        <Link
                            href="/terms"
                            style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
                        >
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link
                            href="/privacy"
                            style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
                        >
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
