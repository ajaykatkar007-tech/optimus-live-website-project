# Supabase seed strategy

No seed SQL runs automatically. The frontend demo workspace in `src/lib/demoData.ts` is the safe client-demo dataset and never writes to Supabase.

For a configured non-production Supabase project, create an authenticated ADMIN user first, apply the migrations, then insert fictional practices/services/work items through a separately reviewed seed script. Do not reuse demo records in production and do not create profile rows with guessed `auth.users` IDs.

The first production setup sequence is:

1. Apply the migrations in `supabase/migrations/`.
2. Create an authorized Supabase Auth user.
3. Insert its `profiles` row with role `ADMIN`.
4. Create practices and client users through an authenticated administrative workflow.
5. Add services and client services.
6. Add operations work items only with fictional or authorized business data.

The schema intentionally has no automatic Auth trigger because role assignment must be explicit and must not grant privileges by default.
