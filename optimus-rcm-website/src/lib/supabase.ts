import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? '';

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export type ConsultationRequest = {
  name: string;
  practice_name?: string;
  email: string;
  phone?: string;
  specialty?: string;
  message?: string;
  source?: string;
};

export async function submitConsultationRequest(
  payload: ConsultationRequest
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
