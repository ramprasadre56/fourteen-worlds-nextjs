'use client';

import Link from 'next/link';
import { BookOpen, Library, FileText, Image } from 'lucide-react';

const links = [
    {
        icon: BookOpen,
        title: 'Bhagavad Gita',
        desc: 'Study the timeless wisdom',
        href: '/library/bg',
        gradient: 'linear-gradient(135deg, #FFF9F0 0%, #FFF3E0 100%)',
    },
    {
        icon: Library,
        title: 'Srimad Bhagavatam',
        desc: 'Explore the cream of Vedic literature',
        href: '/library/sb',
        gradient: 'linear-gradient(135deg, #FFF5F5 0%, #FFE8E8 100%)',
    },
    {
        icon: FileText,
        title: 'Articles',
        desc: 'Read Vedic cosmology essays',
        href: '/articles',
        gradient: 'linear-gradient(135deg, #F8FFF0 0%, #F0FAE5 100%)',
    },
    {
        icon: Image,
        title: 'Media',
        desc: 'Photos, videos & flipbooks',
        href: '/media',
        gradient: 'linear-gradient(135deg, #F0F5FF 0%, #E8EFFF 100%)',
    },
];

export function QuickLinks() {
    return (
        <div className="w-full">
            <h2
                className="mb-5"
                style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                }}
            >
                Quick Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full stagger-children">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-4 p-5 rounded-xl cursor-pointer"
                        style={{
                            background: link.gradient,
                            border: '1px solid var(--color-border-light)',
                            borderLeft: '4px solid var(--color-secondary)',
                            transition: 'all var(--transition-base)',
                            boxShadow: 'var(--shadow-sm)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.borderColor = 'var(--color-secondary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--color-border-light)';
                        }}
                    >
                        <div
                            className="flex items-center justify-center w-11 h-11 rounded-lg flex-shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                                boxShadow: 'var(--shadow-warm)',
                            }}
                        >
                            <link.icon size={20} style={{ color: '#F5EDE0' }} />
                        </div>
                        <div className="flex flex-col items-start">
                            <span
                                className="font-semibold"
                                style={{
                                    color: 'var(--color-text)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'var(--text-lg)',
                                }}
                            >
                                {link.title}
                            </span>
                            <span
                                className="text-sm"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                {link.desc}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
