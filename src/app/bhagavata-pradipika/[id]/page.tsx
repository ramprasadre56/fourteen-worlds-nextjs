'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Download,
    Calendar,
    Share2,
    ExternalLink,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    BookOpen,
    Sparkles
} from 'lucide-react';

interface PradipikaIssue {
    id: string;
    issue_number: number;
    title: string;
    date: string;
    pdf_url: string;
    pdf_filename: string;
    cover_image_url: string | null;
    is_special: boolean;
    special_type: string | null;
}

const SPECIAL_TYPE_LABELS: Record<string, { label: string; emoji: string }> = {
    janmastami: { label: 'Janmastami Special', emoji: '🪈' },
    kartik: { label: 'Kartik Special', emoji: '🪔' },
    diwali: { label: 'Diwali Special', emoji: '✨' },
    ramanavami: { label: 'Ramanavami Special', emoji: '🏹' },
    narsimha: { label: 'Narsimha Chaturdashi', emoji: '🦁' },
    radhastami: { label: 'Radhastami Special', emoji: '🌸' },
    'gaura purnima': { label: 'Gaura Purnima', emoji: '🌕' },
    hanuman: { label: 'Hanuman Jayanti', emoji: '🙏' },
    'bhadra purnima': { label: 'Bhadra Purnima', emoji: '📜' },
};

const GRADIENT_COLORS = [
    'from-orange-400 to-amber-300',
    'from-rose-400 to-orange-300',
    'from-amber-400 to-yellow-300',
    'from-orange-500 to-rose-400',
    'from-yellow-400 to-amber-300',
];

function getGradient(issueNumber: number): string {
    return GRADIENT_COLORS[issueNumber % GRADIENT_COLORS.length];
}

function formatDate(dateStr: string): string {
    const [year, month] = dateStr.split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function IssueDetailPage() {
    const params = useParams();
    const issueId = params.id as string;

    const [issue, setIssue] = useState<PradipikaIssue | null>(null);
    const [relatedIssues, setRelatedIssues] = useState<PradipikaIssue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showPdfViewer, setShowPdfViewer] = useState(false);

    useEffect(() => {
        if (issueId) {
            fetchIssue();
        }
    }, [issueId]);

    async function fetchIssue() {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/pradipika/${issueId}`);
            const data = await response.json();

            if (data.success) {
                setIssue(data.issue);
                setRelatedIssues(data.relatedIssues || []);
            } else {
                setError(data.error || 'Issue not found');
            }
        } catch (err) {
            setError('Failed to load issue');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleShare() {
        if (navigator.share && issue) {
            navigator.share({
                title: `Bhagavata Pradipika Issue #${issue.issue_number}`,
                text: issue.title,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
                <Loader2 size={48} className="animate-spin text-orange-600" />
            </div>
        );
    }

    if (error || !issue) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
                <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/50 max-w-md">
                    <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{error || 'Issue Not Found'}</h2>
                    <p className="text-gray-600 mb-6">The requested issue could not be loaded.</p>
                    <Link
                        href="/bhagavata-pradipika"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700"
                    >
                        <ArrowLeft size={18} />
                        Back to Issues
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/bhagavata-pradipika"
                            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span className="hidden sm:inline">Back to Issues</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleShare}
                                className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-orange-600 hover:border-orange-300 transition-colors"
                            >
                                <Share2 size={20} />
                            </button>
                            <a
                                href={issue.pdf_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                <Download size={18} />
                                <span className="hidden sm:inline">Download PDF</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Issue Header Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
                        >
                            <div className="p-6 sm:p-8">
                                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                                    {/* Cover */}
                                    <div className={`w-36 h-48 rounded-2xl bg-gradient-to-br ${getGradient(issue.issue_number)} shadow-xl flex flex-col items-center justify-center text-white flex-shrink-0`}>
                                        {issue.is_special && <Sparkles className="mb-2" size={20} />}
                                        <span className="text-4xl font-bold">#{issue.issue_number}</span>
                                        <span className="text-sm opacity-80 mt-1">{formatDate(issue.date).split(' ')[0]}</span>
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 text-center sm:text-left">
                                        {issue.is_special && issue.special_type && (
                                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium mb-3">
                                                <span>{SPECIAL_TYPE_LABELS[issue.special_type]?.emoji || '✨'}</span>
                                                <span>{SPECIAL_TYPE_LABELS[issue.special_type]?.label || 'Special Edition'}</span>
                                            </div>
                                        )}

                                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                                            {issue.title}
                                        </h1>

                                        <div className="flex items-center gap-4 justify-center sm:justify-start text-gray-600 mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                <span>{formatDate(issue.date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={16} />
                                                <span>Issue #{issue.issue_number}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600">
                                            Monthly spiritual newsletter from Bhagavata Pradipika, offering insights from Śrīmad-Bhāgavatam and Vaishnava wisdom.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* PDF Viewer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
                        >
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="font-semibold text-gray-800">PDF Viewer</h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowPdfViewer(!showPdfViewer)}
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                    >
                                        <Maximize2 size={18} />
                                    </button>
                                    <a
                                        href={issue.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>

                            <div className={`${showPdfViewer ? 'h-[80vh]' : 'h-[60vh]'} transition-all`}>
                                <iframe
                                    src={`${issue.pdf_url}#toolbar=0`}
                                    className="w-full h-full"
                                    title={`Bhagavata Pradipika Issue ${issue.issue_number}`}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6"
                        >
                            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <a
                                    href={issue.pdf_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 w-full p-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:shadow-lg transition-all"
                                >
                                    <Download size={20} />
                                    <span>Download PDF</span>
                                </a>
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-3 w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-all"
                                >
                                    <Share2 size={20} />
                                    <span>Share Issue</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Navigation */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6"
                        >
                            <h3 className="font-semibold text-gray-800 mb-4">Browse Issues</h3>
                            <div className="flex gap-3">
                                {issue.issue_number > 1 && (
                                    <Link
                                        href={`/bhagavata-pradipika/${issue.issue_number - 1}`}
                                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                        <span>#{issue.issue_number - 1}</span>
                                    </Link>
                                )}
                                <Link
                                    href={`/bhagavata-pradipika/${issue.issue_number + 1}`}
                                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                                >
                                    <span>#{issue.issue_number + 1}</span>
                                    <ChevronRight size={18} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Related Issues */}
                        {relatedIssues.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6"
                            >
                                <h3 className="font-semibold text-gray-800 mb-4">Related Issues</h3>
                                <div className="space-y-3">
                                    {relatedIssues.slice(0, 4).map((relatedIssue) => (
                                        <Link
                                            key={relatedIssue.id}
                                            href={`/bhagavata-pradipika/${relatedIssue.issue_number}`}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-orange-50 transition-colors group"
                                        >
                                            <div className={`w-10 h-12 rounded-lg bg-gradient-to-br ${getGradient(relatedIssue.issue_number)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                                                #{relatedIssue.issue_number}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800 truncate group-hover:text-orange-600 transition-colors">
                                                    {relatedIssue.title}
                                                </p>
                                                <p className="text-xs text-gray-500">{formatDate(relatedIssue.date)}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
