'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import RichTextEditor from '@/components/forum/RichTextEditor';
import {
    FORUM_CATEGORIES, ForumCategory, MAX_TAGS, POST_TYPES, PostType, SUGGESTED_TAGS,
    TITLE_MAX, TITLE_MIN, TOPIC_BODY_MAX,
    createTopic, htmlToText, normalizeTag, sanitizeHtml, signInHref,
} from '@/lib/forum';

const DRAFT_KEY = 'forumDraft';
type Draft = { type: PostType; title: string; body: string; category: ForumCategory | ''; tags: string[] };

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

export default function NewPostPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [type, setType] = useState<PostType>('question');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState<ForumCategory | ''>('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [publishOpen, setPublishOpen] = useState(false);
    const [guidelinesOpen, setGuidelinesOpen] = useState(false);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [savedAt, setSavedAt] = useState<Date | null>(null);
    const restored = useRef(false);
    const titleRef = useRef<HTMLTextAreaElement>(null);

    // Restore draft / ?type= on first load (localStorage is only readable after mount)
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        try {
            const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null') as Draft | null;
            if (d) {
                setType(d.type === 'story' ? 'story' : 'question');
                setTitle(d.title || '');
                setBody(d.body || '');
                setCategory(d.category || '');
                setTags(Array.isArray(d.tags) ? d.tags.slice(0, MAX_TAGS) : []);
            }
        } catch { /* ignore */ }
        if (new URLSearchParams(window.location.search).get('type') === 'story') {
            router.replace('/write');
            return;
        }
        setType('question');
        restored.current = true;
    }, [router]);
    /* eslint-enable react-hooks/set-state-in-effect */

    // Autosave draft
    useEffect(() => {
        if (!restored.current) return;
        const id = setTimeout(() => {
            try {
                localStorage.setItem(DRAFT_KEY, JSON.stringify({ type, title, body, category, tags } satisfies Draft));
                setSavedAt(new Date());
            } catch { /* ignore */ }
        }, 600);
        return () => clearTimeout(id);
    }, [type, title, body, category, tags]);

    // Auto-grow title
    useEffect(() => {
        const el = titleRef.current;
        if (el) { el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px`; }
    }, [title]);

    const addTag = (raw: string) => {
        const t = normalizeTag(raw);
        if (t.length < 2) return;
        setTags((prev) => (prev.includes(t) || prev.length >= MAX_TAGS ? prev : [...prev, t]));
        setTagInput('');
    };

    const openPublish = () => {
        setError('');
        if (title.trim().length < TITLE_MIN) return setError(`Please add a title of at least ${TITLE_MIN} characters.`);
        if (!htmlToText(sanitizeHtml(body))) return setError(type === 'story' ? 'Please write your story first.' : 'Please add some details to your question.');
        setPublishOpen(true);
    };

    const publish = async () => {
        setError('');
        if (!user) return;
        if (!category) return setError('Please choose a category.');
        const clean = sanitizeHtml(body);
        if (clean.length > TOPIC_BODY_MAX) return setError('Your post is too long. Please shorten it.');
        const finalTags = tagInput.trim() ? [...tags, normalizeTag(tagInput)].filter(Boolean) : tags;
        setSaving(true);
        try {
            const id = await createTopic(user, { title: title.trim(), body: clean, category, type, tags: finalTags });
            try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
            router.push(`/forum/${id}`);
        } catch (err) {
            console.error(err);
            setError('Could not publish. Please try again.');
            setSaving(false);
        }
    };

    const discard = () => {
        setTitle(''); setBody(''); setTags([]); setCategory(''); setError('');
        try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--color-text-muted)' }}>Loading…</div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg)' }}>
                <div className="rounded-xl p-8 text-center max-w-md" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>Contribute to the Forum</h1>
                    <p className="mb-5" style={{ color: 'var(--color-text-secondary)' }}>Sign in to ask a question or share your story.</p>
                    <Link href={signInHref('/forum/new')} className="btn-golden">Sign In</Link>
                </div>
            </div>
        );
    }

    const suggestions = SUGGESTED_TAGS.filter((t) => !tags.includes(t) && (!tagInput || t.includes(normalizeTag(tagInput))));

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-surface)' }}>
            {/* Top bar */}
            <div className="sticky top-16 z-10" style={{ background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid var(--color-border-light)' }}>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
                    <Link href="/forum" className="text-sm font-medium" style={{ color: 'var(--color-secondary-dark)' }}>← Forum</Link>
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Draft{savedAt && (title || body) ? ' · Saved' : ''}
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                        {(title || body) && (
                            <button onClick={discard} className="text-sm px-3 py-1.5 cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>Discard</button>
                        )}
                        <button
                            onClick={openPublish}
                            disabled={!title.trim() || !body}
                            className="px-5 py-1.5 rounded-full text-sm font-semibold text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ background: 'var(--color-primary)' }}
                        >
                            Publish
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
                <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                    Want to share an experience instead? <Link href="/write" className="underline" style={{ color: 'var(--color-primary)' }}>Write a story</Link>.
                </p>

                {/* Guidelines */}
                <div className="mb-6 rounded-lg text-sm" style={{ background: 'var(--color-bg-warm)', border: '1px solid var(--color-border-light)' }}>
                    <button onClick={() => setGuidelinesOpen((o) => !o)} className="w-full flex items-center justify-between px-4 py-2.5 cursor-pointer font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                        Contribution guidelines
                        <ChevronDown size={16} className={guidelinesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                    </button>
                    {guidelinesOpen && (
                        <ul className="px-4 pb-3 space-y-1 list-disc list-inside" style={{ color: 'var(--color-text-muted)' }}>
                            <li>Share questions, reflections and experiences on Vedic knowledge and devotional life.</li>
                            <li>Be respectful towards all devotees, teachers and traditions.</li>
                            <li>Quote scripture with its reference (e.g. Bhagavad-gītā 2.13) where you can.</li>
                            <li>Write in your own words; credit and link any source you draw from.</li>
                            <li>Add a category and up to {MAX_TAGS} tags so others can find your post.</li>
                        </ul>
                    )}
                </div>

                <textarea
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value.replace(/\n/g, ' '))}
                    maxLength={TITLE_MAX}
                    rows={1}
                    placeholder={type === 'story' ? 'Title' : 'Your question'}
                    className="w-full resize-none overflow-hidden outline-none text-4xl sm:text-5xl font-bold leading-tight bg-transparent placeholder:text-[#c9bfb3]"
                    style={{ ...serif, color: 'var(--color-text)' }}
                />

                <div className="mt-4">
                    <RichTextEditor
                        variant="floating"
                        value={body}
                        onChange={setBody}
                        minHeight={320}
                        placeholder={type === 'story' ? 'Tell your story…' : 'Add details to your question…'}
                    />
                </div>
                <p className="mt-6 text-xs" style={{ color: 'var(--color-text-light)' }}>Tip: select text to make it bold, italic, a heading, a quote or a link.</p>

                {error && !publishOpen && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </div>

            {/* Publish panel */}
            {publishOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(45,24,16,0.45)' }} onClick={() => !saving && setPublishOpen(false)}>
                    <div className="w-full max-w-lg rounded-2xl p-6 shadow-xl" style={{ background: 'var(--color-surface)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-start justify-between mb-1">
                            <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Publishing {POST_TYPES[type].label.toLowerCase()}</p>
                            <button onClick={() => setPublishOpen(false)} className="cursor-pointer" aria-label="Close" style={{ color: 'var(--color-text-muted)' }}><X size={18} /></button>
                        </div>
                        <h2 className="text-xl font-bold mb-5 line-clamp-2" style={{ ...serif, color: 'var(--color-text)' }}>{title}</h2>

                        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as ForumCategory)}
                            className="w-full px-3 py-2.5 rounded-lg cursor-pointer mb-5"
                            style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: category ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                        >
                            <option value="" disabled>Choose a category</option>
                            {FORUM_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                            Tags <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>(up to {MAX_TAGS})</span>
                        </label>
                        <div className="flex flex-wrap items-center gap-1.5 px-2 py-2 rounded-lg" style={{ border: '1px solid var(--color-border)' }}>
                            {tags.map((t) => (
                                <span key={t} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-sm" style={{ background: 'rgba(212,168,83,0.18)', color: 'var(--color-accent)' }}>
                                    #{t}
                                    <button onClick={() => setTags(tags.filter((x) => x !== t))} className="cursor-pointer" aria-label={`Remove ${t}`}><X size={13} /></button>
                                </span>
                            ))}
                            {tags.length < MAX_TAGS && (
                                <input
                                    value={tagInput}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        if (/[,\n]/.test(v)) v.split(/[,\n]/).forEach(addTag);
                                        else setTagInput(v);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); }
                                        if (e.key === 'Backspace' && !tagInput && tags.length) setTags(tags.slice(0, -1));
                                    }}
                                    placeholder={tags.length ? 'Add another…' : 'Add a tag and press Enter'}
                                    className="flex-1 min-w-[140px] px-1 py-1 text-sm outline-none"
                                />
                            )}
                        </div>
                        {tags.length < MAX_TAGS && suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {suggestions.slice(0, 8).map((t) => (
                                    <button key={t} onClick={() => addTag(t)} className="px-2.5 py-0.5 rounded-full text-xs cursor-pointer" style={{ border: '1px dashed var(--color-border)', color: 'var(--color-text-muted)' }}>
                                        + {t}
                                    </button>
                                ))}
                            </div>
                        )}

                        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setPublishOpen(false)} className="px-4 py-2 rounded-full text-sm cursor-pointer" style={{ color: 'var(--color-text-secondary)' }}>Cancel</button>
                            <button
                                onClick={publish}
                                disabled={saving}
                                className="px-6 py-2 rounded-full text-sm font-semibold text-white cursor-pointer disabled:opacity-60"
                                style={{ background: 'var(--color-primary)' }}
                            >
                                {saving ? 'Publishing…' : 'Publish now'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
