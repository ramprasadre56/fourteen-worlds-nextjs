'use client';

import { FileText, BookOpen, Globe, Atom } from 'lucide-react';

const articles = [
    {
        id: 1,
        title: 'The Fourteen Planetary Systems of the Universe',
        description: 'A comprehensive overview of Vedic cosmology as described in Śrīmad-Bhāgavatam, exploring the three-tiered structure of the universe.',
        category: 'Cosmology',
        icon: Globe,
        href: '#',
    },
    {
        id: 2,
        title: 'Mount Meru: The Axis of the Universe',
        description: 'Understanding Sumeru (Mount Meru) as the central axis of Bhū-maṇḍala and its significance in Vedic cosmography.',
        category: 'Geography',
        icon: Globe,
        href: '#',
    },
    {
        id: 3,
        title: 'The Seven Islands and Seven Oceans',
        description: 'Exploring the concentric structure of Bhū-maṇḍala with its seven dvīpas (islands) and seven seas of exotic liquids.',
        category: 'Geography',
        icon: Globe,
        href: '#',
    },
    {
        id: 4,
        title: 'Hellish Planets: The Naraka-lokas',
        description: 'A study of the 28 hellish planets described in the Fifth Canto of Śrīmad-Bhāgavatam and their karmic implications.',
        category: 'Cosmology',
        icon: Atom,
        href: '#',
    },
    {
        id: 5,
        title: 'The Universal Form: Virāṭ-rūpa',
        description: 'Understanding the cosmic manifestation of the Supreme Lord as the universe itself, based on Bhagavad-gītā Chapter 11.',
        category: 'Philosophy',
        icon: BookOpen,
        href: '#',
    },
    {
        id: 6,
        title: 'Time Cycles in Vedic Cosmology',
        description: 'Exploring the yugas, manvantaras, and kalpas - the vast cycles of cosmic time described in the Purāṇas.',
        category: 'Time',
        icon: Atom,
        href: '#',
    },
];

const categories = ['All', 'Cosmology', 'Geography', 'Philosophy', 'Time'];

export default function ArticlesPage() {
    return (
        <div className="min-h-screen py-10" style={{ background: 'var(--color-bg)' }}>
            <div className="w-full max-w-[1440px] mx-auto px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1
                        className="text-4xl font-bold mb-4"
                        style={{
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-primary)',
                        }}
                    >
                        Articles on Vedic Cosmology
                    </h1>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        Explore in-depth essays on the structure of the universe as described in
                        the Vedic scriptures, particularly Śrīmad-Bhāgavatam.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className="px-5 py-2 rounded-full text-sm font-medium cursor-pointer"
                            style={{
                                background: 'var(--color-surface)',
                                color: 'var(--color-text-secondary)',
                                border: '1px solid var(--color-border)',
                                transition: 'all var(--transition-base)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-secondary)';
                                e.currentTarget.style.color = 'var(--color-primary)';
                                e.currentTarget.style.background = 'var(--color-surface-warm)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                                e.currentTarget.style.color = 'var(--color-text-secondary)';
                                e.currentTarget.style.background = 'var(--color-surface)';
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="rounded-xl overflow-hidden group cursor-pointer"
                            style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border-light)',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all var(--transition-base)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div
                                        className="flex items-center justify-center w-8 h-8 rounded-lg"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                                        }}
                                    >
                                        <article.icon size={14} style={{ color: '#F5EDE0' }} />
                                    </div>
                                    <span
                                        className="text-xs font-semibold uppercase tracking-wider"
                                        style={{ color: 'var(--color-secondary-dark)' }}
                                    >
                                        {article.category}
                                    </span>
                                </div>
                                <h2
                                    className="text-lg font-bold mb-2"
                                    style={{
                                        color: 'var(--color-text)',
                                        fontFamily: 'var(--font-heading)',
                                        transition: 'color var(--transition-fast)',
                                    }}
                                >
                                    {article.title}
                                </h2>
                                <p
                                    className="text-sm leading-relaxed mb-4"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    {article.description}
                                </p>
                                <div
                                    className="flex items-center gap-2 text-sm font-medium"
                                    style={{ color: 'var(--color-primary)' }}
                                >
                                    <FileText size={14} />
                                    <span>Read Article</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Coming Soon Notice */}
                <div className="mt-12 text-center">
                    <div
                        className="inline-block rounded-xl px-8 py-5"
                        style={{
                            background: 'linear-gradient(135deg, #FFFBF0 0%, #FFF8E1 100%)',
                            border: '1px solid rgba(212, 168, 83, 0.3)',
                        }}
                    >
                        <p style={{ color: 'var(--color-accent)' }}>
                            <strong>More articles coming soon!</strong> We are continuously adding
                            new research and essays on Vedic cosmology.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
