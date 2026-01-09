'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Book, Clock, User, FileText, Download, Lock } from 'lucide-react';
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

// Helper to convert path to slug
function getArticleSlug(path: string): string {
    return path
        .replace('/btg_articles_content/', '')
        .replace('.html', '');
}

// Bhagavata Pradipika Issues
const bhagavataPradipikaIssues = [
    { issue_number: "102", title: "The Scripture that fills the Heart", date: "2025-12", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/Bhagavata_Pradipika_Issue_102-The_Scripture_that_fills_the_Heart_-_2025-12.pdf" },
    { issue_number: "101", title: "In the Womb of Divine Protection", date: "2025-11", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/Bhagavata_Pradipika_Issue_101-In_the_Womb_of_Divine_Protection_-_2025-11.pdf" },
    { issue_number: "100", title: "Kartik Special", date: "2025-10", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/Bhagavata_Pradipika_Issue_100-Kartik_Special_-_2025-10.pdf" },
    { issue_number: "99", title: "Krishna never leaves your Side", date: "2025-09", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/99_-_Bhagavata_Pradipika_Issue_99-Krishna_never_leaves_your_Side_-_2025-09.pdf" },
    { issue_number: "98", title: "The Real Spirit of Janmastami", date: "2025-08", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/98_-_Bhagavata_Pradipika_Issue_98-The_Real_Spirit_of_Janmastami-Inviting_Krsna_into_our_Hearts_-_2025-08.pdf" },
    { issue_number: "97", title: "When the Intention Isn't Right", date: "2025-07", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/97_-_Bhagavata_Pradipika_Issue_97-When_the_Intention_Isn%E2%80%99t_Right_But_the_Association_Is_-_2025-07.pdf" },
    { issue_number: "96", title: "Do You Truly Want Your Dependents to Advance", date: "2025-06", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/96_-_Bhagavata_Pradipika_Issue_96-Do_you_Truly_Want_your_Dependents_to_Advance_-_2025-06.pdf" },
    { issue_number: "95", title: "A Devotee's Compassion", date: "2025-05", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/95_-_Bhagavata_Pradipika_Issue_95-A_Devotee%27s_Compassion_-_2025-05.pdf" },
    { issue_number: "94", title: "Epitome of Forgiveness", date: "2025-04", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/94_-_Bhagavata_Pradipika_Issue_94-Epitome_of_Forgiveness_-_2025-04.pdf" },
    { issue_number: "93", title: "An Unwarranted Distraction", date: "2025-03", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/93_-_Bhagavata_Pradipika_Issue_93-An_Unwarranted_Distraction_-_2025-03.pdf" },
    { issue_number: "92", title: "Me Mind and Bhakti-Dissatisfaction", date: "2025-02", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/92_-_Bhagavata_Pradipika_Issue_92-Me_Mind_and_Bhakti-Dissatisfaction_-_2025-02.pdf" },
    { issue_number: "91", title: "Three Qualities of KRSNA's Name", date: "2025-01", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/91_-_Bhagavata_Pradipika_Issue_91-Three_Qualities_of_KRSNA%27s_Name_-_2025-01.pdf" },
];

export default function BackToGodheadPage() {
    const [activeTab, setActiveTab] = useState<'btg' | 'pradipika'>('btg');
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

    const issues: Issue[] = magazineData as Issue[];

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

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {selectedIssue.articles.map((article, idx) => (
                                    <Link
                                        key={article.id || idx}
                                        href={`/backtogodhead/article/${getArticleSlug(article.path)}`}
                                        className="group"
                                    >
                                        <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
                                            {article.image && (
                                                <div className="relative h-48 overflow-hidden">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    {article.is_premium && (
                                                        <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                                            <Lock size={10} />
                                                            Premium
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">
                                                    {article.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <User size={12} />
                                                        {article.author?.split(' ').slice(-2).join(' ')}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {article.reading_time}
                                                    </span>
                                                </div>
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
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bhagavata Pradipika</h2>
                            <p className="text-gray-600">
                                Monthly spiritual newsletter from ISKCON Desire Tree
                            </p>
                        </div>

                        {/* Featured Latest Issue */}
                        <div className="mb-8 bg-gradient-to-r from-orange-100 to-amber-50 rounded-2xl p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className="w-48 h-64 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                    <div className="text-center text-white">
                                        <div className="text-5xl font-bold mb-2">#{bhagavataPradipikaIssues[0]?.issue_number}</div>
                                        <div className="text-sm opacity-90">Latest Issue</div>
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="text-sm text-orange-600 font-medium mb-2">{bhagavataPradipikaIssues[0]?.date}</div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{bhagavataPradipikaIssues[0]?.title}</h3>
                                    <p className="text-gray-600 mb-4">
                                        Read the latest insights from Śrīmad-Bhāgavatam commentary and spiritual wisdom.
                                    </p>
                                    <a
                                        href={bhagavataPradipikaIssues[0]?.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                                    >
                                        <Download size={18} />
                                        Download Latest Issue
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Issue Archive Grid */}
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Issue Archive</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {bhagavataPradipikaIssues.slice(1).map((issue) => (
                                <a
                                    key={issue.issue_number}
                                    href={issue.pdf_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group"
                                >
                                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group-hover:border-orange-300">
                                        {/* Cover Image Placeholder */}
                                        <div className="h-36 bg-gradient-to-br from-orange-200 to-amber-100 flex items-center justify-center relative">
                                            <div className="text-3xl font-bold text-orange-600">#{issue.issue_number}</div>
                                            <div className="absolute top-2 right-2 text-[10px] bg-white/80 px-2 py-0.5 rounded text-gray-600">
                                                {issue.date}
                                            </div>
                                        </div>
                                        {/* Title & Download */}
                                        <div className="p-3">
                                            <h4 className="text-xs font-medium text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2 min-h-[32px]">
                                                {issue.title}
                                            </h4>
                                            <div className="flex items-center gap-1 text-orange-600 text-[10px]">
                                                <Download size={10} />
                                                <span>PDF</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
