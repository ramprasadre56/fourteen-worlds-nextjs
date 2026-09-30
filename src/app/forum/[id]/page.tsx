'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import RichTextEditor from '@/components/forum/RichTextEditor';
import { AskButton, Avatar, TagChip } from '@/components/forum/ForumChrome';
import '@/components/forum/forum.css';
import {
    ForumReply, ForumTopic, POST_TYPES, REPLY_BODY_MAX,
    addReply, deleteReply, deleteTopic, getTopic, htmlToText, listReplies, sanitizeHtml, signInHref, timeAgo,
} from '@/lib/forum';

function DeleteButton({ onConfirm, label }: { onConfirm: () => Promise<void>; label: string }) {
    const [armed, setArmed] = useState(false);
    const [busy, setBusy] = useState(false);
    if (!armed) {
        return (
            <button onClick={() => setArmed(true)} className="inline-flex items-center gap-1 text-xs cursor-pointer hover:text-red-600" style={{ color: 'var(--color-text-muted)' }}>
                <Trash2 size={13} /> {label}
            </button>
        );
    }
    return (
        <span className="inline-flex items-center gap-2 text-xs">
            <span style={{ color: 'var(--color-text-muted)' }}>Delete?</span>
            <button
                disabled={busy}
                onClick={async () => { setBusy(true); try { await onConfirm(); } finally { setBusy(false); setArmed(false); } }}
                className="font-semibold text-red-600 cursor-pointer"
            >
                {busy ? 'Deleting…' : 'Yes'}
            </button>
            <button onClick={() => setArmed(false)} className="cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>No</button>
        </span>
    );
}

export default function TopicPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { user } = useAuth();
    const [topic, setTopic] = useState<ForumTopic | null | undefined>(undefined);
    const [replies, setReplies] = useState<ForumReply[]>([]);
    const [error, setError] = useState('');
    const [reply, setReply] = useState('');
    const [replyError, setReplyError] = useState('');
    const [posting, setPosting] = useState(false);

    const load = useCallback(async () => {
        try {
            const [t, r] = await Promise.all([getTopic(id), listReplies(id)]);
            setTopic(t);
            setReplies(r);
        } catch (e) {
            console.error(e);
            setError('Could not load this discussion.');
            setTopic(null);
        }
    }, [id]);

    useEffect(() => { load(); }, [load]);

    const postReply = async (e: React.FormEvent) => {
        e.preventDefault();
        setReplyError('');
        if (!user) return;
        const clean = sanitizeHtml(reply);
        if (!htmlToText(clean)) return setReplyError('Please write a reply first.');
        if (clean.length > REPLY_BODY_MAX) return setReplyError('Your reply is too long. Please shorten it.');
        setPosting(true);
        try {
            await addReply(user, id, clean);
            setReply('');
            await load();
        } catch (err) {
            console.error(err);
            setReplyError('Could not post your reply. Please try again.');
        } finally {
            setPosting(false);
        }
    };

    if (topic === undefined) {
        return <div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--color-text-muted)' }}>Loading…</div>;
    }

    if (!topic) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: 'var(--color-bg)' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>{error || 'This discussion was not found.'}</p>
                <Link href="/forum" className="btn-golden">Back to Forum</Link>
            </div>
        );
    }

    const isOwner = user?.uid === topic.authorId;

    return (
        <div className="min-h-screen py-8" style={{ background: 'var(--color-bg)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <nav className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        <Link href="/forum" style={{ color: 'var(--color-secondary-dark)' }}>Forum</Link>
                        {' › '}
                        <Link href={`/forum?category=${encodeURIComponent(topic.category)}`} style={{ color: 'var(--color-secondary-dark)' }}>{topic.category}</Link>
                    </nav>
                    <AskButton />
                </div>

                <article className="rounded-xl p-5 sm:p-7" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-secondary-dark)' }}>{POST_TYPES[topic.type].label}</p>
                    <h1 className="text-2xl sm:text-4xl font-bold mb-4 leading-tight" style={{ color: 'var(--color-text)', fontFamily: "Georgia, 'Times New Roman', serif" }}>{topic.title}</h1>
                    <div className="flex items-center gap-3 mb-5">
                        <Avatar name={topic.authorName} photo={topic.authorPhoto} size={44} />
                        <div className="text-sm">
                            <p className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{topic.authorName}</p>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                {timeAgo(topic.createdAt)}
                                {topic.createdAt && ` · ${topic.createdAt.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}`}
                            </p>
                        </div>
                        {isOwner && topic.replyCount === 0 && (
                            <div className="ml-auto">
                                <DeleteButton label="Delete question" onConfirm={async () => { await deleteTopic(topic.id); router.push('/forum'); }} />
                            </div>
                        )}
                    </div>
                    <div className="forum-content forum-editor-plain" dangerouslySetInnerHTML={{ __html: sanitizeHtml(topic.body) }} />
                    {topic.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6 pt-4" style={{ borderTop: '1px solid var(--color-divider)' }}>
                            {topic.tags.map((t) => <TagChip key={t} tag={t} />)}
                        </div>
                    )}
                </article>

                <section id="replies" className="mt-8">
                    <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-primary)' }}>
                        {replies.length} {topic.type === 'story' ? (replies.length === 1 ? 'Response' : 'Responses') : (replies.length === 1 ? 'Reply' : 'Replies')}
                    </h2>

                    <ul className="space-y-3">
                        {replies.map((r) => (
                            <li key={r.id} className="rounded-xl p-4 sm:p-5 flex gap-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                <Avatar name={r.authorName} photo={r.authorPhoto} size={36} />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 text-sm mb-1">
                                        <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{r.authorName}</span>
                                        <span style={{ color: 'var(--color-text-muted)' }}>· {timeAgo(r.createdAt)}</span>
                                        {user?.uid === r.authorId && (
                                            <span className="ml-auto">
                                                <DeleteButton label="Delete" onConfirm={async () => { await deleteReply(topic.id, r.id); await load(); }} />
                                            </span>
                                        )}
                                    </div>
                                    <div className="forum-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(r.body) }} />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 rounded-xl p-4 sm:p-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        {user ? (
                            <form onSubmit={postReply} className="space-y-3">
                                <h3 className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Your reply</h3>
                                <RichTextEditor value={reply} onChange={setReply} placeholder="Share your answer or thoughts…" minHeight={160} />
                                {replyError && <p className="text-sm text-red-600">{replyError}</p>}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={posting}
                                        className="px-6 py-2.5 rounded-lg font-semibold text-white cursor-pointer disabled:opacity-60"
                                        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
                                    >
                                        {posting ? 'Posting…' : 'Post Reply'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <p className="text-center" style={{ color: 'var(--color-text-secondary)' }}>
                                <Link href={signInHref(`/forum/${topic.id}`)} className="font-semibold underline" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
                                {' '}to join the discussion.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
