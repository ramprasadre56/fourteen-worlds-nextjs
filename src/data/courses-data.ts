// Courses data — Systematic Study of BG and SB by HG Pavaneswar Das
// YouTube Channel: https://www.youtube.com/@systematicstudyofbgandsb410

export type CourseCategory = 'bg' | 'sb' | 'supplementary';
export type CourseLevel = 'Bhakti Śāstrī' | 'Bhakti Vaibhava' | 'Bhagavata Sevā' | 'General';

export interface Course {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    category: CourseCategory;
    level: CourseLevel;
    videoCount: number;
    youtubePlaylistUrl: string;
    youtubePlaylistId: string;
    cantoNumber?: number;
    chapterRange?: string;
    icon: string;
    instructor: string;
    tags: string[];
}

export interface CourseGroup {
    id: string;
    title: string;
    titleSanskrit: string;
    description: string;
    icon: string;
    category: CourseCategory;
    courses: Course[];
}

// ─── Instructor ──────────────────────────────────────────
export const INSTRUCTOR = {
    name: 'HG Pavaneswar Das',
    channel: 'Systematic Study of BG and SB',
    channelUrl: 'https://www.youtube.com/@systematicstudyofbgandsb410',
    bio: 'HG Pavaneswar Das systematically teaches Śrīla Prabhupāda\'s books — Bhagavad-gītā and Śrīmad-Bhāgavatam — with depth, clarity, and devotion.',
};

// ─── Bhagavad Gītā Courses ──────────────────────────────
export const BG_COURSES: Course[] = [
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
        tags: ['Jñāna Yoga', 'Guṇas', 'Mokṣa'],
    },
];

// ─── Śrīmad Bhāgavatam Courses ─────────────────────────
export const SB_COURSES: Course[] = [
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
        tags: ['Gajendra', 'Vāmanadeva', 'Samudra Manthana'],
    },
];

// ─── Supplementary Courses ──────────────────────────────
export const SUPPLEMENTARY_COURSES: Course[] = [
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
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
        instructor: INSTRUCTOR.name,
        tags: ['Telugu', 'Regional', 'భాగవతం'],
    },
];

// ─── Course Groups (for navigation) ────────────────────
export const COURSE_GROUPS: CourseGroup[] = [
    {
        id: 'bg',
        title: 'Bhagavad Gītā',
        titleSanskrit: 'भगवद्गीता',
        description: 'Systematic study of the Song of God — 18 chapters in 3 modules',
        icon: '🕉️',
        category: 'bg',
        courses: BG_COURSES,
    },
    {
        id: 'sb',
        title: 'Śrīmad Bhāgavatam',
        titleSanskrit: 'श्रीमद् भागवतम्',
        description: 'Canto-wise systematic study — the ripened fruit of Vedic literature',
        icon: '📖',
        category: 'sb',
        courses: SB_COURSES,
    },
    {
        id: 'supplementary',
        title: 'Supplementary Courses',
        titleSanskrit: 'पूरक पाठ्यक्रम',
        description: 'Thematic studies, overviews, and special topic courses',
        icon: '✨',
        category: 'supplementary',
        courses: SUPPLEMENTARY_COURSES,
    },
];

// ─── Helpers ────────────────────────────────────────────
export const ALL_COURSES: Course[] = [...BG_COURSES, ...SB_COURSES, ...SUPPLEMENTARY_COURSES];

export function getCourseBySlug(slug: string): Course | undefined {
    return ALL_COURSES.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: CourseCategory): Course[] {
    return ALL_COURSES.filter((c) => c.category === category);
}

export function getSBCoursesByCanto(cantoNumber: number): Course[] {
    return SB_COURSES.filter((c) => c.cantoNumber === cantoNumber);
}

export function getTotalVideoCount(): number {
    return ALL_COURSES.reduce((sum, c) => sum + c.videoCount, 0);
}

// Primary SB courses (one per canto, for nav dropdown)
export function getPrimarySBCourses(): Course[] {
    const seen = new Set<number>();
    return SB_COURSES.filter((c) => {
        if (c.cantoNumber && !seen.has(c.cantoNumber)) {
            seen.add(c.cantoNumber);
            return true;
        }
        return false;
    });
}
