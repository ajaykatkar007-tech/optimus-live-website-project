import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  CalendarDays,
  FileDown,
  BookOpen,
  Mail,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Reveal, Button } from './ui';

const CTA_CARDS = [
  {
    icon: ClipboardCheck,
    title: 'Free RCM Assessment',
    desc: 'A specialist reviews your denial rate, AR aging, and coding accuracy — then shows you exactly where revenue is leaking.',
    cta: 'Start Assessment',
    href: '#assessment',
  },
  {
    icon: CalendarDays,
    title: 'Schedule a Demo',
    desc: 'See the Optimus workflow live. We walk through your specialty, EHR, and payer mix with a real RCM expert.',
    cta: 'Book a Demo',
    href: '#contact',
  },
  {
    icon: FileDown,
    title: 'Download Company Profile',
    desc: 'Get our one-page capability overview: services, specialties, security, and the results we deliver.',
    cta: 'Download PDF',
    href: '#contact',
  },
];

export default function ConversionSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-px">
        <div className="grid gap-5 lg:grid-cols-3">
          {CTA_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col rounded-4xl border border-navy-100/70 bg-white p-7 shadow-premium transition-all duration-300 hover:shadow-premium-lg"
              >
                <div className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-navy-900 to-brand-600 p-3.5 text-white shadow-premium">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-navy-900">{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700/70">{c.desc}</p>
                <a
                  href={c.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  {c.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Insights + Newsletter band */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-4xl bg-gradient-to-br from-navy-900 to-brand-800 p-8 text-white shadow-premium-lg md:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-200">
                  <BookOpen className="h-4 w-4" /> Latest Insights
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">RCM strategies that move the needle</h3>
                <p className="mt-3 max-w-md text-navy-100/75">
                  Practical guidance on denials, coding, and collections — written
                  for practice owners and administrators who run the business side of care.
                </p>
              </div>
              <div className="mt-7 space-y-2">
                {[
                  '5 denial reasons costing practices the most in 2026',
                  'How to read an AR aging report like a pro',
                  'Prior auth changes every specialty should prepare for',
                ].map((t) => (
                  <a key={t} href="#contact" className="flex items-center gap-2 text-sm text-navy-100/80 transition hover:text-white">
                    <CheckCircle2 className="h-4 w-4 text-brand-300" /> {t}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-4xl border border-navy-100/70 bg-white p-8 shadow-premium md:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
                  <Mail className="h-4 w-4" /> Newsletter
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-navy-900">
                  RCM insights, monthly
                </h3>
                <p className="mt-3 text-navy-700/70">
                  Join practice owners and administrators getting short, actionable
                  tips on improving collections and reducing denials. No spam, ever.
                </p>
              </div>
              <form
                className="mt-7 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `#contact`;
                }}
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@yourpractice.com"
                  aria-label="Email address"
                  className="flex-1 rounded-full border border-navy-100 bg-white px-5 py-3 text-sm text-navy-900 shadow-premium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
                <Button variant="primary" size="md" icon={<ArrowRight className="h-4 w-4" />}>
                  Subscribe
                </Button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
