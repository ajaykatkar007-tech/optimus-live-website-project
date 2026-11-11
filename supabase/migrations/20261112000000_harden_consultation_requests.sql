/*
  Harden the public consultation lead endpoint.

  Apply this migration once in the connected Supabase project. It is safe to
  run after either the original or the stricter create-table migration.
*/

ALTER TABLE consultation_requests
  ALTER COLUMN source SET DEFAULT 'contact';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'consultation_requests_name_check'
      AND conrelid = 'consultation_requests'::regclass
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_name_check
      CHECK (char_length(btrim(name)) BETWEEN 1 AND 200);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'consultation_requests_email_check'
      AND conrelid = 'consultation_requests'::regclass
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_email_check
      CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'consultation_requests_source_check'
      AND conrelid = 'consultation_requests'::regclass
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_source_check
      CHECK (source IN ('contact', 'assessment', 'demo', 'newsletter', 'profile'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'consultation_requests_status_check'
      AND conrelid = 'consultation_requests'::regclass
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_status_check
      CHECK (status IN ('new', 'contacted', 'qualified', 'scheduled', 'closed', 'spam'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'consultation_requests_message_check'
      AND conrelid = 'consultation_requests'::regclass
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_message_check
      CHECK (message IS NULL OR char_length(message) <= 5000);
  END IF;
END $$;

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

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

DROP POLICY IF EXISTS "auth_select_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_select_consultation_requests"
  ON consultation_requests FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "auth_update_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_update_consultation_requests"
  ON consultation_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND status IN ('new', 'contacted', 'qualified', 'scheduled', 'closed', 'spam')
  );

DROP POLICY IF EXISTS "auth_delete_consultation_requests" ON consultation_requests;
CREATE POLICY "auth_delete_consultation_requests"
  ON consultation_requests FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
