'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RefreshCw, Wifi, Database, BookOpen, ExternalLink } from 'lucide-react';

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

export function BlogGrid() {
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
            const refreshParam = forceRefresh ? '?refresh=true' : '';
            // We explicitly fetch max 20 blogs for the grid
            const res = await fetch(`/api/blogs${refreshParam}`);
            const data: BlogsResponse = await res.json();

            if (data.success) {
                // Determine how many blogs to show based on screen size (default to 10 for grid layout)
                setBlogs(data.blogs.slice(0, 10));
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
        <div className="w-full mt-10">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h2 
                        className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                    >
                        Latest Spiritual Insights
                    </h2>
                    <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
                        Read the newest articles and updates from the ISKCON Desire Tree community.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {sourceInfo && (
                        <span
                            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                            style={{
                                background: sourceInfo.bgColor,
                                border: `1px solid ${sourceInfo.borderColor}`,
                                color: sourceInfo.textColor,
                            }}
                        >
                            <sourceInfo.icon size={12} />
                            {sourceInfo.text}
                        </span>
                    )}
                    <button
                        onClick={() => fetchBlogs(true)}
                        disabled={isRefreshing}
                        className="btn-golden text-sm cursor-pointer flex items-center shrink-0"
                        style={{
                            padding: '0.5rem 1rem',
                            opacity: isRefreshing ? 0.6 : 1,
                        }}
                        aria-label="Refresh blogs"
                    >
                        <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {isRefreshing ? 'Loading...' : 'Refresh'}
                    </button>
                    <Link
                        href="https://iskcondesiretree.com/profiles/blogs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-golden text-sm cursor-pointer flex items-center shrink-0 whitespace-nowrap"
                        style={{
                            background: 'transparent',
                            color: 'var(--color-primary)',
                            border: '1px solid rgba(212, 168, 83, 0.5)',
                            padding: '0.5rem 1rem',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(212, 168, 83, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        View All
                        <ExternalLink size={14} className="ml-1.5 opacity-70" />
                    </Link>
                </div>
            </div>

            {/* Content Section */}
            <div 
                className="w-full relative"
                style={{ 
                    minHeight: isLoading ? '300px' : 'auto'
                }}
            >
                {/* Loading State */}
                {isLoading ? (
                    <div 
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-xl"
                        style={{ background: 'rgba(253, 248, 240, 0.5)', backdropFilter: 'blur(4px)' }}
                    >
                        <RefreshCw size={32} className="animate-spin mb-4" style={{ color: 'var(--color-primary)' }} />
                        <p className="font-medium text-lg" style={{ color: 'var(--color-text-secondary)' }}>Loading latest articles...</p>
                    </div>
                ) : blogs.length > 0 ? (
                    /* Blog Cards Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 stagger-children">
                        {blogs.map((blog, index) => (
                            <Link
                                key={`${blog.url}-${index}`}
                                href={blog.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full group outline-none"
                            >
                                <article
                                    className="rounded-xl overflow-hidden flex flex-col h-full bg-white transition-all duration-300"
                                    style={{
                                        border: '1px solid var(--color-border)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(61, 12, 12, 0.08)';
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = 'var(--color-border)';
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 168, 83, 0.3)';
                                        e.currentTarget.style.borderColor = 'var(--color-secondary)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                                        e.currentTarget.style.borderColor = 'var(--color-border)';
                                    }}
                                >
                                    {/* Thumbnail container with fixed aspect ratio */}
                                    <div className="relative w-full overflow-hidden" style={{ paddingBottom: '70%', background: 'var(--color-surface-warm)' }}>
                                        {blog.thumbnail ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={blog.thumbnail}
                                                alt={blog.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                loading="lazy"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/placeholder-blog.png';
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-transform duration-500 group-hover:scale-105"
                                                style={{
                                                    background: 'linear-gradient(135deg, #FFF8E1 0%, #FFF4D4 100%)',
                                                }}
                                            >
                                                <BookOpen size={32} className="mb-2 opacity-80" style={{ color: 'var(--color-secondary)' }} />
                                                <span className="text-xs font-medium uppercase tracking-wider opacity-60" style={{ color: 'var(--color-primary)' }}>
                                                    Article
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Overlay gradient for text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-4 flex flex-col flex-1">
                                        {/* Date Badge */}
                                        <div className="mb-3">
                                            <span 
                                                className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md"
                                                style={{ 
                                                    background: 'var(--color-surface-warm)',
                                                    color: 'var(--color-primary)',
                                                    border: '1px solid rgba(212, 168, 83, 0.2)'
                                                }}
                                            >
                                                {blog.date}
                                            </span>
                                        </div>
                                        
                                        {/* Title */}
                                        <h3
                                            className="text-base font-bold leading-snug line-clamp-3 mb-2 flex-1"
                                            style={{
                                                color: 'var(--color-text)',
                                                fontFamily: 'var(--font-heading)',
                                            }}
                                        >
                                            <span className="bg-gradient-to-r from-yellow-700/0 to-yellow-700/0 bg-[length:0px_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_2px] group-hover:bg-[length:100%_2px] group-hover:from-yellow-700/40 group-hover:to-yellow-700/40 pb-0.5">
                                            {blog.title}
                                            </span>
                                        </h3>

                                        {/* Read More indicator */}
                                        <div 
                                            className="flex items-center text-sm font-semibold mt-auto pt-3 border-t border-gray-100 transition-colors duration-300"
                                            style={{ color: 'var(--color-secondary)' }}
                                        >
                                            <span className="mr-1 group-hover:underline decoration-1 underline-offset-2">Read article</span>
                                            <ArrowRightIcon className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div 
                        className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed"
                        style={{ 
                            background: 'var(--color-bg)',
                            borderColor: 'var(--color-border)',
                        }}
                    >
                        <BookOpen size={48} className="mb-4 opacity-40" style={{ color: 'var(--color-text-muted)' }} />
                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>No Articles Found</h3>
                        <p className="max-w-md mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                            We couldn&apos;t load the latest articles at this time. Please try refreshing or check back later.
                        </p>
                        <button
                            onClick={() => fetchBlogs(true)}
                            className="btn-golden"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
            
            <div className="mt-6 text-center text-sm opacity-60">
                <p>
                    Content sourced from <a href="https://iskcondesiretree.com" className="hover:underline text-yellow-800" target="_blank" rel="noopener noreferrer">ISKCON Desire Tree</a>
                </p>
            </div>
        </div>
    );
}

// Simple Arrow Right Icon component to avoid bringing in multiple individual lucide imports if possible
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
