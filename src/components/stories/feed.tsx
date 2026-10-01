'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, MessageCircle } from 'lucide-react';
import { Avatar } from '@/components/forum/ForumChrome';
import { htmlToText } from '@/lib/forum';
import { Story, listStories } from '@/lib/stories';
import { topicName } from '@/lib/story-topics';
import type { ExternalSource, ExternalStory } from '@/lib/external-stories';

export const SOURCE_LABELS: Record<ExternalSource, string> = { idt: 'ISKCON Desire Tree', dandavats: 'Dandavats' };
export const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

export type FeedItem =
    | { kind: 'own'; id: string; date: number; tags: string[]; story: Story }
    | { kind: 'ext'; id: string; date: number; tags: string[]; ext: ExternalStory };

export function itemView(item: FeedItem) {
    const isExt = item.kind === 'ext';
    return {
        isExt,
        title: isExt ? item.ext.title : item.story.title,
        blurb: isExt ? item.ext.excerpt : item.story.subtitle || htmlToText(item.story.body).slice(0, 220),
        image: isExt ? item.ext.image : item.story.coverImage,
        author: isExt ? item.ext.author : item.story.authorName,
        photo: isExt ? null : item.story.authorPhoto,
        source: isExt ? SOURCE_LABELS[item.ext.source] : null,
        date: isExt ? (item.ext.date ? new Date(item.ext.date) : null) : item.story.createdAt,
        href: isExt ? item.ext.url : `/stories/${item.story.id}`,
        external: isExt,
    };
}

export const fmtDate = (d: Date | null) =>
    d ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', ...(d.getFullYear() !== new Date().getFullYear() ? { year: 'numeric' } : {}) }) : 'Just now';

/* ---------- data ---------- */

type FeedData = { items: FeedItem[]; ownError: boolean };
let cache: { at: number; promise: Promise<FeedData> } | null = null;
const TTL = 60_000;

export function invalidateStoryFeed() { cache = null; }

async function loadFeed(): Promise<FeedData> {
    const [own, ext] = await Promise.all([
        listStories().then((s) => ({ s, err: false })).catch((e) => { console.error(e); return { s: [] as Story[], err: true }; }),
        fetch('/api/external-stories')
            .then((r) => (r.ok ? r.json() : { stories: [] }))
            .then((d: { stories?: ExternalStory[] }) => (Array.isArray(d.stories) ? d.stories : []))
            .catch(() => [] as ExternalStory[]),
    ]);
    const items: FeedItem[] = [
        ...own.s.map((s): FeedItem => ({ kind: 'own', id: s.id, date: s.createdAt?.getTime() ?? Number.MAX_SAFE_INTEGER, tags: s.tags, story: s })),
        ...ext.map((e): FeedItem => ({ kind: 'ext', id: e.id, date: e.date ? Date.parse(e.date) : 0, tags: e.tags, ext: e })),
    ].sort((a, b) => b.date - a.date);
    return { items, ownError: own.err };
}

/** All stories (own + community), shared across story pages for a minute. */
export function useStoryFeed() {
    const [data, setData] = useState<FeedData | null>(null);
    useEffect(() => {
        if (!cache || Date.now() - cache.at > TTL) cache = { at: Date.now(), promise: loadFeed() };
        let alive = true;
        cache.promise.then((d) => { if (alive) setData(d); });
        return () => { alive = false; };
    }, []);
    return { items: data?.items ?? null, ownError: data?.ownError ?? false };
}

/** Story counts per tag. */
export function tagCounts(items: FeedItem[] | null): Map<string, number> {
    const m = new Map<string, number>();
    items?.forEach((i) => i.tags.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)));
    return m;
}

/* ---------- views ---------- */

function Anchor({ href, external, className, children }: { href: string; external: boolean; className?: string; children: React.ReactNode }) {
    return external
        ? <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
        : <Link href={href} className={className}>{children}</Link>;
}

function Byline({ v, size = 22 }: { v: ReturnType<typeof itemView>; size?: number }) {
    return (
        <div className="flex items-center gap-2 text-[13px]" style={{ color: '#242424' }}>
            <Avatar name={v.source ?? v.author} photo={v.photo} size={size} />
            {v.source ? (
                <span className="truncate">
                    <span style={{ color: '#6b6b6b' }}>In </span>{v.source}
                    {v.author && v.author !== v.source && <><span style={{ color: '#6b6b6b' }}> by </span>{v.author}</>}
                </span>
            ) : <span className="truncate">{v.author}</span>}
        </div>
    );
}

function Meta({ item, v, limitTags = 3 }: { item: FeedItem; v: ReturnType<typeof itemView>; limitTags?: number }) {
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]" style={{ color: '#6b6b6b' }}>
            <span>{fmtDate(v.date)}</span>
            {item.kind === 'ext' ? (
                <a href={item.ext.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-black">
                    Read on {v.source} <ExternalLink size={12} />
                </a>
            ) : (
                <>
                    <span>·</span>
                    <span>{item.story.readingMinutes} min read</span>
                    {item.story.responseCount > 0 && <span className="inline-flex items-center gap-1"><MessageCircle size={14} /> {item.story.responseCount}</span>}
                </>
            )}
            {item.tags.slice(0, limitTags).map((t) => (
                <Link key={t} href={`/stories/tag/${t}`} className="px-2.5 py-0.5 rounded-full hover:bg-[#e8e8e8]" style={{ background: '#f2f2f2', color: '#242424' }}>
                    {topicName(t)}
                </Link>
            ))}
        </div>
    );
}

/** Medium-style list row: text left, thumbnail right. */
export function StoryRow({ item }: { item: FeedItem }) {
    const v = itemView(item);
    return (
        <li className="py-7" style={{ borderBottom: '1px solid #f2f2f2' }}>
            <div className="mb-2"><Byline v={v} /></div>
            <Anchor href={v.href} external={v.external} className="flex gap-6 sm:gap-10 items-start group">
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-[22px] font-bold leading-snug group-hover:underline decoration-1" style={{ color: '#242424' }}>{v.title}</h2>
                    <p className="mt-1.5 line-clamp-2 sm:line-clamp-3" style={{ color: '#6b6b6b' }}>{v.blurb}</p>
                </div>
                {v.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.image} alt="" loading="lazy" referrerPolicy="no-referrer" className="w-20 h-14 sm:w-40 sm:h-[107px] object-cover flex-shrink-0" />
                )}
            </Anchor>
            <div className="mt-4"><Meta item={item} v={v} /></div>
        </li>
    );
}

/** Medium tag-page card: image on top. */
export function StoryCard({ item }: { item: FeedItem }) {
    const v = itemView(item);
    return (
        <article className="flex flex-col">
            <Anchor href={v.href} external={v.external} className="group block">
                <div className="aspect-[16/9] overflow-hidden mb-4" style={{ background: 'var(--color-bg-warm)' }}>
                    {v.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={v.image} alt="" loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl" style={{ ...serif, color: 'var(--color-secondary)' }}>ॐ</div>
                    )}
                </div>
            </Anchor>
            <div className="mb-2"><Byline v={v} size={20} /></div>
            <Anchor href={v.href} external={v.external} className="group">
                <h3 className="text-xl font-bold leading-snug group-hover:underline decoration-1" style={{ color: '#242424' }}>{v.title}</h3>
                <p className="mt-1.5 line-clamp-2" style={{ color: '#6b6b6b' }}>{v.blurb}</p>
            </Anchor>
            <div className="mt-3"><Meta item={item} v={v} limitTags={2} /></div>
        </article>
    );
}
