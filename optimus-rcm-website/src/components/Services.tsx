import {
  FileText,
  Code2,
  RefreshCw,
  ShieldX,
  BadgeCheck,
  KeyRound,
  Wallet,
  ClipboardCheck,
  UserCheck,
  Building2,
  Headphones,
  LineChart,
} from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const SERVICES = [
  { icon: FileText, title: 'Medical Billing', desc: 'End-to-end claim preparation and submission built for clean, first-pass acceptance.' },
  { icon: Code2, title: 'Medical Coding', desc: 'Accurate, specialty-specific coding that maximizes reimbursement and minimizes denials.' },
  { icon: RefreshCw, title: 'AR Follow-Up', desc: 'Persistent, prioritized follow-up on aging accounts to recover every collectible dollar.' },
  { icon: ShieldX, title: 'Denial Management', desc: 'Root-cause analysis and rapid appeal workflows that turn denials into paid claims.' },
  { icon: BadgeCheck, title: 'Insurance Eligibility', desc: 'Real-time verification of benefits and coverage before the patient ever arrives.' },
  { icon: KeyRound, title: 'Charge Entry', desc: 'Fast, accurate charge capture that keeps your revenue cycle moving without delays.' },
  { icon: Wallet, title: 'Payment Posting', desc: 'Automated and manual posting reconciled to the penny for clean, audit-ready books.' },
  { icon: ClipboardCheck, title: 'Prior Authorization', desc: 'Proactive auth management that prevents denials and protects scheduled care.' },
  { icon: UserCheck, title: 'Credentialing', desc: 'Complete provider credentialing that keeps you enrolled and billable with every payer.' },
  { icon: Building2, title: 'Provider Enrollment', desc: 'CAQH, PECOS, and payer enrollment handled start-to-finish so you can focus on care.' },
  { icon: Headphones, title: 'Virtual Medical Office Support', desc: 'Front-office and back-office coverage that scales with your practice volume.' },
  { icon: LineChart, title: 'Revenue Cycle Consulting', desc: 'Workflow audits and strategy engagements that find and fix revenue leakage fast.' },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-navy-50/40 py-20 md:py-28">
      <div className="container-px">
        <Reveal>
          <SectionHeading
            eyebrow="Full-Service RCM"
            title={
              <>
                Every part of your revenue cycle,{' '}
                <span className="text-gradient">handled by experts</span>
              </>
            }
            subtitle="From the first patient call to the final payment posting, Optimus covers the complete RCM lifecycle so nothing falls through the cracks."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-navy-100/70 bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium-lg">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-navy-900 to-brand-600 p-3 text-white shadow-premium transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <s.icon className="h-6 w-6" strokeWidth={1.9} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700/70">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
