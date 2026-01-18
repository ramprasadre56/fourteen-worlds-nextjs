import { NextRequest, NextResponse } from 'next/server';
import { getSupabase, type PradipikaIssue } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Query parameters
        const year = searchParams.get('year');
        const special = searchParams.get('special');
        const specialType = searchParams.get('specialType');
        const limit = parseInt(searchParams.get('limit') || '50', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);

        // Build query
        const supabase = getSupabase();
        let query = supabase
            .from('pradipika_issues')
            .select('*', { count: 'exact' });

        // Apply filters
        if (year) {
            query = query.like('date', `${year}-%`);
        }

        if (special === 'true') {
            query = query.eq('is_special', true);
        }

        if (specialType) {
            query = query.eq('special_type', specialType);
        }

        // Apply pagination and ordering
        const { data, count, error } = await query
            .order('issue_number', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            throw error;
        }

        // Group issues by year for convenience
        const issuesByYear: Record<string, PradipikaIssue[]> = {};

        (data || []).forEach((issue: PradipikaIssue) => {
            const issueYear = issue.date.split('-')[0];
            if (!issuesByYear[issueYear]) {
                issuesByYear[issueYear] = [];
            }
            issuesByYear[issueYear].push(issue);
        });

        // Get available years
        const years = Object.keys(issuesByYear).sort((a, b) => parseInt(b) - parseInt(a));

        // Get special types available
        const specialTypesSet = new Set<string>();
        (data || []).forEach((issue: PradipikaIssue) => {
            if (issue.special_type) {
                specialTypesSet.add(issue.special_type);
            }
        });

        return NextResponse.json({
            success: true,
            issues: data || [],
            issuesByYear,
            years,
            specialTypes: Array.from(specialTypesSet),
            total: count || 0,
            limit,
            offset
        });

    } catch (error: unknown) {
        console.error('List error:', error);
        const errorMessage = error instanceof Error 
            ? error.message 
            : typeof error === 'object' && error !== null && 'message' in error
                ? String((error as { message: unknown }).message)
                : 'Unknown error occurred';
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}
