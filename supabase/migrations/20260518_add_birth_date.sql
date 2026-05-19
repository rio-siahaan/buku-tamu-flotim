-- Migration: add birth_date column to visitors table
-- Run this if the column is missing (table was created before this field was added)
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS birth_date DATE;
