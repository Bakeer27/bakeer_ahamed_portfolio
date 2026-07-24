# Bakeer Ahamed — Portfolio

Production-grade personal portfolio. Dark, editorial, typography-led — built to read as a senior engineer's product, not a template.

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 (custom token system) · GSAP 3 (ScrollTrigger + SplitText) · Lenis smooth scroll · React Three Fiber (procedural 3D "verification seal", zero model assets)

## Architecture

```
src/
├── app/
│   ├── layout.tsx            # fonts (next/font), metadata, JSON-LD Person schema
│   ├── page.tsx              # section composition (server component)
│   ├── globals.css           # design tokens + typography system
│   ├── opengraph-image.tsx   # OG card generated at build — no stock imagery
│   ├── robots.ts / sitemap.ts
├── components/
│   ├── layout/               # SmoothScroll, Cursor, Hud, Navbar, Footer
│   ├── sections/             # Hero, About, Impact, CaseStudySection, Projects, Stack, Timeline, Contact
│   ├── three/HeroSeal.tsx    # R3F scene — lazy-loaded, ssr:false, pauses off-screen
│   └── ui/SectionHeading.tsx
├── hooks/useScrollAnimation.ts  # scoped GSAP context, auto-cleanup, reduced-motion aware
└── lib/content.ts            # single source of truth for all copy, stats & links
```

All copy, stats, case studies, projects and timeline entries live in `src/lib/content.ts` — edit one file to update the site.

## Performance decisions

- 3D scene is `next/dynamic` with `ssr: false` + static SVG fallback; never blocks first paint, pauses rendering when off-screen (`frameloop="never"`), capped at 1.5 dpr, `low-power` GPU preference. Procedural geometry only — no .glb to download.
- `prefers-reduced-motion` and low-power devices (few cores + coarse pointer, save-data) get native scroll, no GSAP, no 3D — content fully visible, CSS-only fallbacks.
- Every GSAP tween/ScrollTrigger runs inside `gsap.context()` and is reverted on unmount — no leaks.
- Fonts self-hosted and subset via `next/font` (Bricolage Grotesque / Geist / Geist Mono) — zero render-blocking font requests.
- Screenshots served through `next/image` (AVIF/WebP, explicit sizing — no CLS).
- Fully static output — every route prerendered at build time.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
npm run start    # serve the build
```

Optional env: `NEXT_PUBLIC_SITE_URL` — canonical URL used in metadata/sitemap (defaults to `https://bakeerahamed.dev`).

## Deploy to Vercel

1. Push the repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo. Framework preset: **Next.js** — no config needed.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain in Project → Settings → Environment Variables.
4. Add your custom domain under Project → Settings → Domains.

## Palette options

**Option A — "Ledger" (active):** deep navy base + warm gold accent. Reads premium and ties into the certificate/seal motif.

**Option B — "Graphite":** neutral charcoal + ice-blue accent. Reads colder / more "systems engineer". To switch, replace the `:root` block in `src/app/globals.css`:

```css
:root {
  --ink: #0b0b0d;
  --surface: #111114;
  --raised: #17171c;
  --overlay: rgba(11, 11, 13, 0.82);
  --line: rgba(200, 210, 230, 0.09);
  --line-strong: rgba(200, 210, 230, 0.2);
  --text: #ededf0;
  --text-muted: #9a9aa6;
  --text-faint: #61616e;
  --gold: #8fd8ff;        /* accent (name kept for token stability) */
  --gold-bright: #b8e6ff;
  --gold-deep: #3d7999;
  --gold-glow: rgba(143, 216, 255, 0.14);
}
```

## Project images

`public/images/projects/*.png` are live-site captures framed in browser chrome by the `BrowserFrame` component. To replace one, drop in a new capture with the same filename (16:10 or taller, ≥1024px wide). Cards without an image render a designed fallback automatically.
