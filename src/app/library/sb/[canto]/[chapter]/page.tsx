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

    // Sample verses (in production, would come from database)
    const sampleVerses = 30; // Typical chapter verse count
    const verses = Array.from({ length: sampleVerses }, (_, i) => i + 1);

    // Calculate prev/next chapters
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
                    <span className="text-gray-800">Chapter {chapterNum}</span>
                </nav>

                {/* Chapter Header */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <p className="text-sm text-gray-500 mb-2">
                        Canto {cantoNum}, Chapter {chapterNum}
                    </p>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        SB {cantoNum}.{chapterNum}
                    </h1>
                    <p className="text-gray-600">
                        {canto.title} - Chapter {chapterNum}
                    </p>
                </div>

                {/* Verses Grid */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Select a Verse
                    </h2>
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                        {verses.map((verse) => (
                            <Link
                                key={verse}
                                href={`/library/sb/${cantoNum}/${chapterNum}/${verse}`}
                                className="flex items-center justify-center p-3 rounded-lg border border-gray-200 font-medium text-gray-700 hover:border-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                {verse}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    {prevChapter ? (
                        <Link
                            href={`/library/sb/${prevChapter.canto}/${prevChapter.chapter}`}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            ← SB {prevChapter.canto}.{prevChapter.chapter}
                        </Link>
                    ) : (
                        <div />
                    )}
                    {nextChapter && (
                        <Link
                            href={`/library/sb/${nextChapter.canto}/${nextChapter.chapter}`}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            SB {nextChapter.canto}.{nextChapter.chapter} →
                        </Link>
                    )}
                </div>

                {/* Back link */}
                <div className="mt-4 text-center">
                    <Link href={`/library/sb/${cantoNum}`} className="text-purple-600 hover:underline">
                        ← Back to Canto {cantoNum}
                    </Link>
                </div>
            </div>
        </div>
    );
}
