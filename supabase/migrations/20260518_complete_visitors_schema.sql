-- ============================================================
-- Buku Tamu PST BPS Flores Timur — Complete Schema Migration
-- Aman dijalankan berulang kali (idempotent)
-- Jalankan di: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ── 1. Buat tabel jika belum ada ─────────────────────────────
CREATE TABLE IF NOT EXISTS visitors (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  queue_number TEXT        NOT NULL,
  full_name    TEXT        NOT NULL,
  phone        TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  gender       TEXT        NOT NULL CHECK (gender IN ('L', 'P')),
  birth_date   DATE        NOT NULL,
  institution  TEXT        NOT NULL,
  education    TEXT        NOT NULL,
  occupation   TEXT        NOT NULL,
  service_type TEXT        NOT NULL,
  purpose      TEXT        NOT NULL,
  visited_at   TIMESTAMPTZ DEFAULT now(),
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ── 2. Patch kolom yang mungkin belum ada (safe ALTER) ───────
--    Berguna jika tabel sudah dibuat sebelumnya tanpa kolom-kolom ini.

ALTER TABLE visitors ADD COLUMN IF NOT EXISTS queue_number TEXT;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS full_name    TEXT;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS phone        TEXT;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS email        TEXT;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS gender       TEXT;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS birth_date   DATE;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS institution  TEXT;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS education    TEXT;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS occupation   TEXT;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS service_type TEXT;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS purpose      TEXT;
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS visited_at   TIMESTAMPTZ DEFAULT now();
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS created_at   TIMESTAMPTZ DEFAULT now();

-- ── 3. Index untuk performa ──────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_visitors_visited_at   ON visitors (visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitors_service_type ON visitors (service_type);
CREATE INDEX IF NOT EXISTS idx_visitors_education    ON visitors (education);
CREATE INDEX IF NOT EXISTS idx_visitors_queue_number ON visitors (queue_number);

-- ── 4. Row Level Security ────────────────────────────────────
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- ── 5. RLS Policies (idempotent) ─────────────────────────────

-- Siapapun (anon) bisa insert → form publik
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'visitors' AND policyname = 'allow_public_insert'
  ) THEN
    CREATE POLICY "allow_public_insert" ON visitors
      FOR INSERT TO anon
      WITH CHECK (true);
  END IF;
END $$;

-- Admin login bisa SELECT semua data
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'visitors' AND policyname = 'allow_auth_select'
  ) THEN
    CREATE POLICY "allow_auth_select" ON visitors
      FOR SELECT TO authenticated
      USING (true);
  END IF;
END $$;

-- Admin login bisa DELETE
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'visitors' AND policyname = 'allow_auth_delete'
  ) THEN
    CREATE POLICY "allow_auth_delete" ON visitors
      FOR DELETE TO authenticated
      USING (true);
  END IF;
END $$;

-- Admin login juga bisa INSERT (opsional)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'visitors' AND policyname = 'allow_auth_insert'
  ) THEN
    CREATE POLICY "allow_auth_insert" ON visitors
      FOR INSERT TO authenticated
      WITH CHECK (true);
  END IF;
END $$;
