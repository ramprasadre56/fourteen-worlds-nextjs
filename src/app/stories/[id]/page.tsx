'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MessageCircle, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import RichTextEditor from '@/components/forum/RichTextEditor';
import { Avatar } from '@/components/forum/ForumChrome';
import '@/components/forum/forum.css';
import { REPLY_BODY_MAX, htmlToText, sanitizeHtml, signInHref, timeAgo } from '@/lib/forum';
import { Story, StoryResponse, addResponse, deleteResponse, deleteStory, getStory, listResponses, topicLabel } from '@/lib/stories';

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

function ConfirmDelete({ label, onConfirm }: { label: string; onConfirm: () => Promise<void> }) {
    const [armed, setArmed] = useState(false);
    const [busy, setBusy] = useState(false);
    if (!armed) {
        return (
            <button onClick={() => setArmed(true)} className="inline-flex items-center gap-1 text-sm cursor-pointer hover:text-red-600" style={{ color: '#6b6b6b' }}>
                <Trash2 size={15} /> {label}
            </button>
        );
    }
    return (
        <span className="inline-flex items-center gap-2 text-sm">
            <span style={{ color: '#6b6b6b' }}>Delete?</span>
            <button disabled={busy} onClick={async () => { setBusy(true); try { await onConfirm(); } finally { setBusy(false); setArmed(false); } }} className="font-semibold text-red-600 cursor-pointer">
                {busy ? 'Deleting…' : 'Yes'}
            </button>
            <button onClick={() => setArmed(false)} className="cursor-pointer" style={{ color: '#6b6b6b' }}>No</button>
        </span>
    );
}

export default function StoryPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { user } = useAuth();
    const [story, setStory] = useState<Story | null | undefined>(undefined);
    const [responses, setResponses] = useState<StoryResponse[]>([]);
    const [reply, setReply] = useState('');
    const [replyError, setReplyError] = useState('');
    const [posting, setPosting] = useState(false);

    const load = useCallback(async () => {
        try {
            const [s, r] = await Promise.all([getStory(id), listResponses(id)]);
            setStory(s);
            setResponses(r);
        } catch (e) {
            console.error(e);
            setStory(null);
        }
    }, [id]);

    useEffect(() => { load(); }, [load]);

    const respond = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setReplyError('');
        const clean = sanitizeHtml(reply);
        if (!htmlToText(clean)) return setReplyError('Please write a response first.');
        if (clean.length > REPLY_BODY_MAX) return setReplyError('Your response is too long.');
        setPosting(true);
        try {
            await addResponse(user, id, clean);
            setReply('');
            await load();
        } catch (err) {
            console.error(err);
            setReplyError('Could not post your response. Please try again.');
        } finally {
            setPosting(false);
        }
    };

    if (story === undefined) return <div className="min-h-screen flex items-center justify-center" style={{ color: '#6b6b6b' }}>Loading…</div>;

    if (!story) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
                <p style={{ color: '#6b6b6b' }}>This story was not found.</p>
                <Link href="/stories" className="btn-golden">Back to Stories</Link>
            </div>
        );
    }

    const isOwner = user?.uid === story.authorId;
    const date = story.createdAt?.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) ?? 'Just now';

    return (
        <div className="min-h-screen bg-white">
            <article className="max-w-[700px] mx-auto px-5 pt-12 pb-10">
                <h1 className="text-[32px] sm:text-[42px] font-bold leading-[1.2]" style={{ ...serif, color: '#242424' }}>{story.title}</h1>
                {story.subtitle && <p className="mt-3 text-xl sm:text-[22px]" style={{ color: '#6b6b6b' }}>{story.subtitle}</p>}

                <div className="flex items-center gap-3 mt-8">
                    <Avatar name={story.authorName} photo={story.authorPhoto} size={44} />
                    <div className="text-sm">
                        <p style={{ color: '#242424' }}>{story.authorName}</p>
                        <p style={{ color: '#6b6b6b' }}>{story.readingMinutes} min read · {date}</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 mt-6 py-2.5 text-sm" style={{ borderTop: '1px solid #f2f2f2', borderBottom: '1px solid #f2f2f2', color: '#6b6b6b' }}>
                    <a href="#responses" className="inline-flex items-center gap-1.5 hover:text-black"><MessageCircle size={18} strokeWidth={1.5} /> {story.responseCount}</a>
                    {isOwner && (
                        <span className="ml-auto flex items-center gap-5">
                            <Link href={`/write?id=${story.id}`} className="inline-flex items-center gap-1 hover:text-black"><Pencil size={15} /> Edit</Link>
                            <ConfirmDelete label="Delete" onConfirm={async () => { await deleteStory(story.id); router.push('/stories'); }} />
                        </span>
                    )}
                </div>

                <div className="forum-content story-body mt-10" style={{ color: '#242424' }} dangerouslySetInnerHTML={{ __html: sanitizeHtml(story.body) }} />

                {story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-12">
                        {story.tags.map((t) => (
                            <Link key={t} href={`/stories?topic=${t}`} className="px-4 py-2 rounded-full text-sm hover:bg-[#e8e8e8]" style={{ background: '#f2f2f2', color: '#242424' }}>
                                {topicLabel(t)}
                            </Link>
                        ))}
                    </div>
                )}
            </article>

            <section id="responses" style={{ background: '#fafafa' }}>
                <div className="max-w-[700px] mx-auto px-5 py-12">
                    <h2 className="text-xl font-bold mb-6" style={{ color: '#242424' }}>Responses ({responses.length})</h2>

                    <div className="mb-8 rounded-lg p-4 bg-white" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                        {user ? (
                            <form onSubmit={respond} className="space-y-3">
                                <RichTextEditor value={reply} onChange={setReply} placeholder="What are your thoughts?" minHeight={100} />
                                {replyError && <p className="text-sm text-red-600">{replyError}</p>}
                                <div className="flex justify-end">
                                    <button type="submit" disabled={posting} className="px-4 py-1.5 rounded-full text-sm font-medium text-white cursor-pointer disabled:opacity-60" style={{ background: 'var(--color-middle)' }}>
                                        {posting ? 'Responding…' : 'Respond'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <p className="text-sm" style={{ color: '#6b6b6b' }}>
                                <Link href={signInHref(`/stories/${story.id}`)} className="font-semibold underline" style={{ color: '#242424' }}>Sign in</Link> to respond.
                            </p>
                        )}
                    </div>

                    <ul>
                        {responses.map((r) => (
                            <li key={r.id} className="py-6" style={{ borderTop: '1px solid #e6e6e6' }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <Avatar name={r.authorName} photo={r.authorPhoto} size={32} />
                                    <div className="text-sm">
                                        <p style={{ color: '#242424' }}>{r.authorName}</p>
                                        <p style={{ color: '#6b6b6b' }}>{timeAgo(r.createdAt)}</p>
                                    </div>
                                    {user?.uid === r.authorId && (
                                        <span className="ml-auto"><ConfirmDelete label="" onConfirm={async () => { await deleteResponse(story.id, r.id); await load(); }} /></span>
                                    )}
                                </div>
                                <div className="forum-content" style={{ color: '#242424' }} dangerouslySetInnerHTML={{ __html: sanitizeHtml(r.body) }} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
