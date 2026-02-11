import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BG_CHAPTERS, getChapter, getVerseRange } from '@/data/bg-chapters';

// Generate static params for all 18 chapters
export function generateStaticParams() {
    return BG_CHAPTERS.map((chapter) => ({
        chapter: chapter.number.toString(),
    }));
}

// Load all translations for a chapter
async function loadChapterTranslations(chapterNum: number) {
    try {
        const fs = await import('fs/promises');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'src', 'data', 'bg_data', 'bg_verses_content.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const versesObject = JSON.parse(data);

        const translations: Record<number, string> = {};
        const chapter = getChapter(chapterNum);
        if (!chapter) return translations;

        for (let v = 1; v <= chapter.verses; v++) {
            const key = `${chapterNum}-${v}`;
            if (versesObject[key]?.translation) {
                translations[v] = versesObject[key].translation;
            }
        }
        return translations;
    } catch {
        return {};
    }
}

interface PageProps {
    params: Promise<{ chapter: string }>;
}

export default async function BGChapterPage({ params }: PageProps) {
    const { chapter: chapterStr } = await params;
    const chapterNum = parseInt(chapterStr, 10);
    const chapter = getChapter(chapterNum);

    if (!chapter) {
        notFound();
    }

    const verses = getVerseRange(chapterNum);
    const translations = await loadChapterTranslations(chapterNum);
    const prevChapter = chapterNum > 1 ? chapterNum - 1 : null;
    const nextChapter = chapterNum < 18 ? chapterNum + 1 : null;

    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

                {/* Breadcrumb */}
                <nav style={{ marginBottom: '1.5rem', fontSize: 'var(--text-sm)' }}>
                    <Link href="/library" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Library
                    </Link>
                    <span style={{ margin: '0 0.5rem', color: 'var(--color-border)' }}>»</span>
                    <Link href="/library/bg" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Bhagavad-gītā As It Is
                    </Link>
                </nav>

                {/* Chapter Header */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <p style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-muted)',
                        marginBottom: '0.25rem',
                        fontFamily: 'var(--font-body)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        Chapter {chapterNum}
                    </p>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--text-4xl)',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        marginBottom: '0.5rem',
                    }}>
                        {chapter.title}
                    </h1>
                    <p style={{
                        fontSize: 'var(--text-xl)',
                        fontStyle: 'italic',
                        color: 'var(--color-secondary-dark)',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-heading)',
                    }}>
                        {chapter.titleSanskrit}
                    </p>
                    <p style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.7,
                    }}>
                        {chapter.summary}
                    </p>
                    <div style={{
                        marginTop: '1.5rem',
                        height: '2px',
                        background: 'linear-gradient(90deg, var(--color-secondary), transparent)',
                    }} />
                </div>

                {/* Verse List — Vedabase style with translations */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {verses.map((verse) => (
                        <Link
                            key={verse}
                            href={`/library/bg/${chapterNum}/${verse}`}
                            style={{
                                display: 'block',
                                padding: '1.25rem 0',
                                borderBottom: '1px solid var(--color-border-light)',
                                textDecoration: 'none',
                                transition: 'background var(--transition-fast)',
                            }}
                        >
                            <span style={{
                                color: 'var(--color-primary)',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                fontSize: 'var(--text-base)',
                            }}>
                                TEXT {verse}:
                            </span>
                            {translations[verse] && (
                                <span style={{
                                    marginLeft: '0.5rem',
                                    color: 'var(--color-text)',
                                    fontSize: 'var(--text-base)',
                                    lineHeight: 1.7,
                                }}>
                                    {translations[verse]}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Chapter Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '2.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '2px solid var(--color-secondary)',
                }}>
                    {prevChapter ? (
                        <Link
                            href={`/library/bg/${prevChapter}`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.625rem 1.25rem',
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-lg)',
                                color: 'var(--color-text-secondary)',
                                fontSize: 'var(--text-sm)',
                                fontWeight: 500,
                                textDecoration: 'none',
                            }}
                        >
                            ← Chapter {prevChapter}
                        </Link>
                    ) : (
                        <div />
                    )}
                    <Link
                        href="/library/bg"
                        style={{
                            color: 'var(--color-primary)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 600,
                            fontSize: 'var(--text-sm)',
                            textDecoration: 'none',
                        }}
                    >
                        All Chapters
                    </Link>
                    {nextChapter ? (
                        <Link
                            href={`/library/bg/${nextChapter}`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.625rem 1.25rem',
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-lg)',
                                color: 'var(--color-text-secondary)',
                                fontSize: 'var(--text-sm)',
                                fontWeight: 500,
                                textDecoration: 'none',
                            }}
                        >
                            Chapter {nextChapter} →
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    );
}
