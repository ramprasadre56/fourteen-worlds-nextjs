'use client';

import Link from 'next/link';
import Image from 'next/image';

const mainBooks = [
    {
        title: 'Bhagavad-gītā As It Is',
        href: '/library/bg',
        image: '/books/bg.jpg',
    },
    {
        title: 'Śrīmad-Bhāgavatam',
        href: '/library/sb',
        image: '/books/sb.jpg',
    },
    {
        title: 'Śrī Caitanya-caritāmṛta',
        href: '/library/cc',
        image: '/books/cc.jpg',
    },
    {
        title: 'Kṛṣṇa Book',
        href: '/library/kb',
        image: '/books/kb.jpg',
    },
    {
        title: 'The Nectar of Instruction',
        href: '/library/noi',
        image: '/books/noi.jpg',
    },
    {
        title: 'The Nectar of Devotion',
        href: '/library/nod',
        image: '/books/nod.jpg',
    },
];

const otherBooks = [
    { title: 'Sri Isopanisad', image: '/books/iso.jpg' },
    { title: 'Teachings of Lord Caitanya', image: '/books/tlc.jpg' },
    { title: 'Science of Self-Realization', image: '/books/ssr.jpg' },
    { title: 'Beyond Birth and Death', image: '/books/bbd.jpg' },
    { title: 'Perfect Questions, Perfect Answers', image: '/books/pqpa.jpg' },
    { title: 'Journey of Self Discovery', image: '/books/josd.jpg' },
];

export default function LibraryPage() {
    return (
        <div className="min-h-screen py-12" style={{ background: 'var(--color-bg-warm)' }}>
            <div className="w-full max-w-[1440px] mx-auto px-8">
                {/* Header */}
                <div className="text-center mb-14">
                    <h1
                        className="text-4xl font-bold mb-4"
                        style={{
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-primary)',
                        }}
                    >
                        Vedic Literature Library
                    </h1>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        Explore the timeless wisdom of the Vedic scriptures as presented by
                        His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda
                    </p>
                    {/* Golden divider */}
                    <div
                        className="w-20 h-px mx-auto mt-6"
                        style={{
                            background: 'linear-gradient(90deg, transparent, var(--color-secondary), transparent)',
                        }}
                    />
                </div>

                {/* Main Books */}
                <div className="flex flex-wrap justify-center gap-8 mb-16 stagger-children">
                    {mainBooks.map((book) => (
                        <Link
                            key={book.href}
                            href={book.href}
                            className="group relative flex-shrink-0 cursor-pointer"
                        >
                            <div
                                className="relative w-[160px] h-[240px] md:w-[180px] md:h-[270px] lg:w-[200px] lg:h-[300px] rounded-xl overflow-hidden"
                                style={{
                                    boxShadow: 'var(--shadow-lg)',
                                    transition: 'all var(--transition-slow)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                }}
                            >
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    quality={100}
                                    sizes="200px"
                                    priority
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <p
                                className="mt-3 text-center text-sm font-medium max-w-[200px]"
                                style={{
                                    color: 'var(--color-text)',
                                    fontFamily: 'var(--font-heading)',
                                }}
                            >
                                {book.title}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Other Books */}
                <div
                    className="rounded-2xl p-8"
                    style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid var(--color-border-light)',
                    }}
                >
                    <h2
                        className="text-2xl font-bold mb-8 text-center"
                        style={{
                            color: 'var(--color-primary)',
                            fontFamily: 'var(--font-heading)',
                        }}
                    >
                        Other Books by Śrīla Prabhupāda
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {otherBooks.map((book) => (
                            <div
                                key={book.title}
                                className="group flex-shrink-0 cursor-pointer"
                            >
                                <div
                                    className="relative w-[120px] h-[180px] md:w-[140px] md:h-[210px] rounded-xl overflow-hidden"
                                    style={{
                                        boxShadow: 'var(--shadow-md)',
                                        transition: 'all var(--transition-slow)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    }}
                                >
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        quality={100}
                                        sizes="140px"
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <p
                                    className="mt-2 text-center text-xs font-medium max-w-[140px]"
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        fontFamily: 'var(--font-heading)',
                                    }}
                                >
                                    {book.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
