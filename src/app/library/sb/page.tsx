import Link from 'next/link';
import Image from 'next/image';
import { SB_VOLUMES } from '@/data/sb-cantos';

export default function SrimadBhagavatamPage() {
    return (
        <div className="min-h-screen bg-[#F5E6C8] py-12">
            <div className="w-full px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Śrīmad-Bhāgavatam
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        The beautiful story of the Supreme Lord and His devotees.
                        The cream of all Vedic literature.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Translation and Commentary by His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda
                    </p>
                </div>

                {/* Book Cover Cards Grid */}
                <div className="flex flex-wrap justify-center gap-6">
                    {SB_VOLUMES.map((volume) => (
                        <Link
                            key={volume.id}
                            href={volume.href}
                            className="group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative w-[160px] h-[210px] md:w-[180px] md:h-[240px] lg:w-[200px] lg:h-[270px] rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src={volume.coverImage}
                                    alt={volume.displayName}
                                    fill
                                    quality={100}
                                    sizes="200px"
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <p className="mt-3 text-center text-sm font-medium text-gray-800 max-w-[200px]">
                                {volume.displayName}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Back link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/library"
                        className="text-amber-700 hover:text-amber-900 hover:underline font-medium"
                    >
                        ← Back to Library
                    </Link>
                </div>
            </div>
        </div>
    );
}
