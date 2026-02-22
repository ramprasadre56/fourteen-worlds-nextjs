'use client';

import Link from 'next/link';
import {
    BookOpen, PlayCircle, GraduationCap, ChevronRight, Sparkles, Users, Clock,
    ArrowRight, ExternalLink
} from 'lucide-react';
import {
    COURSE_GROUPS, BG_COURSES, SB_COURSES, SUPPLEMENTARY_COURSES,
    INSTRUCTOR, getTotalVideoCount, type Course
} from '@/data/courses-data';

function CourseCard({ course, index }: { course: Course; index: number }) {
    const levelColors: Record<string, { bg: string; text: string }> = {
        'Bhakti Śāstrī': { bg: 'rgba(139, 26, 26, 0.1)', text: 'var(--color-primary)' },
        'Bhakti Vaibhava': { bg: 'rgba(212, 168, 83, 0.15)', text: 'var(--color-secondary-dark)' },
        'Bhagavata Sevā': { bg: 'rgba(107, 66, 38, 0.1)', text: 'var(--color-accent)' },
        'General': { bg: 'rgba(107, 142, 35, 0.1)', text: '#5c7a1f' },
    };
    const lc = levelColors[course.level] || levelColors['General'];

    return (
        <Link
            href={`/courses/${course.slug}`}
            className="group card-elevated flex flex-col overflow-hidden cursor-pointer"
            style={{
                animationDelay: `${index * 60}ms`,
                opacity: 0,
                animation: `fadeInUp 0.5s ease-out ${index * 60}ms forwards`,
            }}
        >
            {/* Top Accent Bar */}
            <div className="h-1.5 w-full" style={{
                background: course.category === 'bg'
                    ? 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))'
                    : course.category === 'sb'
                        ? 'linear-gradient(90deg, var(--color-secondary-dark), var(--color-secondary))'
                        : 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))',
            }} />

            <div className="flex flex-col flex-1 p-5">
                {/* Icon + Level Badge */}
                <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{course.icon}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{
                        background: lc.bg,
                        color: lc.text,
                        fontSize: '0.65rem',
                    }}>
                        {course.level}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold mb-1 group-hover:text-[var(--color-primary)] transition-colors" style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-text)',
                    fontSize: '1.05rem',
                    lineHeight: 1.3,
                }}>
                    {course.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs mb-3" style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.75rem',
                }}>
                    {course.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs flex-1 mb-4" style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '0.7rem',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {course.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3" style={{
                    borderTop: '1px solid var(--color-border-light)',
                }}>
                    <div className="flex items-center gap-1.5">
                        <PlayCircle size={12} style={{ color: 'var(--color-primary)' }} />
                        <span className="text-xs font-semibold" style={{
                            color: 'var(--color-text)',
                            fontSize: '0.7rem',
                        }}>
                            {course.videoCount} Lessons
                        </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{
                        color: 'var(--color-primary)',
                        fontSize: '0.7rem',
                    }}>
                        Explore <ChevronRight size={12} />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function CoursesPage() {
    const totalVideos = getTotalVideoCount();

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-warm)' }}>
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-24" style={{
                background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.95) 0%, rgba(107, 16, 16, 0.97) 40%, rgba(75, 10, 10, 0.98) 100%)',
            }}>
                {/* Decorative overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212, 168, 83, 0.3), transparent 50%),
                                      radial-gradient(circle at 80% 20%, rgba(212, 168, 83, 0.2), transparent 40%)`,
                }} />

                <div className="relative max-w-[1200px] mx-auto px-8 text-center">
                    {/* Sanskrit ornament */}
                    <p className="text-sm mb-3 tracking-[0.3em] uppercase" style={{
                        color: 'rgba(212, 168, 83, 0.7)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                    }}>
                        विद्या ददाति विनयम् • Knowledge gives humility
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{
                        fontFamily: 'var(--font-heading)',
                        color: '#F5EDE0',
                        lineHeight: 1.2,
                    }}>
                        Systematic Study Courses
                    </h1>

                    <p className="text-lg max-w-2xl mx-auto mb-6" style={{
                        color: 'rgba(245, 237, 224, 0.8)',
                        fontSize: '1rem',
                        lineHeight: 1.7,
                    }}>
                        Dive deep into Bhagavad-gītā and Śrīmad-Bhāgavatam through structured,
                        canto-wise video courses by <strong style={{ color: 'var(--color-secondary)' }}>{INSTRUCTOR.name}</strong>
                    </p>

                    {/* Golden divider */}
                    <div className="w-24 h-px mx-auto mb-8" style={{
                        background: 'linear-gradient(90deg, transparent, var(--color-secondary), transparent)',
                    }} />

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-heading)' }}>
                                {BG_COURSES.length + SB_COURSES.length + SUPPLEMENTARY_COURSES.length}
                            </p>
                            <p className="text-xs" style={{ color: 'rgba(245, 237, 224, 0.6)', fontSize: '0.7rem' }}>Courses</p>
                        </div>
                        <div className="w-px h-8" style={{ background: 'rgba(212, 168, 83, 0.3)' }} />
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-heading)' }}>
                                {totalVideos}+
                            </p>
                            <p className="text-xs" style={{ color: 'rgba(245, 237, 224, 0.6)', fontSize: '0.7rem' }}>Video Lessons</p>
                        </div>
                        <div className="w-px h-8" style={{ background: 'rgba(212, 168, 83, 0.3)' }} />
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-heading)' }}>
                                Free
                            </p>
                            <p className="text-xs" style={{ color: 'rgba(245, 237, 224, 0.6)', fontSize: '0.7rem' }}>on YouTube</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Navigation Cards */}
            <section className="max-w-[1200px] mx-auto px-8 -mt-10 mb-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {COURSE_GROUPS.map((group, i) => (
                        <Link
                            key={group.id}
                            href={group.id === 'supplementary' ? '#supplementary' : `/courses/${group.id}`}
                            className="card-elevated p-6 text-center cursor-pointer group"
                            style={{
                                animation: `fadeInUp 0.5s ease-out ${i * 100}ms forwards`,
                                opacity: 0,
                            }}
                        >
                            <span className="text-3xl mb-3 inline-block group-hover:scale-110 transition-transform">{group.icon}</span>
                            <h2 className="text-lg font-bold mb-1" style={{
                                fontFamily: 'var(--font-heading)',
                                color: 'var(--color-primary)',
                                fontSize: '1.2rem',
                            }}>
                                {group.title}
                            </h2>
                            <p className="text-xs mb-2" style={{
                                color: 'var(--color-text-muted)',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '0.75rem',
                            }}>
                                {group.titleSanskrit}
                            </p>
                            <p className="text-xs" style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: '0.7rem',
                            }}>
                                {group.description}
                            </p>
                            <p className="text-xs font-semibold mt-3 flex items-center justify-center gap-1 group-hover:gap-2 transition-all" style={{
                                color: 'var(--color-primary)',
                                fontSize: '0.7rem',
                            }}>
                                {group.courses.length} Courses <ArrowRight size={12} />
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Bhagavad Gita Section */}
            <section className="max-w-[1200px] mx-auto px-8 mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                    }}>
                        <span className="text-lg">🕉️</span>
                    </div>
                    <div>
                        <h2 className="section-heading" style={{ fontSize: '1.6rem' }}>Bhagavad Gītā — Bhakti Śāstrī</h2>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                            18 chapters • 3 systematic modules
                        </p>
                    </div>
                    <Link href="/courses/bg" className="ml-auto hidden md:flex items-center gap-1 text-xs font-semibold cursor-pointer" style={{
                        color: 'var(--color-primary)',
                        fontSize: '0.75rem',
                    }}>
                        View All <ChevronRight size={14} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BG_COURSES.map((course, i) => (
                        <CourseCard key={course.slug} course={course} index={i} />
                    ))}
                </div>
            </section>

            {/* Srimad Bhagavatam Section */}
            <section className="max-w-[1200px] mx-auto px-8 mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))',
                    }}>
                        <span className="text-lg">📖</span>
                    </div>
                    <div>
                        <h2 className="section-heading" style={{ fontSize: '1.6rem' }}>Śrīmad Bhāgavatam — Canto-wise</h2>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                            12 cantos • Bhakti Vaibhava & Bhagavata Sevā level
                        </p>
                    </div>
                    <Link href="/courses/sb" className="ml-auto hidden md:flex items-center gap-1 text-xs font-semibold cursor-pointer" style={{
                        color: 'var(--color-secondary-dark)',
                        fontSize: '0.75rem',
                    }}>
                        View All <ChevronRight size={14} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {SB_COURSES.map((course, i) => (
                        <CourseCard key={course.slug} course={course} index={i} />
                    ))}
                </div>
            </section>

            {/* Supplementary Section */}
            <section id="supplementary" className="max-w-[1200px] mx-auto px-8 mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))',
                    }}>
                        <span className="text-lg">✨</span>
                    </div>
                    <div>
                        <h2 className="section-heading" style={{ fontSize: '1.6rem' }}>Supplementary Courses</h2>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                            Thematic studies, overviews, and special topics
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {SUPPLEMENTARY_COURSES.map((course, i) => (
                        <CourseCard key={course.slug} course={course} index={i} />
                    ))}
                </div>
            </section>

            {/* Instructor Section */}
            <section className="py-16" style={{
                background: 'linear-gradient(135deg, var(--color-bg-deep) 0%, var(--color-bg-warm) 100%)',
                borderTop: '1px solid var(--color-border)',
            }}>
                <div className="max-w-[800px] mx-auto px-8 text-center">
                    <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{
                        color: 'var(--color-secondary-dark)',
                        fontSize: '0.65rem',
                    }}>
                        Instructor
                    </p>
                    <h2 className="text-2xl font-bold mb-4" style={{
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-primary)',
                    }}>
                        {INSTRUCTOR.name}
                    </h2>
                    <p className="text-sm mb-6" style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.85rem',
                        lineHeight: 1.7,
                    }}>
                        {INSTRUCTOR.bio}
                    </p>
                    <a
                        href={INSTRUCTOR.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2"
                        style={{ fontSize: '0.8rem' }}
                    >
                        <ExternalLink size={14} />
                        Visit YouTube Channel
                    </a>
                </div>
            </section>
        </div>
    );
}
