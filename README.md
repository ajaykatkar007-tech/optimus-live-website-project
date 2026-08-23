# Optimus RCM Solutions

Premium medical billing & Revenue Cycle Management website for independent physicians, specialty clinics, behavioral health providers, urgent care centers, physical therapy clinics, dental practices, and growing healthcare organizations across the United States.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (build tool / dev server)
- **Tailwind CSS 3** (design system, custom navy/blue theme)
- **Framer Motion** (animations, scroll reveals, carousels)
- **Lucide React** (icons)
- **Supabase** (contact form lead storage with RLS)

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

## Environment Variables

Create a `.env` file (already provided in the Bolt environment):

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## Database

The `consultation_requests` table stores leads from the contact form. The SQL migration is in `migrations/20260719134538_create_consultation_requests.sql`. Apply it via the Supabase MCP `apply_migration` tool (not the CLI).

### RLS Policies

- **INSERT** (anon + authenticated): validates name, email format, source whitelist, and message length.
- **SELECT** (authenticated only): staff can read all leads.
- **UPDATE** (authenticated, `auth.uid() IS NOT NULL`): restricts status to allowed values.
- **DELETE** (authenticated, `auth.uid() IS NOT NULL`): requires a real user session.

Table-level CHECK constraints provide defense in depth.

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
- Outcome-focused results section without unsupported performance claims
- Auto-rotating testimonial carousel
- 4 interactive calculators (ROI, Revenue Loss, Denial Rate, AR Days)
- Conversion CTAs (Free Assessment, Schedule Demo, Download Profile)
- Insights + Newsletter sections
- 7-question FAQ accordion
- Contact form with Supabase persistence + success/error states
- Protected consultation request dashboard with search, filtering, pipeline metrics, detail view, status updates, and CSV export
- SEO meta, Open Graph, JSON-LD schema
- Fully responsive, accessible, HIPAA-focused messaging
