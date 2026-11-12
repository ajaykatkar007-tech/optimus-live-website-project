import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  FileText,
  Stethoscope,
} from 'lucide-react';
import { Reveal } from './ui';

const packages = [
  {
    title: 'Full RCM Support',
    description: 'A coordinated revenue-cycle partner for practices that want support across the billing workflow.',
    items: ['Eligibility and benefits', 'Charge entry and claims', 'Payment posting and AR follow-up', 'Denial prevention and reporting'],
  },
  {
    title: 'Focused RCM Support',
    description: 'Targeted help for the part of your workflow that needs attention first.',
    items: ['Denial management', 'AR cleanup and follow-up', 'Payment posting support', 'Prior authorization support'],
  },
  {
    title: 'Assessment & Action Plan',
    description: 'A practical review that turns current workflow gaps into a clear improvement plan.',
    items: ['Workflow review', 'Priority opportunities', 'Recommended next steps', 'Written scope before onboarding'],
  },
];

const specialties = [
  ['Family Medicine RCM', 'Support for high-volume primary care workflows, eligibility checks, clean claims, and consistent follow-up.'],
  ['Internal Medicine RCM', 'Organized billing support for complex visits, recurring care, documentation checks, and outstanding balances.'],
  ['Primary Care RCM', 'A steady process for preventive care, office visits, authorizations, and timely claim resolution.'],
  ['Behavioral Health RCM', 'Careful support for recurring services, payer requirements, authorization tracking, and denial prevention.'],
  ['Multi-Specialty Practice RCM', 'Flexible workflows that help independent practices coordinate different providers, payers, and service lines.'],
];

const articles = [
  {
    title: 'Three practical ways to prevent avoidable denials',
    text: 'Denial prevention starts before a claim is submitted. Confirm coverage, check required authorization, and make sure the claim tells a consistent story.',
    points: ['Verify coverage before the visit', 'Track authorization requirements', 'Review recurring denial patterns'],
  },
  {
    title: 'How to make an AR review more useful',
    text: 'An AR report becomes useful when it leads to action. Group balances by age, payer, and next step so the team knows what to work first.',
    points: ['Separate actionable from low-value balances', 'Prioritize older and higher-value accounts', 'Document follow-up ownership'],
  },
  {
    title: 'A simple prior-authorization readiness checklist',
    text: 'A small checklist can prevent avoidable delays. Gather the clinical and payer information early, then track each request until a decision is recorded.',
    points: ['Confirm payer requirements', 'Collect supporting documentation', 'Record status and next action'],
  },
];

export default function GrowthSections() {
  return (
    <>
      <section id="support-models" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">Support models</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">Choose the level of RCM support your practice needs</h2>
              <p className="mt-4 text-slate-600">Start with a focused need or build a broader support model. Scope and pricing are confirmed in writing before onboarding.</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                    {index === 0 ? <BarChart3 size={22} /> : index === 1 ? <Stethoscope size={22} /> : <FileText size={22} />}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-slate-600">{item.description}</p>
                  <ul className="mt-5 space-y-3">
                    {item.items.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 shrink-0 text-teal-600" size={17} />{point}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="specialties" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">Specialty expertise</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">RCM support shaped around independent practices</h2>
              <p className="mt-4 text-slate-600">Our process can be tailored to the payer mix, visit patterns, and operational priorities of your specialty.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {specialties.map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.05}>
                <article id={`specialty-${title.toLowerCase().replaceAll(' ', '-')}`} className="h-full rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                  <p className="mt-3 text-slate-600">{text}</p>
                  <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-700">Discuss your workflow <ArrowRight size={16} /></a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">RCM resources</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">Practical guidance for cleaner revenue-cycle workflows</h2>
              <p className="mt-4 text-slate-600">Short, useful articles for practice owners and teams improving billing operations.</p>
            </div>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.title} delay={index * 0.08}>
                <article id={`article-${index}`} className="h-full rounded-2xl border border-slate-200 p-7">
                  <div className="flex items-center gap-2 text-sm font-semibold text-teal-700"><FileText size={17} /> RCM guide</div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">{article.title}</h3>
                  <p className="mt-3 text-slate-600">{article.text}</p>
                  <ul className="mt-5 space-y-2">
                    {article.points.map((point) => <li key={point} className="text-sm text-slate-700">• {point}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">Calendar booking</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Talk through your practice’s RCM priorities</h2>
            <p className="mt-4 text-slate-300">A calendar link will be added here once the booking account is ready. For now, request a convenient time by email.</p>
          </div>
          <a href="mailto:ajay@optimusrcm.com?subject=Book%20an%20RCM%20consultation" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-teal-300">Request a time <CalendarDays size={18} /></a>
        </div>
      </section>
    </>
  );
}
