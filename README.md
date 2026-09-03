# Headway — Astro

Marketing-agency site for Headway, built in **Astro 7** on the bones of a Framer portfolio migration. Body copy is still placeholder; section labels, navigation and calls to action are Hungarian. Interactions are small vanilla `<script>` modules (plus one React island for the mobile menu). All fonts, images and videos are served from this repo.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output in dist/
pnpm preview
pnpm check      # astro check (TypeScript + template diagnostics)
```

## Pages

| Route | File |
| --- | --- |
| `/` | `src/pages/index.astro` — hero (typed verb), dark manifesto panel (widens on scroll), services list, sticky-stacking work cards, client quotes, footer |
| `/about` | `src/pages/about.astro` — portfolio leftover, not linked from the nav ("Rólunk" points at `/#rolunk`) |
| `/play` | `src/pages/play.astro` — scroll-driven poster gallery + split reveal (`src/components/play/`) |
| `/experimental` | `src/pages/experimental.astro` — draggable "desk" (`src/components/experimental/`) |
| `/superreply`, `/slate`, `/gemini`, `/flex-d` | case studies built on `src/layouts/CaseStudyLayout.astro` |
| `/digits-assignment` | standalone scroll story (`src/components/digits-assignment/`) |

## Structure

```
src/
  styles/global.css        design tokens, @font-face, reset, .btn (+ --brand / --ghost / --lg) / .tag-box / [data-reveal]
  layouts/BaseLayout.astro  <head>, theme, top nav + scroll-top, global scripts
  layouts/CaseStudyLayout.astro  sticky TOC sidebar + 1200px content column + footer, .cs-* primitives
  components/               SiteHeader (top nav), Wordmark (inline logo the home nav morphs), ScrollTop, Footer, Services, WhereIveBeen, ArrowTag, HandArrow,
                            TypewriterLink, Marquee, Video; cs/* (Section, Row, Dark, TldrItem, Statement,
                            Figure, Grid, Card, Stat, Callout, Quote, Annotation)
  scripts/                  clock, nav, scroll (Lenis), reveal, toc (scroll-spy), video, typewriter, hero-rotate, countup ([data-countup] figures)
  data/                     site.ts (nav, CTA, services, experience), projects.ts (work cards, testimonials), arrows.json
public/
  fonts/                    self-hosted woff2 (Gambetta headings + Switzer body, both variable; Geist Mono, …)
  assets/images, assets/videos   original Framer assets, kept under their original hashed names
```

Conventions:

- `data-reveal` (+ `data-reveal-delay="0.1"`) on any block gives it the Framer-style appear animation. Append `?static` to a URL to pre-reveal everything (useful for screenshots / visual regression).
- Page-specific CSS lives in the page's scoped `<style>`; page-specific behaviour in a `<script>` at the bottom of the page.
- Components forward extra props (`{...rest}`) to their root element so scoped classes passed from a page apply.
- Home nav: `src/scripts/nav.ts` scrubs `--nav-t` (0 = landing, 1 = assembled bar). On landing the inline wordmark's letters sit on the logo lockup's arc with the lockup's underline drawn beneath; both morph as the bar assembles (letters flatten, the underline stretches into the bar's rule). Flat `public/assets/logo.svg` is used everywhere else; the full lockup is kept as `logo-lockup.svg`.
- Lenis smooth scrolling is on by default; pages can opt out with `noSmooth` on `BaseLayout`. `prefers-reduced-motion` disables Lenis and the reveal animations.

Design notes: one accent (the brand orange) on paper and ink; Plus Jakarta Sans (variable, self-hosted) for everything on the home page and shell, set semibold and tight for headlines to match the rounded wordmark; Geist Mono only for numerals; Gambetta and Switzer remain for the case-study pages. Left-aligned 12-column layout with hairlines rather than boxes; the work stack is the one carded element (image-first cards with a client strip and one result line); services are full-width bands with a promise, deliverables and a linked example. The original migration spec and measured Framer type scale are in `docs/superpowers/specs/2026-08-27-framer-to-astro-migration-design.md`.
