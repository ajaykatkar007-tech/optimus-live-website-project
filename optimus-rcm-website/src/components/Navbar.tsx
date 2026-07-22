import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from './ui';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Optimus', href: '#why' },
  { label: 'Process', href: '#process' },
  { label: 'Industries', href: '#industries' },
  { label: 'Results', href: '#results' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItemClasses = scrolled
    ? 'rounded-full px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-brand-50 hover:text-brand-700'
    : 'rounded-full px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 hover:text-white';

  const mobileLinkClasses = scrolled
    ? 'rounded-xl px-4 py-3 text-sm font-medium text-navy-700 hover:bg-brand-50'
    : 'rounded-xl px-4 py-3 text-sm font-medium text-white hover:bg-white/10';

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-navy-100/70 bg-white/85 backdrop-blur-xl shadow-premium'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between md:h-20">
        <a href="#home" className="flex items-center gap-2.5" aria-label="Optimus RCM Solutions home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-navy-900 via-brand-600 to-accent-500 text-white shadow-glow">
            <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span
            className={`font-display text-lg font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-navy-900' : 'text-white'
            }`}
          >
            Optimus<span className={scrolled ? 'text-brand-600' : 'text-teal-200'}> RCM</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={navItemClasses}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant={scrolled ? 'ghost' : 'light'}
            size="md"
            href="#contact"
            className={scrolled ? '' : 'text-white'}
          >
            Get a Free Assessment
          </Button>
          <Button variant="primary" size="md" href="#contact" icon={<ArrowRight className="h-4 w-4" />}>
            Book Free Consultation
          </Button>
        </div>

        <button
          type="button"
          className={`grid h-10 w-10 place-items-center rounded-xl lg:hidden ${
            scrolled ? 'text-navy-900' : 'text-white'
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-navy-100 bg-white lg:hidden"
          >
            <div className="container-px flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-navy-700 hover:bg-brand-50"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2.5">
                <Button variant="secondary" href="#contact" onClick={() => setOpen(false)}>
                  Get a Free Assessment
                </Button>
                <Button variant="primary" href="#contact" onClick={() => setOpen(false)} icon={<ArrowRight className="h-4 w-4" />}>
                  Book Free Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
