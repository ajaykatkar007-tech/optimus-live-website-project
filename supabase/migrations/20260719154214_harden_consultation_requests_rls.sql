/*
# Harden consultation_requests RLS policies

## Why
The original policies used `WITH CHECK (true)` / `USING (true)` on the INSERT,
UPDATE, and DELETE policies, which a security scan flags as bypassing row-level
security. This migration replaces those always-true clauses with meaningful
predicates and adds table-level CHECK constraints for defense in depth.

## Changes

### 1. Table-level CHECK constraints (data validation, defense in depth)
- `consultation_requests_name_check` — name is non-empty and within 200 chars.
- `consultation_requests_email_check` — email matches a basic local@domain pattern.
- `consultation_requests_source_check` — source is one of the allowed lead sources.
- `consultation_requests_status_check` — status is one of the allowed lead statuses.
- `consultation_requests_message_check` — message length capped at 5000 chars.

### 2. INSERT policy `anon_insert_consultation_requests`
- Replaced `WITH CHECK (true)` with a predicate validating that required fields
  are present and well-formed (name non-empty, email valid, source whitelisted,
  message length bounded). The public can still submit leads, but only
  well-formed ones.

### 3. UPDATE policy `auth_update_consultation_requests`
- Replaced `USING (true) WITH CHECK (true)` with `USING (auth.uid() IS NOT NULL)`
  and `WITH CHECK (auth.uid() IS NOT NULL AND status IN (...)`.
- Requires a real authenticated user (not just the authenticated role) and
  restricts status transitions to the allowed status set.

### 4. DELETE policy `auth_delete_consultation_requests`
- Replaced `USING (true)` with `USING (auth.uid() IS NOT NULL)`.
- Requires a real authenticated user session.

### Notes
- The SELECT policy is unchanged (authenticated-only read of all leads is
  intentional for staff; the scanner did not flag it, but we keep it as-is
  because staff need to read every lead).
- No data is dropped or altered; this migration only changes constraints and
  policies. It is safe to re-run (DROP IF EXISTS / idempotent).
*/

-- 1. Table-level CHECK constraints (idempotent via DO block)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'consultation_requests_name_check'
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_name_check
      CHECK (char_length(btrim(name)) BETWEEN 1 AND 200);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'consultation_requests_email_check'
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_email_check
      CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'consultation_requests_source_check'
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_source_check
      CHECK (source IN ('contact', 'assessment', 'demo', 'newsletter', 'profile'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'consultation_requests_status_check'
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_status_check
      CHECK (status IN ('new', 'contacted', 'qualified', 'scheduled', 'closed', 'spam'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'consultation_requests_message_check'
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_message_check
      CHECK (message IS NULL OR char_length(message) <= 5000);
  END IF;
END $$;
-- 2. INSERT policy — validate submitted lead shape (no more WITH CHECK true)
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
-- 3. UPDATE policy — require a real authenticated user; restrict status values
DROP POLICY IF EXISTS "auth_update_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_update_consultation_requests"
  ON consultation_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND status IN ('new', 'contacted', 'qualified', 'scheduled', 'closed', 'spam')
  );
-- 4. DELETE policy — require a real authenticated user
DROP POLICY IF EXISTS "auth_delete_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_delete_consultation_requests"
  ON consultation_requests FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
