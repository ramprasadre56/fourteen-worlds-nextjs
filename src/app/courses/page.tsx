'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlayCircle, ChevronRight, ExternalLink, Search, BookOpen, GraduationCap } from 'lucide-react';
import {
    CATALOG_GROUPS, ALL_CATALOG_ITEMS, getTotalVideoCount, type CatalogItem, type CatalogCategory
} from '@/data/catalog-data';
import { useLearning } from '@/contexts/LearningContext';

/* ─── Progress Bar ──────────────────────────────────────── */
function ProgressBar({ percent }: { percent: number }) {
    return (
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(139, 26, 26, 0.1)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{
                width: `${percent}%`,
                background: percent === 100
                    ? 'linear-gradient(90deg, #5c7a1f, #7ca82f)'
                    : 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))',
            }} />
        </div>
    );
}

/* ─── Featured Hero Card (DLAI-style) ───────────────────── */
function FeaturedCourseCard({ course }: { course: CatalogItem }) {
    const { isEnrolled, enrollInCourse, getProgressPercent, getCompletedCount } = useLearning();
    const enrolled = isEnrolled(course.slug);
    const percent = getProgressPercent(course.slug);
    const completed = getCompletedCount(course.slug);

    const levelColors: Record<string, { bg: string; text: string }> = {
        'Bhakti Śāstrī': { bg: 'rgba(139, 26, 26, 0.15)', text: 'var(--color-primary)' },
        'Bhakti Vaibhava': { bg: 'rgba(212, 168, 83, 0.25)', text: 'var(--color-secondary-dark)' },
        'Bhagavata Sevā': { bg: 'rgba(107, 66, 38, 0.15)', text: 'var(--color-accent)' },
        'General': { bg: 'rgba(107, 142, 35, 0.15)', text: '#5c7a1f' },
    };
    const lc = course.level ? levelColors[course.level] || levelColors['General'] : levelColors['General'];

    return (
        <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row" style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-light)',
            boxShadow: 'var(--shadow-md)',
        }}>
            {/* Thumbnail */}
            <Link href={`/courses/${course.slug}`} className="block md:w-[55%] relative aspect-video md:aspect-auto min-h-[200px]" style={{
                background: course.category === 'bg'
                    ? 'linear-gradient(135deg, #3a0f0f 0%, #6b1a1a 50%, #8b1a1a 100%)'
                    : course.category === 'sb'
                        ? 'linear-gradient(135deg, #3a2a0f 0%, #6b4a1a 50%, #b89230 100%)'
                        : 'linear-gradient(135deg, #2d1810 0%, #6b4226 50%, #8b5a2e 100%)',
            }}>
                <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full" style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                }}>
                    {course.category === 'bg' ? 'Bhagavad Gītā' : course.category === 'sb' ? 'Śrīmad Bhāgavatam' : 'Supplementary'}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl md:text-7xl opacity-40">{course.icon}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5" style={{
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                }}>
                    <h3 className="text-xl md:text-2xl font-bold" style={{
                        fontFamily: 'var(--font-heading)', color: 'white',
                    }}>
                        {course.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {course.subtitle}
                    </p>
                </div>
            </Link>

            {/* Info */}
            <div className="md:w-[45%] p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🙏</span>
                        <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                            {course.instructor}
                        </span>
                    </div>

                    <Link href={`/courses/${course.slug}`}>
                        <h3 className="text-lg font-bold mb-2 hover:text-[var(--color-primary)] transition-colors cursor-pointer" style={{
                            fontFamily: 'var(--font-heading)', color: 'var(--color-text)',
                        }}>
                            {course.title}
                        </h3>
                    </Link>

                    <p className="text-sm mb-4" style={{
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        {course.description}
                    </p>

                    {/* Level / Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {course.level && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: lc.bg, color: lc.text }}>
                                {course.level}
                            </span>
                        )}
                        {course.chapterRange && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{
                                border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)',
                            }}>
                                Ch {course.chapterRange}
                            </span>
                        )}
                        {course.cantoNumber && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{
                                border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)',
                            }}>
                                Canto {course.cantoNumber}
                            </span>
                        )}
                    </div>

                    {/* Progress (if enrolled) */}
                    {enrolled && (
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                                    {completed}/{course.videoCount} lessons • {percent}%
                                </span>
                            </div>
                            <ProgressBar percent={percent} />
                        </div>
                    )}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3">
                    <Link href={`/courses/${course.slug}`} className="text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer" style={{
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                        transition: 'all var(--transition-base)',
                    }}>
                        View Course
                    </Link>
                    {enrolled ? (
                        <Link href={`/courses/${course.slug}`} className="text-sm font-bold px-5 py-2.5 rounded-lg cursor-pointer" style={{
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                            color: 'white',
                            boxShadow: 'var(--shadow-warm)',
                            transition: 'all var(--transition-base)',
                        }}>
                            Continue
                        </Link>
                    ) : (
                        <button
                            onClick={() => enrollInCourse(course.slug, course.videoCount)}
                            className="text-sm font-bold px-5 py-2.5 rounded-lg cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                                color: 'white',
                                boxShadow: 'var(--shadow-warm)',
                                transition: 'all var(--transition-base)',
                                border: 'none',
                            }}
                        >
                            Enroll Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── Small Course Card (DLAI-style) ────────────────────── */
function SmallCourseCard({ course }: { course: CatalogItem }) {
    const { isEnrolled, getProgressPercent, getCompletedCount } = useLearning();
    const enrolled = isEnrolled(course.slug);
    const percent = getProgressPercent(course.slug);
    const completed = getCompletedCount(course.slug);

    const levelColors: Record<string, { bg: string; text: string }> = {
        'Bhakti Śāstrī': { bg: 'rgba(139, 26, 26, 0.1)', text: 'var(--color-primary)' },
        'Bhakti Vaibhava': { bg: 'rgba(212, 168, 83, 0.15)', text: 'var(--color-secondary-dark)' },
        'Bhagavata Sevā': { bg: 'rgba(107, 66, 38, 0.1)', text: 'var(--color-accent)' },
        'General': { bg: 'rgba(107, 142, 35, 0.1)', text: '#5c7a1f' },
    };
    const lc = course.level ? levelColors[course.level] || levelColors['General'] : levelColors['General'];

    return (
        <Link
            href={`/courses/${course.slug}`}
            className="group rounded-xl overflow-hidden flex flex-col cursor-pointer"
            style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border-light)',
                transition: 'all var(--transition-base)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video" style={{
                background: course.category === 'bg'
                    ? 'linear-gradient(135deg, #3a0f0f, #8b1a1a)'
                    : course.category === 'sb'
                        ? 'linear-gradient(135deg, #3a2a0f, #b89230)'
                        : 'linear-gradient(135deg, #2d1810, #8b5a2e)',
            }}>
                <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full" style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                }}>
                    {course.videoCount} lessons
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-50">{course.icon}</span>
                </div>
                {enrolled && (
                    <div className="absolute bottom-0 left-0 right-0">
                        <ProgressBar percent={percent} />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-1.5 mb-2">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {course.instructor}
                    </span>
                    {course.level && (
                        <span className="text-[10px] font-semibold px-1.5 py-[2px] rounded-full" style={{ background: lc.bg, color: lc.text }}>
                            {course.level}
                        </span>
                    )}
                </div>
                <h4 className="text-sm font-bold mb-1 group-hover:text-[var(--color-primary)] transition-colors" style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-text)',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {course.title}
                </h4>
                <p className="text-xs flex-1 mb-2" style={{
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {course.subtitle}
                </p>
                {enrolled && (
                    <div className="flex items-center gap-2 mt-auto">
                        <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                            {percent}% complete
                        </span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            ({completed}/{course.videoCount})
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}

/* ─── Sidebar ───────────────────────────────────────────── */
const CATEGORY_FILTERS: { id: CatalogCategory | 'all'; label: string; icon: string; count: number }[] = [
    { id: 'all', label: 'All Content', icon: '📚', count: ALL_CATALOG_ITEMS.length },
    { id: 'bg', label: 'Bhagavad Gītā', icon: '🕉️', count: ALL_CATALOG_ITEMS.filter(p => p.category === 'bg').length },
    { id: 'sb', label: 'Śrīmad Bhāgavatam', icon: '📖', count: ALL_CATALOG_ITEMS.filter(p => p.category === 'sb').length },
    { id: 'vedic-stories', label: 'Vedic Stories', icon: '🏹', count: ALL_CATALOG_ITEMS.filter(p => p.category === 'vedic-stories').length },
    { id: 'topical', label: 'Topical Series', icon: '✨', count: ALL_CATALOG_ITEMS.filter(p => p.category === 'topical').length },
    { id: 'supplementary', label: 'Supplementary', icon: '🔍', count: ALL_CATALOG_ITEMS.filter(p => p.category === 'supplementary').length },
];

/* ─── Main Page ─────────────────────────────────────────── */
export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<CatalogCategory | 'all'>('all');
    const totalVideos = getTotalVideoCount();

    // Map `CatalogCategory` closely to group ID
    const filteredGroups = CATALOG_GROUPS.filter(g =>
        activeCategory === 'all' || g.id === activeCategory
    );

    const searchFiltered = searchQuery.trim()
        ? ALL_CATALOG_ITEMS.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : null;

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
            {/* Compact Header */}
            <div className="py-8 px-8" style={{
                background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.95) 0%, rgba(75, 10, 10, 0.98) 100%)',
            }}>
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{
                        fontFamily: 'var(--font-heading)',
                        color: '#F5EDE0',
                    }}>
                        Explore Courses
                    </h1>
                    <p className="text-base" style={{ color: 'rgba(245, 237, 224, 0.6)' }}>
                        {ALL_CATALOG_ITEMS.length} items • {totalVideos}+ lessons by Senior Devotees
                    </p>
                </div>
            </div>

            {/* Main Layout: Sidebar + Content */}
            <div className="max-w-[1400px] mx-auto px-8 py-8">
                <div className="flex gap-8">
                    {/* Left Sidebar */}
                    <aside className="hidden lg:block w-[260px] flex-shrink-0">
                        <div className="sticky top-24">
                            {/* Search */}
                            <div className="relative mb-6">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
                                    style={{
                                        background: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)',
                                        color: 'var(--color-text)',
                                        outline: 'none',
                                    }}
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold mb-3 uppercase tracking-wider" style={{
                                    color: 'var(--color-text)',
                                }}>
                                    Category
                                </h3>
                                <div className="flex flex-col gap-1">
                                    {CATEGORY_FILTERS.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                                            className="flex items-center justify-between px-3 py-2 rounded-lg text-left cursor-pointer text-sm"
                                            style={{
                                                background: activeCategory === cat.id ? 'rgba(139, 26, 26, 0.08)' : 'transparent',
                                                color: activeCategory === cat.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                                fontWeight: activeCategory === cat.id ? 600 : 400,
                                                transition: 'all var(--transition-fast)',
                                                border: 'none',
                                            }}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span>{cat.icon}</span>
                                                {cat.label}
                                            </span>
                                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                                {cat.count}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Instructors Info */}
                            <div className="rounded-xl p-4" style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border-light)',
                            }}>
                                <h3 className="text-xs font-bold mb-3 uppercase tracking-wider" style={{
                                    color: 'var(--color-text)',
                                }}>
                                    Instructors
                                </h3>
                                
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{
                                                background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))',
                                            }}>
                                                <span>🙏</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                                                    HG Pavaneswar Das
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{
                                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                                            }}>
                                                <span>📝</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                                                    HG Sampati Dasa
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Content */}
                    <main className="flex-1 min-w-0">
                        {/* Mobile Search + Filter */}
                        <div className="lg:hidden mb-6">
                            <div className="relative mb-3">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
                                    style={{
                                        background: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)',
                                        color: 'var(--color-text)',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                {CATEGORY_FILTERS.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                                        className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap"
                                        style={{
                                            background: activeCategory === cat.id ? 'var(--color-primary)' : 'var(--color-surface)',
                                            color: activeCategory === cat.id ? 'white' : 'var(--color-text-secondary)',
                                            border: activeCategory === cat.id ? 'none' : '1px solid var(--color-border)',
                                        }}
                                    >
                                        {cat.icon} {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search Results */}
                        {searchFiltered ? (
                            <div>
                                <h2 className="text-xl font-bold mb-4" style={{
                                    fontFamily: 'var(--font-heading)',
                                    color: 'var(--color-text)',
                                }}>
                                    Results for &ldquo;{searchQuery}&rdquo;
                                </h2>
                                {searchFiltered.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                        {searchFiltered.map((c) => (
                                            <SmallCourseCard key={c.slug} course={c} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-base py-12 text-center" style={{ color: 'var(--color-text-muted)' }}>
                                        No courses found matching your search.
                                    </p>
                                )}
                            </div>
                        ) : (
                            filteredGroups.map((group) => (
                                <section key={group.id} className="mb-12">
                                    <div className="flex items-center justify-between mb-5">
                                        <div>
                                            <h2 className="text-xl font-bold flex items-center gap-2" style={{
                                                fontFamily: 'var(--font-heading)',
                                                color: 'var(--color-text)',
                                            }}>
                                                <span>{group.icon}</span> {group.title}
                                            </h2>
                                            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                                                {group.titleSanskrit} • {group.description}
                                            </p>
                                        </div>
                                    </div>

                                    {group.items.length > 0 && (
                                        <div className="mb-6">
                                            <FeaturedCourseCard course={group.items[0]} />
                                        </div>
                                    )}

                                    {group.items.length > 1 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                            {group.items.slice(1).map((c) => (
                                                <SmallCourseCard key={c.slug} course={c} />
                                            ))}
                                        </div>
                                    )}
                                </section>
                            ))
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
