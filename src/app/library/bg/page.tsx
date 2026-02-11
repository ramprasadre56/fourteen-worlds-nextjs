import Link from 'next/link';

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
        <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

                {/* Breadcrumb */}
                <nav style={{ marginBottom: '1.5rem', fontSize: 'var(--text-sm)' }}>
                    <Link href="/library" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Library
                    </Link>
                </nav>

                {/* Title */}
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginBottom: '0.5rem',
                }}>
                    Bhagavad-gītā As It Is
                </h1>
                <p style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-muted)',
                    marginBottom: '2rem',
                }}>
                    Translation and Commentary by His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda
                </p>
                <div style={{
                    height: '2px',
                    marginBottom: '2rem',
                    background: 'linear-gradient(90deg, var(--color-secondary), transparent)',
                }} />

                {/* Chapters List */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {chapters.map((chapter) => (
                        <Link
                            key={chapter.number}
                            href={`/library/bg/${chapter.number}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem 0',
                                borderBottom: '1px solid var(--color-border-light)',
                                textDecoration: 'none',
                                transition: 'all var(--transition-fast)',
                            }}
                        >
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: 'var(--radius-full)',
                                background: 'var(--color-primary)',
                                color: '#F5EDE0',
                                fontWeight: 700,
                                fontSize: 'var(--text-sm)',
                                flexShrink: 0,
                            }}>
                                {chapter.number}
                            </span>
                            <div style={{ flex: 1 }}>
                                <span style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 600,
                                    fontSize: 'var(--text-base)',
                                    color: 'var(--color-text)',
                                }}>
                                    {chapter.title}
                                </span>
                            </div>
                            <span style={{
                                fontSize: 'var(--text-sm)',
                                color: 'var(--color-text-muted)',
                                flexShrink: 0,
                            }}>
                                {chapter.verses} verses
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Back link */}
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Link
                        href="/library"
                        style={{
                            color: 'var(--color-primary)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 600,
                            fontSize: 'var(--text-sm)',
                            textDecoration: 'none',
                        }}
                    >
                        ← Back to Library
                    </Link>
                </div>
            </div>
        </div>
    );
}
