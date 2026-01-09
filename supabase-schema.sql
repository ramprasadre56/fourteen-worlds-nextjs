-- =====================================================
-- Bhagavata Pradipika Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Issues table (main metadata)
create table if not exists pradipika_issues (
  id uuid primary key default gen_random_uuid(),
  issue_number int unique not null,
  title text not null,
  date text not null, -- Format: YYYY-MM
  pdf_url text unique not null,
  pdf_filename text not null,
  cover_image_url text,
  is_special boolean default false,
  special_type text, -- janmastami, kartik, diwali, ramanavami, narsimha, etc.
  synced_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Create index for faster queries
create index if not exists idx_pradipika_date on pradipika_issues(date);
create index if not exists idx_pradipika_special on pradipika_issues(is_special, special_type);

-- Enable Row Level Security (RLS)
alter table pradipika_issues enable row level security;

-- Allow public read access
create policy "Allow public read access" on pradipika_issues
  for select using (true);

-- Allow service role to insert/update/delete
create policy "Allow service role full access" on pradipika_issues
  for all using (auth.role() = 'service_role');

-- =====================================================
-- FUTURE: Tables for AI features (run when needed)
-- =====================================================

-- Content table (extracted text for AI) - FUTURE
-- create table if not exists pradipika_content (
--   id uuid primary key default gen_random_uuid(),
--   issue_id uuid references pradipika_issues(id) on delete cascade,
--   full_text text not null,
--   summary text,
--   topics text[],
--   extracted_at timestamptz default now(),
--   unique(issue_id)
-- );

-- Embeddings table (for semantic search) - FUTURE
-- Enable pgvector first: create extension if not exists vector;
-- create table if not exists pradipika_embeddings (
--   id uuid primary key default gen_random_uuid(),
--   issue_id uuid references pradipika_issues(id) on delete cascade,
--   chunk_index int not null,
--   chunk_text text not null,
--   embedding vector(768),
--   created_at timestamptz default now(),
--   unique(issue_id, chunk_index)
-- );

-- create index on pradipika_embeddings 
-- using ivfflat (embedding vector_cosine_ops)
-- with (lists = 100);
