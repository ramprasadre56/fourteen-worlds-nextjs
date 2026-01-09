'use client';

import Link from 'next/link';
import { BookOpen, Library, FileText, Image } from 'lucide-react';

const links = [
    {
        icon: BookOpen,
        title: 'Bhagavad Gita',
        desc: 'Study the timeless wisdom',
        href: '/library/bg',
    },
    {
        icon: Library,
        title: 'Srimad Bhagavatam',
        desc: 'Explore the cream of Vedic literature',
        href: '/library/sb',
    },
    {
        icon: FileText,
        title: 'Articles',
        desc: 'Read Vedic cosmology essays',
        href: '/articles',
    },
    {
        icon: Image,
        title: 'Media',
        desc: 'Photos, videos & flipbooks',
        href: '/media',
    },
];

export function QuickLinks() {
    return (
        <div className="w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Quick Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 transition-all hover:border-purple-600 hover:shadow-md"
                    >
                        <link.icon size={24} className="text-purple-600" />
                        <div className="flex flex-col items-start">
                            <span className="font-semibold text-gray-800">{link.title}</span>
                            <span className="text-sm text-gray-500">{link.desc}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
