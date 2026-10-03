import { ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Optimus', href: '#why' },
  { label: 'Process', href: '#process' },
  { label: 'Industries', href: '#industries' },
  { label: 'Results', href: '#results' },
  { label: 'FAQ', href: '#faq' },
];

const SERVICES = [
  { label: 'Medical Billing', href: '#services' },
  { label: 'Medical Coding', href: '#services' },
  { label: 'AR Follow-Up', href: '#services' },
  { label: 'Denial Management', href: '#services' },
  { label: 'Prior Authorization', href: '#services' },
  { label: 'Credentialing', href: '#services' },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'HIPAA Statement', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-16 pb-8 text-navy-100/70">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:48px_48px] opacity-20" />
      <div className="container-px relative">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-navy-900 via-brand-600 to-accent-500 text-white shadow-glow">
                <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Optimus<span className="text-brand-400"> RCM</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Premium medical billing and Revenue Cycle Management helping practices
              maximize revenue, minimize denials, and spend more time caring for patients.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-navy-100/80 transition hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M4.98 3.5C4.98 4.6 4.12 5.5 3.01 5.5 1.9 5.5 1 4.6 1 3.5 1 2.4 1.9 1.5 3.01 1.5 4.12 1.5 4.98 2.4 4.98 3.5zM0 24V7h4v17H0zm7-17H11v2.5h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 2.7 4.7 6.2V24h-4v-7.8c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.2V24H7V7z" />
                </svg>
              </a>
              <a
                href="mailto:ajay@optimusrcm.com"
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-navy-100/80 transition hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm transition-colors hover:text-brand-300">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm transition-colors hover:text-brand-300">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + legal */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-2.5">
              <li><a href="mailto:ajay@optimusrcm.com" className="text-sm transition-colors hover:text-brand-300">ajay@optimusrcm.com</a></li>
              <li className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500"
                >
                  Book Consultation <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
            <ul className="mt-6 space-y-2.5">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-navy-100/50 transition-colors hover:text-brand-300">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-navy-100/50">
            © {new Date().getFullYear()} Optimus RCM Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-navy-100/50">
            <ShieldCheck className="h-4 w-4 text-success-400" />
            HIPAA Compliant · SOC 2 Aligned · US-Based RCM Team
          </div>
        </div>
      </div>
    </footer>
  );
}
