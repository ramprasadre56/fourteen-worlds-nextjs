// Srimad Bhagavatam Cantos data

export interface SBCanto {
    number: number;
    title: string;
    titleSanskrit: string;
    chapters: number;
    summary: string;
}

export const SB_CANTOS: SBCanto[] = [
    {
        number: 1,
        title: 'Creation',
        titleSanskrit: 'Prathama-skandha',
        chapters: 19,
        summary: 'The sages at Naimiṣāraṇya inquire from Sūta Gosvāmī. The story of Parīkṣit Mahārāja and his encounter with the personified Kali begins.',
    },
    {
        number: 2,
        title: 'The Cosmic Manifestation',
        titleSanskrit: 'Dvitīya-skandha',
        chapters: 10,
        summary: 'Śukadeva Gosvāmī begins teaching Parīkṣit. The process of creation and the universal form of the Lord are described.',
    },
    {
        number: 3,
        title: 'The Status Quo',
        titleSanskrit: 'Tṛtīya-skandha',
        chapters: 33,
        summary: 'The dialogues between Vidura and Maitreya. Detailed descriptions of creation, time, and the appearance of Lord Varāha.',
    },
    {
        number: 4,
        title: 'The Creation of the Fourth Order',
        titleSanskrit: 'Caturtha-skandha',
        chapters: 31,
        summary: 'The story of Dakṣa, Dhruva Mahārāja, King Pṛthu, and the Pracetās. Important instructions on devotional service.',
    },
    {
        number: 5,
        title: 'The Creative Impetus',
        titleSanskrit: 'Pañcama-skandha',
        chapters: 26,
        summary: 'Descriptions of the planetary systems, hellish regions, and the story of Jaḍa Bharata and Ṛṣabhadeva.',
    },
    {
        number: 6,
        title: 'Prescribed Duties for Mankind',
        titleSanskrit: 'Ṣaṣṭha-skandha',
        chapters: 19,
        summary: 'Stories of Ajāmila, Vṛtrāsura, and the descendants of Dakṣa. The power of the holy name is glorified.',
    },
    {
        number: 7,
        title: 'The Science of God',
        titleSanskrit: 'Saptama-skandha',
        chapters: 15,
        summary: 'The story of Prahlāda Mahārāja and Hiraṇyakaśipu. Lord Nṛsiṁhadeva\'s appearance is described.',
    },
    {
        number: 8,
        title: 'Withdrawal of the Cosmic Creations',
        titleSanskrit: 'Aṣṭama-skandha',
        chapters: 24,
        summary: 'Stories of Gajendra, the churning of the milk ocean, and Lord Vāmanadeva\'s appearance.',
    },
    {
        number: 9,
        title: 'Liberation',
        titleSanskrit: 'Navama-skandha',
        chapters: 24,
        summary: 'The dynasties of the Sun and Moon gods. Stories of great kings including Lord Rāmacandra.',
    },
    {
        number: 10,
        title: 'The Summum Bonum',
        titleSanskrit: 'Daśama-skandha',
        chapters: 90,
        summary: 'The appearance and transcendental pastimes of Lord Śrī Kṛṣṇa in Vṛndāvana and Dvārakā.',
    },
    {
        number: 11,
        title: 'General History',
        titleSanskrit: 'Ekādaśa-skandha',
        chapters: 31,
        summary: 'The Uddhava-gītā—Lord Kṛṣṇa\'s final instructions to Uddhava before His departure.',
    },
    {
        number: 12,
        title: 'The Age of Deterioration',
        titleSanskrit: 'Dvādaśa-skandha',
        chapters: 13,
        summary: 'The future of Kali-yuga, the sun-god\'s worship, and the conclusion of Śrīmad-Bhāgavatam.',
    },
];

export function getCanto(cantoNum: number): SBCanto | undefined {
    return SB_CANTOS.find(c => c.number === cantoNum);
}
