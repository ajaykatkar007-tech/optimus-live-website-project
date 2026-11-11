import { ShieldCheck, Mail } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-16 pb-8 text-navy-100/70">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:48px_48px] opacity-20" />
      <div className="container-px relative">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-navy-900 via-brand-600 to-accent-500 text-white shadow-glow"><ShieldCheck className="h-5 w-5" strokeWidth={2.2} /></span>
              <span className="font-display text-lg font-bold tracking-tight text-white">Optimus<span className="text-brand-400"> RCM</span></span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">Medical billing and Revenue Cycle Management helping independent practices improve revenue workflows and reduce denials.</p>
            <div className="mt-6 flex gap-3">
              <a href="mailto:ajay@optimusrcm.com" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-navy-100/80 transition hover:bg-white/10 hover:text-white"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">{QUICK_LINKS.map((l) => <li key={l.label}><a href={l.href} className="text-sm transition-colors hover:text-brand-300">{l.label}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2.5">{SERVICES.map((l) => <li key={l.label}><a href={l.href} className="text-sm transition-colors hover:text-brand-300">{l.label}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-2.5">
              <li><a href="mailto:ajay@optimusrcm.com" className="text-sm transition-colors hover:text-brand-300">ajay@optimusrcm.com</a></li>
              <li className="pt-2"><a href="#contact" className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500">Free RCM Assessment</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-navy-100/50">© {new Date().getFullYear()} Optimus RCM Solutions. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-navy-100/70"><ShieldCheck className="h-4 w-4 text-success-400" />HIPAA-compliant RCM operations · Business Associate Agreements available</div>
        </div>
      </div>
    </footer>
  );
}
