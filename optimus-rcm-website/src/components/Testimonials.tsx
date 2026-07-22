import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const TESTIMONIALS = [
  {
    quote:
      'Our denial rate dropped by more than half within the first quarter. Optimus found revenue we didn\'t even know we were leaving on the table. Cash flow has never been this predictable.',
    name: 'Dr. Amanda Reyes',
    role: 'Internal Medicine, 6-provider group',
    initials: 'AR',
  },
  {
    quote:
      'The dedicated account manager model is a game changer. I have one person who actually knows my practice and my payers. No more starting over every time I call billing.',
    name: 'Marcus Bennett',
    role: 'Practice Manager, Behavioral Health Clinic',
    initials: 'MB',
  },
  {
    quote:
      'We were drowning in aging AR before Optimus took over. Within four months our AR days came down dramatically and collections were up. The reporting is transparent and honest.',
    name: 'Dr. Priya Nair',
    role: 'Owner, Specialty Orthopedics Practice',
    initials: 'PN',
  },
  {
    quote:
      'Transitioning our billing was the part I dreaded most. Optimus made it seamless — no disruption to patients, no lost claims, and we were fully live faster than expected.',
    name: 'James Whitfield',
    role: 'Administrator, Urgent Care Network',
    initials: 'JW',
  },
  {
    quote:
      'Their coding team understands our specialty nuances better than anyone we\'ve worked with. Cleaner claims, fewer denials, faster payments. It\'s that simple.',
    name: 'Dr. Lillian Cho',
    role: 'Physical Therapy & Rehab',
    initials: 'LC',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative bg-navy-50/40 py-20 md:py-28">
      <div className="container-px">
        <Reveal>
          <SectionHeading
            eyebrow="Client Stories"
            title={
              <>
                Practices that trust us with{' '}
                <span className="text-gradient">their revenue</span>
              </>
            }
            subtitle="Real outcomes from physicians, practice owners, and administrators who partnered with Optimus."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="relative overflow-hidden rounded-4xl border border-navy-100/70 bg-white p-8 shadow-premium-lg md:p-12">
              <Quote className="absolute right-8 top-8 h-16 w-16 text-brand-100" />
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="flex gap-1 text-warning-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-navy-900 sm:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-7 flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-navy-900 to-brand-600 font-display text-sm font-bold text-white">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-navy-900">{t.name}</div>
                      <div className="text-sm text-navy-700/60">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-navy-100 bg-white text-navy-700 shadow-premium transition hover:bg-brand-50 hover:text-brand-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-8 bg-brand-600' : 'w-2 bg-navy-200 hover:bg-navy-300'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-navy-100 bg-white text-navy-700 shadow-premium transition hover:bg-brand-50 hover:text-brand-600"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
