// Bhagavad Gita chapters data with verse counts

export interface BGChapter {
    number: number;
    title: string;
    titleSanskrit: string;
    verses: number;
    summary: string;
}

export const BG_CHAPTERS: BGChapter[] = [
    {
        number: 1,
        title: 'Observing the Armies on the Battlefield of Kurukṣetra',
        titleSanskrit: 'Arjuna-viṣāda-yoga',
        verses: 46,
        summary: 'Arjuna surveys the opposing armies and becomes overwhelmed with grief at the prospect of killing his relatives.'
    },
    {
        number: 2,
        title: 'Contents of the Gītā Summarized',
        titleSanskrit: 'Sāṅkhya-yoga',
        verses: 72,
        summary: 'Krishna begins His teachings on the immortal nature of the soul and the path of selfless action.'
    },
    {
        number: 3,
        title: 'Karma-yoga',
        titleSanskrit: 'Karma-yoga',
        verses: 43,
        summary: 'The path of action is explained—performing duty without attachment to the fruits.'
    },
    {
        number: 4,
        title: 'Transcendental Knowledge',
        titleSanskrit: 'Jñāna-karma-sannyāsa-yoga',
        verses: 42,
        summary: 'Krishna reveals the history of Bhagavad-gītā and the science of transcendental knowledge.'
    },
    {
        number: 5,
        title: 'Karma-yoga — Action in Kṛṣṇa Consciousness',
        titleSanskrit: 'Karma-sannyāsa-yoga',
        verses: 29,
        summary: 'The relationship between renunciation and work in devotion is explained.'
    },
    {
        number: 6,
        title: 'Dhyāna-yoga',
        titleSanskrit: 'Dhyāna-yoga',
        verses: 47,
        summary: 'The practice of meditation and yoga, with the yogi who thinks of Krishna as the highest.'
    },
    {
        number: 7,
        title: 'Knowledge of the Absolute',
        titleSanskrit: 'Jñāna-vijñāna-yoga',
        verses: 30,
        summary: 'Krishna reveals His material and spiritual natures and how rare souls surrender unto Him.'
    },
    {
        number: 8,
        title: 'Attaining the Supreme',
        titleSanskrit: 'Akṣara-brahma-yoga',
        verses: 28,
        summary: 'The process of remembering Krishna at the time of death and attaining His abode.'
    },
    {
        number: 9,
        title: 'The Most Confidential Knowledge',
        titleSanskrit: 'Rāja-vidyā-rāja-guhya-yoga',
        verses: 34,
        summary: 'The king of education—the most secret of all secrets—is revealed by Krishna.'
    },
    {
        number: 10,
        title: 'The Opulence of the Absolute',
        titleSanskrit: 'Vibhūti-yoga',
        verses: 42,
        summary: 'Krishna describes His infinite glories and opulences as the source of all existence.'
    },
    {
        number: 11,
        title: 'The Universal Form',
        titleSanskrit: 'Viśvarūpa-darśana-yoga',
        verses: 55,
        summary: 'Arjuna is granted divine vision to see Krishna\'s cosmic universal form.'
    },
    {
        number: 12,
        title: 'Devotional Service',
        titleSanskrit: 'Bhakti-yoga',
        verses: 20,
        summary: 'The path of pure devotional service is declared as the highest and most direct path.'
    },
    {
        number: 13,
        title: 'Nature, the Enjoyer, and Consciousness',
        titleSanskrit: 'Kṣetra-kṣetrajña-vibhāga-yoga',
        verses: 35,
        summary: 'The difference between the body, the soul, and the Supersoul is explained.'
    },
    {
        number: 14,
        title: 'The Three Modes of Material Nature',
        titleSanskrit: 'Guṇa-traya-vibhāga-yoga',
        verses: 27,
        summary: 'The three modes—goodness, passion, and ignorance—and how to transcend them.'
    },
    {
        number: 15,
        title: 'The Yoga of the Supreme Person',
        titleSanskrit: 'Puruṣottama-yoga',
        verses: 20,
        summary: 'Krishna is revealed as the Supreme Person, beyond both the fallible and infallible.'
    },
    {
        number: 16,
        title: 'The Divine and Demoniac Natures',
        titleSanskrit: 'Daivāsura-sampad-vibhāga-yoga',
        verses: 24,
        summary: 'The qualities of the divine and demoniac natures are contrasted.'
    },
    {
        number: 17,
        title: 'The Divisions of Faith',
        titleSanskrit: 'Śraddhā-traya-vibhāga-yoga',
        verses: 28,
        summary: 'Faith is analyzed according to the three modes of material nature.'
    },
    {
        number: 18,
        title: 'Conclusion — The Perfection of Renunciation',
        titleSanskrit: 'Mokṣa-sannyāsa-yoga',
        verses: 78,
        summary: 'The conclusion of the Gita—surrender to Krishna is the ultimate perfection of renunciation.'
    },
];

export function getChapter(chapterNum: number): BGChapter | undefined {
    return BG_CHAPTERS.find(c => c.number === chapterNum);
}

export function getVerseRange(chapterNum: number): number[] {
    const chapter = getChapter(chapterNum);
    if (!chapter) return [];
    return Array.from({ length: chapter.verses }, (_, i) => i + 1);
}
