import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Database types for Bhagavata Pradipika
export interface PradipikaIssue {
  id: string;
  issue_number: number;
  title: string;
  date: string;
  pdf_url: string;
  pdf_filename: string;
  cover_image_url: string | null;
  is_special: boolean;
  special_type: string | null;
  synced_at: string;
  created_at: string;
}

// Supabase client - lazy initialization to handle build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

// For backward compatibility
export const supabase = {
  from: (table: string) => getSupabase().from(table),
};

// Server-side client with service role (for protected operations)
export function createServerSupabaseClient(): SupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase service role not configured. Please set SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(supabaseUrl, serviceRoleKey);
}

// Helper functions for Pradipika operations
export async function getAllIssues(): Promise<PradipikaIssue[]> {
  const { data, error } = await supabase
    .from('pradipika_issues')
    .select('*')
    .order('issue_number', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getIssueById(id: string): Promise<PradipikaIssue | null> {
  const { data, error } = await supabase
    .from('pradipika_issues')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function getIssueByNumber(issueNumber: number): Promise<PradipikaIssue | null> {
  const { data, error } = await supabase
    .from('pradipika_issues')
    .select('*')
    .eq('issue_number', issueNumber)
    .single();

  if (error) return null;
  return data;
}

export async function getLatestIssue(): Promise<PradipikaIssue | null> {
  const { data, error } = await supabase
    .from('pradipika_issues')
    .select('*')
    .order('issue_number', { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

export async function getIssuesByYear(year: number): Promise<PradipikaIssue[]> {
  const { data, error } = await supabase
    .from('pradipika_issues')
    .select('*')
    .like('date', `${year}-%`)
    .order('issue_number', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getSpecialIssues(specialType?: string): Promise<PradipikaIssue[]> {
  let query = supabase
    .from('pradipika_issues')
    .select('*')
    .eq('is_special', true);

  if (specialType) {
    query = query.eq('special_type', specialType);
  }

  const { data, error } = await query.order('issue_number', { ascending: false });

  if (error) throw error;
  return data || [];
}
