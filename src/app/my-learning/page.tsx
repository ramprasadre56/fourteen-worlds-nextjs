'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlayCircle, BookOpen, GraduationCap, Check, BarChart3 } from 'lucide-react';
import { useLearning, type CourseProgress } from '@/contexts/LearningContext';
import { getCatalogItemBySlug, type CatalogItem } from '@/data/catalog-data';
import { useAuth } from '@/contexts/AuthContext';

/* ─── Progress Bar ──────────────────────────────────────── */
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

/* ─── Course Card ───────────────────────────────────────── */
function LearningCard({ progress: courseProgress }: { progress: CourseProgress }) {
    const { getProgressPercent, getCompletedCount } = useLearning();
    const percent = getProgressPercent(courseProgress.slug);
    const completed = getCompletedCount(courseProgress.slug);
    const isComplete = percent >= 100;

    const item = getCatalogItemBySlug(courseProgress.slug);

    if (!item) return null;

    const title = item.title;
    const icon = item.icon || '📖';
    const href = `/courses/${courseProgress.slug}`;
    const videoCount = item.videoCount || courseProgress.totalLessons;
    const isVedicOrTopical = item.category === 'vedic-stories' || item.category === 'topical';
    const type = isVedicOrTopical ? 'Media' : 'Course';
    const subtitle = item.subtitle || '';

    const enrolledDate = new Date(courseProgress.enrolledAt);
    const lastAccessed = new Date(courseProgress.lastAccessedAt);

    return (
        <div className="rounded-xl overflow-hidden flex flex-col sm:flex-row" style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-light)',
            transition: 'all var(--transition-base)',
        }}>
            {/* Thumbnail */}
            <Link href={href} className="block sm:w-[200px] flex-shrink-0 relative aspect-video sm:aspect-auto min-h-[120px]" style={{
                background: item.category === 'bg'
                    ? 'linear-gradient(135deg, #3a0f0f, #8b1a1a)'
                    : item.category === 'sb'
                        ? 'linear-gradient(135deg, #3a2a0f, #b89230)'
                        : item.category === 'vedic-stories'
                            ? 'linear-gradient(135deg, #2d1810, #8b5a2e)'
                            : 'linear-gradient(135deg, #1a2e0a, #5c7a1f)',
            }}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-50">{icon}</span>
                </div>
                {isComplete && (
                    <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#5c7a1f' }}>
                            <Check size={14} color="white" />
                        </div>
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0">
                    <ProgressBar percent={percent} height={4} />
                </div>
            </Link>

            {/* Info */}
            <div className="flex-1 p-4 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{
                                background: type === 'Media' ? 'rgba(139, 26, 26, 0.08)' : 'rgba(184, 146, 46, 0.12)',
                                color: type === 'Media' ? 'var(--color-primary)' : 'var(--color-secondary-dark)',
                            }}>
                                {type}
                            </span>
                            {isComplete && (
                                <span className="text-xs font-semibold" style={{ color: '#5c7a1f' }}>
                                    ✓ Completed
                                </span>
                            )}
                        </div>
                        <Link href={href}>
                            <h3 className="text-base font-bold hover:text-[var(--color-primary)] transition-colors cursor-pointer" style={{
                                fontFamily: 'var(--font-heading)', color: 'var(--color-text)', lineHeight: 1.3,
                            }}>
                                {title}
                            </h3>
                        </Link>
                        {subtitle && (
                            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <span className="text-xl font-bold flex-shrink-0" style={{
                        fontFamily: 'var(--font-heading)',
                        color: isComplete ? '#5c7a1f' : 'var(--color-primary)',
                    }}>
                        {percent}%
                    </span>
                </div>

                <div className="flex items-center gap-4 mt-auto pt-2">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {completed}/{videoCount} lessons
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Enrolled {enrolledDate.toLocaleDateString()}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Last accessed {lastAccessed.toLocaleDateString()}
                    </span>
                    <Link href={href} className="ml-auto text-sm font-bold px-4 py-1.5 rounded-lg cursor-pointer" style={{
                        background: isComplete
                            ? 'var(--color-bg)'
                            : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                        color: isComplete ? 'var(--color-text)' : 'white',
                        border: isComplete ? '1px solid var(--color-border)' : 'none',
                    }}>
                        {isComplete ? 'Review' : 'Continue'}
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function MyLearningPage() {
    const { user } = useAuth();
    const { getInProgressList, getCompletedList, getEnrolledList } = useLearning();
    const [tab, setTab] = useState<'in-progress' | 'completed'>('in-progress');

    const inProgress = getInProgressList();
    const completedList = getCompletedList();
    const allEnrolled = getEnrolledList();
    const activeList = tab === 'in-progress' ? inProgress : completedList;

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
            {/* Header */}
            <div className="py-8 px-8" style={{
                background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.95) 0%, rgba(75, 10, 10, 0.98) 100%)',
            }}>
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{
                        fontFamily: 'var(--font-heading)', color: '#F5EDE0',
                    }}>
                        My Learning
                    </h1>
                    <p className="text-base" style={{ color: 'rgba(245, 237, 224, 0.6)' }}>
                        Track your progress across courses and media series
                    </p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-8 py-8">
                {/* Stats */}
                {allEnrolled.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                            { label: 'Enrolled', value: allEnrolled.length, icon: <BookOpen size={18} />, color: 'var(--color-primary)' },
                            { label: 'In Progress', value: inProgress.length, icon: <BarChart3 size={18} />, color: 'var(--color-secondary-dark)' },
                            { label: 'Completed', value: completedList.length, icon: <Check size={18} />, color: '#5c7a1f' },
                        ].map((stat) => (
                            <div key={stat.label} className="card-elevated p-4 text-center">
                                <div className="flex items-center justify-center mb-2" style={{ color: stat.color }}>
                                    {stat.icon}
                                </div>
                                <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: stat.color }}>
                                    {stat.value}
                                </p>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex items-center gap-1 mb-6 p-1 rounded-lg w-fit" style={{
                    background: 'var(--color-bg-warm)',
                    border: '1px solid var(--color-border-light)',
                }}>
                    {(['in-progress', 'completed'] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className="px-5 py-2 rounded-md text-sm font-semibold cursor-pointer"
                            style={{
                                background: tab === t ? 'var(--color-surface)' : 'transparent',
                                color: tab === t ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
                                border: 'none',
                                transition: 'all var(--transition-fast)',
                            }}
                        >
                            {t === 'in-progress' ? `In Progress (${inProgress.length})` : `Completed (${completedList.length})`}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {allEnrolled.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="text-5xl mb-4 block">📚</span>
                        <h2 className="text-2xl font-bold mb-2" style={{
                            fontFamily: 'var(--font-heading)', color: 'var(--color-text)',
                        }}>
                            No courses enrolled yet
                        </h2>
                        <p className="text-base mb-6" style={{ color: 'var(--color-text-muted)' }}>
                            Explore our courses and media library to start your spiritual journey
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
                                <GraduationCap size={16} /> Explore Courses
                            </Link>
                        </div>
                    </div>
                ) : activeList.length === 0 ? (
                    <div className="text-center py-16">
                        <span className="text-4xl mb-3 block">{tab === 'completed' ? '🎯' : '📖'}</span>
                        <h3 className="text-xl font-bold mb-2" style={{
                            fontFamily: 'var(--font-heading)', color: 'var(--color-text)',
                        }}>
                            {tab === 'completed' ? 'No completed courses yet' : 'No courses in progress'}
                        </h3>
                        <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
                            {tab === 'completed' ? 'Keep going! Complete your first course to see it here.' : 'Start watching any enrolled course to track your progress.'}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {activeList.map((cp) => (
                            <LearningCard key={cp.slug} progress={cp} />
                        ))}
                    </div>
                )}

                {/* Guest notice */}
                {!user && allEnrolled.length > 0 && (
                    <div className="mt-8 p-4 rounded-xl text-center" style={{
                        background: 'rgba(212, 168, 83, 0.08)',
                        border: '1px solid rgba(212, 168, 83, 0.2)',
                    }}>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            💡 Your progress is saved locally in this browser. <Link href="/signin" className="font-bold" style={{ color: 'var(--color-primary)' }}>Sign in</Link> to keep it synced across devices.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
