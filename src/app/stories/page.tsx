'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PenLine } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signInHref } from '@/lib/forum';
import { TOPIC_GROUPS, matchesTopic, topicName } from '@/lib/story-topics';
import { SOURCE_LABELS, StoryRow, serif, tagCounts, useStoryFeed } from '@/components/stories/feed';
import { TopicBar } from '@/components/stories/TopicBar';
import { useTopicPrefs } from '@/components/stories/useTopicPrefs';
import type { ExternalSource } from '@/lib/external-stories';

type Tab = 'for-you' | 'following' | 'mine';
type SourceFilter = 'all' | 'fw' | ExternalSource;

export default function StoriesPage() {
    const { user } = useAuth();
    const { items, ownError } = useStoryFeed();
    const { followed, muted } = useTopicPrefs();
    const [tab, setTab] = useState<Tab>('for-you');
    const [source, setSource] = useState<SourceFilter>('all');

    // Followed topics first in the bar, then the main topics.
    const barTopics = useMemo(() => [...followed, ...TOPIC_GROUPS.map((g) => g.slug).filter((s) => !followed.includes(s))], [followed]);
    const counts = useMemo(() => tagCounts(items), [items]);
    const recommended = useMemo(() => [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14).map(([t]) => t), [counts]);

    const visible = useMemo(() => {
        if (!items) return [];
        let list = items;
        if (tab === 'mine') return list.filter((i) => i.kind === 'own' && i.story.authorId === user?.uid);
        if (tab === 'following') list = list.filter((i) => followed.some((f) => matchesTopic(i.tags, f)));
        else if (muted.length) list = list.filter((i) => !muted.some((m) => matchesTopic(i.tags, m)));
        if (source === 'fw') list = list.filter((i) => i.kind === 'own');
        else if (source !== 'all') list = list.filter((i) => i.kind === 'ext' && i.ext.source === source);
        return list;
    }, [items, tab, source, followed, muted, user?.uid]);

    const writeHref = user ? '/write' : signInHref('/write');
    const tabs: [Tab, string][] = [['for-you', 'For you'], ['following', 'Following'], ...(user ? [['mine', 'Your stories'] as [Tab, string]] : [])];

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1180px] mx-auto px-5 lg:px-8 pt-6">
                <TopicBar topics={barTopics} />
            </div>

            <div className="max-w-[1180px] mx-auto px-5 lg:px-8 flex gap-16">
                <div className="flex-1 min-w-0 max-w-[700px]">
                    <div className="flex items-end justify-between gap-4 mt-6 sticky top-16 bg-white pt-3 z-10" style={{ borderBottom: '1px solid #f2f2f2' }}>
                        <div className="flex gap-6">
                            {tabs.map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => setTab(key)}
                                    className="whitespace-nowrap pb-3 text-sm cursor-pointer"
                                    style={{ color: tab === key ? '#242424' : '#6b6b6b', borderBottom: `1px solid ${tab === key ? '#242424' : 'transparent'}`, fontWeight: tab === key ? 500 : 400 }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        {tab !== 'mine' && (
                            <select
                                value={source}
                                onChange={(e) => setSource(e.target.value as SourceFilter)}
                                className="mb-2 text-sm px-2 py-1 rounded cursor-pointer outline-none"
                                style={{ border: '1px solid #e6e6e6', color: '#6b6b6b', background: '#fff' }}
                                aria-label="Filter by source"
                            >
                                <option value="all">All sources</option>
                                <option value="fw">Fourteen Worlds writers</option>
                                <option value="dandavats">{SOURCE_LABELS.dandavats}</option>
                                <option value="idt">{SOURCE_LABELS.idt}</option>
                            </select>
                        )}
                    </div>

                    {items === null && <p className="py-16 text-center" style={{ color: '#6b6b6b' }}>Loading stories…</p>}
                    {ownError && tab === 'mine' && <p className="py-6 text-center text-red-600">Could not load your stories. Please try again later.</p>}

                    {items && visible.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-lg mb-5" style={{ ...serif, color: '#6b6b6b' }}>
                                {tab === 'mine' ? 'You haven’t published any stories yet.'
                                    : tab === 'following' ? (followed.length ? 'No stories in the topics you follow yet.' : 'Follow topics to build your feed.')
                                        : 'No stories here yet — be the first to share one.'}
                            </p>
                            {tab === 'following' && !followed.length ? (
                                <Link href="/stories/explore" className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white" style={{ background: '#242424' }}>Explore topics</Link>
                            ) : (
                                <Link href={writeHref} className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white" style={{ background: 'var(--color-middle)' }}>
                                    <PenLine size={16} /> Write a story
                                </Link>
                            )}
                        </div>
                    )}

                    <ul>{visible.map((item) => <StoryRow key={item.id} item={item} />)}</ul>
                </div>

                <aside className="hidden xl:block w-[320px] flex-shrink-0 pt-8" style={{ borderLeft: '1px solid #f2f2f2', paddingLeft: 40 }}>
                    <div className="sticky top-24">
                        <div className="rounded-lg p-5 mb-8" style={{ background: 'var(--color-bg-warm)' }}>
                            <h3 className="font-bold mb-1" style={{ ...serif, color: 'var(--color-primary)' }}>Share your realizations</h3>
                            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                                Festivals, yatra reports, book distribution, homages, how you came to Krishna — write it for the devotee community.
                            </p>
                            <Link href={writeHref} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-white" style={{ background: 'var(--color-primary)' }}>
                                <PenLine size={15} /> Write
                            </Link>
                        </div>
                        <h3 className="font-medium mb-4" style={{ color: '#242424' }}>Recommended topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {recommended.map((t) => (
                                <Link key={t} href={`/stories/tag/${t}`} className="px-4 py-2 rounded-full text-sm hover:bg-[#e8e8e8]" style={{ background: '#f2f2f2', color: '#242424' }}>
                                    {topicName(t)}
                                </Link>
                            ))}
                        </div>
                        <Link href="/stories/explore" className="inline-block mt-4 text-sm hover:underline" style={{ color: 'var(--color-middle)' }}>See more topics</Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}
