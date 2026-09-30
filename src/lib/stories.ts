import type { User } from 'firebase/auth';
import { getDbInstance } from '@/lib/firebase';
import { firstImage, htmlToText, normalizeTag } from '@/lib/forum';

/** Topic slug → display label. ISKCON / Dandavats-style subjects writers can tag stories with. */
export const STORY_TOPICS: Record<string, string> = {
    'srila-prabhupada': 'Srila Prabhupada',
    'book-distribution': 'Book Distribution',
    'harinama-sankirtana': 'Harinama Sankirtana',
    'kirtan': 'Kirtan',
    'japa': 'Japa',
    'festivals': 'Festivals',
    'deity-worship': 'Deity Worship',
    'temples': 'Temples',
    'yatra-reports': 'Yatra Reports',
    'pilgrimage': 'Pilgrimage',
    'holy-dhama': 'Holy Dhama',
    'preaching': 'Preaching',
    'sadhana': 'Sadhana',
    'philosophy': 'Philosophy',
    'bhagavad-gita': 'Bhagavad-gita',
    'srimad-bhagavatam': 'Srimad-Bhagavatam',
    'vedic-cosmology': 'Vedic Cosmology',
    'vaishnava-etiquette': 'Vaishnava Etiquette',
    'food-for-life': 'Food for Life',
    'prasadam': 'Prasadam',
    'cow-protection': 'Cow Protection',
    'varnashrama': 'Varnashrama',
    'education': 'Education',
    'youth': 'Youth',
    'family-life': 'Family Life',
    'women': 'Women',
    'personal-realizations': 'Personal Realizations',
    'how-i-came-to-krishna': 'How I Came to Krishna',
    'offerings': 'Offerings & Homages',
    'obituaries': 'Obituaries',
    'news': 'News',
    'opinion': 'Opinion',
};

export const STORY_TOPIC_SLUGS = Object.keys(STORY_TOPICS);
export const MAX_STORY_TAGS = 5;
export const STORY_TITLE_MIN = 5;
export const STORY_TITLE_MAX = 200;
export const STORY_SUBTITLE_MAX = 300;
export const STORY_BODY_MAX = 100000;

export function topicLabel(slug: string): string {
    return STORY_TOPICS[slug] ?? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function readingMinutes(html: string): number {
    const words = htmlToText(html).split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 220));
}

export interface Story {
    id: string;
    title: string;
    subtitle: string;
    body: string;
    tags: string[];
    coverImage: string | null;
    readingMinutes: number;
    authorId: string;
    authorName: string;
    authorPhoto: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    responseCount: number;
}

export interface StoryResponse {
    id: string;
    body: string;
    authorId: string;
    authorName: string;
    authorPhoto: string | null;
    createdAt: Date | null;
}

type Data = Record<string, unknown>;

const toDate = (v: unknown): Date | null =>
    v && typeof (v as { toDate?: unknown }).toDate === 'function' ? (v as { toDate: () => Date }).toDate() : null;

function storyFrom(id: string, d: Data): Story {
    return {
        id,
        title: String(d.title ?? ''),
        subtitle: String(d.subtitle ?? ''),
        body: String(d.body ?? ''),
        tags: Array.isArray(d.tags) ? d.tags.filter((t): t is string => typeof t === 'string') : [],
        coverImage: typeof d.coverImage === 'string' ? d.coverImage : null,
        readingMinutes: typeof d.readingMinutes === 'number' ? d.readingMinutes : 1,
        authorId: String(d.authorId ?? ''),
        authorName: String(d.authorName ?? 'Anonymous'),
        authorPhoto: typeof d.authorPhoto === 'string' ? d.authorPhoto : null,
        createdAt: toDate(d.createdAt),
        updatedAt: toDate(d.updatedAt),
        responseCount: typeof d.responseCount === 'number' ? d.responseCount : 0,
    };
}

function responseFrom(id: string, d: Data): StoryResponse {
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
    if (!db) throw new Error('Stories are only available in the browser.');
    const m = await import('firebase/firestore');
    return { db, ...m };
}

function authorFields(user: User) {
    return {
        authorId: user.uid,
        authorName: (user.displayName || user.email?.split('@')[0] || 'Devotee').slice(0, 100),
        authorPhoto: user.photoURL || null,
    };
}

export type StoryInput = { title: string; subtitle: string; body: string; tags: string[]; coverImage: string | null };

function storyFields(input: StoryInput) {
    return {
        title: input.title.trim().slice(0, STORY_TITLE_MAX),
        subtitle: input.subtitle.trim().slice(0, STORY_SUBTITLE_MAX),
        body: input.body,
        tags: [...new Set(input.tags.map(normalizeTag).filter((t) => t.length >= 2))].slice(0, MAX_STORY_TAGS),
        coverImage: input.coverImage && /^https:\/\//i.test(input.coverImage) ? input.coverImage : firstImage(input.body),
        readingMinutes: readingMinutes(input.body),
    };
}

export async function listStories(max = 200): Promise<Story[]> {
    const { db, collection, query, orderBy, limit, getDocs } = await firestore();
    const snap = await getDocs(query(collection(db, 'stories'), orderBy('createdAt', 'desc'), limit(max)));
    return snap.docs.map((d) => storyFrom(d.id, d.data()));
}

export async function getStory(id: string): Promise<Story | null> {
    const { db, doc, getDoc } = await firestore();
    const snap = await getDoc(doc(db, 'stories', id));
    return snap.exists() ? storyFrom(snap.id, snap.data()) : null;
}

export async function publishStory(user: User, input: StoryInput): Promise<string> {
    const { db, collection, addDoc, serverTimestamp } = await firestore();
    const ref = await addDoc(collection(db, 'stories'), {
        ...storyFields(input),
        ...authorFields(user),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        responseCount: 0,
    });
    return ref.id;
}

export async function updateStory(id: string, input: StoryInput): Promise<void> {
    const { db, doc, updateDoc, serverTimestamp } = await firestore();
    await updateDoc(doc(db, 'stories', id), { ...storyFields(input), updatedAt: serverTimestamp() });
}

export async function deleteStory(id: string): Promise<void> {
    const { db, doc, deleteDoc } = await firestore();
    await deleteDoc(doc(db, 'stories', id));
}

export async function listResponses(storyId: string): Promise<StoryResponse[]> {
    const { db, collection, query, orderBy, getDocs } = await firestore();
    const snap = await getDocs(query(collection(db, 'stories', storyId, 'responses'), orderBy('createdAt', 'asc')));
    return snap.docs.map((d) => responseFrom(d.id, d.data()));
}

export async function addResponse(user: User, storyId: string, body: string): Promise<void> {
    const { db, collection, doc, writeBatch, serverTimestamp, increment } = await firestore();
    const batch = writeBatch(db);
    batch.set(doc(collection(db, 'stories', storyId, 'responses')), { body, ...authorFields(user), createdAt: serverTimestamp() });
    batch.update(doc(db, 'stories', storyId), { responseCount: increment(1) });
    await batch.commit();
}

export async function deleteResponse(storyId: string, responseId: string): Promise<void> {
    const { db, doc, writeBatch, increment } = await firestore();
    const batch = writeBatch(db);
    batch.delete(doc(db, 'stories', storyId, 'responses', responseId));
    batch.update(doc(db, 'stories', storyId), { responseCount: increment(-1) });
    await batch.commit();
}
