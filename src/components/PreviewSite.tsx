import { useState, type ChangeEvent } from 'react';
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
  Users,
} from 'lucide-react';
import Contact from './Contact';

const capabilities = [
  ['Maximize Revenue', 'Clean claims, accurate charge capture, payment posting, and focused AR work.', FileCheck2],
  ['Denial Prevention', 'Eligibility, authorization, coding, and claim-quality checks that reduce avoidable rework.', ShieldCheck],
  ['Revenue Cycle Management', 'Billing, coding, follow-up, denials, and reporting organized around your workflow.', WalletCards],
  ['Practice Workflow', 'A practical review of your process with clear owners, actions, and next steps.', ClipboardCheck],
  ['Reporting & Insights', 'Useful revenue-cycle measures that help your team decide what to work next.', LineChart],
  ['Specialty Support', 'Flexible support shaped around your specialty, visit patterns, and payer requirements.', Stethoscope],
] as const;

const specialties = ['Family Medicine', 'Internal Medicine', 'Primary Care', 'Behavioral Health', 'Mental Health', 'Pediatrics', 'Physical Therapy', 'Orthopedics', 'Cardiology', 'Urgent Care', 'Dental', 'Home Health'];

const articles = [
  ['Three practical ways to prevent avoidable denials', 'Verify coverage, confirm authorization needs, and review recurring payer edits before claims go out.'],
  ['How to make an AR review more useful', 'Group balances by age, payer, and next action so your team can focus on the clearest recovery opportunities.'],
  ['A simple prior-authorization readiness checklist', 'Collect supporting information early and track every request until a decision and next step are recorded.'],
];

const services = ['Medical Billing', 'Medical Coding', 'AR Follow-Up', 'Denial Management', 'Insurance Eligibility', 'Charge Entry', 'Payment Posting', 'Prior Authorization', 'Credentialing', 'Provider Enrollment', 'Virtual Medical Office Support', 'Revenue Cycle Consulting'];

function Header() {
  const menus = [
    { label: 'Practices', href: '/specialties', image: '/optimus-practice-team.png', columns: [
      { title: 'Practice support', links: [['Overview', '/specialties'], ['Family Medicine', '/specialties'], ['Primary Care', '/specialties'], ['Multi-Specialty Practices', '/specialties']] },
      { title: 'Revenue workflow', links: [['Billing & Coding', '/solutions'], ['Denial Prevention', '/capabilities'], ['AR Follow-Up', '/solutions'], ['Payment Posting', '/solutions']] },
    ] },
    { label: 'Solutions', href: '/solutions', image: '/optimus-team-review.png', columns: [
      { title: 'Support models', links: [['Overview', '/solutions'], ['Assessment & Action Plan', '/solutions'], ['Focused RCM Support', '/solutions'], ['Full RCM Support', '/solutions']] },
      { title: 'Capabilities', links: [['Overview', '/capabilities'], ['Maximize Revenue', '/capabilities'], ['Denial Prevention', '/capabilities'], ['Reporting & Insights', '/capabilities']] },
      { title: 'Workflow', links: [['Eligibility & Authorization', '/solutions'], ['Claims & Billing', '/solutions'], ['AR & Payment Posting', '/solutions'], ['Specialty Support', '/specialties']] },
    ] },
    { label: 'Who We Serve', href: '/specialties', image: '/optimus-care-coordinator.png', columns: [
      { title: 'Specialties', links: [['Family Medicine', '/specialties'], ['Internal Medicine', '/specialties'], ['Behavioral Health', '/specialties'], ['Primary Care', '/specialties']] },
      { title: 'Practice types', links: [['Independent Practices', '/specialties'], ['Growing Groups', '/specialties'], ['Multi-Specialty Practices', '/specialties']] },
    ] },
    { label: 'Company', href: '/company', image: '/optimus-hero-practice.png', columns: [
      { title: 'About Optimus', links: [['Company Overview', '/company'], ['How We Work', '/company'], ['Security & Privacy', '/company']] },
    ] },
    { label: 'Resources', href: '/resources', image: '/optimus-resource-insights.png', columns: [
      { title: 'Learn', links: [['RCM Articles', '/resources'], ['Revenue Opportunity Calculator', '/revenue-calculator'], ['Revenue Cycle Tools', '/#tools'], ['Company Profile', '/#contact']] },
    ] },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-navy-100/70 bg-white/95 shadow-premium backdrop-blur-xl">
      <div className="container-px flex h-16 items-center justify-between md:h-20">
        <a href="/" className="flex items-center gap-2.5" aria-label="Optimus RCM home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-navy-900 via-brand-600 to-accent-500 text-white"><ShieldCheck className="h-5 w-5" /></span>
          <span className="font-display text-lg font-bold text-navy-900">Optimus<span className="text-brand-600"> RCM</span></span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {menus.map((menu) => (
            <div key={menu.label} className="group relative">
              <a href={menu.href} className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-navy-700 hover:bg-brand-50 hover:text-brand-700">{menu.label}<span className="text-xs text-brand-600">⌄</span></a>
              <div className="invisible absolute left-1/2 top-full z-50 w-[820px] -translate-x-1/2 rounded-b-2xl border border-navy-100 bg-white p-6 opacity-0 shadow-premium-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-[220px_1fr] gap-7">
                  <a href={menu.href} className="overflow-hidden rounded-2xl bg-navy-950 text-white hover:bg-navy-900"><img src={menu.image} alt={`${menu.label} at Optimus RCM`} className="h-24 w-full object-cover object-top opacity-90" /><div className="p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">Optimus RCM</p><h3 className="mt-2 text-xl font-bold">{menu.label}</h3><p className="mt-2 text-sm leading-relaxed text-navy-100/70">Explore the support and resources available for independent practices.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-200">Learn more <ArrowRight size={15} /></span></div></a>
                  <div className="grid gap-6 md:grid-cols-3">{menu.columns.map((column) => <div key={column.title}><p className="flex items-center gap-2 text-sm font-bold text-navy-900"><span className="text-brand-600">›</span>{column.title}</p><div className="mt-3 grid gap-2">{column.links.map(([label, href]) => <a key={label} href={href} className="text-sm text-navy-700 hover:text-brand-700">{label}</a>)}</div></div>)}</div>
                </div>
              </div>
            </div>
          ))}
          <a href="/contact" className="rounded-full px-4 py-2 text-sm font-medium text-navy-700 hover:bg-brand-50 hover:text-brand-700">Contact Us</a>
        </nav>
        <div className="hidden items-center gap-3 sm:flex"><a href="/contact" className="rounded-full px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">Request a Scope</a><a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Talk to an Expert <ArrowRight size={16} /></a></div>
        <a href="/contact" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white sm:hidden">Contact</a>
      </div>
      <div className="container-px flex gap-4 overflow-x-auto border-t border-navy-100/50 py-2 text-xs text-navy-600 lg:hidden">{menus.map((menu) => <a key={menu.label} href={menu.href} className="whitespace-nowrap">{menu.label}</a>)}<a href="/contact" className="whitespace-nowrap">Contact Us</a></div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="bg-navy-950 py-12 text-white">
      <div className="container-px grid gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div><p className="text-lg font-bold">Optimus RCM</p><p className="mt-3 max-w-sm text-sm leading-relaxed text-navy-100/70">Revenue-cycle support for independent medical practices, built around clear scope and practical outcomes.</p></div>
        <div><p className="font-semibold">Explore</p><div className="mt-3 grid gap-2 text-sm text-navy-100/70"><a href="/solutions">Solutions</a><a href="/capabilities">Capabilities</a><a href="/specialties">Specialties</a></div></div>
        <div><p className="font-semibold">Resources</p><div className="mt-3 grid gap-2 text-sm text-navy-100/70"><a href="/resources">RCM Articles</a><a href="/#support-models">Support Models</a><a href="/contact">Contact</a></div></div>
        <div><p className="font-semibold">Contact</p><div className="mt-3 grid gap-2 text-sm text-navy-100/70"><a href="mailto:ajay@optimusrcm.com">ajay@optimusrcm.com</a><span>US-focused RCM support</span></div></div>
      </div>
      <div className="container-px mt-10 border-t border-white/10 pt-5 text-xs text-navy-100/50">© 2026 Optimus RCM Solutions. All rights reserved.</div>
    </footer>
  );
}

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="bg-navy-950 py-20 text-white md:py-28"><div className="container-px max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">{eyebrow}</p><h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100/75">{text}</p></div></section>;
}

function HomePage() {
  return <>
    <section className="bg-navy-950 py-24 text-white md:py-32"><div className="container-px grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Built for independent practices</p><h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">Strengthen your practice. Keep your revenue moving.</h1><p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100/75">Optimus RCM brings practical revenue-cycle expertise, clear communication, and flexible support to the work behind every patient visit.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-400">Start a conversation <ArrowRight size={18} /></a><a href="/capabilities" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10">Explore capabilities</a></div></div><div className="relative"><div className="absolute -inset-3 rounded-[3rem] border border-brand-300/30"></div><div className="relative overflow-hidden rounded-[2.75rem] border border-white/15 bg-white/10 p-2 shadow-premium-lg"><img src="/optimus-hero-practice.png" alt="Physician and practice team reviewing a care workflow" className="aspect-[4/3] w-full rounded-[2.25rem] object-cover" /></div><div className="absolute -bottom-5 left-6 rounded-2xl border border-white/15 bg-navy-900/90 px-5 py-4 shadow-premium"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">Practice-first support</p><p className="mt-1 text-sm text-white/80">Clearer work from intake to payment.</p></div></div></div></section>
    <section className="py-20 md:py-28"><div className="container-px"><h2 className="max-w-2xl text-3xl font-bold text-navy-900 md:text-4xl">One clear place to understand how Optimus can help.</h2><p className="mt-4 max-w-2xl text-navy-700/70">Choose a page based on what you need today. The home page stays focused; the detail lives where it belongs.</p><div className="mt-12 grid gap-5 md:grid-cols-3">{[['Solutions', 'Choose a support model that fits your team.', '/solutions'], ['Capabilities', 'See the six areas that connect your revenue workflow.', '/capabilities'], ['Specialties', 'Explore support shaped around independent practices.', '/specialties']].map(([title, text, href]) => <a key={href} href={href} className="rounded-3xl border border-navy-100 bg-white p-7 shadow-premium transition hover:-translate-y-1 hover:border-brand-200"><h3 className="text-xl font-bold text-navy-900">{title}</h3><p className="mt-3 text-sm leading-relaxed text-navy-700/70">{text}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Explore <ArrowRight size={16} /></span></a>)}</div></div></section>
    <section id="tools" className="bg-navy-50/60 py-20 md:py-24"><div className="container-px"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Revenue-cycle tools</p><h2 className="mt-3 max-w-3xl text-3xl font-bold text-navy-900 md:text-4xl">Tools for the complete revenue cycle.</h2><p className="mt-4 max-w-2xl text-navy-700/70">Practical support areas that help your team keep work moving from the first claim detail to the final payment review.</p><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{[['Process-ready workflows','Keep routine billing work organized so your team can focus on the issues that need judgment.'],['Claims management','Prepare, review, correct, and follow up on claims with a clear ownership path.'],['AR management','Prioritize denied, underpaid, and unpaid balances with documented next actions.'],['Clear reporting','Use useful revenue-cycle measures to see trends and decide what to work next.'],['Works with your workflow','Adapt support around your existing systems, specialty, and practice process.']].map(([title,text])=><article key={title} className="rounded-3xl border border-navy-100 bg-white p-7 shadow-premium"><div className="h-1 w-10 rounded-full bg-accent-500"></div><h3 className="mt-5 text-xl font-bold text-navy-900">{title}</h3><p className="mt-3 leading-relaxed text-navy-700/70">{text}</p></article>)}</div></div></section>
    <section id="practice-partner" className="bg-white py-20 md:py-28"><div className="container-px grid items-center gap-10 lg:grid-cols-2"><div className="overflow-hidden rounded-[2rem] shadow-premium-lg"><img src="/optimus-practice-team.png" alt="Optimus RCM team reviewing practice workflow together" className="h-full w-full object-cover" /></div><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">A practical partner</p><h2 className="mt-3 text-3xl font-bold leading-tight text-navy-900 md:text-4xl">A stronger practice when you want one partner.</h2><div className="mt-5 h-1 w-10 rounded-full bg-accent-500"></div><p className="mt-5 leading-relaxed text-navy-700/75">Optimus support connects the revenue-cycle work behind each visit with the operational priorities your practice is managing today.</p><p className="mt-4 leading-relaxed text-navy-700/75">Start with the capability you need now and add support as your practice grows. We confirm the scope and responsibilities before onboarding.</p><div className="mt-7 flex flex-wrap gap-6 text-sm font-semibold text-brand-700"><a href="/capabilities" className="inline-flex items-center gap-2">Explore capabilities <ArrowRight size={16} /></a><a href="/contact" className="inline-flex items-center gap-2">Talk to an expert <ArrowRight size={16} /></a></div></div></div></section>\n    <section className="bg-white py-20 md:py-28"><div className="container-px grid items-center gap-10 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Built around your practice</p><h2 className="mt-3 text-3xl font-bold leading-tight text-navy-900 md:text-4xl">Support that starts with the people doing the work.</h2><div className="mt-5 h-1 w-10 rounded-full bg-accent-500"></div><p className="mt-5 leading-relaxed text-navy-700/75">Your team knows the practice best. Optimus brings organized revenue-cycle support around your existing process, priorities, and pace.</p><a href="/solutions" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">See how support fits <ArrowRight size={16} /></a></div><div className="order-first overflow-hidden rounded-[2rem] shadow-premium-lg lg:order-last"><img src="/optimus-hero-practice.png" alt="Physician and practice team reviewing a care workflow" className="h-full w-full object-cover" /></div></div></section>
    <section className="bg-navy-50/60 py-20 md:py-28"><div className="container-px grid items-center gap-10 lg:grid-cols-2"><div className="overflow-hidden rounded-[2rem] shadow-premium-lg"><img src="/optimus-team-review.png" alt="Independent practice team reviewing a revenue workflow" className="h-full w-full object-cover" /></div><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Connected operations</p><h2 className="mt-3 text-3xl font-bold leading-tight text-navy-900 md:text-4xl">Keep the workflow visible from intake to payment.</h2><div className="mt-5 h-1 w-10 rounded-full bg-accent-500"></div><p className="mt-5 leading-relaxed text-navy-700/75">Clear ownership and useful reporting help independent practices see what is moving, what is delayed, and where the next action belongs.</p><a href="/capabilities" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Explore capabilities <ArrowRight size={16} /></a></div></div></section>
    <section className="bg-white py-20 md:py-28"><div className="container-px grid items-center gap-10 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">A clear practice experience</p><h2 className="mt-3 text-3xl font-bold leading-tight text-navy-900 md:text-4xl">Make every handoff easier to understand.</h2><div className="mt-5 h-1 w-10 rounded-full bg-accent-500"></div><p className="mt-5 leading-relaxed text-navy-700/75">When teams can see the next step, follow-up becomes more consistent and the practice can spend more energy on patients and people.</p><a href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Start a conversation <ArrowRight size={16} /></a></div><div className="order-first overflow-hidden rounded-[2rem] shadow-premium-lg lg:order-last"><img src="/optimus-care-coordinator.png" alt="Practice team member welcoming a patient" className="h-full w-full object-cover" /></div></div></section>
    <section className="bg-navy-50/60 py-20"><div className="container-px"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">A practical next step</p><h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Tell us where your revenue cycle needs attention.</h2><a href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Talk to an expert <ArrowRight size={18} /></a></div></div></section>
  </>;
}

function SolutionsPage() {
  const models = [['Assessment & Action Plan', 'Review your current workflow and leave with clear priorities and next steps.'], ['Focused RCM Support', 'Bring in targeted help for denials, AR, payment posting, authorization, or another priority.'], ['Full RCM Support', 'Coordinate the agreed revenue-cycle scope with one accountable support partner.']];
  return <><PageIntro eyebrow="Solutions" title="Support that fits the way your practice works." text="Start with one priority or connect broader revenue-cycle support. The final scope, responsibilities, and pricing are confirmed before onboarding." /><section className="py-20 md:py-28"><div className="container-px"><div className="grid gap-6 md:grid-cols-3">{models.map(([title, text]) => <article key={title} className="rounded-3xl border border-navy-100 bg-white p-7 shadow-premium"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700"><CheckCircle2 /></div><h2 className="mt-5 text-xl font-bold text-navy-900">{title}</h2><p className="mt-3 text-sm leading-relaxed text-navy-700/70">{text}</p><a href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Discuss your needs <ArrowRight size={16} /></a></article>)}</div><h2 className="mt-20 text-3xl font-bold text-navy-900">Service areas</h2><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{services.map((service) => <div key={service} className="rounded-2xl border border-navy-100 bg-navy-50/40 p-4 text-sm font-semibold text-navy-800">{service}</div>)}</div></div></section></>;
}

function CapabilitiesPage() {
  return <><PageIntro eyebrow="Capabilities" title="Six capabilities that work together." text="Connect the revenue-cycle work your practice already does with the support it needs next." /><section className="py-20 md:py-28"><div className="container-px grid gap-6 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(([title, text, Icon]) => <article key={title} className="rounded-3xl border border-navy-100 bg-white p-7 shadow-premium"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Icon /></div><h2 className="mt-5 text-xl font-bold text-navy-900">{title}</h2><p className="mt-3 leading-relaxed text-navy-700/70">{text}</p><a href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Talk about this capability <ArrowRight size={16} /></a></article>)}</div></section></>;
}

function SpecialtiesPage() {
  return <><PageIntro eyebrow="Specialties" title="Support shaped around independent medical practices." text="Every specialty has different visit patterns, payer requirements, and operational pressure. Start with a conversation about yours." /><section className="py-20 md:py-28"><div className="container-px grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{specialties.map((specialty) => <article key={specialty} className="rounded-3xl border border-navy-100 bg-white p-6 shadow-premium"><h2 className="text-xl font-bold text-navy-900">{specialty} RCM</h2><p className="mt-3 text-sm leading-relaxed text-navy-700/70">Flexible support for eligibility, claims, follow-up, denials, and payment workflows.</p><a href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Discuss your workflow <ArrowRight size={16} /></a></article>)}</div></section></>;
}

function ResourcesPage() {
  return <><PageIntro eyebrow="Resources" title="Practical RCM guidance for practice teams." text="Short articles and starting points to help reduce avoidable rework and make revenue-cycle priorities clearer." /><section className="py-20 md:py-28"><div className="container-px grid gap-6 lg:grid-cols-3">{articles.map(([title, text]) => <article key={title} className="rounded-3xl border border-navy-100 bg-white p-7 shadow-premium"><p className="text-sm font-semibold text-brand-700">RCM guide</p><h2 className="mt-4 text-xl font-bold text-navy-900">{title}</h2><p className="mt-3 leading-relaxed text-navy-700/70">{text}</p><a href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Discuss this topic <ArrowRight size={16} /></a></article>)}</div></section></>;
}

function RevenueCalculatorPage() {
  const [specialty, setSpecialty] = useState('Family Medicine');
  const [physicians, setPhysicians] = useState(5);
  const [collections, setCollections] = useState(150000);
  const [arDays, setArDays] = useState(45);
  const [denialRate, setDenialRate] = useState(10);
  const annualCollections = Math.max(0, Number(collections) || 0) * 12;
  const denialOpportunity = annualCollections * Math.max(0, Number(denialRate) - 5) / 100;
  const arCash = Math.max(0, Number(collections) || 0) / 30 * (Number(arDays) || 0);
  const totalOpportunity = denialOpportunity + arCash;
  const money = (value: number) => value > 0 ? '$' + Math.round(value).toLocaleString('en-US') : '$0';
  return <><PageIntro eyebrow="Revenue-cycle check" title="How much opportunity is sitting inside your revenue cycle?" text="Answer a few questions to see an illustrative snapshot for your practice. Use the result as a starting point for a conversation with the Optimus team." />
    <section className="bg-navy-50/60 py-16 md:py-24"><div className="container-px grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-premium md:p-9"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 font-bold text-white">1</span><div><h2 className="text-2xl font-bold text-navy-900">About your practice</h2><p className="text-sm text-navy-700/70">Tell us a little about the workflow you are managing.</p></div></div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <label className="text-sm font-semibold text-navy-900">Specialty<select value={specialty} onChange={(e: ChangeEvent<HTMLSelectElement>)=>setSpecialty(e.target.value)} className="mt-2 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 font-normal"><option>Family Medicine</option><option>Internal Medicine</option><option>Primary Care</option><option>Behavioral Health</option><option>Pediatrics</option><option>Orthopedics</option><option>Cardiology</option><option>Other specialty</option></select></label>
          <label className="text-sm font-semibold text-navy-900">Physicians<input type="number" min="1" max="100" value={physicians} onChange={(e: ChangeEvent<HTMLInputElement>)=>setPhysicians(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 font-normal" /><span className="mt-2 block text-xs font-normal text-navy-700/60">Approximate number of providers</span></label>
        </div>
        <div className="mt-8 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 font-bold text-white">2</span><div><h2 className="text-2xl font-bold text-navy-900">Your revenue cycle</h2><p className="text-sm text-navy-700/70">Rough numbers are fine. Your estimate updates as you type.</p></div></div>
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <label className="text-sm font-semibold text-navy-900">Monthly collections<input type="number" min="0" value={collections} onChange={(e: ChangeEvent<HTMLInputElement>)=>setCollections(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 font-normal" /><span className="mt-2 block text-xs font-normal text-navy-700/60">Payments received across payers</span></label>
          <label className="text-sm font-semibold text-navy-900">Days in accounts receivable<input type="range" min="15" max="120" value={arDays} onChange={(e: ChangeEvent<HTMLInputElement>)=>setArDays(Number(e.target.value))} className="mt-5 w-full accent-brand-600" /><span className="mt-2 block text-sm font-normal text-navy-700/70">{arDays} days</span></label>
          <label className="text-sm font-semibold text-navy-900 md:col-span-2">Initial claim denial rate<input type="range" min="0" max="30" value={denialRate} onChange={(e: ChangeEvent<HTMLInputElement>)=>setDenialRate(Number(e.target.value))} className="mt-5 w-full accent-brand-600" /><span className="mt-2 block text-sm font-normal text-navy-700/70">{denialRate}% (5% reference target)</span></label>
        </div>
      </div>
      <aside className="h-fit rounded-3xl bg-navy-900 p-7 text-white shadow-premium-lg md:p-9"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Your revenue snapshot</p><h2 className="mt-3 text-3xl font-bold">Illustrative opportunity</h2><p className="mt-3 text-sm leading-relaxed text-white/70">Based on {physicians || 0} providers in {specialty}. This is an estimate, not a guarantee.</p><div className="mt-8 divide-y divide-white/15 rounded-2xl border border-white/15"><div className="flex items-center justify-between p-4"><span className="text-sm text-white/70">Estimated annual collections</span><strong>{money(annualCollections)}</strong></div><div className="flex items-center justify-between p-4"><span className="text-sm text-white/70">Denial opportunity above 5%</span><strong>{money(denialOpportunity)}</strong></div><div className="flex items-center justify-between p-4"><span className="text-sm text-white/70">Cash currently in A/R</span><strong>{money(arCash)}</strong></div><div className="flex items-center justify-between p-4 text-brand-200"><span className="text-sm">Illustrative opportunity</span><strong className="text-xl">{money(totalOpportunity)}</strong></div></div><p className="mt-5 text-xs leading-relaxed text-white/55">Results vary by specialty, payer mix, staffing, and workflow. Optimus does not guarantee specific financial outcomes.</p></aside>
    </div></section>
    <section className="bg-white py-20 md:py-28"><div className="container-px"><div className="mx-auto max-w-3xl rounded-3xl border border-navy-100 bg-white p-8 text-center shadow-premium md:p-12"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Next step</p><h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Want to understand what is driving the opportunity?</h2><p className="mx-auto mt-4 max-w-2xl leading-relaxed text-navy-700/70">Share your snapshot with our team and we can discuss practical priorities for your practice.</p><a href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">Request a conversation <ArrowRight size={18} /></a></div></div></section>
  </>;
}

function CompanyPage() {
  return <><PageIntro eyebrow="Company" title="A practical partner for independent practice performance." text="Optimus RCM helps practices organize the work behind billing, collections, and revenue-cycle improvement with clear communication and an agreed scope." /><section className="py-20 md:py-28"><div className="container-px grid gap-10 md:grid-cols-3"><div><h2 className="text-xl font-bold text-navy-900">How we work</h2><p className="mt-3 text-sm leading-relaxed text-navy-700/70">Review the workflow, agree on priorities, and improve with transparent follow-up.</p></div><div><h2 className="text-xl font-bold text-navy-900">Security conversation</h2><p className="mt-3 text-sm leading-relaxed text-navy-700/70">We discuss workflow, access, agreements, and security requirements before onboarding.</p></div><div><h2 className="text-xl font-bold text-navy-900">Clear expectations</h2><p className="mt-3 text-sm leading-relaxed text-navy-700/70">Scope, pricing, responsibilities, and implementation details are confirmed in writing.</p></div></div></section></>;
}

export default function PreviewSite() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const page = path === '/solutions' ? <SolutionsPage /> : path === '/capabilities' ? <CapabilitiesPage /> : path === '/specialties' ? <SpecialtiesPage /> : path === '/resources' ? <ResourcesPage /> : path === '/revenue-calculator' ? <RevenueCalculatorPage /> : path === '/company' ? <CompanyPage /> : path === '/contact' ? <Contact /> : <HomePage />;
  return <div className="min-h-screen bg-white"><Header /><main>{page}</main><Footer /></div>;
}
