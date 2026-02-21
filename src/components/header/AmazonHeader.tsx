'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, ChevronDown, Heart, X, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Vedic Science', href: '/vedic-science' },
    { label: 'Articles', href: '/articles' },
    { label: 'Media', href: '/media' },
    { label: 'Library', href: '/library' },
    { label: 'Back to Godhead', href: '/backtogodhead' },
];

export function AmazonHeader() {
    const { user } = useAuth();
    const { cartCount } = useCart();
    const isAuthenticated = !!user;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 w-full"
                style={{
                    background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.95) 0%, rgba(107, 16, 16, 0.97) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(212, 168, 83, 0.25)',
                    boxShadow: '0 4px 24px rgba(45, 24, 16, 0.15)',
                }}
            >
                <div className="flex items-center justify-between px-6 py-3 w-full gap-6">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 flex-shrink-0 group cursor-pointer"
                    >
                        <img
                            src="/fourteen-worlds-logo.png"
                            alt="Fourteen Worlds"
                            className="h-14 w-auto rounded-lg"
                            style={{
                                border: '2px solid rgba(212, 168, 83, 0.4)',
                                transition: 'border-color var(--transition-base)',
                            }}
                        />
                        <div className="flex flex-col items-start">
                            <span
                                className="text-lg font-bold tracking-wide"
                                style={{
                                    color: '#F5EDE0',
                                    fontFamily: 'var(--font-heading)',
                                    letterSpacing: '0.08em',
                                }}
                            >
                                FOURTEEN WORLDS
                            </span>
                            <span
                                className="text-xs font-medium tracking-[0.2em] uppercase"
                                style={{ color: 'rgba(212, 168, 83, 0.85)' }}
                            >
                                Vedic Cosmology
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap cursor-pointer"
                                style={{
                                    color: 'rgba(245, 237, 224, 0.9)',
                                    transition: 'all var(--transition-base)',
                                    fontFamily: 'var(--font-body)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#FFFFFF';
                                    e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'rgba(245, 237, 224, 0.9)';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Account */}
                        {isAuthenticated ? (
                            <Link
                                href="/my-account"
                                className="hidden sm:flex flex-col items-start px-3 py-1.5 rounded-lg cursor-pointer"
                                style={{
                                    transition: 'background var(--transition-base)',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.12)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <span className="text-xs font-medium" style={{ color: 'rgba(212, 168, 83, 0.8)' }}>
                                    Hello, {user?.displayName?.split(' ')[0] || 'User'}
                                </span>
                                <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#F5EDE0' }}>
                                    Account <ChevronDown size={10} />
                                </span>
                            </Link>
                        ) : (
                            <Link
                                href="/signin"
                                className="hidden sm:flex flex-col items-start px-3 py-1.5 rounded-lg cursor-pointer"
                                style={{
                                    transition: 'background var(--transition-base)',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.12)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <span className="text-xs font-medium" style={{ color: 'rgba(212, 168, 83, 0.8)' }}>
                                    Hello, Sign in
                                </span>
                                <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#F5EDE0' }}>
                                    Account <ChevronDown size={10} />
                                </span>
                            </Link>
                        )}

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer"
                            style={{
                                transition: 'background var(--transition-base)',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.12)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div className="relative">
                                <ShoppingCart size={20} style={{ color: '#F5EDE0' }} />
                                {cartCount > 0 && (
                                    <span
                                        className="absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                        style={{ backgroundColor: 'var(--color-secondary)' }}
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:inline text-sm font-semibold" style={{ color: '#F5EDE0' }}>
                                Cart
                            </span>
                        </Link>

                        {/* Donate */}
                        <Link
                            href="/donate"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%)',
                                color: 'var(--color-text)',
                                transition: 'all var(--transition-base)',
                                boxShadow: '0 2px 8px rgba(212, 168, 83, 0.25)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(212, 168, 83, 0.35)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(212, 168, 83, 0.25)';
                            }}
                        >
                            <Heart size={14} />
                            <span>Donate</span>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 rounded-lg cursor-pointer"
                            style={{ color: '#F5EDE0', transition: 'background var(--transition-base)' }}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.12)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileOpen && (
                    <nav
                        className="lg:hidden border-t animate-fade-in"
                        style={{
                            borderColor: 'rgba(212, 168, 83, 0.2)',
                            background: 'rgba(107, 16, 16, 0.98)',
                        }}
                    >
                        <div className="flex flex-col px-6 py-4 gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-4 py-3 rounded-lg text-sm font-medium cursor-pointer"
                                    style={{
                                        color: 'rgba(245, 237, 224, 0.9)',
                                        transition: 'all var(--transition-fast)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.12)';
                                        e.currentTarget.style.color = '#FFFFFF';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = 'rgba(245, 237, 224, 0.9)';
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {!isAuthenticated && (
                                <Link
                                    href="/signin"
                                    onClick={() => setMobileOpen(false)}
                                    className="sm:hidden px-4 py-3 rounded-lg text-sm font-medium cursor-pointer"
                                    style={{ color: 'rgba(212, 168, 83, 0.9)' }}
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </nav>
                )}
            </header>
        </>
    );
}

export function HeaderSpacer() {
    return <div className="h-[64px] w-full" />;
}
