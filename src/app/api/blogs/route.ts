import { NextRequest, NextResponse } from 'next/server';

interface Blog {
    title: string;
    author: string;
    date: string;
    thumbnail: string;
    url: string;
}

// In-memory cache
let blogCache: { blogs: Blog[]; fetchedAt: Date | null } = {
    blogs: [],
    fetchedAt: null,
};
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

function isCacheValid(): boolean {
    if (!blogCache.fetchedAt || blogCache.blogs.length === 0) return false;
    return Date.now() - blogCache.fetchedAt.getTime() < CACHE_MAX_AGE_MS;
}

// Fetch thumbnail from individual blog page
async function fetchBlogThumbnail(blogUrl: string): Promise<string> {
    try {
        const response = await fetch(blogUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        });
        if (!response.ok) return '';

        const html = await response.text();

        // Look for og:image meta tag first (most reliable)
        const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
            html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
        if (ogImageMatch && ogImageMatch[1]) {
            return ogImageMatch[1];
        }

        // Look for images in content area
        const imgMatches = [...html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/gi)];
        for (const match of imgMatches) {
            const src = match[1];
            if (!src) continue;
            if (/avatar|icon|logo|profile|gravatar|badge|16x16|32x32|48x48|spinner/i.test(src)) continue;
            if (src.includes('ning.com') || src.includes('iskcondesiretree.com')) {
                return src.startsWith('//') ? `https:${src}` : src;
            }
        }

        return '';
    } catch {
        return '';
    }
}

// Fetch blogs from ISKCON Desire Tree
async function fetchFreshBlogs(maxBlogs: number = 15): Promise<Blog[]> {
    const url = 'https://iskcondesiretree.com/profiles/blogs?sort=newestPosts';
    const blogs: Blog[] = [];

    try {
        console.log('Fetching blog list from ISKCON DT...');
        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        });

        if (!response.ok) {
            console.error('Failed to fetch blog list:', response.status);
            return [];
        }

        const html = await response.text();
        const seenUrls = new Set<string>();

        // Pattern for blog URLs - the HTML has multiline content
        // Match: <a href="...blog-url..." ...>TITLE TEXT</a>
        // Use [\s\S] to match across lines
        const blogUrlPattern = /<a[^>]*href="(https:\/\/iskcondesiretree\.com\/profiles\/blogs\/[a-z0-9-]+)"[^>]*>[\s\S]*?<\/a>/gi;

        // Skip list URLs
        const skipSlugs = ['feed', 'list', 'blogpost', 'featured', 'new'];

        let match;
        while ((match = blogUrlPattern.exec(html)) !== null && blogs.length < maxBlogs) {
            const blogUrl = match[1];
            const fullMatch = match[0];

            // Extract slug from URL
            const slug = blogUrl.split('/').pop() || '';

            // Skip navigation links
            if (skipSlugs.some(skip => slug.includes(skip))) continue;
            if (seenUrls.has(blogUrl)) continue;

            seenUrls.add(blogUrl);

            // Extract title from the link text (remove HTML tags)
            const titleMatch = fullMatch.match(/>([^<]+)</);
            if (!titleMatch) continue;

            const title = titleMatch[1].trim();
            if (!isValidTitle(title)) continue;

            // Try to get author and date from nearby context
            const contextStart = Math.max(0, match.index - 200);
            const contextEnd = Math.min(html.length, match.index + 800);
            const context = html.slice(contextStart, contextEnd);

            const authorMatch = context.match(/Posted by[\s\S]*?<a[^>]*>([^<]+)<\/a>/i);
            const dateMatch = context.match(/on\s+([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})/i) ||
                context.match(/(\d{1,2}\s+[A-Z][a-z]+\s+\d{4})/i) ||
                context.match(/([A-Z][a-z]+\s+\d{1,2},?\s+\d{4}\s+at\s+\d+:\d+[ap]m)/i);

            blogs.push({
                title: decodeHTML(title),
                author: authorMatch ? decodeHTML(authorMatch[1].trim()) : 'ISKCON Desire Tree',
                date: dateMatch ? dateMatch[1].split(' at ')[0] : 'Recent',
                thumbnail: '', // Will fetch separately
                url: blogUrl,
            });

            console.log(`  Found: ${title.slice(0, 40)}...`);
        }

        console.log(`Found ${blogs.length} blog entries, fetching thumbnails...`);

        // Fetch thumbnails in parallel (limit to first 10 to avoid timeout)
        const thumbnailPromises = blogs.slice(0, 10).map(async (blog, i) => {
            const thumbnail = await fetchBlogThumbnail(blog.url);
            blogs[i].thumbnail = thumbnail;
            console.log(`  Thumbnail ${i + 1}: ${thumbnail ? '✓' : '✗'}`);
        });

        await Promise.all(thumbnailPromises);

        return blogs;
    } catch (error) {
        console.error('Error fetching ISKCON blogs:', error);
        return [];
    }
}

function isValidTitle(title: string): boolean {
    if (title.length < 5 || title.length > 200) return false;
    const skipList = ['blog', 'blogs', 'all posts', 'featured', 'featured posts', 'read more',
        'view all', 'see all', 'more', 'search', 'home', 'login', 'sign in',
        'my page', 'inbox', 'add post', 'newest posts', 'comments', 'add'];
    return !skipList.includes(title.toLowerCase().trim());
}

function decodeHTML(text: string): string {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&#8211;/g, '–')
        .replace(/&#8212;/g, '—')
        .replace(/&#8217;/g, "'")
        .replace(/&#x27;/g, "'");
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const maxBlogs = parseInt(searchParams.get('max') || '15', 10);
        const forceRefresh = searchParams.get('refresh') === 'true';

        if (!forceRefresh && isCacheValid()) {
            return NextResponse.json({
                success: true,
                source: 'cache',
                cachedAt: blogCache.fetchedAt?.toISOString(),
                count: Math.min(blogCache.blogs.length, maxBlogs),
                blogs: blogCache.blogs.slice(0, maxBlogs),
            });
        }

        const freshBlogs = await fetchFreshBlogs(maxBlogs);

        if (freshBlogs.length > 0) {
            blogCache = { blogs: freshBlogs, fetchedAt: new Date() };
            return NextResponse.json({
                success: true,
                source: 'live',
                fetchedAt: blogCache.fetchedAt!.toISOString(),
                count: freshBlogs.length,
                blogs: freshBlogs,
            });
        }

        // Fallback to static data
        try {
            const staticData = await import('@/data/popular-blogs.json');
            const blogs = (staticData as any).default?.blogs || [];
            return NextResponse.json({
                success: true,
                source: 'static-fallback',
                count: Math.min(blogs.length, maxBlogs),
                blogs: blogs.slice(0, maxBlogs),
            });
        } catch {
            return NextResponse.json({ success: false, error: 'No blogs', blogs: [] });
        }
    } catch (error: any) {
        console.error('Blogs API error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST() {
    const freshBlogs = await fetchFreshBlogs(15);
    if (freshBlogs.length > 0) {
        blogCache = { blogs: freshBlogs, fetchedAt: new Date() };
        return NextResponse.json({ success: true, count: freshBlogs.length, blogs: freshBlogs });
    }
    return NextResponse.json({ success: false, message: 'Failed to fetch blogs' });
}
