import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { Reveal, SectionHeading } from './ui';
import { submitConsultationRequest } from '../lib/supabase';

const SPECIALTIES = [
  'Primary Care',
  'Family Medicine',
  'Internal Medicine',
  'Behavioral Health',
  'Mental Health',
  'Pediatrics',
  'Physical Therapy',
  'Orthopedics',
  'Cardiology',
  'Urgent Care',
  'Dental',
  'Home Health',
  'Multi-Specialty Group',
  'Other',
];

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'ajay@optimusrcm.com', href: 'mailto:ajay@optimusrcm.com' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 8am–7pm ET' },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') || '').trim(),
      practice_name: String(fd.get('practice_name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      specialty: String(fd.get('specialty') || '').trim(),
      message: String(fd.get('message') || '').trim(),
      source: 'contact',
    };

    if (!payload.name || !payload.email) {
      setStatus('error');
      setErrorMsg('Please provide your name and email.');
      return;
    }

    const res = await submitConsultationRequest(payload);
    if (res.success) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
      setErrorMsg(res.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-mesh py-20 md:py-28">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl" />

      <div className="container-px relative">
        <Reveal>
          <SectionHeading
            dark
            eyebrow="Let's Talk"
            title={
              <>
                <span className="text-gradient-light">Schedule your free consultation</span>
              </>
            }
            subtitle="Tell us about your practice. We'll review your revenue cycle and show you exactly where you can improve collections and reduce denials — no obligation."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact info */}
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8 rounded-4xl glass-card-dark p-8 md:p-10">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Get in touch</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-100/75">
                  Prefer to reach out directly? Use the details below — a real person
                  responds within one business day.
                </p>
                <div className="mt-7 space-y-4">
                  {CONTACT_INFO.map((c) => (
                    <div key={c.label} className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-brand-300">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-navy-100/50">{c.label}</div>
                        <div className="text-sm font-medium text-white">
                          {c.href ? (
                            <a href={c.href} className="transition-colors hover:text-brand-200">
                              {c.value}
                            </a>
                          ) : (
                            c.value
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 rounded-3xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path d="M4.98 3.5C4.98 4.6 4.12 5.5 3.01 5.5 1.9 5.5 1 4.6 1 3.5 1 2.4 1.9 1.5 3.01 1.5 4.12 1.5 4.98 2.4 4.98 3.5zM0 24V7h4v17H0zm7-17H11v2.5h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 2.7 4.7 6.2V24h-4v-7.8c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.2V24H7V7z" />
                        </svg>
                      </span>
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <ShieldCheck className="h-5 w-5 text-success-400" />
                  Secure-minded submission
                </div>
                <p className="mt-2 text-xs text-navy-100/60">
                  Your request is sent through the configured Supabase connection and used only to respond about RCM services.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-4xl bg-white p-7 shadow-premium-xl md:p-10">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-success-500/10 text-success-600">
                    <CheckCircle2 className="h-9 w-9" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-navy-900">Request received</h3>
                  <p className="mt-3 max-w-sm text-navy-700/70">
                    Thank you. An RCM specialist will reach out within one business day
                    to schedule your free consultation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 rounded-full border border-navy-100 px-5 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-navy-700/80">Full Name *</span>
                      <input
                        name="name"
                        required
                        autoComplete="name"
                        className="mt-1.5 w-full rounded-2xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 shadow-premium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-navy-700/80">Practice Name</span>
                      <input
                        name="practice_name"
                        autoComplete="organization"
                        className="mt-1.5 w-full rounded-2xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 shadow-premium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-navy-700/80">Email *</span>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="mt-1.5 w-full rounded-2xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 shadow-premium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-navy-700/80">Phone</span>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="mt-1.5 w-full rounded-2xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 shadow-premium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-medium text-navy-700/80">Specialty</span>
                    <select
                      name="specialty"
                      defaultValue=""
                      className="mt-1.5 w-full rounded-2xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 shadow-premium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                    >
                      <option value="" disabled>Select your specialty</option>
                      {SPECIALTIES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-navy-700/80">Message</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us about your practice size, EHR, and what you'd like to improve..."
                      className="mt-1.5 w-full resize-none rounded-2xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 shadow-premium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                    />
                  </label>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 rounded-2xl bg-error-500/10 px-4 py-3 text-sm text-error-500">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-4 text-base font-semibold text-white shadow-premium-lg transition-all duration-300 hover:bg-brand-700 hover:shadow-glow disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Schedule Your Free Consultation
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-navy-700/50">
                    By submitting, you agree to be contacted about RCM services. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
