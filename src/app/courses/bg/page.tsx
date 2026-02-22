'use client';

import Link from 'next/link';
import { BookOpen, PlayCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { ALL_CATALOG_ITEMS } from '@/data/catalog-data';
import { BG_CHAPTERS } from '@/data/bg-chapters';

export default function BGCoursesPage() {
    const bgCourses = ALL_CATALOG_ITEMS.filter(c => c.category === 'bg' && c.level === 'Bhakti Śāstrī');

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-warm)' }}>
            {/* Hero */}
            <section className="relative overflow-hidden py-14 md:py-20" style={{
                background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.95) 0%, rgba(107, 16, 16, 0.97) 100%)',
            }}>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(212, 168, 83, 0.3), transparent 50%)',
                }} />
                <div className="relative max-w-[1200px] mx-auto px-8">
                    <Link href="/courses" className="inline-flex items-center gap-1 text-sm mb-6 cursor-pointer" style={{ color: 'rgba(212, 168, 83, 0.7)' }}>
                        <ArrowLeft size={14} /> Back to All Courses
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl md:text-5xl">🕉️</span>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold" style={{
                                fontFamily: 'var(--font-heading)',
                                color: '#F5EDE0',
                            }}>
                                Bhagavad Gītā
                            </h1>
                            <p className="text-sm md:text-base" style={{ color: 'rgba(212, 168, 83, 0.7)' }}>
                                Bhakti Śāstrī Level • 18 Chapters • 3 Modules
                            </p>
                        </div>
                    </div>
                    <p className="text-base max-w-2xl" style={{
                        color: 'rgba(245, 237, 224, 0.7)',
                        lineHeight: 1.7,
                    }}>
                        The essence of Vedic wisdom spoken directly by Lord Śrī Kṛṣṇa to Arjuna on the
                        battlefield of Kurukṣetra. Study systematically through three comprehensive modules.
                    </p>
                </div>
            </section>

            {/* Course Modules */}
            <section className="max-w-[1200px] mx-auto px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {bgCourses.map((course, i) => {
                        const range = course.chapterRange?.split('–').map(Number) || [1, 6];
                        const chapters = BG_CHAPTERS.filter(ch => ch.number >= range[0] && ch.number <= range[1]);

                        return (
                            <div key={course.slug} className="card-elevated overflow-hidden" style={{
                                animation: `fadeInUp 0.5s ease-out ${i * 100}ms forwards`,
                                opacity: 0,
                            }}>
                                {/* Module header */}
                                <div className="p-5" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)' }}>
                                    <span className="text-2xl mb-2 inline-block">{course.icon}</span>
                                    <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: '#F5EDE0' }}>
                                        {course.title}
                                    </h2>
                                    <p className="text-sm" style={{ color: 'rgba(245, 237, 224, 0.7)' }}>
                                        {course.subtitle} • {course.videoCount} Videos
                                    </p>
                                </div>

                                {/* Chapter list */}
                                <div className="p-4">
                                    <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                                        Chapters Covered
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        {chapters.map((ch) => (
                                            <div key={ch.number} className="flex items-start gap-2 px-2 py-1.5 rounded-lg" style={{ background: 'var(--color-bg-warm)' }}>
                                                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{
                                                    background: 'rgba(139, 26, 26, 0.1)',
                                                    color: 'var(--color-primary)',
                                                }}>
                                                    {ch.number}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                                                        {ch.title}
                                                    </p>
                                                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                                        {ch.titleSanskrit} • {ch.verses} verses
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="p-4 pt-0">
                                    <Link
                                        href={`/courses/${course.slug}`}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm cursor-pointer"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                                            color: '#ffffff',
                                            transition: 'all var(--transition-base)',
                                            boxShadow: 'var(--shadow-warm)',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                    >
                                        <PlayCircle size={14} />
                                        Start Module
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Chapter Overview */}
                <div className="rounded-2xl p-8" style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid var(--color-border-light)',
                }}>
                    <h2 className="text-2xl font-bold section-heading mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                        All 18 Chapters at a Glance
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {BG_CHAPTERS.map((ch) => (
                            <div key={ch.number} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--color-bg-warm)' }}>
                                <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{
                                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                                    color: '#ffffff',
                                }}>
                                    {ch.number}
                                </span>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{ch.title}</p>
                                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{ch.titleSanskrit} • {ch.verses} verses</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
