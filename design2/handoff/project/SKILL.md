---
name: sedaye-khoob-design
description: Use this skill to generate well-branded interfaces and assets for Sedaye Khoob (صدای خوب), a Persian online music-theory course studio — for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, illustration assets, and UI-kit components for prototyping. RTL Farsi.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy
assets out and create static HTML files for the user to view. If working on
production code, copy assets and read the rules here to become an expert in
designing with this brand.

Key facts:
- **Brand:** Sedaye Khoob / صدای خوب ("Good Voice"), a Persian music-theory course.
- **Direction:** Right-to-left Farsi. Design RTL-first.
- **Font:** Estedad (variable, 100–900) — `assets/fonts/Estedad-wght.woff2`.
- **Palette:** the brand spectrum (crimson → magenta → indigo → blue) + gold
  accent, on pale sky-paper, with a deep-indigo "night" for hero/footer.
- **Imagery:** 3D "ostad" teacher + instrument illustrations in `assets/design/` —
  copy them in; never redraw as SVG. No emoji, no icon font.
- **Tokens:** link `styles.css`; read components from `_ds_bundle.js` via
  `window.SedayeKhoobDesignSystem_7ce729`.

Start points:
- `cards/` — foundation specimens (color, type, spacing, brand).
- `components/` — Button, TextField, Badge, Pill, Card, Checklist, InstrumentOrb,
  Testimonial.
- `ui_kits/course-website/` — the full interactive course-site recreation
  (bold GSAP hero, curriculum stepper, checkout). The best reference for tone,
  layout, and motion.

If the user invokes this skill without other guidance, ask what they want to
build or design, ask a few questions, and act as an expert designer who outputs
HTML artifacts _or_ production code, depending on the need.
