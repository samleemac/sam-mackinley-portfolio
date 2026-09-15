---
version: alpha
name: Jitter — Motion Poster
description: >-
  Design system codified from the jitter.video landing page (captured 2026-08-14,
  build v2026-08-14-205e8a2). Oversized Swiss grotesque display type on white,
  violet-tinted greys, pill geometry, and spring-overshoot motion. Token values
  are the 1025–1440px desktop tier; the full responsive ladder is in the prose.
colors:
  primary: "#19171C"
  secondary: "#6E6E73"
  tertiary: "#7A40ED"
  neutral: "#F2F1F3"
  surface: "#FFFFFF"
  error: "#FD3456"
  ink-800: "#2D2933"
  grey-100: "#E5E4E7"
  grey-300: "#D7D7DB"
  grey-500: "#97979B"
  violet-050: "#F2ECFD"
  violet-300: "#AE8BF4"
  violet-400: "#B593FF"
  violet-900: "#17082C"
  blue-050: "#E6F4FF"
  blue-300: "#50B8FF"
  blue-500: "#29A9FF"
  cyan-500: "#01B2FD"
  lime-400: "#F5FF63"
typography:
  display-hero:
    fontFamily: TWK Lausanne
    fontSize: 80px
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: -2.4px
  display-lg:
    fontFamily: TWK Lausanne
    fontSize: 72px
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: -3.2px
  quote-display:
    fontFamily: TWK Lausanne
    fontSize: 72px
    fontWeight: 750
    lineHeight: 1
    letterSpacing: -2.88px
  headline-lg:
    fontFamily: TWK Lausanne
    fontSize: 48px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -1.92px
  headline-md:
    fontFamily: TWK Lausanne
    fontSize: 40px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -1.6px
  headline-sm:
    fontFamily: TWK Lausanne
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.56px
  scroll-reveal:
    fontFamily: TWK Lausanne
    fontSize: 40px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -1.5px
  card-title:
    fontFamily: TWK Lausanne
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.2px
  pill-tag:
    fontFamily: TWK Lausanne
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.4px
  button-md:
    fontFamily: TWK Lausanne
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.38
    letterSpacing: -0.4px
  button-lg:
    fontFamily: TWK Lausanne
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.4px
  column-title:
    fontFamily: TWK Lausanne
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: -0.36px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.396px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.352px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.14
  label-nav:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: -0.396px
  input:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: -0.75px
  badge:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 600
    lineHeight: 24px
rounded:
  none: 0px
  sm: 12px
  md: 20px
  lg: 40px
  xl: 80px
  full: 9999px
spacing:
  root: 10px
  xs: 4px
  sm: 8px
  md: 20px
  lg: 40px
  xl: 80px
  gutter-narrow: 8px
  gutter: 20px
  container-inset: 20px
  container-max: 1920px
  columns-narrow: 8
  columns: 10
  columns-wide: 20
  section-y: 200px
  section-y-wide: 280px
  hero-stack: 30px
  card-pad: 40px
  card-pad-lg: 60px
  measure: 508px
components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-lg}"
  page-dark:
    backgroundColor: "{colors.violet-900}"
    textColor: "{colors.surface}"
  nav-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    height: 90px
  nav-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-nav}"
    padding: 24px
    height: 70px
  button-violet:
    backgroundColor: "{colors.violet-400}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    height: 60px
  button-blue:
    backgroundColor: "{colors.blue-300}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    height: 60px
  button-black:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    height: 60px
  button-white:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    height: 60px
  button-grey:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    height: 60px
  button-grey-dark:
    backgroundColor: "{colors.grey-500}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    height: 60px
  button-lime:
    backgroundColor: "{colors.lime-400}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    height: 60px
  button-hero:
    backgroundColor: "{colors.violet-400}"
    textColor: "{colors.primary}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.full}"
    width: 240px
    height: 60px
  card-hover-scrim:
    backgroundColor: "#00000059"
  pill-tag:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.pill-tag}"
    rounded: "{rounded.lg}"
    padding: 20px
  pill-tag-violet:
    backgroundColor: "{colors.violet-300}"
    textColor: "{colors.primary}"
    typography: "{typography.pill-tag}"
    rounded: "{rounded.lg}"
  pill-tag-lime:
    backgroundColor: "{colors.lime-400}"
    textColor: "{colors.primary}"
    typography: "{typography.pill-tag}"
    rounded: "{rounded.lg}"
  badge-violet:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.surface}"
    typography: "{typography.badge}"
    rounded: "{rounded.none}"
    padding: 8px
  badge-blue:
    backgroundColor: "{colors.blue-500}"
    textColor: "{colors.primary}"
    typography: "{typography.badge}"
    rounded: "{rounded.none}"
    padding: 8px
  badge-soft-violet:
    backgroundColor: "{colors.violet-050}"
    textColor: "{colors.tertiary}"
    typography: "{typography.badge}"
    rounded: "{rounded.none}"
    padding: 8px
  card-template:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.card-title}"
    rounded: "{rounded.lg}"
    padding: 40px
    width: 480px
  card-description:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
  card-title-highlight:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.card-title}"
    padding: 5px
  card-title-highlight-inverse:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.card-title}"
    padding: 5px
  card-feature-cyan:
    backgroundColor: "{colors.blue-050}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
  card-feature-electric:
    backgroundColor: "{colors.cyan-500}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
  scroll-reveal-rest:
    backgroundColor: "{colors.grey-300}"
    typography: "{typography.scroll-reveal}"
  input:
    backgroundColor: "{colors.ink-800}"
    textColor: "{colors.surface}"
    typography: "{typography.input}"
    rounded: "{rounded.none}"
    padding: 24px
    height: 50px
  input-error-rule:
    backgroundColor: "{colors.error}"
    height: 1px
  divider:
    backgroundColor: "{colors.grey-100}"
    height: 1px
  footer-panel:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.xl}"
    padding: 160px
  quote:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.quote-display}"
    width: 740px
---

# Jitter — Motion Poster

Codified from the live jitter.video landing page on 2026-08-14 (build
`v2026-08-14-205e8a2`), by reading the shipped stylesheet
(`/assets/style-CCT_vAyH.css`) and the GSAP animation modules rather than by
eyeballing screenshots. Every value below is a measured value. Where I changed
something, the deviation is stated inline with the live value next to it.

## Overview

Jitter sells a motion design tool, and the landing page is the product demo. That
single fact settles nearly every decision on the page: the surface is a white
artboard, the type is enormous enough to be animated legibly, and the hero
headline is not text at all — it is a Lottie file. The page is a poster that
moves.

The register is **Swiss poster, oversized**. Flush-center composition, one
grotesque doing all the shouting at 80–140px, near-black violet-tinted ink on
white, and a violet accent that appears only on things you can press. It is
confident and slightly loud, and it is aimed at designers, who are the only
audience that will read a 140px headline as craft rather than as a shout.

What it gives up, deliberately: **information density and warmth**. Sections are
separated by 200–320px of empty white. There is no serif anywhere, no texture, no
imagery that isn't product output. A visitor who wants to compare feature tables
is being underserved on purpose — that job belongs to `/pricing`. The page's only
argument is "look how this moves," and every layout choice protects the animation
from competing with anything else on screen.

The one thing to internalize before building anything new: **motion is the brand,
and the motion has a specific personality — it overshoots.** Nothing on this page
eases politely to a stop. Buttons scale past their target and settle back. The
signature is a `linear()` spring that travels to 1.52× before returning to 1. If
you add a component that fades in linearly, it will read as a different website.

## Colors

The palette is one ink, one accent, a violet-tinted grey ramp, and a small set of
saturated fills used as whole card backgrounds rather than as accents.

- **Primary — Ink (#19171C):** The near-black used for all body copy, all
  headlines, and the black button. It is *not* neutral: at R25 G23 B28 it carries
  a measurable violet cast, which is what keeps it from looking like a default
  `#111`. Every grey in the ramp is pulled toward the same hue, so the page reads
  as one temperature.
- **Secondary — Slate (#6E6E73):** Metadata, card descriptions, muted captions.
  Reaches exactly 4.51:1 on the paper grey, which is why it must not be used at
  sizes below 14px or on any surface lighter than `neutral`.
- **Tertiary — Jitter Violet (#7A40ED):** The brand signal, and the most
  disciplined thing about this palette. Full-saturation violet appears on almost
  nothing: inline links, the "new" badge, and small pill fills. It is under 1% of
  the painted surface. The buttons deliberately use the *lighter* violet instead,
  because a full-strength #7A40ED button forces white text, and white-on-violet at
  20px would be the loudest element on a page whose loudest element is supposed to
  be the animation.
- **Neutral — Paper Grey (#F2F1F3):** The workhorse. Template cards, pill tags,
  the grey button, the footer panel, the section behind the logo bento. Violet-
  tinted, one step off white, and it does the job that a border would do in a
  denser system.
- **Surface — White (#FFFFFF):** Pure white, and this is a decision rather than a
  default. The product is a canvas; the page is the artboard. Off-white paper
  stock would read as "editorial" and would tint every video and Lottie composited
  onto it. Because the surface is pure, the ink is not, which is the inverse of the
  usual advice and the right way round here.
- **Violet 400 — Lavender (#B593FF):** The primary button fill. Ink on lavender is
  7.3:1, so the main call to action gets high contrast *and* stays quiet.
- **Violet 300 (#AE8BF4)** and **Violet 050 (#F2ECFD):** Pill fills and soft badge
  backgrounds.
- **Violet 900 — Aubergine (#17082C):** The only dark page mode, applied on
  `html.bg-color-purple` for full-bleed dark sections.
- **Blue 500 (#29A9FF) / Blue 300 (#50B8FF) / Blue 050 (#E6F4FF):** The secondary
  product hue, used for export/format affordances and one feature card.
- **Cyan 500 — Electric (#01B2FD):** A single card background. See the AA warning
  below.
- **Lime 400 (#F5FF63):** The "new / AI" flag. Highest-energy color in the system,
  restricted to tags and one button variant. It exists to be the only thing on the
  page that is not violet, blue, or grey.
- **Ink 800 (#2D2933):** The newsletter input well — the only dark surface in the
  otherwise-light footer.
- **Grey ramp:** `#E5E4E7` (grey-100, hairlines), `#D7D7DB` (grey-300, unrevealed
  scroll text), `#97979B` (grey-500, muted fills). All violet-tinted; none are
  R=G=B.
- **Error (#FD3456):** A hot coral-red pulled toward the pink end so it sits in the
  same family as the violet. Used as a 1px rule under invalid inputs, never as text
  at body size — on white it reaches only 3.62:1.

**Not tokenized, but present on the live page** (record them so nobody
re-invents a near-duplicate): `#C3C3C6` and `#F3F3F5` (two more greys, collapsed
into `grey-300` and `neutral` respectively), `#A981FF` (a third lavender within
one step of `violet-400`, collapsed into it), `#E4D9FB` / `#CAB3F8` (violet card
tints), `#1E1236` and `#140726` (gradient stops for the export card),
`#0ACF83` (Figma green, brand-locked, import affordances only), `#F05800` /
`#FF7300` (Lottie orange, brand-locked), `#FBA6EC` (`--primary-color-alt`, pink,
appears only as a selection state), and `#000000`, which is the body of the
`<footer>` element showing through the 80px bottom radius of the light footer
panel.

**Two live pairs fail WCAG AA and the tokens above intentionally deviate:**
white text on `grey-500` (#97979B) measures 2.91:1 in the shipped `darkGray`
button, and white text on `cyan-500` (#01B2FD) measures 2.41:1 in the "Animate
with agents" card label. Both tokens specify ink text instead, which passes at
6.1:1 and 7.4:1. If you are reproducing the page pixel-for-pixel you will use
white; if you are extending the system, use ink.

## Typography

Two families, and this is the weakest joint in the system — worth knowing rather
than papering over.

- **TWK Lausanne** (Swiss neo-grotesque, by Weltkern) does every piece of
  display, every heading, every button, every pill, and every card title. It is
  loaded in four weights only — **600, 700, 750, 800** — and there is no regular
  weight at all. Lausanne never sets a paragraph on this site.
- **Inter** does all running text, navigation, inputs, and metadata, in **400 and
  600** only.

The honest critique: these are both neutral grotesques, so the pairing is
differentiated by *role and weight range*, not by classification. Lausanne only
ever appears at 600 and above; Inter only ever at 600 and below. The seam holds
because the two never meet at the same weight — but if you add a 400-weight
Lausanne or an 800-weight Inter anywhere, the whole distinction collapses and the
page will look like one badly-managed font. Inter's presence is also the most
generic choice on the page; it survives because it is doing invisible UI work
under a display face that is doing all the talking.

**Weight 750 is not a typo.** Pull quotes are set at 750 while headings are at
800 — one notch lighter at very large sizes so a 90px quote doesn't out-weigh the
section titles around it. Keep it.

**Tracking is optically corrected at every step**, tightening as size grows: about
-0.02em at 20px, -0.04em at 48px, and -0.032em (-4.5px) at 140px. Line height
moves the opposite way: 150% for body, 100% for headings, and **95% for display**
— tight enough that the two lines of the hero nearly touch, which is what makes it
read as a poster rather than a web page.

### Responsive ladder

Four tiers, driven off a **10px root** (`html { font-size: 10px }`), so every
`rem` in the source is a clean decimal — `6rem` = 60px. Breakpoints: base
(≤1024), **≥1025**, **≥1441**, **≥1729**.

| Level | ≤1024 | ≥1025 | ≥1441 | ≥1729 |
|---|---|---|---|---|
| Hero h1 (`display-hero`) | 60px / 64px on mobile hero | 80px | 115px | 140px |
| Section h1 (`display-lg`) | 60px | 72px | 90px | 96px |
| Section h2 (`headline-lg`) | 40px | 48px | 60px | 72px |
| h3 (`headline-md`) | 30px (w750) | 40px | 50px | 56px |
| h4 (`headline-sm`) | 28px | 28px | 32px | 32px |
| Pull quote (`quote-display`) | 40px | 72px | 90px | 100px |
| Scroll-reveal (`scroll-reveal`) | 36px | 40px | 54px | 60px |
| Body (`body-lg`) | 18px | 18px | 20px | 20px |
| Button (`button-md` → `button-lg`) | 20px | 24px | 26px | 30px |

Letter-spacing tracks the size: hero runs -2.4px, -2.4px, -3.6px, -4.5px across
the four tiers. Body measure is capped at **508px** (≤1440) and **600px** (≥1441)
— roughly 60–70 characters — and centered.

## Layout

**A 20-column grid, centered, on a container that is almost never full width in
practice.**

- Container: `width: calc(100% - 4rem)` — a flat **20px inset** on both sides at
  every breakpoint — with `max-width: 1920px` above 1025px.
- Columns and gutters: **8 columns / 8px gutter** below 1025px, **10 columns /
  20px gutter** at ≥1025, **20 columns / 20px gutter** at ≥1441. The 20-column
  grid is what allows the asymmetric spans (`grid-column: 2 / span 18`) used by the
  hero headline and the scroll-reveal paragraph.
- Most content is centered and constrained well inside the grid rather than
  spanning it: section headers cap at 700–800px, body copy at 508–600px. The grid
  exists to position the few things that break out — carousels, the logo strip, the
  scroll paragraph — not to fill it.

**Section rhythm is the loudest spacing decision on the page.** Every
`.global-section` carries vertical margins of **140px → 200px → 280px → 320px**
across the four tiers. That is extraordinary whitespace, and it is load-bearing:
each section holds an animation, and the emptiness is what stops two animations
from being on screen at once. Do not compress it to fit more above the fold.

Inside components the rhythm tightens sharply: 30–40px between hero stack items,
40–60px card padding, 12px between a card title and its description. The page is
airy between sections and dense within them.

Spacing values are decimal `rem` on the 10px root. Most land on 10px multiples;
the exceptions are deliberate optical nudges (`0.3rem` highlight padding,
`0.55rem` pill padding, `-0.8rem` tag offset) rather than scale violations.

## Elevation & Depth

Depth is **tonal, not shadowed**, for anything structural. Cards are `#F2F1F3` on
`#FFFFFF` — a single step of tone with no border and no shadow. Hairlines
(`#E5E4E7`) do the rest.

Shadows exist, but only under things that are genuinely floating above the page,
and they follow two rules that are worth copying:

**They are tinted with the ink, not with black.** The template card's media shadow
is a five-stop stack in `#19171C` at increasing alpha:

```css
box-shadow:
  0 23.7rem 6.6rem #19171C00,
  0 15.2rem 6.1rem #19171C03,
  0  8.5rem 5.1rem #19171C0D,
  0  3.8rem 3.8rem #19171C17,
  0  0.9rem 2.1rem #19171C1A;
```

**They are stacked, never single.** Five stops from a 237px-offset transparent
haze down to a 9px contact shadow, all straight down (no x-offset — the light is
directly overhead). Maximum alpha is `1A` (10%). The effect is a large soft
lift, not a drop shadow.

The sticky nav pill uses the same idea at smaller scale
(`0 6.2rem 1.7rem #0000, 0 4rem 1.6rem #00000003, 0 2.2rem 1.3rem #00000005,
0 1rem 1rem #0000000A, 0 .2rem .5rem #0000000A`), and escalates to a dramatic
three-stop stack when a mega-menu opens (`0 400px 200px #0000001A,
0 160px 160px #00000014, 0 40px 80px #0000001A`) — the only place on the site
where a shadow is used theatrically.

Never put a shadow on a card, a pill, or a section. They sit *in* the page.

## Shapes

Radius is **hierarchical and large**, scaled to the size of the object:

| Token | Value | Applies to |
|---|---|---|
| `none` | 0 | Badges, the newsletter input's flat edge |
| `sm` | 12px | Small internal chips and controls |
| `md` | 20px | The sticky nav pill (mobile: 10px), bento tiles at ≤1024 |
| `lg` | 40px | Cards, pill tags, bento tiles at ≥1025, the mega-menu's bottom corners |
| `xl` | 80px | The footer panel's bottom corners (40px at ≤1024) |
| `full` | 9999px | All buttons |

Two things carry the shape language. First, **buttons are true pills** — the
medium button is 60px tall with a 50px radius and 50px of horizontal padding, so
the caps are perfect semicircles and the button is far wider than its label needs.
The hero's large button goes further, at 40px×70px padding and a nominal 375px
radius. Second, **containers are radiused far more than convention allows** —
40px on a 480px card, 80px on the footer. Big radii on big objects, which is why
they read as considered rather than as "rounded corners."

The one sharp-cornered thing is the small badge (`rounded: none`), which is
correct: it looks like a printed sticker slapped onto a soft page, and the
contrast is the point.

**The highlighter treatment** is the page's most distinctive shape detail. Card
titles are inline, not block, with a white background, 3px×5px padding,
`box-decoration-break: clone`, and `box-shadow: .1rem 0 #FFF, -.1rem 0 #FFF` to
extend the fill past the glyphs. Multi-line titles get a separate marker-pen
block per line, with ragged right edges. On dark cards it inverts to ink-on-white
type. Reproduce it exactly; a plain background on a block element loses the whole
effect.

## Components

Tokens are in the frontmatter. Behavior, which the tokens can't express:

**Buttons.** Structure is a wrapper `<a>`/`<button>` with an inner `<span>` that
carries the fill. Only the inner span transforms, so the hit area never moves.
Variants: violet (default), blue, black, white, grey, dark-grey, lime, orange,
each with an `outlined` counterpart that swaps the fill for a **2px** border of
the same color and inverts the text. Sizes: small (52px tall), medium (60px), and
large (fluid, `100%` width and max 350px below 1024px, auto above). Icons sit
right of the label with a 16px gap and inherit `currentColor`.

Hover: `transform: scale(1.05)` over **600ms** on the overshoot spring. Active:
`scale(0.9)` over **100ms linear** — deliberately abrupt, so the press feels
mechanical and the release feels elastic. Hover is suppressed entirely on
`body.is-mobile-device`, and `cursor: pointer` is only applied to enabled
controls.

**Nav.** A fixed, `pointer-events: none` header whose children re-enable pointer
events, so the 100px-tall header never blocks the hero. The white pill behind it
(`nav-pill`) is a separate absolutely-positioned element at `opacity: 0`,
`translateY(-12rem)`, wider than the container (`calc(100% + 6rem)`), that slides
in when the page is scrolled. Links are Inter 600/18px with 24px of horizontal
padding in a 70px-tall row. Hovering any one link fades **all the others** to
`opacity: 0.35` over 300ms — the hover state belongs to the nav, not the link.

**Pill tag.** Two sizes with different type families: `m` uses Lausanne 600/20px
(section eyebrows), `s` uses Inter 400/15px with an inline violet "Learn more"
link (the announcement bar in the hero). The fill is a `::before`
pseudo-element at `z-index: -1` so its opacity can drop to 0.7 on hover without
fading the text.

**Cards.** Template card: 480/530/580px wide by breakpoint, `#F2F1F3`, 40px
radius, 40–60px padding, media centered at 45–80% width depending on the asset's
aspect ratio (portrait 2:2.5, tall portrait 480:852, landscape 4:3, square 1:1).
Hover overlays a **35% black scrim** (`#00000059`) fading in over 300ms and pops
a centered button from `scale(1.1)` to `scale(1)` on the overshoot spring over
400ms. On touch devices the same state is reached by a first tap, with the link
only activating on the second — the card is a preview before it is a link.

**Input.** The newsletter field is the only dark surface in the footer: `#2D2933`
with a `1px solid rgba(255,255,255,0.1)` border, no radius on mobile,
`0 40px 40px 0` on desktop where it tucks under the submit button. Placeholder is
white at 54% (`#FFFFFF8A`). Focus turns the border solid white over 350ms; there
is no glow and no ring. Error turns the border `error` — and note the live site
uses the CSS keyword `red` here, which is the one genuinely unconsidered color
value in the stylesheet. Use `#FD3456`.

**Footer.** A `#000000` `<footer>` containing a `#F2F1F3` panel with an 80px
bottom radius, so the black shows only as two small corner notches at the very
end of the page. Padding is 160px top on desktop and 220–280px at the widest
tiers. Column titles are Lausanne 600/18px; links are Inter with `padding: 5px 0`
and a hover that drops opacity to **0.54** over 200ms.

## Motion & Interaction

Motion is the product, so this section is normative, not decorative.

**The four easings, and nothing else.**

| Name | Value | Used for |
|---|---|---|
| Overshoot spring | `--ease-overshoot-linear`: a 100-stop `linear()` curve peaking at **1.52** and settling to 1 | Button hover, card button pop, pill-tag lift |
| Spring bezier | `cubic-bezier(.33, 1.42, .05, .96)` | Hero entrance, nav link travel |
| Standard | `cubic-bezier(.25, .46, .45, .94)` (ease-out-quad) | Every opacity, color, and border transition |
| Expo | `cubic-bezier(.19, 1, .22, 1)` | The header's 1.2s reveal only |

Durations are quantized: **100ms** (button press), **200ms** (footer link
opacity), **300ms** (all standard color/opacity fades), **400ms** (card button
pop), **500ms** (nav radius change), **600ms** (button hover), **800ms** (spring
entrances), **1200ms** (header reveal).

**Hero entrance.** Orchestrated, not staggered-generic. The `<h1>` is present in
the DOM at `opacity: 0.00001` for screen readers and SEO, while the visible
headline is a **Lottie composition** in an absolutely-positioned layer behind it
(`z-index: -1`, `aspect-ratio: 1728/684`, width tracking the breakpoint at
1024/1440/1728px). Once the Lottie starts, three CSS transitions fire off it: the
announcement pill scales `0.75 → 1` on the spring bezier over 800ms after a 450ms
delay, the CTA scales `0 → 1` over 800ms after 200ms, and the sub-headline fades
in over 400ms after 300ms. On devices that fail the performance check the same
motion runs as plain CSS keyframes with a hold at 45% instead.

**The device performance gate** is a real and copyable decision. Before hydration,
`hp-init-2.js` runs 20,000 `Math.pow(Math.sin(...))` iterations on viewports
under 1025px and buckets the elapsed time (`<5ms` high, `<14ms` good, `<22ms`
low, else bad), then cross-checks `navigator.connection.effectiveType`. Anything
below "high" gets `low-performance-device` on `<html>`, which swaps every
JS-driven scroll animation for a static CSS keyframe. Motion this heavy is only
defensible because it degrades on measurement rather than on a media query.

**Scroll behavior is native.** There is no Lenis, no ScrollSmoother, no scroll
hijacking. GSAP `ScrollTrigger` reads the real scroll position; the page never
takes over the wheel.

**The word-by-word reveal** is the signature scroll effect, and it has exact
parameters. GSAP `SplitText` splits the paragraph on `type: "words"`, then:

```js
gsap.to(words, {
  color: "#19171C",              // live value: #000000 — use the ink token
  duration: 0.25,
  stagger: 1,
  scrollTrigger: { trigger, start: "top bottom-=60px", end: "center center", scrub: true }
})
```

Words rest at `grey-300` (#D7D7DB) and darken to ink as the section travels from
60px above the fold to screen center. It runs only after
`document.fonts.ready` (splitting before the webfont loads reflows every word) and
only once, gated by an IntersectionObserver with a 200px root margin.

**Pull quotes parallax out**, they do not fade in: a scrubbed timeline
(`scrub: 1`) from `start: "bottom bottom-=40vh"` to `end: "bottom top"` moves the
quote `y: 0 → 100` and `autoAlpha: 1 → 0`. It leaves rather than arrives.

**The logo strip** cross-fades stacked absolute rows on desktop and becomes a
**90s linear infinite** marquee below 1025px. Logos ship white and are displayed
with `filter: invert()`, with gradient-blur masks over both edges.

**What does not animate**, and this is the important half: body copy, section
headings, cards, the grid, the footer, and anything below the fold that isn't the
scroll paragraph, the quotes, or the logo strip. There is **no universal
fade-up-on-scroll**. Sections simply exist when you reach them. The animation
budget is spent on four specific moments, which is why they land.

## Landing Page Blueprint

Section order, top to bottom, with the values needed to rebuild each one.

**1. Header** — fixed, `z-index: 11`, `pointer-events: none`. Content row 100px
tall, padded `84px 0 45px` on desktop, spanning 12 of 20 columns. Left: logo
(68×24px on mobile) plus nav links (Product, Customers, Templates, Pricing) with
40px gaps, dropping to 24px below 1441. Right: Log in plus a violet CTA. The white
pill slides in on scroll; on scroll-down past the hero the header minimizes by
translating logo and links `-13rem` out of view and sliding a burger button in
from `-6.7rem`. Mega-menus open the pill's bottom corners to 40px and add the
theatrical shadow.

**2. Hero** — `padding: 190px 0 30px` (210px at ≥1441), `margin-top: 0`. Stack,
centered, 30px row gap (35px mobile, 40px at ≥1729): announcement pill
(`pill-tag` size `s`, grey) → `<h1>` "Design in motion. / Now with AI." → violet
CTA "Try Jitter for free" at 240px wide. The `<br>` is hidden above 1024 and shown
below, where the h1 is forced to `64px / 84%` inside a 320px box. Lottie layer
behind, centered at `top: calc(50% - 5.5rem)`. Below the fold-line: "Over 20,000
creative teams use Jitter…" in `body-lg`, then the client logo strip at 35px tall
(40px at ≥1441), full grid width, 80px below.

**3. Templates carousel** — centered header (h2 capped at 700px, description at
614px, `body-lg`) then a horizontally-scrolling row of `card-template`s starting
84px below the text. Cards are fixed-width and do not reflow; the row overflows the
container deliberately and bleeds off both edges.

**4. Scroll-reveal paragraph** — the word-by-word section. `scroll-reveal` type
spanning `1 / span 18` with an 847px cap at ≥1441, left-aligned (the only
left-aligned type block on the page), `margin-bottom: 160px` at ≥1441.

**5. Product video** — a bare `aspect-ratio: 736/460` media block inside the
container, no card, no shadow, no caption.

**6. "From idea to motion in seconds"** — centered header (title capped at 500px,
800px at ≥1441) over three cards at `aspect-ratio: 460/580`, 40px radius, 65px top
padding, in `column-reverse` so the media sits above the text. Backgrounds: neutral
(`Animate with agents`), `cyan-500` (`Refine with full control`), `violet-400`
(`Ship motion at scale`), each with the ink-tinted five-stop shadow. Titles use the
highlighter treatment; descriptions are `secondary`.

**7. "Supercharge your creative range"** — eyebrow pill, h2, then a card grid at
`aspect-ratio: 560/740` (560/700 at ≥1441) with 50–70px internal gaps. Variants:
`neutral`, `cyanBlue` (#E6F4FF with inverted ink highlighter), `blueMagenta`
(#A981FF), and `gradient` (`linear-gradient(#A981FF, #D0BAFE)`, whose title breaks
the highlighter rule and sets 36px/700 white with no fill). Lime `#F5FF63` tags sit
absolutely at `bottom: calc(100% + 1rem)` above titles. Followed by a
`row-gap: 70px` details list under a "Details worth…" header.

**8. Pull quote** — `quote-display` at 750 weight, centered, capped 740px (920px at
≥1441, 1000px at ≥1729), curly quotes included in the markup, 40–60px gap to the
attribution row (avatar + name + role). Parallaxes out on scroll.

**9. "Where teams scale motion"** — four productivity cards: Magic Import,
Auto-resize/auto-translate, Animated components, Batch export.

**10. Second pull quote** — same component, `small` variant (36px, capped 686px).

**11. "Everything your team needs to collaborate…"** — three-to-four cards reusing
the section-7 card component.

**12. Second templates carousel** — "Never start from scratch again," same
component as section 3.

**13. Logo bento** — `background-gray`, h2 "Loved by the best creative teams all
over the world," then a bento of tiles at 20px radius (40px at ≥1025) spanning 5
of 10 / 10 of 20 columns: a `#CAB3F8` changelog tile ("Powerful updates every
week") and a `#F2F1F3` pricing tile ("Start for free. Upgrade anytime.").

**14. Footer** — black element, `#F2F1F3` panel, 80px bottom radius. Top block
centered with 30px gaps: "Try Jitter today" at `display-hero` scale (80px → 140px),
supporting line capped 350–400px, CTA. Then 120–160px down, a four-column link grid
(Product, Resources, Company, Connect) with Lausanne 600/18px headings and Inter
links at 0.54 hover opacity. Newsletter row last: "Get product updates and
inspiration in your inbox every month" at `headline-md` scale, with the dark input
tucked under a pill submit button.

## Do's and Don'ts

- **Do** use `--ease-overshoot-linear` or `cubic-bezier(.33,1.42,.05,.96)` for
  anything that scales or enters. A linear or `ease-in-out` scale reads as a
  different product.
- **Don't** animate on scroll by default. Only the reveal paragraph, the pull
  quotes, and the logo strip respond to scroll; everything else is static. Adding
  fade-up-on-scroll to sections would flatten the four moments that matter.
- **Do** keep 200–320px between sections at desktop widths. If a page feels empty,
  that is the intended reading; cut a section rather than tightening the rhythm.
- **Don't** put a border or a shadow on a card. Depth between page and card is one
  tonal step (`surface` → `neutral`). Shadows belong only to floating media and the
  sticky nav.
- **Do** tint every shadow with `primary` (#19171C) and stack at least four stops
  with zero x-offset, max alpha `1A`. Never `rgba(0,0,0,0.1)`.
- **Do** set TWK Lausanne only at 600/700/750/800 and Inter only at 400/600. A
  400-weight Lausanne or a bold Inter headline destroys the only separation
  between the two families.
- **Don't** introduce a third typeface, and don't reach for a serif for
  "editorial" contrast. The system's contrast comes from scale (140px against
  18px), not from family.
- **Do** use the highlighter treatment for card titles — inline display, white or
  ink fill, `box-decoration-break: clone`, and the ±1px box-shadow. A block
  background instead loses the marker-pen effect on multi-line titles.
- **Don't** spend `tertiary` (#7A40ED) on large areas. Full-saturation violet is
  for links, small badges, and small pill fills only; buttons use `violet-400`. If
  it exceeds about 1% of the painted surface it stops signaling.
- **Don't** add a second accent. `lime-400` is already the exception that carries
  "new / AI"; a third signal color leaves nothing that reads as special.
- **Do** keep the 10px root (`html { font-size: 10px }`) if reproducing the source
  values, since every measurement here is a decimal `rem`. If you normalize to
  16px, convert every value rather than mixing conventions.
- **Do** cap body measure at 508px (600px at ≥1441) and center it. Full-width
  paragraphs under a 115px headline break the poster composition.
- **Don't** use white text on `grey-500` or `cyan-500`. Both fail AA (2.91:1 and
  2.41:1); use `primary` for 6.1:1 and 7.4:1.
- **Do** gate heavy motion on measured device capability, not on a media query,
  and give every JS-driven animation a static CSS fallback.
- **Don't** hijack scrolling. Native scroll with ScrollTrigger reading position is
  a deliberate choice on a site that could easily have justified smooth-scroll.
