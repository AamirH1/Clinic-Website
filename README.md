# Harborlight Dental — Website

A premium, animated dental clinic website built with Next.js 16 (App Router), React 19,
TypeScript, Tailwind CSS and Framer Motion. Ready to deploy on Vercel.

## Stack

- **Next.js 16** (App Router, Turbopack build)
- **React 19** / **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for scroll/hover/entrance animation
- No external CMS or paid API required to run — content lives in [`lib/data.ts`](lib/data.ts)

## Project structure

```
app/
  layout.tsx          Root layout, fonts, global <head> metadata, mounts <ChatWidget/>
  page.tsx             Homepage — composes all sections in order
  globals.css          Tailwind entry + reduced-motion handling
  sitemap.ts, robots.ts        SEO routes
  api/booking/route.ts         Appointment request endpoint (validates + persists)
  admin/bookings/page.tsx      Token-gated view of submitted appointment requests
  privacy/, terms/, accessibility/   Legal pages (template content — see below)
components/
  Navbar, Hero, TrustBar, Intro, Treatments, FeaturedTreatment,
  SmileGallery, WhyChooseUs, Technology, PatientJourney, Testimonials,
  Team, Contact, ChatWidget, FinalCTA, Footer, icons.tsx
  ui/                  Reusable primitives: MagneticButton, RevealText,
                        Counter, ArtPanel, Photo, BeforeAfterSlider, DatePicker
lib/
  data.ts              All site copy, treatments, team, testimonials, FAQs, stats
  stockPhotos.ts        Verified free-license Unsplash photos used as placeholders
  bookingStore.ts       File-based storage for appointment requests (see caveats below)
legacy/
  harborlight-dental.html   The original single-file artifact prototype,
                             kept for reference only — not part of the app.
```

## Running locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel, "Add New Project" → import the repo. Framework preset
   "Next.js" is auto-detected — no config needed.
3. Deploy. `app/api/booking/route.ts` runs as a serverless function automatically.
4. Optionally set `ADMIN_TOKEN` (Project Settings → Environment Variables) to enable
   `/admin/bookings` — see "Viewing booking requests" below.

## How booking works (chat, not a form)

There's no appointment form on the page. Every "Book an Appointment" button opens
the chat widget (`components/ChatWidget.tsx`, floating bottom-right on every page),
which offers two flows:

- **Ask a question** — matches free text against `lib/data.ts` → `faqs`.
- **Book an appointment** — a guided, validated conversation (name → phone → email →
  treatment → date) that POSTs to `/api/booking` on the last step.

Validation (name format, phone format, email format, no past dates) runs both in the
chat (`components/ChatWidget.tsx`) and again server-side in the API route — never trust
client-side validation alone.

## Viewing booking requests (admin)

Set an `ADMIN_TOKEN` environment variable, then visit:

```
/admin/bookings?token=<your ADMIN_TOKEN value>
```

**Important limitation:** requests are stored in a JSON file on disk
(`lib/bookingStore.ts`). That's reliable for local development or a traditional
always-on Node server, but Vercel's serverless functions run on an ephemeral,
largely read-only filesystem — writes there can silently disappear between
invocations. For real production use, swap `lib/bookingStore.ts` for a managed
store (Vercel Postgres, Vercel KV, Supabase, etc.) or forward each submission to
email/a CRM instead (see the TODO in `app/api/booking/route.ts`). The current
setup exists so you have something real and inspectable to look at today, not as
a production data layer.

`/admin/bookings` has no real authentication — it's a shared-secret query
parameter for convenience during development. Put it behind proper auth before
this site is public and holds real patient data.

## Content marked `[PLACEHOLDER]`

This is a **template**, not a real clinic's verified content. Anywhere you
see `[PLACEHOLDER]` in `lib/data.ts` or a page file, replace it with real,
verified information before launch — clinic name, address, phone, hours,
stats (rating, years of experience, patient count), team bios and
qualifications, and testimonials. Do not publish invented medical claims,
review counts, or before/after results. The legal pages (`app/privacy`,
`app/terms`, `app/accessibility`) are boilerplate structure, not legal
advice — have them reviewed by a lawyer before publishing.

## Photography

Hero, the philosophy section, Technology, the Featured Treatment showcase and
the Treatments hover panel use real photographs — individually verified as
free-to-use under the standard (non-paid) Unsplash License. Sources and credit
links are in `lib/stockPhotos.ts` and in the footer.

Two places intentionally stay as abstract placeholders rather than stock
photos, for reasons worth keeping in mind if you change them:

- **Team headshots** — attaching a real photographed stranger's face to an
  invented name and bio would misrepresent a real person as clinic staff.
  Replace these with your actual team's photos (`components/Team.tsx`).
- **Smile gallery before/after** — using unrelated stock photos as fake
  "before/after" results would be a misleading medical claim. Only use real,
  patient-consented before/after photography here (`components/SmileGallery.tsx`,
  `components/ui/BeforeAfterSlider.tsx`).

To add your own photos anywhere: drop files in `public/images/`, then use
`next/image` directly, e.g.:

```tsx
import Image from "next/image";
<Image src="/images/hero.jpg" alt="..." fill className="object-cover" />
```

## Wiring up real appointment notifications

`app/api/booking/route.ts` validates and persists submissions (see above) but
doesn't notify anyone externally yet. To make requests actionable in real
time, add one of:

- **Email**: send via [Resend](https://resend.com) or Postmark inside the route handler.
- **CRM / practice management**: POST to a Zapier/Make webhook, or directly to your PMS's API (e.g. Cliniko, Dentrix).

Any of these will need an API key stored as a Vercel environment variable
(Project Settings → Environment Variables) — never commit secrets to the repo.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` globally (see `app/globals.css`).
- All interactive elements — nav, chat widget, date picker — are keyboard-reachable.
- Animations use GPU-friendly transforms (`opacity`/`transform`) — no
  WebGL, no large video, no continuous mouse tracking beyond the
  desktop-only magnetic button.
- Fonts load via `next/font` (self-hosted, no layout shift, no external
  render-blocking requests).
- No emoji are used in UI copy or icons — `components/icons.tsx` has a small
  inline SVG icon set instead.

## Customizing content

Almost everything editorial lives in `lib/data.ts`:

- Business info → `brand`
- Nav links → `navLinks`
- Trust stats → `trustStats`
- Treatments list → `treatments`
- "Why choose us" cards → `whyChooseUs`
- Technology features → `technologyFeatures`
- Patient journey steps → `journeySteps`
- Testimonials → `testimonials`
- Team bios → `team`
- Gallery categories → `galleryCategories`
- Chat FAQ answers → `faqs`

Color palette and typography live in `tailwind.config.ts` (`ivory`,
`charcoal`, `clinical`, `gold` tokens) and `app/layout.tsx` (Fraunces serif
+ Inter sans via `next/font/google`).
