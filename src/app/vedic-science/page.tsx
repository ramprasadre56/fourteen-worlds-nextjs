'use client';

import { Atom, FlaskConical, Telescope, BookOpen, Sparkles } from 'lucide-react';

const topics = [
    {
        title: 'Cosmological Distances',
        description: 'Precise measurements of distances between planetary systems as described in the Fifth Canto of Śrīmad-Bhāgavatam.',
        icon: Telescope,
    },
    {
        title: 'Atomic Theory',
        description: 'The Vedic concept of paramāṇu (atom) and how matter is constructed from the subtlest to the grossest elements.',
        icon: Atom,
    },
    {
        title: 'Time Measurement',
        description: 'From the paramāṇu (atomic time) to a day of Brahmā — the precise Vedic system of measuring cosmic time.',
        icon: FlaskConical,
    },
    {
        title: 'Embryology & Medicine',
        description: 'Descriptions in the Third Canto of the development of the embryo and Āyurvedic principles of health.',
        icon: BookOpen,
    },
];

export default function VedicSciencePage() {
    return (
        <div className="min-h-screen py-12" style={{ background: 'var(--color-bg)' }}>
            <div className="w-full max-w-[1200px] mx-auto px-8">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-8 h-px" style={{ background: 'var(--color-secondary)' }} />
                        <Sparkles size={16} style={{ color: 'var(--color-secondary)' }} />
                        <div className="w-8 h-px" style={{ background: 'var(--color-secondary)' }} />
                    </div>
                    <h1
                        className="text-4xl font-bold mb-4"
                        style={{
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-primary)',
                        }}
                    >
                        Vedic Science
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                        Exploring the scientific knowledge contained within the ancient Vedic scriptures
                    </p>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
                    {topics.map((topic) => (
                        <div
                            key={topic.title}
                            className="p-6 rounded-xl"
                            style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border-light)',
                                borderLeft: '4px solid var(--color-secondary)',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all var(--transition-base)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                                    }}
                                >
                                    <topic.icon size={22} style={{ color: '#F5EDE0' }} />
                                </div>
                                <div>
                                    <h3
                                        className="text-lg font-bold mb-2"
                                        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
                                    >
                                        {topic.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                        {topic.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coming Soon */}
                <div
                    className="rounded-2xl p-10 text-center"
                    style={{
                        background: 'linear-gradient(135deg, #FFFBF0 0%, #FFF8E1 100%)',
                        border: '1px solid rgba(212, 168, 83, 0.3)',
                    }}
                >
                    <Sparkles size={28} style={{ color: 'var(--color-secondary)', margin: '0 auto 1rem' }} />
                    <h2
                        className="text-2xl font-bold mb-3"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                    >
                        More Content Coming Soon
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        We are preparing in-depth research articles on the scientific aspects of Vedic literature.
                        Stay tuned for detailed explorations of cosmography, mathematics, and natural sciences.
                    </p>
                </div>
            </div>
        </div>
    );
}
