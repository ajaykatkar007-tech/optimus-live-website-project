import { BarChart3, ShieldCheck, Users } from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const PRINCIPLES = [
  { icon: Users, title: 'A responsive partner', text: 'Your team gets a practical point of contact who understands the workflow behind the numbers.' },
  { icon: BarChart3, title: 'Visibility that helps', text: 'Clear revenue-cycle conversations make it easier to see what needs attention and why.' },
  { icon: ShieldCheck, title: 'Careful by design', text: 'We build disciplined processes around billing, follow-up, denials, and sensitive practice information.' },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-navy-950 py-20 text-white md:py-28">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <SectionHeading dark eyebrow="About Optimus" title={<>Revenue-cycle support built around <span className="text-gradient-light">the work that matters.</span></>} subtitle="Optimus RCM Solutions helps healthcare practices bring more structure, visibility, and follow-through to the revenue cycle." />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-base leading-8 text-navy-100/75">We focus on the operational details that keep a practice moving: accurate billing and coding, steady AR follow-up, denial awareness, eligibility work, and communication you can act on. The goal is a revenue cycle that supports patient care instead of competing with it.</p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, title, text }) => (
            <Reveal key={title}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <Icon className="h-6 w-6 text-brand-300" />
                <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-navy-100/70">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}