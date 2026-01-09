import Link from 'next/link';
import Image from 'next/image';

const mainBooks = [
    {
        title: 'Bhagavad-gītā As It Is',
        href: '/library/bg',
        image: '/books/bg.jpg',
    },
    {
        title: 'Śrīmad-Bhāgavatam',
        href: '/library/sb',
        image: '/books/sb.jpg',
    },
    {
        title: 'Śrī Caitanya-caritāmṛta',
        href: '/library/cc',
        image: '/books/cc.jpg',
    },
    {
        title: 'Kṛṣṇa Book',
        href: '/library/kb',
        image: '/books/kb.jpg',
    },
    {
        title: 'The Nectar of Instruction',
        href: '/library/noi',
        image: '/books/noi.jpg',
    },
    {
        title: 'The Nectar of Devotion',
        href: '/library/nod',
        image: '/books/nod.jpg',
    },
];

const otherBooks = [
    { title: 'Sri Isopanisad', image: '/books/iso.jpg' },
    { title: 'Teachings of Lord Caitanya', image: '/books/tlc.jpg' },
    { title: 'Science of Self-Realization', image: '/books/ssr.jpg' },
    { title: 'Beyond Birth and Death', image: '/books/bbd.jpg' },
    { title: 'Perfect Questions, Perfect Answers', image: '/books/pqpa.jpg' },
    { title: 'Journey of Self Discovery', image: '/books/josd.jpg' },
];

export default function LibraryPage() {
    return (
        <div className="min-h-screen bg-[#F5E6C8] py-12">
            <div className="w-full px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Vedic Literature Library
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore the timeless wisdom of the Vedic scriptures as presented by
                        His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda
                    </p>
                </div>

                {/* Main Books - Full Cover Display */}
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    {mainBooks.map((book) => (
                        <Link
                            key={book.href}
                            href={book.href}
                            className="group relative flex-shrink-0"
                        >
                            <div className="relative w-[160px] h-[240px] md:w-[180px] md:h-[270px] lg:w-[200px] lg:h-[300px] rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    quality={100}
                                    sizes="200px"
                                    priority
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <p className="mt-3 text-center text-sm font-medium text-gray-800 max-w-[200px]">
                                {book.title}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Other Books Section */}
                <div className="bg-white/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                        Other Books by Śrīla Prabhupāda
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {otherBooks.map((book) => (
                            <div
                                key={book.title}
                                className="group flex-shrink-0"
                            >
                                <div className="relative w-[120px] h-[180px] md:w-[140px] md:h-[210px] rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        quality={100}
                                        sizes="140px"
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <p className="mt-2 text-center text-xs font-medium text-gray-700 max-w-[140px]">
                                    {book.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
