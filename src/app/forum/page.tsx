'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Search } from 'lucide-react';
import { FORUM_CATEGORIES, ForumTopic, POST_TYPES, htmlToText, listTopics, normalizeTag, timeAgo } from '@/lib/forum';
import { AskButton, Avatar, ForumHeader, TagChip } from '@/components/forum/ForumChrome';

type Sort = 'activity' | 'newest' | 'replies';
const ALL = 'All Discussions';

export default function ForumPage() {
    const [topics, setTopics] = useState<ForumTopic[] | null>(null);
    const [error, setError] = useState('');
    const [category, setCategory] = useState<string>(ALL);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<Sort>('activity');
    const [tag, setTag] = useState('');

    // Read ?category= / ?tag= after mount (window is not available during SSR)
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const c = params.get('category');
        if (c && (FORUM_CATEGORIES as readonly string[]).includes(c)) setCategory(c);
        const t = normalizeTag(params.get('tag') ?? '');
        if (t) setTag(t);
        listTopics()
            .then(setTopics)
            .catch((e) => {
                console.error(e);
                setError('Could not load discussions. Please try again later.');
                setTopics([]);
            });
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    const syncUrl = (c: string, t: string) => {
        const p = new URLSearchParams();
        if (c !== ALL) p.set('category', c);
        if (t) p.set('tag', t);
        const qs = p.toString();
        window.history.replaceState(null, '', qs ? `/forum?${qs}` : '/forum');
    };
    const selectCategory = (c: string) => { setCategory(c); syncUrl(c, tag); };
    const selectTag = (t: string) => { setTag(t); syncUrl(category, t); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    const popularTags = useMemo(() => {
        const m = new Map<string, number>();
        topics?.forEach((t) => t.tags.forEach((x) => m.set(x, (m.get(x) ?? 0) + 1)));
        return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([x]) => x);
    }, [topics]);

    const counts = useMemo(() => {
        const m = new Map<string, number>();
        topics?.forEach((t) => m.set(t.category, (m.get(t.category) ?? 0) + 1));
        return m;
    }, [topics]);

    const visible = useMemo(() => {
        if (!topics) return [];
        const q = search.trim().toLowerCase();
        const list = topics
            .filter((t) => category === ALL || t.category === category)
            .filter((t) => !tag || t.tags.includes(tag))
            .map((t) => ({ ...t, excerpt: htmlToText(t.body) }))
            .filter((t) => !q || t.title.toLowerCase().includes(q) || t.excerpt.toLowerCase().includes(q) || t.tags.some((x) => x.includes(q)));
        const time = (d: Date | null) => d?.getTime() ?? Number.MAX_SAFE_INTEGER; // pending server time = newest
        if (sort === 'newest') list.sort((a, b) => time(b.createdAt) - time(a.createdAt));
        else if (sort === 'replies') list.sort((a, b) => b.replyCount - a.replyCount);
        else list.sort((a, b) => time(b.lastActivityAt) - time(a.lastActivityAt));
        return list;
    }, [topics, category, search, sort, tag]);

    return (
        <div className="min-h-screen py-8" style={{ background: 'var(--color-bg)' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <ForumHeader subtitle="Ask questions and discuss spiritual topics with fellow seekers." />

                {/* Category tabs */}
                <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1" style={{ scrollbarWidth: 'thin' }}>
                    {[ALL, ...FORUM_CATEGORIES].map((c) => {
                        const active = c === category;
                        const n = c === ALL ? topics?.length : counts.get(c);
                        return (
                            <button
                                key={c}
                                onClick={() => selectCategory(c)}
                                className="whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors"
                                style={{
                                    background: active ? 'var(--color-primary)' : 'var(--color-surface)',
                                    color: active ? '#fff' : 'var(--color-text-secondary)',
                                    border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                }}
                            >
                                {c}{n ? ` (${n})` : ''}
                            </button>
                        );
                    })}
                </div>

                {(popularTags.length > 0 || tag) && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        <span className="text-sm mr-1" style={{ color: 'var(--color-text-muted)' }}>Tags:</span>
                        {tag && !popularTags.includes(tag) && <TagChip tag={tag} active onClick={() => selectTag('')} />}
                        {popularTags.map((x) => (
                            <TagChip key={x} tag={x} active={x === tag} onClick={() => selectTag(x === tag ? '' : x)} />
                        ))}
                        {tag && (
                            <button onClick={() => selectTag('')} className="text-xs ml-1 underline cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>clear tag</button>
                        )}
                    </div>
                )}

                <div className="rounded-xl p-4 sm:p-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 pb-4 mb-2" style={{ borderBottom: '1px solid var(--color-divider)' }}>
                        <h2 className="font-semibold flex-1" style={{ color: 'var(--color-primary)' }}>
                            {category}{tag && ` · #${tag}`} {topics && `(${visible.length})`}
                        </h2>
                        <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Sort by
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as Sort)}
                                className="px-2 py-1.5 rounded-md cursor-pointer"
                                style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
                            >
                                <option value="activity">Latest Activity</option>
                                <option value="newest">Newest</option>
                                <option value="replies">Most Replies</option>
                            </select>
                        </label>
                        <div className="relative sm:w-64">
                            <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-light)' }} />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search discussions…"
                                className="w-full pl-8 pr-3 py-1.5 rounded-md text-sm outline-none"
                                style={{ border: '1px solid var(--color-border)' }}
                            />
                        </div>
                    </div>

                    {topics === null && <p className="py-10 text-center" style={{ color: 'var(--color-text-muted)' }}>Loading discussions…</p>}
                    {error && <p className="py-6 text-center text-red-600">{error}</p>}

                    {topics && !error && visible.length === 0 && (
                        <div className="py-14 text-center">
                            <MessageSquare size={40} className="mx-auto mb-3" style={{ color: 'var(--color-secondary)' }} />
                            <p className="mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                {search ? 'No discussions match your search.' : 'No discussions here yet. Be the first to ask!'}
                            </p>
                            <AskButton />
                        </div>
                    )}

                    <ul>
                        {visible.map((t) => (
                            <li key={t.id} className="py-4 flex gap-3" style={{ borderBottom: '1px solid var(--color-divider)' }}>
                                <Avatar name={t.authorName} photo={t.authorPhoto} />
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        <span className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t.authorName}</span>
                                        <span>·</span>
                                        <button onClick={() => selectCategory(t.category)} className="px-2 py-0.5 rounded-full cursor-pointer" style={{ background: 'rgba(212,168,83,0.15)', color: 'var(--color-secondary-dark)' }}>
                                            {t.category}
                                        </button>
                                        <span>·</span>
                                        <span>{POST_TYPES[t.type].label}</span>
                                        <span>·</span>
                                        <span>{timeAgo(t.createdAt)}</span>
                                    </div>
                                    <Link href={`/forum/${t.id}`} className="block mt-1 text-lg font-semibold hover:underline" style={{ color: 'var(--color-text)' }}>
                                        {t.title}
                                    </Link>
                                    {t.excerpt && (
                                        <p className="mt-1 text-sm line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{t.excerpt}</p>
                                    )}
                                    {t.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {t.tags.map((x) => <TagChip key={x} tag={x} active={x === tag} onClick={() => selectTag(x)} />)}
                                        </div>
                                    )}
                                </div>
                                <Link href={`/forum/${t.id}#replies`} className="flex flex-col items-center justify-center px-3 text-sm flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                                    <span className="text-lg font-semibold" style={{ color: 'var(--color-primary)' }}>{t.replyCount}</span>
                                    {t.replyCount === 1 ? 'reply' : 'replies'}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
