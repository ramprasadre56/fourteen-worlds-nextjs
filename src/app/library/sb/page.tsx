import Link from 'next/link';
import { SB_CANTOS } from '@/data/sb-cantos';

export default function SrimadBhagavatamPage() {
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
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginBottom: '2rem',
                    textAlign: 'center',
                }}>
                    Śrīmad-Bhāgavatam
                </h1>

                {/* Canto List — Vedabase style */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {SB_CANTOS.map((canto) => (
                        <Link
                            key={canto.number}
                            href={`/library/sb/${canto.number}`}
                            style={{
                                display: 'block',
                                padding: '0.75rem 0',
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'var(--text-xl)',
                                fontWeight: 600,
                                color: 'var(--color-primary)',
                                textDecoration: 'none',
                                lineHeight: 1.5,
                            }}
                        >
                            Canto {canto.number}: {canto.title}
                        </Link>
                    ))}
                </div>

                {/* Back link */}
                <div style={{
                    marginTop: '3rem',
                    paddingTop: '1.5rem',
                    borderTop: '2px solid var(--color-secondary)',
                    textAlign: 'center',
                }}>
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
