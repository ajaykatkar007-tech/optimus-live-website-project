import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  TrendingDown,
  Clock,
  DollarSign,
  ArrowRight,
  Info,
} from 'lucide-react';
import { Reveal, SectionHeading, Button } from './ui';

type Tab = 'roi' | 'revenue' | 'denial' | 'ar';

const TABS: { id: Tab; label: string; icon: typeof Calculator }[] = [
  { id: 'roi', label: 'ROI Calculator', icon: Calculator },
  { id: 'revenue', label: 'Revenue Loss', icon: TrendingDown },
  { id: 'denial', label: 'Denial Rate', icon: DollarSign },
  { id: 'ar', label: 'AR Days', icon: Clock },
];

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy-700/80">{label}</span>
      <div className="mt-1.5 flex items-center rounded-2xl border border-navy-100 bg-white px-4 py-3 shadow-premium transition focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
        {prefix && <span className="text-navy-700/50">{prefix}</span>}
        <input
          type="number"
          value={value}
          step={step}
          min={min}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent px-2 text-lg font-semibold text-navy-900 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && <span className="text-navy-700/50">{suffix}</span>}
      </div>
    </label>
  );
}

function ResultStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-brand-800 p-5 text-white shadow-premium-lg">
      <div className="text-xs font-medium uppercase tracking-wider text-brand-200">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold">{value}</div>
      {sub && <div className="mt-1 text-xs text-navy-100/60">{sub}</div>}
    </div>
  );
}

function RoiCalc() {
  const [monthly, setMonthly] = useState(120000);
  const [currentRate, setCurrentRate] = useState(92);
  const [optimusRate, setOptimusRate] = useState(98);
  const [fee, setFee] = useState(5);

  const recovered = useMemo(() => {
    const currentCollect = monthly * (currentRate / 100);
    const optimusCollect = monthly * (optimusRate / 100);
    const gain = optimusCollect - currentCollect;
    const annualGain = gain * 12;
    const annualFee = optimusCollect * 12 * (fee / 100);
    const net = annualGain - annualFee;
    return { annualGain, annualFee, net, monthlyGain: gain };
  }, [monthly, currentRate, optimusRate, fee]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Field label="Monthly billed charges" value={monthly} onChange={setMonthly} prefix="$" step={1000} />
        <Field label="Current collection rate" value={currentRate} onChange={setCurrentRate} suffix="%" step={0.5} />
        <Field label="Expected Optimus collection rate" value={optimusRate} onChange={setOptimusRate} suffix="%" step={0.5} />
        <Field label="Optimus fee (% of collections)" value={fee} onChange={setFee} suffix="%" step={0.5} />
      </div>
      <div className="space-y-3">
        <ResultStat label="Additional monthly collections" value={`$${Math.round(recovered.monthlyGain).toLocaleString()}`} />
        <ResultStat label="Annual revenue gain" value={`$${Math.round(recovered.annualGain).toLocaleString()}`} />
        <ResultStat label="Estimated annual fee" value={`$${Math.round(recovered.annualFee).toLocaleString()}`} sub="You only pay on collected revenue" />
        <div className="rounded-2xl border-2 border-success-500/30 bg-success-500/10 p-5">
          <div className="text-xs font-medium uppercase tracking-wider text-success-600">Net annual benefit</div>
          <div className="mt-1 font-display text-3xl font-bold text-success-600">
            ${Math.round(recovered.net).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueLossCalc() {
  const [annual, setAnnual] = useState(1500000);
  const [leakage, setLeakage] = useState(7);

  const lost = annual * (leakage / 100);
  const recovered = lost * 0.7;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Field label="Annual billed charges" value={annual} onChange={setAnnual} prefix="$" step={10000} />
        <Field label="Estimated revenue leakage" value={leakage} onChange={setLeakage} suffix="%" step={0.5} />
      </div>
      <div className="space-y-3">
        <ResultStat label="Annual revenue lost" value={`$${Math.round(lost).toLocaleString()}`} sub="From under-coding, missed charges, uncollected balances" />
        <div className="rounded-2xl border-2 border-success-500/30 bg-success-500/10 p-5">
          <div className="text-xs font-medium uppercase tracking-wider text-success-600">Recoverable with Optimus</div>
          <div className="mt-1 font-display text-3xl font-bold text-success-600">
            ${Math.round(recovered).toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-navy-700/60">Estimated based on typical client outcomes</div>
        </div>
      </div>
    </div>
  );
}

function DenialCalc() {
  const [claims, setClaims] = useState(800);
  const [denialRate, setDenialRate] = useState(12);
  const [avgClaim, setAvgClaim] = useState(180);

  const denied = claims * (denialRate / 100);
  const deniedValue = denied * avgClaim;
  const recoverable = deniedValue * 0.65;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Field label="Monthly claims submitted" value={claims} onChange={setClaims} step={10} />
        <Field label="Current denial rate" value={denialRate} onChange={setDenialRate} suffix="%" step={0.5} />
        <Field label="Average claim value" value={avgClaim} onChange={setAvgClaim} prefix="$" step={10} />
      </div>
      <div className="space-y-3">
        <ResultStat label="Denied claims / month" value={Math.round(denied).toLocaleString()} />
        <ResultStat label="Denied value / month" value={`$${Math.round(deniedValue).toLocaleString()}`} />
        <div className="rounded-2xl border-2 border-success-500/30 bg-success-500/10 p-5">
          <div className="text-xs font-medium uppercase tracking-wider text-success-600">Recoverable via denial mgmt</div>
          <div className="mt-1 font-display text-3xl font-bold text-success-600">
            ${Math.round(recoverable).toLocaleString()}/mo
          </div>
        </div>
      </div>
    </div>
  );
}

function ArCalc() {
  const [arBalance, setArBalance] = useState(450000);
  const [monthlyCharges, setMonthlyCharges] = useState(120000);
  const [currentDays, setCurrentDays] = useState(48);
  const [targetDays, setTargetDays] = useState(32);

  const improvement = currentDays - targetDays;
  const freed = (arBalance * improvement) / currentDays;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Field label="Total AR balance" value={arBalance} onChange={setArBalance} prefix="$" step={5000} />
        <Field label="Monthly charges" value={monthlyCharges} onChange={setMonthlyCharges} prefix="$" step={1000} />
        <Field label="Current days in AR" value={currentDays} onChange={setCurrentDays} suffix=" days" step={1} />
        <Field label="Target days in AR" value={targetDays} onChange={setTargetDays} suffix=" days" step={1} />
      </div>
      <div className="space-y-3">
        <ResultStat label="Days in AR improvement" value={`${Math.max(0, improvement)} days`} />
        <div className="rounded-2xl border-2 border-success-500/30 bg-success-500/10 p-5">
          <div className="text-xs font-medium uppercase tracking-wider text-success-600">Cash accelerated</div>
          <div className="mt-1 font-display text-3xl font-bold text-success-600">
            ${Math.max(0, Math.round(freed)).toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-navy-700/60">One-time cash freed by shortening AR cycle</div>
        </div>
      </div>
    </div>
  );
}

export default function Calculators() {
  const [tab, setTab] = useState<Tab>('roi');

  return (
    <section id="assessment" className="relative bg-navy-50/40 py-20 md:py-28">
      <div className="container-px">
        <Reveal>
          <SectionHeading
            eyebrow="Free RCM Calculators"
            title={
              <>
                See what your practice is{' '}
                <span className="text-gradient">leaving on the table</span>
              </>
            }
            subtitle="Estimate the revenue you could recover with a stronger revenue cycle. These are ballpark figures — your free consultation gives you exact numbers."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  tab === t.id
                    ? 'bg-navy-900 text-white shadow-premium-lg'
                    : 'bg-white text-navy-700 shadow-premium hover:bg-brand-50 hover:text-brand-700'
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mt-8 max-w-4xl rounded-4xl border border-navy-100/70 bg-white p-6 shadow-premium-lg md:p-10"
          >
            {tab === 'roi' && <RoiCalc />}
            {tab === 'revenue' && <RevenueLossCalc />}
            {tab === 'denial' && <DenialCalc />}
            {tab === 'ar' && <ArCalc />}

            <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl bg-brand-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 text-sm text-navy-700/70">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span>Want exact numbers for your practice? Get a free, no-obligation RCM assessment.</span>
              </div>
              <Button variant="primary" href="#contact" icon={<ArrowRight className="h-4 w-4" />}>
                Get My Assessment
              </Button>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
