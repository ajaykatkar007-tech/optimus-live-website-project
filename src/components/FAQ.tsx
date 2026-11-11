import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, HelpCircle, ArrowRight } from 'lucide-react';
import { Reveal, Button } from './ui';

const FAQS = [
  { q: 'How long does implementation take?', a: 'Implementation timing depends on your practice workflows, EHR access, payer requirements, and onboarding readiness. We agree on a transition plan before work begins.' },
  { q: 'How is your pricing structured?', a: 'Pricing is discussed after we understand your practice size, payer mix, services required, and current workflow. We provide a proposal before any engagement begins.' },
  { q: 'Are you HIPAA compliant?', a: 'Yes. Optimus RCM maintains HIPAA-compliant processes and safeguards for handling Protected Health Information (PHI). We execute a Business Associate Agreement (BAA) with clients before handling PHI on their behalf.' },
  { q: 'What does the transition from our current billing look like?', a: 'We begin with a workflow review and agreed transition plan. EHR access, data transfer, payer requirements, and any parallel-run activities are confirmed with your team before implementation.' },
  { q: 'What reporting will I receive?', a: 'Reporting is agreed during onboarding and can cover claim status, denials, AR aging, days in AR, and collections, depending on the services and data available.' },
  { q: 'What level of support can I expect?', a: 'Your account support and communication cadence are agreed during onboarding, with a defined point of contact for operational questions and escalations.' },
  { q: 'Do you support my specialty?', a: 'We work with independent practices and specialty clinics. Contact us with your specialty and workflow so we can confirm service fit before engagement.' },
];

function FaqItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  const answerId = `faq-answer-${faq.q.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100/70 bg-white shadow-premium">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" aria-expanded={isOpen} aria-controls={answerId}>
        <span className="font-display text-base font-semibold text-navy-900 sm:text-lg">{faq.q}</span>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300 ${isOpen ? 'rotate-45 bg-brand-600 text-white' : ''}`}><Plus className="h-4 w-4" /></span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && <motion.div id={answerId} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <p className="px-6 pb-5 text-sm leading-relaxed text-navy-700/70 sm:text-base">{faq.a}</p>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="inline-block rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">FAQ</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-navy-900 sm:text-4xl">Questions, <span className="text-gradient">answered</span></h2>
              <p className="mt-4 text-base leading-relaxed text-navy-700/70">Everything you need to know about working with Optimus. Still have questions? We&apos;re happy to walk through them on a free consultation.</p>
              <div className="mt-7"><Button variant="primary" size="lg" href="#contact" icon={<ArrowRight className="h-5 w-5" />}>Free RCM Assessment</Button></div>
              <div className="mt-6 flex items-center gap-2 text-sm text-navy-700/60"><HelpCircle className="h-4 w-4 text-brand-500" />Contact us for a response-time estimate</div>
            </Reveal>
          </div>
          <div className="space-y-3">{FAQS.map((f, i) => <Reveal key={f.q} delay={i * 0.04}><FaqItem faq={f} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} /></Reveal>)}</div>
        </div>
      </div>
    </section>
  );
}
