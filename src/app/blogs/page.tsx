'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RefreshCw, Wifi, Database } from 'lucide-react';

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
        <div className="min-h-screen bg-[#F5F5F5]">
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
            <div className="px-6 py-8">
                {/* Loading State */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <RefreshCw size={40} className="animate-spin text-red-500 mb-4" />
                        <p className="text-gray-600 font-medium">Fetching latest blogs...</p>
                        <p className="text-sm text-gray-400 mt-1">This may take a moment</p>
                    </div>
                ) : (
                    /* Blog Cards Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-screen-2xl mx-auto">
                        {blogs.map((blog, index) => (
                            <Link
                                key={`${blog.url}-${index}`}
                                href={blog.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                                    {/* Thumbnail */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
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
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                                                <span className="text-4xl">📖</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        {/* Date */}
                                        <p className="text-sm text-gray-500 mb-3 font-medium tracking-wide">
                                            {blog.date}
                                        </p>
                                        {/* Title */}
                                        <h3 className="text-base font-semibold text-gray-800 leading-relaxed group-hover:text-red-600 transition-colors line-clamp-3">
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
