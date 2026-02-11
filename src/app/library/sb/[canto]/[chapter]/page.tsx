import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SB_CANTOS, getCanto } from '@/data/sb-cantos';

// Generate static params for all chapters in all cantos
export function generateStaticParams() {
    const params: { canto: string; chapter: string }[] = [];
    SB_CANTOS.forEach((canto) => {
        for (let c = 1; c <= canto.chapters; c++) {
            params.push({
                canto: canto.number.toString(),
                chapter: c.toString(),
            });
        }
    });
    return params;
}

// Load all translations for a chapter and determine actual verse count
async function loadChapterTranslations(cantoNum: number, chapterNum: number) {
    try {
        const fs = await import('fs/promises');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'src', 'data', 'verse_data', `canto_${cantoNum}_verses.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        const versesObject = JSON.parse(data);

        // Find all verses for this chapter
        const prefix = `${cantoNum}-${chapterNum}-`;
        const translations: Record<number, string> = {};
        let maxVerse = 0;

        for (const key of Object.keys(versesObject)) {
            if (key.startsWith(prefix)) {
                const verseNum = parseInt(key.split('-')[2], 10);
                if (versesObject[key]?.translation) {
                    translations[verseNum] = versesObject[key].translation;
                }
                if (verseNum > maxVerse) maxVerse = verseNum;
            }
        }

        return { translations, verseCount: maxVerse };
    } catch {
        return { translations: {}, verseCount: 30 };
    }
}

interface PageProps {
    params: Promise<{ canto: string; chapter: string }>;
}

export default async function SBChapterPage({ params }: PageProps) {
    const { canto: cantoStr, chapter: chapterStr } = await params;
    const cantoNum = parseInt(cantoStr, 10);
    const chapterNum = parseInt(chapterStr, 10);
    const canto = getCanto(cantoNum);

    if (!canto || chapterNum < 1 || chapterNum > canto.chapters) {
        notFound();
    }

    const { translations, verseCount } = await loadChapterTranslations(cantoNum, chapterNum);
    const verses = Array.from({ length: verseCount }, (_, i) => i + 1);

    const prevChapter = chapterNum > 1
        ? { canto: cantoNum, chapter: chapterNum - 1 }
        : cantoNum > 1
            ? { canto: cantoNum - 1, chapter: getCanto(cantoNum - 1)?.chapters || 1 }
            : null;

    const nextChapter = chapterNum < canto.chapters
        ? { canto: cantoNum, chapter: chapterNum + 1 }
        : cantoNum < 12
            ? { canto: cantoNum + 1, chapter: 1 }
            : null;

    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

                {/* Breadcrumb */}
                <nav style={{ marginBottom: '1.5rem', fontSize: 'var(--text-sm)' }}>
                    <Link href="/library" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Library
                    </Link>
                    <span style={{ margin: '0 0.5rem', color: 'var(--color-border)' }}>»</span>
                    <Link href="/library/sb" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Śrīmad-Bhāgavatam
                    </Link>
                    <span style={{ margin: '0 0.5rem', color: 'var(--color-border)' }}>»</span>
                    <Link href={`/library/sb/${cantoNum}`} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Canto {cantoNum}: {canto.title}
                    </Link>
                </nav>

                {/* Chapter Header */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <p style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-muted)',
                        marginBottom: '0.25rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        Canto {cantoNum}, Chapter {chapterNum}
                    </p>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--text-4xl)',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        marginBottom: '0.5rem',
                    }}>
                        SB {cantoNum}.{chapterNum}
                    </h1>
                    <p style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.7,
                    }}>
                        {canto.title} — Chapter {chapterNum}
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
                            href={`/library/sb/${cantoNum}/${chapterNum}/${verse}`}
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

                {/* Navigation */}
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
                            href={`/library/sb/${prevChapter.canto}/${prevChapter.chapter}`}
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
                            ← SB {prevChapter.canto}.{prevChapter.chapter}
                        </Link>
                    ) : (
                        <div />
                    )}
                    <Link
                        href={`/library/sb/${cantoNum}`}
                        style={{
                            color: 'var(--color-primary)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 600,
                            fontSize: 'var(--text-sm)',
                            textDecoration: 'none',
                        }}
                    >
                        Canto {cantoNum}
                    </Link>
                    {nextChapter ? (
                        <Link
                            href={`/library/sb/${nextChapter.canto}/${nextChapter.chapter}`}
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
                            SB {nextChapter.canto}.{nextChapter.chapter} →
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    );
}
