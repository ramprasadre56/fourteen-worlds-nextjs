// Vaishnava Calendar Events Data

export interface CalendarEvent {
    date: string;
    event: string;
    highlight: boolean;
    url: string;
}

export interface MonthData {
    label: string;
    events: CalendarEvent[];
}

export const CALENDAR_EVENTS: Record<string, MonthData> = {
    nov_2025: {
        label: "November 2025",
        events: [
            {
                date: "Nov 4",
                event: "Disappearance Day of Sri Bhugarbha Goswami",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/disappearance-day-of-sri-bhugarbha-goswami-2025/",
            },
            {
                date: "Nov 4",
                event: "Disappearance Day of Sri Kasisvara Pandita",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/disappearance-day-of-sri-kasisvara-pandita-2025/",
            },
            {
                date: "Nov 6",
                event: "Katyayani Vrata Begins",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/katyayani-vrata-begins-2025/",
            },
            {
                date: "Nov 15",
                event: "Utpanna Ekadashi",
                highlight: true,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/utpanna-ekadashi-2025/",
            },
        ],
    },
    dec_2025: {
        label: "December 2025",
        events: [
            {
                date: "Dec 1",
                event: "Moksada Ekadashi",
                highlight: true,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/moksada-ekadashi-2025/",
            },
            {
                date: "Dec 1",
                event: "Advent of Srimad Bhagavat Gita",
                highlight: true,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/advent-of-srimad-bhagavat-gita-2025/",
            },
            {
                date: "Dec 4",
                event: "Katyayani Vrata Ends",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/katyayani-vrata-ends-2025/",
            },
            {
                date: "Dec 8",
                event: "Disappearance Day of Srila Bhaktisiddhanta Sarasvati Thakura",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/disappearance-day-of-srila-bhaktisiddhanta-sarasvati-thakura-2025/",
            },
            {
                date: "Dec 15",
                event: "Disappearance Day of Sri Devananda Pandita",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/disappearance-day-of-sri-devananda-pandita-2025/",
            },
            {
                date: "Dec 16",
                event: "Saphala Mahadvadasi",
                highlight: true,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/saphala-ekadashi-2025/",
            },
            {
                date: "Dec 17",
                event: "Disappearance Day of Sri Mahesa Pandita",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/disappearance-day-of-sri-mahesa-pandita-2025/",
            },
            {
                date: "Dec 17",
                event: "Disappearance Day of Sri Uddharana Datta Thakura",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/disappearance-day-of-sri-uddharana-datta-thakura-2025/",
            },
            {
                date: "Dec 21",
                event: "Appearance Day of Sri Lochana Dasa Thakura",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/appearance-day-of-sri-locana-dasa-thakura-2025/",
            },
            {
                date: "Dec 23",
                event: "Disappearance Day of Sri Jiva Goswami",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/disappearance-day-of-sri-jiva-goswami-2025/",
            },
            {
                date: "Dec 23",
                event: "Disappearance Day of Sri Jagadisa Pandita",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/disappearance-day-of-sri-jagadisa-pandita-2025/",
            },
            {
                date: "Dec 31",
                event: "Putrada Ekadashi",
                highlight: true,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/putrada-ekadashi-2025/",
            },
            {
                date: "Dec 31",
                event: "Appearance Day of Sri Jagadisa Pandita",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/appearance-day-of-sri-jagadisa-pandita-2025/",
            },
        ],
    },
    jan_2026: {
        label: "January 2026",
        events: [
            {
                date: "Jan 2",
                event: "Disappearance Day of Sri Jiva Goswami",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/disappearance-day-of-sri-jiva-goswami-2026/",
            },
            {
                date: "Jan 10",
                event: "Sat-tila Ekadashi",
                highlight: true,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/sat-tila-ekadashi-2026/",
            },
            {
                date: "Jan 14",
                event: "Makara Sankranti",
                highlight: true,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/makara-sankranti-2026/",
            },
            {
                date: "Jan 25",
                event: "Bhaimi Ekadashi",
                highlight: true,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/bhaimi-ekadashi-2026/",
            },
            {
                date: "Jan 25",
                event: "Disappearance Day of Sri Ramacandra Kaviraja",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/disappearance-day-of-sri-ramacandra-kaviraja-2026/",
            },
            {
                date: "Jan 31",
                event: "Vasant Panchami",
                highlight: true,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/vasant-panchami-2026/",
            },
            {
                date: "Jan 31",
                event: "Appearance Day of Srimati Visnupriya",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/appearance-day-of-srimati-visnupriya-2026/",
            },
            {
                date: "Jan 31",
                event: "Appearance Day of Sarasvati Thakura",
                highlight: false,
                url: "https://harekrishnacalendar.com/vaishnava-calendar/appearance-day-of-sarasvati-thakura-2026/",
            },
        ],
    },
};

export const MONTH_KEYS = ["nov_2025", "dec_2025", "jan_2026"];

export function getMonthByOffset(offset: number): MonthData {
    // Default to dec_2025 (index 1), then add offset
    const index = Math.max(0, Math.min(MONTH_KEYS.length - 1, 1 + offset));
    return CALENDAR_EVENTS[MONTH_KEYS[index]];
}
