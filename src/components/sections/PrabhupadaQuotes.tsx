'use client';

import { useMemo } from 'react';
import prabhupadaQuotes from '@/data/prabhupada-quotes.json';

interface Quote {
    quote: string;
    source: string;
    month: string;
    day: number;
}

function getDailyQuote(): Quote {
    const now = new Date();
    const currentMonth = now.toLocaleString('en-US', { month: 'long' });
    const currentDay = now.getDate();

    const quotes = (prabhupadaQuotes as any).quotes as Quote[];

    const todayQuote = quotes.find(
        q => q.month === currentMonth && q.day === currentDay
    );

    if (todayQuote) return todayQuote;

    return quotes[0] || {
        quote: "Chant Hare Krishna and be happy.",
        source: "Śrīla Prabhupāda",
        month: "January",
        day: 1,
    };
}

export function PrabhupadaQuotes() {
    const quote = useMemo(() => getDailyQuote(), []);

    const dateDisplay = `${quote.day} ${quote.month.toUpperCase()}`;

    return (
        <div
            className="p-6 rounded-xl h-full"
            style={{
                background: 'linear-gradient(180deg, #FFFDF5 0%, #FFF8E6 100%)',
                border: '1px solid var(--color-border)',
                borderTop: '3px solid var(--color-secondary)',
                boxShadow: 'var(--shadow-sm)',
            }}
        >
            <div className="flex flex-col items-center w-full gap-2">
                {/* Date header */}
                <p
                    className="text-xs font-bold tracking-[0.2em]"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    {dateDisplay}
                </p>

                {/* Opening quote mark */}
                <p
                    className="text-4xl mt-2"
                    style={{
                        color: 'var(--color-secondary)',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 0.8,
                    }}
                >
                    &ldquo;
                </p>

                {/* Quote text */}
                <p
                    className="text-center text-lg italic max-w-[95%]"
                    style={{
                        color: 'var(--color-text)',
                        lineHeight: 1.9,
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 400,
                    }}
                >
                    {quote.quote}
                </p>

                {/* Closing quote mark */}
                <p
                    className="text-4xl"
                    style={{
                        color: 'var(--color-secondary)',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 0.8,
                    }}
                >
                    &rdquo;
                </p>

                {/* Ornamental divider */}
                <div
                    className="w-16 h-px mt-3"
                    style={{
                        background: 'linear-gradient(90deg, transparent, var(--color-secondary), transparent)',
                    }}
                />

                {/* Attribution */}
                <p
                    className="text-sm font-semibold mt-1"
                    style={{
                        color: 'var(--color-accent)',
                        fontFamily: 'var(--font-body)',
                    }}
                >
                    — Śrīla Prabhupāda
                </p>
            </div>
        </div>
    );
}
