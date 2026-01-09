import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SB_CANTOS, getCanto } from '@/data/sb-cantos';

// Force dynamic rendering for verse pages
export const dynamic = 'force-dynamic';

// Load SB verse content from JSON files
async function loadSBVerseContent(canto: number, chapter: number, verse: number) {
    try {
        const fs = await import('fs/promises');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'src', 'data', 'verse_data', `canto_${canto}_verses.json`);
        const data = await fs.readFile(filePath, 'utf-8');
        const versesData = JSON.parse(data);

        // The JSON is keyed by "canto-chapter-verse" format like "1-1-1", "1-2-3", etc.
        const verseKey = `${canto}-${chapter}-${verse}`;
        const verseData = versesData[verseKey];

        if (!verseData) {
            console.log(`Verse not found: ${verseKey}`);
            return null;
        }

        // Handle array fields
        const devanagari = Array.isArray(verseData.sanskrit_devanagari)
            ? verseData.sanskrit_devanagari.join('\n')
            : (verseData.sanskrit_devanagari || verseData.devanagari || '');

        const transliteration = Array.isArray(verseData.sanskrit_transliterated)
            ? verseData.sanskrit_transliterated.join('\n')
            : (verseData.transliteration || verseData.sanskrit_transliterated || '');

        return {
            devanagari,
            transliteration,
            synonyms: verseData.word_meanings || verseData.synonyms || '',
            translation: verseData.translation || '',
            purport: verseData.purport || '',
        };
    } catch (error) {
        console.error('Error loading SB verse:', error);
        return null;
    }
}

interface PageProps {
    params: Promise<{ canto: string; chapter: string; verse: string }>;
}

export default async function SBVersePage({ params }: PageProps) {
    const { canto: cantoStr, chapter: chapterStr, verse: verseStr } = await params;
    const cantoNum = parseInt(cantoStr, 10);
    const chapterNum = parseInt(chapterStr, 10);
    const verseNum = parseInt(verseStr, 10);
    const canto = getCanto(cantoNum);

    if (!canto || chapterNum < 1 || chapterNum > canto.chapters || verseNum < 1) {
        notFound();
    }

    // Load verse content from JSON files
    const verseContent = await loadSBVerseContent(cantoNum, chapterNum, verseNum);

    // Fallback if verse not found
    const content = verseContent || {
        devanagari: 'ॐ नमो भगवते वासुदेवाय',
        transliteration: 'oṁ namo bhagavate vāsudevāya',
        synonyms: 'oṁ — O my Lord; namaḥ — my respectful obeisances; bhagavate — unto the Personality of Godhead; vāsudevāya — unto Lord Kṛṣṇa, the son of Vasudeva.',
        translation: 'O my Lord, the all-pervading Personality of Godhead, I offer my respectful obeisances unto You.',
        purport: 'Vāsudeva, or Lord Śrī Kṛṣṇa, the son of Vasudeva, is the Supreme Personality of Godhead.',
    };

    // Calculate prev/next verses
    const prevVerse = verseNum > 1
        ? { canto: cantoNum, chapter: chapterNum, verse: verseNum - 1 }
        : null;

    const nextVerse = { canto: cantoNum, chapter: chapterNum, verse: verseNum + 1 };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-6">
                    <Link href="/library" className="text-gray-500 hover:underline">Library</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href="/library/sb" className="text-gray-500 hover:underline">Śrīmad-Bhāgavatam</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href={`/library/sb/${cantoNum}`} className="text-gray-500 hover:underline">
                        Canto {cantoNum}
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href={`/library/sb/${cantoNum}/${chapterNum}`} className="text-gray-500 hover:underline">
                        Chapter {chapterNum}
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-800">Verse {verseNum}</span>
                </nav>

                {/* Verse Header */}
                <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl p-6 mb-6 text-white">
                    <p className="text-sm opacity-80 mb-1">Śrīmad-Bhāgavatam</p>
                    <h1 className="text-2xl font-bold">SB {cantoNum}.{chapterNum}.{verseNum}</h1>
                    <p className="opacity-80 mt-1">{canto.title}</p>
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
                                className="text-xl leading-loose"
                                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: '#4A5568' }}
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
                            <p className="text-lg italic text-gray-700 leading-relaxed">
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
                            <p className="text-gray-700 leading-relaxed">{content.synonyms}</p>
                        </div>
                    )}

                    {/* Translation */}
                    {content.translation && (
                        <div className="bg-blue-50 rounded-xl shadow-sm p-6 border border-blue-100">
                            <h2 className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-3">
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
                            href={`/library/sb/${prevVerse.canto}/${prevVerse.chapter}/${prevVerse.verse}`}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-gray-400">←</span>
                            <span className="text-gray-700">SB {prevVerse.canto}.{prevVerse.chapter}.{prevVerse.verse}</span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    <Link
                        href={`/library/sb/${cantoNum}/${chapterNum}`}
                        className="px-4 py-2 text-purple-600 hover:underline"
                    >
                        All Verses
                    </Link>

                    <Link
                        href={`/library/sb/${nextVerse.canto}/${nextVerse.chapter}/${nextVerse.verse}`}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <span className="text-gray-700">SB {nextVerse.canto}.{nextVerse.chapter}.{nextVerse.verse}</span>
                        <span className="text-gray-400">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
