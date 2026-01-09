'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, RefreshCw, Wifi, Database } from 'lucide-react';

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
                return { icon: Wifi, text: 'Live', color: 'text-green-600 bg-green-50 border-green-200' };
            case 'cache':
                return { icon: Database, text: 'Cached', color: 'text-blue-600 bg-blue-50 border-blue-200' };
            case 'static-fallback':
                return { icon: Database, text: 'Cached', color: 'text-gray-600 bg-gray-100 border-gray-200' };
            default:
                return null;
        }
    };

    const sourceInfo = getSourceLabel();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4 px-8">
                <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            ISKCON Blogs
                        </h1>
                        <p className="text-sm text-gray-500">
                            Latest spiritual insights from ISKCON Desire Tree
                        </p>
                    </div>

                    {/* Data Source & Refresh */}
                    <div className="flex items-center gap-2">
                        {sourceInfo && (
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border ${sourceInfo.color}`}>
                                <sourceInfo.icon size={14} />
                                {sourceInfo.text}
                            </span>
                        )}
                        <button
                            onClick={() => fetchBlogs(true)}
                            disabled={isRefreshing}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                            {isRefreshing ? 'Loading...' : 'Refresh'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-6">
                {/* Loading State */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <RefreshCw size={40} className="animate-spin text-red-500 mb-4" />
                        <p className="text-gray-600 font-medium">Fetching latest blogs...</p>
                        <p className="text-sm text-gray-400 mt-1">This may take a moment</p>
                    </div>
                ) : (
                    /* Pinterest-style Masonry Grid */
                    <div
                        className="mx-auto"
                        style={{
                            columnCount: 5,
                            columnGap: '16px',
                        }}
                    >
                        <style jsx>{`
                            @media (max-width: 1536px) {
                                div { column-count: 4 !important; }
                            }
                            @media (max-width: 1280px) {
                                div { column-count: 3 !important; }
                            }
                            @media (max-width: 768px) {
                                div { column-count: 2 !important; }
                            }
                            @media (max-width: 480px) {
                                div { column-count: 1 !important; }
                            }
                        `}</style>
                        {blogs.map((blog, index) => (
                            <Link
                                key={`${blog.url}-${index}`}
                                href={blog.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mb-4 break-inside-avoid"
                            >
                                <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
                                    {/* Thumbnail */}
                                    {blog.thumbnail && (
                                        <div className="relative w-full overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={blog.thumbnail}
                                                alt={blog.title}
                                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                                            <span className="truncate max-w-[55%] font-medium">{blog.author}</span>
                                            <span>{blog.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-2 text-xs text-red-500 font-medium">
                                            <ExternalLink size={12} />
                                            <span>Read on ISKCON DT</span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && blogs.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 mb-4">No blogs found.</p>
                        <button
                            onClick={() => fetchBlogs(true)}
                            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            {/* Footer Attribution */}
            <div className="text-center py-8 text-sm text-gray-400 border-t border-gray-100">
                <p>
                    Blogs sourced from{' '}
                    <a
                        href="https://iskcondesiretree.com/profiles/blogs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 hover:underline"
                    >
                        ISKCON Desire Tree
                    </a>
                </p>
            </div>
        </div>
    );
}
