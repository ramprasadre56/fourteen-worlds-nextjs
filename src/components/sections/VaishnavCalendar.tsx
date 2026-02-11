'use client';

import Link from 'next/link';
import { Calendar, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useAppState } from '@/contexts/StateContext';
import { CALENDAR_EVENTS, MONTH_KEYS, CalendarEvent, MonthData } from '@/data/calendar-events';

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

function MonthView({ monthData }: { monthData: MonthData }) {
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
                    {monthData.events.map((event, index) => (
                        <EventRow key={`${event.date}-${index}`} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function VaishnavCalendar() {
    const { calendarMonthOffset, prevCalendarMonth, nextCalendarMonth } = useAppState();

    const currentMonthIndex = Math.max(0, Math.min(MONTH_KEYS.length - 1, 1 + calendarMonthOffset));
    const currentMonthData = CALENDAR_EVENTS[MONTH_KEYS[currentMonthIndex]];

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
                            disabled={calendarMonthOffset <= -1}
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
                            disabled={calendarMonthOffset >= 1}
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

                <MonthView monthData={currentMonthData} />

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
