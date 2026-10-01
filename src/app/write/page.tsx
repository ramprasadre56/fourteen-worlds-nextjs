'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import RichTextEditor from '@/components/forum/RichTextEditor';
import { invalidateStoryFeed } from '@/components/stories/feed';
import { htmlToText, normalizeTag, sanitizeHtml, signInHref } from '@/lib/forum';
import {
    MAX_STORY_TAGS, STORY_BODY_MAX, STORY_SUBTITLE_MAX, STORY_TITLE_MAX, STORY_TITLE_MIN, STORY_TOPICS,
    getStory, publishStory, readingMinutes, topicLabel, updateStory,
} from '@/lib/stories';

const DRAFT_KEY = 'storyDraft';
type Draft = { title: string; body: string; subtitle: string; tags: string[]; coverImage: string | null };
const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

export default function WritePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [editId, setEditId] = useState<string | null>(null);
    const [loadError, setLoadError] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [tagInput, setTagInput] = useState('');
    const [publishOpen, setPublishOpen] = useState(false);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const ready = useRef(false);
    const titleRef = useRef<HTMLTextAreaElement>(null);

    // Load: ?id= edits an existing story (author only); otherwise restore the local draft.
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        if (loading) return;
        const id = new URLSearchParams(window.location.search).get('id');
        if (id) {
            setEditId(id);
            getStory(id)
                .then((s) => {
                    if (!s) return setLoadError('This story was not found.');
                    if (s.authorId !== user?.uid) return setLoadError('You can only edit your own stories.');
                    setTitle(s.title); setBody(s.body); setSubtitle(s.subtitle); setTags(s.tags); setCoverImage(s.coverImage);
                    ready.current = true;
                })
                .catch(() => setLoadError('Could not load this story.'));
            return;
        }
        try {
            const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null') as Draft | null;
            if (d) {
                setTitle(d.title || ''); setBody(d.body || ''); setSubtitle(d.subtitle || '');
                setTags(Array.isArray(d.tags) ? d.tags.slice(0, MAX_STORY_TAGS) : []); setCoverImage(d.coverImage ?? null);
            }
        } catch { /* ignore */ }
        ready.current = true;
    }, [loading, user?.uid]);
    /* eslint-enable react-hooks/set-state-in-effect */

    // Autosave new-story drafts locally (edits of published stories are saved on "Save and publish").
    useEffect(() => {
        if (!ready.current || editId) return;
        const t = setTimeout(() => {
            try {
                localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, body, subtitle, tags, coverImage } satisfies Draft));
                setSaved(true);
            } catch { /* ignore */ }
        }, 600);
        return () => clearTimeout(t);
    }, [title, body, subtitle, tags, coverImage, editId]);

    useEffect(() => {
        const el = titleRef.current;
        if (el) { el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px`; }
    }, [title]);

    const images = useMemo(() => [...body.matchAll(/<img[^>]+src="(https:\/\/[^"]+)"/gi)].map((m) => m[1]), [body]);
    const plain = useMemo(() => (publishOpen ? htmlToText(body) : ''), [publishOpen, body]);
    const canPublish = title.trim().length > 0 && body.length > 0;

    const addTag = (raw: string) => {
        const t = normalizeTag(raw);
        if (t.length < 2) return;
        setTags((prev) => (prev.includes(t) || prev.length >= MAX_STORY_TAGS ? prev : [...prev, t]));
        setTagInput('');
    };

    const openPublish = () => {
        setError('');
        if (title.trim().length < STORY_TITLE_MIN) return setError(`Please give your story a title of at least ${STORY_TITLE_MIN} characters.`);
        if (!htmlToText(sanitizeHtml(body))) return setError('Please write your story first.');
        if (coverImage && !images.includes(coverImage)) setCoverImage(null);
        setPublishOpen(true);
    };

    const publish = async () => {
        if (!user) return;
        setError('');
        const clean = sanitizeHtml(body);
        if (clean.length > STORY_BODY_MAX) return setError('Your story is too long. Please shorten it.');
        const finalTags = tagInput.trim() ? [...tags, tagInput] : tags;
        if (!finalTags.length) return setError('Add at least one topic so readers can find your story.');
        setSaving(true);
        const input = { title, subtitle, body: clean, tags: finalTags, coverImage: coverImage ?? images[0] ?? null };
        try {
            let id = editId;
            if (id) await updateStory(id, input);
            else id = await publishStory(user, input);
            if (!editId) { try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ } }
            invalidateStoryFeed();
            router.push(`/stories/${id}`);
        } catch (err) {
            console.error(err);
            setError('Could not publish. Please try again.');
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--color-text-muted)' }}>Loading…</div>;

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg)' }}>
                <div className="rounded-xl p-8 text-center max-w-md" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <h1 className="text-2xl font-bold mb-2" style={{ ...serif, color: 'var(--color-primary)' }}>Share your story</h1>
                    <p className="mb-5" style={{ color: 'var(--color-text-secondary)' }}>Sign in to write about your realizations, festivals, yatra and service.</p>
                    <Link href={signInHref('/write')} className="btn-golden">Sign In</Link>
                </div>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p style={{ color: 'var(--color-text-secondary)' }}>{loadError}</p>
                <Link href="/stories" className="btn-golden">Back to Stories</Link>
            </div>
        );
    }

    const suggestions = Object.entries(STORY_TOPICS).filter(([slug, label]) =>
        !tags.includes(slug) && (!tagInput.trim() || label.toLowerCase().includes(tagInput.trim().toLowerCase())));

    return (
        <div className="min-h-screen" style={{ background: '#fff' }}>
            {/* Top bar */}
            <div className="sticky top-16 z-30" style={{ background: 'rgba(255,255,255,0.96)' }}>
                <div className="max-w-[740px] mx-auto px-5 h-14 flex items-center gap-3">
                    <Link href="/stories" className="text-sm font-semibold" style={{ ...serif, color: 'var(--color-primary)' }}>Stories</Link>
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {editId ? 'Editing' : `Draft${saved && (title || body) ? ' · Saved' : ''}`}
                    </span>
                    <button
                        onClick={openPublish}
                        disabled={!canPublish}
                        className="ml-auto px-4 py-1.5 rounded-full text-sm font-medium text-white cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                        style={{ background: 'var(--color-middle)' }}
                    >
                        {editId ? 'Save and publish' : 'Publish'}
                    </button>
                </div>
            </div>

            <div className="max-w-[740px] mx-auto px-5 pt-10 pb-32">
                <textarea
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value.replace(/\n/g, ' '))}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            (document.querySelector('.forum-editor') as HTMLElement | null)?.focus();
                        }
                    }}
                    maxLength={STORY_TITLE_MAX}
                    rows={1}
                    placeholder="Title"
                    className="w-full resize-none overflow-hidden outline-none text-[42px] leading-tight bg-transparent placeholder:text-[#b3b3b1]"
                    style={{ ...serif, color: '#242424' }}
                    autoFocus={!editId}
                />
                <div className="mt-3">
                    <RichTextEditor variant="floating" value={body} onChange={setBody} minHeight={400} placeholder="Tell your story…" />
                </div>
                {error && !publishOpen && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </div>

            {/* Publish panel (Medium-style) */}
            {publishOpen && (
                <div className="fixed inset-0 z-[80] overflow-y-auto" style={{ background: '#fff' }}>
                    <button onClick={() => !saving && setPublishOpen(false)} aria-label="Close" className="absolute right-6 top-6 cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
                        <X size={26} strokeWidth={1.5} />
                    </button>
                    <div className="max-w-[1040px] mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12">
                        {/* Preview */}
                        <div>
                            <h2 className="font-semibold mb-4" style={{ color: '#242424' }}>Story Preview</h2>
                            {images.length ? (
                                <div>
                                    <div className="aspect-[16/9] rounded overflow-hidden" style={{ background: 'var(--color-bg-warm)' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={coverImage ?? images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                    </div>
                                    {images.length > 1 && (
                                        <div className="flex gap-2 mt-2 overflow-x-auto">
                                            {images.map((src) => {
                                                const active = (coverImage ?? images[0]) === src;
                                                return (
                                                    <button key={src} onClick={() => setCoverImage(src)} className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden cursor-pointer" style={{ outline: active ? '2px solid var(--color-middle)' : 'none' }}>
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={src} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                                        {active && <Check size={14} className="absolute top-0.5 right-0.5 text-white drop-shadow" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="aspect-[16/9] rounded flex items-center justify-center text-center px-8 text-sm" style={{ background: '#fafafa', color: 'var(--color-text-muted)' }}>
                                    Include a high-quality image in your story to make it more inviting to readers.
                                </div>
                            )}
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={STORY_TITLE_MAX}
                                className="w-full mt-5 py-2 text-lg font-bold outline-none"
                                style={{ ...serif, borderBottom: '1px solid #e6e6e6', color: '#242424' }}
                            />
                            <input
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                maxLength={STORY_SUBTITLE_MAX}
                                placeholder={plain.slice(0, 140) || 'Write a preview subtitle…'}
                                className="w-full mt-3 py-2 text-sm outline-none"
                                style={{ borderBottom: '1px solid #e6e6e6', color: '#6b6b6b' }}
                            />
                            <p className="mt-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                <b>Note:</b> Changes here affect how your story appears in the Stories feed — not the story itself. · {readingMinutes(body)} min read
                            </p>
                        </div>

                        {/* Topics */}
                        <div>
                            <p className="mb-4" style={{ color: '#242424' }}>
                                Publishing to: <b>{user.displayName || user.email?.split('@')[0]}</b>
                            </p>
                            <p className="text-sm mb-3" style={{ color: '#6b6b6b' }}>
                                Add or change topics (up to {MAX_STORY_TAGS}) so readers know what your story is about.
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5 p-2 rounded" style={{ background: '#fafafa', border: '1px solid #e6e6e6' }}>
                                {tags.map((t) => (
                                    <span key={t} className="inline-flex items-center gap-1 pl-3 pr-2 py-1 rounded-full text-sm bg-white" style={{ border: '1px solid #e6e6e6', color: '#242424' }}>
                                        {topicLabel(t)}
                                        <button onClick={() => setTags(tags.filter((x) => x !== t))} className="cursor-pointer" aria-label={`Remove ${topicLabel(t)}`}><X size={13} /></button>
                                    </span>
                                ))}
                                {tags.length < MAX_STORY_TAGS && (
                                    <input
                                        value={tagInput}
                                        onChange={(e) => {
                                            const v = e.target.value;
                                            if (v.includes(',')) v.split(',').forEach(addTag); else setTagInput(v);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const match = suggestions.find(([, label]) => label.toLowerCase() === tagInput.trim().toLowerCase());
                                                addTag(match ? match[0] : tagInput);
                                            }
                                            if (e.key === 'Backspace' && !tagInput && tags.length) setTags(tags.slice(0, -1));
                                        }}
                                        placeholder={tags.length ? 'Add another topic…' : 'Add a topic…'}
                                        className="flex-1 min-w-[140px] px-2 py-1 text-sm bg-transparent outline-none"
                                    />
                                )}
                            </div>
                            {tags.length < MAX_STORY_TAGS && suggestions.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3 max-h-40 overflow-y-auto">
                                    {suggestions.slice(0, tagInput ? 12 : 18).map(([slug, label]) => (
                                        <button key={slug} onClick={() => addTag(slug)} className="px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-[#f2f2f2]" style={{ border: '1px solid #e6e6e6', color: '#6b6b6b' }}>
                                            + {label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                            <div className="flex items-center gap-4 mt-8">
                                <button
                                    onClick={publish}
                                    disabled={saving}
                                    className="px-5 py-2 rounded-full text-sm font-medium text-white cursor-pointer disabled:opacity-60"
                                    style={{ background: 'var(--color-middle)' }}
                                >
                                    {saving ? 'Publishing…' : editId ? 'Save and publish' : 'Publish now'}
                                </button>
                                <button onClick={() => setPublishOpen(false)} className="text-sm cursor-pointer" style={{ color: '#6b6b6b' }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
