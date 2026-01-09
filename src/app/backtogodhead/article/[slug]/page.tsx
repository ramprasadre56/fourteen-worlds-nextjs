import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { ArrowLeft, User, Clock, Calendar } from 'lucide-react';
import magazineData from '@/data/btg_magazine_data.json';
import './vedic-article.css';

interface Article {
    id: string;
    title: string;
    author: string;
    reading_time: string;
    date: string;
    image: string;
    category: string;
    path: string;
    description: string;
    is_premium: boolean;
    url: string;
}

interface Issue {
    issue: string;
    cover_image: string;
    articles: Article[];
}

// Find article by slug
function findArticleBySlug(slug: string): { article: Article; issue: Issue } | null {
    const issues: Issue[] = magazineData as Issue[];

    for (const issue of issues) {
        for (const article of issue.articles) {
            const articleSlug = article.path
                .replace('/btg_articles_content/', '')
                .replace('.html', '');

            if (articleSlug === slug) {
                return { article, issue };
            }
        }
    }
    return null;
}

// Read HTML content from file
function getArticleContent(articlePath: string): string {
    try {
        const fileName = articlePath.replace('/btg_articles_content/', '');
        const filePath = path.join(process.cwd(), 'public', 'btg_articles', fileName);

        if (fs.existsSync(filePath)) {
            const html = fs.readFileSync(filePath, 'utf-8');
            const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
            if (bodyMatch) {
                return bodyMatch[1];
            }
            return html;
        }
    } catch (error) {
        console.error('Error reading article:', error);
    }
    return '';
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const result = findArticleBySlug(slug);

    if (!result) {
        notFound();
    }

    const { article, issue } = result;
    const content = getArticleContent(article.path);
    const hasLocalContent = content.length > 100;

    return (
        <div className="min-h-screen bg-amber-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-4 px-8">
                <div className="w-full flex items-center justify-between">
                    <Link
                        href="/backtogodhead"
                        className="inline-flex items-center gap-2 text-amber-200 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to Magazine
                    </Link>
                    <div className="text-sm text-amber-200">{issue.issue}</div>
                </div>
            </div>

            {/* Article Content */}
            <article className="w-full px-8 py-8">
                {/* Article Header */}
                <header className="mb-10 text-center max-w-4xl mx-auto">
                    {article.image && (
                        <div className="relative w-full max-w-2xl mx-auto h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4 leading-tight">
                        {article.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-amber-700 italic mb-6">
                        {article.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-base text-amber-600">
                        <span className="flex items-center gap-2">
                            <User size={18} />
                            {article.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={18} />
                            {article.reading_time}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar size={18} />
                            {article.date}
                        </span>
                    </div>
                </header>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center mb-10">
                    <div className="h-px w-16 bg-amber-300"></div>
                    <div className="mx-4 text-amber-400 text-2xl">✦</div>
                    <div className="h-px w-16 bg-amber-300"></div>
                </div>

                {/* Article Body - ISKCON Traditional Style */}
                {hasLocalContent ? (
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="vedic-article"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                ) : (
                    <div className="bg-amber-100 border border-amber-300 rounded-xl p-8 text-center max-w-2xl mx-auto">
                        <p className="text-amber-800 mb-4 font-serif text-lg">
                            This article content is available with a BTG subscription.
                        </p>
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition-colors"
                        >
                            Read on BTG India
                        </a>
                    </div>
                )}

                {/* Decorative Footer Divider */}
                <div className="flex items-center justify-center mt-12 mb-8">
                    <div className="h-px w-16 bg-amber-300"></div>
                    <div className="mx-4 text-amber-400 text-2xl">❋</div>
                    <div className="h-px w-16 bg-amber-300"></div>
                </div>

                {/* Footer Navigation */}
                <div className="text-center">
                    <Link
                        href="/backtogodhead"
                        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to all issues
                    </Link>
                </div>
            </article>
        </div>
    );
}
