# Course Website — UI kit

A faithful, slightly bolder recreation of the Sedaye Khoob course marketing +
checkout site. Single interactive page, RTL Farsi.

## Run
Open `index.html`. It loads React + Babel + GSAP + the design-system bundle
(`../../_ds_bundle.js`) and the JSX partials below.

## Files
- `index.html` — document shell, asset/script loading, `@dsCard` + `@startingPoint` tags.
- `kit.css` — kit-specific layout (the night-stage hero, sections, footer) on top of the DS tokens.
- `nav.jsx` — `TopNav`, overlays the hero and frosts into a glass pill on scroll.
- `hero.jsx` — `Hero`, the night-stage: gold spotlight, floating instrument orbs
  around the conductor, GSAP entrance timeline + pointer-parallax.
- `sections.jsx` — `CourseIntro`, `Curriculum` (interactive module stepper),
  `Outcomes`.
- `testimonials.jsx` — `Testimonials`, the night band of student quote cards.
- `checkout.jsx` — `Checkout`, course summary + registration form that flips to a
  success state.
- `footer.jsx` — `SiteFooter` / contact.
- `app.jsx` — composes everything, sticky-nav toggle, ScrollTrigger reveals.

## Composes these DS components
`Button`, `Badge`, `Pill`, `Card`, `Checklist`, `TextField`, `InstrumentOrb`,
`Testimonial` — from `window.SedayeKhoobDesignSystem_7ce729`.

## Interactions
- Sticky nav frosts after 80px of scroll.
- "خرید دوره" buttons smooth-scroll to the checkout.
- Curriculum: hover/click a module orb or step to swap the lesson panel.
- Checkout: submitting shows a "preparing payment" state, then a success card.
- All entrance motion respects `prefers-reduced-motion`.
