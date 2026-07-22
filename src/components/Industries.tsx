import { motion } from 'framer-motion';
import {
  Stethoscope,
  HeartPulse,
  Brain,
  Baby,
  Dumbbell,
  Bone,
  Heart,
  Ambulance,
  Smile,
  Home,
  Activity,
  Building2,
} from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const INDUSTRIES = [
  { icon: Stethoscope, label: 'Primary Care' },
  { icon: HeartPulse, label: 'Family Medicine' },
  { icon: Activity, label: 'Internal Medicine' },
  { icon: Brain, label: 'Behavioral Health' },
  { icon: Heart, label: 'Mental Health' },
  { icon: Baby, label: 'Pediatrics' },
  { icon: Dumbbell, label: 'Physical Therapy' },
  { icon: Bone, label: 'Orthopedics' },
  { icon: HeartPulse, label: 'Cardiology' },
  { icon: Ambulance, label: 'Urgent Care' },
  { icon: Smile, label: 'Dental' },
  { icon: Home, label: 'Home Health' },
];

export default function Industries() {
  return (
    <section id="industries" className="relative py-20 md:py-28">
      <div className="container-px">
        <Reveal>
          <SectionHeading
            eyebrow="Industries We Serve"
            title={
              <>
                Specialty expertise across{' '}
                <span className="text-gradient">every kind of practice</span>
              </>
            }
            subtitle="From independent physicians and specialty clinics to behavioral health, urgent care, dental, and home health — we understand the payer mix, coding nuances, and compliance demands of each specialty we serve, for practices of every size across the US."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.label} delay={(i % 4) * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group flex h-full flex-col items-center gap-3 rounded-3xl border border-navy-100/70 bg-white p-6 text-center shadow-premium transition-all duration-300 hover:border-brand-200 hover:shadow-premium-lg"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-navy-50 text-brand-600 transition-all duration-300 group-hover:from-navy-900 group-hover:to-brand-600 group-hover:text-white">
                  <ind.icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <span className="font-display text-sm font-semibold text-navy-900">{ind.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex items-center justify-center gap-3 rounded-2xl border border-navy-100 bg-navy-50/50 px-6 py-4 text-center text-sm text-navy-700/70">
            <Building2 className="h-5 w-5 shrink-0 text-brand-600" />
            From independent physicians and specialty clinics to behavioral health, urgent care, dental, home health, and growing healthcare organizations — we serve practices of every size across the United States.
            <a href="#contact" className="font-semibold text-brand-600 hover:text-brand-700">Talk to us →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
