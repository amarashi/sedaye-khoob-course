# Sedaye Khoob — Design System

**صدای خوب** ("Good Voice") is a small Persian music-education studio. Its first
product is an **online music-theory course** sold through a single marketing +
checkout website. The brand teaches theory the way you'd *play* it — short video
lessons, ear-training, and friendly, plain-language explanations — and its visual
world matches: warm hand-drawn "ostad" (master/teacher) character illustrations,
a calligraphic gradient wordmark, and a stage-lit palette of crimson, indigo,
and gold.

The site is **right-to-left Farsi** by default. Design for RTL first.

This design system is a faithful, slightly **bolder** recreation of that brand —
the original site read a little subtle, so the tokens, hero, and motion here are
pushed toward a more energetic, eye-catching expression while staying true to the
source palette, type, and illustrations.

## Sources

- **GitHub repo:** `amarashi/sedaye-khoob-course` — https://github.com/amarashi/sedaye-khoob-course
  (private; the production course website — HTML/CSS/JS, `content/site.json` copy,
  and the `assets/design/` illustration set). Explore it further to build
  higher-fidelity work against the real product structure.

All copy in the cards and UI kit is lifted or lightly adapted from the repo's
`content/site.json`. Illustration and font assets are copied into `assets/`.

---

## CONTENT FUNDAMENTALS

How Sedaye Khoob writes.

- **Language & direction.** Farsi, RTL. Numerals are written in Persian digits
  (۱۲ فصل، ۴۸ تمرین، ۹۰ دقیقه) in display contexts; Latin digits are fine for
  phone numbers and form placeholders (`09123456789`).
- **Voice.** Warm, calm, encouraging — a patient teacher, not a hype salesperson.
  It addresses the learner directly and informally (the friendly *تو*, e.g.
  "صدای تو خوب است" / "یاد بگیر"), and speaks of the studio as *ما* ("we make
  music lessons…"). Never corporate, never pushy.
- **Core promise, repeated.** Theory you can *hear* and *use*, not memorize:
  *"تئوری موسیقی، شبیه تجربه‌ی نواختن"* (theory, like the experience of playing).
  Recurring verbs are sensory — بشنوید / بسازید / تشخیص دهید / حس کنید
  (hear / build / recognize / feel).
- **Structure of a section.** A short eyebrow/kicker → a confident headline (often
  a metaphor: "نت‌ها را مثل مختصاتِ موسیقی بخوانید") → one calm lead sentence →
  concrete, scannable benefits.
- **Casing & punctuation.** Headlines frequently end in a full stop — it reads as
  a quiet, settled statement rather than a shout. Persian guillemets «…» wrap
  testimonials. No ALL-CAPS (Farsi has no case); the only "caps" energy is the
  mono `.meta` line in Latin (e.g. `DURATION · 90 MIN`).
- **Emoji.** None. The brand expresses warmth through illustration, not emoji.
  The only glyphs used as ornament are the check ✓ and music notes ♪ ♫.
- **Tone examples.**
  - Hero: *"به صدای خوب خوش آمدید. ما آموزش‌های موسیقی می‌سازیم برای کسانی که می‌خواهند صدا، تئوری، ریتم و ارتباط موسیقایی را با آرامش یاد بگیرند."*
  - Method: *"شنیدن قبل از حفظ‌کردن."*
  - Reassurance: *"طراحی‌شده برای یادگیری با سرعتِ شخصی."*

---

## VISUAL FOUNDATIONS

- **Color vibe.** A warm crimson ↔ cool indigo tension lit by gold. The signature
  is the **brand spectrum** lifted straight from the 3D wordmark:
  crimson → magenta → indigo → blue, used as gradient text, top edges, and
  glows. Surfaces are a pale "sky-paper" (`--sky-100`, `--paper`); the energetic
  counterweight is **gold** (`--color-gold`), used for the primary CTA and the
  hero spotlight. Deep **indigo "night"** (`--color-night`) carries the hero
  stage, testimonial band, and footer.
- **Type.** One family does everything: **Estedad**, a Persian variable font
  (100–900). Display weights 640–860, body 420–540, line-height 1.65–1.8 for
  comfortable Farsi reading. `--font-mono` (JetBrains Mono fallback stack) is
  reserved for tiny Latin `.meta` labels and tabular numbers.
- **Imagery.** The defining asset is a set of **3D-rendered "ostad" characters** —
  a friendly teacher per instrument (piano, tar, guitar, tombak, daf, flute) plus
  a tuxedoed **conductor** — all on transparent backgrounds, warm studio lighting.
  Alongside them: realistic instrument cut-outs (tar, tombak, violin) and
  **brush-calligraphy** poetry lines used as faint texture. Never flat vector
  mascots — always the rendered, slightly glossy characters.
- **Backgrounds.** Light sections sit on sky-paper with soft radial color washes.
  The hero is **full-bleed deep-indigo** with a gold radial spotlight, a faint
  inverted-calligraphy texture, and diagonal "staff-line" striping masked to fade.
- **Shape & radius.** Generous and rounded: pills (`999px`) for buttons/badges/nav,
  `--radius-stadium` (42px) for big cards, `--radius-md` (24px) for inputs and
  small tiles. Illustrations often sit inside **circular "orb" spotlights** or
  organic blob radii.
- **Cards.** Pale surface, 1px `--color-border`, `--radius-stadium`, soft
  **indigo-tinted** shadow (`--shadow-md`) — never a neutral-grey drop shadow.
  An `--inset-top` white highlight gives a subtle lift. Variants: `night`
  (dark indigo, light text), `spectrum` (gradient top edge).
- **Shadows.** Always tinted toward indigo; gold/crimson glow variants for spotlit
  elements. Layered and soft, never harsh.
- **Borders.** Hairline (1px) `--color-border` on light; on dark, a low-opacity
  white mix. Outline buttons use a stronger 1.5px ink border.
- **Animation.** Eased and musical, never linear. `--ease-out` for entrances,
  `--ease-spring`/`back.out` for playful pops (orbs). The hero runs a **GSAP**
  entrance timeline (spotlight in → headline lines stagger up → conductor rises →
  instrument orbs pop with a back-ease), a gentle perpetual float, and
  **pointer-parallax** depth. Body sections fade-up on scroll via ScrollTrigger.
  All motion respects `prefers-reduced-motion`.
- **Hover / press.** Hover = a darker fill (buttons) or color lift (links/pills) +
  small translate; arrow glyphs slide start-ward. Press = `translateY(1px)
  scale(0.99)`. Inputs grow a 4px indigo focus ring.
- **Transparency & blur.** The sticky nav is a frosted glass pill
  (`backdrop-filter: blur(18px)`) once scrolled; the hero spotlight uses
  `mix-blend: screen`. Used sparingly, for depth — not everywhere.
- **Layout.** Centered `min(1200px, 100%)` container with a fluid gutter; fixed
  overlay nav; a strong 2-column rhythm (copy ↔ illustration) that collapses to
  one column under ~900px.

---

## ICONOGRAPHY

Sedaye Khoob is **illustration-led, not icon-led** — there is no icon font or SVG
icon set in the source. Approach:

- **Illustrations do the work.** Meaning is carried by the ostad characters and
  instrument images in `assets/design/`, framed in `InstrumentOrb` spotlights.
  Copy these in; never redraw them as SVG.
- **Glyph ornaments only.** The check mark **✓** (in `Checklist`, rendered in a
  colored circle) and music notes **♪ ♫** (faint hero decoration) are the only
  "icons." They're Unicode glyphs in Estedad, not an icon library.
- **No emoji.** Don't introduce emoji or a third-party icon set. If a UI genuinely
  needs functional icons (e.g. a future app), reach for **Lucide** via CDN at a
  ~1.75px stroke to sit beside Estedad — and flag it as an addition, since the
  brand ships none today.

---

## INDEX

Root manifest:

- `styles.css` — the entry point consumers link. `@import`s only.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`,
  `fonts.css`, `base.css`, `components.css`.
- `assets/` — `design/` (ostad + instrument illustrations, logos, calligraphy,
  hero backgrounds) and `fonts/Estedad-wght.woff2`.
- `cards/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/` — reusable React primitives (see below).
- `ui_kits/course-website/` — the full interactive course-site recreation.
- `SKILL.md` — Agent-Skill manifest for downloading into Claude Code.

**Components** (`window.SedayeKhoobDesignSystem_7ce729`):
`Button`, `TextField`, `Badge`, `Pill`, `Card`, `Checklist`, `InstrumentOrb`,
`Testimonial`.

**UI kits:** `course-website` — bold night-stage hero (GSAP), course intro,
interactive curriculum stepper, outcomes, testimonial band, working checkout
(form → success), and footer.

---

### Caveats / substitutions

- `--font-mono` keeps a **JetBrains Mono** fallback stack but ships **no** mono
  webfont (the brand has none); it falls back to the system mono. Only used for
  tiny Latin meta labels.
- All other fonts and illustrations are the real brand assets from the repo.
