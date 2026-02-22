// Media data — Sampati Dasa (HKM Pune) BG & SB Playlists
// YouTube Channel: https://www.youtube.com/@hkmpune

export type MediaCategory = 'bg' | 'sb' | 'vedic-stories' | 'topical';

export interface MediaPlaylist {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    category: MediaCategory;
    videoCount: number;
    youtubePlaylistUrl: string;
    youtubePlaylistId: string;
    icon: string;
    instructor: string;
    tags: string[];
}

export interface MediaGroup {
    id: string;
    title: string;
    titleSanskrit: string;
    description: string;
    icon: string;
    category: MediaCategory;
    playlists: MediaPlaylist[];
}

// ─── Instructor ──────────────────────────────────────────
export const MEDIA_INSTRUCTOR = {
    name: 'HG Sampati Dasa',
    channel: 'HKM Pune',
    channelUrl: 'https://www.youtube.com/@hkmpune',
    bio: 'HG Sampati Dasa is a senior devotee and scholar who presents Bhagavad-gītā and Śrīmad-Bhāgavatam in an engaging, accessible style through the HKM Pune channel.',
};

// ─── Bhagavad Gītā ──────────────────────────────────────
export const MEDIA_BG_PLAYLISTS: MediaPlaylist[] = [
    {
        slug: 'sampati-bg',
        title: 'Bhagavad Gītā — Complete Series',
        subtitle: 'Chapter-wise Study by Sampati Dasa',
        description: 'A comprehensive chapter-by-chapter study of Bhagavad-gītā As It Is, covering all 18 chapters with detailed explanations, practical applications, and deep philosophical insights.',
        category: 'bg',
        videoCount: 51,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf3_ICriMu_FmZJsWwcZWZKM',
        youtubePlaylistId: 'PLR9NxMJ4tXf3_ICriMu_FmZJsWwcZWZKM',
        icon: '🕉️',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Bhagavad Gītā', 'Complete', '18 Chapters', 'Chapter-wise'],
    },
];

// ─── Śrīmad Bhāgavatam ─────────────────────────────────
export const MEDIA_SB_PLAYLISTS: MediaPlaylist[] = [
    {
        slug: 'sampati-sb',
        title: 'Śrīmad Bhāgavatam — Series',
        subtitle: 'Study by Sampati Dasa',
        description: 'A guided study through the spotless Purāṇa — Śrīmad-Bhāgavatam. Covering the essential topics, characters, and philosophical teachings across the cantos.',
        category: 'sb',
        videoCount: 14,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf33DRy2s3UjGxbEKS9IDrs_',
        youtubePlaylistId: 'PLR9NxMJ4tXf33DRy2s3UjGxbEKS9IDrs_',
        icon: '📖',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Śrīmad Bhāgavatam', 'Purāṇa', 'Canto-wise'],
    },
];

// ─── Vedic Stories & Epics ──────────────────────────────
export const MEDIA_VEDIC_PLAYLISTS: MediaPlaylist[] = [
    {
        slug: 'sampati-ramayan',
        title: 'Original Valmiki Rāmāyan in Detail',
        subtitle: 'Epic Narration by Sampati Dasa',
        description: 'A detailed retelling of the original Valmiki Rāmāyaṇa, presenting the glories of Lord Rāmacandra, Sīta Devī, and Hanumān ji in an engaging narrative style.',
        category: 'vedic-stories',
        videoCount: 55,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf2pnfPco7X4diOBk2NslJo-',
        youtubePlaylistId: 'PLR9NxMJ4tXf2pnfPco7X4diOBk2NslJo-',
        icon: '🏹',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Rāmāyaṇa', 'Valmiki', 'Epic', 'Lord Rāma'],
    },
    {
        slug: 'sampati-ramayan-lessons',
        title: 'Lessons from Rāmāyaṇa',
        subtitle: 'Life Lessons & Moral Teachings',
        description: 'Practical life lessons and moral teachings derived from the episodes of the Rāmāyaṇa — applicable to modern-day challenges.',
        category: 'vedic-stories',
        videoCount: 16,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf2-Ng0CGWMzsb5rKX_SBTct',
        youtubePlaylistId: 'PLR9NxMJ4tXf2-Ng0CGWMzsb5rKX_SBTct',
        icon: '🌺',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Rāmāyaṇa', 'Lessons', 'Moral'],
    },
    {
        slug: 'sampati-mahabharat-lessons',
        title: 'Lessons from Mahābhārata',
        subtitle: 'Insights from the Great Epic',
        description: 'Key lessons from the Mahābhārata — exploring dharma, strategy, devotion, and the complexities of human nature.',
        category: 'vedic-stories',
        videoCount: 6,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf2oi-DoZy2nMB8reFIINOQk',
        youtubePlaylistId: 'PLR9NxMJ4tXf2oi-DoZy2nMB8reFIINOQk',
        icon: '⚔️',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Mahābhārata', 'Dharma', 'Lessons'],
    },
];

// ─── Topical Series ─────────────────────────────────────
export const MEDIA_TOPICAL_PLAYLISTS: MediaPlaylist[] = [
    {
        slug: 'sampati-handling-lust',
        title: 'Handling Lust',
        subtitle: 'Practical Guidance',
        description: 'Scriptural insights and practical guidance on overcoming lust — one of the greatest obstacles on the spiritual path.',
        category: 'topical',
        videoCount: 7,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf15Aqnvl6PF-z6X7IkLUxGx',
        youtubePlaylistId: 'PLR9NxMJ4tXf15Aqnvl6PF-z6X7IkLUxGx',
        icon: '🛡️',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Lust', 'Self-Control', 'Practical'],
    },
    {
        slug: 'sampati-ekadashi',
        title: 'Ekādaśī',
        subtitle: 'The Glories of Fasting',
        description: 'Understanding the significance, glories, and proper observance of Ekādaśī — the sacred fasting days.',
        category: 'topical',
        videoCount: 8,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf11dKywzGo-PGIARlFT1jPj',
        youtubePlaylistId: 'PLR9NxMJ4tXf11dKywzGo-PGIARlFT1jPj',
        icon: '🌙',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Ekādaśī', 'Fasting', 'Vrata'],
    },
    {
        slug: 'sampati-reincarnation',
        title: 'Re-incarnation',
        subtitle: 'The Science of the Soul',
        description: 'Exploring the Vedic science of reincarnation — evidence, explanations, and the journey of the soul across lifetimes.',
        category: 'topical',
        videoCount: 7,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf0wY6ikr22M-oOQzVzqxmyp',
        youtubePlaylistId: 'PLR9NxMJ4tXf0wY6ikr22M-oOQzVzqxmyp',
        icon: '🔄',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Reincarnation', 'Soul', 'Transmigration'],
    },
    {
        slug: 'sampati-narasimha',
        title: 'Glories of Lord Narasimha',
        subtitle: 'The Half-Man Half-Lion Avatāra',
        description: 'Exploring the glories, pastimes, and protection offered by Lord Nṛsiṁhadeva — the fierce protector of His devotees.',
        category: 'topical',
        videoCount: 3,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf1RkgLQWPua0ghJvLggnp2D',
        youtubePlaylistId: 'PLR9NxMJ4tXf1RkgLQWPua0ghJvLggnp2D',
        icon: '🦁',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Nṛsiṁha', 'Prahlāda', 'Protection'],
    },
    {
        slug: 'sampati-janmashtami',
        title: 'Janmāṣṭamī',
        subtitle: 'Appearance of Lord Kṛṣṇa',
        description: 'Special talks on the glorious appearance of Lord Śrī Kṛṣṇa and the significance of celebrating Janmāṣṭamī.',
        category: 'topical',
        videoCount: 7,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf3R8TbuB_IK_-mpRXZwLzul',
        youtubePlaylistId: 'PLR9NxMJ4tXf3R8TbuB_IK_-mpRXZwLzul',
        icon: '🎉',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Janmāṣṭamī', 'Kṛṣṇa', 'Festival'],
    },
    {
        slug: 'sampati-radhashtami',
        title: 'Rādhāṣṭamī',
        subtitle: 'Appearance of Śrīmatī Rādhārāṇī',
        description: 'Talks glorifying Śrīmatī Rādhārāṇī — the supreme devotee of Lord Kṛṣṇa and the embodiment of divine love.',
        category: 'topical',
        videoCount: 5,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf02scOqIU2wzt2NS1R0y8lG',
        youtubePlaylistId: 'PLR9NxMJ4tXf02scOqIU2wzt2NS1R0y8lG',
        icon: '🌹',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Rādhārāṇī', 'Festival', 'Divine Love'],
    },
    {
        slug: 'sampati-lord-shiva',
        title: 'Lord Shiva',
        subtitle: 'The Greatest Vaiṣṇava',
        description: 'Understanding Lord Śiva\'s exalted position as the greatest devotee of Lord Viṣṇu and his role in the cosmic order.',
        category: 'topical',
        videoCount: 2,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf1AvcKFNvflOHwXeWQ2NL6i',
        youtubePlaylistId: 'PLR9NxMJ4tXf1AvcKFNvflOHwXeWQ2NL6i',
        icon: '🔱',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Lord Śiva', 'Vaiṣṇava', 'Demigods'],
    },
    {
        slug: 'sampati-inspiring-mothers',
        title: 'Inspiring Mothers in Vedic Culture',
        subtitle: 'Women of Strength & Devotion',
        description: 'Stories of inspiring women and mothers from the Vedic tradition who exemplified devotion, courage, and wisdom.',
        category: 'topical',
        videoCount: 5,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf3Cx37D0BViiAh1_NBk2WVY',
        youtubePlaylistId: 'PLR9NxMJ4tXf3Cx37D0BViiAh1_NBk2WVY',
        icon: '👩‍👧',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Women', 'Mothers', 'Vedic Culture'],
    },
    {
        slug: 'sampati-devotional-dramas',
        title: 'Devotional Dramas',
        subtitle: 'Theatrical Presentations',
        description: 'Engaging devotional dramas and theatrical performances presenting Vedic stories and pastimes of the Lord.',
        category: 'topical',
        videoCount: 13,
        youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLR9NxMJ4tXf0Mz9Xnzwz_J5S1-QI-9eIg',
        youtubePlaylistId: 'PLR9NxMJ4tXf0Mz9Xnzwz_J5S1-QI-9eIg',
        icon: '🎭',
        instructor: MEDIA_INSTRUCTOR.name,
        tags: ['Drama', 'Theatre', 'Performance'],
    },
];

// ─── Media Groups (for navigation) ─────────────────────
export const MEDIA_GROUPS: MediaGroup[] = [
    {
        id: 'bg',
        title: 'Bhagavad Gītā',
        titleSanskrit: 'भगवद्गीता',
        description: 'Complete chapter-wise video study of the Song of God',
        icon: '🕉️',
        category: 'bg',
        playlists: MEDIA_BG_PLAYLISTS,
    },
    {
        id: 'sb',
        title: 'Śrīmad Bhāgavatam',
        titleSanskrit: 'श्रीमद् भागवतम्',
        description: 'Study series on the ripened fruit of Vedic literature',
        icon: '📖',
        category: 'sb',
        playlists: MEDIA_SB_PLAYLISTS,
    },
    {
        id: 'vedic-stories',
        title: 'Vedic Epics & Stories',
        titleSanskrit: 'वैदिक कथाएँ',
        description: 'Rāmāyaṇa, Mahābhārata, and timeless Vedic narratives',
        icon: '🏹',
        category: 'vedic-stories',
        playlists: MEDIA_VEDIC_PLAYLISTS,
    },
    {
        id: 'topical',
        title: 'Topical Series',
        titleSanskrit: 'विषय श्रृंखला',
        description: 'Special topics on festivals, philosophy, and devotional life',
        icon: '✨',
        category: 'topical',
        playlists: MEDIA_TOPICAL_PLAYLISTS,
    },
];

// ─── Helpers ────────────────────────────────────────────
export const ALL_MEDIA_PLAYLISTS: MediaPlaylist[] = [
    ...MEDIA_BG_PLAYLISTS,
    ...MEDIA_SB_PLAYLISTS,
    ...MEDIA_VEDIC_PLAYLISTS,
    ...MEDIA_TOPICAL_PLAYLISTS,
];

export function getMediaPlaylistBySlug(slug: string): MediaPlaylist | undefined {
    return ALL_MEDIA_PLAYLISTS.find((p) => p.slug === slug);
}

export function getMediaTotalVideoCount(): number {
    return ALL_MEDIA_PLAYLISTS.reduce((sum, p) => sum + p.videoCount, 0);
}
