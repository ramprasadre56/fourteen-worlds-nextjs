'use client';

import Link from 'next/link';
import { PlayCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { SB_COURSES, getSBCoursesByCanto } from '@/data/courses-data';
import { SB_CANTOS } from '@/data/sb-cantos';

export default function SBCoursesPage() {
    // Group cantos that have courses
    const cantosWithCourses = SB_CANTOS.filter(canto =>
        SB_COURSES.some(c => c.cantoNumber === canto.number)
    );

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-warm)' }}>
            {/* Hero */}
            <section className="relative overflow-hidden py-14 md:py-20" style={{
                background: 'linear-gradient(135deg, rgba(184, 146, 46, 0.9) 0%, rgba(139, 26, 26, 0.95) 60%, rgba(107, 16, 16, 0.97) 100%)',
            }}>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(212, 168, 83, 0.3), transparent 50%)',
                }} />
                <div className="relative max-w-[1200px] mx-auto px-8">
                    <Link href="/courses" className="inline-flex items-center gap-1 text-xs mb-6 cursor-pointer" style={{
                        color: 'rgba(245, 237, 224, 0.6)',
                        fontSize: '0.75rem',
                    }}>
                        <ArrowLeft size={14} /> Back to All Courses
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">📖</span>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold" style={{
                                fontFamily: 'var(--font-heading)',
                                color: '#F5EDE0',
                            }}>
                                Śrīmad Bhāgavatam
                            </h1>
                            <p className="text-sm" style={{ color: 'rgba(245, 237, 224, 0.6)', fontSize: '0.8rem' }}>
                                Bhakti Vaibhava & Bhagavata Sevā Level • 12 Cantos • Canto-wise Study
                            </p>
                        </div>
                    </div>
                    <p className="text-sm max-w-2xl" style={{
                        color: 'rgba(245, 237, 224, 0.7)',
                        fontSize: '0.85rem',
                        lineHeight: 1.7,
                    }}>
                        The ripened fruit of the Vedic tree of knowledge — Śrīmad-Bhāgavatam, the spotless Purāṇa.
                        Study systematically through each canto with detailed verse-by-verse analysis.
                    </p>
                </div>
            </section>

            {/* Canto-wise Courses */}
            <section className="max-w-[1200px] mx-auto px-8 py-12">
                <div className="flex flex-col gap-10">
                    {cantosWithCourses.map((canto, i) => {
                        const courses = getSBCoursesByCanto(canto.number);
                        return (
                            <div key={canto.number} className="card-elevated overflow-hidden" style={{
                                animation: `fadeInUp 0.5s ease-out ${i * 80}ms forwards`,
                                opacity: 0,
                            }}>
                                {/* Canto Header */}
                                <div className="flex flex-col md:flex-row gap-6 p-6" style={{
                                    background: `linear-gradient(135deg, rgba(212, 168, 83, ${0.05 + i * 0.01}), rgba(255,255,255,0.5))`,
                                    borderBottom: '1px solid var(--color-border-light)',
                                }}>
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                                            background: 'linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))',
                                        }}>
                                            <span className="text-xl font-bold" style={{
                                                color: '#ffffff',
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: '1.1rem',
                                            }}>
                                                {canto.number}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-lg font-bold mb-1" style={{
                                                fontFamily: 'var(--font-heading)',
                                                color: 'var(--color-primary)',
                                                fontSize: '1.2rem',
                                            }}>
                                                Canto {canto.number}: {canto.title}
                                            </h2>
                                            <p className="text-xs mb-2" style={{
                                                color: 'var(--color-secondary-dark)',
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: '0.75rem',
                                            }}>
                                                {canto.titleSanskrit} • {canto.chapters} chapters
                                            </p>
                                            <p className="text-xs" style={{
                                                color: 'var(--color-text-muted)',
                                                fontSize: '0.7rem',
                                                lineHeight: 1.6,
                                            }}>
                                                {canto.summary}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Cards for this Canto */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {courses.map((course) => (
                                            <Link
                                                key={course.slug}
                                                href={`/courses/${course.slug}`}
                                                className="group flex flex-col p-4 rounded-xl cursor-pointer"
                                                style={{
                                                    background: 'var(--color-bg-warm)',
                                                    border: '1px solid var(--color-border-light)',
                                                    transition: 'all var(--transition-base)',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.borderColor = 'var(--color-secondary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.boxShadow = 'none';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.borderColor = 'var(--color-border-light)';
                                                }}
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-lg">{course.icon}</span>
                                                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{
                                                        background: 'rgba(212, 168, 83, 0.15)',
                                                        color: 'var(--color-secondary-dark)',
                                                        fontSize: '0.6rem',
                                                    }}>
                                                        {course.level}
                                                    </span>
                                                </div>
                                                <h3 className="text-sm font-bold mb-1" style={{
                                                    fontFamily: 'var(--font-heading)',
                                                    color: 'var(--color-text)',
                                                    fontSize: '0.9rem',
                                                }}>
                                                    {course.title}
                                                </h3>
                                                <p className="text-xs mb-3 flex-1" style={{
                                                    color: 'var(--color-text-muted)',
                                                    fontSize: '0.65rem',
                                                }}>
                                                    {course.subtitle}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        <PlayCircle size={12} style={{ color: 'var(--color-primary)' }} />
                                                        <span className="text-xs font-semibold" style={{
                                                            color: 'var(--color-text)',
                                                            fontSize: '0.7rem',
                                                        }}>
                                                            {course.videoCount} Lessons
                                                        </span>
                                                    </div>
                                                    <ChevronRight size={14} style={{ color: 'var(--color-primary)' }} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Full Canto List */}
                <div className="mt-16 rounded-2xl p-8" style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid var(--color-border-light)',
                }}>
                    <h2 className="section-heading mb-6" style={{ fontSize: '1.4rem' }}>
                        All 12 Cantos of Śrīmad Bhāgavatam
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SB_CANTOS.map((canto) => {
                            const hasCourse = SB_COURSES.some(c => c.cantoNumber === canto.number);
                            return (
                                <div key={canto.number} className="flex items-start gap-3 p-3 rounded-lg" style={{
                                    background: hasCourse ? 'rgba(212, 168, 83, 0.08)' : 'var(--color-bg-warm)',
                                    border: hasCourse ? '1px solid rgba(212, 168, 83, 0.2)' : '1px solid transparent',
                                }}>
                                    <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{
                                        background: hasCourse
                                            ? 'linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))'
                                            : 'rgba(138, 121, 104, 0.15)',
                                        color: hasCourse ? '#ffffff' : 'var(--color-text-muted)',
                                        fontSize: '0.7rem',
                                    }}>
                                        {canto.number}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold" style={{
                                            color: hasCourse ? 'var(--color-text)' : 'var(--color-text-muted)',
                                            fontSize: '0.75rem',
                                        }}>
                                            {canto.title}
                                        </p>
                                        <p className="text-xs" style={{
                                            color: 'var(--color-text-muted)',
                                            fontSize: '0.6rem',
                                        }}>
                                            {canto.titleSanskrit} • {canto.chapters} chapters
                                            {hasCourse && <span style={{ color: 'var(--color-secondary-dark)', fontWeight: 600 }}> • Course Available</span>}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
