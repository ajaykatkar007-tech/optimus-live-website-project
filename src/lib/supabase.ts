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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

export async function submitConsultationRequest(
  payload: ConsultationRequest
): Promise<{ success: boolean; error?: string }> {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message?.trim() ?? '';

  if (!name || name.length > MAX_NAME_LENGTH) {
    return { success: false, error: 'Please enter a valid name.' };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { success: false, error: 'Please keep your message under 5,000 characters.' };
  }

  if (!supabase) {
    return {
      success: false,
      error: 'The contact form is not configured yet. Please contact the site owner.',
    };
  }

  const { error } = await supabase.from('consultation_requests').insert({
    ...payload,
    name,
    email,
    message: message || null,
  });

  if (error) {
    console.error('Consultation request submission failed:', error);
    return {
      success: false,
      error: 'We could not submit your request right now. Please try again.',
    };
  }

  return { success: true };
}
