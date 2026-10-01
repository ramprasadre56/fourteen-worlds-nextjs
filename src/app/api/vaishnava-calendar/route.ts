import { NextRequest, NextResponse } from 'next/server';
import { CALENDAR_EVENTS, type CalendarEvent, type MonthData } from '@/data/calendar-events';

/**
 * GET /api/vaishnava-calendar?month=YYYY-MM
 * Events for one month from harekrishnacalendar.com (The Events Calendar REST API),
 * cached for 6 hours. Falls back to the bundled static data when the source is unavailable.
 */
const API = 'https://harekrishnacalendar.com/wp-json/tribe/events/v1/events';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SHORT = MONTHS.map((m) => m.slice(0, 3));
const HIGHLIGHT = /ekadas|major festival/i;

type TribeEvent = { title: string; url: string; start_date: string; categories?: { name: string }[] };

const decode = (s: string) =>
    s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
        .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

export async function GET(req: NextRequest) {
    const param = req.nextUrl.searchParams.get('month') ?? '';
    const m = /^(\d{4})-(\d{2})$/.exec(param);
    if (!m || Number(m[2]) < 1 || Number(m[2]) > 12) {
        return NextResponse.json({ error: 'month must be YYYY-MM' }, { status: 400 });
    }
    const year = Number(m[1]);
    const month = Number(m[2]);
    const label = `${MONTHS[month - 1]} ${year}`;
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const url = `${API}?start_date=${param}-01&end_date=${param}-${lastDay}%2023:59:59&per_page=100`;

    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FourteenWorlds/1.0; +https://fourteenworlds.org)' },
            next: { revalidate: 21600 },
            signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { events?: TribeEvent[] };
        const events: CalendarEvent[] = (data.events ?? [])
            .filter((e) => e.start_date?.startsWith(param))
            .sort((a, b) => a.start_date.localeCompare(b.start_date))
            .map((e) => ({
                date: `${SHORT[month - 1]} ${Number(e.start_date.slice(8, 10))}`,
                event: decode(e.title),
                highlight: (e.categories ?? []).some((c) => HIGHLIGHT.test(c.name)),
                url: e.url,
            }));
        return NextResponse.json(
            { label, events, source: 'live' } satisfies MonthData & { source: string },
            { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } },
        );
    } catch (err) {
        console.warn('[vaishnava-calendar]', param, (err as Error).message);
        const key = `${SHORT[month - 1].toLowerCase()}_${year}`;
        const fallback = CALENDAR_EVENTS[key];
        return NextResponse.json(
            { label, events: fallback?.events ?? [], source: 'fallback' },
            { headers: { 'Cache-Control': 'public, s-maxage=600' } },
        );
    }
}
