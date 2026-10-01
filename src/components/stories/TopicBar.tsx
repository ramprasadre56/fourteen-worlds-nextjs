'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, Compass, Plus } from 'lucide-react';
import { topicName } from '@/lib/story-topics';

type Props = {
    topics: string[];
    active?: string;
    exploreActive?: boolean;
    /** When given, each pill gets a +/✓ follow toggle (Medium tag-page style). */
    followed?: string[];
    onToggleFollow?: (slug: string) => void;
};

/** Horizontal, scrollable row of topic pills led by "Explore topics". */
export function TopicBar({ topics, active, exploreActive, followed, onToggleFollow }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [edges, setEdges] = useState({ left: false, right: false });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const update = () => setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
        update();
        el.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
    }, [topics]);

    const scrollBy = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: 'smooth' });
    const compact = !!onToggleFollow;

    return (
        <div className="relative">
            {edges.left && (
                <button onClick={() => scrollBy(-320)} aria-label="Scroll topics left" className="absolute left-0 top-0 bottom-0 z-10 pr-8 pl-1 flex items-center cursor-pointer" style={{ background: 'linear-gradient(90deg, #fff 55%, transparent)' }}>
                    <ChevronLeft size={20} style={{ color: '#6b6b6b' }} />
                </button>
            )}
            <div ref={ref} className="flex items-center gap-2 overflow-x-auto py-1" style={{ scrollbarWidth: 'none' }}>
                <Link
                    href="/stories/explore"
                    className={`flex-shrink-0 inline-flex items-center gap-2 rounded-full whitespace-nowrap ${compact ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'} mr-3`}
                    style={{ border: `1px solid ${exploreActive ? '#242424' : '#e6e6e6'}`, color: '#242424', background: exploreActive ? '#f9f9f9' : '#fff' }}
                >
                    <Compass size={compact ? 16 : 18} strokeWidth={1.6} /> Explore topics
                </Link>
                {topics.map((slug) => {
                    const isActive = slug === active;
                    const isFollowed = followed?.includes(slug);
                    return (
                        <span
                            key={slug}
                            className="flex-shrink-0 inline-flex items-center rounded-full whitespace-nowrap"
                            style={{
                                background: isActive ? '#242424' : compact ? '#fff' : '#f2f2f2',
                                border: compact ? `1px solid ${isActive ? '#242424' : '#e6e6e6'}` : '1px solid transparent',
                            }}
                        >
                            <Link
                                href={`/stories/tag/${slug}`}
                                className={compact ? 'pl-3.5 pr-2 py-1.5 text-sm' : 'px-4 py-2'}
                                style={{ color: isActive ? '#fff' : '#242424' }}
                            >
                                {topicName(slug)}
                            </Link>
                            {onToggleFollow && (
                                <button
                                    onClick={() => onToggleFollow(slug)}
                                    aria-label={isFollowed ? `Unfollow ${topicName(slug)}` : `Follow ${topicName(slug)}`}
                                    title={isFollowed ? 'Following' : 'Follow'}
                                    className="pl-2 pr-3 py-1.5 cursor-pointer"
                                    style={{ borderLeft: `1px solid ${isActive ? '#555' : '#e6e6e6'}`, color: isActive ? '#fff' : '#6b6b6b' }}
                                >
                                    {isFollowed ? <Check size={15} /> : <Plus size={15} />}
                                </button>
                            )}
                        </span>
                    );
                })}
            </div>
            {edges.right && (
                <button onClick={() => scrollBy(320)} aria-label="Scroll topics right" className="absolute right-0 top-0 bottom-0 z-10 pl-8 pr-1 flex items-center cursor-pointer" style={{ background: 'linear-gradient(270deg, #fff 55%, transparent)' }}>
                    <ChevronRight size={20} style={{ color: '#6b6b6b' }} />
                </button>
            )}
        </div>
    );
}
