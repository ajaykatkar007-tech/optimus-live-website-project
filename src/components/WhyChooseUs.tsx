import {
  ShieldCheck,
  UserCog,
  ShieldX,
  BarChart3,
  Workflow,
  Zap,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const REASONS = [
  { icon: ShieldCheck, title: 'HIPAA Compliant Processes', desc: 'Every workflow, tool, and team member operates under strict HIPAA safeguards.' },
  { icon: UserCog, title: 'Dedicated Account Manager', desc: 'One accountable partner who knows your practice, payers, and goals by name.' },
  { icon: ShieldX, title: 'Reduced Claim Denials', desc: 'Proactive edits and clean-claim workflows cut denials before they happen.' },
  { icon: BarChart3, title: 'Transparent KPI Reporting', desc: 'Live dashboards show exactly where your revenue stands, anytime.' },
  { icon: Workflow, title: 'Customized Billing Workflow', desc: 'We adapt to your EHR, specialty, and volume — not the other way around.' },
  { icon: Zap, title: 'Faster Insurance Follow-Up', desc: 'Prioritized AR work that shortens the time from claim to cash.' },
  { icon: Layers, title: 'Scalable RCM Support', desc: 'From a single provider to a multi-location group, we scale with you.' },
  { icon: TrendingUp, title: 'Revenue Growth Focus', desc: 'We measure success by the revenue we recover and grow, not just claims processed.' },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative py-20 md:py-28">
      <div className="container-px">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Optimus"
            title={
              <>
                Outcomes that matter to your{' '}
                <span className="text-gradient">practice and your patients</span>
              </>
            }
            subtitle="We focus on the results that keep your practice financially healthy — so you can spend more time caring for patients."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={(i % 4) * 0.06}>
              <div className="group h-full rounded-3xl border border-navy-100/70 bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-premium-lg">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <r.icon className="h-6 w-6" strokeWidth={1.9} />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-navy-900">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/70">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
