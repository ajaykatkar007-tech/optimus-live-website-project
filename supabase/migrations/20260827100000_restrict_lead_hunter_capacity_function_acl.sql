-- Restrict Lead Hunter capacity functions to the service role only.
-- Function bodies, tables, capacity logic, and RLS policies are unchanged.

REVOKE EXECUTE ON FUNCTION public.claim_lead_hunter_capacity(integer)
FROM anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.finalize_lead_hunter_capacity(integer, integer)
FROM anon, authenticated;

GRANT EXECUTE ON FUNCTION public.claim_lead_hunter_capacity(integer)
TO service_role;

GRANT EXECUTE ON FUNCTION public.finalize_lead_hunter_capacity(integer, integer)
TO service_role;
