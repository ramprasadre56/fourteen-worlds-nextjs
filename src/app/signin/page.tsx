'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Chrome, Github, Sparkles } from 'lucide-react';

export default function SignInPage() {
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
                            onClick={() => signIn('google', { callbackUrl: '/' })}
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

                        <button
                            onClick={() => signIn('github', { callbackUrl: '/' })}
                            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg font-medium cursor-pointer"
                            style={{
                                background: 'var(--color-text)',
                                color: '#F5EDE0',
                                transition: 'all var(--transition-fast)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '0.9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '1';
                            }}
                        >
                            <Github size={20} />
                            Continue with GitHub
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center w-full gap-3">
                        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                        <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>or</span>
                        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                    </div>

                    {/* Email Sign In */}
                    <div className="flex flex-col w-full gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full py-3 px-4 rounded-lg"
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
                        />
                        <button className="btn-golden w-full justify-center cursor-pointer">
                            Send Magic Link
                        </button>
                    </div>

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
