'use client';

import { use } from 'react';
import Link from 'next/link';
import { PlayCircle, ExternalLink, BookOpen, ChevronRight, Share2, Check } from 'lucide-react';
import { getCourseBySlug, ALL_COURSES, INSTRUCTOR, type Course } from '@/data/courses-data';
import { useLearning } from '@/contexts/LearningContext';
import { notFound } from 'next/navigation';

function ProgressBar({ percent, height = 6 }: { percent: number; height?: number }) {
    return (
        <div className="w-full rounded-full overflow-hidden" style={{ background: 'rgba(139, 26, 26, 0.1)', height }}>
            <div className="h-full rounded-full transition-all duration-500" style={{
                width: `${percent}%`,
                background: percent === 100
                    ? 'linear-gradient(90deg, #5c7a1f, #7ca82f)'
                    : 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))',
            }} />
        </div>
    );
}

function RelatedCourseCard({ course }: { course: Course }) {
    return (
        <Link
            href={`/courses/${course.slug}`}
            className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer"
            style={{
                background: 'var(--color-bg-warm)',
                border: '1px solid var(--color-border-light)',
                transition: 'all var(--transition-base)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-secondary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-light)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <span className="text-xl flex-shrink-0">{course.icon}</span>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                    {course.title}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {course.videoCount} lessons
                </p>
            </div>
            <ChevronRight size={14} style={{ color: 'var(--color-text-muted)' }} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Link>
    );
}

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const course = getCourseBySlug(slug);
    const { isEnrolled, enrollInCourse, getProgressPercent, getCompletedCount, getProgress, markLessonComplete, markLessonIncomplete } = useLearning();

    if (!course) {
        notFound();
    }

    const enrolled = isEnrolled(course.slug);
    const percent = getProgressPercent(course.slug);
    const completed = getCompletedCount(course.slug);
    const progress = getProgress(course.slug);

    // Get related courses (same category, different slug)
    const related = ALL_COURSES
        .filter(c => c.category === course.category && c.slug !== course.slug)
        .slice(0, 4);

    const categoryLabel = course.category === 'bg' ? 'Bhagavad Gītā' : course.category === 'sb' ? 'Śrīmad Bhāgavatam' : 'Supplementary';
    const categoryHref = course.category === 'supplementary' ? '/courses#supplementary' : `/courses/${course.category}`;

    const levelColors: Record<string, { bg: string; text: string; border: string }> = {
        'Bhakti Śāstrī': { bg: 'rgba(139, 26, 26, 0.1)', text: 'var(--color-primary)', border: 'rgba(139, 26, 26, 0.2)' },
        'Bhakti Vaibhava': { bg: 'rgba(212, 168, 83, 0.15)', text: 'var(--color-secondary-dark)', border: 'rgba(212, 168, 83, 0.3)' },
        'Bhagavata Sevā': { bg: 'rgba(107, 66, 38, 0.1)', text: 'var(--color-accent)', border: 'rgba(107, 66, 38, 0.2)' },
        'General': { bg: 'rgba(107, 142, 35, 0.1)', text: '#5c7a1f', border: 'rgba(107, 142, 35, 0.2)' },
    };
    const lc = levelColors[course.level] || levelColors['General'];

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-warm)' }}>
            {/* Hero */}
            <section className="relative overflow-hidden py-12 md:py-16" style={{
                background: course.category === 'bg'
                    ? 'linear-gradient(135deg, rgba(139, 26, 26, 0.95) 0%, rgba(107, 16, 16, 0.97) 100%)'
                    : course.category === 'sb'
                        ? 'linear-gradient(135deg, rgba(184, 146, 46, 0.9) 0%, rgba(139, 26, 26, 0.95) 60%, rgba(107, 16, 16, 0.97) 100%)'
                        : 'linear-gradient(135deg, rgba(107, 66, 38, 0.95) 0%, rgba(75, 45, 25, 0.97) 100%)',
            }}>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(212, 168, 83, 0.3), transparent 50%)',
                }} />

                <div className="relative max-w-[1200px] mx-auto px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs mb-6 flex-wrap" style={{ color: 'rgba(245, 237, 224, 0.5)' }}>
                        <Link href="/courses" className="hover:text-white transition-colors cursor-pointer">Courses</Link>
                        <ChevronRight size={10} />
                        <Link href={categoryHref} className="hover:text-white transition-colors cursor-pointer">{categoryLabel}</Link>
                        <ChevronRight size={10} />
                        <span style={{ color: 'rgba(245, 237, 224, 0.8)' }}>{course.title}</span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                        <span className="text-4xl md:text-5xl flex-shrink-0">{course.icon}</span>
                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold mb-2" style={{
                                fontFamily: 'var(--font-heading)',
                                color: '#F5EDE0',
                                lineHeight: 1.2,
                            }}>
                                {course.title}
                            </h1>
                            <p className="text-sm mb-3" style={{
                                color: 'rgba(212, 168, 83, 0.8)',
                                fontFamily: 'var(--font-heading)',
                            }}>
                                {course.subtitle}
                            </p>
                        </div>
                    </div>

                    <p className="text-base max-w-3xl mb-6" style={{
                        color: 'rgba(245, 237, 224, 0.7)',
                        lineHeight: 1.7,
                    }}>
                        {course.description}
                    </p>

                    {/* Meta + Enroll */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{
                            background: lc.bg,
                            color: lc.text,
                            border: `1px solid ${lc.border}`,
                        }}>
                            {course.level}
                        </span>
                        <span className="flex items-center gap-1 text-sm" style={{ color: 'rgba(245, 237, 224, 0.6)' }}>
                            <PlayCircle size={14} /> {course.videoCount} Video Lessons
                        </span>
                        <span className="flex items-center gap-1 text-sm" style={{ color: 'rgba(245, 237, 224, 0.6)' }}>
                            <BookOpen size={14} /> by {course.instructor}
                        </span>

                        {enrolled ? (
                            <span className="ml-auto flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full" style={{
                                background: 'rgba(92, 122, 31, 0.2)',
                                color: '#a8d35f',
                            }}>
                                <Check size={14} /> Enrolled • {percent}% complete
                            </span>
                        ) : (
                            <button
                                onClick={() => enrollInCourse(course.slug, course.videoCount)}
                                className="ml-auto text-sm font-bold px-6 py-2.5 rounded-lg cursor-pointer"
                                style={{
                                    background: 'linear-gradient(135deg, #ffffff, #F5EDE0)',
                                    color: 'var(--color-primary)',
                                    border: 'none',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                                }}
                            >
                                Enroll Now — Free
                            </button>
                        )}
                    </div>

                    {enrolled && (
                        <div className="mt-4">
                            <ProgressBar percent={percent} height={4} />
                        </div>
                    )}
                </div>
            </section>

            {/* Content */}
            <div className="max-w-[1200px] mx-auto px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content — YouTube Embed */}
                    <div className="lg:col-span-2">
                        {/* YouTube Playlist Embed */}
                        <div className="card-elevated overflow-hidden mb-6">
                            <div className="aspect-video w-full">
                                <iframe
                                    src={`https://www.youtube.com/embed/videoseries?list=${course.youtubePlaylistId}`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    title={course.title}
                                    style={{ border: 'none' }}
                                />
                            </div>
                        </div>

                        {/* Lesson Tracker */}
                        {enrolled && (
                            <div className="card-warm p-5 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                                        Lesson Progress
                                    </h2>
                                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                                        {completed}/{course.videoCount} completed
                                    </span>
                                </div>
                                <div className="mb-4"><ProgressBar percent={percent} height={8} /></div>
                                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                                    {Array.from({ length: course.videoCount }, (_, i) => {
                                        const isCompleted = progress?.lessons[i]?.completed || false;
                                        return (
                                            <button key={i} onClick={() => isCompleted ? markLessonIncomplete(course.slug, i) : markLessonComplete(course.slug, i)}
                                                className="w-full aspect-square rounded-lg flex items-center justify-center cursor-pointer text-xs font-bold"
                                                title={`Lesson ${i + 1}`}
                                                style={{
                                                    background: isCompleted ? 'linear-gradient(135deg, #5c7a1f, #7ca82f)' : 'var(--color-bg)',
                                                    color: isCompleted ? 'white' : 'var(--color-text-muted)',
                                                    border: isCompleted ? 'none' : '1px solid var(--color-border)',
                                                    transition: 'all var(--transition-fast)',
                                                }}>
                                                {isCompleted ? <Check size={12} /> : i + 1}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-xs mt-3 text-center" style={{ color: 'var(--color-text-muted)' }}>
                                    Click a lesson number to mark complete/incomplete
                                </p>
                            </div>
                        )}

                        {/* Course Info Card */}
                        <div className="card-warm p-6 mb-6">
                            <h2 className="text-lg font-bold mb-4" style={{
                                fontFamily: 'var(--font-heading)',
                                color: 'var(--color-primary)',
                            }}>
                                About This Course
                            </h2>
                            <p className="text-sm mb-4" style={{
                                color: 'var(--color-text-secondary)',
                                lineHeight: 1.7,
                            }}>
                                {course.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {course.tags.map((tag) => (
                                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{
                                        background: 'var(--color-bg-deep)',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid var(--color-border)',
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-3 pt-4" style={{
                                borderTop: '1px solid var(--color-border-light)',
                            }}>
                                <a
                                    href={course.youtubePlaylistUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center gap-2 text-sm"
                                >
                                    <ExternalLink size={14} />
                                    Open in YouTube
                                </a>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(course.youtubePlaylistUrl);
                                    }}
                                    className="btn-golden inline-flex items-center gap-2 cursor-pointer text-sm"
                                >
                                    <Share2 size={14} />
                                    Share Playlist
                                </button>
                            </div>
                        </div>

                        {/* Instructor Card */}
                        <div className="card p-6">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                                    background: 'linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))',
                                }}>
                                    <span className="text-lg">🙏</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                                        {INSTRUCTOR.name}
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        {INSTRUCTOR.channel}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm" style={{
                                color: 'var(--color-text-secondary)',
                                lineHeight: 1.6,
                            }}>
                                {INSTRUCTOR.bio}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Quick Stats */}
                        <div className="card-elevated p-5 mb-6">
                            <h3 className="text-base font-bold mb-4" style={{
                                fontFamily: 'var(--font-heading)',
                                color: 'var(--color-primary)',
                            }}>Course Details</h3>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Total Lessons</span>
                                    <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{course.videoCount}</span>
                                </div>
                                <div className="h-px" style={{ background: 'var(--color-border-light)' }} />
                                <div className="flex items-center justify-between">
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Level</span>
                                    <span className="text-sm font-bold" style={{ color: lc.text }}>{course.level}</span>
                                </div>
                                <div className="h-px" style={{ background: 'var(--color-border-light)' }} />
                                <div className="flex items-center justify-between">
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Category</span>
                                    <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{categoryLabel}</span>
                                </div>
                                <div className="h-px" style={{ background: 'var(--color-border-light)' }} />
                                <div className="flex items-center justify-between">
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Price</span>
                                    <span className="text-sm font-bold" style={{ color: '#5c7a1f' }}>FREE</span>
                                </div>
                                {course.cantoNumber && (
                                    <>
                                        <div className="h-px" style={{ background: 'var(--color-border-light)' }} />
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Canto</span>
                                            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{course.cantoNumber}</span>
                                        </div>
                                    </>
                                )}
                                {course.chapterRange && (
                                    <>
                                        <div className="h-px" style={{ background: 'var(--color-border-light)' }} />
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Chapters</span>
                                            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{course.chapterRange}</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Enroll / Continue CTA */}
                            {enrolled ? (
                                <a href={course.youtubePlaylistUrl} target="_blank" rel="noopener noreferrer"
                                    className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-sm cursor-pointer"
                                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: '#fff', boxShadow: 'var(--shadow-warm)' }}>
                                    <PlayCircle size={16} /> Continue Watching
                                </a>
                            ) : (
                                <button onClick={() => enrollInCourse(course.slug, course.videoCount)}
                                    className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-sm cursor-pointer"
                                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: '#fff', border: 'none', boxShadow: 'var(--shadow-warm)' }}>
                                    <PlayCircle size={16} /> Enroll — Free
                                </button>
                            )}
                        </div>

                        {/* Related Courses */}
                        {related.length > 0 && (
                            <div className="card p-5">
                                <h3 className="text-base font-bold mb-4" style={{
                                    fontFamily: 'var(--font-heading)',
                                    color: 'var(--color-primary)',
                                }}>Related Courses</h3>
                                <div className="flex flex-col gap-2">
                                    {related.map((c) => (
                                        <RelatedCourseCard key={c.slug} course={c} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
