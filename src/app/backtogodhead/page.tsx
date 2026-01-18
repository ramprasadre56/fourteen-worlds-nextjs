'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Book, Clock, FileText, Download, Lock, Loader2, List, LayoutGrid } from 'lucide-react';
import magazineData from '@/data/btg_magazine_data.json';

interface Article {
    id: string;
    title: string;
    author: string;
    reading_time: string;
    date: string;
    image: string;
    category: string;
    path: string;
    description: string;
    is_premium: boolean;
    url: string;
}

interface Issue {
    issue: string;
    cover_image: string;
    articles: Article[];
}

interface PradipikaIssue {
    issue_number: string;
    title: string;
    date: string;
    pdf_url: string;
}

// Helper to convert path to slug
function getArticleSlug(path: string): string {
    return path
        .replace('/btg_articles_content/', '')
        .replace('.html', '');
}

export default function BackToGodheadPage() {
    const [activeTab, setActiveTab] = useState<'btg' | 'pradipika'>('btg');
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
    const [pradipikaIssues, setPradipikaIssues] = useState<PradipikaIssue[]>([]);
    const [isLoadingPradipika, setIsLoadingPradipika] = useState(false);
    const [pradipikaViewMode, setPradipikaViewMode] = useState<'grid' | 'list'>('grid');

    const issues: Issue[] = magazineData as Issue[];

    // Fetch Bhagavata Pradipika issues when tab is activated
    useEffect(() => {
        if (activeTab === 'pradipika' && pradipikaIssues.length === 0) {
            setIsLoadingPradipika(true);
            fetch('/api/pradipika')
                .then(res => res.json())
                .then(data => {
                    setPradipikaIssues(data);
                })
                .catch(err => {
                    console.error('Failed to fetch Pradipika issues:', err);
                })
                .finally(() => {
                    setIsLoadingPradipika(false);
                });
        }
    }, [activeTab, pradipikaIssues.length]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="w-full px-8">
                    <div className="flex gap-8">
                        <button
                            onClick={() => { setActiveTab('btg'); setSelectedIssue(null); }}
                            className={`py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'btg'
                                ? 'border-orange-600 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <Book size={18} />
                                BTG Magazine
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('pradipika')}
                            className={`py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'pradipika'
                                ? 'border-orange-600 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <FileText size={18} />
                                Bhagavata Pradipika
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full px-8 py-8">
                {activeTab === 'btg' ? (
                    selectedIssue ? (
                        /* Articles View */
                        <div>
                            <button
                                onClick={() => setSelectedIssue(null)}
                                className="mb-6 text-orange-600 hover:underline flex items-center gap-1"
                            >
                                ← Back to Issues
                            </button>

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedIssue.issue}</h2>
                                <p className="text-gray-600">{selectedIssue.articles.length} articles</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {selectedIssue.articles.map((article, idx) => (
                                    <Link
                                        key={article.id || idx}
                                        href={`/backtogodhead/article/${getArticleSlug(article.path)}`}
                                        className="group block"
                                    >
                                        <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                                            {/* Thumbnail */}
                                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                                                {article.image ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
                                                        <span className="text-4xl">📖</span>
                                                    </div>
                                                )}
                                                {article.is_premium && (
                                                    <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                                        <Lock size={10} />
                                                        Premium
                                                    </div>
                                                )}
                                            </div>
                                            {/* Content */}
                                            <div className="p-5">
                                                {/* Author & Read Time */}
                                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-medium tracking-wide">
                                                    <span className="truncate">{article.author?.split(' ').slice(-2).join(' ')}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {article.reading_time}
                                                    </span>
                                                </div>
                                                {/* Title */}
                                                <h3 className="text-base font-semibold text-gray-800 leading-relaxed group-hover:text-orange-600 transition-colors line-clamp-3">
                                                    {article.title}
                                                </h3>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Issues Grid */
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-8">Magazine Issues</h2>

                            {/* Horizontal Gallery of Magazine Covers */}
                            <div className="flex flex-wrap justify-center gap-8 mb-8">
                                {issues.map((issue, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedIssue(issue)}
                                        className="group flex flex-col items-center"
                                    >
                                        {/* Full Magazine Cover */}
                                        <div className="relative w-[180px] h-[240px] md:w-[200px] md:h-[280px] lg:w-[220px] lg:h-[310px] rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                                            {issue.cover_image && (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    src={issue.cover_image}
                                                    alt={issue.issue}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        {/* Month Label */}
                                        <h3 className="mt-4 text-lg font-semibold text-orange-600 group-hover:text-orange-700 transition-colors">
                                            {issue.issue}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {issue.articles.length} articles
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )
                ) : (
                    /* Bhagavata Pradipika Tab */
                    <div>
                        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Bhagavata Pradipika</h2>
                                <p className="text-gray-600">
                                    Monthly spiritual newsletter from ISKCON Desire Tree
                                </p>
                            </div>
                            {/* View Toggle */}
                            <div className="flex items-center bg-gray-100 rounded-full p-1">
                                <button
                                    onClick={() => setPradipikaViewMode('list')}
                                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${pradipikaViewMode === 'list'
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    title="List View"
                                >
                                    <List size={20} />
                                </button>
                                <button
                                    onClick={() => setPradipikaViewMode('grid')}
                                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${pradipikaViewMode === 'grid'
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    title="Grid View"
                                >
                                    <LayoutGrid size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Issue Grid - Blog Card Style */}
                        {isLoadingPradipika ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
                                <span className="ml-2 text-gray-600">Loading issues...</span>
                            </div>
                        ) : pradipikaViewMode === 'grid' ? (
                            /* Grid View */
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {pradipikaIssues.map((issue) => (
                                    <a
                                        key={issue.issue_number}
                                        href={issue.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block"
                                    >
                                        <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                                            {/* Thumbnail */}
                                            <div className="relative w-full aspect-[4/3] overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src="/bhagavata-pradipika-cover.jpg"
                                                    alt={issue.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {/* Issue Number Badge */}
                                                <div className="absolute top-2 left-2 bg-orange-600 text-white px-2 py-1 rounded text-sm font-bold">
                                                    #{issue.issue_number}
                                                </div>
                                            </div>
                                            {/* Content */}
                                            <div className="p-5">
                                                {/* Date */}
                                                <p className="text-sm text-gray-500 mb-3 font-medium tracking-wide">
                                                    {issue.date}
                                                </p>
                                                {/* Title */}
                                                <h3 className="text-base font-semibold text-gray-800 leading-relaxed group-hover:text-orange-600 transition-colors line-clamp-2 mb-3">
                                                    {issue.title}
                                                </h3>
                                                {/* Download CTA */}
                                                <div className="flex items-center gap-1 text-orange-600 text-sm font-medium">
                                                    <Download size={14} />
                                                    <span>Download PDF</span>
                                                </div>
                                            </div>
                                        </article>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            /* List View */
                            <div className="flex flex-col gap-3">
                                {pradipikaIssues.map((issue) => (
                                    <a
                                        key={issue.issue_number}
                                        href={issue.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block"
                                    >
                                        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 p-4">
                                            {/* Small Thumbnail */}
                                            <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src="/bhagavata-pradipika-cover.jpg"
                                                    alt={issue.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">#{issue.issue_number}</span>
                                                </div>
                                            </div>
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-500 font-medium tracking-wide mb-1">
                                                    {issue.date}
                                                </p>
                                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-orange-600 transition-colors truncate">
                                                    {issue.title}
                                                </h3>
                                            </div>
                                            {/* Download Button */}
                                            <div className="flex items-center gap-1 text-orange-600 text-sm font-medium flex-shrink-0">
                                                <Download size={16} />
                                                <span className="hidden sm:inline">Download</span>
                                            </div>
                                        </article>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
