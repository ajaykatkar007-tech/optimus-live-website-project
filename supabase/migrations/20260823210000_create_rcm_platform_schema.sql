/*
# Optimus RCM platform schema

Adds the normalized backend foundation for roles, practices, services, RCM work,
client support, documents, messaging, notifications, and audit activity.

This migration does not seed demo data. Demo records remain isolated in the
frontend demo data module until an explicitly authorized seed operation is run.
All platform tables use RLS. Client access is scoped through client_users;
internal notes and assignments are never exposed to client users.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'CLIENT' CHECK (role IN ('ADMIN', 'OPERATIONS', 'CLIENT')),
  practice_id uuid,
  display_name text,
  email text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS practices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  email text,
  phone text,
  specialty text,
  status text NOT NULL DEFAULT 'prospect' CHECK (status IN ('prospect', 'onboarding', 'active', 'inactive', 'suspended')),
  onboarding_date date,
  address text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS practice_id uuid;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_practice_id_fkey') THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_practice_id_fkey FOREIGN KEY (practice_id) REFERENCES practices(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS client_users (
  practice_id uuid NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (practice_id, user_id)
);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS client_services (
  practice_id uuid NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  started_at date,
  ended_at date,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (practice_id, service_id)
);

ALTER TABLE consultation_requests ADD COLUMN IF NOT EXISTS practice_id uuid;
ALTER TABLE consultation_requests ADD COLUMN IF NOT EXISTS qualified_at timestamptz;
ALTER TABLE consultation_requests ADD COLUMN IF NOT EXISTS converted_at timestamptz;
ALTER TABLE consultation_requests ADD COLUMN IF NOT EXISTS converted_by uuid REFERENCES profiles(id) ON DELETE SET NULL;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'consultation_requests_practice_id_fkey') THEN
    ALTER TABLE consultation_requests ADD CONSTRAINT consultation_requests_practice_id_fkey FOREIGN KEY (practice_id) REFERENCES practices(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS operations_work_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id uuid NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  module text NOT NULL CHECK (module IN ('ar', 'denial', 'verification', 'payment', 'authorization', 'billing', 'credentialing', 'enrollment')),
  reference_number text NOT NULL,
  payer text,
  status text NOT NULL DEFAULT 'pending',
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to uuid REFERENCES profiles(id) ON DELETE SET NULL,
  follow_up_date date,
  amount numeric(12,2),
  service_date date,
  description text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (practice_id, reference_number)
);

CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_item_id uuid NOT NULL REFERENCES operations_work_items(id) ON DELETE CASCADE,
  assignee_id uuid NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  assigned_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (work_item_id, assignee_id)
);

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  entity_type text NOT NULL CHECK (entity_type IN ('lead', 'practice', 'work_item', 'client_request')),
  entity_id uuid NOT NULL,
  body text NOT NULL CHECK (char_length(btrim(body)) BETWEEN 1 AND 10000),
  client_visible boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  action text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS follow_ups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id uuid REFERENCES practices(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES consultation_requests(id) ON DELETE CASCADE,
  work_item_id uuid REFERENCES operations_work_items(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES profiles(id) ON DELETE SET NULL,
  due_at timestamptz NOT NULL,
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'overdue')),
  title text NOT NULL,
  notes text,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (num_nonnulls(lead_id, work_item_id) <= 1)
);

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id uuid NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  category text NOT NULL,
  title text NOT NULL,
  storage_path text NOT NULL,
  uploaded_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  visibility text NOT NULL DEFAULT 'internal' CHECK (visibility IN ('internal', 'client')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS client_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id uuid NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  type text NOT NULL CHECK (type IN ('billing', 'ar', 'denial', 'verification', 'authorization', 'general')),
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_for_client', 'resolved', 'closed')),
  assigned_to uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id uuid NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  subject text NOT NULL,
  client_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  body text NOT NULL,
  client_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  entity_type text,
  entity_id uuid,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS profiles_practice_id_idx ON profiles(practice_id);
CREATE INDEX IF NOT EXISTS client_users_user_id_idx ON client_users(user_id);
CREATE INDEX IF NOT EXISTS operations_work_items_practice_module_idx ON operations_work_items(practice_id, module);
CREATE INDEX IF NOT EXISTS operations_work_items_assigned_status_idx ON operations_work_items(assigned_to, status);
CREATE INDEX IF NOT EXISTS operations_work_items_follow_up_idx ON operations_work_items(follow_up_date);
CREATE INDEX IF NOT EXISTS notes_entity_idx ON notes(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS activities_entity_created_idx ON activities(entity_type, entity_id, created_at DESC);
CREATE INDEX IF NOT EXISTS follow_ups_assigned_due_idx ON follow_ups(assigned_to, due_at);
CREATE INDEX IF NOT EXISTS client_requests_practice_status_idx ON client_requests(practice_id, status);
CREATE INDEX IF NOT EXISTS notifications_recipient_read_idx ON notifications(recipient_id, read_at);
CREATE INDEX IF NOT EXISTS consultation_requests_practice_idx ON consultation_requests(practice_id);

CREATE OR REPLACE FUNCTION public.current_profile_role()
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() AND active = true;
$$;

CREATE OR REPLACE FUNCTION public.current_client_practice_id()
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT practice_id FROM public.profiles WHERE id = auth.uid() AND role = 'CLIENT' AND active = true;
$$;

CREATE OR REPLACE FUNCTION public.is_internal_user()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(public.current_profile_role() IN ('ADMIN', 'OPERATIONS'), false);
$$;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE operations_work_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS profiles_self_read ON profiles;
CREATE POLICY profiles_self_read ON profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.current_profile_role() = 'ADMIN');
DROP POLICY IF EXISTS profiles_self_update ON profiles;
CREATE POLICY profiles_self_update ON profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS practices_internal_read ON practices;
CREATE POLICY practices_internal_read ON practices FOR SELECT TO authenticated USING (public.is_internal_user());
DROP POLICY IF EXISTS practices_client_read ON practices;
CREATE POLICY practices_client_read ON practices FOR SELECT TO authenticated USING (id = public.current_client_practice_id());
DROP POLICY IF EXISTS practices_admin_write ON practices;
CREATE POLICY practices_admin_write ON practices FOR ALL TO authenticated USING (public.current_profile_role() = 'ADMIN') WITH CHECK (public.current_profile_role() = 'ADMIN');

DROP POLICY IF EXISTS client_users_internal_read ON client_users;
CREATE POLICY client_users_internal_read ON client_users FOR SELECT TO authenticated USING (public.is_internal_user() OR user_id = auth.uid());
DROP POLICY IF EXISTS client_users_admin_write ON client_users;
CREATE POLICY client_users_admin_write ON client_users FOR ALL TO authenticated USING (public.current_profile_role() = 'ADMIN') WITH CHECK (public.current_profile_role() = 'ADMIN');

DROP POLICY IF EXISTS services_authenticated_read ON services;
CREATE POLICY services_authenticated_read ON services FOR SELECT TO authenticated USING (public.is_internal_user() OR EXISTS (SELECT 1 FROM client_services cs WHERE cs.service_id = services.id AND cs.practice_id = public.current_client_practice_id() AND cs.active));
DROP POLICY IF EXISTS services_admin_write ON services;
CREATE POLICY services_admin_write ON services FOR ALL TO authenticated USING (public.current_profile_role() = 'ADMIN') WITH CHECK (public.current_profile_role() = 'ADMIN');

DROP POLICY IF EXISTS client_services_scoped_read ON client_services;
CREATE POLICY client_services_scoped_read ON client_services FOR SELECT TO authenticated USING (public.is_internal_user() OR practice_id = public.current_client_practice_id());
DROP POLICY IF EXISTS client_services_admin_write ON client_services;
CREATE POLICY client_services_admin_write ON client_services FOR ALL TO authenticated USING (public.current_profile_role() = 'ADMIN') WITH CHECK (public.current_profile_role() = 'ADMIN');

DROP POLICY IF EXISTS operations_internal_read ON operations_work_items;
CREATE POLICY operations_internal_read ON operations_work_items FOR SELECT TO authenticated USING (public.current_profile_role() = 'ADMIN' OR (public.current_profile_role() = 'OPERATIONS' AND (assigned_to = auth.uid() OR EXISTS (SELECT 1 FROM assignments a WHERE a.work_item_id = operations_work_items.id AND a.assignee_id = auth.uid()))));
DROP POLICY IF EXISTS operations_client_read ON operations_work_items;
DROP POLICY IF EXISTS operations_internal_write ON operations_work_items;
CREATE POLICY operations_internal_write ON operations_work_items FOR INSERT TO authenticated WITH CHECK (public.is_internal_user());
DROP POLICY IF EXISTS operations_internal_update ON operations_work_items;
CREATE POLICY operations_internal_update ON operations_work_items FOR UPDATE TO authenticated USING (public.is_internal_user()) WITH CHECK (public.is_internal_user());

DROP POLICY IF EXISTS assignments_internal_read ON assignments;
CREATE POLICY assignments_internal_read ON assignments FOR SELECT TO authenticated USING (public.is_internal_user());
DROP POLICY IF EXISTS assignments_admin_write ON assignments;
CREATE POLICY assignments_admin_write ON assignments FOR ALL TO authenticated USING (public.current_profile_role() = 'ADMIN') WITH CHECK (public.current_profile_role() = 'ADMIN');

DROP POLICY IF EXISTS notes_internal_read ON notes;
CREATE POLICY notes_internal_read ON notes FOR SELECT TO authenticated USING (public.is_internal_user());
DROP POLICY IF EXISTS notes_client_visible_read ON notes;
CREATE POLICY notes_client_visible_read ON notes FOR SELECT TO authenticated USING (client_visible AND entity_type IN ('practice', 'work_item') AND EXISTS (SELECT 1 FROM operations_work_items w WHERE w.id = notes.entity_id AND w.practice_id = public.current_client_practice_id()));
DROP POLICY IF EXISTS notes_internal_write ON notes;
CREATE POLICY notes_internal_write ON notes FOR INSERT TO authenticated WITH CHECK (public.is_internal_user() AND author_id = auth.uid());

DROP POLICY IF EXISTS activities_internal_read ON activities;
CREATE POLICY activities_internal_read ON activities FOR SELECT TO authenticated USING (public.is_internal_user());

DROP POLICY IF EXISTS follow_ups_internal_read ON follow_ups;
CREATE POLICY follow_ups_internal_read ON follow_ups FOR SELECT TO authenticated USING (public.is_internal_user());
DROP POLICY IF EXISTS follow_ups_internal_write ON follow_ups;
CREATE POLICY follow_ups_internal_write ON follow_ups FOR ALL TO authenticated USING (public.is_internal_user()) WITH CHECK (public.is_internal_user());

DROP POLICY IF EXISTS documents_internal_read ON documents;
CREATE POLICY documents_internal_read ON documents FOR SELECT TO authenticated USING (public.is_internal_user());
DROP POLICY IF EXISTS documents_client_read ON documents;
CREATE POLICY documents_client_read ON documents FOR SELECT TO authenticated USING (visibility = 'client' AND practice_id = public.current_client_practice_id());
DROP POLICY IF EXISTS documents_internal_write ON documents;
CREATE POLICY documents_internal_write ON documents FOR INSERT TO authenticated WITH CHECK (public.is_internal_user());

DROP POLICY IF EXISTS client_requests_scoped_read ON client_requests;
CREATE POLICY client_requests_scoped_read ON client_requests FOR SELECT TO authenticated USING (public.is_internal_user() OR practice_id = public.current_client_practice_id());
DROP POLICY IF EXISTS client_requests_client_insert ON client_requests;
CREATE POLICY client_requests_client_insert ON client_requests FOR INSERT TO authenticated WITH CHECK (practice_id = public.current_client_practice_id() AND created_by = auth.uid());
DROP POLICY IF EXISTS client_requests_internal_update ON client_requests;
CREATE POLICY client_requests_internal_update ON client_requests FOR UPDATE TO authenticated USING (public.is_internal_user()) WITH CHECK (public.is_internal_user());

DROP POLICY IF EXISTS conversations_scoped_read ON conversations;
CREATE POLICY conversations_scoped_read ON conversations FOR SELECT TO authenticated USING (public.is_internal_user() OR (client_visible AND practice_id = public.current_client_practice_id()));
DROP POLICY IF EXISTS conversations_internal_write ON conversations;
CREATE POLICY conversations_internal_write ON conversations FOR INSERT TO authenticated WITH CHECK (public.is_internal_user());

DROP POLICY IF EXISTS messages_scoped_read ON messages;
CREATE POLICY messages_scoped_read ON messages FOR SELECT TO authenticated USING (public.is_internal_user() OR (client_visible AND EXISTS (SELECT 1 FROM conversations c WHERE c.id = messages.conversation_id AND c.client_visible AND c.practice_id = public.current_client_practice_id())));
DROP POLICY IF EXISTS messages_authenticated_insert ON messages;
CREATE POLICY messages_authenticated_insert ON messages FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid() AND (public.is_internal_user() OR client_visible));

DROP POLICY IF EXISTS notifications_recipient_read ON notifications;
CREATE POLICY notifications_recipient_read ON notifications FOR SELECT TO authenticated USING (recipient_id = auth.uid());
DROP POLICY IF EXISTS notifications_recipient_update ON notifications;
CREATE POLICY notifications_recipient_update ON notifications FOR UPDATE TO authenticated USING (recipient_id = auth.uid()) WITH CHECK (recipient_id = auth.uid());

-- Consultation leads retain their existing public INSERT policy. Internal users
-- can read/manage all leads; clients can only read leads linked to their practice.
DROP POLICY IF EXISTS consultation_requests_internal_read ON consultation_requests;
CREATE POLICY consultation_requests_internal_read ON consultation_requests FOR SELECT TO authenticated USING (public.is_internal_user());
DROP POLICY IF EXISTS consultation_requests_client_read ON consultation_requests;
CREATE POLICY consultation_requests_client_read ON consultation_requests FOR SELECT TO authenticated USING (practice_id = public.current_client_practice_id());
DROP POLICY IF EXISTS consultation_requests_internal_update ON consultation_requests;
CREATE POLICY consultation_requests_internal_update ON consultation_requests FOR UPDATE TO authenticated USING (public.is_internal_user()) WITH CHECK (public.is_internal_user());

-- Remove the historical broad authenticated policies before applying the role
-- scoped policies above. This is required for CLIENT isolation.
DROP POLICY IF EXISTS auth_select_consultation_requests ON consultation_requests;
DROP POLICY IF EXISTS auth_update_consultation_requests ON consultation_requests;
DROP POLICY IF EXISTS auth_delete_consultation_requests ON consultation_requests;
DROP POLICY IF EXISTS consultation_requests_internal_delete ON consultation_requests;
CREATE POLICY consultation_requests_internal_delete ON consultation_requests FOR DELETE TO authenticated USING (public.is_internal_user());

-- Clients read only this projection; internal assignments and metadata remain
-- unavailable through the client-facing relation.
CREATE OR REPLACE VIEW public.client_operations_work_items AS
SELECT id, practice_id, module, reference_number, payer, status, priority,
       follow_up_date, amount, service_date, description, created_at, updated_at
FROM public.operations_work_items
WHERE practice_id = public.current_client_practice_id();
GRANT SELECT ON public.client_operations_work_items TO authenticated;

-- Keep updated_at maintenance database-side without requiring frontend code.
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON profiles;
CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS practices_set_updated_at ON practices;
CREATE TRIGGER practices_set_updated_at BEFORE UPDATE ON practices FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS work_items_set_updated_at ON operations_work_items;
CREATE TRIGGER work_items_set_updated_at BEFORE UPDATE ON operations_work_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS notes_set_updated_at ON notes;
CREATE TRIGGER notes_set_updated_at BEFORE UPDATE ON notes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS client_requests_set_updated_at ON client_requests;
CREATE TRIGGER client_requests_set_updated_at BEFORE UPDATE ON client_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
