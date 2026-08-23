import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Check, ChevronDown, Clock3, FileText, LogOut, Mail, Search, ShieldCheck, X } from 'lucide-react';
import {
  getConsultationRequests,
  signOutAdmin,
  supabase,
  type ConsultationRequest,
  type ConsultationRequestStatus,
  updateConsultationRequestStatus,
} from '../lib/supabase';

const statuses: ConsultationRequestStatus[] = ['new', 'contacted', 'qualified', 'scheduled', 'closed', 'spam'];
const statusLabels: Record<ConsultationRequestStatus, string> = {
  new: 'New', contacted: 'Contacted', qualified: 'Qualified', scheduled: 'Scheduled', closed: 'Closed', spam: 'Spam',
};
const statusClasses: Record<ConsultationRequestStatus, string> = {
  new: 'bg-brand-50 text-brand-700', contacted: 'bg-amber-50 text-amber-700', qualified: 'bg-emerald-50 text-emerald-700',
  scheduled: 'bg-cyan-50 text-cyan-700', closed: 'bg-slate-100 text-slate-600', spam: 'bg-red-50 text-red-700',
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function StatusBadge({ status }: { status: ConsultationRequestStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}>{statusLabels[status]}</span>;
}

function RequestDetail({ request, onClose, onStatusChange }: {
  request: ConsultationRequest;
  onClose: () => void;
  onStatusChange: (status: ConsultationRequestStatus) => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);

  async function changeStatus(status: ConsultationRequestStatus) {
    setSaving(true);
    await onStatusChange(status);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/45" role="presentation" onMouseDown={onClose}>
      <aside className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="request-detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Consultation request</p><h2 id="request-detail-title" className="mt-2 text-2xl font-bold text-navy-900">{request.name}</h2><p className="mt-1 break-all text-sm text-slate-500">Request ID: {request.id}</p></div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close request details"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Practice</p><p className="mt-1 font-medium text-slate-800">{request.practice_name || 'Not provided'}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Service</p><p className="mt-1 font-medium text-slate-800">{request.specialty || 'Not provided'}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p><a className="mt-1 block break-all font-medium text-brand-700 hover:underline" href={`mailto:${request.email}`}>{request.email}</a></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Phone</p><p className="mt-1 font-medium text-slate-800">{request.phone || 'Not provided'}</p></div>
        </div>
        <div className="mt-6 border-t border-slate-200 pt-6"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status</p><div className="mt-2"><StatusBadge status={request.status} /></div></div><label className="text-sm font-medium text-slate-700">Update status<select disabled={saving} value={request.status} onChange={(event) => changeStatus(event.target.value as ConsultationRequestStatus)} className="ml-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500">{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></label></div><p className="mt-5 flex items-center gap-2 text-sm text-slate-500"><Clock3 className="h-4 w-4" />Submitted {formatDate(request.created_at)}</p></div>
        <div className="mt-6 border-t border-slate-200 pt-6"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Message / notes</p><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{request.message || 'No message was included with this request.'}</p></div>
      </aside>
    </div>
  );
}

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | ConsultationRequestStatus>('all');
  const [checking, setChecking] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    let active = true;
    async function loadDashboard() {
      if (!supabase) { if (active) setChecking(false); return; }
      const { data: userData } = await supabase.auth.getUser();
      if (!active) return;
      if (!userData.user) { window.location.replace('/admin/login'); return; }
      setEmail(userData.user.email ?? '');
      setLoadingRequests(true);
      const result = await getConsultationRequests();
      if (!active) return;
      if (result.error) setError(result.error.message); else setRequests(result.data ?? []);
      setLoadingRequests(false);
      setChecking(false);
    }
    loadDashboard();
    return () => { active = false; };
  }, []);

  const visibleRequests = useMemo(() => {
    const term = search.trim().toLowerCase();
    return requests.filter((request) => {
      const matchesFilter = filter === 'all' || request.status === filter;
      const matchesSearch = !term || [request.name, request.email, request.practice_name, request.specialty].some((value) => value?.toLowerCase().includes(term));
      return matchesFilter && matchesSearch;
    });
  }, [filter, requests, search]);

  async function handleStatusChange(status: ConsultationRequestStatus) {
    if (!selectedRequest) return;
    const result = await updateConsultationRequestStatus(selectedRequest.id, status);
    if (result.error) { setError(result.error.message); return; }
    const updated = { ...selectedRequest, status };
    setRequests((current) => current.map((request) => request.id === updated.id ? updated : request));
    setSelectedRequest(updated);
    setFeedback('Request status updated.');
    window.setTimeout(() => setFeedback(''), 3000);
  }

  async function handleLogout() { await signOutAdmin(); window.location.replace('/admin/login'); }
  if (checking) return <div className="grid min-h-screen place-items-center bg-slate-950 text-white">Checking secure session...</div>;
  if (!supabase) return <div className="grid min-h-screen place-items-center bg-slate-950 px-4 text-white"><div className="max-w-lg rounded-2xl border border-red-400/20 bg-red-500/10 p-7 text-center"><h1 className="text-xl font-semibold">Admin authentication is not configured</h1><p className="mt-2 text-sm text-slate-300">Add the Supabase environment variables before testing the login.</p></div></div>;

  const summary = [
    { label: 'Total requests', value: requests.length, icon: FileText },
    { label: 'New', value: requests.filter((request) => request.status === 'new').length, icon: AlertCircle },
    { label: 'Contacted', value: requests.filter((request) => request.status === 'contacted').length, icon: Mail },
    { label: 'Qualified', value: requests.filter((request) => request.status === 'qualified').length, icon: Check },
    { label: 'Closed', value: requests.filter((request) => request.status === 'closed').length, icon: Check },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white"><ShieldCheck className="h-5 w-5" /></div><div><p className="font-bold">Optimus RCM</p><p className="text-xs text-slate-500">Admin Dashboard</p></div></div><div className="flex items-center gap-4"><span className="hidden text-sm text-slate-500 sm:block">{email}</span><button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"><LogOut className="h-4 w-4" />Sign out</button></div></div></header>
      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><div className="mb-8"><p className="text-sm font-medium text-brand-600">Secure workspace</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Consultation requests</h1><p className="mt-2 text-slate-500">Review and follow up on leads submitted through the public website.</p></div>
        {feedback && <div role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"><Check className="h-4 w-4" />{feedback}</div>}
        {error && <div role="alert" className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-4 w-4" />{error}</div>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{summary.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm text-slate-500">{label}</p><Icon className="h-4 w-4 text-brand-600" /></div><p className="mt-3 text-3xl font-bold text-navy-900">{value}</p></div>)}</div>
        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="text-lg font-semibold">All requests</h2><p className="mt-1 text-sm text-slate-500">{visibleRequests.length} of {requests.length} requests shown</p></div><div className="flex flex-col gap-3 sm:flex-row"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search requests" aria-label="Search requests" className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-500 sm:w-64" /></label><label className="relative block"><select value={filter} onChange={(event) => setFilter(event.target.value as 'all' | ConsultationRequestStatus)} aria-label="Filter requests by status" className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm outline-none focus:border-brand-500 sm:w-40"><option value="all">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /></label></div></div>
          {loadingRequests ? <div className="p-12 text-center text-sm text-slate-500">Loading consultation requests...</div> : visibleRequests.length === 0 ? <div className="p-12 text-center"><FileText className="mx-auto h-8 w-8 text-slate-300" /><h3 className="mt-3 font-semibold text-slate-800">{requests.length === 0 ? 'No consultation requests yet' : 'No matching requests'}</h3><p className="mt-1 text-sm text-slate-500">{requests.length === 0 ? 'New submissions from the public website will appear here.' : 'Try a different search term or status filter.'}</p></div> : <><div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Name</th><th className="px-5 py-3 font-semibold">Practice / service</th><th className="px-5 py-3 font-semibold">Date</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3 text-right font-semibold">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{visibleRequests.map((request) => <tr key={request.id} className="hover:bg-slate-50"><td className="px-5 py-4"><p className="font-semibold text-slate-800">{request.name}</p><p className="mt-1 text-xs text-slate-500">{request.email}</p></td><td className="px-5 py-4"><p className="text-slate-700">{request.practice_name || 'Not provided'}</p><p className="mt-1 text-xs text-slate-500">{request.specialty || 'Not provided'}</p></td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{formatDate(request.created_at)}</td><td className="px-5 py-4"><StatusBadge status={request.status} /></td><td className="px-5 py-4 text-right"><button type="button" onClick={() => setSelectedRequest(request)} className="font-semibold text-brand-700 hover:text-brand-900">View details</button></td></tr>)}</tbody></table></div><div className="divide-y divide-slate-100 md:hidden">{visibleRequests.map((request) => <button type="button" key={request.id} onClick={() => setSelectedRequest(request)} className="block w-full p-5 text-left hover:bg-slate-50"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-slate-800">{request.name}</p><p className="mt-1 text-sm text-slate-500">{request.practice_name || 'Practice not provided'}</p></div><StatusBadge status={request.status} /></div><div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span>{request.specialty || 'Service not provided'}</span><span>{formatDate(request.created_at)}</span></div></button>)}</div></>}
        </section></main>
      {selectedRequest && <RequestDetail request={selectedRequest} onClose={() => setSelectedRequest(null)} onStatusChange={handleStatusChange} />}
    </div>
  );
}
