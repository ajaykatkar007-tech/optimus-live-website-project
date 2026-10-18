import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Zap,
  UserCog,
  TrendingUp,
  Clock,
  FileCheck2,
  BarChart3,
  MapPin,
} from 'lucide-react';
import { Button } from './ui';

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Security-minded workflows' },
  { icon: Users, label: 'Experienced RCM Team' },
  { icon: Zap, label: 'Faster Payments' },
  { icon: UserCog, label: 'Dedicated Account Manager' },
];

const KPI_CARDS = [
  { icon: FileCheck2, value: 'Clean', label: 'Claims workflows', accent: 'from-brand-500 to-brand-700' },
  { icon: Zap, value: 'Active', label: 'Payer follow-up', accent: 'from-accent-500 to-brand-600' },
  { icon: Clock, value: 'Focused', label: 'AR work queues', accent: 'from-success-500 to-brand-600' },
  { icon: BarChart3, value: 'Clear', label: 'Revenue visibility', accent: 'from-navy-700 to-brand-600' },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-mesh pt-28 pb-20 md:pt-36 md:pb-28">
      {/* glow orbs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl" />

      <div className="container-px relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-100 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success-400" />
              </span>
              Premium Revenue Cycle Management
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              Turn your revenue cycle{' '}
              <span className="text-gradient-light">into a growth engine.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-navy-100/80 sm:text-lg lg:mx-0"
            >
              Helping medical practices improve cash flow with accurate medical
              billing, faster reimbursements, and proactive Revenue Cycle Management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 flex items-center gap-2 text-sm text-navy-100/60 lg:justify-start justify-center"
            >
              <MapPin className="h-4 w-4 text-brand-300" />
              Trusted by independent physicians, specialty clinics, and growing healthcare organizations across the United States
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
            >
              <Button variant="primary" size="lg" href="#contact" icon={<ArrowRight className="h-5 w-5" />}>
                Book Free Consultation
              </Button>
              <Button variant="light" size="lg" href="#assessment">
                Get a Free RCM Assessment
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
            >
              {TRUST_BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-sm font-medium text-navy-100/75">
                  <b.icon className="h-4 w-4 text-brand-300" />
                  {b.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating KPI cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {KPI_CARDS.map((k, i) => (
                <motion.div
                  key={k.label}
                  animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0] }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className={`glass-card-dark rounded-3xl p-5 sm:p-6 ${i % 2 === 1 ? 'mt-6' : ''}`}
                >
                  <div className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${k.accent} shadow-glow`}>
                    <k.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                    {k.value}
                  </div>
                  <div className="mt-1 text-sm text-navy-100/70">{k.label}</div>
                </motion.div>
              ))}
            </div>

            {/* floating mini stat */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <TrendingUp className="h-4 w-4 text-success-400" />
                Practical RCM support for growing practices
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
