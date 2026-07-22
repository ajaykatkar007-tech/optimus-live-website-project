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

4. Security (RLS)
   - Enable RLS on `consultation_requests`.
   - Public INSERT allowed (anon + authenticated) so the no-auth marketing site
     can submit leads. USING (true) / WITH CHECK (true) is intentional here
     because this table is a public lead-capture endpoint.
   - No SELECT/UPDATE/DELETE for anon — only authenticated (internal staff) can
     read or manage leads once submitted.
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
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS consultation_requests_created_at_idx
  ON consultation_requests (created_at DESC);

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Public can submit leads (no-auth marketing site)
DROP POLICY IF EXISTS "anon_insert_consultation_requests" ON consultation_requests;
CREATE POLICY "anon_insert_consultation_requests"
  ON consultation_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated staff can read leads
DROP POLICY IF EXISTS "auth_select_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_select_consultation_requests"
  ON consultation_requests FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated staff can update lead status
DROP POLICY IF EXISTS "auth_update_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_update_consultation_requests"
  ON consultation_requests FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- Only authenticated staff can delete leads
DROP POLICY IF EXISTS "auth_delete_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_delete_consultation_requests"
  ON consultation_requests FOR DELETE
  TO authenticated
  USING (true);
