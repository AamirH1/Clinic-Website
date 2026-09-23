<div align="center">

# Harborlight Dental

**A dental clinic website template where content lives in one file and appointments are booked through a chat assistant.**

![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6)
![Next.js](https://img.shields.io/badge/framework-Next.js_16-000000)
![React](https://img.shields.io/badge/UI-React_19-149ECA)
![Tailwind CSS](https://img.shields.io/badge/styling-Tailwind_CSS_3-38BDF8)
![Storage](https://img.shields.io/badge/storage-JSON_file-lightgrey)
![License](https://img.shields.io/badge/license-not_yet_set-red)

</div>

## Why one content file and a chat assistant?

Most small clinic websites have two problems. The text, prices and opening hours are scattered across many page files, so every change means hunting through code. And the booking form is a wall of fields that visitors abandon, while the clinic still has to answer the same questions (hours, parking, emergencies) by phone.

This template fixes both:

- **One content file.** Clinic details, treatments, team, reviews and FAQs all live in `lib/data.ts`. Edit it and every section updates.
- **Booking as a conversation.** There is no form. The chat widget asks for name, phone, email, treatment and date one step at a time, and checks each answer before moving on.
- **Questions answered from the same file.** The chat matches a visitor's question to your FAQ entries, so answers stay consistent with the rest of the site.
- **Checked twice.** Every booking is validated in the browser and again on the server.

A tiny example of what you edit (from `lib/data.ts`):

```ts
export const faqs = [
  {
    question: "Do you treat dental emergencies?",
    answer: "Yes - we offer same-day emergency appointments."
  }
];
```

## What this project does

1. **Browse** - a visitor reads a single-page site: hero, treatments, technology, reviews, team and contact.
2. **Ask** - they open the chat and type a question; the assistant replies from your FAQ list.
3. **Book** - they choose "Book an appointment" and answer five short prompts, picking the date from a calendar.
4. **Validate** - the site rejects bad names, phone numbers, emails and past dates before anything is saved.
5. **Review** - staff open a token-protected admin page to see the requests.

It is for clinic owners and developers who want a polished starting point they can rebrand and deploy on Vercel.

## Features

- **Single-page layout** - navigation, hero, trust statistics, treatments, featured treatment, smile gallery, technology, patient journey, reviews, team, contact and footer.
- **Chat assistant** - answers FAQs by keyword matching and runs the booking flow; includes a clear-chat button.
- **Custom date picker** - a calendar that blocks past dates, instead of the browser's default control.
- **Before/after slider** - a draggable comparison slider (currently shown with abstract placeholder art).
- **Motion** - scroll reveals, counters and a magnetic button; all motion is reduced when the visitor's system asks for it.
- **Admin view** - `/admin/bookings` lists submitted requests, gated by a token.
- **SEO basics** - page metadata, `sitemap.xml` and `robots.txt`.
- **Legal pages** - privacy, terms and accessibility pages with template text.
- **Optimised images** - photos load through the Next.js image pipeline.

## Quick start

Requires Node.js 20 or newer (tested on 24) and npm.

```bash
git clone https://github.com/AamirH1/clinic_template.git && cd clinic_template
npm install
echo "ADMIN_TOKEN=change-me" > .env.local   # enables the admin page
npm run dev                                  # starts the dev server
```

- Site: <http://localhost:3000>
- Admin: <http://localhost:3000/admin/bookings?token=change-me>
- There is no demo login and no seed data. Book once through the chat to see an entry in the admin page.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · ESLint

Architecture: a mostly static Next.js app with one server route (`/api/booking`) that validates requests and saves them to a local JSON file.

## Development & testing

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates the production build and type-checks the code |
| `npm start` | Serves the production build |
| `npm run lint` | Runs ESLint over the project |

There is no automated test suite yet. Environment variables: only `ADMIN_TOKEN` is used; there is no `.env.example` file.

## Documentation

No `docs/` folder exists. These files carry explanatory comments:

| File | What it explains |
| --- | --- |
| [lib/data.ts](lib/data.ts) | All site content; entries marked `[PLACEHOLDER]` must be replaced |
| [lib/bookingStore.ts](lib/bookingStore.ts) | How bookings are stored and why that is not enough for production on Vercel |
| [lib/stockPhotos.ts](lib/stockPhotos.ts) | Where each photo came from and its license |
| [app/api/booking/route.ts](app/api/booking/route.ts) | Server-side validation rules |
| [legacy/](legacy) | The original single-file HTML prototype, kept for reference only |

## Limitations and roadmap

- **Bookings may not persist on Vercel.** The JSON file store writes to disk, which is temporary on serverless hosting. Replace it with a database before real use.
- **Admin has no real login.** It checks a shared token in the URL. Add proper authentication before storing real patient data.
- **No notifications.** Nobody is emailed when a request arrives (a TODO in the booking route).
- **Chat is keyword-based.** It matches words from your FAQs; it is not an AI model and will miss unusual phrasing.
- **Placeholder content.** The clinic name, address, statistics, reviews, team and legal text are samples, not verified claims. Team photos and before/after images are intentionally placeholders.
- **Deployment.** Vercel is the intended target; no CI workflow or deployment guide is included yet.

## License

No license file is included yet, so all rights are reserved by default. Add one before sharing or reusing the code. Placeholder photos are from Unsplash under the [Unsplash License](https://unsplash.com/license); credits are in the site footer.
