import { NextResponse } from 'next/server';
import { createServerSupabaseClient, type PradipikaIssue } from '@/lib/supabase';

// Sync Bhagavata Pradipika issues from ISKCON Desire Tree
export async function POST() {
    try {
        const supabase = createServerSupabaseClient();

        // Fetch the directory listing from ISKCON Desire Tree
        const response = await fetch(
            'https://ebooks.iskcondesiretree.com/index.php?q=f&f=%2Fpdf%2FBhagavata_Pradipika'
        );

        if (!response.ok) {
            throw new Error('Failed to fetch from ISKCON Desire Tree');
        }

        const html = await response.text();

        // Parse PDF links from the HTML
        const pdfLinks = parsePdfLinks(html);

        // Get existing issues from database
        const { data: existingIssues } = await supabase
            .from('pradipika_issues')
            .select('issue_number');

        const existingNumbers = new Set(existingIssues?.map(i => i.issue_number) || []);

        // Filter new issues
        const newIssues = pdfLinks.filter(issue => !existingNumbers.has(issue.issue_number));

        if (newIssues.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No new issues to sync',
                total: pdfLinks.length,
                synced: 0
            });
        }

        // Insert new issues
        const { error } = await supabase
            .from('pradipika_issues')
            .insert(newIssues);

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            message: `Synced ${newIssues.length} new issues`,
            total: pdfLinks.length,
            synced: newIssues.length,
            newIssues: newIssues.map(i => ({ number: i.issue_number, title: i.title }))
        });

    } catch (error) {
        console.error('Sync error:', error);
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}

// GET endpoint to check sync status
export async function GET() {
    try {
        const supabase = createServerSupabaseClient();

        const { count } = await supabase
            .from('pradipika_issues')
            .select('*', { count: 'exact', head: true });

        return NextResponse.json({
            success: true,
            issuesInDatabase: count || 0
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}

// Parse PDF links from HTML
function parsePdfLinks(html: string): Omit<PradipikaIssue, 'id' | 'synced_at' | 'created_at'>[] {
    const issues: Omit<PradipikaIssue, 'id' | 'synced_at' | 'created_at'>[] = [];

    // Match PDF URLs
    const pdfRegex = /href="([^"]*Bhagavata_Pradipika[^"]*\.pdf)"/gi;
    let match;

    while ((match = pdfRegex.exec(html)) !== null) {
        const pdfUrl = match[1].startsWith('http')
            ? match[1]
            : `https://ebooks.iskcondesiretree.com${match[1]}`;

        const filename = decodeURIComponent(pdfUrl.split('/').pop() || '');
        const parsed = parseFilename(filename);

        if (parsed) {
            issues.push({
                issue_number: parsed.issueNumber,
                title: parsed.title,
                date: parsed.date,
                pdf_url: pdfUrl,
                pdf_filename: filename,
                cover_image_url: null, // Will be populated when we extract covers
                is_special: parsed.isSpecial,
                special_type: parsed.specialType
            });
        }
    }

    return issues;
}

// Parse filename to extract metadata
function parseFilename(filename: string): {
    issueNumber: number;
    title: string;
    date: string;
    isSpecial: boolean;
    specialType: string | null;
} | null {
    try {
        // Remove .pdf extension and decode
        const name = filename.replace('.pdf', '').replace(/_/g, ' ');

        // Pattern: "XX - Bhagavata Pradipika Issue XX-Title - YYYY-MM"
        // or "Bhagavata Pradipika Issue XX-Title - YYYY-MM"

        // Extract issue number
        const issueMatch = name.match(/Issue\s*(\d+)/i);
        if (!issueMatch) return null;

        const issueNumber = parseInt(issueMatch[1], 10);

        // Extract date (YYYY-MM format)
        const dateMatch = name.match(/(\d{4})-(\d{2})/);
        const date = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}` : '';

        // Extract title (between issue number and date)
        let title = name
            .replace(/^\d+\s*-\s*/, '') // Remove leading number
            .replace(/Bhagavata\s*Pradipika\s*Issue\s*\d+\s*-?\s*/i, '') // Remove issue prefix
            .replace(/\s*-\s*\d{4}-\d{2}.*$/, '') // Remove date suffix
            .replace(/\.pdf.*$/i, '') // Remove any remaining .pdf
            .trim();

        // Clean up special characters
        title = title.replace(/%27/g, "'").replace(/%20/g, ' ');

        // Check for special editions
        const specialTypes = [
            'janmastami', 'kartik', 'diwali', 'ramanavami', 'narsimha',
            'radhastami', 'gaura purnima', 'varaha', 'hanuman', 'bhadra purnima'
        ];

        let isSpecial = false;
        let specialType: string | null = null;

        const lowerTitle = title.toLowerCase();
        for (const type of specialTypes) {
            if (lowerTitle.includes(type)) {
                isSpecial = true;
                specialType = type;
                break;
            }
        }

        // Also check for "Special" keyword
        if (lowerTitle.includes('special')) {
            isSpecial = true;
        }

        return { issueNumber, title, date, isSpecial, specialType };
    } catch {
        return null;
    }
}
