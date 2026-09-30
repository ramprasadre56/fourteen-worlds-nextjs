/**
 * Server-side aggregation of public posts from ISKCON Desire Tree (Atom feed) and
 * Dandavats (home page listing). Only previews are kept — title, a short excerpt,
 * image, author, date and topic tags — and every item links back to the original.
 */

export type ExternalSource = 'idt' | 'dandavats';

export interface ExternalStory {
    id: string;
    source: ExternalSource;
    title: string;
    excerpt: string;
    url: string;
    image: string | null;
    author: string;
    date: string | null; // ISO
    tags: string[];
}

export const SOURCE_LABELS: Record<ExternalSource, string> = {
    idt: 'ISKCON Desire Tree',
    dandavats: 'Dandavats',
};

const IDT_FEED = 'https://iskcondesiretree.com/profiles/blogs/feed/all';
const DANDAVATS_HOME = 'https://www.dandavats.com/';
const UA = 'Mozilla/5.0 (compatible; FourteenWorldsBot/1.0; +https://fourteenworlds.org)';
const EXCERPT_LEN = 260;

/* ---------- text helpers (no DOM on the server) ---------- */

const NAMED: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' };

export function decodeEntities(s: string): string {
    return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
        if (e[0] === '#') {
            const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
            return Number.isFinite(code) ? String.fromCodePoint(code) : m;
        }
        return NAMED[e.toLowerCase()] ?? m;
    });
}

function stripTags(html: string): string {
    return decodeEntities(
        html
            .replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi, ' ')
            .replace(/<br\s*\/?>|<\/(p|div|li|h\d)>/gi, ' ')
            .replace(/<[^>]+>/g, ' '),
    ).replace(/\s+/g, ' ').trim();
}

function excerpt(text: string): string {
    const t = text.replace(/\s*(Source|Read more)\s*:?.*$/i, '').trim();
    if (t.length <= EXCERPT_LEN) return t;
    const cut = t.slice(0, EXCERPT_LEN);
    return `${cut.slice(0, cut.lastIndexOf(' ') > 150 ? cut.lastIndexOf(' ') : EXCERPT_LEN).replace(/[,;:.\s]+$/, '')}…`;
}

function firstHttpsImage(html: string): string | null {
    for (const m of html.matchAll(/<img[^>]+src=["'](https:\/\/[^"']+)["']/gi)) {
        const src = decodeEntities(m[1]);
        if (!/random\.php|gravatar|emoji|pixel|spacer|\.gif(\?|$)/i.test(src)) return src;
    }
    const yt = /youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/i.exec(html);
    return yt ? `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg` : null;
}

/* ---------- topic tagging ---------- */

const TOPIC_RULES: [string, RegExp][] = [
    ['srila-prabhupada', /prabhup[aā]da/i],
    ['book-distribution', /book distribution|marathon|books? distributed|sankirtan(?!a)/i],
    ['harinama-sankirtana', /harin[aā]m|nagar[ -]?sank[iī]rtan|street chanting/i],
    ['kirtan', /k[iī]rtan/i],
    ['japa', /\bjapa\b|holy names?|chanting/i],
    ['festivals', /festival|janm[aā]s?h?tam[iī]|ratha|gaura p[uū]rnim[aā]|diwali|d[iī]p[aā]vali|k[aā]rtik|d[aā]modar|r[aā]dh[aā]s?h?tam[iī]|ekadas[iī]|appearance day|disappearance day|holi\b/i],
    ['deity-worship', /deit(y|ies)|abhi[sṣ]ek|[aā]rat[iī]|darshan|altar|installation|puj[aā]\b/i],
    ['temples', /temple|mandir/i],
    ['yatra-reports', /y[aā]tr[aā]\b|yatra report/i],
    ['pilgrimage', /pilgrim|parikram|jagann[aā]th pur[iī]|kumbh/i],
    ['holy-dhama', /vrind[aā]van|m[aā]y[aā]pur|navadv[iī]p|dh[aā]ma?\b/i],
    ['preaching', /preach|outreach|seminar|lecture|workshop/i],
    ['philosophy', /philosoph|consciousness|\bsoul\b|karma|reincarnation|ved[aā]nta|theolog/i],
    ['bhagavad-gita', /bhagavad|g[iī]t[aā]\b/i],
    ['srimad-bhagavatam', /bh[aā]gavatam|[sś]r[iī]mad/i],
    ['food-for-life', /food for life|hunger|feeding/i],
    ['prasadam', /pras[aā]d|cooking|recipe/i],
    ['cow-protection', /\bcows?\b|go[sś][aā]l[aā]|gau ?seva/i],
    ['education', /school|college|education|academic|universit|student|study/i],
    ['youth', /youth|children|\bkids?\b|teen/i],
    ['family-life', /family|grihastha|g[rṛ]hastha|marriage|parent/i],
    ['women', /\bwomen\b|m[aā]t[aā]j[iī]/i],
    ['obituaries', /passed away|departs?|departure|left (his|her) body|obituary|sam[aā]dhi|in memoriam/i],
    ['offerings', /vy[aā]sa[ -]?p[uū]j[aā]|homage|offering/i],
    ['how-i-came-to-krishna', /how i came|came to kr[sṣ][nṇ]a|my journey/i],
    ['sadhana', /s[aā]dhana|morning program|discipline|brahmac[aā]r|humility|self-esteem/i],
    ['news', /\bnews\b|announce|\bgbc\b|inaugurat|launch|conference|ministry/i],
];

const MAX_TAGS = 3;

/** Title keywords always count; body keywords need two mentions (one for short previews). */
function tagsFor(title: string, body: string): string[] {
    const tags: string[] = [];
    for (const [slug, re] of TOPIC_RULES) {
        if (re.test(title)) tags.push(slug);
    }
    const minHits = body.length < 600 ? 1 : 2; // short previews: one mention is enough
    const bodyHits = TOPIC_RULES
        .map(([slug, re]) => [slug, (body.match(new RegExp(re.source, 'gi')) ?? []).length] as const)
        .filter(([slug, n]) => n >= minHits && !tags.includes(slug))
        .sort((a, b) => b[1] - a[1]);
    for (const [slug] of bodyHits) tags.push(slug);
    return tags.length ? tags.slice(0, MAX_TAGS) : ['news'];
}

/* ---------- sources ---------- */

async function get(url: string): Promise<string> {
    const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'text/html,application/atom+xml,application/xml;q=0.9,*/*;q=0.8' },
        next: { revalidate: 1800 },
        signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
    return res.text();
}

function tag(xml: string, name: string): string {
    const m = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i').exec(xml);
    return m ? m[1].trim() : '';
}

/** Returns stories plus the Dandavats post ids they re-share (for de-duplication). */
async function fetchIDT(): Promise<{ story: ExternalStory; dandavatsId: string | null }[]> {
    const xml = await get(IDT_FEED);
    return xml.split(/<entry[\s>]/).slice(1).map((entry) => {
        const title = stripTags(tag(entry, 'title'));
        const url = /<link[^>]+href="([^"]+)"/i.exec(entry)?.[1] ?? '';
        const contentHtml = decodeEntities(tag(entry, 'content'));
        const text = stripTags(contentHtml);
        const author = stripTags(tag(tag(entry, 'author'), 'name')) || 'ISKCON Desire Tree';
        const dandavatsId = /dandavats\.com\/\?p=(\d+)/i.exec(contentHtml)?.[1] ?? null;
        return {
            dandavatsId,
            story: {
                id: `idt:${url.split('/').pop() || title}`,
                source: 'idt' as const,
                title,
                excerpt: excerpt(text),
                url,
                image: firstHttpsImage(contentHtml),
                author,
                date: tag(entry, 'published') || tag(entry, 'updated') || null,
                tags: tagsFor(title, text),
            },
        };
    }).filter((e) => e.story.title && e.story.url.startsWith('https://'));
}

async function fetchDandavats(): Promise<ExternalStory[]> {
    const html = await get(DANDAVATS_HOME);
    const blocks = html.split(/<div class="itemContainer /).slice(1);
    const seen = new Set<string>();
    const out: ExternalStory[] = [];
    for (const b of blocks) {
        const link = /<h3[^>]*itemTitle[^>]*>\s*<a href="(https:\/\/www\.dandavats\.com\/\?p=(\d+))"[^>]*>([\s\S]*?)<\/a>/i.exec(b);
        if (!link) continue;
        const [, url, id, rawTitle] = link;
        const title = stripTags(rawTitle);
        if (seen.has(id) || /^weekly feed archive/i.test(title)) continue;
        seen.add(id);
        const intro = /<div class="itemIntroText[^"]*"[^>]*>([\s\S]*?)<div class="itemReadMore/i.exec(b)?.[1] ?? '';
        const text = stripTags(intro);
        const author = stripTags(/itemprop="author"[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i.exec(b)?.[1] ?? '') || 'Dandavats';
        const categories = [...(/class="[^"]*\bpost-\d+[^"]*"/i.exec(b)?.[0] ?? '').matchAll(/category-([a-z0-9-]+)/gi)].map((m) => m[1]);
        const dateText = /datePublished"[^>]*>\s*([^<]+)</i.exec(b)?.[1];
        const date = dateText ? new Date(dateText.trim()) : null;
        out.push({
            id: `dandavats:${id}`,
            source: 'dandavats',
            title,
            excerpt: excerpt(text),
            url,
            image: firstHttpsImage(intro),
            author: author === 'Administrator' ? 'Dandavats' : author,
            date: date && !isNaN(date.getTime()) ? date.toISOString() : null,
            tags: tagsFor(title, `${text} ${categories.join(' ')}`),
        });
    }
    return out;
}

export async function getExternalStories(): Promise<{ stories: ExternalStory[]; errors: string[] }> {
    const errors: string[] = [];
    const [idt, dan] = await Promise.all([
        fetchIDT().catch((e: Error) => { errors.push(`idt: ${e.message}`); return []; }),
        fetchDandavats().catch((e: Error) => { errors.push(`dandavats: ${e.message}`); return []; }),
    ]);

    // Prefer the original Dandavats post when IDT re-shares it; borrow IDT's image/date if Dandavats lacks them.
    const byDandavatsId = new Map(idt.filter((e) => e.dandavatsId).map((e) => [e.dandavatsId as string, e.story]));
    const danIds = new Set(dan.map((s) => s.id.split(':')[1]));
    const merged: ExternalStory[] = dan.map((s) => {
        const twin = byDandavatsId.get(s.id.split(':')[1]);
        return twin ? { ...s, image: s.image ?? twin.image, date: s.date ?? twin.date, excerpt: s.excerpt || twin.excerpt } : s;
    });
    for (const { story, dandavatsId } of idt) {
        if (!dandavatsId || !danIds.has(dandavatsId)) merged.push(story);
    }

    merged.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
    return { stories: merged, errors };
}
