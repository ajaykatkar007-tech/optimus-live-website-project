import { supabase } from './supabase';

export type PlatformRole = 'ADMIN' | 'OPERATIONS' | 'CLIENT';
export type PracticeStatus = 'prospect' | 'onboarding' | 'active' | 'inactive' | 'suspended';
export type WorkItemModule = 'ar' | 'denial' | 'verification' | 'payment' | 'authorization' | 'billing' | 'credentialing' | 'enrollment';
export type WorkItemPriority = 'low' | 'normal' | 'high' | 'urgent';

export type PlatformPractice = {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  specialty: string | null;
  status: PracticeStatus;
  onboarding_date: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
};

export type PlatformWorkItem = {
  id: string;
  practice_id: string;
  module: WorkItemModule;
  reference_number: string;
  payer: string | null;
  status: string;
  priority: WorkItemPriority;
  assigned_to: string | null;
  follow_up_date: string | null;
  amount: number | null;
  service_date: string | null;
  description: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type ClientVisibleWorkItem = Omit<PlatformWorkItem, 'assigned_to' | 'metadata'>;

export async function getPlatformPractices() {
  if (!supabase) return { data: null, error: new Error('Supabase is not configured.') };
  return supabase.from('practices').select('*').order('name').returns<PlatformPractice[]>();
}

export async function getPlatformWorkItems(options?: { module?: WorkItemModule; practiceId?: string }) {
  if (!supabase) return { data: null, error: new Error('Supabase is not configured.') };
  let query = supabase.from('operations_work_items').select('*').order('created_at', { ascending: false });
  if (options?.module) query = query.eq('module', options.module);
  if (options?.practiceId) query = query.eq('practice_id', options.practiceId);
  return query.returns<PlatformWorkItem[]>();
}

export async function getClientVisibleWorkItems(practiceId?: string) {
  if (!supabase) return { data: null, error: new Error('Supabase is not configured.') };
  let query = supabase.from('client_operations_work_items').select('*').order('created_at', { ascending: false });
  if (practiceId) query = query.eq('practice_id', practiceId);
  return query.returns<ClientVisibleWorkItem[]>();
}
