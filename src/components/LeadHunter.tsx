import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Bell,
  Bookmark,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  Crosshair,
  ExternalLink,
  Filter,
  Globe2,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const specialties = [
  'Dental / General Dentistry',
  'Family Medicine',
  'Primary Care',
  'Mental / Behavioral Health',
  'Diagnostic Imaging',
  'MRI Centers',
  'Radiology Groups',
  'Chiropractic',
  'Physical Therapy',
  'Pain Management',
  'Internal Medicine',
  'Pediatrics',
];

const states = ['Florida', 'Texas', 'California', 'Arizona', 'Georgia', 'New York', 'North Carolina'];
const cities: Record<string, string[]> = {
  Florida: ['Orlando', 'Tampa', 'Miami', 'Jacksonville'],
  Texas: ['Houston', 'Dallas', 'Austin', 'San Antonio'],
  California: ['Los Angeles', 'San Diego', 'Irvine', 'Sacramento'],
  Arizona: ['Phoenix', 'Scottsdale', 'Tucson'],
  Georgia: ['Atlanta', 'Alpharetta', 'Savannah'],
  'New York': ['New York City', 'Buffalo', 'Rochester'],
  'North Carolina': ['Charlotte', 'Raleigh', 'Durham'],
};

const demoLeads = [
  { name: 'Orlando Dental Care', specialty: 'General Dentistry', city: 'Orlando', state: 'FL', score: 92, providers: 6, locations: 2, reason: 'Independent practice with multiple providers, strong insurance mix and high RCM improvement potential.', phone: '(407) 555-0198', website: 'Website' },
  { name: 'Smiles of Orlando', specialty: 'General Dentistry', city: 'Orlando', state: 'FL', score: 89, providers: 4, locations: 1, reason: 'Strong online presence, active patient base and opportunity for RCM optimization.', phone: '(407) 555-0132', website: 'Website' },
  { name: 'Lake Nona Dental Group', specialty: 'General Dentistry', city: 'Orlando', state: 'FL', score: 86, providers: 7, locations: 3, reason: 'Multi-location growth-stage practice with strong collections potential.', phone: '(407) 555-0177', website: 'Website' },
];

function ScoreRing({ score }: { score: number }) {
  return <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-[6px] border-brand-500/30 bg-slate-950 text-center shadow-[0_0_28px_rgba(37,99,235,0.15)]"><div><p className="text-2xl font-bold text-white">{score}</p><p className="text-[10px] text-slate-400">/100</p></div></div>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="block"><span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</span><div className="relative"><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 pr-9 text-sm text-slate-100 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"><option>{value}</option>{options.filter((option) => option !== value).map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /></div></label>;
}

function SideNav({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const links = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/overview' },
    { label: 'Lead Hunter', icon: Crosshair, href: '/admin/lead-hunter', active: true },
    { label: 'Leads', icon: Target, href: '/admin' },
    { label: 'Clients', icon: Building2, href: '/admin/clients' },
    { label: 'RCM Operations', icon: Activity, href: '/admin/operations' },
    { label: 'Reports', icon: CircleDollarSign, href: '/admin/reports' },
    { label: 'Services', icon: SlidersHorizontal, href: '/admin/services' },
    { label: 'Tasks / Follow-ups', icon: Check, href: '/admin/tasks' },
    { label: 'Activity', icon: Activity, href: '/admin/activity' },
    { label: 'Notifications', icon: Bell, href: '/admin/notifications' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];
  return <aside className={`${mobile ? 'fixed inset-0 z-50 w-72' : 'fixed inset-y-0 left-0 hidden w-64 lg:block'} border-r border-slate-800/80 bg-[#060b16] text-white`}><div className="flex h-20 items-center justify-between border-b border-slate-800/80 px-5"><div><p className="text-lg font-black tracking-[0.2em] text-white">OPTIMUS</p><p className="text-[9px] font-semibold tracking-[0.22em] text-brand-400">RCM SOLUTIONS</p></div>{mobile && <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"><X className="h-5 w-5" /></button>}</div><div className="px-5 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Internal workspace</div><nav className="space-y-1 px-3">{links.map(({ label, icon: Icon, href, active }) => <a key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}><Icon className="h-4 w-4" />{label}</a>)}</nav><div className="absolute bottom-5 left-4 right-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-400">Optimus RCM</p><p className="mt-2 text-xs leading-5 text-slate-500">Sales Command Center · Internal use only</p></div></aside>;
}

export default function LeadHunter() {
  const [checking, setChecking] = useState(Boolean(supabase));
  const [mobileNav, setMobileNav] = useState(false);
  const [specialty, setSpecialty] = useState(specialties[0]);
  const [state, setState] = useState('Florida');
  const [city, setCity] = useState('Orlando');
  const [practiceSize, setPracticeSize] = useState('1 - 10 Providers');
  const [quality, setQuality] = useState('High Priority');
  const [independent, setIndependent] = useState(true);
  const [excludeExisting, setExcludeExisting] = useState(true);
  const [excludeContacted, setExcludeContacted] = useState(true);
  const [found, setFound] = useState(12);
  const remaining = Math.max(0, 20 - found);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) window.location.replace('/admin/login');
      else setChecking(false);
    });
  }, []);

  const selectedCities = useMemo(() => cities[state] ?? [], [state]);
  useEffect(() => { if (!selectedCities.includes(city)) setCity(selectedCities[0] ?? ''); }, [selectedCities, city]);

  if (checking) return <div className="grid min-h-screen place-items-center bg-[#030712] text-white">Checking secure session...</div>;

  const handleSearch = () => setFound(Math.min(20, Math.max(found, demoLeads.length)));

  return <div className="min-h-screen bg-[#030712] text-slate-100"><SideNav mobile={mobileNav} onClose={() => setMobileNav(false)} /><div className="lg:pl-64"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800/80 bg-[#030712]/90 px-4 backdrop-blur-xl lg:px-8"><button className="rounded-lg p-2 text-slate-400 lg:hidden" onClick={() => setMobileNav(true)}><Menu className="h-5 w-5" /></button><div className="hidden lg:block"><p className="text-xs font-medium text-slate-500">Internal workspace</p></div><div className="ml-auto flex items-center gap-2"><div className="hidden items-center gap-2 rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-3 py-2 text-xs font-semibold text-emerald-300 sm:flex"><ShieldCheck className="h-4 w-4" /> API GUARD ACTIVE <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /></div><button className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:bg-slate-900"><Bell className="h-4 w-4" /></button><div className="hidden items-center gap-2 rounded-xl border border-slate-800 px-3 py-2 sm:flex"><span className="grid h-7 w-7 place-items-center rounded-full border border-amber-500/70 text-[10px] font-bold">AK</span><div><p className="text-xs font-semibold">Ajay Katkar</p><p className="text-[10px] text-slate-500">Administrator</p></div><ChevronDown className="h-3.5 w-3.5 text-slate-500" /></div><a href="/admin/login" className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:bg-slate-900" aria-label="Exit"><LogOut className="h-4 w-4" /></a></div></header><main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8"><div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-end"><div><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-300"><Sparkles className="h-3.5 w-3.5" /> Sales Command Center</div><h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Lead Hunter</h1><p className="mt-2 max-w-2xl text-sm text-slate-400">Find high-quality RCM prospects across the United States.</p></div></div>

<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5"><div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-400"><Crosshair className="h-5 w-5" /></div><div><p className="text-2xl font-bold">20</p><p className="text-xs text-slate-500">Daily Capacity</p></div></div><p className="mt-3 text-[11px] text-slate-500">Max leads per day</p></div><div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400"><Users className="h-5 w-5" /></div><div><p className="text-2xl font-bold">{found}</p><p className="text-xs text-slate-500">Qualified Found</p></div></div><p className="mt-3 text-[11px] text-slate-500">Today</p></div><div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/10 text-amber-400"><Target className="h-5 w-5" /></div><div><p className="text-2xl font-bold">{remaining}</p><p className="text-xs text-slate-500">Remaining</p></div></div><p className="mt-3 text-[11px] text-slate-500">Leads left today</p></div><div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-500/10 text-purple-400"><Sparkles className="h-5 w-5" /></div><div><p className="text-2xl font-bold">92</p><p className="text-xs text-slate-500">Avg. Lead Score</p></div></div><p className="mt-3 text-[11px] text-slate-500">Today</p></div><div className="rounded-2xl border border-emerald-900/60 bg-emerald-950/20 p-5"><div className="flex items-start gap-3"><ShieldCheck className="h-8 w-8 shrink-0 text-emerald-400" /><div className="flex-1"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wide">API Protection</p><span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[9px] font-bold text-emerald-300">PROTECTED</span></div><div className="mt-3 space-y-1.5 text-[11px] text-slate-400"><p><Check className="mr-1 inline h-3 w-3 text-emerald-400" />Duplicate protection <b className="float-right text-emerald-300">ON</b></p><p><Check className="mr-1 inline h-3 w-3 text-emerald-400" />Existing leads excluded <b className="float-right text-emerald-300">ON</b></p><p><Check className="mr-1 inline h-3 w-3 text-emerald-400" />Budget protection <b className="float-right text-emerald-300">ON</b></p></div></div></div></div></div>

<div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_290px]"><div className="space-y-5"><section className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5 shadow-2xl shadow-black/20"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-sm font-bold uppercase tracking-[0.12em] text-brand-300">Find quality prospects</h2><p className="mt-1 text-xs text-slate-500">UI prototype · Google Places connection comes next</p></div><Filter className="h-5 w-5 text-slate-600" /></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"><SelectField label="Country" value="🇺🇸 USA" onChange={() => undefined} options={['🇺🇸 USA']} /><SelectField label="Specialty" value={specialty} onChange={setSpecialty} options={specialties} /><SelectField label="State" value={state} onChange={setState} options={states} /><SelectField label="City" value={city} onChange={setCity} options={selectedCities} /><SelectField label="Practice Size" value={practiceSize} onChange={setPracticeSize} options={['1 - 5 Providers', '1 - 10 Providers', '11 - 25 Providers', '26+ Providers']} /></div><div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-4 text-xs text-slate-400"><label className="inline-flex cursor-pointer items-center gap-2"><input type="checkbox" checked={independent} onChange={(e) => setIndependent(e.target.checked)} className="h-4 w-4 accent-blue-600" />Independent practices</label><label className="inline-flex cursor-pointer items-center gap-2"><input type="checkbox" checked={excludeExisting} onChange={(e) => setExcludeExisting(e.target.checked)} className="h-4 w-4 accent-blue-600" />Exclude existing leads</label><label className="inline-flex cursor-pointer items-center gap-2"><input type="checkbox" checked={excludeContacted} onChange={(e) => setExcludeContacted(e.target.checked)} className="h-4 w-4 accent-blue-600" />Exclude contacted</label></div><button onClick={handleSearch} disabled={remaining === 0} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-900/30 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"><Search className="h-4 w-4" />Find Quality Prospects</button></div></section>

<section className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5"><div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-3"><h2 className="text-sm font-bold uppercase tracking-[0.12em] text-brand-300">Qualified prospects</h2><span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-slate-400">{found} Found</span></div></div><div className="flex items-center gap-2"><button className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white">High Priority</button><button className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400">Review</button><button className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400">All</button></div></div><div className="space-y-3">{demoLeads.map((lead) => <article key={lead.name} className="rounded-2xl border border-slate-800 bg-[#060b16] p-4 transition hover:border-brand-700/70 hover:shadow-xl hover:shadow-brand-950/20"><div className="flex flex-col gap-4 lg:flex-row lg:items-center"><div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl border border-emerald-900/70 bg-emerald-950/20"><p className="text-3xl font-black text-emerald-400">{lead.score}</p><p className="text-[10px] text-slate-500">/100</p><span className="mt-1 text-[9px] font-bold uppercase text-emerald-400">High Priority</span></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold text-white">{lead.name}</h3><span className="rounded-full bg-brand-500/10 px-2 py-1 text-[10px] font-semibold text-brand-300">Independent Practice</span><span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-400">{lead.providers} Providers</span><span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-400">{lead.locations} Locations</span></div><p className="mt-1 text-xs text-slate-500">{lead.specialty} <span className="mx-1">•</span> {lead.city}, {lead.state}</p><p className="mt-3 max-w-2xl text-xs leading-5 text-slate-400"><span className="font-semibold text-slate-300">Why this lead?</span> {lead.reason}</p></div><div className="grid gap-2 text-xs text-slate-400 sm:grid-cols-3 lg:w-[310px] lg:grid-cols-1"><a href="#" className="inline-flex items-center gap-2 hover:text-brand-300"><Globe2 className="h-4 w-4 text-brand-400" />{lead.website}</a><span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-brand-400" />{lead.phone}</span><span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-400" />{lead.city}, {lead.state}</span></div><div className="flex shrink-0 gap-2"><button className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-slate-500">View Details</button><button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-500"><Bookmark className="h-3.5 w-3.5" />Save to Leads</button></div></div></article>)}</div></section></div>

<aside className="space-y-4"><section className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5"><div className="flex items-center justify-between"><h2 className="text-xs font-bold uppercase tracking-[0.12em] text-brand-300">Today's hunt</h2><Target className="h-4 w-4 text-brand-400" /></div><div className="mt-5 flex items-center gap-4"><div className="grid h-24 w-24 place-items-center rounded-full border-8 border-brand-600/20"><div className="text-center"><p className="text-2xl font-black">{found}</p><p className="text-[10px] text-slate-500">/20</p></div></div><div><p className="text-sm font-bold">Leads Found</p><p className="mt-1 text-xs text-slate-500">Today</p><p className="mt-3 text-xs text-emerald-400">{remaining} leads remaining</p></div></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${(found / 20) * 100}%` }} /></div></section>
<section className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5"><h2 className="text-xs font-bold uppercase tracking-[0.12em] text-brand-300">API usage protection</h2><div className="mt-4 space-y-3 text-xs"><div className="flex justify-between"><span className="text-slate-500">Daily limit</span><b>20</b></div><div className="flex justify-between"><span className="text-slate-500">Used</span><b>{found}</b></div><div className="flex justify-between"><span className="text-slate-500">Remaining</span><b className="text-emerald-400">{remaining}</b></div><div className="flex justify-between"><span className="text-slate-500">Status</span><b className="text-emerald-400">Protected</b></div></div></section>
<section className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5"><h2 className="text-xs font-bold uppercase tracking-[0.12em] text-brand-300">Lead insights</h2><div className="mt-4 flex items-center gap-4"><ScoreRing score={92} /><div><p className="text-sm font-bold text-emerald-400">HIGH PRIORITY</p><p className="mt-1 text-xs text-slate-500">Excellent opportunity</p></div></div><div className="mt-5 space-y-3 text-xs"><div><div className="mb-1 flex justify-between"><span className="text-slate-500">Practice Fit</span><b>20/20</b></div><div className="h-1.5 rounded-full bg-slate-800"><div className="h-full w-full rounded-full bg-brand-500" /></div></div><div><div className="mb-1 flex justify-between"><span className="text-slate-500">Specialty Fit</span><b>18/20</b></div><div className="h-1.5 rounded-full bg-slate-800"><div className="h-full w-[90%] rounded-full bg-brand-500" /></div></div><div><div className="mb-1 flex justify-between"><span className="text-slate-500">Practice Size</span><b>16/20</b></div><div className="h-1.5 rounded-full bg-slate-800"><div className="h-full w-4/5 rounded-full bg-brand-500" /></div></div><div><div className="mb-1 flex justify-between"><span className="text-slate-500">Business Signals</span><b>18/20</b></div><div className="h-1.5 rounded-full bg-slate-800"><div className="h-full w-[90%] rounded-full bg-brand-500" /></div></div></div></section>
<section className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5"><h2 className="text-xs font-bold uppercase tracking-[0.12em] text-brand-300">Quick actions</h2><div className="mt-4 space-y-2"><button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 py-2.5 text-xs font-semibold hover:bg-brand-500"><Bookmark className="h-4 w-4" />View Saved Leads</button><button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800"><ExternalLink className="h-4 w-4" />Manual Email Outreach</button><button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800"><Settings className="h-4 w-4" />Lead Hunter Settings</button></div></section></aside></div></main></div></div>;
}
