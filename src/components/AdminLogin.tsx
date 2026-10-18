import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { signInAdmin } from '../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const result = await signInAdmin(email.trim(), password);

    if (result.error) {
      setError(result.error.message || 'Unable to sign in. Please check your credentials.');
      setLoading(false);
      return;
    }

    window.location.assign('/admin');
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl lg:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-slate-900 via-brand-950 to-slate-950 p-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 shadow-lg">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold tracking-wide">OPTIMUS RCM</p>
                  <p className="text-xs text-slate-400">Solutions</p>
                </div>
              </div>
              <h1 className="max-w-md text-4xl font-semibold leading-tight">Secure access to your RCM workspace.</h1>
              <p className="mt-5 max-w-md text-slate-400">Admin access is protected with Supabase authentication. Your public website remains separate from the admin area.</p>
            </div>
            <p className="text-sm text-slate-500">Authorized administrators only.</p>
          </div>

          <div className="bg-white p-7 text-slate-900 sm:p-10 lg:p-12">
            <button type="button" onClick={() => window.location.assign('/')} className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </button>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Admin Portal</p>
              <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
              <p className="mt-2 text-slate-500">Sign in to continue to the Optimus RCM dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Admin email</span>
                <span className="relative block">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@optimusrcm.com" className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                <span className="relative block">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
                </span>
              </label>

              {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

              <button type="submit" disabled={loading} className="w-full rounded-xl bg-brand-600 px-5 py-3.5 font-semibold text-white shadow-lg transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? 'Signing in…' : 'Sign in to Admin'}
              </button>
            </form>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">If you do not have administrator credentials, contact the Optimus RCM account owner.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
