// Srimad Bhagavatam Cantos and Volumes data

export interface SBCanto {
    number: number;
    title: string;
    titleSanskrit: string;
    chapters: number;
    summary: string;
}

export interface SBVolume {
    id: string;
    cantoNumber: number;
    partNumber?: number;
    displayName: string;
    coverImage: string;
    href: string;
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

// 18 Physical Volumes as per BBT Publications
export const SB_VOLUMES: SBVolume[] = [
    { id: 'sb-1', cantoNumber: 1, displayName: 'Srimad Bhagavatam Canto 1', coverImage: '/books/sb/sb-1.png', href: '/library/sb/1' },
    { id: 'sb-2', cantoNumber: 2, displayName: 'Srimad Bhagavatam Canto 2', coverImage: '/books/sb/sb-2.png', href: '/library/sb/2' },
    { id: 'sb-3-1', cantoNumber: 3, partNumber: 1, displayName: 'Srimad Bhagavatam Canto 3.1', coverImage: '/books/sb/sb-3-1.png', href: '/library/sb/3' },
    { id: 'sb-3-2', cantoNumber: 3, partNumber: 2, displayName: 'Srimad Bhagavatam Canto 3.2', coverImage: '/books/sb/sb-3-2.png', href: '/library/sb/3' },
    { id: 'sb-4-1', cantoNumber: 4, partNumber: 1, displayName: 'Srimad Bhagavatam Canto 4.1', coverImage: '/books/sb/sb-4-1.png', href: '/library/sb/4' },
    { id: 'sb-4-2', cantoNumber: 4, partNumber: 2, displayName: 'Srimad Bhagavatam Canto 4.2', coverImage: '/books/sb/sb-4-2.png', href: '/library/sb/4' },
    { id: 'sb-5', cantoNumber: 5, displayName: 'Srimad Bhagavatam Canto 5', coverImage: '/books/sb/sb-5.png', href: '/library/sb/5' },
    { id: 'sb-6', cantoNumber: 6, displayName: 'Srimad Bhagavatam Canto 6', coverImage: '/books/sb/sb-6.png', href: '/library/sb/6' },
    { id: 'sb-7', cantoNumber: 7, displayName: 'Srimad Bhagavatam Canto 7', coverImage: '/books/sb/sb-7.png', href: '/library/sb/7' },
    { id: 'sb-8', cantoNumber: 8, displayName: 'Srimad Bhagavatam Canto 8', coverImage: '/books/sb/sb-8.png', href: '/library/sb/8' },
    { id: 'sb-9', cantoNumber: 9, displayName: 'Srimad Bhagavatam Canto 9', coverImage: '/books/sb/sb-9.png', href: '/library/sb/9' },
    { id: 'sb-10-1', cantoNumber: 10, partNumber: 1, displayName: 'Srimad Bhagavatam Canto 10.1', coverImage: '/books/sb/sb-10-1.png', href: '/library/sb/10' },
    { id: 'sb-10-2', cantoNumber: 10, partNumber: 2, displayName: 'Srimad Bhagavatam Canto 10.2', coverImage: '/books/sb/sb-10-2.png', href: '/library/sb/10' },
    { id: 'sb-10-3', cantoNumber: 10, partNumber: 3, displayName: 'Srimad Bhagavatam Canto 10.3', coverImage: '/books/sb/sb-10-3.png', href: '/library/sb/10' },
    { id: 'sb-10-4', cantoNumber: 10, partNumber: 4, displayName: 'Srimad Bhagavatam Canto 10.4', coverImage: '/books/sb/sb-10-4.png', href: '/library/sb/10' },
    { id: 'sb-11-1', cantoNumber: 11, partNumber: 1, displayName: 'Srimad Bhagavatam Canto 11.1', coverImage: '/books/sb/sb-11-1.png', href: '/library/sb/11' },
    { id: 'sb-11-2', cantoNumber: 11, partNumber: 2, displayName: 'Srimad Bhagavatam Canto 11.2', coverImage: '/books/sb/sb-11-2.png', href: '/library/sb/11' },
    { id: 'sb-12', cantoNumber: 12, displayName: 'Srimad Bhagavatam Canto 12', coverImage: '/books/sb/sb-12.png', href: '/library/sb/12' },
];

export function getCanto(cantoNum: number): SBCanto | undefined {
    return SB_CANTOS.find(c => c.number === cantoNum);
}

export function getVolumesByCanto(cantoNum: number): SBVolume[] {
    return SB_VOLUMES.filter(v => v.cantoNumber === cantoNum);
}
