# tanujashastri.com — Astro

Self-hosted rebuild of [tanujashastri.com](https://www.tanujashastri.com) (previously Framer) in **Astro 7**. No UI framework; every interaction is a small vanilla `<script>` module. All fonts, images and videos are served from this repo.

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
| `/` | `src/pages/index.astro` — hero, blue "know more" panel, sticky-stacking project cards, testimonials, marquee, experience, footer |
| `/about` | `src/pages/about.astro` |
| `/play` | `src/pages/play.astro` — scroll-driven poster gallery + split reveal (`src/components/play/`) |
| `/experimental` | `src/pages/experimental.astro` — draggable "desk" (`src/components/experimental/`) |
| `/superreply`, `/slate`, `/gemini`, `/flex-d` | case studies built on `src/layouts/CaseStudyLayout.astro` |
| `/digits-assignment` | standalone scroll story (`src/components/digits-assignment/`) |

## Structure

```
src/
  styles/global.css        design tokens, @font-face, reset, .btn / .tag-box / [data-reveal]
  layouts/BaseLayout.astro  <head>, theme, top nav + scroll-top, global scripts
  layouts/CaseStudyLayout.astro  sticky TOC sidebar + 1200px content column + footer, .cs-* primitives
  components/               SiteHeader (top nav), ScrollTop, Footer, WhereIveBeen, ArrowTag, HandArrow,
                            TypewriterLink, Marquee, Video; cs/* (Section, Row, Dark, TldrItem, Statement,
                            Figure, Grid, Card, Stat, Callout, Quote, Annotation)
  scripts/                  clock, nav, scroll (Lenis), reveal, toc (scroll-spy), video, typewriter
  data/                     site.ts (links, experience), projects.ts (home cards, testimonials), arrows.json
public/
  fonts/                    self-hosted woff2 (Gambetta headings + Switzer body, both variable; Geist Mono, …)
  assets/images, assets/videos   original Framer assets, kept under their original hashed names
```

Conventions:

- `data-reveal` (+ `data-reveal-delay="0.1"`) on any block gives it the Framer-style appear animation. Append `?static` to a URL to pre-reveal everything (useful for screenshots / visual regression).
- Page-specific CSS lives in the page's scoped `<style>`; page-specific behaviour in a `<script>` at the bottom of the page.
- Components forward extra props (`{...rest}`) to their root element so scoped classes passed from a page apply.
- Lenis smooth scrolling is on by default; pages can opt out with `noSmooth` on `BaseLayout`. `prefers-reduced-motion` disables Lenis and the reveal animations.

Design notes and the measured type scale are in `docs/superpowers/specs/2026-08-27-framer-to-astro-migration-design.md`.
