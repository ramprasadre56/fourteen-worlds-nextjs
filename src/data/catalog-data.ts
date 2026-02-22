// Unified Catalog Data — Systematic Study & Media Playlists

export type CatalogCategory = 'bg' | 'sb' | 'vedic-stories' | 'topical' | 'supplementary';
export type CatalogLevel = 'Bhakti Śāstrī' | 'Bhakti Vaibhava' | 'Bhagavata Sevā' | 'General';

export interface CatalogItem {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    category: CatalogCategory;
    level?: CatalogLevel; // Optional for media, present for systematic courses
    videoCount: number;
    youtubePlaylistUrl: string;
    youtubePlaylistId: string;
    cantoNumber?: number;
    chapterRange?: string;
    icon: string;
    instructor: string;
    tags: string[];
}

export interface CatalogGroup {
    id: string;
    title: string;
    titleSanskrit: string;
    description: string;
    icon: string;
    category: CatalogCategory;
    items: CatalogItem[];
}

// ─── Instructors ──────────────────────────────────────────
export const INSTRUCTOR_PAVANESWAR = {
    name: 'HG Pavaneswar Das',
    channel: 'Systematic Study of BG and SB',
    channelUrl: 'https://www.youtube.com/@systematicstudyofbgandsb410',
    bio: 'HG Pavaneswar Das systematically teaches Śrīla Prabhupāda\'s books — Bhagavad-gītā and Śrīmad-Bhāgavatam — with depth, clarity, and devotion.',
};

export const INSTRUCTOR_SAMPATI = {
    name: 'HG Sampati Dasa',
    channel: 'HKM Pune',
    channelUrl: 'https://www.youtube.com/@hkmpune',
    bio: 'HG Sampati Dasa is a senior devotee and scholar who presents Bhagavad-gītā and Śrīmad-Bhāgavatam in an engaging, accessible style through the HKM Pune channel.',
};

// ─── Bhagavad Gītā (Systematic) ──────────────────────────
export const BG_COURSES: CatalogItem[] = [
    {
        slug: 'bg-module-1',
        title: 'Bhagavad Gītā — Module 1',
        subtitle: 'Chapters 1–6: Karma Yoga',
        description: 'Thematic study covering Arjuna\'s dilemma, the immortality of the soul, karma-yoga, jñāna-yoga, and dhyāna-yoga. The foundation of Gītā wisdom.',
        category: 'bg',
        level: 'Bhakti Śāstrī',
        videoCount: 11,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU1u2OysLliY5faZVOCwe4R9',
        youtubePlaylistId: 'PLstzwZvVxLU1u2OysLliY5faZVOCwe4R9',
        chapterRange: '1–6',
        icon: '🕉️',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Karma Yoga', 'Sāṅkhya', 'Dhyāna'],
    },
    {
        slug: 'bg-module-2',
        title: 'Bhagavad Gītā — Module 2',
        subtitle: 'Chapters 7–12: Bhakti Yoga',
        description: 'Deep study of knowledge of the Absolute, attaining the Supreme, the most confidential knowledge, the opulence of the Absolute, the universal form, and devotional service.',
        category: 'bg',
        level: 'Bhakti Śāstrī',
        videoCount: 40,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU3FqDoyK3s-4cC4wDph3uGK',
        youtubePlaylistId: 'PLstzwZvVxLU3FqDoyK3s-4cC4wDph3uGK',
        chapterRange: '7–12',
        icon: '💛',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Bhakti Yoga', 'Vibhūti', 'Viśvarūpa'],
    },
    {
        slug: 'bg-module-3',
        title: 'Bhagavad Gītā — Module 3',
        subtitle: 'Chapters 13–18: Jñāna Yoga',
        description: 'The concluding portion covering the field and the knower, the three modes of material nature, the Supreme Person, divine and demoniac natures, faith, and the perfection of renunciation.',
        category: 'bg',
        level: 'Bhakti Śāstrī',
        videoCount: 16,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU3HypjfP_icDxsma4F51Hog',
        youtubePlaylistId: 'PLstzwZvVxLU3HypjfP_icDxsma4F51Hog',
        chapterRange: '13–18',
        icon: '🔱',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Jñāna Yoga', 'Guṇas', 'Mokṣa'],
    },
];

// ─── Śrīmad Bhāgavatam (Systematic) ──────────────────────
export const SB_COURSES: CatalogItem[] = [
    {
        slug: 'sb-canto-1',
        title: 'Śrīmad Bhāgavatam — Canto 1',
        subtitle: 'Creation (Prathama-skandha)',
        description: 'The sages at Naimiṣāraṇya inquire from Sūta Gosvāmī. The story of Parīkṣit Mahārāja and his encounter with the personified Kali begins. 19 chapters.',
        category: 'sb',
        level: 'Bhakti Vaibhava',
        videoCount: 39,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU3qHWaIGVplNFZZzzsl-Ul3',
        youtubePlaylistId: 'PLstzwZvVxLU3qHWaIGVplNFZZzzsl-Ul3',
        cantoNumber: 1,
        icon: '📖',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Parīkṣit', 'Kali-yuga', 'Sūta Gosvāmī'],
    },
    {
        slug: 'sb-canto-2',
        title: 'Śrīmad Bhāgavatam — Canto 2',
        subtitle: 'The Cosmic Manifestation (Dvitīya-skandha)',
        description: 'Śukadeva Gosvāmī begins teaching Parīkṣit. The process of creation and the universal form of the Lord are described. 10 chapters.',
        category: 'sb',
        level: 'Bhakti Vaibhava',
        videoCount: 34,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU2UgUwvQd2vsOv6FzFDkbwe',
        youtubePlaylistId: 'PLstzwZvVxLU2UgUwvQd2vsOv6FzFDkbwe',
        cantoNumber: 2,
        icon: '🌌',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Virāṭ-rūpa', 'Creation', 'Śukadeva'],
    },
    {
        slug: 'sb-canto-3',
        title: 'Śrīmad Bhāgavatam — Canto 3',
        subtitle: 'The Status Quo (Tṛtīya-skandha)',
        description: 'The dialogues between Vidura and Maitreya. Detailed descriptions of creation, time, and the appearance of Lord Varāha. 33 chapters.',
        category: 'sb',
        level: 'Bhakti Vaibhava',
        videoCount: 45,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU0nbACvlzC1SaYwNutFOy2h',
        youtubePlaylistId: 'PLstzwZvVxLU0nbACvlzC1SaYwNutFOy2h',
        cantoNumber: 3,
        icon: '🐗',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Vidura', 'Maitreya', 'Lord Varāha'],
    },
    {
        slug: 'sb-canto-3-kapila',
        title: 'Teachings of Lord Kapila',
        subtitle: 'Canto 3 — Thematic Study',
        description: 'Focused study on the teachings of Lord Kapila to His mother Devahūti — the science of Sāṅkhya philosophy and devotional service.',
        category: 'sb',
        level: 'Bhakti Vaibhava',
        videoCount: 21,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU0fD6X76w_8ZeqlPNh7dGYc',
        youtubePlaylistId: 'PLstzwZvVxLU0fD6X76w_8ZeqlPNh7dGYc',
        cantoNumber: 3,
        icon: '🙏',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Kapila', 'Devahūti', 'Sāṅkhya'],
    },
    {
        slug: 'sb-canto-4',
        title: 'Śrīmad Bhāgavatam — Canto 4',
        subtitle: 'The Creation of the Fourth Order (Caturtha-skandha)',
        description: 'The story of Dakṣa, Dhruva Mahārāja, King Pṛthu, and the Pracetās. Important instructions on devotional service. 31 chapters.',
        category: 'sb',
        level: 'Bhakti Vaibhava',
        videoCount: 72,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU0mdAumUUOfGXkJqvXVH1AY',
        youtubePlaylistId: 'PLstzwZvVxLU0mdAumUUOfGXkJqvXVH1AY',
        cantoNumber: 4,
        icon: '⭐',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Dhruva', 'Pṛthu', 'Pracetās'],
    },
    {
        slug: 'sb-canto-4-sunday',
        title: 'Canto 4 — Sunday Sessions',
        subtitle: 'Extended Sunday discussions',
        description: 'Additional in-depth Sunday class sessions covering the fourth canto with detailed verse-by-verse analysis and discussions.',
        category: 'sb',
        level: 'Bhakti Vaibhava',
        videoCount: 55,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU1kr7wZXGE0xcJNP0krHRCa',
        youtubePlaylistId: 'PLstzwZvVxLU1kr7wZXGE0xcJNP0krHRCa',
        cantoNumber: 4,
        icon: '📅',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Sunday Class', 'Canto 4', 'In-depth'],
    },
    {
        slug: 'sb-canto-5',
        title: 'Śrīmad Bhāgavatam — Canto 5',
        subtitle: 'The Creative Impetus (Pañcama-skandha)',
        description: 'Descriptions of the planetary systems, hellish regions, and the story of Jaḍa Bharata and Ṛṣabhadeva. 26 chapters.',
        category: 'sb',
        level: 'Bhakti Vaibhava',
        videoCount: 44,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU36PmYS85EqKxoieJsl2koz',
        youtubePlaylistId: 'PLstzwZvVxLU36PmYS85EqKxoieJsl2koz',
        cantoNumber: 5,
        icon: '🌍',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Ṛṣabhadeva', 'Jaḍa Bharata', 'Cosmology'],
    },
    {
        slug: 'sb-canto-5-saturday',
        title: 'Canto 5 — Saturday Sessions',
        subtitle: 'Extended Saturday discussions',
        description: 'Additional Saturday session discussions covering the fifth canto with detailed explanations of the planetary systems and cosmic structure.',
        category: 'sb',
        level: 'Bhakti Vaibhava',
        videoCount: 34,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU0odSCsrZTC6AasuMQxgMSN',
        youtubePlaylistId: 'PLstzwZvVxLU0odSCsrZTC6AasuMQxgMSN',
        cantoNumber: 5,
        icon: '📅',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Saturday Class', 'Canto 5', 'Cosmology'],
    },
    {
        slug: 'sb-canto-6',
        title: 'Śrīmad Bhāgavatam — Canto 6',
        subtitle: 'Prescribed Duties for Mankind (Ṣaṣṭha-skandha)',
        description: 'Stories of Ajāmila, Vṛtrāsura, and the descendants of Dakṣa. The power of the holy name is glorified. 19 chapters.',
        category: 'sb',
        level: 'Bhakti Vaibhava',
        videoCount: 35,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU2RM9I70AuILKr__7awy9sK',
        youtubePlaylistId: 'PLstzwZvVxLU2RM9I70AuILKr__7awy9sK',
        cantoNumber: 6,
        icon: '📿',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Ajāmila', 'Vṛtrāsura', 'Holy Name'],
    },
    {
        slug: 'sb-canto-7',
        title: 'Śrīmad Bhāgavatam — Canto 7',
        subtitle: 'The Science of God (Saptama-skandha)',
        description: 'The story of Prahlāda Mahārāja and Hiraṇyakaśipu. Lord Nṛsiṁhadeva\'s appearance is described. 15 chapters.',
        category: 'sb',
        level: 'Bhagavata Sevā',
        videoCount: 39,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU1z3Fx7L6fPax41r-SpPBUg',
        youtubePlaylistId: 'PLstzwZvVxLU1z3Fx7L6fPax41r-SpPBUg',
        cantoNumber: 7,
        icon: '🦁',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Prahlāda', 'Nṛsiṁhadeva', 'Hiraṇyakaśipu'],
    },
    {
        slug: 'sb-canto-8',
        title: 'Śrīmad Bhāgavatam — Canto 8',
        subtitle: 'Withdrawal of the Cosmic Creations (Aṣṭama-skandha)',
        description: 'Stories of Gajendra, the churning of the milk ocean, and Lord Vāmanadeva\'s appearance. 24 chapters.',
        category: 'sb',
        level: 'Bhagavata Sevā',
        videoCount: 19,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU1Aonj64NzYzFePkaO8QOLN',
        youtubePlaylistId: 'PLstzwZvVxLU1Aonj64NzYzFePkaO8QOLN',
        cantoNumber: 8,
        icon: '🐘',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Gajendra', 'Vāmanadeva', 'Samudra Manthana'],
    },
];

// ─── Supplementary Courses ──────────────────────────────
export const SUPPLEMENTARY_COURSES: CatalogItem[] = [
    {
        slug: 'nectar-of-devotion',
        title: 'The Nectar of Devotion',
        subtitle: 'Bhakti Śāstrī Study',
        description: 'Systematic study of "The Nectar of Devotion" — a summary study of Śrīla Rūpa Gosvāmī\'s Bhakti-rasāmṛta-sindhu.',
        category: 'supplementary',
        level: 'Bhakti Śāstrī',
        videoCount: 17,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU0Liz0KhlZnM5BW0swVCdip',
        youtubePlaylistId: 'PLstzwZvVxLU0Liz0KhlZnM5BW0swVCdip',
        icon: '🍯',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Rūpa Gosvāmī', 'Rasa', 'Bhakti'],
    },
    {
        slug: 'teachings-of-lord-kapila',
        title: 'Teachings of Lord Kapila',
        subtitle: 'Thematic Study',
        description: 'A thematic exploration of Lord Kapila\'s teachings to Devahūti covering Sāṅkhya philosophy and pure devotional service.',
        category: 'supplementary',
        level: 'General',
        videoCount: 12,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU0vGnLyE--tBS4N5wMvix-J',
        youtubePlaylistId: 'PLstzwZvVxLU0vGnLyE--tBS4N5wMvix-J',
        icon: '🪷',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Kapila', 'Devahūti', 'Sāṅkhya'],
    },
    {
        slug: 'sb-canto-overview',
        title: 'SB Canto-wise Overview',
        subtitle: 'Systematic Overview Series',
        description: 'A concise overview of each canto of Śrīmad Bhāgavatam, providing the essence and key themes covered in each section.',
        category: 'supplementary',
        level: 'General',
        videoCount: 6,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU1R55qnsL5DtnJOaga-Z0VV',
        youtubePlaylistId: 'PLstzwZvVxLU1R55qnsL5DtnJOaga-Z0VV',
        icon: '🗺️',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Overview', 'Summary', 'Introduction'],
    },
    {
        slug: 'sb-seekers-journey',
        title: 'SB as a Seeker\'s Journey',
        subtitle: 'Reflective Study',
        description: 'Understanding Śrīmad Bhāgavatam from the perspective of a sincere spiritual seeker — the journey of awakening through its twelve cantos.',
        category: 'supplementary',
        level: 'General',
        videoCount: 6,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU3wlYKzabdc3q1FvKKQmKae',
        youtubePlaylistId: 'PLstzwZvVxLU3wlYKzabdc3q1FvKKQmKae',
        icon: '🚶',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Journey', 'Seeker', 'Inspiration'],
    },
    {
        slug: 'thematic-study-sb',
        title: 'Thematic Study of Bhāgavatam',
        subtitle: 'Topic-wise Exploration',
        description: 'Special thematic explorations of Śrīmad Bhāgavatam covering cross-canto themes, character studies, and philosophical insights.',
        category: 'supplementary',
        level: 'General',
        videoCount: 18,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU3zTHD4cTfqAgliEln46NH7',
        youtubePlaylistId: 'PLstzwZvVxLU3zTHD4cTfqAgliEln46NH7',
        icon: '🔍',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Thematic', 'Cross-canto', 'Insights'],
    },
    {
        slug: 'bhagavata-tattva-vicara',
        title: 'Bhāgavata Tattva Vicāra',
        subtitle: 'Philosophical Deliberation',
        description: 'Deep philosophical deliberation on the essential truths (tattvas) presented in the Bhāgavata Purāṇa.',
        category: 'supplementary',
        level: 'General',
        videoCount: 2,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU3QaeiLs6oAjs5eEmkOzjGP',
        youtubePlaylistId: 'PLstzwZvVxLU3QaeiLs6oAjs5eEmkOzjGP',
        icon: '💎',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Tattva', 'Philosophy', 'Bhāgavata'],
    },
    {
        slug: 'sadhana-samuccaya',
        title: 'Sādhana Samuccaya',
        subtitle: 'Collection of Spiritual Practices',
        description: 'A collection and systematic study of essential spiritual practices (sādhana) for advancing in Kṛṣṇa consciousness.',
        category: 'supplementary',
        level: 'General',
        videoCount: 8,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU01bor8MJ5Ae1s9hybW_BW-',
        youtubePlaylistId: 'PLstzwZvVxLU01bor8MJ5Ae1s9hybW_BW-',
        icon: '📿',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Sādhana', 'Practice', 'Daily'],
    },
    {
        slug: 'srimad-bhagavatam-canto-3-extra',
        title: 'Śrīmad Bhāgavatam Canto 3',
        subtitle: 'Additional Study Sessions',
        description: 'Supplementary study sessions covering Śrīmad Bhāgavatam Canto 3 with extended discussions and verse analysis.',
        category: 'supplementary',
        level: 'General',
        videoCount: 59,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU27ahwrm5-sUmZP-CGFRoB9',
        youtubePlaylistId: 'PLstzwZvVxLU27ahwrm5-sUmZP-CGFRoB9',
        icon: '📚',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Canto 3', 'Extended', 'Supplementary'],
    },
    {
        slug: 'bhakti-vaibhav-canto-3-sunday',
        title: 'Canto 3 — Sunday Sessions',
        subtitle: 'Bhakti Vaibhava Sunday Class',
        description: 'Sunday class sessions for Bhakti Vaibhava Canto 3 — extended discussions with devotee participation.',
        category: 'supplementary',
        level: 'Bhakti Vaibhava',
        videoCount: 71,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU0j5A_QI33zxwumeVRt4P7y',
        youtubePlaylistId: 'PLstzwZvVxLU0j5A_QI33zxwumeVRt4P7y',
        icon: '📅',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Sunday Class', 'Canto 3', 'Discussion'],
    },
    {
        slug: 'telugu-classes',
        title: 'Telugu Classes',
        subtitle: 'తెలుగు తరగతులు',
        description: 'Classes delivered in Telugu language for Telugu-speaking devotees.',
        category: 'supplementary',
        level: 'General',
        videoCount: 5,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLstzwZvVxLU2DBLgOuBDKN0PgM86lctQ3',
        youtubePlaylistId: 'PLstzwZvVxLU2DBLgOuBDKN0PgM86lctQ3',
        icon: '🇮🇳',
        instructor: INSTRUCTOR_PAVANESWAR.name,
        tags: ['Telugu', 'Regional', 'భాగవతం'],
    },
];

// ─── Media Series ─────────────────────────────────────────

export const MEDIA_BG_PLAYLISTS: CatalogItem[] = [
    {
        slug: 'sampati-bg',
        title: 'Bhagavad Gītā — Complete Series',
        subtitle: 'Chapter-wise Study by Sampati Dasa',
        description: 'A comprehensive chapter-by-chapter study of Bhagavad-gītā As It Is, covering all 18 chapters with detailed explanations, practical applications, and deep philosophical insights.',
        category: 'bg',
        level: 'General',
        videoCount: 51,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf3_ICriMu_FmZJsWwcZWZKM',
        youtubePlaylistId: 'PLR9NxMJ4tXf3_ICriMu_FmZJsWwcZWZKM',
        icon: '🕉️',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Bhagavad Gītā', 'Complete', '18 Chapters', 'Chapter-wise'],
    },
];

export const MEDIA_SB_PLAYLISTS: CatalogItem[] = [
    {
        slug: 'sampati-sb',
        title: 'Śrīmad Bhāgavatam — Series',
        subtitle: 'Study by Sampati Dasa',
        description: 'A guided study through the spotless Purāṇa — Śrīmad-Bhāgavatam. Covering the essential topics, characters, and philosophical teachings across the cantos.',
        category: 'sb',
        level: 'General',
        videoCount: 14,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf33DRy2s3UjGxbEKS9IDrs_',
        youtubePlaylistId: 'PLR9NxMJ4tXf33DRy2s3UjGxbEKS9IDrs_',
        icon: '📖',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Śrīmad Bhāgavatam', 'Purāṇa', 'Canto-wise'],
    },
];

export const MEDIA_VEDIC_PLAYLISTS: CatalogItem[] = [
    {
        slug: 'sampati-ramayan',
        title: 'Original Valmiki Rāmāyan in Detail',
        subtitle: 'Epic Narration by Sampati Dasa',
        description: 'A detailed retelling of the original Valmiki Rāmāyaṇa, presenting the glories of Lord Rāmacandra, Sīta Devī, and Hanumān ji in an engaging narrative style.',
        category: 'vedic-stories',
        level: 'General',
        videoCount: 55,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf2pnfPco7X4diOBk2NslJo-',
        youtubePlaylistId: 'PLR9NxMJ4tXf2pnfPco7X4diOBk2NslJo-',
        icon: '🏹',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Rāmāyaṇa', 'Valmiki', 'Epic', 'Lord Rāma'],
    },
    {
        slug: 'sampati-ramayan-lessons',
        title: 'Lessons from Rāmāyaṇa',
        subtitle: 'Life Lessons & Moral Teachings',
        description: 'Practical life lessons and moral teachings derived from the episodes of the Rāmāyaṇa — applicable to modern-day challenges.',
        category: 'vedic-stories',
        level: 'General',
        videoCount: 16,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf2-Ng0CGWMzsb5rKX_SBTct',
        youtubePlaylistId: 'PLR9NxMJ4tXf2-Ng0CGWMzsb5rKX_SBTct',
        icon: '🌺',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Rāmāyaṇa', 'Lessons', 'Moral'],
    },
    {
        slug: 'sampati-mahabharat-lessons',
        title: 'Lessons from Mahābhārata',
        subtitle: 'Insights from the Great Epic',
        description: 'Key lessons from the Mahābhārata — exploring dharma, strategy, devotion, and the complexities of human nature.',
        category: 'vedic-stories',
        level: 'General',
        videoCount: 6,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf2oi-DoZy2nMB8reFIINOQk',
        youtubePlaylistId: 'PLR9NxMJ4tXf2oi-DoZy2nMB8reFIINOQk',
        icon: '⚔️',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Mahābhārata', 'Dharma', 'Lessons'],
    },
];

export const MEDIA_TOPICAL_PLAYLISTS: CatalogItem[] = [
    {
        slug: 'sampati-handling-lust',
        title: 'Handling Lust',
        subtitle: 'Practical Guidance',
        description: 'Scriptural insights and practical guidance on overcoming lust — one of the greatest obstacles on the spiritual path.',
        category: 'topical',
        level: 'General',
        videoCount: 7,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf15Aqnvl6PF-z6X7IkLUxGx',
        youtubePlaylistId: 'PLR9NxMJ4tXf15Aqnvl6PF-z6X7IkLUxGx',
        icon: '🛡️',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Lust', 'Self-Control', 'Practical'],
    },
    {
        slug: 'sampati-ekadashi',
        title: 'Ekādaśī',
        subtitle: 'The Glories of Fasting',
        description: 'Understanding the significance, glories, and proper observance of Ekādaśī — the sacred fasting days.',
        category: 'topical',
        level: 'General',
        videoCount: 8,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf11dKywzGo-PGIARlFT1jPj',
        youtubePlaylistId: 'PLR9NxMJ4tXf11dKywzGo-PGIARlFT1jPj',
        icon: '🌙',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Ekādaśī', 'Fasting', 'Vrata'],
    },
    {
        slug: 'sampati-reincarnation',
        title: 'Re-incarnation',
        subtitle: 'The Science of the Soul',
        description: 'Exploring the Vedic science of reincarnation — evidence, explanations, and the journey of the soul across lifetimes.',
        category: 'topical',
        level: 'General',
        videoCount: 7,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf0wY6ikr22M-oOQzVzqxmyp',
        youtubePlaylistId: 'PLR9NxMJ4tXf0wY6ikr22M-oOQzVzqxmyp',
        icon: '🔄',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Reincarnation', 'Soul', 'Transmigration'],
    },
    {
        slug: 'sampati-narasimha',
        title: 'Glories of Lord Narasimha',
        subtitle: 'The Half-Man Half-Lion Avatāra',
        description: 'Exploring the glories, pastimes, and protection offered by Lord Nṛsiṁhadeva — the fierce protector of His devotees.',
        category: 'topical',
        level: 'General',
        videoCount: 3,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf1RkgLQWPua0ghJvLggnp2D',
        youtubePlaylistId: 'PLR9NxMJ4tXf1RkgLQWPua0ghJvLggnp2D',
        icon: '🦁',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Nṛsiṁha', 'Prahlāda', 'Protection'],
    },
    {
        slug: 'sampati-janmashtami',
        title: 'Janmāṣṭamī',
        subtitle: 'Appearance of Lord Kṛṣṇa',
        description: 'Special talks on the glorious appearance of Lord Śrī Kṛṣṇa and the significance of celebrating Janmāṣṭamī.',
        category: 'topical',
        level: 'General',
        videoCount: 7,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf3R8TbuB_IK_-mpRXZwLzul',
        youtubePlaylistId: 'PLR9NxMJ4tXf3R8TbuB_IK_-mpRXZwLzul',
        icon: '🎉',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Janmāṣṭamī', 'Kṛṣṇa', 'Festival'],
    },
    {
        slug: 'sampati-radhashtami',
        title: 'Rādhāṣṭamī',
        subtitle: 'Appearance of Śrīmatī Rādhārāṇī',
        description: 'Talks glorifying Śrīmatī Rādhārāṇī — the supreme devotee of Lord Kṛṣṇa and the embodiment of divine love.',
        category: 'topical',
        level: 'General',
        videoCount: 5,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf02scOqIU2wzt2NS1R0y8lG',
        youtubePlaylistId: 'PLR9NxMJ4tXf02scOqIU2wzt2NS1R0y8lG',
        icon: '🌹',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Rādhārāṇī', 'Festival', 'Divine Love'],
    },
    {
        slug: 'sampati-lord-shiva',
        title: 'Lord Shiva',
        subtitle: 'The Greatest Vaiṣṇava',
        description: 'Understanding Lord Śiva\'s exalted position as the greatest devotee of Lord Viṣṇu and his role in the cosmic order.',
        category: 'topical',
        level: 'General',
        videoCount: 2,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf1AvcKFNvflOHwXeWQ2NL6i',
        youtubePlaylistId: 'PLR9NxMJ4tXf1AvcKFNvflOHwXeWQ2NL6i',
        icon: '🔱',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Lord Śiva', 'Vaiṣṇava', 'Demigods'],
    },
    {
        slug: 'sampati-inspiring-mothers',
        title: 'Inspiring Mothers in Vedic Culture',
        subtitle: 'Women of Strength & Devotion',
        description: 'Stories of inspiring women and mothers from the Vedic tradition who exemplified devotion, courage, and wisdom.',
        category: 'topical',
        level: 'General',
        videoCount: 5,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf3Cx37D0BViiAh1_NBk2WVY',
        youtubePlaylistId: 'PLR9NxMJ4tXf3Cx37D0BViiAh1_NBk2WVY',
        icon: '👩‍👧',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Women', 'Mothers', 'Vedic Culture'],
    },
    {
        slug: 'sampati-devotional-dramas',
        title: 'Devotional Dramas',
        subtitle: 'Theatrical Presentations',
        description: 'Engaging devotional dramas and theatrical performances presenting Vedic stories and pastimes of the Lord.',
        category: 'topical',
        level: 'General',
        videoCount: 13,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf0Mz9Xnzwz_J5S1-QI-9eIg',
        youtubePlaylistId: 'PLR9NxMJ4tXf0Mz9Xnzwz_J5S1-QI-9eIg',
        icon: '🎭',
        instructor: INSTRUCTOR_SAMPATI.name,
        tags: ['Drama', 'Theatre', 'Performance'],
    },
];


// ─── Grouped Categories (For UI Rendering) ───────────────────
export const CATALOG_GROUPS: CatalogGroup[] = [
    {
        id: 'bg',
        title: 'Bhagavad Gītā',
        titleSanskrit: 'भगवद्गीता',
        description: 'Systematic studies and chapter-wise deep dives of the Song of God',
        icon: '🕉️',
        category: 'bg',
        items: [...BG_COURSES, ...MEDIA_BG_PLAYLISTS],
    },
    {
        id: 'sb',
        title: 'Śrīmad Bhāgavatam',
        titleSanskrit: 'श्रीमद् भागवतम्',
        description: 'The ripened fruit of Vedic literature through canto-wise studies',
        icon: '📖',
        category: 'sb',
        items: [...SB_COURSES, ...MEDIA_SB_PLAYLISTS],
    },
    {
        id: 'vedic-stories',
        title: 'Vedic Epics & Stories',
        titleSanskrit: 'वैदिक कथाएँ',
        description: 'Rāmāyaṇa, Mahābhārata, and timeless Vedic narratives',
        icon: '🏹',
        category: 'vedic-stories',
        items: MEDIA_VEDIC_PLAYLISTS,
    },
    {
        id: 'topical',
        title: 'Topical Series',
        titleSanskrit: 'विषय श्रृंखला',
        description: 'Special topics on festivals, philosophy, and devotional life',
        icon: '✨',
        category: 'topical',
        items: MEDIA_TOPICAL_PLAYLISTS,
    },
    {
        id: 'supplementary',
        title: 'Supplementary Courses',
        titleSanskrit: 'पूरक पाठ्यक्रम',
        description: 'Thematic studies, overviews, and special topic courses',
        icon: '🔍',
        category: 'supplementary',
        items: SUPPLEMENTARY_COURSES,
    },
];

// ─── Helpers ────────────────────────────────────────────
export const ALL_CATALOG_ITEMS: CatalogItem[] = [
    ...BG_COURSES,
    ...SB_COURSES,
    ...SUPPLEMENTARY_COURSES,
    ...MEDIA_BG_PLAYLISTS,
    ...MEDIA_SB_PLAYLISTS,
    ...MEDIA_VEDIC_PLAYLISTS,
    ...MEDIA_TOPICAL_PLAYLISTS,
];

export function getCatalogItemBySlug(slug: string): CatalogItem | undefined {
    return ALL_CATALOG_ITEMS.find((c) => c.slug === slug);
}

export function getCatalogItemsByCategory(category: CatalogCategory): CatalogItem[] {
    return ALL_CATALOG_ITEMS.filter((c) => c.category === category);
}

// Special helper to get only systematic SB Canto courses (for nav and specific views)
// Here, we filter only items taught by HG Pavaneswar Das as they strictly follow the canto numbering
export function getSystematicSBCoursesByCanto(cantoNumber: number): CatalogItem[] {
    return SB_COURSES.filter((c) => c.cantoNumber === cantoNumber);
}

export function getTotalVideoCount(): number {
    return ALL_CATALOG_ITEMS.reduce((sum, c) => sum + c.videoCount, 0);
}

// Primary systematic SB courses (one per canto, for nav dropdown)
export function getPrimarySBCourses(): CatalogItem[] {
    const seen = new Set<number>();
    return SB_COURSES.filter((c) => {
        if (c.cantoNumber && !seen.has(c.cantoNumber)) {
            seen.add(c.cantoNumber);
            return true;
        }
        return false;
    });
}
