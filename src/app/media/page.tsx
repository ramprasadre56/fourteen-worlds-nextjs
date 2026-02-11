'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Video, Image as ImageIcon, BookOpen, Play, Filter, Sparkles } from 'lucide-react';

import gitaPravahaData from '@/data/bg_gauranga_videos.json';
import sampatiData from '@/data/bg_sampati_videos.json';
import sbOverviewData from '@/data/sb_overview_videos.json';

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

const allVideos = [...gitaPravahaVideos, ...sampatiVideos, ...sbVideos];
const playlists = ['All', ...Array.from(new Set(allVideos.map(v => v.playlist)))];

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

const flipbooks = [
    { id: 1, title: 'Bhagavad Gita As It Is', cover: '/books/bg.jpg', pages: 892 },
    { id: 2, title: 'Srimad Bhagavatam Canto 1', cover: '/books/sb.jpg', pages: 456 },
    { id: 3, title: 'Krishna Book', cover: '/books/kb.jpg', pages: 678 },
];

type Tab = 'videos' | 'photos' | 'flipbooks';

export default function MediaPage() {
    const [activeTab, setActiveTab] = useState<Tab>('videos');
    const [selectedPlaylist, setSelectedPlaylist] = useState('All');

    const filteredVideos = selectedPlaylist === 'All'
        ? allVideos
        : allVideos.filter(v => v.playlist === selectedPlaylist);

    const tabs = [
        { id: 'videos' as Tab, label: `Videos (${allVideos.length})`, icon: Video },
        { id: 'photos' as Tab, label: 'Photos', icon: ImageIcon },
        { id: 'flipbooks' as Tab, label: 'Flipbooks', icon: BookOpen },
    ];

    return (
        <div className="min-h-screen py-10" style={{ background: 'var(--color-bg)' }}>
            <div className="w-full max-w-[1440px] mx-auto px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-8 h-px" style={{ background: 'var(--color-secondary)' }} />
                        <Sparkles size={16} style={{ color: 'var(--color-secondary)' }} />
                        <div className="w-8 h-px" style={{ background: 'var(--color-secondary)' }} />
                    </div>
                    <h1
                        className="text-4xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                    >
                        Media Gallery
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                        {allVideos.length} videos on Bhagavad Gita, Srimad Bhagavatam &amp; Vedic wisdom
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-3 mb-10">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium cursor-pointer text-sm"
                            style={{
                                background: activeTab === tab.id
                                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))'
                                    : 'var(--color-surface)',
                                color: activeTab === tab.id ? '#F5EDE0' : 'var(--color-text-secondary)',
                                border: activeTab === tab.id ? 'none' : '1px solid var(--color-border)',
                                boxShadow: activeTab === tab.id ? 'var(--shadow-md)' : 'none',
                                transition: 'all var(--transition-base)',
                            }}
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
                        <div className="mb-8 flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                                <Filter size={18} />
                                <span className="font-medium text-sm">Filter:</span>
                            </div>
                            {playlists.map((playlist) => (
                                <button
                                    key={playlist}
                                    onClick={() => setSelectedPlaylist(playlist)}
                                    className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
                                    style={{
                                        background: selectedPlaylist === playlist
                                            ? 'var(--color-primary)'
                                            : 'transparent',
                                        color: selectedPlaylist === playlist
                                            ? '#F5EDE0'
                                            : 'var(--color-text-secondary)',
                                        border: selectedPlaylist === playlist
                                            ? 'none'
                                            : '1px solid var(--color-border)',
                                        transition: 'all var(--transition-fast)',
                                    }}
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredVideos.map((video) => (
                                <Link
                                    key={video.id}
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl overflow-hidden group"
                                    style={{
                                        background: 'var(--color-surface)',
                                        border: '1px solid var(--color-border-light)',
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'all var(--transition-base)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div className="relative aspect-video">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                                            style={{
                                                background: 'rgba(45, 24, 16, 0.5)',
                                                transition: 'opacity var(--transition-base)',
                                            }}
                                        >
                                            <Play size={48} style={{ color: '#F5EDE0' }} fill="#F5EDE0" />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3
                                            className="font-medium text-sm line-clamp-2 min-h-[40px]"
                                            style={{
                                                color: 'var(--color-text)',
                                                fontFamily: 'var(--font-heading)',
                                            }}
                                        >
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span
                                                className="text-xs font-medium"
                                                style={{ color: 'var(--color-primary)' }}
                                            >
                                                {video.playlist}
                                            </span>
                                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                                {video.speaker}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {filteredVideos.length === 0 && (
                            <div className="text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
                                No videos found for this playlist.
                            </div>
                        )}
                    </div>
                )}

                {/* Photos Tab */}
                {activeTab === 'photos' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                        {photos.map((photo) => (
                            <div
                                key={photo.id}
                                className="rounded-xl overflow-hidden cursor-pointer group"
                                style={{
                                    background: 'var(--color-surface)',
                                    border: '1px solid var(--color-border-light)',
                                    boxShadow: 'var(--shadow-sm)',
                                    transition: 'all var(--transition-base)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                }}
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={photo.src}
                                        alt={photo.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-3">
                                    <p
                                        className="text-sm text-center truncate"
                                        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)' }}
                                    >
                                        {photo.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Flipbooks Tab */}
                {activeTab === 'flipbooks' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
                        {flipbooks.map((book) => (
                            <div
                                key={book.id}
                                className="rounded-xl overflow-hidden cursor-pointer group"
                                style={{
                                    background: 'var(--color-surface)',
                                    border: '1px solid var(--color-border-light)',
                                    boxShadow: 'var(--shadow-sm)',
                                    transition: 'all var(--transition-base)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div className="relative aspect-[2/3] overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={book.cover}
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                                        style={{
                                            background: 'rgba(45, 24, 16, 0.5)',
                                            transition: 'opacity var(--transition-base)',
                                        }}
                                    >
                                        <BookOpen size={32} style={{ color: '#F5EDE0' }} />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p
                                        className="text-sm font-medium text-center truncate"
                                        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
                                    >
                                        {book.title}
                                    </p>
                                    <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
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
