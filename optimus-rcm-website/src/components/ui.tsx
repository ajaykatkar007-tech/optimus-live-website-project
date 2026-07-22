import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

/* ---------------- Reveal ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- SectionHeading ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  dark?: boolean;
}) {
  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <span
          className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ${
            dark
              ? 'bg-white/10 text-brand-200'
              : 'bg-brand-50 text-brand-700'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl font-bold sm:text-4xl md:text-[2.75rem] md:leading-[1.1] ${
          dark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? 'text-navy-100/80' : 'text-navy-700/70'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------------- AnimatedCounter ---------------- */
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------------- Button ---------------- */
type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'light';
  size?: 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon,
}: ButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none';
  const sizes = {
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };
  const variants = {
    primary:
      'bg-brand-600 text-white shadow-premium-lg hover:bg-brand-700 hover:shadow-glow hover:-translate-y-0.5',
    secondary:
      'bg-white text-navy-900 border border-navy-100 shadow-premium hover:border-brand-200 hover:-translate-y-0.5 hover:shadow-premium-lg',
    ghost: 'text-navy-700 hover:text-brand-600',
    light:
      'bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5',
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {content}
    </button>
  );
}

/* ---------------- Card ---------------- */
export function Card({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border border-navy-100/70 bg-white shadow-premium ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg hover:border-brand-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
