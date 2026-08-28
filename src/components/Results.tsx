import { motion } from 'framer-motion';
import { FileCheck2, Zap, Clock, Smile, ArrowRight } from 'lucide-react';
import { Reveal, SectionHeading, Button } from './ui';

const OUTCOMES = [
  { icon: FileCheck2, title: 'Cleaner claims', label: 'More disciplined preparation and coding workflows.', accent: 'from-brand-500 to-brand-700' },
  { icon: Zap, title: 'Faster follow-up', label: 'Prioritized AR work that keeps payer conversations moving.', accent: 'from-accent-500 to-brand-600' },
  { icon: Clock, title: 'Better visibility', label: 'Clearer attention on aging balances and denial patterns.', accent: 'from-success-500 to-brand-600' },
  { icon: Smile, title: 'More time for care', label: 'Less administrative friction for your practice team.', accent: 'from-navy-700 to-brand-600' },
];

export default function Results() {
  return (
    <section id="results" className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-brand-800 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:48px_48px] opacity-30" />
      <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl" />

      <div className="container-px relative">
        <Reveal>
            <SectionHeading
            dark
            eyebrow="Outcomes That Matter"
            title={
              <>
                <span className="text-gradient-light">Measurable impact</span> on your revenue cycle
              </>
            }
            subtitle="A focused revenue-cycle operation helps your team spend less time chasing preventable issues and more time caring for patients."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OUTCOMES.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card-dark rounded-4xl p-7 text-center"
              >
                <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} shadow-glow`}>
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <div className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">{s.title}</div>
                <div className="mt-2 text-sm font-medium leading-6 text-navy-100/70">{s.label}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 text-center">
            <Button variant="primary" size="lg" href="#assessment" icon={<ArrowRight className="h-5 w-5" />}>
              Get Your Free Practice Health Check
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
