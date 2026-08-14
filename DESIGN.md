---
name: Sedaye Khoob
description: A Persian music-theory course site staged like a lit concert hall — gold spotlight, indigo night, calligraphic wordmark.
colors:
  spotlight-gold: "oklch(83% 0.13 84)"
  spotlight-gold-deep: "oklch(78% 0.14 82)"
  gold-wash: "oklch(95% 0.05 88)"
  curtain-indigo: "oklch(24% 0.13 274)"
  curtain-indigo-lit: "oklch(28% 0.14 270)"
  stage-indigo: "oklch(42% 0.26 274)"
  stage-indigo-deep: "oklch(36% 0.22 274)"
  velvet-crimson: "oklch(58% 0.22 27)"
  footlight-magenta: "oklch(55% 0.25 350)"
  house-blue: "oklch(60% 0.18 250)"
  sky-paper: "oklch(97.4% 0.02 226)"
  paper-white: "oklch(99.3% 0.006 220)"
  stage-ink: "oklch(29% 0.07 250)"
  stage-ink-strong: "oklch(22% 0.05 258)"
  muted-ink: "oklch(52% 0.045 244)"
  hairline: "oklch(86% 0.022 232)"
  deep-wine: "oklch(12.6% 0.052 29)"
  wine-surface: "oklch(18.4% 0.072 28)"
  wine-riser: "oklch(29.8% 0.116 28)"
typography:
  display:
    fontFamily: "Estedad, Sofia Sans, Segoe UI, Tahoma, Arial, sans-serif"
    fontSize: "clamp(42px, 7.4vw, 86px)"
    fontWeight: 640
    lineHeight: 1.08
  headline:
    fontFamily: "Estedad, Sofia Sans, Segoe UI, Tahoma, Arial, sans-serif"
    fontSize: "clamp(30px, 4vw, 52px)"
    fontWeight: 540
    lineHeight: 1.12
  title:
    fontFamily: "Estedad, Sofia Sans, Segoe UI, Tahoma, Arial, sans-serif"
    fontSize: "clamp(21px, 2vw, 26px)"
    fontWeight: 640
    lineHeight: 1.28
  lead:
    fontFamily: "Estedad, Sofia Sans, Segoe UI, Tahoma, Arial, sans-serif"
    fontSize: "clamp(17px, 1.4vw, 21px)"
    fontWeight: 400
    lineHeight: 1.8
  body:
    fontFamily: "Estedad, Sofia Sans, Segoe UI, Tahoma, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "16px"
  md: "24px"
  stadium: "42px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
  2xl: "104px"
components:
  button-gold:
    backgroundColor: "{colors.spotlight-gold}"
    textColor: "{colors.stage-ink-strong}"
    rounded: "{rounded.pill}"
    padding: "11px 26px"
    height: "46px"
  button-gold-hover:
    backgroundColor: "{colors.spotlight-gold-deep}"
    textColor: "{colors.stage-ink-strong}"
  button-primary:
    backgroundColor: "{colors.stage-indigo}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "11px 26px"
    height: "46px"
  button-ghost-night:
    backgroundColor: "transparent"
    textColor: "oklch(96% 0.02 270)"
    rounded: "{rounded.pill}"
    padding: "11px 26px"
    height: "46px"
  badge-gold:
    backgroundColor: "{colors.gold-wash}"
    textColor: "{colors.stage-ink-strong}"
    rounded: "{rounded.pill}"
    padding: "5px 13px"
    height: "30px"
  card-paper:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.stage-ink}"
    rounded: "{rounded.stadium}"
    padding: "clamp(26px, 4vw, 44px)"
  card-night:
    backgroundColor: "{colors.curtain-indigo}"
    textColor: "oklch(96% 0.02 270)"
    rounded: "{rounded.stadium}"
    padding: "clamp(26px, 4vw, 44px)"
  input-text:
    backgroundColor: "{colors.sky-paper}"
    textColor: "{colors.stage-ink}"
    rounded: "{rounded.md}"
    padding: "13px 18px"
    height: "52px"
---

# Design System: Sedaye Khoob

## 1. Overview

**Creative North Star: "The Night Stage"**

The page is a concert hall with the house lights half down. A gold spotlight falls from above onto the calligraphic wordmark; a conductor stands on a lit podium with three glowing instrument orbs arced around them; music notes drift in the dark air. Then the curtain opens onto the teaching sections, which sit in pale sky-paper daylight where a beginner can actually read. The site alternates between these two worlds all the way down: **night bands** (hero, testimonials, checkout summary, footer) and **day pages** (course, curriculum, method, outcomes). That alternation is the composition, not decoration.

The system is Persian and right-to-left natively. One variable font, Estedad, does every job from 860-weight display to 400-weight body, and logical properties (`inset-inline`, `padding-inline`, `translateX` toward the start edge) carry direction throughout. Nothing here is a mirrored Western layout. Persian numerals appear in display contexts (۱۲ فصل، ۴۸ تمرین); Latin digits are reserved for phone numbers and form input.

Meaning is carried by **illustration, never by icons**: a set of rendered 3D "ostad" (master-teacher) characters — one per instrument — a tuxedoed conductor, cut-out instruments, and brush-calligraphy poetry used as faint texture. The only glyphs used as marks are ✓ and ♪ ♫ ♬. This system explicitly rejects corporate-SaaS gradient-and-feature-card polish, conservatory gold-on-black formality, cartoon-mascot brightness, and the countdown-timer theatrics of Iranian course-selling pages. Energy comes from stage light; it never comes from urgency.

**Key Characteristics:**
- Two-register composition: deep indigo night bands against pale sky-paper daylight
- Gold is the CTA and the light source; indigo is the depth; crimson is the accent
- One variable Persian family, Estedad (100–900), across the whole scale
- Very generous radii — 999px pills, 42px stadium cards — nothing sharp
- Rendered illustration in circular orb spotlights instead of any icon set
- Choreographed GSAP hero entrance, pointer parallax, and a perpetual gentle float
- Dark mode is a *deep wine* page, not a charcoal one, with the night bands kept indigo

## 2. Colors

A warm crimson ↔ cool indigo tension, lit by gold. The signature is the **brand spectrum** lifted from the 3D wordmark — crimson → magenta → indigo → blue — which appears as the wordmark's own gradient and nowhere else as body text.

### Primary
- **Spotlight Gold** (`oklch(83% 0.13 84)`): the light source and every commit-to-buy action. Primary CTA fill (`.btn-gold`), the hero spotlight beam, the podium glow under the conductor, the active carousel dot, the checkmarks on the night checkout card. Gold means *press this* or *this is lit*.
- **Spotlight Gold Deep** (`oklch(78% 0.14 82)`): the hover state of every gold button, and the source colour of `--shadow-gold`.

### Secondary
- **Curtain Indigo** (`oklch(24% 0.13 274)`) and **Curtain Indigo Lit** (`oklch(28% 0.14 270)`): the night itself. The hero gradient runs between them; the testimonial band, the checkout summary card, and the footer all sit in this pair. Text on top is near-white indigo (`oklch(96% 0.02 270)`) with muted `oklch(80% 0.05 268)` for secondary lines.
- **Stage Indigo** (`oklch(42% 0.26 274)`): the interface primary — secondary buttons, focus rings, link emphasis, and the hue every shadow is tinted toward. Curriculum selection is *not* indigo; it is gold, because selection there means "lit".

### Tertiary
- **Velvet Crimson** (`oklch(58% 0.22 27)`): the accent. Eyebrow dots, checklist circles on light surfaces, the ring inside module orbs. Small, warm, and frequent — never a large fill on light surfaces.
- **Footlight Magenta** (`oklch(55% 0.25 350)`) and **House Blue** (`oklch(60% 0.18 250)`): spectrum members. They exist to complete the wordmark gradient and to tint hero radial washes and testimonial card accents. They are not standalone UI colours.

### Neutral
- **Sky Paper** (`oklch(97.4% 0.02 226)`): the daylight page background. Cool, faintly blue, deliberately not cream.
- **Paper White** (`oklch(99.3% 0.006 220)`): raised card and form surfaces sitting on sky paper.
- **Stage Ink** (`oklch(29% 0.07 250)`) / **Ink Strong** (`oklch(22% 0.05 258)`): body and heading text. Blue-leaning, never neutral grey.
- **Muted Ink** (`oklch(52% 0.045 244)`): lead paragraphs, labels, meta lines.
- **Hairline** (`oklch(86% 0.022 232)`): all 1px borders and section rules.

### Dark theme
Dark mode is not an inversion. The page becomes **Deep Wine** (`oklch(12.6% 0.052 29)`) with a **Wine Surface** (`oklch(18.4% 0.072 28)`) for cards — a darkened form of the brand crimson, low chroma. The night bands stay indigo, so the same two-register composition survives: wine page, indigo stage. Gold carries the accents across both themes. **Wine Riser** (`oklch(29.8% 0.116 28)`) is the second surface introduced most recently; it is currently written in `styles.css` as `rgb(90, 5, 5)` and sits at roughly 1.6× the chroma of the surface beside it — normalise it to OKLCH before extending it.

### Named Rules

**The Gold Means Go Rule.** Gold is reserved for the primary action and for literal light. A gold surface that isn't clickable and isn't a light source is a bug.

**The Two Registers Rule.** Every section is either a night band or a day page. There is no third, in-between surface tone. When a new section is added, decide which register it belongs to before styling anything else.

**The No Neutral Grey Rule.** Every neutral in this system carries a hue — blue-leaning in light mode, red-leaning in dark. A pure grey (`#666`, `oklch(50% 0 0)`) anywhere is off-system.

## 3. Typography

**Display Font:** Estedad (variable, 100–900), falling back to Sofia Sans → Segoe UI → Tahoma → Arial
**Body Font:** Estedad — the same family, differentiated by weight
**Label/Mono Font:** system mono stack (`ui-monospace`, SF Mono, Menlo, Consolas). No mono webfont ships; it is used only for tiny Latin `.meta` labels and tabular numerals.

**Character:** One Persian variable family carries the entire voice, and the contrast comes from weight, not from a second typeface. Display sits at 640–860 and body at 400–540, which is a wide enough span that headings read as an entirely different register. Farsi needs air: line-heights run 1.65 for body and 1.8 for leads, well above a Latin-typeset equivalent.

### Hierarchy
- **Display** (640, `clamp(42px, 7.4vw, 86px)`, 1.08): section-scale `h1`. Balanced with `text-wrap: balance`.
- **Hero headline** (760, `clamp(28px, 3.6vw, 52px)`, 1.18): deliberately *smaller* than the display token. The giant calligraphic wordmark above it is the real display type; the headline is a caption to it and must never compete.
- **Headline** (540, `clamp(30px, 4vw, 52px)`, 1.12): every section `h2`. The light weight at large size is the system's most distinctive typographic move.
- **Title** (640, `clamp(21px, 2vw, 26px)`, 1.28): card and panel `h3`.
- **Lead** (400, `clamp(17px, 1.4vw, 21px)`, 1.8, max 60ch): the one calm sentence under each heading, in muted ink.
- **Body** (400, 16px, 1.65): running text, with `text-wrap: pretty`.
- **Label** (760, 13px, `0.04em`): the `.eyebrow` — Estedad, preceded by a 7px crimson dot. Persian has no case, so there is no uppercase treatment anywhere in this system.

### Named Rules

**The Wordmark Is the Display Rule.** In the hero, the calligraphic logo is the largest type on the page. Any headline set near it stays subordinate in size and weight.

**The Weight-Not-Family Rule.** Contrast is produced by moving along Estedad's 100–900 axis. Introducing a second typeface requires a reason that weight cannot serve.

**The No Caps Rule.** No uppercase, no letter-spaced Latin kickers, no all-caps labels. Persian has no case and the brand has no Latin voice.

## 4. Elevation

Layered and lifted. Surfaces sit on an ordered ladder — page → card → panel → floating nav — and shadows carry that order. The distinguishing property is that **every shadow is tinted**, never neutral: light-mode shadows mix toward Stage Indigo, gold-lit elements get a gold bloom, and dark mode swaps to near-black tinted toward wine. A `--inset-top` white highlight along the top edge gives raised light surfaces their subtle lift.

Beyond box-shadow, the hero uses light itself as elevation: layered `drop-shadow()` filters trace the wordmark's silhouette with a warm-white rim, a gold cast below, and a wide ambient bloom — a *luminous* shadow rather than a dark one.

### Shadow Vocabulary
- **xs** (`0 2px 8px` @ 6% ink): checklist marks, small chips.
- **sm** (`0 12px 30px` @ 8% ink): resting buttons, small chips.
- **md** (`0 22px 60px` @ 12% indigo): the standard card shadow — course card, form card, testimonial card, module orb.
- **lg** (`0 30px 74px` @ 16% indigo): the checkout night card and the open mobile menu.
- **gold** (`0 14px 30px` @ 38% gold): under gold CTAs only. It reads as light spilling, not as weight.
- **inset-top** (`inset 0 1px 0` white 76%): the highlight edge on every raised light surface.

### Named Rules

**The Tinted Shadow Rule.** A shadow always carries a hue — indigo on light, wine-black on dark, gold under lit elements. A neutral grey drop shadow is prohibited.

**The Glass Is Earned Rule.** `backdrop-filter: blur(18px)` appears in exactly one place: the top nav, and only after it frosts on scroll. Glass anywhere else is decoration and is not permitted.

## 5. Components

Components are **tactile and confident**. Everything presses (`translateY(1px) scale(0.99)`), lifts on hover, and answers immediately — the interface behaves like an instrument that responds when you touch it.

### Buttons
- **Shape:** fully rounded pills (`999px`), 46px tall at default, 38px small, 56px large. 1.5px border, always present, even when transparent.
- **Gold (primary):** Spotlight Gold fill, ink-strong text, gold bloom shadow. The one action that matters on any screen.
- **Primary (indigo):** Stage Indigo fill with paper-white text — used for secondary conversion points inside day pages.
- **Ghost-night:** transparent with a 30%-white border; the only outline button used on night bands.
- **Hover / Press:** hover deepens the fill; press is `translateY(1px) scale(0.99)`. Focus is a 3px indigo ring at 3px offset.
- **Arrow variant:** `.btn-arrow` prefixes a `←` that slides 4px toward the start edge on hover — the arrow points RTL-start, which is *left* in Farsi.

### Badges
- **Style:** pills with a 7px `currentColor` dot before the label, 30px tall.
- **Gold:** gold-wash fill for day-page cards. **Night:** lightened curtain-indigo for the checkout summary.

### Cards / Containers
- **Corner Style:** stadium radius (42px) for major cards; 24px for inner tiles and inputs; 16px for boxed list rows.
- **Background:** Paper White on day pages; a curtain-indigo gradient on night cards.
- **Shadow Strategy:** `md` at rest, `lg` for the checkout card, plus `inset-top`. See Elevation.
- **Border:** 1px Hairline on light; a low-opacity white mix on night surfaces.
- **Internal Padding:** `clamp(26px, 4vw, 44px)`.
- Nested cards are prohibited. The module orb and the lesson panel are the alternatives when content wants subdividing. Where a section is a list of claims rather than a set of objects, use ruled rows (`.method-item`) or illustrated rows (`.outcome`) — not a card grid. The page ships **no** three-up feature-card grid; that shape was removed deliberately and should not return.

### Inputs / Fields
- **Style:** 52px minimum height, 24px radius, 1px hairline border, filled with the page background rather than the card surface, so the field reads as recessed into the card.
- **Focus:** border shifts to Stage Indigo, a 4px 22%-indigo glow ring appears, and the fill lifts to Paper White.
- **Messages:** `.form-message` renders success in indigo tint, error in crimson tint, both at card radius.

### Navigation
- **Style:** fixed overlay bar that is fully transparent over the hero and frosts into a glass pill (`--glass` + 18px blur + indigo shadow) once scrolled. Links are 15px semibold, muted-on-night, switching to muted-ink when frosted.
- **Wordmark:** the site name in 860 weight with the brand-spectrum gradient clipped to the text, plus a drop shadow that disappears when the nav frosts.
- **Mobile (≤860px):** links collapse into a Paper White rounded panel below the bar; the gold nav CTA is dropped below 640px in favour of the in-page CTAs.
- **Theme toggle:** a 40px circular sun/moon button, ghosted over the hero and solid once frosted.

### Instrument Orb (signature)
A perfect circle with a radial white-to-indigo-tinted fill, a 1px light border, a rotated inner ring at 15% inset, and a rendered ostad or instrument image at 86% size with its own drop shadow. Hover lifts it 8px into the `lg` shadow. This is how imagery is framed everywhere in the system — never a bare rectangle, never a photo in a card.

**As a control (curriculum).** The orb row is an ARIA `tablist` and is the *only* control for the curriculum; its `tabpanel` is the single lesson panel below. Selection is expressed as light, never as a second widget: the selected orb sits in a gold radial light pool, takes a gold rim and the `gold` shadow, lifts 8px, runs the 6.8s float, and keeps its caption in ink — the unselected three drop to 68% opacity with muted captions. Roving `tabindex`, RTL-correct arrow keys (ArrowLeft advances), Home/End. Never pair the orbs with a parallel list of the same items; that duplication is what this component exists to avoid.

### Testimonial Carousel (signature)
A 3D perspective stack (1200px perspective): the active quote centred and full-scale, its neighbours pushed back 100px, rotated ±18°, dimmed to 38% opacity, and clickable. Each card takes a different spectrum accent from the sibling sequence — indigo, gold, magenta, crimson — visible in its background wash and in the 24px rule before the attribution line.

## 6. Do's and Don'ts

### Do:
- **Do** keep every new section in one of the two registers: indigo night band or sky-paper day page.
- **Do** reserve Spotlight Gold for the primary action and for literal light sources.
- **Do** tint every shadow toward Stage Indigo (light) or wine-black (dark).
- **Do** frame every image in a circular orb, an organic blob radius, or a stadium-radius tile — the system has no square photo frames.
- **Do** use logical properties (`inset-inline`, `padding-inline`, `margin-inline`) so RTL stays native; `left`/`right` is a bug unless it is a deliberately mirrored ornament.
- **Do** set display numerals in Persian digits (۱۲، ۴۸، ۹۰); keep Latin digits for phone numbers and form input.
- **Do** carry meaning with the rendered ostad illustrations from `assets/design/`.
- **Do** give Farsi text room: 1.65 body line-height, 1.8 for leads, 60ch maximum measure.

### Don't:
- **Don't** introduce an icon set. This brand ships no icons; ✓ and ♪ ♫ are the only marks. If a future surface genuinely needs functional icons, flag it as an addition rather than assuming one.
- **Don't** use `background-clip: text` with a gradient anywhere except the brand wordmark (`.spectrum-text`). That gradient is the logo's own identity; gradient text on a heading or a stat is prohibited.
- **Don't** add glassmorphism beyond the scrolled nav.
- **Don't** use a neutral grey — for text, borders, or shadows. Every neutral carries a hue.
- **Don't** put an eyebrow above every section. The dotted `.eyebrow` currently repeats on seven consecutive sections, which is exactly the template scaffolding this brand should not read as. Keep it where it earns its place and vary the cadence elsewhere.
- **Don't** let a headline compete with the calligraphic wordmark in the hero.
- **Don't** set anything in uppercase or add letter-spaced Latin kickers.
- **Don't** reach for corporate-SaaS moves: generic gradients, tidy three-up feature-card grids, stock office imagery, English-startup polish transplanted into Farsi.
- **Don't** reach for conservatory formality: gold-on-black solemnity, ornate frames, sheet-music wallpaper, maestro grandeur.
- **Don't** reach for kids'-app brightness: cartoon mascots, primary colours, gamified badges, cheerful bounce easing. Motion here eases out; it never bounces except the orbs' single `back.out` pop.
- **Don't** reach for course-selling theatrics: countdown timers, discount stickers, crossed-out prices, endless testimonial walls.
- **Don't** write raw `rgb()` or `oklab()` values into the token block. `--color-surface-2: rgb(90, 5, 5)` in the dark theme is the current exception and should be normalised to OKLCH.
- **Don't** ship an animation without a `prefers-reduced-motion` path. The reduced-motion block must keep `[data-reveal]` fully visible; content is never gated behind a transition.
