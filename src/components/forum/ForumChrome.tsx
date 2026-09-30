'use client';

import Link from 'next/link';
import { MessageCirclePlus, PenLine } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signInHref } from '@/lib/forum';

export function Avatar({ name, photo, size = 40 }: { name: string; photo: string | null; size?: number }) {
    if (photo) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={photo} alt="" referrerPolicy="no-referrer" className="rounded-full object-cover flex-shrink-0" style={{ width: size, height: size }} />;
    }
    return (
        <span
            className="rounded-full flex items-center justify-center font-semibold flex-shrink-0"
            style={{ width: size, height: size, fontSize: size * 0.42, background: 'rgba(212,168,83,0.2)', color: 'var(--color-primary)' }}
        >
            {(name.trim()[0] || '?').toUpperCase()}
        </span>
    );
}

export function AskButton() {
    const { user } = useAuth();
    return (
        <Link
            href={user ? '/forum/new' : signInHref('/forum/new')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
        >
            <MessageCirclePlus size={18} />
            Ask a Question
        </Link>
    );
}

export function StoryButton() {
    const { user } = useAuth();
    const href = '/write';
    return (
        <Link
            href={user ? href : signInHref(href)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:opacity-90 transition-opacity"
            style={{ background: 'var(--color-surface)', color: 'var(--color-primary)', border: '1px solid var(--color-secondary)' }}
        >
            <PenLine size={18} />
            Share a Story
        </Link>
    );
}

export function TagChip({ tag, onClick, active }: { tag: string; onClick?: () => void; active?: boolean }) {
    const style = {
        background: active ? 'var(--color-accent)' : 'rgba(107,66,38,0.08)',
        color: active ? '#fff' : 'var(--color-accent)',
    };
    const cls = 'inline-block px-2 py-0.5 rounded-full text-xs cursor-pointer hover:opacity-80';
    return onClick
        ? <button type="button" onClick={onClick} className={cls} style={style}>#{tag}</button>
        : <Link href={`/forum?tag=${encodeURIComponent(tag)}`} className={cls} style={style}>#{tag}</Link>;
}

export function ForumHeader({ subtitle }: { subtitle?: string }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
                <Link href="/forum" className="text-sm font-medium" style={{ color: 'var(--color-secondary-dark)' }}>
                    Forum
                </Link>
                <h1 className="text-3xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading, inherit)' }}>
                    Discussions
                </h1>
                {subtitle && <p className="mt-1" style={{ color: 'var(--color-text-muted)' }}>{subtitle}</p>}
            </div>
            <div className="flex flex-wrap gap-2">
                <StoryButton />
                <AskButton />
            </div>
        </div>
    );
}
