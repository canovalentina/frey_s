# Technical Handoff — frey_s Music Platform

**Project:** Music portfolio and licensing e-commerce site for Federico Reyes (frey_s)
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Prisma 7 · Stripe · Resend
**Node requirement:** v20+ (developed and tested on v24.8.0)

---

## 1. What Has Been Built

### 1.1 Public Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Hero, featured work grid, about strip, dark CTA banner |
| `/music` | `src/app/music/page.tsx` | Discography — 5 albums with artwork and streaming links |
| `/music/licensing` | `src/app/music/licensing/page.tsx` | Filterable/searchable licensing catalog with demo tracks |
| `/music/licensing/[slug]` | `src/app/music/licensing/[slug]/page.tsx` | Track detail — waveform preview, license tier selector, checkout button |
| `/film` | `src/app/film/page.tsx` | Film/media portfolio — alternating video + text layout, 5 YouTube embeds |
| `/about` | `src/app/about/page.tsx` | Bio, photos, social links, all inline references |
| `/contact` | `src/app/contact/page.tsx` | Inquiry form with project type selector, posts to `/api/contact` |
| `/checkout/success` | `src/app/checkout/success/page.tsx` | Post-purchase confirmation page |
| `/download/[token]` | `src/app/download/[token]/page.tsx` | Secure download delivery page (UI ready, requires DB to serve files) |
| `/admin` | `src/app/admin/page.tsx` | Password-protected dashboard (track management, inquiry viewer) |

### 1.2 API Routes

| Route | File | Description |
|---|---|---|
| `GET /api/tracks` | `src/app/api/tracks/route.ts` | Public catalog — supports `?q=`, `?mood=`, `?genre=`, `?sort=` |
| `POST /api/contact` | `src/app/api/contact/route.ts` | Receives inquiry form submissions |
| `POST /api/checkout` | `src/app/api/checkout/route.ts` | Creates Stripe Checkout Session, returns redirect URL |
| `POST /api/webhooks/stripe` | `src/app/api/webhooks/stripe/route.ts` | Handles `checkout.session.completed` → generates download token → sends email |
| `GET /api/og` | `src/app/api/og/route.tsx` | Edge OG image generator (title, subtitle, tag params) |
| `GET/POST /api/admin/tracks` | `src/app/api/admin/tracks/route.ts` | Admin-only track CRUD (key auth via `x-admin-key` header) |

### 1.3 Components

```
src/components/
  audio/
    GlobalAudioPlayer.tsx   Persistent bottom player bar (HTML Audio API, queue, volume)
    TrackCard.tsx           Track card with static waveform visualization and play/license actions
    Waveform.tsx            WaveSurfer.js waveform — renders real audio when a URL is provided
  layout/
    Header.tsx              Fixed nav, scroll-aware background, mobile hamburger overlay
    Footer.tsx              4-column grid with social links and hire CTA
    PlayerPadding.tsx       Spacer that appears when audio player is open, prevents footer overlap
  seo/
    JsonLd.tsx              Injects JSON-LD structured data script tags
```

### 1.4 Libraries (`src/lib/`)

| File | Purpose |
|---|---|
| `audioContext.tsx` | React context + reducer for global audio state (track, queue, play/pause, volume) |
| `tracks.ts` | Static demo track catalog — **single source of truth until DB is live** |
| `prisma.ts` | Prisma client singleton using `@prisma/adapter-pg` |
| `stripe.ts` | Stripe client singleton |
| `email.ts` | Resend client + `sendLicenseEmail()` helper with branded HTML template |
| `download.ts` | `generateDownloadToken()`, `buildDownloadUrl()`, `downloadExpiry()` helpers |

### 1.5 SEO & Metadata

- Dynamic OG images via `/api/og` (Edge runtime, branded with waveform decoration)
- Per-page `og:image` on homepage and all track detail pages
- JSON-LD `MusicGroup` schema on homepage
- JSON-LD `MusicComposition` + `Offer` schema on every track detail page
- `sitemap.xml` at `/sitemap.xml` — all static routes + every track slug
- `robots.txt` at `/robots.txt` — blocks `/admin`, `/api/`, `/download/`, `/checkout/`

### 1.6 Design System

- **Fonts:** Syne (display/headings) + DM Serif Display (body/prose) — via `@fontsource` npm packages, no external CDN calls
- **Colors:** ink `#0a0a0a` · paper `#f7f5f2` · lavender `#b2a2cb` · muted `#6b6b6b` · border `#e2e0dd`
- **Animations:** page entry fade-up, reduced-motion respected
- **Tokens** defined in `src/app/globals.css` using Tailwind v4 `@theme inline` block

---

## 2. What Is Missing Before Deployment

### 2.1 Third-Party Services (Required)

#### Supabase (Database)
1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Project Settings → Database → Connection string**
3. Copy the **pooled** connection string → `DATABASE_URL` in `.env`
4. Copy the **direct** connection string → `DIRECT_URL` in `.env`
5. Update `prisma.config.ts` to add `directUrl` for migrations:
   ```ts
   datasource: {
     url: process.env.DATABASE_URL,
     directUrl: process.env.DIRECT_URL, // add this line
   }
   ```
6. Run the migration:
   ```bash
   npx prisma migrate dev --name init
   ```
7. Optionally seed demo tracks:
   ```bash
   # No seed file exists yet — create prisma/seed.ts to import DEMO_TRACKS from src/lib/tracks.ts
   ```

#### Stripe (Payments)
1. Create an account at [stripe.com](https://stripe.com)
2. Copy **Secret key** → `STRIPE_SECRET_KEY`
3. Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Set up webhook in Stripe Dashboard → Developers → Webhooks:
   - Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events to listen for: `checkout.session.completed`
   - Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`
5. For local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

#### Resend (Email)
1. Create an account at [resend.com](https://resend.com)
2. Add and verify your domain (e.g. `freyes.com`)
3. Copy the **API key** → `RESEND_API_KEY`
4. Update the `from` address in `src/lib/email.ts`:
   ```ts
   from: "frey_s <licenses@freyes.com>",  // must match verified domain
   ```

#### Cloudflare R2 (Audio File Storage)
1. Create an R2 bucket named `freyes-audio` (or update `R2_BUCKET_NAME`)
2. Create API credentials → fill `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`
3. Set a custom domain on the bucket → `R2_PUBLIC_URL`
4. Implement `getSignedR2Url()` in `src/lib/download.ts` using the AWS SDK v3 (`@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner`) — stub is in the download route

### 2.2 Code TODOs (Commented Stubs)

Every incomplete piece is marked with a `// TODO:` comment in the source. Key ones:

| File | TODO |
|---|---|
| `src/app/api/tracks/route.ts` | Replace static `DEMO_TRACKS` with `prisma.track.findMany(...)` |
| `src/app/api/contact/route.ts` | `prisma.inquiry.create()` + `resend.emails.send()` |
| `src/app/api/admin/tracks/route.ts` | `prisma.track.create()` for POST handler |
| `src/app/api/webhooks/stripe/route.ts` | `prisma.purchase.create()` after payment |
| `src/app/download/[token]/page.tsx` | `prisma.purchase.findUnique({ where: { downloadToken } })` + signed R2 URL |
| `src/app/admin/AdminClient.tsx` | Replace `sessionStorage` auth with NextAuth or Supabase Auth |

### 2.3 Content Still Needed

The following content was flagged in the original brief as not yet provided. The site renders correctly without it but these would significantly improve it:

- **Audio files** — 10–30 licensable tracks with:
  - Preview clips (30–45s, watermarked) → upload to R2, set `previewUrl` on each track in DB
  - Full MP3 320kbps → `fullMp3Url`
  - Full WAV 24-bit → `fullWavUrl`
  - Stems ZIP (for Professional tier) → `stemsUrl`
- **Cover art** for licensing tracks (currently no `coverUrl` set on demo tracks)
- **Video project descriptions** — the film page has placeholder descriptions for each project; Federico should supply his actual creative process notes
- **Testimonials** — for the About page
- **Equipment/studio setup** — for the About page
- **Press kit PDF** — for the About page download link
- **License agreement legal text** — a PDF to attach to purchase emails

### 2.4 Admin Authentication

The current admin (`/admin`) uses a simple `sessionStorage` check — **this is not secure for production**. Replace with one of:

- **Option A (simplest):** NextAuth.js with credentials provider + `ADMIN_PASSWORD` env var
- **Option B (recommended):** Supabase Auth — since Supabase is already in the stack, use `@supabase/ssr` to protect the `/admin` route via middleware

---

## 3. Environment Variables

Full reference for `.env`. A template is already committed at `.env` (not gitignored — **do not commit real values**).

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres.[ref]:[pass]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[pass]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# Admin
ADMIN_PASSWORD="strong-random-password"
NEXTAUTH_SECRET="generate: openssl rand -base64 32"
NEXTAUTH_URL="https://yourdomain.com"

# Cloudflare R2
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME="freyes-audio"
R2_PUBLIC_URL="https://your-r2-domain.com"
```

---

## 4. Deployment (Vercel)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "initial"
gh repo create freyes --private && git push -u origin main

# 2. Import project in Vercel dashboard
# Or via CLI:
npx vercel --prod

# 3. Set all env variables in Vercel Dashboard → Project → Settings → Environment Variables

# 4. After first deploy, register Stripe webhook pointing to production URL
```

**Important Vercel settings:**
- Framework: Next.js (auto-detected)
- Build command: `npm run build` (default)
- After any Prisma schema change: add `npx prisma generate` to the build command:
  `npx prisma generate && next build`

---

## 5. Local Development

```bash
# Requires Node 20+
node --version  # must be >= 20

# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:3000

# After changing prisma/schema.prisma:
npx prisma generate          # regenerates client types
npx prisma migrate dev       # applies migration to DB (requires DATABASE_URL)

# Test Stripe webhooks locally:
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 6. Database Schema Overview

```
Track ──< TrackMood >── Mood
      ──< TrackGenre >── Genre
      ──< License ──< Purchase
```

- **Track** — all metadata + file URLs. `published: false` by default; set to `true` via admin to make it appear in the catalog.
- **License** — one row per license tier per track. `price` stored in **dollars** (integers) in `src/lib/tracks.ts` but should be stored in **cents** in the DB to match Stripe conventions. The Stripe checkout route multiplies by 100 (`license.price * 100`) — keep this consistent.
- **Purchase** — created by the Stripe webhook handler after `checkout.session.completed`. `downloadToken` is a 64-char hex string; `downloadExpiry` is 7 days after purchase; `downloadCount` max is 3 (enforced in the download route, not yet wired to DB).
- **Inquiry** — contact form submissions. Viewable in `/admin` → Inquiries tab once DB is connected.

---

## 7. Known Issues & Notes

| Issue | Detail |
|---|---|
| **Hydration warning in console** | Comes from the waveform bar visualization in `TrackCard` and `TrackDetailClient`. The bars use a deterministic seed from `track.id`, which is stable, but the `isCurrentTrack` CSS class references React state. This is a cosmetic warning only and does not affect functionality. To silence it completely, move the waveform bars into a `useEffect`-mounted component. |
| **Demo tracks have no audio** | `audioUrl: ""` on all demo tracks in `src/lib/tracks.ts`. The global player will not actually play anything until real URLs are set. |
| **Admin auth is not production-safe** | `sessionStorage` check in `AdminClient.tsx` is client-side only. Replace before going live (see §2.4). |
| **Prisma `directUrl` missing from config** | `prisma.config.ts` currently only sets `url`. Add `directUrl` for Prisma Migrate to work correctly with Supabase's connection pooler. |
| **`src/generated/prisma/` is not gitignored** | The Prisma generated client is committed. This is intentional to allow builds without running `prisma generate`. If the schema changes, regenerate and commit the updated files, or add `npx prisma generate` to the Vercel build command and gitignore the folder. |

---

## 8. File Tree Reference

```
freyes/
├── docs/
│   ├── music-website-prompt.md     Original project brief
│   ├── content-extraction.md       All artist content / source of truth for copy
│   └── technical-handoff.md        This document
├── img/                            Original images (also copied to public/img/)
├── prisma/
│   ├── schema.prisma               Database schema
│   └── prisma.config.ts            Prisma 7 config (connection URL lives here)
├── public/
│   └── img/                        All static images served by Next.js
├── src/
│   ├── app/                        Next.js App Router pages and API routes
│   ├── components/                 Reusable React components
│   ├── generated/prisma/           Auto-generated Prisma client (committed)
│   └── lib/                        Shared utilities and singleton clients
├── .env                            Environment variable template (no real values)
├── next.config.ts                  Next.js config
├── package.json                    Dependencies
├── prisma.config.ts                Prisma 7 datasource config
└── tsconfig.json                   TypeScript config
```
