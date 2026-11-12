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
    { label: 'Practices', href: '/specialties', columns: [
      { title: 'Practice support', links: [['Overview', '/specialties'], ['Family Medicine', '/specialties'], ['Primary Care', '/specialties'], ['Multi-Specialty Practices', '/specialties']] },
      { title: 'Revenue workflow', links: [['Billing & Coding', '/solutions'], ['Denial Prevention', '/capabilities'], ['AR Follow-Up', '/solutions'], ['Payment Posting', '/solutions']] },
    ] },
    { label: 'Solutions', href: '/solutions', columns: [
      { title: 'Support models', links: [['Overview', '/solutions'], ['Assessment & Action Plan', '/solutions'], ['Focused RCM Support', '/solutions'], ['Full RCM Support', '/solutions']] },
      { title: 'Capabilities', links: [['Overview', '/capabilities'], ['Maximize Revenue', '/capabilities'], ['Denial Prevention', '/capabilities'], ['Reporting & Insights', '/capabilities']] },
      { title: 'Workflow', links: [['Eligibility & Authorization', '/solutions'], ['Claims & Billing', '/solutions'], ['AR & Payment Posting', '/solutions'], ['Specialty Support', '/specialties']] },
    ] },
    { label: 'Who We Serve', href: '/specialties', columns: [
      { title: 'Specialties', links: [['Family Medicine', '/specialties'], ['Internal Medicine', '/specialties'], ['Behavioral Health', '/specialties'], ['Primary Care', '/specialties']] },
      { title: 'Practice types', links: [['Independent Practices', '/specialties'], ['Growing Groups', '/specialties'], ['Multi-Specialty Practices', '/specialties']] },
    ] },
    { label: 'Company', href: '/company', columns: [
      { title: 'About Optimus', links: [['Company Overview', '/company'], ['How We Work', '/company'], ['Security & Privacy', '/company']] },
    ] },
    { label: 'Resources', href: '/resources', columns: [
      { title: 'Learn', links: [['RCM Articles', '/resources'], ['Revenue Cycle Tools', '/#tools'], ['Company Profile', '/#contact']] },
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
                  <a href={menu.href} className="rounded-2xl bg-navy-950 p-5 text-white hover:bg-navy-900"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">Optimus RCM</p><h3 className="mt-3 text-xl font-bold">{menu.label}</h3><p className="mt-2 text-sm leading-relaxed text-navy-100/70">Explore the support and resources available for independent practices.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-200">Learn more <ArrowRight size={15} /></span></a>
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
