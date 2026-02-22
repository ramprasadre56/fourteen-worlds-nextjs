'use client';

import Link from 'next/link';
import {
    PlayCircle, ChevronRight, ArrowRight, ExternalLink, BookOpen,
    GraduationCap,
} from 'lucide-react';
import {
    MEDIA_GROUPS, ALL_MEDIA_PLAYLISTS, MEDIA_INSTRUCTOR,
    getMediaTotalVideoCount, type MediaPlaylist,
} from '@/data/media-data';

function PlaylistCard({ playlist, index }: { playlist: MediaPlaylist; index: number }) {
    const catColors: Record<string, { accent: string; accentBg: string }> = {
        bg: { accent: 'var(--color-primary)', accentBg: 'rgba(139, 26, 26, 0.08)' },
        sb: { accent: 'var(--color-secondary-dark)', accentBg: 'rgba(212, 168, 83, 0.12)' },
        'vedic-stories': { accent: 'var(--color-accent)', accentBg: 'rgba(107, 66, 38, 0.08)' },
        topical: { accent: '#5c7a1f', accentBg: 'rgba(107, 142, 35, 0.08)' },
    };
    const cc = catColors[playlist.category] || catColors.topical;

    return (
        <Link
            href={`/media/${playlist.slug}`}
            className="group card-elevated flex flex-col overflow-hidden cursor-pointer"
            style={{
                opacity: 0,
                animation: `fadeInUp 0.5s ease-out ${index * 60}ms forwards`,
            }}
        >
            {/* Accent bar */}
            <div className="h-1.5 w-full" style={{
                background: playlist.category === 'bg'
                    ? 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))'
                    : playlist.category === 'sb'
                        ? 'linear-gradient(90deg, var(--color-secondary-dark), var(--color-secondary))'
                        : playlist.category === 'vedic-stories'
                            ? 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))'
                            : 'linear-gradient(90deg, #5c7a1f, #7ca82f)',
            }} />

            <div className="flex flex-col flex-1 p-5">
                {/* Icon + Category */}
                <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{playlist.icon}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{
                        background: cc.accentBg,
                        color: cc.accent,
                        fontSize: '0.65rem',
                    }}>
                        {playlist.category === 'bg' ? 'Bhagavad Gītā' :
                         playlist.category === 'sb' ? 'Śrīmad Bhāgavatam' :
                         playlist.category === 'vedic-stories' ? 'Vedic Epic' : 'Topical'}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold mb-1 group-hover:text-[var(--color-primary)] transition-colors" style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-text)',
                    fontSize: '1.05rem',
                    lineHeight: 1.3,
                }}>
                    {playlist.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs mb-3" style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.75rem',
                }}>
                    {playlist.subtitle}
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
                    {playlist.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3" style={{
                    borderTop: '1px solid var(--color-border-light)',
                }}>
                    <div className="flex items-center gap-1.5">
                        <PlayCircle size={12} style={{ color: cc.accent }} />
                        <span className="text-xs font-semibold" style={{
                            color: 'var(--color-text)',
                            fontSize: '0.7rem',
                        }}>
                            {playlist.videoCount} Episodes
                        </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{
                        color: cc.accent,
                        fontSize: '0.7rem',
                    }}>
                        Watch <ChevronRight size={12} />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function MediaPage() {
    const totalVideos = getMediaTotalVideoCount();

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-warm)' }}>
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-24" style={{
                background: 'linear-gradient(135deg, rgba(107, 66, 38, 0.95) 0%, rgba(139, 26, 26, 0.95) 40%, rgba(75, 10, 10, 0.98) 100%)',
            }}>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212, 168, 83, 0.3), transparent 50%),
                                      radial-gradient(circle at 80% 20%, rgba(212, 168, 83, 0.2), transparent 40%)`,
                }} />

                <div className="relative max-w-[1200px] mx-auto px-8 text-center">
                    <p className="text-sm mb-3 tracking-[0.3em] uppercase" style={{
                        color: 'rgba(212, 168, 83, 0.7)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                    }}>
                        श्रवणं कीर्तनं विष्णोः • Hearing & Chanting about Viṣṇu
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{
                        fontFamily: 'var(--font-heading)',
                        color: '#F5EDE0',
                        lineHeight: 1.2,
                    }}>
                        Media — Video Library
                    </h1>

                    <p className="text-lg max-w-2xl mx-auto mb-6" style={{
                        color: 'rgba(245, 237, 224, 0.8)',
                        fontSize: '1rem',
                        lineHeight: 1.7,
                    }}>
                        Bhagavad-gītā, Śrīmad-Bhāgavatam, Vedic epics & topical series
                        by <strong style={{ color: 'var(--color-secondary)' }}>{MEDIA_INSTRUCTOR.name}</strong>
                    </p>

                    <div className="w-24 h-px mx-auto mb-8" style={{
                        background: 'linear-gradient(90deg, transparent, var(--color-secondary), transparent)',
                    }} />

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-heading)' }}>
                                {ALL_MEDIA_PLAYLISTS.length}
                            </p>
                            <p className="text-xs" style={{ color: 'rgba(245, 237, 224, 0.6)', fontSize: '0.7rem' }}>Series</p>
                        </div>
                        <div className="w-px h-8" style={{ background: 'rgba(212, 168, 83, 0.3)' }} />
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-heading)' }}>
                                {totalVideos}+
                            </p>
                            <p className="text-xs" style={{ color: 'rgba(245, 237, 224, 0.6)', fontSize: '0.7rem' }}>Episodes</p>
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

            {/* Category Nav Cards */}
            <section className="max-w-[1200px] mx-auto px-8 -mt-10 mb-16 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {MEDIA_GROUPS.map((group, i) => (
                        <a
                            key={group.id}
                            href={`#${group.id}`}
                            className="card-elevated p-5 text-center cursor-pointer group"
                            style={{
                                animation: `fadeInUp 0.5s ease-out ${i * 100}ms forwards`,
                                opacity: 0,
                            }}
                        >
                            <span className="text-2xl mb-2 inline-block group-hover:scale-110 transition-transform">{group.icon}</span>
                            <h2 className="text-sm font-bold mb-1" style={{
                                fontFamily: 'var(--font-heading)',
                                color: 'var(--color-primary)',
                                fontSize: '1rem',
                            }}>
                                {group.title}
                            </h2>
                            <p className="text-xs" style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '0.65rem',
                            }}>
                                {group.playlists.length} {group.playlists.length === 1 ? 'Series' : 'Series'} • {group.playlists.reduce((s, p) => s + p.videoCount, 0)} episodes
                            </p>
                        </a>
                    ))}
                </div>
            </section>

            {/* Each Category Section */}
            {MEDIA_GROUPS.map((group, gi) => (
                <section key={group.id} id={group.id} className="max-w-[1200px] mx-auto px-8 mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                            background: group.category === 'bg'
                                ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))'
                                : group.category === 'sb'
                                    ? 'linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))'
                                    : group.category === 'vedic-stories'
                                        ? 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))'
                                        : 'linear-gradient(135deg, #5c7a1f, #7ca82f)',
                        }}>
                            <span className="text-lg">{group.icon}</span>
                        </div>
                        <div>
                            <h2 className="section-heading" style={{ fontSize: '1.5rem' }}>{group.title}</h2>
                            <p className="text-xs" style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '0.7rem',
                            }}>
                                {group.titleSanskrit} — {group.description}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {group.playlists.map((playlist, i) => (
                            <PlaylistCard key={playlist.slug} playlist={playlist} index={i + gi * 4} />
                        ))}
                    </div>
                </section>
            ))}

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
                        Speaker
                    </p>
                    <h2 className="text-2xl font-bold mb-4" style={{
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-primary)',
                    }}>
                        {MEDIA_INSTRUCTOR.name}
                    </h2>
                    <p className="text-sm mb-6" style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.85rem',
                        lineHeight: 1.7,
                    }}>
                        {MEDIA_INSTRUCTOR.bio}
                    </p>
                    <a
                        href={MEDIA_INSTRUCTOR.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2"
                        style={{ fontSize: '0.8rem' }}
                    >
                        <ExternalLink size={14} />
                        Visit HKM Pune Channel
                    </a>
                </div>
            </section>
        </div>
    );
}
