/*
# Create contacts and portfolio tables for NexusFlow Labs

1. New Tables
- `contacts`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email address
  - `message` (text, not null) — the inquiry body
  - `created_at` (timestamptz, default now()) — submission timestamp
- `portfolio`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `title` (text, not null) — project title
  - `description` (text, not null) — project description
  - `image_url` (text) — optional cover image URL
  - `project_url` (text) — optional live project URL
  - `tech_stack` (text[], default '{}') — array of technology names
  - `created_at` (timestamptz, default now()) — creation timestamp

2. Security
- Enable RLS on both tables.
- `contacts`: public INSERT (anyone can submit the contact form), authenticated-only SELECT/UPDATE/DELETE (only admins read/manage messages).
- `portfolio`: public SELECT (showcase on the public site), authenticated-only INSERT/UPDATE/DELETE (only admins manage projects).
- Policies are split into one per CRUD verb (no FOR ALL).
- Existing policies dropped first to keep the migration idempotent.

3. Important Notes
- This app has a sign-in screen (admin), so management policies are scoped TO authenticated.
- The public contact form uses the anon key to INSERT into contacts; the SELECT on contacts is restricted to authenticated admins so submissions are not publicly readable.
- The public portfolio showcase uses the anon key to SELECT from portfolio; writes are admin-only.
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contacts" ON contacts;
CREATE POLICY "anon_insert_contacts" ON contacts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_contacts" ON contacts;
CREATE POLICY "auth_select_contacts" ON contacts FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_contacts" ON contacts;
CREATE POLICY "auth_update_contacts" ON contacts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_contacts" ON contacts;
CREATE POLICY "auth_delete_contacts" ON contacts FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  project_url text,
  tech_stack text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_portfolio" ON portfolio;
CREATE POLICY "anon_select_portfolio" ON portfolio FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_portfolio" ON portfolio;
CREATE POLICY "auth_insert_portfolio" ON portfolio FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_portfolio" ON portfolio;
CREATE POLICY "auth_update_portfolio" ON portfolio FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_portfolio" ON portfolio;
CREATE POLICY "auth_delete_portfolio" ON portfolio FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS portfolio_created_at_idx ON portfolio (created_at DESC);
