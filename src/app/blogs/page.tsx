'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RefreshCw, Wifi, Database, BookOpen } from 'lucide-react';

interface Blog {
    title: string;
    author: string;
    date: string;
    thumbnail: string;
    url: string;
}

interface BlogsResponse {
    success: boolean;
    source: 'live' | 'cache' | 'static-fallback';
    count: number;
    blogs: Blog[];
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [dataSource, setDataSource] = useState<string>('');

    async function fetchBlogs(forceRefresh: boolean = false) {
        if (forceRefresh) {
            setIsRefreshing(true);
        } else {
            setIsLoading(true);
        }

        try {
            const refreshParam = forceRefresh ? '&refresh=true' : '';
            const res = await fetch(`/api/blogs?max=20${refreshParam}`);
            const data: BlogsResponse = await res.json();

            if (data.success) {
                setBlogs(data.blogs);
                setDataSource(data.source);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    const getSourceLabel = () => {
        switch (dataSource) {
            case 'live':
                return { icon: Wifi, text: 'Live', bgColor: 'rgba(212, 168, 83, 0.1)', borderColor: 'rgba(212, 168, 83, 0.3)', textColor: 'var(--color-secondary-dark)' };
            case 'cache':
                return { icon: Database, text: 'Cached', bgColor: 'rgba(107, 66, 38, 0.08)', borderColor: 'rgba(107, 66, 38, 0.2)', textColor: 'var(--color-accent)' };
            case 'static-fallback':
                return { icon: Database, text: 'Cached', bgColor: 'rgba(0,0,0,0.04)', borderColor: 'var(--color-border)', textColor: 'var(--color-text-muted)' };
            default:
                return null;
        }
    };

    const sourceInfo = getSourceLabel();

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
            {/* Sticky Header */}
            <div
                className="sticky top-0 z-10 py-5 px-8"
                style={{
                    background: 'rgba(253, 248, 240, 0.92)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid var(--color-border-light)',
                }}
            >
                <div className="flex items-center justify-between max-w-[1440px] mx-auto">
                    <div>
                        <h1
                            className="text-2xl font-bold"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                        >
                            ISKCON Blogs
                        </h1>
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            Latest spiritual insights from ISKCON Desire Tree
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {sourceInfo && (
                            <span
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                                style={{
                                    background: sourceInfo.bgColor,
                                    border: `1px solid ${sourceInfo.borderColor}`,
                                    color: sourceInfo.textColor,
                                }}
                            >
                                <sourceInfo.icon size={14} />
                                {sourceInfo.text}
                            </span>
                        )}
                        <button
                            onClick={() => fetchBlogs(true)}
                            disabled={isRefreshing}
                            className="btn-golden text-sm cursor-pointer"
                            style={{
                                padding: '0.4rem 1rem',
                                opacity: isRefreshing ? 0.6 : 1,
                            }}
                        >
                            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                            {isRefreshing ? 'Loading...' : 'Refresh'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-8 py-10 max-w-[1440px] mx-auto">
                {/* Loading State */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <RefreshCw size={40} className="animate-spin mb-4" style={{ color: 'var(--color-primary)' }} />
                        <p className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>Fetching latest blogs...</p>
                        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>This may take a moment</p>
                    </div>
                ) : (
                    /* Blog Cards Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 stagger-children">
                        {blogs.map((blog, index) => (
                            <Link
                                key={`${blog.url}-${index}`}
                                href={blog.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <article
                                    className="rounded-xl overflow-hidden group cursor-pointer h-full"
                                    style={{
                                        background: 'var(--color-surface)',
                                        border: '1px solid var(--color-border-light)',
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'all var(--transition-base)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ background: 'var(--color-surface-warm)' }}>
                                        {blog.thumbnail ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={blog.thumbnail}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/placeholder-blog.png';
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full flex items-center justify-center"
                                                style={{
                                                    background: 'linear-gradient(135deg, #FFF8E1, #FFF4D4)',
                                                }}
                                            >
                                                <BookOpen size={36} style={{ color: 'var(--color-secondary)' }} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <p
                                            className="text-sm mb-3 font-medium tracking-wide"
                                            style={{ color: 'var(--color-text-muted)' }}
                                        >
                                            {blog.date}
                                        </p>
                                        <h3
                                            className="text-base font-semibold leading-relaxed line-clamp-3"
                                            style={{
                                                color: 'var(--color-text)',
                                                fontFamily: 'var(--font-heading)',
                                                transition: 'color var(--transition-fast)',
                                            }}
                                        >
                                            {blog.title}
                                        </h3>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && blogs.length === 0 && (
                    <div className="text-center py-20">
                        <p className="mb-4" style={{ color: 'var(--color-text-muted)' }}>No blogs found.</p>
                        <button
                            onClick={() => fetchBlogs(true)}
                            className="btn-golden cursor-pointer"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            {/* Footer Attribution */}
            <div
                className="text-center py-8 text-sm"
                style={{
                    color: 'var(--color-text-muted)',
                    borderTop: '1px solid var(--color-border-light)',
                }}
            >
                <p>
                    Blogs sourced from{' '}
                    <a
                        href="https://iskcondesiretree.com/profiles/blogs"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
                    >
                        ISKCON Desire Tree
                    </a>
                </p>
            </div>
        </div>
    );
}
