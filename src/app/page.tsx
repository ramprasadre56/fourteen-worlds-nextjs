'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { VaishnavCalendar } from '@/components/sections/VaishnavCalendar';
import { PrabhupadaQuotes } from '@/components/sections/PrabhupadaQuotes';
import { QuickLinks } from '@/components/sections/QuickLinks';
import { BlogGrid } from '@/components/sections/BlogGrid';

function HeroBanner() {
    return (
        <div
            className="relative w-full overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #3D0C0C 0%, #5A1515 30%, #8B1A1A 60%, #6B1010 100%)',
                minHeight: '280px',
            }}
        >
            {/* Golden ornamental overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 70% 50%, rgba(212, 168, 83, 0.08) 0%, transparent 60%)',
                }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center py-14 px-8 text-center">
                <div
                    className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
                    style={{
                        background: 'rgba(212, 168, 83, 0.15)',
                        border: '1px solid rgba(212, 168, 83, 0.3)',
                    }}
                >
                    <Sparkles size={14} style={{ color: '#D4A853' }} />
                    <span
                        className="text-xs font-medium tracking-wider uppercase"
                        style={{ color: 'rgba(212, 168, 83, 0.9)' }}
                    >
                        Based on Śrīmad-Bhāgavatam
                    </span>
                </div>

                <h1
                    className="text-4xl md:text-5xl font-bold mb-4"
                    style={{
                        fontFamily: 'var(--font-heading)',
                        color: '#F5EDE0',
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                    }}
                >
                    Explore the{' '}
                    <span style={{ color: '#D4A853' }}>Fourteen Worlds</span>
                    <br />
                    of Vedic Cosmology
                </h1>

                <p
                    className="text-base md:text-lg max-w-2xl mb-8"
                    style={{
                        color: 'rgba(245, 237, 224, 0.75)',
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.7,
                    }}
                >
                    An interactive journey through the three-tiered structure of the universe
                    as described in the ancient Vedic scriptures
                </p>

                <div className="flex items-center gap-4">
                    <Link
                        href="/library"
                        className="btn-golden cursor-pointer"
                        style={{ padding: '0.75rem 1.75rem', fontSize: 'var(--text-base)' }}
                    >
                        Explore Library
                        <ArrowRight size={16} />
                    </Link>
                    <Link
                        href="/articles"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer"
                        style={{
                            color: '#F5EDE0',
                            border: '1px solid rgba(245, 237, 224, 0.25)',
                            transition: 'all var(--transition-base)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.5)';
                            e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(245, 237, 224, 0.25)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        Read Articles
                    </Link>
                </div>
            </div>

            {/* Bottom golden fade line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.4), transparent)',
                }}
            />
        </div>
    );
}

function Footer() {
    return (
        <footer
            className="w-full"
            style={{
                background: 'linear-gradient(135deg, #3D0C0C 0%, #5A1515 50%, #3D0C0C 100%)',
                borderTop: '1px solid rgba(212, 168, 83, 0.2)',
            }}
        >
            {/* Golden divider */}
            <div
                className="w-full h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.5), transparent)',
                }}
            />

            <div className="flex flex-col items-center gap-3 py-10 px-8">
                <div
                    className="flex items-center gap-2 mb-2"
                >
                    <div
                        className="w-8 h-px"
                        style={{ background: 'var(--color-secondary)' }}
                    />
                    <Sparkles size={14} style={{ color: '#D4A853' }} />
                    <div
                        className="w-8 h-px"
                        style={{ background: 'var(--color-secondary)' }}
                    />
                </div>

                <p
                    className="text-base text-center"
                    style={{
                        color: 'rgba(245, 237, 224, 0.8)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 500,
                    }}
                >
                    Based on Śrīmad-Bhāgavatam and other Vedic scriptures
                </p>
                <p
                    className="text-sm italic text-center"
                    style={{ color: 'rgba(245, 237, 224, 0.5)' }}
                >
                    Source: bhu-mandala cosmological research and vedabase.io
                </p>
            </div>
        </footer>
    );
}

export default function HomePage() {
    return (
        <div style={{ background: 'var(--color-bg)' }} className="min-h-screen">
            {/* Hero Banner */}
            <HeroBanner />

            {/* Main Content */}
            <div style={{ background: 'var(--color-bg)' }}>
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8 p-8 max-w-[1440px] mx-auto w-full">
                    {/* Main Content Column */}
                    <div className="flex flex-col">
                        <QuickLinks />
                        <BlogGrid />
                    </div>

                    {/* Sidebar */}
                    <div className="flex flex-col">
                        <VaishnavCalendar />
                        <PrabhupadaQuotes />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
