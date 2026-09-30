'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, MessageCircle, PenLine } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@/components/forum/ForumChrome';
import { htmlToText, normalizeTag, signInHref } from '@/lib/forum';
import { STORY_TOPIC_SLUGS, Story, listStories, topicLabel } from '@/lib/stories';
import type { ExternalSource, ExternalStory } from '@/lib/external-stories';

const SOURCE_LABELS: Record<ExternalSource, string> = { idt: 'ISKCON Desire Tree', dandavats: 'Dandavats' };
type SourceFilter = 'all' | 'fw' | ExternalSource;
type FeedItem =
    | { kind: 'own'; id: string; date: number; tags: string[]; story: Story }
    | { kind: 'ext'; id: string; date: number; tags: string[]; ext: ExternalStory };

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };
const fmtDate = (d: Date | null) =>
    d ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', ...(d.getFullYear() !== new Date().getFullYear() ? { year: 'numeric' } : {}) }) : 'Just now';

type Tab = { kind: 'all' } | { kind: 'mine' } | { kind: 'topic'; slug: string };

export default function StoriesPage() {
    const { user } = useAuth();
    const [stories, setStories] = useState<Story[] | null>(null);
    const [error, setError] = useState('');
    const [tab, setTab] = useState<Tab>({ kind: 'all' });
    const [external, setExternal] = useState<ExternalStory[]>([]);
    const [source, setSource] = useState<SourceFilter>('all');

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        const t = normalizeTag(new URLSearchParams(window.location.search).get('topic') ?? '');
        if (t) setTab({ kind: 'topic', slug: t });
        listStories()
            .then(setStories)
            .catch((e) => { console.error(e); setError('Could not load stories. Please try again later.'); setStories([]); });
        fetch('/api/external-stories')
            .then((r) => (r.ok ? r.json() : { stories: [] }))
            .then((d: { stories?: ExternalStory[] }) => setExternal(Array.isArray(d.stories) ? d.stories : []))
            .catch(() => setExternal([]));
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    const select = (t: Tab) => {
        setTab(t);
        window.history.replaceState(null, '', t.kind === 'topic' ? `/stories?topic=${t.slug}` : '/stories');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Topics in use first (by count), then the rest of the curated list.
    const topics = useMemo(() => {
        const m = new Map<string, number>();
        stories?.forEach((s) => s.tags.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)));
        external.forEach((s) => s.tags.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)));
        const used = [...m.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
        return [...used, ...STORY_TOPIC_SLUGS.filter((t) => !m.has(t))];
    }, [stories, external]);

    const visible = useMemo<FeedItem[]>(() => {
        if (!stories) return [];
        const own: FeedItem[] = stories.map((s) => ({ kind: 'own', id: s.id, date: s.createdAt?.getTime() ?? Number.MAX_SAFE_INTEGER, tags: s.tags, story: s }));
        if (tab.kind === 'mine') return own.filter((i) => i.kind === 'own' && i.story.authorId === user?.uid);
        const ext: FeedItem[] = external.map((e) => ({ kind: 'ext', id: e.id, date: e.date ? Date.parse(e.date) : 0, tags: e.tags, ext: e }));
        let items = [...own, ...ext];
        if (source === 'fw') items = own;
        else if (source !== 'all') items = ext.filter((i) => i.kind === 'ext' && i.ext.source === source);
        if (tab.kind === 'topic') items = items.filter((i) => i.tags.includes(tab.slug));
        return items.sort((a, b) => b.date - a.date);
    }, [stories, external, tab, source, user?.uid]);

    const tabBtn = (active: boolean) =>
        `whitespace-nowrap pb-3 text-sm cursor-pointer transition-colors ${active ? 'font-medium' : ''}`;
    const tabStyle = (active: boolean) => ({
        color: active ? '#242424' : '#6b6b6b',
        borderBottom: active ? '1px solid #242424' : '1px solid transparent',
    });

    const writeHref = user ? '/write' : signInHref('/write');

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1180px] mx-auto px-5 lg:px-8 flex gap-16">
                {/* Feed */}
                <div className="flex-1 min-w-0 max-w-[700px] pt-8">
                    <div className="flex gap-6 overflow-x-auto sticky top-16 bg-white pt-4 z-10" style={{ borderBottom: '1px solid #f2f2f2', scrollbarWidth: 'none' }}>
                        <button className={tabBtn(tab.kind === 'all')} style={tabStyle(tab.kind === 'all')} onClick={() => select({ kind: 'all' })}>For you</button>
                        {user && (
                            <button className={tabBtn(tab.kind === 'mine')} style={tabStyle(tab.kind === 'mine')} onClick={() => select({ kind: 'mine' })}>Your stories</button>
                        )}
                        {topics.slice(0, 14).map((t) => {
                            const active = tab.kind === 'topic' && tab.slug === t;
                            return <button key={t} className={tabBtn(active)} style={tabStyle(active)} onClick={() => select({ kind: 'topic', slug: t })}>{topicLabel(t)}</button>;
                        })}
                        {tab.kind === 'topic' && !topics.slice(0, 14).includes(tab.slug) && (
                            <button className={tabBtn(true)} style={tabStyle(true)}>{topicLabel(tab.slug)}</button>
                        )}
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-3 mt-6">
                        {tab.kind === 'topic' ? (
                            <h1 className="text-3xl font-bold" style={{ ...serif, color: '#242424' }}>{topicLabel(tab.slug)}</h1>
                        ) : <span />}
                        {tab.kind !== 'mine' && (
                            <select
                                value={source}
                                onChange={(e) => setSource(e.target.value as SourceFilter)}
                                className="text-sm px-2 py-1 rounded cursor-pointer outline-none"
                                style={{ border: '1px solid #e6e6e6', color: '#6b6b6b', background: '#fff' }}
                                aria-label="Filter by source"
                            >
                                <option value="all">All sources</option>
                                <option value="fw">Fourteen Worlds writers</option>
                                <option value="dandavats">Dandavats</option>
                                <option value="idt">ISKCON Desire Tree</option>
                            </select>
                        )}
                    </div>

                    {stories === null && <p className="py-16 text-center" style={{ color: '#6b6b6b' }}>Loading stories…</p>}
                    {error && <p className="py-8 text-center text-red-600">{error}</p>}

                    {stories && !error && visible.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-lg mb-5" style={{ ...serif, color: '#6b6b6b' }}>
                                {tab.kind === 'mine' ? 'You haven’t published any stories yet.' : 'No stories here yet — be the first to share one.'}
                            </p>
                            <Link href={writeHref} className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white" style={{ background: 'var(--color-middle)' }}>
                                <PenLine size={16} /> Write a story
                            </Link>
                        </div>
                    )}

                    <ul>
                        {visible.map((item) => {
                            const isExt = item.kind === 'ext';
                            const title = isExt ? item.ext.title : item.story.title;
                            const blurb = isExt ? item.ext.excerpt : (item.story.subtitle || htmlToText(item.story.body).slice(0, 220));
                            const image = isExt ? item.ext.image : item.story.coverImage;
                            const author = isExt ? item.ext.author : item.story.authorName;
                            const date = isExt ? (item.ext.date ? new Date(item.ext.date) : null) : item.story.createdAt;
                            const linkProps = isExt
                                ? { href: item.ext.url, target: '_blank', rel: 'noopener noreferrer' }
                                : { href: `/stories/${item.story.id}` };
                            const Anchor = isExt ? 'a' : Link;
                            return (
                                <li key={item.id} className="py-7" style={{ borderBottom: '1px solid #f2f2f2' }}>
                                    <div className="flex items-center gap-2 text-[13px] mb-2" style={{ color: '#242424' }}>
                                        <Avatar name={isExt ? SOURCE_LABELS[item.ext.source] : author} photo={isExt ? null : item.story.authorPhoto} size={22} />
                                        {isExt ? (
                                            <span>
                                                <span style={{ color: '#6b6b6b' }}>In </span>{SOURCE_LABELS[item.ext.source]}
                                                {author && author !== SOURCE_LABELS[item.ext.source] && <><span style={{ color: '#6b6b6b' }}> by </span>{author}</>}
                                            </span>
                                        ) : <span>{author}</span>}
                                    </div>
                                    <Anchor {...linkProps} className="flex gap-6 sm:gap-10 items-start group">
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-xl sm:text-[22px] font-bold leading-snug group-hover:underline decoration-1" style={{ color: '#242424' }}>{title}</h2>
                                            <p className="mt-1.5 line-clamp-2 sm:line-clamp-3" style={{ color: '#6b6b6b' }}>{blurb}</p>
                                        </div>
                                        {image && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={image} alt="" loading="lazy" referrerPolicy="no-referrer" className="w-20 h-14 sm:w-40 sm:h-[107px] object-cover flex-shrink-0" />
                                        )}
                                    </Anchor>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-[13px]" style={{ color: '#6b6b6b' }}>
                                        <span>{fmtDate(date)}</span>
                                        <span>·</span>
                                        {isExt ? (
                                            <a href={item.ext.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-black">
                                                Read on {SOURCE_LABELS[item.ext.source]} <ExternalLink size={12} />
                                            </a>
                                        ) : (
                                            <>
                                                <span>{item.story.readingMinutes} min read</span>
                                                {item.story.responseCount > 0 && (
                                                    <span className="inline-flex items-center gap-1"><MessageCircle size={14} /> {item.story.responseCount}</span>
                                                )}
                                            </>
                                        )}
                                        {item.tags.slice(0, 3).map((t) => (
                                            <button key={t} onClick={() => select({ kind: 'topic', slug: t })} className="px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-[#e8e8e8]" style={{ background: '#f2f2f2', color: '#242424' }}>
                                                {topicLabel(t)}
                                            </button>
                                        ))}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Right column */}
                <aside className="hidden xl:block w-[320px] flex-shrink-0 pt-10" style={{ borderLeft: '1px solid #f2f2f2', paddingLeft: 40 }}>
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
                            {topics.slice(0, 16).map((t) => (
                                <button key={t} onClick={() => select({ kind: 'topic', slug: t })} className="px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-[#e8e8e8]" style={{ background: '#f2f2f2', color: '#242424' }}>
                                    {topicLabel(t)}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
