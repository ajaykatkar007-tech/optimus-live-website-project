import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  LineChart,
  ShieldCheck,
  Stethoscope,
  WalletCards,
} from 'lucide-react';
import { Button, Reveal, SectionHeading } from './ui';

const pathways = [
  {
    title: 'Practice Operations',
    description: 'Keep the front and back office aligned around clean information, timely follow-up, and a smoother patient-to-payment workflow.',
    icon: Stethoscope,
  },
  {
    title: 'Revenue Cycle',
    description: 'Connect eligibility, coding, claims, denials, payment posting, and AR follow-up in one practical revenue workflow.',
    icon: WalletCards,
  },
  {
    title: 'Performance Review',
    description: 'Use clear reporting and regular reviews to see what is working, where revenue is leaking, and what to improve next.',
    icon: BarChart3,
  },
];

const models = [
  {
    label: 'You Do It',
    title: 'Your team stays in control',
    description: 'Use your existing team and workflow with a focused review, practical recommendations, and clear next steps.',
    points: ['Workflow assessment', 'Team-ready checklists', 'Priority action plan'],
  },
  {
    label: 'We Share It',
    title: 'Work together where you need help',
    description: 'Keep the work that fits your team and bring Optimus into the areas that need extra expertise or capacity.',
    points: ['Shared responsibilities', 'Flexible support areas', 'Regular progress reviews'],
  },
  {
    label: 'We Do It',
    title: 'A dedicated RCM partner',
    description: 'Let Optimus support the agreed revenue-cycle scope while your practice stays focused on patient care.',
    points: ['Defined service scope', 'Dedicated communication', 'Transparent reporting'],
  },
  {
    label: 'Flex',
    title: 'Start small and grow',
    description: 'Begin with one priority, then expand support as your practice, payer mix, and operational needs change.',
    points: ['Focused starting point', 'Scalable support', 'Written scope before onboarding'],
  },
];

const capabilities = [
  ['Maximize Revenue', 'Clean claims, accurate charge capture, payment posting, and focused AR work.', FileCheck2],
  ['Reduce Denials', 'Prevent avoidable denials with eligibility, authorization, and claim-quality checks.', ShieldCheck],
  ['Revenue Cycle Management', 'Coordinate billing, coding, follow-up, denials, and reporting around your workflow.', WalletCards],
  ['Practice Readiness', 'Turn workflow findings into owners, actions, and a practical improvement plan.', ClipboardCheck],
  ['Reporting & Insights', 'Make the next best action visible with useful revenue-cycle measures.', LineChart],
  ['Specialty Support', 'Adapt the process to your specialty, visit patterns, and payer requirements.', Stethoscope],
] as const;

export default function TriarqInspiredSections() {
  const [activeModel, setActiveModel] = useState(0);
  const model = models[activeModel];

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white md:py-28">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="container-px relative">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Built around independent practices</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">One partner across the revenue cycle.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100/75">Optimus helps independent practices connect the operational work behind every visit with the revenue work that keeps the practice healthy.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="primary" size="lg" href="#contact" icon={<ArrowRight className="h-5 w-5" />}>Start a conversation</Button>
                <Button variant="light" size="lg" href="#pathways">Explore solutions</Button>
              </div>
            </div>
          </Reveal>
          <div id="pathways" className="mt-14 grid gap-5 md:grid-cols-3">
            {pathways.map((pathway, index) => (
              <Reveal key={pathway.title} delay={index * 0.08}>
                <article className="h-full rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/20 text-brand-200"><pathway.icon size={23} /></div>
                  <h3 className="mt-6 text-xl font-bold">{pathway.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-100/70">{pathway.description}</p>
                  <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-200">Discuss your workflow <ArrowRight size={16} /></a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="ways-to-work" className="bg-white py-20 md:py-28">
        <div className="container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Ways to work together"
              title={<>Meet your practice where it is, with the support it needs.</>}
              subtitle="Choose the level of partnership that fits your current team, workflow, and priorities. We confirm the final scope before onboarding."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="grid grid-cols-2 gap-3">
              {models.map((item, index) => (
                <button key={item.label} type="button" onClick={() => setActiveModel(index)} className={`rounded-2xl border p-5 text-left transition-all ${activeModel === index ? 'border-brand-500 bg-brand-50 shadow-premium' : 'border-navy-100 bg-white hover:border-brand-200'}`}>
                  <span className="text-sm font-semibold text-brand-700">{item.label}</span>
                  <span className="mt-2 block text-sm font-semibold text-navy-900">{index === 0 ? 'Your team' : index === 1 ? 'Shared support' : index === 2 ? 'Dedicated partner' : 'Flexible start'}</span>
                </button>
              ))}
            </div>
            <Reveal key={model.label}>
              <article className="rounded-3xl bg-navy-50 p-7 md:p-9">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{model.label}</p>
                <h3 className="mt-3 text-2xl font-bold text-navy-900">{model.title}</h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-navy-700/75">{model.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {model.points.map((point) => <li key={point} className="flex gap-2 text-sm font-medium text-navy-800"><CheckCircle2 className="mt-0.5 shrink-0 text-brand-600" size={17} />{point}</li>)}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="capabilities" className="bg-navy-50/50 py-20 md:py-28">
        <div className="container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities that work as one"
              title={<>The right support for the work behind every visit.</>}
              subtitle="Start with one capability or connect several. Each support area is designed to work with the rest of your revenue-cycle workflow."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([title, description, Icon], index) => (
              <Reveal key={title} delay={(index % 3) * 0.06}>
                <article className="h-full rounded-3xl border border-navy-100/70 bg-white p-6 shadow-premium">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Icon size={23} /></div>
                  <h3 className="mt-5 text-lg font-bold text-navy-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700/70">{description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
