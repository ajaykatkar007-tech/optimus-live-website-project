import { useEffect, useState } from 'react';
import { BarChart3, FileText, LogOut, ShieldCheck, Users } from 'lucide-react';
import { signOutAdmin, supabase } from '../lib/supabase';

const dashboardCards = [
  { title: 'Clients', description: 'Manage client practices', Icon: Users },
  { title: 'Claims', description: 'Track RCM activity', Icon: FileText },
  { title: 'Denials', description: 'Review denial workflows', Icon: BarChart3 },
  { title: 'Reports', description: 'View business reporting', Icon: BarChart3 },
];

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      if (!supabase) {
        if (active) setChecking(false);
        return;
      }

      const { data } = await supabase.auth.getUser();
      if (!active) return;

      if (!data.user) {
        window.location.replace('/admin/login');
        return;
      }

      setEmail(data.user.email ?? '');
      setChecking(false);
    }

    checkSession();
    return () => {
      active = false;
    };
  }, []);

  async function handleLogout() {
    await signOutAdmin();
    window.location.replace('/admin/login');
  }

  if (checking) {
    return <div className="grid min-h-screen place-items-center bg-slate-950 text-white">Checking secure session…</div>;
  }

  if (!supabase) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 px-4 text-white">
        <div className="max-w-lg rounded-2xl border border-red-400/20 bg-red-500/10 p-7 text-center">
          <h1 className="text-xl font-semibold">Admin authentication is not configured</h1>
          <p className="mt-2 text-sm text-slate-300">Add the Supabase environment variables before testing the login.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">Optimus RCM</p>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-brand-600">Secure workspace</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Welcome, Admin</h1>
          <p className="mt-2 text-slate-500">Signed in as {email}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map(({ title, description, Icon }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold">Admin foundation is ready</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
            This first version establishes secure authentication and a protected dashboard shell. Client, claims, AR and reporting modules can be added without changing the public website.
          </p>
        </div>
      </main>
    </div>
  );
}
