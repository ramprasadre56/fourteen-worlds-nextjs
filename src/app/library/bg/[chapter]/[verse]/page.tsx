import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BG_CHAPTERS, getChapter } from '@/data/bg-chapters';

// Force dynamic rendering for verse pages
export const dynamic = 'force-dynamic';

// Verse content loader using fs for server-side
async function loadVerseContent(chapter: number, verse: number) {
    try {
        const fs = await import('fs/promises');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'src', 'data', 'bg_data', 'bg_verses_content.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const versesObject = JSON.parse(data);

        const verseKey = `${chapter}-${verse}`;
        const verseData = versesObject[verseKey];

        if (!verseData) return null;

        const devanagari = Array.isArray(verseData.sanskrit_devanagari)
            ? verseData.sanskrit_devanagari.join('\n')
            : (verseData.devanagari || '');

        const transliteration = Array.isArray(verseData.transliteration)
            ? verseData.transliteration.join('\n')
            : (verseData.transliteration || '');

        return {
            devanagari,
            transliteration,
            synonyms: verseData.word_meanings || verseData.synonyms || '',
            translation: verseData.translation || '',
            purport: verseData.purport || '',
        };
    } catch (error) {
        console.error('Error loading verse:', error);
        return null;
    }
}

interface PageProps {
    params: Promise<{ chapter: string; verse: string }>;
}

export default async function BGVersePage({ params }: PageProps) {
    const { chapter: chapterStr, verse: verseStr } = await params;
    const chapterNum = parseInt(chapterStr, 10);
    const verseNum = parseInt(verseStr, 10);
    const chapter = getChapter(chapterNum);

    if (!chapter || verseNum < 1 || verseNum > chapter.verses) {
        notFound();
    }

    const prevVerse = verseNum > 1
        ? { chapter: chapterNum, verse: verseNum - 1 }
        : chapterNum > 1
            ? { chapter: chapterNum - 1, verse: getChapter(chapterNum - 1)?.verses || 1 }
            : null;

    const nextVerse = verseNum < chapter.verses
        ? { chapter: chapterNum, verse: verseNum + 1 }
        : chapterNum < 18
            ? { chapter: chapterNum + 1, verse: 1 }
            : null;

    const verseContent = await loadVerseContent(chapterNum, verseNum);

    const content = verseContent || {
        devanagari: '',
        transliteration: '',
        synonyms: '',
        translation: 'Verse content loading...',
        purport: '',
    };

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
                    <span style={{ margin: '0 0.5rem', color: 'var(--color-border)' }}>»</span>
                    <Link href={`/library/bg/${chapterNum}`} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Chapter {chapterNum}: {chapter.title}
                    </Link>
                </nav>

                {/* Verse Title */}
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginBottom: '2rem',
                    paddingBottom: '1rem',
                    borderBottom: '2px solid var(--color-secondary)',
                }}>
                    Bg. {chapterNum}.{verseNum}
                </h1>

                {/* Verse Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Devanagari */}
                    {content.devanagari && (
                        <section>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'var(--text-xl)',
                                fontWeight: 600,
                                color: 'var(--color-primary)',
                                marginBottom: '0.75rem',
                                paddingBottom: '0.5rem',
                                borderBottom: '1px solid var(--color-border-light)',
                            }}>
                                Devanāgarī
                            </h2>
                            <p style={{
                                fontSize: '1.25rem',
                                lineHeight: 2,
                                whiteSpace: 'pre-line',
                                fontFamily: "'Noto Sans Devanagari', sans-serif",
                                color: 'var(--color-primary)',
                            }}>
                                {content.devanagari}
                            </p>
                        </section>
                    )}

                    {/* Verse Text / Transliteration */}
                    {content.transliteration && (
                        <section>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'var(--text-xl)',
                                fontWeight: 600,
                                color: 'var(--color-primary)',
                                marginBottom: '0.75rem',
                                paddingBottom: '0.5rem',
                                borderBottom: '1px solid var(--color-border-light)',
                            }}>
                                Text
                            </h2>
                            <p style={{
                                fontSize: 'var(--text-lg)',
                                fontStyle: 'italic',
                                lineHeight: 1.9,
                                whiteSpace: 'pre-line',
                                color: 'var(--color-text-secondary)',
                            }}>
                                {content.transliteration}
                            </p>
                        </section>
                    )}

                    {/* Synonyms */}
                    {content.synonyms && (
                        <section>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'var(--text-xl)',
                                fontWeight: 600,
                                color: 'var(--color-primary)',
                                marginBottom: '0.75rem',
                                paddingBottom: '0.5rem',
                                borderBottom: '1px solid var(--color-border-light)',
                            }}>
                                Synonyms
                            </h2>
                            <p style={{
                                fontSize: 'var(--text-base)',
                                lineHeight: 1.8,
                                color: 'var(--color-text-secondary)',
                            }}>
                                {content.synonyms}
                            </p>
                        </section>
                    )}

                    {/* Translation */}
                    {content.translation && (
                        <section>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'var(--text-xl)',
                                fontWeight: 600,
                                color: 'var(--color-primary)',
                                marginBottom: '0.75rem',
                                paddingBottom: '0.5rem',
                                borderBottom: '1px solid var(--color-border-light)',
                            }}>
                                Translation
                            </h2>
                            <p style={{
                                fontSize: 'var(--text-lg)',
                                lineHeight: 1.8,
                                fontWeight: 500,
                                color: 'var(--color-text)',
                            }}>
                                {content.translation}
                            </p>
                        </section>
                    )}

                    {/* Purport */}
                    {content.purport && (
                        <section>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'var(--text-xl)',
                                fontWeight: 600,
                                color: 'var(--color-primary)',
                                marginBottom: '0.75rem',
                                paddingBottom: '0.5rem',
                                borderBottom: '1px solid var(--color-border-light)',
                            }}>
                                Purport
                            </h2>
                            <div
                                style={{
                                    fontSize: 'var(--text-base)',
                                    lineHeight: 1.8,
                                    color: 'var(--color-text-secondary)',
                                }}
                                dangerouslySetInnerHTML={{ __html: content.purport.replace(/\n/g, '<br/>') }}
                            />
                        </section>
                    )}
                </div>

                {/* Bottom Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '3rem',
                    paddingTop: '1.5rem',
                    borderTop: '2px solid var(--color-secondary)',
                }}>
                    {prevVerse ? (
                        <Link
                            href={`/library/bg/${prevVerse.chapter}/${prevVerse.verse}`}
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
                                transition: 'all var(--transition-fast)',
                            }}
                        >
                            ← Bg. {prevVerse.chapter}.{prevVerse.verse}
                        </Link>
                    ) : (
                        <div />
                    )}

                    <Link
                        href={`/library/bg/${chapterNum}`}
                        style={{
                            padding: '0.625rem 1.25rem',
                            color: 'var(--color-primary)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 600,
                            fontSize: 'var(--text-sm)',
                            textDecoration: 'none',
                        }}
                    >
                        Chapter {chapterNum}
                    </Link>

                    {nextVerse ? (
                        <Link
                            href={`/library/bg/${nextVerse.chapter}/${nextVerse.verse}`}
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
                                transition: 'all var(--transition-fast)',
                            }}
                        >
                            Bg. {nextVerse.chapter}.{nextVerse.verse} →
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    );
}
