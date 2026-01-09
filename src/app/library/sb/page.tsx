import Link from 'next/link';
import { SB_CANTOS } from '@/data/sb-cantos';

export default function SrimadBhagavatamPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1
                        className="text-4xl font-bold mb-4"
                        style={{ color: '#4A5568' }}
                    >
                        Śrīmad-Bhāgavatam
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        The beautiful story of the Supreme Lord and His devotees.
                        The cream of all Vedic literature.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        Translation and Commentary by His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda
                    </p>
                </div>

                {/* Cantos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SB_CANTOS.map((canto) => (
                        <Link
                            key={canto.number}
                            href={`/library/sb/${canto.number}`}
                            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="flex items-center justify-center w-14 h-14 rounded-full font-bold text-white text-xl flex-shrink-0"
                                    style={{ backgroundColor: '#4A5568' }}
                                >
                                    {canto.number}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                                        Canto {canto.number}: {canto.title}
                                    </h3>
                                    <p className="text-sm italic text-gray-500 mb-2">
                                        {canto.titleSanskrit}
                                    </p>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {canto.summary.substring(0, 100)}...
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {canto.chapters} chapters
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Back link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/library"
                        className="text-purple-600 hover:underline"
                    >
                        ← Back to Library
                    </Link>
                </div>
            </div>
        </div>
    );
}
