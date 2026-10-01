'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PenLine } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { normalizeTag, signInHref } from '@/lib/forum';
import { groupFor, isGroup, matchesTopic, relatedTopics, topicName } from '@/lib/story-topics';
import { StoryCard, StoryRow, serif, useStoryFeed } from '@/components/stories/feed';
import { TopicBar } from '@/components/stories/TopicBar';
import { useTopicPrefs } from '@/components/stories/useTopicPrefs';

export default function TopicPage() {
    const params = useParams<{ slug: string }>();
    const slug = normalizeTag(decodeURIComponent(params.slug ?? ''));
    const { user } = useAuth();
    const { items } = useStoryFeed();
    const { followed, muted, toggleFollow, toggleMute } = useTopicPrefs();

    const name = topicName(slug);
    const group = groupFor(slug);
    const related = relatedTopics(slug);
    const stories = useMemo(() => (items ?? []).filter((i) => matchesTopic(i.tags, slug)), [items, slug]);
    const covers = useMemo(() => stories.map((i) => (i.kind === 'ext' ? i.ext.image : i.story.coverImage)).filter((x): x is string => !!x).slice(0, 3), [stories]);
    const featured = stories.slice(0, 6);
    const rest = stories.slice(6);
    const isFollowing = followed.includes(slug);
    const isMuted = muted.includes(slug);
    const writeHref = user ? '/write' : signInHref('/write');

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1180px] mx-auto px-5 lg:px-8 pt-6">
                <TopicBar topics={related} active={slug} followed={followed} onToggleFollow={toggleFollow} />

                {/* Header */}
                <div className="mt-4 flex flex-col md:flex-row items-stretch" style={{ borderTop: '1px solid #f2f2f2', borderBottom: '1px solid #f2f2f2' }}>
                    <div className="flex-1 py-10 md:pr-10">
                        {group && !isGroup(slug) && (
                            <Link href={`/stories/tag/${group.slug}`} className="text-sm hover:underline" style={{ color: '#6b6b6b' }}>{group.label}</Link>
                        )}
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-1" style={{ color: '#242424' }}>{name}</h1>
                        <p className="mt-3 text-sm" style={{ color: '#6b6b6b' }}>
                            Topic · {items === null ? '…' : `${stories.length} ${stories.length === 1 ? 'story' : 'stories'}`}
                            {isGroup(slug) && group && ` · ${group.description}`}
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <button
                                onClick={() => toggleFollow(slug)}
                                className="px-5 py-2.5 rounded-full text-[15px] cursor-pointer"
                                style={isFollowing ? { border: '1px solid #242424', color: '#242424' } : { background: '#242424', color: '#fff' }}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                            <button
                                onClick={() => toggleMute(slug)}
                                className="px-5 py-2.5 rounded-full text-[15px] cursor-pointer"
                                style={{ border: '1px solid #e6e6e6', color: '#242424' }}
                            >
                                {isMuted ? 'Unmute' : 'Mute'}
                            </button>
                        </div>
                    </div>
                    {covers.length > 0 && (
                        <div className="hidden md:flex w-[46%] max-w-[620px] min-h-[260px]">
                            {covers.map((src, i) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img key={src} src={src} alt="" referrerPolicy="no-referrer" className="h-full object-cover" style={{ width: `${[60, 25, 15][i] ?? 15}%`, filter: i === 0 ? 'none' : 'saturate(0.85)' }} />
                            ))}
                        </div>
                    )}
                </div>

                {items === null && <p className="py-16 text-center" style={{ color: '#6b6b6b' }}>Loading stories…</p>}

                {items && stories.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-lg mb-5" style={{ ...serif, color: '#6b6b6b' }}>No stories in {name} yet — be the first to write one.</p>
                        <Link href={writeHref} className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white" style={{ background: 'var(--color-middle)' }}>
                            <PenLine size={16} /> Write a story
                        </Link>
                    </div>
                )}

                {featured.length > 0 && (
                    <section className="py-12">
                        <h2 className="text-2xl font-bold mb-8" style={{ color: '#242424' }}>Recommended stories</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                            {featured.map((item) => <StoryCard key={item.id} item={item} />)}
                        </div>
                    </section>
                )}

                {rest.length > 0 && (
                    <section className="pb-20 max-w-[700px]" style={{ borderTop: '1px solid #f2f2f2' }}>
                        <h2 className="text-2xl font-bold mt-10" style={{ color: '#242424' }}>More in {name}</h2>
                        <ul>{rest.map((item) => <StoryRow key={item.id} item={item} />)}</ul>
                    </section>
                )}
            </div>
        </div>
    );
}
