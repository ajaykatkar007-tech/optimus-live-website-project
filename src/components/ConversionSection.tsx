import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  CalendarDays,
  FileDown,
  BookOpen,
  Mail,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Workflow,
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
    desc: 'Get our capability overview: services, specialties, security approach, and the results we aim to deliver.',
    cta: 'Download PDF',
    href: '/optimus-rcm-company-profile.pdf',
  },
];

const RESOURCE_CARDS = [
  {
    id: 'resource-denials',
    title: 'Denial prevention basics',
    text: 'Start with eligibility verification, authorization checks, accurate coding, and payer-specific claim edits before submission.',
  },
  {
    id: 'resource-ar',
    title: 'A practical AR review',
    text: 'Group outstanding balances by payer, age, and reason so your team can focus first on the accounts with the clearest recovery path.',
  },
  {
    id: 'resource-auth',
    title: 'Prior authorization readiness',
    text: 'Track authorization requirements, submission status, expiration dates, and follow-up ownership before scheduled care.',
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
                  download={c.title === 'Download Company Profile' ? 'optimus-rcm-company-profile.pdf' : undefined}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  {c.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 rounded-4xl bg-brand-50 p-8 shadow-premium md:p-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
                <Workflow className="h-4 w-4" /> How We Work
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-navy-900">Support that fits your practice</h3>
              <p className="mt-3 text-navy-700/70">
                Start with the part of the revenue cycle that needs the most attention. We review your workflow, agree on priorities, and build a practical plan around your specialty, systems, and goals.
              </p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                { icon: ClipboardCheck, title: 'Review', text: 'Understand your current workflow, payer mix, and revenue-cycle priorities.' },
                { icon: BarChart3, title: 'Plan', text: 'Turn the findings into clear actions, owners, and measures of progress.' },
                { icon: ShieldCheck, title: 'Improve', text: 'Refine the process over time with transparent communication and reporting.' },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/80 bg-white p-5">
                  <item.icon className="h-6 w-6 text-brand-600" />
                  <h4 className="mt-4 font-display font-bold text-navy-900">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700/70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-4xl bg-gradient-to-br from-navy-900 to-brand-800 p-8 text-white shadow-premium-lg md:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-200">
                  <BookOpen className="h-4 w-4" /> Helpful Resources
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">Practical RCM guidance</h3>
                <p className="mt-3 max-w-md text-navy-100/75">
                  Straightforward starting points for practice owners and administrators working to reduce denials and improve collections.
                </p>
              </div>
              <div className="mt-7 space-y-2">
                {[
                  ['Denial prevention basics', '#resource-denials'],
                  ['A practical AR review', '#resource-ar'],
                  ['Prior authorization readiness', '#resource-auth'],
                ].map(([label, href]) => (
                  <a key={href} href={href} className="flex items-center gap-2 text-sm text-navy-100/80 transition hover:text-white">
                    <CheckCircle2 className="h-4 w-4 text-brand-300" /> {label}
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
                <h3 className="mt-5 font-display text-2xl font-bold text-navy-900">RCM insights, monthly</h3>
                <p className="mt-3 text-navy-700/70">
                  Join practice owners and administrators getting short, actionable tips on improving collections and reducing denials. No spam, ever.
                </p>
              </div>
              <form
                className="mt-7 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = '#contact';
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

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {RESOURCE_CARDS.map((resource) => (
            <article id={resource.id} key={resource.id} className="scroll-mt-28 rounded-3xl border border-navy-100/70 bg-white p-6 shadow-premium">
              <h3 className="font-display text-lg font-bold text-navy-900">{resource.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-700/70">{resource.text}</p>
            </article>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 grid gap-4 rounded-4xl border border-navy-100/70 bg-white p-8 shadow-premium md:grid-cols-3 md:p-10">
            <div id="privacy" className="scroll-mt-28">
              <h3 className="font-display font-bold text-navy-900">Privacy overview</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">We use information submitted through this website to respond to your request and discuss RCM services. Contact us for the full privacy notice.</p>
            </div>
            <div id="hipaa" className="scroll-mt-28">
              <h3 className="font-display font-bold text-navy-900">HIPAA & security</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">Please do not submit patient-identifiable information through this public form. We can review security, workflow, and agreement requirements before onboarding.</p>
            </div>
            <div id="terms" className="scroll-mt-28">
              <h3 className="font-display font-bold text-navy-900">Service terms</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">Scope, pricing, responsibilities, and implementation details are confirmed in a written agreement before services begin.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
