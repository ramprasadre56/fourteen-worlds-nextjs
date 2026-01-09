'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Search, ShoppingCart, Menu, ChevronDown, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

// Color scheme - Vedabase.io inspired warm tones
const colors = {
    primaryBg: '#d4a574',      // Darker tan/caramel (unified bar)
    accent: '#8b4513',         // Saddle brown (buttons, highlights)
    text: '#2c1810',           // Dark brown text
};

export function AmazonHeader() {
    const { data: session, status } = useSession();
    const { cartCount } = useCart();
    const isAuthenticated = status === 'authenticated';

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full">
            {/* Single Unified Navigation Bar */}
            <div
                className="w-full py-2"
                style={{ backgroundColor: colors.primaryBg }}
            >
                <div className="flex items-center justify-between px-4 w-full gap-4">
                    {/* Logo Section (Left) */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 p-1 rounded hover:outline hover:outline-1 flex-shrink-0"
                        style={{ outlineColor: colors.text }}
                    >
                        <img
                            src="/fourteen-worlds-logo.png"
                            alt="Fourteen Worlds"
                            className="h-9 w-auto rounded-lg"
                        />
                        <div className="flex flex-col items-start">
                            <span
                                className="text-lg font-bold tracking-wide"
                                style={{ color: colors.text }}
                            >
                                FOURTEEN WORLDS
                            </span>
                            <span
                                className="text-[10px] tracking-widest"
                                style={{ color: '#4a3020' }}
                            >
                                Vedic Cosmology
                            </span>
                        </div>
                    </Link>

                    {/* Navigation Links (Center) */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <Link
                            href="/library"
                            className="flex items-center gap-1 px-2 py-1 rounded transition-colors hover:bg-black/10"
                            style={{ color: colors.text }}
                        >
                            <Menu size={18} />
                            <span className="text-sm font-bold">All</span>
                        </Link>

                        {[
                            { label: 'Home', href: '/' },
                            { label: 'Vedic Science', href: '/vedic-science' },
                            { label: 'Articles', href: '/articles' },
                            { label: 'Media', href: '/media' },
                            { label: 'Library', href: '/library' },
                            { label: 'Back to Godhead', href: '/backtogodhead' },
                            { label: 'Blogs', href: '/blogs' },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-2 py-1 text-sm rounded transition-colors hover:bg-black/10 whitespace-nowrap"
                                style={{ color: colors.text }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar (Flexible Center) */}
                    <div className="flex-1 min-w-[200px] max-w-[400px]">
                        <div className="flex w-full">
                            <input
                                type="text"
                                placeholder="Search scriptures, articles..."
                                className="flex-1 px-3 py-1.5 text-sm bg-white border-none rounded-l focus:outline-2"
                                style={{ outlineColor: colors.accent }}
                            />
                            <button
                                className="px-3 py-1.5 rounded-r cursor-pointer transition-colors"
                                style={{ backgroundColor: colors.accent }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6b3a0f'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.accent}
                            >
                                <Search size={16} color="white" />
                            </button>
                        </div>
                    </div>

                    {/* Right Section (Account, Cart, Donate) */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Account Section */}
                        {isAuthenticated ? (
                            <Link
                                href="/my-account"
                                className="flex flex-col items-start p-1 rounded hover:outline hover:outline-1"
                                style={{ outlineColor: colors.text }}
                            >
                                <span className="text-[10px]" style={{ color: '#4a3020' }}>
                                    Hello, {session?.user?.name?.split(' ')[0] || 'User'}
                                </span>
                                <span className="flex items-center gap-1 text-sm font-bold" style={{ color: colors.text }}>
                                    Account <ChevronDown size={10} />
                                </span>
                            </Link>
                        ) : (
                            <Link
                                href="/signin"
                                className="flex flex-col items-start p-1 rounded hover:outline hover:outline-1"
                                style={{ outlineColor: colors.text }}
                            >
                                <span className="text-[10px]" style={{ color: '#4a3020' }}>
                                    Hello, Sign in
                                </span>
                                <span className="flex items-center gap-1 text-sm font-bold" style={{ color: colors.text }}>
                                    Account <ChevronDown size={10} />
                                </span>
                            </Link>
                        )}

                        {/* Cart Section */}
                        <Link
                            href="/cart"
                            className="flex items-center gap-1 p-1 rounded hover:outline hover:outline-1"
                            style={{ outlineColor: colors.text }}
                        >
                            <div className="relative">
                                <ShoppingCart size={22} style={{ color: colors.text }} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm font-bold" style={{ color: colors.text }}>
                                Cart
                            </span>
                        </Link>

                        {/* Donate Button */}
                        <Link
                            href="/donate"
                            className="flex items-center gap-1 px-2 py-1 rounded hover:outline hover:outline-1"
                            style={{ color: colors.accent, outlineColor: colors.accent }}
                        >
                            <Heart size={14} />
                            <span className="text-sm font-bold">Donate</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function HeaderSpacer() {
    // Height accounts for single navigation bar (~50px)
    return <div className="h-[55px] w-full" />;
}
