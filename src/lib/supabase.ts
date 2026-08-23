import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? '';

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export type ConsultationRequestPayload = {
  name: string;
  practice_name?: string;
  email: string;
  phone?: string;
  specialty?: string;
  message?: string;
  source?: string;
};

export type ConsultationRequest = ConsultationRequestPayload & {
  id: string;
  status: ConsultationRequestStatus;
  created_at: string;
};

export type ConsultationRequestStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'scheduled'
  | 'closed'
  | 'spam';

export async function submitConsultationRequest(
  payload: ConsultationRequestPayload
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return {
      success: false,
      error: 'The contact form is not configured yet. Please contact the site owner.',
    };
  }

  const { error } = await supabase.from('consultation_requests').insert(payload);
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function signInAdmin(email: string, password: string) {
  if (!supabase) {
    return { error: new Error('Supabase authentication is not configured yet.') };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { error };
}

export async function signOutAdmin() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getConsultationRequests() {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  return supabase
    .from('consultation_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<ConsultationRequest[]>();
}

export async function updateConsultationRequestStatus(
  id: string,
  status: ConsultationRequestStatus
) {
  if (!supabase) {
    return { error: new Error('Supabase is not configured.') };
  }

  const { error } = await supabase
    .from('consultation_requests')
    .update({ status })
    .eq('id', id);

  return { error };
}
