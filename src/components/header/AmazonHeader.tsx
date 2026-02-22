'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, ChevronDown, Heart, X, BookOpen, PlayCircle, ChevronRight, GraduationCap, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { BG_COURSES, getPrimarySBCourses, SUPPLEMENTARY_COURSES } from '@/data/courses-data';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses', hasMega: true },
    { label: 'Media', href: '/media' },
    { label: 'Library', href: '/library' },
    { label: 'Back to Godhead', href: '/backtogodhead' },
];

function CoursesMegaDropdown({ onClose }: { onClose: () => void }) {
    const primarySBCourses = getPrimarySBCourses();

    return (
        <div
            className="absolute top-full left-0 right-0 z-[100] animate-fade-in"
            style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(253,248,240,0.99) 100%)',
                borderBottom: '3px solid var(--color-secondary)',
                boxShadow: '0 20px 60px rgba(45, 24, 16, 0.18), 0 8px 24px rgba(45, 24, 16, 0.08)',
            }}
            onMouseLeave={onClose}
        >
            <div className="max-w-[1400px] mx-auto px-8 py-8">
                {/* Top decorative line */}
                <div className="w-full h-px mb-6" style={{
                    background: 'linear-gradient(90deg, transparent, var(--color-secondary), transparent)',
                }} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Bhagavad Gita Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                            }}>
                                <span>🕉️</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold" style={{
                                    color: 'var(--color-primary)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.1rem',
                                }}>Bhagavad Gītā</h3>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                                    Bhakti Śāstrī Level
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            {BG_COURSES.map((course) => (
                                <Link
                                    key={course.slug}
                                    href={`/courses/${course.slug}`}
                                    onClick={onClose}
                                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer"
                                    style={{ transition: 'all var(--transition-base)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(139, 26, 26, 0.06)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <BookOpen size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold truncate" style={{
                                            color: 'var(--color-text)',
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.8rem',
                                        }}>{course.title}</p>
                                        <p className="text-xs truncate" style={{
                                            color: 'var(--color-text-muted)',
                                            fontSize: '0.65rem',
                                        }}>{course.subtitle}</p>
                                    </div>
                                    <span className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0" style={{
                                        background: 'rgba(139, 26, 26, 0.08)',
                                        color: 'var(--color-primary)',
                                        fontSize: '0.6rem',
                                        fontWeight: 600,
                                    }}>
                                        {course.videoCount} videos
                                    </span>
                                </Link>
                            ))}
                        </div>
                        <Link
                            href="/courses/bg"
                            onClick={onClose}
                            className="flex items-center gap-1 mt-3 px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer"
                            style={{
                                color: 'var(--color-primary)',
                                fontSize: '0.75rem',
                                transition: 'all var(--transition-base)',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 26, 26, 0.06)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            View all BG Courses <ChevronRight size={12} />
                        </Link>
                    </div>

                    {/* Srimad Bhagavatam Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{
                                background: 'linear-gradient(135deg, var(--color-secondary-dark) 0%, var(--color-secondary) 100%)',
                            }}>
                                <span>📖</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold" style={{
                                    color: 'var(--color-primary)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.1rem',
                                }}>Śrīmad Bhāgavatam</h3>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                                    Bhakti Vaibhava Level
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            {primarySBCourses.map((course) => (
                                <Link
                                    key={course.slug}
                                    href={`/courses/${course.slug}`}
                                    onClick={onClose}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer"
                                    style={{ transition: 'all var(--transition-base)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <span className="text-sm">{course.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold truncate" style={{
                                            color: 'var(--color-text)',
                                            fontSize: '0.8rem',
                                        }}>Canto {course.cantoNumber}</p>
                                        <p className="text-xs truncate" style={{
                                            color: 'var(--color-text-muted)',
                                            fontSize: '0.6rem',
                                        }}>{course.videoCount} videos</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Link
                            href="/courses/sb"
                            onClick={onClose}
                            className="flex items-center gap-1 mt-3 px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer"
                            style={{
                                color: 'var(--color-secondary-dark)',
                                fontSize: '0.75rem',
                                transition: 'all var(--transition-base)',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.08)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            View all SB Courses <ChevronRight size={12} />
                        </Link>
                    </div>

                    {/* Supplementary & Quick Links Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{
                                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)',
                            }}>
                                <span>✨</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold" style={{
                                    color: 'var(--color-primary)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.1rem',
                                }}>Supplementary</h3>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                                    Special Topics & Thematic
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            {SUPPLEMENTARY_COURSES.slice(0, 5).map((course) => (
                                <Link
                                    key={course.slug}
                                    href={`/courses/${course.slug}`}
                                    onClick={onClose}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer"
                                    style={{ transition: 'all var(--transition-base)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(107, 66, 38, 0.06)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <span className="text-sm">{course.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold truncate" style={{
                                            color: 'var(--color-text)',
                                            fontSize: '0.8rem',
                                        }}>{course.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* CTA */}
                        <Link
                            href="/courses"
                            onClick={onClose}
                            className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                                color: '#ffffff',
                                fontSize: '0.8rem',
                                transition: 'all var(--transition-base)',
                                boxShadow: 'var(--shadow-warm)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 6px 24px rgba(139, 26, 26, 0.25)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-warm)';
                            }}
                        >
                            <GraduationCap size={14} />
                            Explore All Courses
                        </Link>
                    </div>
                </div>

                {/* Bottom decorative line */}
                <div className="w-full h-px mt-6" style={{
                    background: 'linear-gradient(90deg, transparent, var(--color-secondary), transparent)',
                }} />
            </div>
        </div>
    );
}

function MobileCoursesAccordion({ onClose }: { onClose: () => void }) {
    const [bgOpen, setBgOpen] = useState(false);
    const [sbOpen, setSbOpen] = useState(false);
    const primarySBCourses = getPrimarySBCourses();

    return (
        <div className="border-t" style={{ borderColor: 'rgba(212, 168, 83, 0.15)' }}>
            {/* BG Section */}
            <button
                onClick={() => setBgOpen(!bgOpen)}
                className="flex items-center justify-between w-full px-6 py-3 text-sm font-medium cursor-pointer"
                style={{ color: 'rgba(245, 237, 224, 0.9)' }}
            >
                <span className="flex items-center gap-2">
                    <span>🕉️</span> Bhagavad Gītā
                </span>
                <ChevronDown
                    size={14}
                    style={{
                        transform: bgOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform var(--transition-base)',
                    }}
                />
            </button>
            {bgOpen && (
                <div className="px-8 pb-3 animate-fade-in">
                    {BG_COURSES.map((c) => (
                        <Link
                            key={c.slug}
                            href={`/courses/${c.slug}`}
                            onClick={onClose}
                            className="block px-3 py-2 text-xs rounded-lg cursor-pointer"
                            style={{ color: 'rgba(212, 168, 83, 0.85)', fontSize: '0.8rem' }}
                        >
                            {c.title}
                        </Link>
                    ))}
                    <Link
                        href="/courses/bg"
                        onClick={onClose}
                        className="block px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer"
                        style={{ color: 'var(--color-secondary)', fontSize: '0.75rem' }}
                    >
                        View All BG →
                    </Link>
                </div>
            )}

            {/* SB Section */}
            <button
                onClick={() => setSbOpen(!sbOpen)}
                className="flex items-center justify-between w-full px-6 py-3 text-sm font-medium cursor-pointer"
                style={{ color: 'rgba(245, 237, 224, 0.9)' }}
            >
                <span className="flex items-center gap-2">
                    <span>📖</span> Śrīmad Bhāgavatam
                </span>
                <ChevronDown
                    size={14}
                    style={{
                        transform: sbOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform var(--transition-base)',
                    }}
                />
            </button>
            {sbOpen && (
                <div className="px-8 pb-3 animate-fade-in">
                    {primarySBCourses.map((c) => (
                        <Link
                            key={c.slug}
                            href={`/courses/${c.slug}`}
                            onClick={onClose}
                            className="block px-3 py-2 text-xs rounded-lg cursor-pointer"
                            style={{ color: 'rgba(212, 168, 83, 0.85)', fontSize: '0.8rem' }}
                        >
                            Canto {c.cantoNumber} — {c.subtitle}
                        </Link>
                    ))}
                    <Link
                        href="/courses/sb"
                        onClick={onClose}
                        className="block px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer"
                        style={{ color: 'var(--color-secondary)', fontSize: '0.75rem' }}
                    >
                        View All SB →
                    </Link>
                </div>
            )}

            {/* All Courses */}
            <Link
                href="/courses"
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold cursor-pointer"
                style={{ color: 'var(--color-secondary)' }}
            >
                <GraduationCap size={14} />
                All Courses
            </Link>
        </div>
    );
}

export function AmazonHeader() {
    const { user } = useAuth();
    const { cartCount } = useCart();
    const isAuthenticated = !!user;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const megaTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleMegaEnter = () => {
        if (megaTimeout.current) clearTimeout(megaTimeout.current);
        setMegaOpen(true);
    };

    const handleMegaLeave = () => {
        megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
    };

    useEffect(() => {
        return () => {
            if (megaTimeout.current) clearTimeout(megaTimeout.current);
        };
    }, []);

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
                            <div
                                key={link.href}
                                className="relative"
                                onMouseEnter={link.hasMega ? handleMegaEnter : undefined}
                                onMouseLeave={link.hasMega ? handleMegaLeave : undefined}
                            >
                                <Link
                                    href={link.href}
                                    className="relative px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap cursor-pointer flex items-center gap-1"
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
                                    {link.hasMega && <ChevronDown size={12} style={{
                                        transform: megaOpen ? 'rotate(180deg)' : 'rotate(0)',
                                        transition: 'transform var(--transition-base)',
                                    }} />}
                                </Link>
                            </div>
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

                {/* Mega Dropdown (Desktop) */}
                {megaOpen && (
                    <div
                        onMouseEnter={handleMegaEnter}
                        onMouseLeave={handleMegaLeave}
                    >
                        <CoursesMegaDropdown onClose={() => setMegaOpen(false)} />
                    </div>
                )}

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
                            <Link
                                href="/"
                                onClick={() => setMobileOpen(false)}
                                className="px-4 py-3 rounded-lg text-sm font-medium cursor-pointer"
                                style={{ color: 'rgba(245, 237, 224, 0.9)' }}
                            >
                                Home
                            </Link>
                        </div>

                        {/* Mobile Courses Accordion */}
                        <MobileCoursesAccordion onClose={() => setMobileOpen(false)} />

                        <div className="flex flex-col px-6 py-2 gap-1">
                            {navLinks.filter(l => !l.hasMega && l.href !== '/').map((link) => (
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
