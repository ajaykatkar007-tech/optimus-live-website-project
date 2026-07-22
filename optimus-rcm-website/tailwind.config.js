/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d9ff',
          300: '#9bbcff',
          400: '#6b96f7',
          500: '#4a72ee',
          600: '#3355db',
          700: '#2a43b0',
          800: '#1f3384',
          900: '#0b1f4d',
          950: '#070f2e',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        success: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        error: {
          400: '#f87171',
          500: '#ef4444',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        premium: '0 4px 20px -2px rgba(11, 31, 77, 0.06), 0 2px 8px -2px rgba(11, 31, 77, 0.04)',
        'premium-lg': '0 20px 50px -12px rgba(11, 31, 77, 0.12), 0 8px 24px -8px rgba(11, 31, 77, 0.08)',
        'premium-xl': '0 30px 80px -20px rgba(11, 31, 77, 0.18)',
        glow: '0 0 40px -10px rgba(59, 130, 246, 0.35)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'grid-navy': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'radial-fade': 'radial-gradient(ellipse at top, rgba(59,130,246,0.15), transparent 60%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(59,130,246,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(59,130,246,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
