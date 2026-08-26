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
};

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
