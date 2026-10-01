'use client';

import Link from 'next/link';
import { Calendar, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useAppState } from '@/contexts/StateContext';
import { useEffect, useRef, useState } from 'react';
import { CalendarEvent, MonthData } from '@/data/calendar-events';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "YYYY-MM" for the visitor's current month shifted by `offset` months. */
function monthKey(today: Date, offset: number) {
    const d = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function labelFor(key: string) {
    const [y, m] = key.split('-').map(Number);
    return `${MONTH_NAMES[m - 1]} ${y}`;
}

// Month data already fetched in this browser session.
const monthCache = new Map<string, MonthData>();

function EventRow({ event }: { event: CalendarEvent }) {
    return (
        <Link
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full cursor-pointer"
            style={{
                transition: 'background var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-warm)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
            <div
                className="flex items-start gap-3 py-2.5 px-3 rounded-lg"
                style={{
                    borderBottom: '1px solid var(--color-border-light)',
                }}
            >
                <span
                    className="font-semibold text-sm min-w-[55px]"
                    style={{ color: 'var(--color-primary)' }}
                >
                    {event.date}
                </span>
                <span
                    className={`text-sm ${event.highlight ? 'font-semibold' : ''}`}
                    style={{ color: 'var(--color-text)' }}
                >
                    {event.event}
                </span>
            </div>
        </Link>
    );
}

function MonthView({ monthData, loading }: { monthData: MonthData; loading: boolean }) {
    return (
        <div className="flex flex-col w-full">
            <p
                className="text-sm mb-3 font-medium"
                style={{ color: 'var(--color-text-muted)' }}
            >
                Upcoming Events — {monthData.label}
            </p>
            <div className="max-h-[320px] overflow-y-auto w-full pr-1">
                <div className="flex flex-col w-full">
                    {loading && monthData.events.length === 0 && (
                        <p className="py-6 text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>Loading events…</p>
                    )}
                    {!loading && monthData.events.length === 0 && (
                        <p className="py-6 text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>No events found for this month.</p>
                    )}
                    {monthData.events.map((event, index) => (
                        <EventRow key={`${event.date}-${index}`} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function VaishnavCalendar() {
    const { calendarMonthOffset, prevCalendarMonth, nextCalendarMonth, resetCalendarMonth } = useAppState();

    // "Today" is tracked in state so the calendar rolls over to the new month automatically
    // (checked every minute and whenever the tab becomes visible again).
    const [today, setToday] = useState(() => new Date());
    useEffect(() => {
        const tick = () => setToday((prev) => {
            const now = new Date();
            return now.getMonth() !== prev.getMonth() || now.getFullYear() !== prev.getFullYear() ? now : prev;
        });
        const id = setInterval(tick, 60_000);
        document.addEventListener('visibilitychange', tick);
        return () => { clearInterval(id); document.removeEventListener('visibilitychange', tick); };
    }, []);

    // When the month rolls over, jump back to the (new) current month.
    const shownMonth = useRef(monthKey(today, 0));
    useEffect(() => {
        const current = monthKey(today, 0);
        if (current !== shownMonth.current) {
            shownMonth.current = current;
            resetCalendarMonth();
        }
    }, [today, resetCalendarMonth]);

    const key = monthKey(today, calendarMonthOffset);
    const [data, setData] = useState<Record<string, MonthData>>({});

    useEffect(() => {
        if (monthCache.has(key)) return;
        let cancelled = false;
        fetch(`/api/vaishnava-calendar?month=${key}`)
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
            .then((m: MonthData) => {
                monthCache.set(key, m);
                if (!cancelled) setData((d) => ({ ...d, [key]: m }));
            })
            .catch(() => {
                if (!cancelled) setData((d) => ({ ...d, [key]: { label: labelFor(key), events: [] } }));
            });
        return () => { cancelled = true; };
    }, [key]);

    const loaded = data[key] ?? monthCache.get(key);
    const currentMonthData = loaded ?? { label: labelFor(key), events: [] };
    const loading = !loaded;
    // Allow browsing one year back and two years ahead.
    const canPrev = calendarMonthOffset > -12;
    const canNext = calendarMonthOffset < 24;

    return (
        <div
            className="p-6 rounded-xl"
            style={{
                background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-warm) 100%)',
                border: '1px solid var(--color-border)',
                borderTop: '3px solid var(--color-secondary)',
                boxShadow: 'var(--shadow-sm)',
            }}
        >
            <div className="flex flex-col w-full gap-4">
                {/* Header with navigation */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <div
                            className="flex items-center justify-center w-8 h-8 rounded-lg"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                            }}
                        >
                            <Calendar size={16} style={{ color: '#F5EDE0' }} />
                        </div>
                        <h3
                            className="text-lg font-bold"
                            style={{
                                color: 'var(--color-primary)',
                                fontFamily: 'var(--font-heading)',
                            }}
                        >
                            Vaishnava Calendar
                        </h3>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={prevCalendarMonth}
                            disabled={!canPrev}
                            aria-label="Previous month"
                            className="p-1.5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            style={{
                                color: 'var(--color-primary)',
                                transition: 'background var(--transition-fast)',
                            }}
                            onMouseEnter={(e) => {
                                if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--color-bg-warm)';
                            }}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={nextCalendarMonth}
                            disabled={!canNext}
                            aria-label="Next month"
                            className="p-1.5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            style={{
                                color: 'var(--color-primary)',
                                transition: 'background var(--transition-fast)',
                            }}
                            onMouseEnter={(e) => {
                                if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--color-bg-warm)';
                            }}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                <MonthView monthData={currentMonthData} loading={loading} />

                <Link
                    href="https://harekrishnacalendar.com/vaishnava-calendars/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-2 text-sm font-medium cursor-pointer"
                    style={{
                        color: 'var(--color-primary)',
                        transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-secondary-dark)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                >
                    View Full Calendar
                    <ExternalLink size={14} />
                </Link>
            </div>
        </div>
    );
}
