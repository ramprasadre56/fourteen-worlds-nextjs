'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Video, Image as ImageIcon, BookOpen, Play, Filter } from 'lucide-react';

// Import video data from JSON files
import gitaPravahaData from '@/data/bg_gauranga_videos.json';
import sampatiData from '@/data/bg_sampati_videos.json';
import sbOverviewData from '@/data/sb_overview_videos.json';

// Process video data with thumbnails
const gitaPravahaVideos = gitaPravahaData.videos.map((v, idx) => ({
    id: `gp-${idx}`,
    title: v.title,
    thumbnail: `https://img.youtube.com/vi/${v.video_id}/mqdefault.jpg`,
    url: v.url,
    playlist: 'Gita Pravaha',
    speaker: 'Gauranga Darshan Das',
    video_id: v.video_id,
}));

const sampatiVideos = sampatiData.videos.map((v, idx) => ({
    id: `sd-${idx}`,
    title: v.title,
    thumbnail: `https://img.youtube.com/vi/${v.video_id}/mqdefault.jpg`,
    url: v.url,
    playlist: v.playlist || 'Bhagavad Gita',
    speaker: 'Sampati Dasa',
    video_id: v.video_id,
}));

const sbVideos = sbOverviewData.videos.map((v, idx) => ({
    id: `sb-${idx}`,
    title: v.title,
    thumbnail: v.thumbnail,
    url: v.url,
    playlist: 'Srimad Bhagavatam Overview',
    speaker: 'Bhakti Vaibhav',
    video_id: v.video_id,
}));

// All videos combined
const allVideos = [...gitaPravahaVideos, ...sampatiVideos, ...sbVideos];

// Get unique playlists
const playlists = ['All', ...Array.from(new Set(allVideos.map(v => v.playlist)))];

// Photo galleries from home_page
const photos = [
    { id: 1, title: '14 Lokas Diagram', src: '/home_page/14-lokas.jpg' },
    { id: 2, title: '14 Planetary Systems', src: '/home_page/14-planetary-systems.png' },
    { id: 3, title: 'Lokas Universe Structure', src: '/home_page/lokas.jpg' },
    { id: 4, title: 'Upper Planetary Systems', src: '/home_page/7-upper-worlds.jpg' },
    { id: 5, title: 'Lower Planetary Systems', src: '/home_page/7-lower-worlds.jpg' },
    { id: 6, title: 'Three Realms Overview', src: '/home_page/3-realms_s.jpg' },
    { id: 7, title: 'One Universe', src: '/home_page/one-universe.jpg' },
    { id: 8, title: 'Vishnu on Lotus', src: '/home_page/vishnu_lotus.jpg' },
    { id: 9, title: 'Brahma on Lotus', src: '/home_page/brahma-lotus.jpg' },
    { id: 10, title: 'Srila Prabhupada', src: '/home_page/prabhupada_meditation.png' },
];

// Sample flipbooks
const flipbooks = [
    {
        id: 1,
        title: 'Bhagavad Gita As It Is',
        cover: '/books/bg.jpg',
        pages: 892,
    },
    {
        id: 2,
        title: 'Srimad Bhagavatam Canto 1',
        cover: '/books/sb.jpg',
        pages: 456,
    },
    {
        id: 3,
        title: 'Krishna Book',
        cover: '/books/kb.jpg',
        pages: 678,
    },
];

type Tab = 'videos' | 'photos' | 'flipbooks';

export default function MediaPage() {
    const [activeTab, setActiveTab] = useState<Tab>('videos');
    const [selectedPlaylist, setSelectedPlaylist] = useState('All');

    const filteredVideos = selectedPlaylist === 'All'
        ? allVideos
        : allVideos.filter(v => v.playlist === selectedPlaylist);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Media Gallery
                    </h1>
                    <p className="text-lg text-gray-600">
                        {allVideos.length} videos on Bhagavad Gita, Srimad Bhagavatam & Vedic wisdom
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-8">
                    {[
                        { id: 'videos', label: `Videos (${allVideos.length})`, icon: Video },
                        { id: 'photos', label: 'Photos', icon: ImageIcon },
                        { id: 'flipbooks', label: 'Flipbooks', icon: BookOpen },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-orange-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Videos Tab */}
                {activeTab === 'videos' && (
                    <div>
                        {/* Playlist Filter */}
                        <div className="mb-6 flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Filter size={18} />
                                <span className="font-medium">Filter:</span>
                            </div>
                            {playlists.map((playlist) => (
                                <button
                                    key={playlist}
                                    onClick={() => setSelectedPlaylist(playlist)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedPlaylist === playlist
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
                                        }`}
                                >
                                    {playlist}
                                    {playlist !== 'All' && (
                                        <span className="ml-1 opacity-70">
                                            ({allVideos.filter(v => v.playlist === playlist).length})
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Video Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredVideos.map((video) => (
                                <Link
                                    key={video.id}
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                                >
                                    <div className="relative aspect-video">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Play size={48} className="text-white" fill="white" />
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-medium text-gray-800 text-sm line-clamp-2 group-hover:text-orange-600 min-h-[40px]">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-orange-600 font-medium">{video.playlist}</span>
                                            <span className="text-xs text-gray-400">{video.speaker}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {filteredVideos.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No videos found for this playlist.
                            </div>
                        )}
                    </div>
                )}

                {/* Photos Tab */}
                {activeTab === 'photos' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photos.map((photo) => (
                            <div
                                key={photo.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="relative aspect-square">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={photo.src}
                                        alt={photo.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-2">
                                    <p className="text-sm text-gray-700 text-center truncate">
                                        {photo.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Flipbooks Tab */}
                {activeTab === 'flipbooks' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {flipbooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="relative aspect-[2/3]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={book.cover}
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <BookOpen size={32} className="text-white" />
                                    </div>
                                </div>
                                <div className="p-2">
                                    <p className="text-sm font-medium text-gray-800 text-center truncate">
                                        {book.title}
                                    </p>
                                    <p className="text-xs text-gray-500 text-center">
                                        {book.pages} pages
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
