import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Courses — Systematic Study of BG & SB | Fourteen Worlds',
    description: 'Systematic study courses on Bhagavad-gītā and Śrīmad-Bhāgavatam by HG Pavaneswar Das',
};

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
