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

        // The JSON is keyed by "chapter-verse" format like "1-1", "2-3", etc.
        const verseKey = `${chapter}-${verse}`;
        const verseData = versesObject[verseKey];

        if (!verseData) return null;

        // Handle different possible field structures
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

    // Calculate previous and next verses
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

    // Load actual verse content from JSON data
    const verseContent = await loadVerseContent(chapterNum, verseNum);

    // Fallback content if verse not found in data
    const content = verseContent || {
        devanagari: '',
        transliteration: '',
        synonyms: '',
        translation: 'Verse content loading...',
        purport: '',
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-6">
                    <Link href="/library" className="text-gray-500 hover:underline">Library</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href="/library/bg" className="text-gray-500 hover:underline">Bhagavad-gītā</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href={`/library/bg/${chapterNum}`} className="text-gray-500 hover:underline">
                        Chapter {chapterNum}
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-800">Verse {verseNum}</span>
                </nav>

                {/* Verse Header */}
                <div
                    className="bg-gradient-to-r from-red-900 to-red-800 rounded-xl p-6 mb-6 text-white"
                >
                    <p className="text-sm opacity-80 mb-1">
                        Bhagavad-gītā As It Is
                    </p>
                    <h1 className="text-2xl font-bold">
                        Chapter {chapterNum}, Verse {verseNum}
                    </h1>
                    <p className="opacity-80 mt-1">{chapter.title}</p>
                </div>

                {/* Verse Content */}
                <div className="space-y-6">
                    {/* Devanagari */}
                    {content.devanagari && (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Devanagari
                            </h2>
                            <p
                                className="text-xl leading-loose whitespace-pre-line"
                                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: '#8B0000' }}
                            >
                                {content.devanagari}
                            </p>
                        </div>
                    )}

                    {/* Transliteration */}
                    {content.transliteration && (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Transliteration
                            </h2>
                            <p className="text-lg italic text-gray-700 leading-relaxed whitespace-pre-line">
                                {content.transliteration}
                            </p>
                        </div>
                    )}

                    {/* Synonyms */}
                    {content.synonyms && (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Synonyms
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {content.synonyms}
                            </p>
                        </div>
                    )}

                    {/* Translation */}
                    {content.translation && (
                        <div className="bg-amber-50 rounded-xl shadow-sm p-6 border border-amber-100">
                            <h2 className="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-3">
                                Translation
                            </h2>
                            <p className="text-lg text-gray-800 leading-relaxed font-medium">
                                {content.translation}
                            </p>
                        </div>
                    )}

                    {/* Purport */}
                    {content.purport && (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Purport
                            </h2>
                            <div
                                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: content.purport.replace(/\n/g, '<br/>') }}
                            />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 py-4 border-t border-gray-200">
                    {prevVerse ? (
                        <Link
                            href={`/library/bg/${prevVerse.chapter}/${prevVerse.verse}`}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-gray-400">←</span>
                            <span className="text-gray-700">BG {prevVerse.chapter}.{prevVerse.verse}</span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    <Link
                        href={`/library/bg/${chapterNum}`}
                        className="px-4 py-2 text-purple-600 hover:underline"
                    >
                        All Verses
                    </Link>

                    {nextVerse ? (
                        <Link
                            href={`/library/bg/${nextVerse.chapter}/${nextVerse.verse}`}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-gray-700">BG {nextVerse.chapter}.{nextVerse.verse}</span>
                            <span className="text-gray-400">→</span>
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    );
}
