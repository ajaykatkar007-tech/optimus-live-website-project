import {
  AlertTriangle,
  FileX2,
  Hourglass,
  UserMinus,
  ClipboardList,
  TrendingDown,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';
import { Reveal, SectionHeading, Button } from './ui';

const PROBLEMS = [
  { icon: FileX2, title: 'Too many denied claims', desc: 'Avoidable denials drain revenue and create rework that pulls staff away from patients.' },
  { icon: Hourglass, title: 'Slow reimbursements', desc: 'Delayed insurance payments choke cash flow and make forecasting unpredictable.' },
  { icon: UserMinus, title: 'Staffing shortages', desc: 'Billing vacancies and turnover leave claims piling up and AR aging unchecked.' },
  { icon: ClipboardList, title: 'Increasing admin workload', desc: 'Prior auth, eligibility, and coding demands keep growing every quarter.' },
  { icon: TrendingDown, title: 'Revenue leakage', desc: 'Under-coded visits, missed charges, and uncollected balances quietly erode the bottom line.' },
  { icon: PhoneCall, title: 'Insurance follow-up taking too long', desc: 'Endless payer phone trees eat hours your team should spend on higher-value work.' },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-20 md:py-28">
      <div className="container-px">
        <Reveal>
          <SectionHeading
            eyebrow="The Real Cost of Inefficient Billing"
            title={
              <>
                Your practice is losing revenue <br className="hidden sm:block" />
                <span className="text-gradient">in ways you can&apos;t always see</span>
              </>
            }
            subtitle="Practice owners across the country share the same frustrations. The good news: every one of these is solvable with the right RCM partner."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="group h-full rounded-3xl border border-navy-100/70 bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:border-error-400/40 hover:shadow-premium-lg">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-error-500/10 text-error-500 transition-colors group-hover:bg-error-500 group-hover:text-white">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-900">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-700/70">{p.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Solution bridge */}
        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-4xl bg-gradient-to-br from-navy-900 via-navy-800 to-brand-800 p-8 text-center shadow-premium-xl md:p-12">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-brand-300">
                <AlertTriangle className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">
                Optimus turns billing friction into recovered revenue
              </h3>
              <p className="mt-4 text-navy-100/75">
                We step in as your dedicated RCM team — auditing your workflow,
                fixing the leak points, and running an end-to-end revenue cycle
                designed to get you paid faster and more predictably.
              </p>
              <div className="mt-7">
                <Button variant="primary" size="lg" href="#services" icon={<ArrowRight className="h-5 w-5" />}>
                  See How We Help
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
