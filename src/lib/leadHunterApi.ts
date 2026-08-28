import { supabase } from './supabase';

export type LeadHunterFilters = {
  specialty: string;
  state: string;
  city: string;
  practiceSize: string;
  quality: string;
};

export type GooglePlaceLead = {
  id: string;
  name: string;
  specialty: string;
  city: string;
  state: string;
  address: string;
  score: number;
  website?: string;
  phone?: string;
  mapsUrl?: string;
  rating?: number;
  reviewCount?: number;
  businessStatus?: string;
  types?: string[];
  providers?: number;
  locations?: number;
  reason: string;
  status?: LeadHunterStatus;
};

export type LeadHunterStatus = 'NEW' | 'SAVED' | 'CONTACTED' | 'NOT_A_FIT';

export async function searchLeadHunter(filters: LeadHunterFilters) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase.functions.invoke('lead-hunter-search', {
    body: filters,
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);

  return data as {
    leads: GooglePlaceLead[];
    usage: { dailyLimit: number; used: number; remaining: number };
  };
}

export async function updateLeadHunterStatus(placeId: string, status: LeadHunterStatus) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase
    .from('lead_hunter_leads')
    .update({ status })
    .eq('place_id', placeId)
    .select('place_id')
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('The lead status could not be updated.');
}
