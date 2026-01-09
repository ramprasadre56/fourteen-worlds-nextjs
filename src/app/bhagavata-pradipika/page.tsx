'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Download,
    Search,
    Calendar,
    Sparkles,
    BookOpen,
    RefreshCw,
    Filter,
    ChevronDown,
    ExternalLink,
    Loader2
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
    janmastami: { label: 'Janmastami', emoji: '🪈' },
    kartik: { label: 'Kartik', emoji: '🪔' },
    diwali: { label: 'Diwali', emoji: '✨' },
    ramanavami: { label: 'Ramanavami', emoji: '🏹' },
    narsimha: { label: 'Narsimha', emoji: '🦁' },
    radhastami: { label: 'Radhastami', emoji: '🌸' },
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
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function BhagavataPradipikaPage() {
    const [issues, setIssues] = useState<PradipikaIssue[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [selectedSpecial, setSelectedSpecial] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [years, setYears] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    // Fetch issues
    useEffect(() => {
        fetchIssues();
    }, []);

    async function fetchIssues() {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/pradipika/list');
            const data = await response.json();

            if (data.success) {
                setIssues(data.issues);
                setYears(data.years || []);
            } else {
                setError(data.error || 'Failed to fetch issues');
            }
        } catch (err) {
            setError('Failed to connect to database');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSync() {
        try {
            setSyncing(true);
            const response = await fetch('/api/pradipika/sync', { method: 'POST' });
            const data = await response.json();

            if (data.success) {
                await fetchIssues();
            } else {
                setError(data.error || 'Sync failed');
            }
        } catch (err) {
            setError('Failed to sync');
            console.error(err);
        } finally {
            setSyncing(false);
        }
    }

    // Filter issues
    const filteredIssues = issues.filter(issue => {
        if (selectedYear !== 'all' && !issue.date.startsWith(selectedYear)) return false;
        if (selectedSpecial !== 'all') {
            if (selectedSpecial === 'special' && !issue.is_special) return false;
            if (selectedSpecial !== 'special' && issue.special_type !== selectedSpecial) return false;
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                issue.title.toLowerCase().includes(query) ||
                issue.issue_number.toString().includes(query)
            );
        }
        return true;
    });

    const latestIssue = issues[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="text-4xl">🪷</span>
                            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                                Bhagavata Pradipika
                            </h1>
                        </div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The Torchlight of Śrīmad-Bhāgavatam — Monthly spiritual insights from ISKCON Desire Tree
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-2xl mx-auto mb-12"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search issues by title or number..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-lg border border-white/50 shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                    </motion.div>

                    {/* Latest Issue Feature Card */}
                    {latestIssue && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />

                                <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center">
                                    {/* Cover Image */}
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotateY: 5 }}
                                        className="relative w-48 h-64 flex-shrink-0"
                                    >
                                        <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${getGradient(latestIssue.issue_number)} shadow-xl flex flex-col items-center justify-center text-white`}>
                                            <Sparkles className="mb-2" size={24} />
                                            <span className="text-5xl font-bold mb-1">#{latestIssue.issue_number}</span>
                                            <span className="text-sm opacity-80">Latest Issue</span>
                                        </div>
                                        {latestIssue.is_special && (
                                            <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                ✨ Special
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Details */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                                            <Calendar size={16} className="text-orange-600" />
                                            <span className="text-orange-600 font-medium">{formatDate(latestIssue.date)}</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                                            {latestIssue.title}
                                        </h2>
                                        <p className="text-gray-600 mb-6">
                                            Read the latest spiritual insights from Śrīmad-Bhāgavatam commentary and wisdom from the Vaishnava tradition.
                                        </p>
                                        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                                            <a
                                                href={latestIssue.pdf_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                                            >
                                                <Download size={18} />
                                                Download PDF
                                            </a>
                                            <Link
                                                href={`/bhagavata-pradipika/${latestIssue.issue_number}`}
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 border border-orange-200"
                                            >
                                                <BookOpen size={18} />
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Filters & Archive Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Toolbar */}
                <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-gray-800">Issue Archive</h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {issues.length} issues
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-orange-300 transition-colors"
                        >
                            <Filter size={16} />
                            Filters
                            <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                            onClick={handleSync}
                            disabled={syncing}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl shadow-sm hover:bg-orange-700 transition-colors disabled:opacity-50"
                        >
                            {syncing ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <RefreshCw size={16} />
                            )}
                            {syncing ? 'Syncing...' : 'Sync Latest'}
                        </button>
                    </div>
                </div>

                {/* Filter Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-8"
                        >
                            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Year Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                                        <select
                                            value={selectedYear}
                                            onChange={(e) => setSelectedYear(e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="all">All Years</option>
                                            {years.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Special Type Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Edition Type</label>
                                        <select
                                            value={selectedSpecial}
                                            onChange={(e) => setSelectedSpecial(e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="all">All Editions</option>
                                            <option value="special">Special Editions Only</option>
                                            {Object.entries(SPECIAL_TYPE_LABELS).map(([key, { label, emoji }]) => (
                                                <option key={key} value={key}>{emoji} {label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={40} className="animate-spin text-orange-600" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-8">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={handleSync}
                            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                        >
                            Try Syncing Data
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && issues.length === 0 && (
                    <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/50">
                        <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Issues Found</h3>
                        <p className="text-gray-600 mb-6">Click the sync button to fetch issues from ISKCON Desire Tree</p>
                        <button
                            onClick={handleSync}
                            disabled={syncing}
                            className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:opacity-50"
                        >
                            {syncing ? 'Syncing...' : 'Sync Issues Now'}
                        </button>
                    </div>
                )}

                {/* Issues Grid */}
                {!loading && filteredIssues.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                        {filteredIssues.map((issue, index) => (
                            <motion.div
                                key={issue.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.02 }}
                            >
                                <Link href={`/bhagavata-pradipika/${issue.issue_number}`}>
                                    <motion.div
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                                    >
                                        {/* Cover */}
                                        <div className={`h-40 sm:h-48 bg-gradient-to-br ${getGradient(issue.issue_number)} flex flex-col items-center justify-center text-white relative`}>
                                            <span className="text-4xl sm:text-5xl font-bold">#{issue.issue_number}</span>
                                            <span className="text-xs sm:text-sm opacity-80 mt-1">{formatDate(issue.date)}</span>

                                            {/* Special Badge */}
                                            {issue.is_special && (
                                                <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                                    {SPECIAL_TYPE_LABELS[issue.special_type || '']?.emoji || '✨'}
                                                </div>
                                            )}

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <ExternalLink className="text-white" size={24} />
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="p-3 sm:p-4">
                                            <h3 className="font-medium text-gray-800 text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-orange-600 transition-colors">
                                                {issue.title}
                                            </h3>
                                            <a
                                                href={issue.pdf_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="mt-2 flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700"
                                            >
                                                <Download size={12} />
                                                <span>PDF</span>
                                            </a>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* No Results for Search */}
                {!loading && issues.length > 0 && filteredIssues.length === 0 && (
                    <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/50">
                        <Search size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Matching Issues</h3>
                        <p className="text-gray-600">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
