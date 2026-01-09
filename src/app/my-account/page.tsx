'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { User, LogOut, Settings, CreditCard, Heart } from 'lucide-react';

export default function MyAccountPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Please sign in to view your account</p>
                    <Link
                        href="/signin"
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-8">
                {/* Header */}
                <div className="bg-white rounded-xl p-6 mb-6 flex items-center gap-4">
                    {session.user?.image ? (
                        <img
                            src={session.user.image}
                            alt="Profile"
                            className="w-16 h-16 rounded-full"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                            <User size={32} className="text-purple-600" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {session.user?.name || 'User'}
                        </h1>
                        <p className="text-gray-500">{session.user?.email}</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="ml-auto flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>

                {/* Account Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/cart"
                        className="bg-white rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow"
                    >
                        <CreditCard size={24} className="text-purple-600" />
                        <div>
                            <h2 className="font-semibold text-gray-800">Your Orders</h2>
                            <p className="text-sm text-gray-500">View your order history</p>
                        </div>
                    </Link>

                    <Link
                        href="/subscription"
                        className="bg-white rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow"
                    >
                        <Heart size={24} className="text-red-500" />
                        <div>
                            <h2 className="font-semibold text-gray-800">Subscriptions</h2>
                            <p className="text-sm text-gray-500">Manage your subscriptions</p>
                        </div>
                    </Link>

                    <div className="bg-white rounded-xl p-6 flex items-center gap-4">
                        <Settings size={24} className="text-gray-600" />
                        <div>
                            <h2 className="font-semibold text-gray-800">Settings</h2>
                            <p className="text-sm text-gray-500">Account preferences</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
