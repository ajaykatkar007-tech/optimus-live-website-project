import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, HelpCircle, ArrowRight } from 'lucide-react';
import { Reveal, Button } from './ui';

const FAQS = [
  {
    q: 'How long does implementation take?',
    a: 'Most practices are fully live within 2–4 weeks depending on EHR complexity and payer enrollment status. We handle the transition plan, data mapping, and staff training so there is no disruption to your daily operations or patient flow.',
  },
  {
    q: 'How is your pricing structured?',
    a: 'Our pricing is a transparent percentage of net collections, so we only succeed when you get paid. There are no hidden fees or surprise line items. After your free consultation we provide a written quote based on your specialty, volume, and current workflow.',
  },
  {
    q: 'Are you HIPAA compliant?',
    a: 'Yes. Every process, system, and team member operates under strict HIPAA safeguards. We use encrypted, access-controlled platforms, maintain Business Associate Agreements, and conduct regular compliance reviews.',
  },
  {
    q: 'What does the transition from our current billing look like?',
    a: 'We run a structured onboarding: workflow audit, EHR integration, payer re-enrollment checks if needed, and a parallel run so nothing is dropped during the switch. You keep full visibility the entire time.',
  },
  {
    q: 'What reporting will I receive?',
    a: 'You get live KPI dashboards plus scheduled reports covering clean claim rate, denial rate, AR aging, days in AR, and net collections. Your dedicated account manager walks you through the numbers regularly.',
  },
  {
    q: 'What level of support can I expect?',
    a: 'Every practice gets a dedicated account manager as your single point of contact, backed by a full RCM team. We respond to inquiries within one business day and hold regular review calls to keep your revenue cycle on track.',
  },
  {
    q: 'Do you support my specialty?',
    a: 'We support primary care, behavioral health, physical therapy, orthopedics, cardiology, urgent care, dental, home health, and many more. Our coders are trained in specialty-specific guidelines and payer nuances.',
  },
];

function FaqItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100/70 bg-white shadow-premium">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-semibold text-navy-900 sm:text-lg">{faq.q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300 ${
            isOpen ? 'rotate-45 bg-brand-600 text-white' : ''
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-navy-700/70 sm:text-base">{faq.a}</p>
          </motion.div>
        )}
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
              <span className="inline-block rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
                FAQ
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
                Questions, <span className="text-gradient">answered</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-700/70">
                Everything you need to know about working with Optimus. Still have
                questions? We&apos;re happy to walk through them on a free consultation.
              </p>
              <div className="mt-7">
                <Button variant="primary" size="lg" href="#contact" icon={<ArrowRight className="h-5 w-5" />}>
                  Book Free Consultation
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-navy-700/60">
                <HelpCircle className="h-4 w-4 text-brand-500" />
                Average response time: under 1 business day
              </div>
            </Reveal>
          </div>

          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <FaqItem faq={f} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
