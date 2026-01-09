import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// Get a single issue by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = getSupabase();

        // Try to fetch by ID first, then by issue number
        let query;

        if (id.match(/^\d+$/)) {
            // It's a number, search by issue_number
            query = supabase
                .from('pradipika_issues')
                .select('*')
                .eq('issue_number', parseInt(id, 10))
                .single();
        } else {
            // It's a UUID, search by id
            query = supabase
                .from('pradipika_issues')
                .select('*')
                .eq('id', id)
                .single();
        }

        const { data, error } = await query;

        if (error || !data) {
            return NextResponse.json(
                { success: false, error: 'Issue not found' },
                { status: 404 }
            );
        }

        // Get related issues (same special type or adjacent issue numbers)
        const { data: relatedIssues } = await supabase
            .from('pradipika_issues')
            .select('*')
            .or(`issue_number.eq.${data.issue_number - 1},issue_number.eq.${data.issue_number + 1}${data.special_type ? `,special_type.eq.${data.special_type}` : ''}`)
            .neq('id', data.id)
            .limit(5);

        return NextResponse.json({
            success: true,
            issue: data,
            relatedIssues: relatedIssues || []
        });

    } catch (error) {
        console.error('Get issue error:', error);
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}
