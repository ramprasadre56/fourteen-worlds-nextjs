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
            className="block w-full hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-start gap-3 py-2 px-0 border-b border-gray-100">
                <span
                    className="font-semibold text-sm min-w-[55px]"
                    style={{ color: '#8B0000' }}
                >
                    {event.date}
                </span>
                <span className={`text-sm ${event.highlight ? 'font-semibold' : ''} text-gray-800`}>
                    {event.event}
                </span>
            </div>
        </Link>
    );
}

function MonthView({ monthData }: { monthData: MonthData }) {
    return (
        <div className="flex flex-col w-full">
            <p className="text-sm text-gray-500 mb-2">
                Upcoming Events - {monthData.label}
            </p>
            <div className="max-h-[320px] overflow-y-auto w-full">
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

    // Get current month data based on offset
    const currentMonthIndex = Math.max(0, Math.min(MONTH_KEYS.length - 1, 1 + calendarMonthOffset));
    const currentMonthData = CALENDAR_EVENTS[MONTH_KEYS[currentMonthIndex]];

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col w-full gap-4">
                {/* Header with navigation */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <Calendar size={20} style={{ color: '#8B0000' }} />
                        <h3
                            className="text-lg font-bold"
                            style={{ color: '#8B0000' }}
                        >
                            Vaishnava Calendar
                        </h3>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={prevCalendarMonth}
                            disabled={calendarMonthOffset <= -1}
                            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            style={{ color: '#8B0000' }}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={nextCalendarMonth}
                            disabled={calendarMonthOffset >= 1}
                            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            style={{ color: '#8B0000' }}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Month view */}
                <MonthView monthData={currentMonthData} />

                {/* Full calendar link */}
                <Link
                    href="https://harekrishnacalendar.com/vaishnava-calendars/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-3 text-sm hover:underline"
                    style={{ color: '#8B0000' }}
                >
                    View Full Calendar
                    <ExternalLink size={14} />
                </Link>
            </div>
        </div>
    );
}
