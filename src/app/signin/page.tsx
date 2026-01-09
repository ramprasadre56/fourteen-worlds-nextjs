'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Chrome, Github } from 'lucide-react';

export default function SignInPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
                <div className="flex flex-col items-center gap-6">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500">
                            Sign in to access your account
                        </p>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="flex flex-col w-full gap-3">
                        <button
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400"
                        >
                            <Chrome size={20} className="text-blue-500" />
                            Continue with Google
                        </button>

                        <button
                            onClick={() => signIn('github', { callbackUrl: '/' })}
                            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-gray-900 rounded-lg font-medium text-white transition-all hover:bg-gray-800"
                        >
                            <Github size={20} />
                            Continue with GitHub
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center w-full gap-3">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-sm text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Email Sign In (placeholder) */}
                    <div className="flex flex-col w-full gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                        <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium transition-all hover:bg-purple-700">
                            Send Magic Link
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-sm text-gray-500 text-center">
                        By signing in, you agree to our{' '}
                        <Link href="/terms" className="text-purple-600 hover:underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-purple-600 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
