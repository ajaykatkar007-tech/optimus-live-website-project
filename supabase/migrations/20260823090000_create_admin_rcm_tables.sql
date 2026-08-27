-- Optimus RCM Admin Dashboard v1 data foundation.
-- Operational RCM data only; patient_reference must not contain direct PHI.

CREATE TABLE IF NOT EXISTS public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_name text NOT NULL CHECK (char_length(btrim(practice_name)) BETWEEN 1 AND 200),
  provider_name text NOT NULL CHECK (char_length(btrim(provider_name)) BETWEEN 1 AND 200),
  specialty text NOT NULL CHECK (char_length(btrim(specialty)) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text,
  address text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.payers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE CHECK (char_length(btrim(name)) BETWEEN 1 AND 200),
  payer_type text NOT NULL CHECK (payer_type IN ('commercial', 'medicare', 'medicaid', 'self_pay', 'other')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE RESTRICT,
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 200),
  email text NOT NULL CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  role text NOT NULL DEFAULT 'AR Specialist' CHECK (role IN ('Admin', 'Manager', 'AR Specialist', 'Denial Specialist', 'Payment Poster')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  last_active timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_number text NOT NULL UNIQUE CHECK (char_length(btrim(claim_number)) BETWEEN 1 AND 80),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE RESTRICT,
  payer_id uuid NOT NULL REFERENCES public.payers(id) ON DELETE RESTRICT,
  patient_reference text NOT NULL CHECK (char_length(btrim(patient_reference)) BETWEEN 1 AND 120),
  date_of_service date NOT NULL,
  cpt_code text NOT NULL CHECK (char_length(btrim(cpt_code)) BETWEEN 1 AND 20),
  billed_amount numeric(12,2) NOT NULL DEFAULT 0 CHECK (billed_amount >= 0),
  paid_amount numeric(12,2) NOT NULL DEFAULT 0 CHECK (paid_amount >= 0),
  balance_amount numeric(12,2) NOT NULL DEFAULT 0 CHECK (balance_amount >= 0),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'accepted', 'pending', 'paid', 'denied', 'appealed', 'closed')),
  aging_days integer NOT NULL DEFAULT 0 CHECK (aging_days >= 0),
  follow_up_date date,
  assigned_to uuid REFERENCES public.team_members(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.denials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid NOT NULL REFERENCES public.claims(id) ON DELETE RESTRICT,
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE RESTRICT,
  payer_id uuid NOT NULL REFERENCES public.payers(id) ON DELETE RESTRICT,
  denial_code text NOT NULL CHECK (char_length(btrim(denial_code)) BETWEEN 1 AND 40),
  denial_reason text NOT NULL CHECK (char_length(btrim(denial_reason)) BETWEEN 1 AND 500),
  amount numeric(12,2) NOT NULL DEFAULT 0 CHECK (amount >= 0),
  root_cause text,
  assigned_to uuid REFERENCES public.team_members(id) ON DELETE SET NULL,
  follow_up_date date,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'assigned', 'in_progress', 'submitted_for_appeal', 'awaiting_payer', 'resolved', 'written_off')),
  action_taken text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_number text NOT NULL UNIQUE CHECK (char_length(btrim(payment_number)) BETWEEN 1 AND 80),
  claim_id uuid NOT NULL REFERENCES public.claims(id) ON DELETE RESTRICT,
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE RESTRICT,
  payer_id uuid NOT NULL REFERENCES public.payers(id) ON DELETE RESTRICT,
  payment_date date NOT NULL,
  era_eob_reference text,
  paid_amount numeric(12,2) NOT NULL DEFAULT 0 CHECK (paid_amount >= 0),
  adjustment_amount numeric(12,2) NOT NULL DEFAULT 0 CHECK (adjustment_amount >= 0),
  patient_responsibility numeric(12,2) NOT NULL DEFAULT 0 CHECK (patient_responsibility >= 0),
  remaining_balance numeric(12,2) NOT NULL DEFAULT 0 CHECK (remaining_balance >= 0),
  status text NOT NULL DEFAULT 'posted' CHECK (status IN ('posted', 'pending', 'reversed')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS claims_client_id_idx ON public.claims(client_id);
CREATE INDEX IF NOT EXISTS claims_payer_id_idx ON public.claims(payer_id);
CREATE INDEX IF NOT EXISTS claims_status_idx ON public.claims(status);
CREATE INDEX IF NOT EXISTS claims_date_of_service_idx ON public.claims(date_of_service DESC);
CREATE INDEX IF NOT EXISTS denials_claim_id_idx ON public.denials(claim_id);
CREATE INDEX IF NOT EXISTS denials_client_id_idx ON public.denials(client_id);
CREATE INDEX IF NOT EXISTS denials_payer_id_idx ON public.denials(payer_id);
CREATE INDEX IF NOT EXISTS denials_status_idx ON public.denials(status);
CREATE INDEX IF NOT EXISTS payments_claim_id_idx ON public.payments(claim_id);
CREATE INDEX IF NOT EXISTS payments_client_id_idx ON public.payments(client_id);
CREATE INDEX IF NOT EXISTS payments_payer_id_idx ON public.payments(payer_id);
CREATE INDEX IF NOT EXISTS payments_payment_date_idx ON public.payments(payment_date DESC);
CREATE INDEX IF NOT EXISTS claims_follow_up_date_idx ON public.claims(follow_up_date);
CREATE INDEX IF NOT EXISTS denials_follow_up_date_idx ON public.denials(follow_up_date);
CREATE OR REPLACE FUNCTION public.set_admin_rcm_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS clients_set_updated_at ON public.clients;
CREATE TRIGGER clients_set_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.set_admin_rcm_updated_at();
DROP TRIGGER IF EXISTS payers_set_updated_at ON public.payers;
CREATE TRIGGER payers_set_updated_at BEFORE UPDATE ON public.payers FOR EACH ROW EXECUTE FUNCTION public.set_admin_rcm_updated_at();
DROP TRIGGER IF EXISTS team_members_set_updated_at ON public.team_members;
CREATE TRIGGER team_members_set_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.set_admin_rcm_updated_at();
DROP TRIGGER IF EXISTS claims_set_updated_at ON public.claims;
CREATE TRIGGER claims_set_updated_at BEFORE UPDATE ON public.claims FOR EACH ROW EXECUTE FUNCTION public.set_admin_rcm_updated_at();
DROP TRIGGER IF EXISTS denials_set_updated_at ON public.denials;
CREATE TRIGGER denials_set_updated_at BEFORE UPDATE ON public.denials FOR EACH ROW EXECUTE FUNCTION public.set_admin_rcm_updated_at();
DROP TRIGGER IF EXISTS payments_set_updated_at ON public.payments;
CREATE TRIGGER payments_set_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.set_admin_rcm_updated_at();
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.denials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
-- Authenticated-only foundation. Role predicates can be tightened later through team_members
-- or a security-definer membership function without introducing anonymous access.
DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY['clients', 'payers', 'team_members', 'claims', 'denials', 'payments'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'authenticated_manage_' || table_name, table_name);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL)', 'authenticated_manage_' || table_name, table_name);
  END LOOP;
END $$;
