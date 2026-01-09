import Link from 'next/link';

// Bhagavad Gita chapter data
const chapters = [
    { number: 1, title: 'Observing the Armies on the Battlefield of Kurukṣetra', verses: 46 },
    { number: 2, title: 'Contents of the Gītā Summarized', verses: 72 },
    { number: 3, title: 'Karma-yoga', verses: 43 },
    { number: 4, title: 'Transcendental Knowledge', verses: 42 },
    { number: 5, title: 'Karma-yoga — Action in Kṛṣṇa Consciousness', verses: 29 },
    { number: 6, title: 'Dhyāna-yoga', verses: 47 },
    { number: 7, title: 'Knowledge of the Absolute', verses: 30 },
    { number: 8, title: 'Attaining the Supreme', verses: 28 },
    { number: 9, title: 'The Most Confidential Knowledge', verses: 34 },
    { number: 10, title: 'The Opulence of the Absolute', verses: 42 },
    { number: 11, title: 'The Universal Form', verses: 55 },
    { number: 12, title: 'Devotional Service', verses: 20 },
    { number: 13, title: 'Nature, the Enjoyer, and Consciousness', verses: 35 },
    { number: 14, title: 'The Three Modes of Material Nature', verses: 27 },
    { number: 15, title: 'The Yoga of the Supreme Person', verses: 20 },
    { number: 16, title: 'The Divine and Demoniac Natures', verses: 24 },
    { number: 17, title: 'The Divisions of Faith', verses: 28 },
    { number: 18, title: 'Conclusion — The Perfection of Renunciation', verses: 78 },
];

export default function BhagavadGitaPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1
                        className="text-4xl font-bold mb-4"
                        style={{ color: '#8B0000' }}
                    >
                        Bhagavad-gītā As It Is
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        The eternal message of spiritual wisdom from ancient India,
                        spoken by Lord Śrī Kṛṣṇa to His intimate devotee Arjuna
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        Translation and Commentary by His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda
                    </p>
                </div>

                {/* Chapters List */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 divide-y divide-gray-100">
                        {chapters.map((chapter) => (
                            <Link
                                key={chapter.number}
                                href={`/library/bg/${chapter.number}`}
                                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-full font-bold text-white"
                                    style={{ backgroundColor: '#8B0000' }}
                                >
                                    {chapter.number}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">
                                        Chapter {chapter.number}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {chapter.title}
                                    </p>
                                </div>
                                <div className="text-sm text-gray-400">
                                    {chapter.verses} verses
                                </div>
                            </Link>
                        ))}
                    </div>
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
