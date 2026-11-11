# Optimus RCM Solutions

Premium medical billing & Revenue Cycle Management website for independent physicians, specialty clinics, behavioral health providers, urgent care centers, physical therapy clinics, dental practices, and growing healthcare organizations across the United States.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (build tool / dev server)
- **Tailwind CSS 3** (design system, custom navy/blue theme)
- **Framer Motion** (animations, scroll reveals, carousels)
- **Lucide React** (icons)

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Build

```bash
npm run build      # production build to dist/
npm run typecheck   # TypeScript type checking
npm run preview     # preview the production build
```

## Contact submissions

The contact form is handled by Netlify Forms. Submissions are available in the Netlify site dashboard under **Forms**.

## Project Structure

```
src/
  components/
    Navbar.tsx
    Hero.tsx
    ProblemSection.tsx
    Services.tsx
    WhyChooseUs.tsx
    Process.tsx
    Industries.tsx
    Results.tsx
    Testimonials.tsx
    Calculators.tsx
    ConversionSection.tsx
    FAQ.tsx
    Contact.tsx
    Footer.tsx
    ui.tsx              # Reusable primitives (Button, Card, Reveal, AnimatedCounter, SectionHeading)
  lib/
    supabase.ts         # Supabase client + submitConsultationRequest()
  App.tsx
  main.tsx
  index.css
```

## Features

- Hero with floating animated KPI cards
- Problem → Solution narrative
- 12 service cards with hover animations
- 8 outcome-focused "Why Choose Optimus" cards
- Interactive 9-step revenue cycle timeline
- 12 specialty industry cards
- Animated result counters (99%, 35%, 40%, 98%)
- Auto-rotating testimonial carousel
- 4 interactive calculators (ROI, Revenue Loss, Denial Rate, AR Days)
- Conversion CTAs (Free Assessment, Schedule Demo, Download Profile)
- Insights + Newsletter sections
- 7-question FAQ accordion
- Contact form with Supabase persistence + success/error states
- SEO meta, Open Graph, JSON-LD schema
- Fully responsive, accessible, HIPAA-focused messaging
