import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  BadgeCheck,
  Code2,
  KeyRound,
  Send,
  Wallet,
  ShieldX,
  RefreshCw,
  BarChart3,
  Check,
} from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const STEPS = [
  { icon: UserPlus, title: 'Patient Registration', desc: 'Accurate capture of demographics and insurance details at the front end.' },
  { icon: BadgeCheck, title: 'Insurance Verification', desc: 'Real-time eligibility and benefits verification before service is rendered.' },
  { icon: Code2, title: 'Medical Coding', desc: 'Specialty-specific coding aligned to current CPT, ICD-10, and HCPCS guidelines.' },
  { icon: KeyRound, title: 'Charge Entry', desc: 'Prompt, precise charge capture to keep the cycle moving without lag.' },
  { icon: Send, title: 'Claim Submission', desc: 'Clean claims submitted electronically with edits that catch errors pre-submission.' },
  { icon: Wallet, title: 'Payment Posting', desc: 'ERA and manual posting reconciled to the penny for audit-ready accuracy.' },
  { icon: ShieldX, title: 'Denial Resolution', desc: 'Root-cause analysis and rapid appeals to convert denials back into revenue.' },
  { icon: RefreshCw, title: 'AR Follow-Up', desc: 'Prioritized, persistent follow-up on aging AR to recover every dollar.' },
  { icon: BarChart3, title: 'Performance Reporting', desc: 'Transparent KPI dashboards so you always know where revenue stands.' },
];

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:48px_48px] opacity-40" />
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />

      <div className="container-px relative">
        <Reveal>
          <SectionHeading
            dark
            eyebrow="The Revenue Cycle Process"
            title={
              <>
                <span className="text-gradient-light">A transparent, end-to-end</span> RCM workflow
              </>
            }
            subtitle="Nine connected stages, each owned by specialists who keep your revenue moving from registration to final reporting."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Steps list */}
          <div className="relative">
            <div className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-500/60 via-brand-500/30 to-transparent" />
            <ol className="space-y-1">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-all duration-300 ${
                      active === i
                        ? 'bg-white/10 backdrop-blur-md'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-all duration-300 ${
                        active === i
                          ? 'border-brand-400 bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow'
                          : 'border-white/15 bg-navy-900 text-brand-300 group-hover:border-brand-400/50'
                      }`}
                    >
                      {active === i ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                    </span>
                    <span className="flex items-baseline gap-3">
                      <span className={`font-display text-sm font-bold ${active === i ? 'text-white' : 'text-navy-100/50'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-sm font-semibold transition-colors ${active === i ? 'text-white' : 'text-navy-100/70 group-hover:text-white'}`}>
                        {s.title}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Active step detail */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="glass-card-dark rounded-4xl p-8 md:p-10"
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                  {(() => {
                    const Icon = STEPS[active].icon;
                    return <Icon className="h-8 w-8" />;
                  })()}
                </div>
                <div className="mt-5 text-sm font-semibold uppercase tracking-wider text-brand-300">
                  Step {String(active + 1).padStart(2, '0')} of {STEPS.length}
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  {STEPS[active].title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-navy-100/75">
                  {STEPS[active].desc}
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActive((p) => Math.max(0, p - 1))}
                    disabled={active === 0}
                    className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-30"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive((p) => Math.min(STEPS.length - 1, p + 1))}
                    disabled={active === STEPS.length - 1}
                    className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:opacity-30"
                  >
                    Next Step
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
