# tanujashastri.com — Framer → Astro migration (design spec)

Date: 2026-08-27. Source: https://www.tanujashastri.com/ (Framer). Target: this repo (Astro 7, static output).

## Goal

Recreate the live Framer portfolio as a self-hosted Astro site with the same pages, content, typography, colours,
layout and the key animations — with no Framer runtime, no React, and all assets (fonts, images, videos) served
from this repo.

## Pages (from sitemap)

| Route | Theme | Kind | Notes |
| --- | --- | --- | --- |
| `/` | light → dark bottom half | Home | hero, blue "about" panel, sticky-stacking project cards, testimonials, marquee, experience list, footer |
| `/about` | dark | About | "How I got here", photo strip, "I do a lot.", experience list, footer |
| `/play` | dark | Gallery | "Designs w/o deadlines", scroll-driven poster gallery (scattered 3D → grid), "Oh, I forgot I paint too!" split reveal, footer |
| `/experimental` | dark | Playground | single viewport, scattered rotated draggable items linking to projects, "Click to explore!" |
| `/superreply` | light | Case study | purple accent `#8D01FF` |
| `/slate` | light | Case study | yellow accent `#FACD1A` |
| `/gemini` | light | Case study | blue callout, "very reliable !!" handwriting (Brisa) |
| `/flex-d` | light | Case study | violet `#5B2BF5` + lime `#B1E100`; horizontal-scroll "Design focus" section; sticky poster stack |
| `/digits-assignment` | light (white) | Scroll story | green `#1B8360`; not in nav; own header (name + clock), "Figma File" button bottom-left, "Scroll away!" bottom-right |

Reference material (scratchpad, session-local):
`scratchpad/site/text/<page>.txt` (visible text + `[IMG]`/`[VIDEO]`/`[LINK]` markers in DOM order),
`scratchpad/site/text/<page>.assets.txt`, `scratchpad/site/<page>.html` (raw Framer HTML),
`scratchpad/shots/<page>/*.jpg` (viewport screenshots top→bottom, 1568×724 = 2048×945 viewport scaled 0.766).

## Stack

- Astro 7 (`output: 'static'`), TypeScript, zero UI framework. Interactivity = vanilla `<script>` modules.
- `lenis` for optional smooth scrolling; `motion` (vanilla `animate`/`scroll`/`inView`) for scroll-linked effects.
- Assets in `public/`: `public/fonts/*.woff2`, `public/assets/images/<framer-hash>.png`, `public/assets/videos/<framer-hash>.mp4`.
  Framer URL → local path: `https://framerusercontent.com/images/X.png?…` → `/assets/images/X.png`;
  `https://framerusercontent.com/assets/X.mp4` → `/assets/videos/X.mp4`.
- No CMS/content collections: each page is an `.astro` file composed from shared components. Shared data in `src/data/site.ts`.

## Design tokens (`src/styles/global.css`)

Colours: `--bg #FAFAFA`, `--bg-2 #F5F5F5`, `--line #E3E3E3`, `--ink #151515`, `--ink-2 #262626`, `--ink-3 #252525`,
`--muted #969696`, `--muted-2 #5B5B5B`, `--blue #1710E6`, `--green #8CC651`, `--dark #151515`, `--dark-2 #1A191C`,
`--light #F5F5F5`, `--light-2 #E3E3E3`, `--purple #8D01FF`, `--purple-2 #AE4AFF`, `--yellow #FACD1A`, `--lime #B1E100`,
`--violet #5B2BF5`, `--forest #1B8360`.
Theme vars (swap on `html[data-theme=dark]` and `.theme-dark`): `--page-bg`, `--fg`, `--fg-muted`, `--accent` (blue on light, green on dark).

Fonts (all self-hosted): `Apple Garamond Light` (display serif, regular + italic), `Plus Jakarta Sans` (body; faces 300/500/600/800 + italics 300–600 — 400 resolves to 500 like the original),
`Geist Mono` (labels/nav/buttons), `Instrument Serif`, `Crimson Pro`, `Brisa` (handwriting), `Champ` (Flex'd display).

Type scale measured from the live site (desktop 2048px):
- Header: Geist Mono 14px, name uppercase ls .84px; clock coloured `--accent`; "Open for work" with 8px green dot.
- Bottom nav buttons: Geist Mono 14px/14px w500 `#F5F5F5` on `#262626`, padding 13px 20px, radius 2px, height 40px; Resume `#252525` 13px.
- Home hero H1: Apple Garamond 120px/96px ls −3.6px; sub: Plus Jakarta 20px/28px w300 ls −.8px.
- Tags ("Don't you want to know more", "I know you want to", "Quick TL;DR"): Apple Garamond 30px/24px ls −.9px, padding ~8px 12px, italic second word.
- Blue panel copy: Apple Garamond 50px/40px ls −1px, 683px wide, centred.
- "Projects" heading: Apple Garamond 250px/250px ls −12.5px, italic "jects"; "(05)" Geist Mono 20px blue.
- Project card: 1400×756, left panel 490px `#F5F5F5`; year Geist Mono 16px muted; title Plus Jakarta 24px/28.8; body 16px/20.8 `#5B5B5B`;
  accordion rows 16px (label w500 `#262626`, chevron); "Case study ↗" button blue, Geist Mono 16px w300, ~150×34; number badge 50×50 blue Geist Mono 18px w500.
- Testimonials heading: Apple Garamond 160px/144px ls −6.4px light, italic green "fun"; quotes Plus Jakarta 22px/24.2 `#E3E3E3`, author 16px italic w300; giant green quote marks.
- Marquee: Apple Garamond 110px/99px ls −4.4px, "Don't be shy, connect on LinkedIn" (link).
- Experience list: "Where" italic 84px + "I've been" regular; rows: Apple Garamond 42px/33.6 company, Plus Jakarta 16px w300 muted role/date, 1px `#262626` dividers; "View Resume ⤓" button blue, Geist Mono 20px, 202×60.
- Footer: "Still here?" 14px muted; "I know you want to" tag blue; "Work with me." Apple Garamond ~160px with italic "me."; links Plus Jakarta 14px ls −.56px, instagram green; bottom bar "© 2025 | Definitely not my first draft." 16px muted + static nav (Work About Play Resume) right.
- Case study: container 1420px = sidebar 220px + content 1200px (padding 60px 40px 80px → 1120 inner). Sidebar sticky (top 40px): "← Back" Geist Mono 16px w300 muted; TOC Geist Mono 14px w300, 31px rows, active `#262626` else `#969696` (scroll-spy).
  Eyebrow Geist Mono 16px w300 muted; title Apple Garamond 58px/58px ls −1.16px with italic span; tags Plus Jakarta 16px muted + year right `#262626`.
  Rows: inner 880px (120px inset), label 292px Plus Jakarta 18px/23.4 w500 + body 572px 16px/20.8 w300 `#5B5B5B`.
  Section eyebrow Geist Mono 14px w300 `#5B5B5B`. Dark block `#151515` padding 50 50 80, 1008px wide (56px inset), 2-col 414/414.
  Statement block accent bg, padding 50, quote 28px/36.4 w500. Figures: `#F5F5F5` container, image inside. Stats: dark pill label 24px + Apple Garamond ~90px number + 14px caption.
  Key learnings: dark block, cards `#262626` 288×189 padding 20, title 18px w600, body 14px.

Breakpoints (Framer): ≥1600, 1440–1599, 1200–1439, 950–1199, <950 (phone). Desktop-first; below 1200 sidebars collapse, below 950 single column, fluid `clamp()` type.

## Shared building blocks

```
src/layouts/BaseLayout.astro      head, fonts, theme, header/bottom-nav/scroll-top slots, global scripts
src/layouts/CaseStudyLayout.astro back link + sticky TOC + content column (+ hero slot) + Footer
src/components/SiteHeader.astro   name | mode pill (Linear ↔ Experimental) | clock + Open for work
src/components/BottomNav.astro    floating pill nav (toggle icon 'arrow'|'menu'), hides when footer nav visible
src/components/ScrollTop.astro    blue square, bottom-left, appears after 200px
src/components/Footer.astro       Still here? / I know you want to / Work with me. / links / bottom bar
src/components/WhereIveBeen.astro experience list + View Resume (home + about)
src/components/ArrowTag.astro     label box + hand-drawn Arrow6 (side left|right, variant blue|dark|light)
src/components/HandArrow.astro    inline SVG from Framer "Handy Arrows" (src/data/arrows.json)
src/components/TypewriterLink.astro  types a word when in view, blinking cursor, chevron
src/components/Marquee.astro      infinite horizontal ticker
src/components/Video.astro        muted/loop/playsinline, plays when in view
src/components/cs/*               Section, Row, Inner, Dark, Tldr, Statement, Figure, Grid, Card, Stat, Callout, Quote, Annotation
src/scripts/{clock,nav,scroll,reveal,toc,video}.ts
src/data/site.ts, src/data/projects.ts, src/data/arrows.json
```

Animations:
- Appear: `data-reveal` (+ `data-reveal-delay="0.1"`): opacity 0→1, y 20→0, scale .9→1, 1s spring-like ease, once. Mirrors Framer appear.
- Scroll-linked: `motion.scroll()`; sticky stacking with CSS `position: sticky`.
- Smooth scroll: Lenis, off by default ("Linear"); mode pill also links Linear ↔ Experimental pages.
- Reduced motion respected (`prefers-reduced-motion`).

## Out of scope / notes

- Framer cursor/click micro-variants, exact spring physics.
- Astro `<Image>` optimisation (images are served as-is from `public/`; PNGs up to 5472px — a follow-up).
- Resume/Figma/Drive links stay external (same URLs as the live site).
