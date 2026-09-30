import { NextResponse } from 'next/server';
import { getExternalStories } from '@/lib/external-stories';

// Re-fetch the source sites at most every 30 minutes.
export const revalidate = 1800;

export async function GET() {
    const { stories, errors } = await getExternalStories();
    if (errors.length) console.warn('[external-stories]', errors.join('; '));
    return NextResponse.json(
        { stories, fetchedAt: new Date().toISOString() },
        { headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' } },
    );
}
