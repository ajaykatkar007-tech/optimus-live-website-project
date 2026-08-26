import { withSupabase } from 'npm:@supabase/server@0.10.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type Filters = {
  specialty?: string;
  state?: string;
  city?: string;
  practiceSize?: string;
  quality?: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function scorePlace(place: any, specialty: string) {
  let score = 35;
  const reasons: string[] = [];
  if (place.websiteUri) { score += 15; reasons.push('website available'); }
  if (place.nationalPhoneNumber) { score += 15; reasons.push('direct phone available'); }
  if (place.businessStatus === 'OPERATIONAL') { score += 10; reasons.push('currently operational'); }
  if ((place.userRatingCount ?? 0) >= 25) { score += 10; reasons.push('established review footprint'); }
  else if ((place.userRatingCount ?? 0) >= 10) { score += 5; reasons.push('active review footprint'); }

  const typeText = [...(place.types ?? []), place.primaryType ?? ''].join(' ').toLowerCase();
  const specialtyText = specialty.toLowerCase();
  if (
    (specialtyText.includes('dental') && (typeText.includes('dentist') || typeText.includes('dental'))) ||
    (specialtyText.includes('mri') && typeText.includes('medical')) ||
    (specialtyText.includes('radiology') && typeText.includes('medical'))
  ) {
    score += 10;
    reasons.push('specialty fit');
  }

  return {
    score: Math.min(100, score),
    reason: reasons.length ? `${reasons.slice(0, 4).join(' · ')}.` : 'Potential RCM prospect based on location and specialty match.',
  };
}

function parseState(address = '') {
  const match = address.match(/,\s*([A-Z]{2})(?:\s+\d{5})?(?:,\s*USA)?$/i);
  return match?.[1] ?? '';
}

function parseCity(address = '') {
  const parts = address.split(',').map((part: string) => part.trim()).filter(Boolean);
  return parts.length >= 3 ? parts[parts.length - 3] : parts[0] ?? '';
}

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

    const { data: profile, error: profileError } = await ctx.supabase
      .from('profiles')
      .select('role')
      .eq('id', ctx.userClaims?.sub)
      .maybeSingle();

    if (profileError || profile?.role !== 'ADMIN') return json({ error: 'Admin access required.' }, 403);

    const filters = (await req.json()) as Filters;
    const specialty = filters.specialty?.trim() || 'Primary Care';
    const state = filters.state?.trim() || '';
    const city = filters.city?.trim() || '';
    const requested = 20;

    const { data: capacity, error: capacityError } = await ctx.supabaseAdmin
      .rpc('claim_lead_hunter_capacity', { requested });

    if (capacityError) {
      return json({ error: 'Lead Hunter database protection is not ready. Apply the Lead Hunter migration before enabling live searches.' }, 503);
    }

    const reserved = Number(capacity ?? 0);
    if (reserved <= 0) return json({ error: 'Daily lead limit reached. New searches resume tomorrow.', usage: { dailyLimit: 20, used: 20, remaining: 0 } }, 429);

    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!apiKey) {
      await ctx.supabaseAdmin.rpc('finalize_lead_hunter_capacity', { reserved, actual: 0 });
      return json({ error: 'Google Places is not configured on the server yet.' }, 503);
    }

    const query = `${specialty} ${city} ${state} USA`.trim();
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': [
          'places.id', 'places.displayName', 'places.formattedAddress', 'places.googleMapsUri',
          'places.websiteUri', 'places.nationalPhoneNumber', 'places.businessStatus',
          'places.primaryType', 'places.types', 'places.rating', 'places.userRatingCount',
        ].join(','),
      },
      body: JSON.stringify({ textQuery: query, pageSize: Math.min(20, reserved), regionCode: 'US' }),
    });

    if (!response.ok) {
      await ctx.supabaseAdmin.rpc('finalize_lead_hunter_capacity', { reserved, actual: 0 });
      const message = await response.text();
      return json({ error: `Google Places request failed: ${message.slice(0, 240)}` }, 502);
    }

    const payload = await response.json();
    const places = Array.isArray(payload.places) ? payload.places : [];
    const leads = places.map((place: any) => {
      const scored = scorePlace(place, specialty);
      const address = place.formattedAddress ?? '';
      return {
        id: place.id,
        name: place.displayName?.text ?? 'Unnamed practice',
        specialty: place.primaryType ?? specialty,
        city: city || parseCity(address),
        state: state || parseState(address),
        address,
        score: scored.score,
        website: place.websiteUri,
        phone: place.nationalPhoneNumber,
        mapsUrl: place.googleMapsUri,
        rating: place.rating,
        reviewCount: place.userRatingCount,
        businessStatus: place.businessStatus,
        types: place.types ?? [],
        reason: scored.reason,
      };
    });

    const uniqueLeads = Array.from(new Map(leads.map((lead: any) => [lead.id, lead])).values())
      .filter((lead: any) => lead.score >= (filters.quality === 'High Priority' ? 70 : 0))
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, reserved);

    await ctx.supabaseAdmin.rpc('finalize_lead_hunter_capacity', { reserved, actual: uniqueLeads.length });

    if (uniqueLeads.length) {
      const rows = uniqueLeads.map((lead: any) => ({
        place_id: lead.id, name: lead.name, specialty: lead.specialty, city: lead.city, state: lead.state,
        address: lead.address, website: lead.website, phone: lead.phone, maps_url: lead.mapsUrl,
        rating: lead.rating, review_count: lead.reviewCount, business_status: lead.businessStatus,
        types: lead.types, score: lead.score, reason: lead.reason, created_by: ctx.userClaims?.sub,
      }));
      await ctx.supabaseAdmin.from('lead_hunter_leads').upsert(rows, { onConflict: 'place_id', ignoreDuplicates: false });
    }

    const { data: usage } = await ctx.supabaseAdmin
      .from('lead_hunter_daily_usage')
      .select('used_leads')
      .eq('usage_date', new Date().toISOString().slice(0, 10))
      .maybeSingle();

    return json({
      leads: uniqueLeads,
      usage: { dailyLimit: 20, used: usage?.used_leads ?? uniqueLeads.length, remaining: Math.max(0, 20 - (usage?.used_leads ?? uniqueLeads.length)) },
    });
  }),
};
