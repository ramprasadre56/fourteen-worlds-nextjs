import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SB_CANTOS, getCanto } from '@/data/sb-cantos';

// Generate static params for all 12 cantos
export function generateStaticParams() {
    return SB_CANTOS.map((canto) => ({
        canto: canto.number.toString(),
    }));
}

interface PageProps {
    params: Promise<{ canto: string }>;
}

export default async function SBCantoPage({ params }: PageProps) {
    const { canto: cantoStr } = await params;
    const cantoNum = parseInt(cantoStr, 10);
    const canto = getCanto(cantoNum);

    if (!canto) {
        notFound();
    }

    // Generate chapter list
    const chapters = Array.from({ length: canto.chapters }, (_, i) => i + 1);
    const prevCanto = cantoNum > 1 ? cantoNum - 1 : null;
    const nextCanto = cantoNum < 12 ? cantoNum + 1 : null;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-6">
                    <Link href="/library" className="text-gray-500 hover:underline">Library</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href="/library/sb" className="text-gray-500 hover:underline">Śrīmad-Bhāgavatam</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-800">Canto {cantoNum}</span>
                </nav>

                {/* Canto Header */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <p className="text-sm text-gray-500 mb-2">
                        Canto {cantoNum} of 12
                    </p>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {canto.title}
                    </h1>
                    <p
                        className="text-xl italic mb-4"
                        style={{ color: '#4A5568' }}
                    >
                        {canto.titleSanskrit}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        {canto.summary}
                    </p>
                    <p className="text-sm text-gray-400 mt-4">
                        {canto.chapters} chapters
                    </p>
                </div>

                {/* Chapters List */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <h2 className="text-xl font-bold text-gray-800 p-6 border-b">
                        Chapters
                    </h2>
                    <div className="grid grid-cols-1 divide-y divide-gray-100">
                        {chapters.map((chapter) => (
                            <Link
                                key={chapter}
                                href={`/library/sb/${cantoNum}/${chapter}`}
                                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div
                                    className="flex items-center justify-center w-10 h-10 rounded-full font-medium text-white"
                                    style={{ backgroundColor: '#718096' }}
                                >
                                    {chapter}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-800">
                                        Chapter {chapter}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        SB {cantoNum}.{chapter}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    {prevCanto ? (
                        <Link
                            href={`/library/sb/${prevCanto}`}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            ← Canto {prevCanto}
                        </Link>
                    ) : (
                        <div />
                    )}
                    {nextCanto && (
                        <Link
                            href={`/library/sb/${nextCanto}`}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Canto {nextCanto} →
                        </Link>
                    )}
                </div>

                {/* Back link */}
                <div className="mt-4 text-center">
                    <Link href="/library/sb" className="text-purple-600 hover:underline">
                        ← Back to All Cantos
                    </Link>
                </div>
            </div>
        </div>
    );
}
