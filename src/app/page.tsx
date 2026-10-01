'use client';

import { Sparkles } from 'lucide-react';
import { VaishnavCalendar } from '@/components/sections/VaishnavCalendar';
import { PrabhupadaQuotes } from '@/components/sections/PrabhupadaQuotes';
import { BlogGrid } from '@/components/sections/BlogGrid';

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
            {/* Main Content */}
            <div style={{ background: 'var(--color-bg)' }}>
                <div className="w-full max-w-[1440px] mx-auto px-8 py-12 flex flex-col gap-16">
                    <section className="w-full">
                        <BlogGrid />
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <VaishnavCalendar />
                        <PrabhupadaQuotes />
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
