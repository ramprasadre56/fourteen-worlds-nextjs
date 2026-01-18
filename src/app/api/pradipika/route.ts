import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export interface PradipikaIssue {
    issue_number: string;
    title: string;
    date: string;
    pdf_url: string;
}

const PRADIPIKA_INDEX_URL = 'https://ebooks.iskcondesiretree.com/index.php?q=f&f=%2Fpdf%2FBhagavata_Pradipika';

// Fallback data in case fetch fails
const fallbackIssues: PradipikaIssue[] = [
    { issue_number: "103", title: "Welcoming the 26 Vaishnava Qualities in 2026", date: "2026-01", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/Bhagavata_Pradipika_Issue_103-Welcoming_the_26_Vaishnava_Qualities_in_2026_-_2026-01.pdf" },
    { issue_number: "102", title: "The Scripture that fills the Heart", date: "2025-12", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/Bhagavata_Pradipika_Issue_102-The_Scripture_that_fills_the_Heart_-_2025-12.pdf" },
    { issue_number: "101", title: "In the Womb of Divine Protection", date: "2025-11", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/Bhagavata_Pradipika_Issue_101-In_the_Womb_of_Divine_Protection_-_2025-11.pdf" },
    { issue_number: "100", title: "Kartik Special", date: "2025-10", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/Bhagavata_Pradipika_Issue_100-Kartik_Special_-_2025-10.pdf" },
    { issue_number: "99", title: "Krishna never leaves your Side", date: "2025-09", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/99_-_Bhagavata_Pradipika_Issue_99-Krishna_never_leaves_your_Side_-_2025-09.pdf" },
    { issue_number: "98", title: "The Real Spirit of Janmastami", date: "2025-08", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/98_-_Bhagavata_Pradipika_Issue_98-The_Real_Spirit_of_Janmastami-Inviting_Krsna_into_our_Hearts_-_2025-08.pdf" },
    { issue_number: "97", title: "When the Intention Isn't Right", date: "2025-07", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/97_-_Bhagavata_Pradipika_Issue_97-When_the_Intention_Isn%E2%80%99t_Right_But_the_Association_Is_-_2025-07.pdf" },
    { issue_number: "96", title: "Do You Truly Want Your Dependents to Advance", date: "2025-06", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/96_-_Bhagavata_Pradipika_Issue_96-Do_you_Truly_Want_your_Dependents_to_Advance_-_2025-06.pdf" },
    { issue_number: "95", title: "A Devotee's Compassion", date: "2025-05", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/95_-_Bhagavata_Pradipika_Issue_95-A_Devotee%27s_Compassion_-_2025-05.pdf" },
    { issue_number: "94", title: "Epitome of Forgiveness", date: "2025-04", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/94_-_Bhagavata_Pradipika_Issue_94-Epitome_of_Forgiveness_-_2025-04.pdf" },
    { issue_number: "93", title: "An Unwarranted Distraction", date: "2025-03", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/93_-_Bhagavata_Pradipika_Issue_93-An_Unwarranted_Distraction_-_2025-03.pdf" },
    { issue_number: "92", title: "Me Mind and Bhakti-Dissatisfaction", date: "2025-02", pdf_url: "https://ebooks.iskcondesiretree.com/pdf/Bhagavata_Pradipika/92_-_Bhagavata_Pradipika_Issue_92-Me_Mind_and_Bhakti-Dissatisfaction_-_2025-02.pdf" },
];

export async function GET() {
    try {
        const response = await fetch(PRADIPIKA_INDEX_URL, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Find all PDF links
        const links = document.querySelectorAll('a[href*="Bhagavata_Pradipika"]');
        const issues: PradipikaIssue[] = [];

        links.forEach((link) => {
            const href = link.getAttribute('href');
            const text = link.textContent?.trim();

            if (href && text && href.endsWith('.pdf')) {
                // Parse the link text to extract issue number, title, and date
                const issueMatch = text.match(/Issue\s+(\d+)/i);
                const dateMatch = text.match(/(\d{4}-\d{2}(?:-\d{2})?)/);

                if (issueMatch) {
                    const issueNumber = issueMatch[1];
                    const date = dateMatch ? dateMatch[1] : '';

                    // Extract title
                    let title = text
                        .replace(/Bhagavata Pradipika Issue \d+\s*-?\s*/i, '')
                        .replace(/\s*-\s*\d{4}-\d{2}(?:-\d{2})?.*/, '')
                        .replace(/-/g, ' ')
                        .trim();

                    if (!title) {
                        title = `Issue ${issueNumber}`;
                    }

                    issues.push({
                        issue_number: issueNumber,
                        title,
                        date,
                        pdf_url: href.startsWith('http') ? href : `https://ebooks.iskcondesiretree.com${href}`
                    });
                }
            }
        });

        // Sort by issue number descending (latest first)
        issues.sort((a, b) => parseInt(b.issue_number) - parseInt(a.issue_number));

        return NextResponse.json(issues);
    } catch (error) {
        console.error('Error fetching Bhagavata Pradipika issues:', error);
        return NextResponse.json(fallbackIssues);
    }
}
