-- ============================================
-- Buku Tamu PST BPS Flores Timur
-- Supabase Database Schema
-- ============================================

-- 1. Tabel utama pengunjung
CREATE TABLE IF NOT EXISTS visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  queue_number TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('L', 'P')),
  birth_date DATE NOT NULL,
  institution TEXT NOT NULL,
  education TEXT NOT NULL,
  occupation TEXT NOT NULL,
  service_type TEXT NOT NULL,
  purpose TEXT NOT NULL,
  visited_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Index untuk query harian (queue number generation & dashboard)
CREATE INDEX IF NOT EXISTS idx_visitors_visited_at ON visitors (visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitors_service_type ON visitors (service_type);
CREATE INDEX IF NOT EXISTS idx_visitors_education ON visitors (education);

-- 3. Enable Row Level Security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- 4. Policies
-- Public form: anyone can insert
CREATE POLICY "allow_public_insert" ON visitors
  FOR INSERT TO anon
  WITH CHECK (true);

-- Authenticated admin: full read access
CREATE POLICY "allow_auth_select" ON visitors
  FOR SELECT TO authenticated
  USING (true);

-- Authenticated admin: delete access
CREATE POLICY "allow_auth_delete" ON visitors
  FOR DELETE TO authenticated
  USING (true);

-- Also allow anon to read their own just-inserted row (for queue number return)
-- This uses a function-based approach: the API route uses the service role for reads
-- So we also allow authenticated inserts
CREATE POLICY "allow_auth_insert" ON visitors
  FOR INSERT TO authenticated
  WITH CHECK (true);
