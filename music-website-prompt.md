# Music Portfolio & Licensing Website — AI Agent Prompt

## Project Overview

Build a professional music portfolio and licensing platform for **Federico Reyes (frey_s)**, a Venezuelan artist based in Barcelona. The site should serve dual purposes: showcasing creative work to attract film/media composition opportunities, and enabling direct music licensing with e-commerce integration.

### Companion Files Provided
- **content-extraction.md** — All existing content (bio, albums, videos, links). Reference this for all text and metadata.
- **img/** folder — Album artwork, artist photos, homepage visuals. Reference by filename as listed in content-extraction.md.

---

## Technical Stack (Budget-Conscious)

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **Payments**: Stripe (free until you earn — only 2.9% + $0.30 per transaction)
- **Audio**: Native Web Audio API + Wavesurfer.js (free, open source)
- **Database**: Prisma with one of:
  - **Supabase** (free tier: 500MB, unlimited API requests) ← recommended
  - **PlanetScale** (free tier: 5GB)
  - **Turso** (free tier: 9GB)
- **Authentication**: NextAuth.js (free) or Supabase Auth (free)
- **Deployment**: Vercel (free tier handles most portfolio sites easily)
- **Email**: Resend (free: 3,000 emails/month) or Loops (free: 1,000 contacts)
- **File Storage for Audio**: 
  - **Cloudflare R2** (free: 10GB storage, no egress fees) ← best for audio
  - **Supabase Storage** (free: 1GB, included with DB)
- **Analytics**: Vercel Analytics (free tier) or Plausible (self-host free)

### Cost Estimate at Launch: $0-20/month
- Domain: ~$12/year
- Everything else free until you scale significantly

---

## Design Direction

### Aesthetic Vision
**"Gallery Meets Sound Studio"** — The site should feel like walking through a contemporary art museum where the exhibits are sonic experiences. Think:

- **Cargo.site** editorial minimalism
- **MoMA / Tate Modern** website sophistication  
- **Ryuichi Sakamoto's** artist site elegance
- **Are.na** creative community aesthetic

### Core Design Principles

1. **Typography-First**: Use a distinctive display font (suggestions: Editorial New, Neue Haas Grotesk, Monument Extended, or similar) paired with a refined body font. NO Inter, Roboto, or system fonts.

2. **Restrained Color Palette**: 
   - Primary: Near-black (#0a0a0a) or warm off-white (#f7f5f2)
   - Accent: One bold color (consider the existing lavender #b2a2cb or a more unexpected choice)
   - Use color sparingly but intentionally

3. **Generous White Space**: Let the work breathe. Large margins, asymmetric layouts, unexpected grid breaks.

4. **Subtle Motion**: 
   - Smooth page transitions
   - Hover states that feel physical
   - Audio waveform visualizations
   - Parallax on scroll (used sparingly)

5. **Cursor Interactions**: Custom cursor states when hovering over playable content

---

## Site Structure

### 1. Homepage (`/`)
- Hero section: Atmospheric, minimal — perhaps a single striking image or abstract visual with the artist name
- Featured work: 2-3 highlighted pieces (film scores, recent releases)
- Brief positioning statement: "Composer & Sound Artist — Available for Film, Media, and Licensing"
- Subtle audio teaser that plays on interaction (not autoplay)

### 2. Music/Catalog (`/music`)
**Two distinct sections:**

#### A. Released Albums
Grid or list of released albums with:
- Album artwork
- Title, year, brief description
- Links to streaming platforms (Spotify, Bandcamp, YouTube)
- Inline audio preview capability

#### B. Licensing Library (`/music/licensing`)
This is the commercial heart of the site:
- Filterable/searchable catalog of licensable tracks
- Categories: Mood (melancholic, uplifting, tense), Genre (ambient, electronic, piano, orchestral), Tempo, Instrumentation
- Each track card shows:
  - Waveform visualization
  - 30-second preview (watermarked audio)
  - Duration, BPM, key
  - Available license types

### 3. Track Detail Page (`/music/licensing/[slug]`)
- Full track information
- Extended preview (45-60 seconds, watermarked)
- License tier selector:
  
  | License Type | Use Case | Price Range | Includes |
  |--------------|----------|-------------|----------|
  | Personal | Personal projects, student films | $29-49 | MP3, credit required |
  | Standard | YouTube, podcasts, small commercial | $99-199 | WAV + MP3, credit required |
  | Professional | Film, TV, advertising | $299-999 | Stems, WAV, flexible credit |
  | Exclusive | Full buyout | Custom quote | All rights transfer |

- Add to cart / Buy now (Stripe integration)
- Similar tracks recommendation

### 4. Film & Media (`/film`)
Portfolio specifically for composition work:
- Video embeds of film/media work with original scores
- Categorized: Short Films, Documentaries, Commercials, Art Installations
- Brief description of the creative process for each
- "Hire Me" CTA prominent

### 5. About (`/about`)
- Professional bio (existing content is good, refine for film industry)
- High-quality photos
- Press kit download (PDF with bio, photos, selected works)
- Equipment/studio setup (builds credibility)
- Testimonials from collaborators

### 6. Contact (`/contact`)
- Inquiry form with project type selector:
  - Film/TV Composition
  - Licensing Question
  - Live Performance
  - Collaboration
  - Other
- Direct email displayed
- Response time expectation

### 7. Admin Dashboard (`/admin`) — Protected
- Track upload and management
- License sales overview
- Customer management
- Analytics integration

---

## E-Commerce & Licensing Flow

### User Journey: Licensing a Track

1. **Browse**: User explores catalog, filters by mood/genre
2. **Preview**: Clicks play, hears 30-sec watermarked preview
3. **Select License**: Chooses appropriate tier
4. **Checkout**: Stripe checkout session
5. **Delivery**: 
   - Immediate: Download link for files
   - Email: License agreement PDF, download links
   - Database: Record of purchase for license verification

### Stripe Integration Requirements

```typescript
// License tiers as Stripe products
// Each track can have multiple price points
// Metadata includes: track_id, license_type, usage_rights

// Webhook handling for:
// - checkout.session.completed → deliver files, send email
// - payment_intent.succeeded → log transaction
// - customer.created → add to mailing list (optional)
```

### Audio Preview System

- All preview audio should be:
  - Limited to 30-45 seconds
  - Watermarked (subtle voice or audio mark saying "preview")
  - Streamed, not downloadable
  - Waveform visualization synced to playback

---

## Key Features

### Global Audio Player
- Persistent player bar at bottom of page
- Continues playing across page navigation
- Queue management
- Waveform progress indicator

### Search & Filter
- Real-time search across track titles, tags, descriptions
- Multi-select filters for mood, genre, tempo range
- Sort by: newest, popular, price

### Responsive Design
- Mobile-first approach
- Touch-optimized audio controls
- Simplified navigation on mobile

### SEO & Performance
- Static generation for catalog pages
- Dynamic OG images for social sharing
- Schema markup for music/audio content
- Core Web Vitals optimized

---

## Content Sources

### Provided Files
You have been given:
1. **content-extraction.md** — All text content, links, album info, and video portfolio extracted from the old site. Use this as the single source of truth for existing content.
2. **img/** folder — All images including album artwork, artist photos, and homepage visuals.

### What's Ready to Use
- Artist bio and social links
- 5 released albums with descriptions, artwork, and streaming links
- 5 video portfolio pieces with YouTube embeds
- Artist photos for about page
- Homepage featured images

### New Content Needed (Not Yet Provided)
- **10-30 unreleased tracks** for licensing library with metadata:
  ```
  - Title
  - Duration, BPM, Key
  - Moods (2-3 tags): melancholic, uplifting, tense, peaceful, etc.
  - Genres (1-2 tags): ambient, electronic, piano, orchestral, etc.
  - Instrumentation notes
  - Stems availability (yes/no)
  ```
- Watermarked preview audio files (30-45 sec clips)
- Full audio files (MP3 320kbps + WAV 24-bit)
- License agreement legal text
- Press kit PDF content
- Testimonials from collaborators (if available)
- Detailed descriptions of role/process for each video project

---

## Example Component: Track Card

```tsx
interface Track {
  id: string;
  title: string;
  duration: number;
  bpm: number;
  key: string;
  moods: string[];
  genres: string[];
  previewUrl: string;
  waveformData: number[];
  licenses: {
    type: 'personal' | 'standard' | 'professional' | 'exclusive';
    price: number;
  }[];
}

// Card should include:
// - Waveform visualization (interactive)
// - Play/pause with hover state
// - Quick-view license prices
// - Add to cart action
// - Expand for full details
```

---

## Free Tools & Resources

### Fonts (Free & Distinctive)
- **Google Fonts**: Space Mono, DM Serif Display, Outfit, Syne
- **Fontshare**: Satoshi, Cabinet Grotesk, Clash Display (free for commercial use)
- **Fontsource**: Easy npm installation for any open-source font

### Icons & Graphics
- **Lucide**: Clean icon set (MIT license)
- **Heroicons**: By Tailwind team
- **SVG backgrounds**: heropatterns.com, svgbackgrounds.com

### Audio Watermarking (DIY)
- Use Audacity (free) to add a subtle voice saying "preview" or a short tone
- Or use FFmpeg script to batch-process all previews

### Legal Templates
- Search "music licensing agreement template" — many free starting points
- Customize for your tiers (Personal, Standard, Professional, Exclusive)

### Design Inspiration Archives
- **Godly.website**: Curated beautiful sites
- **Savee.it**: Design bookmarking
- **Minimal Gallery**: Minimalist site examples

---

For visual inspiration, reference:
- https://cargo.site (layout philosophy)
- https://www.moma.org (typography, white space)
- https://www.are.na (grid systems, minimal aesthetic)
- https://www.epidemicsound.com (licensing UX — but make it more artsy)
- https://www.artlist.io (catalog organization)

**Important**: Do NOT copy these sites. Extract principles and create something unique that reflects the artist's Venezuelan heritage, classical training, and experimental electronic work.

---

## Development Phases (Parallel Priority)

All three core features — **licensing e-commerce**, **film composer portfolio**, and **audio previews** — are equally critical. Build them together rather than sequentially.

### Phase 1: Foundation & Design System
- [ ] Next.js project setup with TypeScript
- [ ] Tailwind configuration with custom design tokens
- [ ] Typography system (choose distinctive fonts)
- [ ] Color palette and CSS variables
- [ ] Base layout components (header, footer, navigation)
- [ ] Responsive grid system

### Phase 2: Core Pages (Build Simultaneously)
**Track A — Portfolio Identity**
- [ ] Homepage with hero and featured work
- [ ] About page with bio, photos, press kit
- [ ] Contact form with inquiry types

**Track B — Film Composer Portfolio**
- [ ] Film/media page with video embeds
- [ ] Project case studies (describe your process)
- [ ] "Hire Me" CTA integration throughout

**Track C — Audio System Foundation**
- [ ] Wavesurfer.js integration for waveforms
- [ ] Global persistent audio player component
- [ ] Preview playback with watermark support
- [ ] Supabase/R2 setup for audio file storage

### Phase 3: Licensing Platform
- [ ] Track database schema (Prisma + Supabase)
- [ ] Admin: track upload interface
- [ ] Catalog page with grid/list views
- [ ] Filter system (mood, genre, tempo, price)
- [ ] Track detail page with license tiers
- [ ] Search functionality

### Phase 4: E-Commerce Integration
- [ ] Stripe account setup and products
- [ ] Shopping cart (local state or Supabase)
- [ ] Checkout flow with Stripe Checkout
- [ ] Webhook handler for purchase completion
- [ ] Secure download link generation
- [ ] License PDF generation and email delivery (Resend)

### Phase 5: Polish & Launch
- [ ] Page transitions and micro-interactions
- [ ] Loading states and skeleton screens
- [ ] Mobile optimization pass
- [ ] SEO: meta tags, OG images, schema markup
- [ ] Performance audit (Core Web Vitals)
- [ ] Cross-browser testing
- [ ] Soft launch → gather feedback → iterate

---

## Success Metrics

The website should:
1. **Convert visitors to licensing customers** — Clear path from discovery to purchase
2. **Attract film/media clients** — Professional presentation, easy contact
3. **Showcase artistic identity** — Memorable, distinctive design
4. **Generate passive income** — Licensing library runs 24/7
5. **Build audience** — Email capture, social integration

---

## Final Notes

This is not just a portfolio — it's a business platform. Every design decision should balance artistic expression with commercial effectiveness. The site should feel like an exclusive gallery where discovering and licensing music is a pleasure, not a transaction.

The artist's unique position — Venezuelan heritage, classical piano foundation, experimental electronic production, film composition experience — should inform the design language without being heavy-handed about it.

Build something that makes other musicians ask: "Who made your website?"
