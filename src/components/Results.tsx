import { FileCheck2, RefreshCw, ShieldX, BarChart3, ArrowRight } from 'lucide-react';
import { Reveal, SectionHeading, Button } from './ui';

const CAPABILITIES = [
  { icon: FileCheck2, title: 'Clean Claim Workflows', desc: 'Structured claim preparation and submission processes designed to reduce avoidable errors.' },
  { icon: RefreshCw, title: 'AR Follow-Up', desc: 'Prioritized follow-up on outstanding claims, with clear status tracking and escalation.' },
  { icon: ShieldX, title: 'Denial Management', desc: 'Denial categorization, root-cause review, and payer follow-up based on the agreed scope.' },
  { icon: BarChart3, title: 'Transparent Reporting', desc: 'Regular visibility into agreed revenue-cycle activities, trends, and outstanding work.' },
];

export default function Results() {
  return (
    <section id="results" className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-brand-800 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:48px_48px] opacity-30" />
      <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl" />
      <div className="container-px relative">
        <Reveal>
          <SectionHeading dark eyebrow="Revenue Cycle Support" title={<><span className="text-gradient-light">Focused execution</span> across your revenue cycle</>} subtitle="Practical RCM support with clear workflows, accountable follow-up, and reporting aligned to your practice's needs." />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="glass-card-dark h-full rounded-4xl p-7 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow"><item.icon className="h-7 w-7 text-white" /></div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-100/70">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-12 text-center"><Button variant="primary" size="lg" href="#assessment" icon={<ArrowRight className="h-5 w-5" />}>Free RCM Assessment</Button></div>
        </Reveal>
      </div>
    </section>
  );
}
