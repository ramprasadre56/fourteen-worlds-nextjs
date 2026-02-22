'use client';

import { use } from 'react';
import Link from 'next/link';
import { PlayCircle, ArrowLeft, ExternalLink, BookOpen, ChevronRight, Share2 } from 'lucide-react';
import { getMediaPlaylistBySlug, ALL_MEDIA_PLAYLISTS, MEDIA_INSTRUCTOR, type MediaPlaylist } from '@/data/media-data';
import { notFound } from 'next/navigation';

function RelatedCard({ playlist }: { playlist: MediaPlaylist }) {
    return (
        <Link
            href={`/media/${playlist.slug}`}
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
            <span className="text-xl flex-shrink-0">{playlist.icon}</span>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{
                    color: 'var(--color-text)',
                    fontSize: '0.75rem',
                }}>{playlist.title}</p>
                <p className="text-xs" style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '0.6rem',
                }}>{playlist.videoCount} episodes</p>
            </div>
            <ChevronRight size={14} style={{ color: 'var(--color-text-muted)' }} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Link>
    );
}

export default function MediaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const playlist = getMediaPlaylistBySlug(slug);

    if (!playlist) {
        notFound();
    }

    const related = ALL_MEDIA_PLAYLISTS
        .filter(p => p.category === playlist.category && p.slug !== playlist.slug)
        .slice(0, 4);

    // If no same-category matches, show other categories
    const relatedFinal = related.length > 0
        ? related
        : ALL_MEDIA_PLAYLISTS.filter(p => p.slug !== playlist.slug).slice(0, 4);

    const categoryLabel = playlist.category === 'bg' ? 'Bhagavad Gītā'
        : playlist.category === 'sb' ? 'Śrīmad Bhāgavatam'
        : playlist.category === 'vedic-stories' ? 'Vedic Epics'
        : 'Topical Series';

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-warm)' }}>
            {/* Hero */}
            <section className="relative overflow-hidden py-12 md:py-16" style={{
                background: playlist.category === 'bg'
                    ? 'linear-gradient(135deg, rgba(139, 26, 26, 0.95) 0%, rgba(107, 16, 16, 0.97) 100%)'
                    : playlist.category === 'sb'
                        ? 'linear-gradient(135deg, rgba(184, 146, 46, 0.9) 0%, rgba(139, 26, 26, 0.95) 60%, rgba(107, 16, 16, 0.97) 100%)'
                        : playlist.category === 'vedic-stories'
                            ? 'linear-gradient(135deg, rgba(107, 66, 38, 0.95) 0%, rgba(75, 45, 25, 0.97) 100%)'
                            : 'linear-gradient(135deg, rgba(92, 122, 31, 0.9) 0%, rgba(75, 45, 25, 0.95) 100%)',
            }}>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(212, 168, 83, 0.3), transparent 50%)',
                }} />

                <div className="relative max-w-[1200px] mx-auto px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs mb-6 flex-wrap" style={{
                        color: 'rgba(245, 237, 224, 0.5)',
                        fontSize: '0.7rem',
                    }}>
                        <Link href="/media" className="hover:text-white transition-colors cursor-pointer">Media</Link>
                        <ChevronRight size={10} />
                        <span style={{ color: 'rgba(245, 237, 224, 0.8)' }}>{categoryLabel}</span>
                        <ChevronRight size={10} />
                        <span style={{ color: 'rgba(245, 237, 224, 0.8)' }}>{playlist.title}</span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                        <span className="text-4xl md:text-5xl flex-shrink-0">{playlist.icon}</span>
                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold mb-2" style={{
                                fontFamily: 'var(--font-heading)',
                                color: '#F5EDE0',
                                lineHeight: 1.2,
                            }}>
                                {playlist.title}
                            </h1>
                            <p className="text-sm mb-3" style={{
                                color: 'rgba(212, 168, 83, 0.8)',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '0.9rem',
                            }}>
                                {playlist.subtitle}
                            </p>
                        </div>
                    </div>

                    <p className="text-sm max-w-3xl mb-6" style={{
                        color: 'rgba(245, 237, 224, 0.7)',
                        fontSize: '0.85rem',
                        lineHeight: 1.7,
                    }}>
                        {playlist.description}
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1 text-xs" style={{
                            color: 'rgba(245, 237, 224, 0.6)',
                            fontSize: '0.75rem',
                        }}>
                            <PlayCircle size={14} /> {playlist.videoCount} Episodes
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{
                            color: 'rgba(245, 237, 224, 0.6)',
                            fontSize: '0.75rem',
                        }}>
                            <BookOpen size={14} /> by {playlist.instructor}
                        </span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-[1200px] mx-auto px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* YouTube Embed */}
                    <div className="lg:col-span-2">
                        <div className="card-elevated overflow-hidden mb-6">
                            <div className="aspect-video w-full">
                                <iframe
                                    src={`https://www.youtube.com/embed/videoseries?list=${playlist.youtubePlaylistId}`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    title={playlist.title}
                                    style={{ border: 'none' }}
                                />
                            </div>
                        </div>

                        {/* About */}
                        <div className="card-warm p-6 mb-6">
                            <h2 className="text-lg font-bold mb-4" style={{
                                fontFamily: 'var(--font-heading)',
                                color: 'var(--color-primary)',
                                fontSize: '1.2rem',
                            }}>
                                About This Series
                            </h2>
                            <p className="text-sm mb-4" style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: '0.85rem',
                                lineHeight: 1.7,
                            }}>
                                {playlist.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {playlist.tags.map((tag) => (
                                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{
                                        background: 'var(--color-bg-deep)',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid var(--color-border)',
                                        fontSize: '0.65rem',
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3 pt-4" style={{
                                borderTop: '1px solid var(--color-border-light)',
                            }}>
                                <a
                                    href={playlist.youtubePlaylistUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center gap-2"
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    <ExternalLink size={14} />
                                    Open in YouTube
                                </a>
                                <button
                                    onClick={() => navigator.clipboard.writeText(playlist.youtubePlaylistUrl)}
                                    className="btn-golden inline-flex items-center gap-2 cursor-pointer"
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    <Share2 size={14} />
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Speaker card */}
                        <div className="card p-6">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))',
                                }}>
                                    <span className="text-lg">🙏</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold" style={{ color: 'var(--color-text)', fontSize: '0.85rem' }}>
                                        {MEDIA_INSTRUCTOR.name}
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                                        {MEDIA_INSTRUCTOR.channel}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs" style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: '0.75rem',
                                lineHeight: 1.6,
                            }}>
                                {MEDIA_INSTRUCTOR.bio}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card-elevated p-5 mb-6">
                            <h3 className="text-sm font-bold mb-4" style={{
                                fontFamily: 'var(--font-heading)',
                                color: 'var(--color-primary)',
                                fontSize: '1rem',
                            }}>Series Details</h3>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>Episodes</span>
                                    <span className="text-xs font-bold" style={{ color: 'var(--color-text)', fontSize: '0.75rem' }}>{playlist.videoCount}</span>
                                </div>
                                <div className="h-px" style={{ background: 'var(--color-border-light)' }} />
                                <div className="flex items-center justify-between">
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>Category</span>
                                    <span className="text-xs font-bold" style={{ color: 'var(--color-text)', fontSize: '0.75rem' }}>{categoryLabel}</span>
                                </div>
                                <div className="h-px" style={{ background: 'var(--color-border-light)' }} />
                                <div className="flex items-center justify-between">
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>Speaker</span>
                                    <span className="text-xs font-bold" style={{ color: 'var(--color-text)', fontSize: '0.75rem' }}>{playlist.instructor}</span>
                                </div>
                                <div className="h-px" style={{ background: 'var(--color-border-light)' }} />
                                <div className="flex items-center justify-between">
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>Price</span>
                                    <span className="text-xs font-bold" style={{ color: '#5c7a1f', fontSize: '0.75rem' }}>FREE</span>
                                </div>
                            </div>

                            <a
                                href={playlist.youtubePlaylistUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-sm cursor-pointer"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                                    color: '#ffffff',
                                    fontSize: '0.85rem',
                                    transition: 'all var(--transition-base)',
                                    boxShadow: 'var(--shadow-warm)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 26, 26, 0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-warm)';
                                }}
                            >
                                <PlayCircle size={16} />
                                Start Watching
                            </a>
                        </div>

                        {/* Related */}
                        {relatedFinal.length > 0 && (
                            <div className="card p-5">
                                <h3 className="text-sm font-bold mb-4" style={{
                                    fontFamily: 'var(--font-heading)',
                                    color: 'var(--color-primary)',
                                    fontSize: '1rem',
                                }}>More Series</h3>
                                <div className="flex flex-col gap-2">
                                    {relatedFinal.map((p) => (
                                        <RelatedCard key={p.slug} playlist={p} />
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
