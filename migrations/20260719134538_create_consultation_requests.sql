/*
# Create consultation_requests table (single-tenant, no auth)

1. Purpose
   Stores consultation/RCM assessment requests submitted from the public
   contact form on the Optimus RCM Solutions marketing website. There is no
   sign-in flow, so the anon-key frontend client must be able to INSERT rows.

2. New Tables
   - `consultation_requests`
     - `id` (uuid, primary key)
     - `name` (text, not null) — requester full name
     - `practice_name` (text) — optional practice/organization name
     - `email` (text, not null) — contact email
     - `phone` (text) — optional phone number
     - `specialty` (text) — medical specialty / practice type
     - `message` (text) — optional details / questions
     - `source` (text) — which form/CTA the lead came from (e.g. 'contact', 'assessment')
     - `status` (text, default 'new') — lead status for internal tracking
     - `created_at` (timestamptz, default now())

3. Indexes
   - `consultation_requests_created_at_idx` on `created_at` DESC for listing recent leads.

4. Table-level CHECK constraints (defense in depth)
   - `consultation_requests_name_check` — name non-empty, <= 200 chars.
   - `consultation_requests_email_check` — email matches local@domain pattern.
   - `consultation_requests_source_check` — source whitelisted.
   - `consultation_requests_status_check` — status whitelisted.
   - `consultation_requests_message_check` — message <= 5000 chars.

5. Security (RLS)
   - Enable RLS on `consultation_requests`.
   - Public INSERT (anon + authenticated) allowed only for well-formed leads:
     name present, email valid, source whitelisted, message length bounded.
   - Authenticated-only SELECT so internal staff can read all leads.
   - UPDATE requires a real authenticated user (auth.uid() IS NOT NULL) and
     restricts status transitions to the allowed set.
   - DELETE requires a real authenticated user (auth.uid() IS NOT NULL).
*/

CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  practice_name text,
  email text NOT NULL,
  phone text,
  specialty text,
  message text,
  source text DEFAULT 'contact',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT consultation_requests_name_check
    CHECK (char_length(btrim(name)) BETWEEN 1 AND 200),
  CONSTRAINT consultation_requests_email_check
    CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT consultation_requests_source_check
    CHECK (source IN ('contact', 'assessment', 'demo', 'newsletter', 'profile')),
  CONSTRAINT consultation_requests_status_check
    CHECK (status IN ('new', 'contacted', 'qualified', 'scheduled', 'closed', 'spam')),
  CONSTRAINT consultation_requests_message_check
    CHECK (message IS NULL OR char_length(message) <= 5000)
);

CREATE INDEX IF NOT EXISTS consultation_requests_created_at_idx
  ON consultation_requests (created_at DESC);

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Public can submit well-formed leads (no-auth marketing site)
DROP POLICY IF EXISTS "anon_insert_consultation_requests" ON consultation_requests;
CREATE POLICY "anon_insert_consultation_requests"
  ON consultation_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 200
    AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND source IN ('contact', 'assessment', 'demo', 'newsletter', 'profile')
    AND (message IS NULL OR char_length(message) <= 5000)
  );

-- Only authenticated staff can read leads
DROP POLICY IF EXISTS "auth_select_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_select_consultation_requests"
  ON consultation_requests FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated staff (real user session) can update; status restricted
DROP POLICY IF EXISTS "auth_update_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_update_consultation_requests"
  ON consultation_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND status IN ('new', 'contacted', 'qualified', 'scheduled', 'closed', 'spam')
  );

-- Only authenticated staff (real user session) can delete
DROP POLICY IF EXISTS "auth_delete_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_delete_consultation_requests"
  ON consultation_requests FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
