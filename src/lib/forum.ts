import type { User } from 'firebase/auth';
import { getDbInstance } from '@/lib/firebase';

// Keep in sync with the category list in firestore.rules
export const FORUM_CATEGORIES = [
    'Vedic Cosmology',
    'Reincarnation',
    'Demigod Worship',
    'Yoga',
    'Bhakti',
    'Karma',
    'Guru',
    'Family Life',
    'Wealth',
    'ISKCON',
    'Our Previous Acharyas',
    'Scriptures',
    'General',
] as const;

export type ForumCategory = (typeof FORUM_CATEGORIES)[number];

export const POST_TYPES = {
    question: { label: 'Question', verb: 'Ask a Question' },
    story: { label: 'Story', verb: 'Share a Story' },
} as const;
export type PostType = keyof typeof POST_TYPES;

export const MAX_TAGS = 5;
export const SUGGESTED_TAGS = [
    'krishna', 'bhagavad-gita', 'srimad-bhagavatam', 'prabhupada', 'japa', 'kirtan',
    'meditation', 'cosmology', 'sadhana', 'prasadam', 'festivals', 'personal-experience',
];

/** Lower-case, hyphenated, 2–30 chars of a–z, 0–9 and hyphens. */
export function normalizeTag(raw: string): string {
    return raw
        .toLowerCase()
        .trim()
        .replace(/^#+/, '')
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 30);
}

export const TITLE_MIN = 5;
export const TITLE_MAX = 200;
export const TOPIC_BODY_MAX = 20000;
export const REPLY_BODY_MAX = 10000;

export interface ForumTopic {
    id: string;
    title: string;
    body: string;
    category: string;
    type: PostType;
    tags: string[];
    authorId: string;
    authorName: string;
    authorPhoto: string | null;
    createdAt: Date | null;
    lastActivityAt: Date | null;
    replyCount: number;
}

export interface ForumReply {
    id: string;
    body: string;
    authorId: string;
    authorName: string;
    authorPhoto: string | null;
    createdAt: Date | null;
}

type Data = Record<string, unknown>;

function toDate(v: unknown): Date | null {
    if (v && typeof (v as { toDate?: unknown }).toDate === 'function') {
        return (v as { toDate: () => Date }).toDate();
    }
    return null;
}

function topicFrom(id: string, d: Data): ForumTopic {
    return {
        id,
        title: String(d.title ?? ''),
        body: String(d.body ?? ''),
        category: String(d.category ?? 'General'),
        type: d.type === 'story' ? 'story' : 'question',
        tags: Array.isArray(d.tags) ? d.tags.filter((t): t is string => typeof t === 'string') : [],
        authorId: String(d.authorId ?? ''),
        authorName: String(d.authorName ?? 'Anonymous'),
        authorPhoto: typeof d.authorPhoto === 'string' ? d.authorPhoto : null,
        createdAt: toDate(d.createdAt),
        lastActivityAt: toDate(d.lastActivityAt),
        replyCount: typeof d.replyCount === 'number' ? d.replyCount : 0,
    };
}

function replyFrom(id: string, d: Data): ForumReply {
    return {
        id,
        body: String(d.body ?? ''),
        authorId: String(d.authorId ?? ''),
        authorName: String(d.authorName ?? 'Anonymous'),
        authorPhoto: typeof d.authorPhoto === 'string' ? d.authorPhoto : null,
        createdAt: toDate(d.createdAt),
    };
}

async function firestore() {
    const db = await getDbInstance();
    if (!db) throw new Error('The forum is only available in the browser.');
    const m = await import('firebase/firestore');
    return { db, ...m };
}

function authorFields(user: User) {
    const name = (user.displayName || user.email?.split('@')[0] || 'Devotee').slice(0, 100);
    return { authorId: user.uid, authorName: name, authorPhoto: user.photoURL || null };
}

export async function listTopics(max = 300): Promise<ForumTopic[]> {
    const { db, collection, query, orderBy, limit, getDocs } = await firestore();
    const snap = await getDocs(query(collection(db, 'forumTopics'), orderBy('lastActivityAt', 'desc'), limit(max)));
    return snap.docs.map((d) => topicFrom(d.id, d.data()));
}

export async function getTopic(id: string): Promise<ForumTopic | null> {
    const { db, doc, getDoc } = await firestore();
    const snap = await getDoc(doc(db, 'forumTopics', id));
    return snap.exists() ? topicFrom(snap.id, snap.data()) : null;
}

export async function listReplies(topicId: string): Promise<ForumReply[]> {
    const { db, collection, query, orderBy, getDocs } = await firestore();
    const snap = await getDocs(query(collection(db, 'forumTopics', topicId, 'replies'), orderBy('createdAt', 'asc')));
    return snap.docs.map((d) => replyFrom(d.id, d.data()));
}

export async function createTopic(
    user: User,
    input: { title: string; body: string; category: ForumCategory; type: PostType; tags: string[] },
): Promise<string> {
    const { db, collection, addDoc, serverTimestamp } = await firestore();
    const tags = [...new Set(input.tags.map(normalizeTag).filter((t) => t.length >= 2))].slice(0, MAX_TAGS);
    const ref = await addDoc(collection(db, 'forumTopics'), {
        title: input.title.trim(),
        body: input.body,
        category: input.category,
        type: input.type,
        tags,
        ...authorFields(user),
        createdAt: serverTimestamp(),
        lastActivityAt: serverTimestamp(),
        replyCount: 0,
    });
    return ref.id;
}

export async function addReply(user: User, topicId: string, body: string): Promise<void> {
    const { db, collection, doc, writeBatch, serverTimestamp, increment } = await firestore();
    const batch = writeBatch(db);
    batch.set(doc(collection(db, 'forumTopics', topicId, 'replies')), {
        body,
        ...authorFields(user),
        createdAt: serverTimestamp(),
    });
    batch.update(doc(db, 'forumTopics', topicId), {
        replyCount: increment(1),
        lastActivityAt: serverTimestamp(),
    });
    await batch.commit();
}

export async function deleteReply(topicId: string, replyId: string): Promise<void> {
    const { db, doc, writeBatch, increment } = await firestore();
    const batch = writeBatch(db);
    batch.delete(doc(db, 'forumTopics', topicId, 'replies', replyId));
    batch.update(doc(db, 'forumTopics', topicId), { replyCount: increment(-1) });
    await batch.commit();
}

export async function deleteTopic(topicId: string): Promise<void> {
    const { db, doc, deleteDoc } = await firestore();
    await deleteDoc(doc(db, 'forumTopics', topicId));
}

/* ---------- HTML helpers (browser only) ---------- */

const ALLOWED_TAGS = new Set([
    'P', 'BR', 'B', 'STRONG', 'I', 'EM', 'U', 'S', 'STRIKE', 'DEL',
    'UL', 'OL', 'LI', 'A', 'BLOCKQUOTE', 'DIV', 'SPAN', 'H2', 'H3',
    'IMG', 'HR', 'FIGURE', 'FIGCAPTION',
]);
const ALIGN_STYLE = /^\s*text-align:\s*(left|center|right|justify);?\s*$/i;

/** First https image in a rich-text body (used as a cover). */
export function firstImage(html: string): string | null {
    const m = /<img[^>]+src="(https:\/\/[^"]+)"/i.exec(html);
    return m ? m[1] : null;
}

/** Whitelist sanitizer for user-written rich text. */
export function sanitizeHtml(html: string): string {
    if (typeof window === 'undefined' || !html) return '';
    const src = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html').body.firstElementChild;
    const out = document.createElement('div');

    const walk = (from: Node, to: Node) => {
        from.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                to.appendChild(document.createTextNode(node.textContent ?? ''));
                return;
            }
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            const el = node as Element;
            if (!ALLOWED_TAGS.has(el.tagName)) {
                if (!['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED'].includes(el.tagName)) walk(el, to);
                return;
            }
            const clean = document.createElement(el.tagName.toLowerCase());
            const style = el.getAttribute('style');
            if (style && ALIGN_STYLE.test(style)) clean.setAttribute('style', style.trim());
            if (el.tagName === 'A') {
                const href = el.getAttribute('href') ?? '';
                if (/^(https?:|mailto:)/i.test(href.trim())) {
                    clean.setAttribute('href', href.trim());
                    clean.setAttribute('target', '_blank');
                    clean.setAttribute('rel', 'noopener noreferrer nofollow');
                }
            }
            if (el.tagName === 'IMG') {
                const src = (el.getAttribute('src') ?? '').trim();
                if (!/^https:\/\//i.test(src)) return; // https images only
                clean.setAttribute('src', src);
                clean.setAttribute('alt', (el.getAttribute('alt') ?? '').slice(0, 300));
                clean.setAttribute('loading', 'lazy');
                clean.setAttribute('referrerpolicy', 'no-referrer');
            }
            walk(el, clean);
            to.appendChild(clean);
        });
    };
    if (src) walk(src, out);
    return out.innerHTML;
}

export function htmlToText(html: string): string {
    if (typeof window === 'undefined' || !html) return '';
    const doc = new DOMParser().parseFromString(html.replace(/<(br|\/p|\/div|\/li)[^>]*>/gi, ' $&'), 'text/html');
    return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}

export function timeAgo(date: Date | null): string {
    if (!date) return 'just now';
    const s = Math.floor((Date.now() - date.getTime()) / 1000);
    if (s < 60) return 'just now';
    const units: [number, string][] = [[60, 'minute'], [60, 'hour'], [24, 'day'], [30, 'month'], [12, 'year']];
    let n = s / 60;
    let label = 'minute';
    for (let i = 1; i < units.length && n >= units[i][0]; i++) {
        n /= units[i][0];
        label = units[i][1];
    }
    const v = Math.floor(n);
    return `${v} ${label}${v === 1 ? '' : 's'} ago`;
}

export function signInHref(next: string) {
    return `/signin?next=${encodeURIComponent(next)}`;
}
