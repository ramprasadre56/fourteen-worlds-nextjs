'use client';

import { useMemo } from 'react';
import prabhupadaQuotes from '@/data/prabhupada-quotes.json';

interface Quote {
    quote: string;
    source: string;
    month: string;
    day: number;
}

// Get daily quote based on current date
function getDailyQuote(): Quote {
    const now = new Date();
    const currentMonth = now.toLocaleString('en-US', { month: 'long' });
    const currentDay = now.getDate();

    const quotes = (prabhupadaQuotes as any).quotes as Quote[];

    // Find quote for today's month and day
    const todayQuote = quotes.find(
        q => q.month === currentMonth && q.day === currentDay
    );

    if (todayQuote) return todayQuote;

    // Fallback to first quote
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
            className="p-6 rounded-xl shadow-sm border mt-6"
            style={{
                background: 'linear-gradient(180deg, #fffef8 0%, #fff9e6 100%)',
                borderColor: '#f0e6d2'
            }}
        >
            <div className="flex flex-col items-center w-full gap-1">
                {/* Date header */}
                <p
                    className="text-xs font-bold tracking-widest"
                    style={{ color: '#666' }}
                >
                    {dateDisplay}
                </p>

                {/* Opening quote mark */}
                <p
                    className="text-3xl mt-2"
                    style={{ color: '#d4af37', lineHeight: 1 }}
                >
                    ❝
                </p>

                {/* Quote text */}
                <p
                    className="text-center text-lg italic max-w-[95%]"
                    style={{
                        color: '#2d2d2d',
                        lineHeight: 1.9,
                        fontFamily: "Georgia, 'Times New Roman', serif"
                    }}
                >
                    {quote.quote}
                </p>

                {/* Closing quote mark */}
                <p
                    className="text-3xl"
                    style={{ color: '#d4af37', lineHeight: 1 }}
                >
                    ❞
                </p>

                {/* Attribution */}
                <p
                    className="text-sm font-semibold mt-2"
                    style={{ color: '#8B4513' }}
                >
                    — Śrīla Prabhupāda
                </p>
            </div>
        </div>
    );
}
