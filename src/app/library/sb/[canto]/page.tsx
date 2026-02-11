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

    const chapters = Array.from({ length: canto.chapters }, (_, i) => i + 1);
    const prevCanto = cantoNum > 1 ? cantoNum - 1 : null;
    const nextCanto = cantoNum < 12 ? cantoNum + 1 : null;

    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

                {/* Breadcrumb */}
                <nav style={{ marginBottom: '1.5rem', fontSize: 'var(--text-sm)' }}>
                    <Link href="/library" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Library
                    </Link>
                    <span style={{ margin: '0 0.5rem', color: 'var(--color-border)' }}>»</span>
                    <Link href="/library/sb" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Śrīmad-Bhāgavatam
                    </Link>
                </nav>

                {/* Canto Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <p style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-muted)',
                        marginBottom: '0.25rem',
                    }}>
                        Canto {cantoNum} of 12
                    </p>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--text-4xl)',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        marginBottom: '0.5rem',
                    }}>
                        {canto.title}
                    </h1>
                    <p style={{
                        fontSize: 'var(--text-xl)',
                        fontStyle: 'italic',
                        color: 'var(--color-secondary-dark)',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-heading)',
                    }}>
                        {canto.titleSanskrit}
                    </p>
                    <p style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.7,
                    }}>
                        {canto.summary}
                    </p>
                    <p style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-muted)',
                        marginTop: '0.75rem',
                    }}>
                        {canto.chapters} chapters
                    </p>
                    <div style={{
                        marginTop: '1.5rem',
                        height: '2px',
                        background: 'linear-gradient(90deg, var(--color-secondary), transparent)',
                    }} />
                </div>

                {/* Chapters List */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {chapters.map((chapter) => (
                        <Link
                            key={chapter}
                            href={`/library/sb/${cantoNum}/${chapter}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem 0',
                                borderBottom: '1px solid var(--color-border-light)',
                                textDecoration: 'none',
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
                                {chapter}
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 600,
                                fontSize: 'var(--text-base)',
                                color: 'var(--color-text)',
                            }}>
                                Chapter {chapter}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '2.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '2px solid var(--color-secondary)',
                }}>
                    {prevCanto ? (
                        <Link
                            href={`/library/sb/${prevCanto}`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.625rem 1.25rem',
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-lg)',
                                color: 'var(--color-text-secondary)',
                                fontSize: 'var(--text-sm)',
                                fontWeight: 500,
                                textDecoration: 'none',
                            }}
                        >
                            ← Canto {prevCanto}
                        </Link>
                    ) : (
                        <div />
                    )}
                    <Link
                        href="/library/sb"
                        style={{
                            color: 'var(--color-primary)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 600,
                            fontSize: 'var(--text-sm)',
                            textDecoration: 'none',
                        }}
                    >
                        All Cantos
                    </Link>
                    {nextCanto ? (
                        <Link
                            href={`/library/sb/${nextCanto}`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.625rem 1.25rem',
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-lg)',
                                color: 'var(--color-text-secondary)',
                                fontSize: 'var(--text-sm)',
                                fontWeight: 500,
                                textDecoration: 'none',
                            }}
                        >
                            Canto {nextCanto} →
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    );
}
