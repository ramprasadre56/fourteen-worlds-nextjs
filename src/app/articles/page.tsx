'use client';

import Link from 'next/link';
import { FileText, BookOpen, Globe, Atom } from 'lucide-react';

const articles = [
    {
        id: 1,
        title: 'The Fourteen Planetary Systems of the Universe',
        description: 'A comprehensive overview of Vedic cosmology as described in Śrīmad-Bhāgavatam, exploring the three-tiered structure of the universe.',
        category: 'Cosmology',
        icon: Globe,
        href: '#',
    },
    {
        id: 2,
        title: 'Mount Meru: The Axis of the Universe',
        description: 'Understanding Sumeru (Mount Meru) as the central axis of Bhū-maṇḍala and its significance in Vedic cosmography.',
        category: 'Geography',
        icon: Globe,
        href: '#',
    },
    {
        id: 3,
        title: 'The Seven Islands and Seven Oceans',
        description: 'Exploring the concentric structure of Bhū-maṇḍala with its seven dvīpas (islands) and seven seas of exotic liquids.',
        category: 'Geography',
        icon: Globe,
        href: '#',
    },
    {
        id: 4,
        title: 'Hellish Planets: The Naraka-lokas',
        description: 'A study of the 28 hellish planets described in the Fifth Canto of Śrīmad-Bhāgavatam and their karmic implications.',
        category: 'Cosmology',
        icon: Atom,
        href: '#',
    },
    {
        id: 5,
        title: 'The Universal Form: Virāṭ-rūpa',
        description: 'Understanding the cosmic manifestation of the Supreme Lord as the universe itself, based on Bhagavad-gītā Chapter 11.',
        category: 'Philosophy',
        icon: BookOpen,
        href: '#',
    },
    {
        id: 6,
        title: 'Time Cycles in Vedic Cosmology',
        description: 'Exploring the yugas, manvantaras, and kalpas - the vast cycles of cosmic time described in the Purāṇas.',
        category: 'Time',
        icon: Atom,
        href: '#',
    },
];

const categories = ['All', 'Cosmology', 'Geography', 'Philosophy', 'Time'];

export default function ArticlesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Articles on Vedic Cosmology
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore in-depth essays on the structure of the universe as described in
                        the Vedic scriptures, particularly Śrīmad-Bhāgavatam.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-white text-gray-600 hover:bg-purple-100 hover:text-purple-700 border border-gray-200"
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <article.icon size={18} className="text-purple-600" />
                                    <span className="text-xs font-medium text-purple-600 uppercase tracking-wider">
                                        {article.category}
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    {article.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-purple-600">
                                    <FileText size={14} />
                                    <span>Read Article</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Coming Soon Notice */}
                <div className="mt-12 text-center">
                    <div className="inline-block bg-amber-50 border border-amber-200 rounded-lg px-6 py-4">
                        <p className="text-amber-800">
                            <strong>More articles coming soon!</strong> We are continuously adding
                            new research and essays on Vedic cosmology.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
