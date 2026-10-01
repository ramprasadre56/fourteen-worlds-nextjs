import { STORY_TOPICS, topicLabel } from '@/lib/stories';

/** Main topics, each grouping several sub-topics (story tags). */
export interface TopicGroup {
    slug: string;
    label: string;
    description: string;
    children: string[];
}

export const TOPIC_GROUPS: TopicGroup[] = [
    {
        slug: 'scripture', label: 'Scripture',
        description: 'Bhagavad-gita, Srimad-Bhagavatam, Vedic cosmology and the philosophy of Krishna consciousness.',
        children: ['bhagavad-gita', 'srimad-bhagavatam', 'philosophy', 'vedic-cosmology'],
    },
    {
        slug: 'devotional-practice', label: 'Devotional Practice',
        description: 'Sadhana, japa, kirtan, Deity worship and Vaishnava etiquette.',
        children: ['sadhana', 'japa', 'kirtan', 'deity-worship', 'vaishnava-etiquette'],
    },
    {
        slug: 'festivals-holy-places', label: 'Festivals & Holy Places',
        description: 'Festivals, temples, pilgrimages and the holy dhamas.',
        children: ['festivals', 'temples', 'pilgrimage', 'holy-dhama'],
    },
    {
        slug: 'preaching-outreach', label: 'Preaching & Outreach',
        description: 'Book distribution, harinama, Food for Life, prasadam and preaching.',
        children: ['preaching', 'book-distribution', 'harinama-sankirtana', 'food-for-life', 'prasadam'],
    },
    {
        slug: 'community-life', label: 'Community & Life',
        description: 'Family life, youth, women, education, cow protection and varnashrama.',
        children: ['family-life', 'youth', 'women', 'education', 'cow-protection', 'varnashrama'],
    },
    {
        slug: 'personal-journeys', label: 'Personal Journeys',
        description: 'Realizations, yatra reports and how devotees came to Krishna.',
        children: ['personal-realizations', 'how-i-came-to-krishna', 'yatra-reports'],
    },
    {
        slug: 'prabhupada-vaishnavas', label: 'Prabhupada & Vaishnavas',
        description: 'Srila Prabhupada, homages and remembrances of Vaishnavas.',
        children: ['srila-prabhupada', 'offerings', 'obituaries'],
    },
    {
        slug: 'news-views', label: 'News & Views',
        description: 'News from ISKCON around the world, and opinion.',
        children: ['news', 'opinion'],
    },
];

const GROUP_BY_SLUG = new Map(TOPIC_GROUPS.map((g) => [g.slug, g]));
const PARENT_OF = new Map(TOPIC_GROUPS.flatMap((g) => g.children.map((c) => [c, g] as const)));

export const ALL_TOPIC_SLUGS = [...TOPIC_GROUPS.map((g) => g.slug), ...Object.keys(STORY_TOPICS)];

export const isGroup = (slug: string) => GROUP_BY_SLUG.has(slug);
export const groupFor = (slug: string): TopicGroup | undefined => GROUP_BY_SLUG.get(slug) ?? PARENT_OF.get(slug);
export const topicName = (slug: string) => GROUP_BY_SLUG.get(slug)?.label ?? topicLabel(slug);

/** Does a story with these tags belong to the topic? Main topics include all their sub-topics. */
export function matchesTopic(tags: string[], slug: string): boolean {
    const g = GROUP_BY_SLUG.get(slug);
    return g ? tags.some((t) => t === slug || g.children.includes(t)) : tags.includes(slug);
}

/** Pills shown on a topic page: a main topic's sub-topics, or a sub-topic's parent and siblings. */
export function relatedTopics(slug: string): string[] {
    const g = GROUP_BY_SLUG.get(slug);
    if (g) return g.children;
    const parent = PARENT_OF.get(slug);
    if (parent) return [parent.slug, ...parent.children.filter((c) => c !== slug)];
    return TOPIC_GROUPS.map((x) => x.slug);
}

export function searchTopics(q: string): string[] {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return ALL_TOPIC_SLUGS.filter((slug) => topicName(slug).toLowerCase().includes(s) || slug.includes(s.replace(/\s+/g, '-')));
}
