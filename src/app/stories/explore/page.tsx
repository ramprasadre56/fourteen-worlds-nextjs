'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { TOPIC_GROUPS, searchTopics, topicName } from '@/lib/story-topics';
import { tagCounts, useStoryFeed } from '@/components/stories/feed';
import { TopicBar } from '@/components/stories/TopicBar';

export default function ExploreTopicsPage() {
    const { items } = useStoryFeed();
    const [q, setQ] = useState('');
    const counts = useMemo(() => tagCounts(items), [items]);
    const results = useMemo(() => searchTopics(q), [q]);
    const groupCount = (children: string[]) => {
        if (!items) return null;
        return items.filter((i) => i.tags.some((t) => children.includes(t))).length;
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1180px] mx-auto px-5 lg:px-8 pt-6">
                <TopicBar topics={TOPIC_GROUPS.map((g) => g.slug)} exploreActive />

                <h1 className="text-4xl sm:text-5xl font-bold text-center mt-12 tracking-tight" style={{ color: '#242424' }}>Explore topics</h1>
                <div className="max-w-[720px] mx-auto mt-8 relative">
                    <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2" style={{ color: '#6b6b6b' }} />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search all topics"
                        className="w-full pl-14 pr-6 py-4 rounded-full outline-none"
                        style={{ background: '#f9f9f9', color: '#242424' }}
                        aria-label="Search all topics"
                    />
                </div>

                {q.trim() ? (
                    <div className="max-w-[720px] mx-auto mt-8 flex flex-wrap gap-2 justify-center">
                        {results.length === 0 && <p style={{ color: '#6b6b6b' }}>No topics match “{q}”.</p>}
                        {results.map((slug) => (
                            <Link key={slug} href={`/stories/tag/${slug}`} className="px-4 py-2 rounded-full hover:bg-[#e8e8e8]" style={{ background: '#f2f2f2', color: '#242424' }}>
                                {topicName(slug)}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 mt-16 pb-20">
                        {TOPIC_GROUPS.map((g) => {
                            const n = groupCount(g.children);
                            return (
                                <section key={g.slug}>
                                    <Link href={`/stories/tag/${g.slug}`} className="block group">
                                        <h2 className="text-lg font-bold group-hover:underline" style={{ color: '#242424' }}>{g.label}</h2>
                                        <p className="text-sm mt-1 mb-4" style={{ color: '#6b6b6b' }}>
                                            {g.description}{n !== null && ` · ${n} ${n === 1 ? 'story' : 'stories'}`}
                                        </p>
                                    </Link>
                                    <ul className="space-y-2.5">
                                        {g.children.map((c) => (
                                            <li key={c}>
                                                <Link href={`/stories/tag/${c}`} className="text-[15px] hover:underline" style={{ color: '#242424' }}>
                                                    {topicName(c)}
                                                </Link>
                                                {counts.get(c) ? <span className="ml-2 text-xs" style={{ color: '#6b6b6b' }}>{counts.get(c)}</span> : null}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
