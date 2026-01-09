import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BG_CHAPTERS, getChapter, getVerseRange } from '@/data/bg-chapters';

// Generate static params for all 18 chapters
export function generateStaticParams() {
    return BG_CHAPTERS.map((chapter) => ({
        chapter: chapter.number.toString(),
    }));
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
    const prevChapter = chapterNum > 1 ? chapterNum - 1 : null;
    const nextChapter = chapterNum < 18 ? chapterNum + 1 : null;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-6">
                    <Link href="/library" className="text-gray-500 hover:underline">Library</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href="/library/bg" className="text-gray-500 hover:underline">Bhagavad-gītā</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-800">Chapter {chapterNum}</span>
                </nav>

                {/* Chapter Header */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <p className="text-sm text-gray-500 mb-2">
                        Chapter {chapterNum} of 18
                    </p>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {chapter.title}
                    </h1>
                    <p
                        className="text-xl italic mb-4"
                        style={{ color: '#8B0000' }}
                    >
                        {chapter.titleSanskrit}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        {chapter.summary}
                    </p>
                    <p className="text-sm text-gray-400 mt-4">
                        {chapter.verses} verses
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
                                href={`/library/bg/${chapterNum}/${verse}`}
                                className="flex items-center justify-center p-3 rounded-lg border border-gray-200 font-medium text-gray-700 hover:border-red-800 hover:text-red-800 hover:bg-red-50 transition-colors"
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
                            href={`/library/bg/${prevChapter}`}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            ← Chapter {prevChapter}
                        </Link>
                    ) : (
                        <div />
                    )}
                    {nextChapter && (
                        <Link
                            href={`/library/bg/${nextChapter}`}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Chapter {nextChapter} →
                        </Link>
                    )}
                </div>

                {/* Back link */}
                <div className="mt-4 text-center">
                    <Link href="/library/bg" className="text-purple-600 hover:underline">
                        ← Back to All Chapters
                    </Link>
                </div>
            </div>
        </div>
    );
}
