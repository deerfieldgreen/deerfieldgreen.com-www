# Deerfield Green — Kintsugi / Wabi-Modern Design System

A complete reference for the site's visual language so another agent (or designer) can
reproduce it faithfully in new pages, new components, or an entirely new project.

The direction is named **Kintsugi / Wabi-Modern**. Kintsugi (金継ぎ) — the Japanese art
of repairing broken pottery with gold lacquer — supplies the single unifying motif:
a thin rule with an asymmetric gold seam. Wabi-sabi supplies the restraint, the
negative space, and the unhurried feeling.

> Mood, in one line: sumi ink brushed onto washi paper, with a single lacquer-gold
> seam. Restrained, asymmetric, patient. Reads like a Kyoto ryokan brochure crossed
> with a quant-firm thesis letter.

---

## 1. Core principles

1. **Typography is the primary design element.** Headlines are bilingual pairs
   (EN + JP) set as a single typographic unit. Do not treat Japanese as a language
   toggle — it is part of the composition.
2. **Ma (間) — negative space — is load-bearing.** Column grids of 12 with content
   in cols 2–7 or 6–11 are preferable to full-bleed content. Right-margin emptiness
   is deliberate.
3. **The kintsugi seam is the only decoration.** It appears between every major
   section, under hero headlines, beside small marks. There are no icons, no
   gradient blobs, no drop-shadowed cards. If you reach for decoration, reach for
   the seam first.
4. **Asymmetry over symmetry.** The gold inflection on the seam sits around 70%
   from the left, not centered. Hero composition leaves the right column empty.
   Section numbers (§ 01 …) sit top-left, never top-center.
5. **Two tones, one accent.** Washi backgrounds carry most of the site; a sumi-black
   band closes each page (CTA). Kintsugi gold is the one color that speaks.
   Ai-zome indigo exists but should be used at most once per page.
6. **Intentional slowness.** Animations are quiet: one seam draws in on scroll,
   text fades once, nothing bounces. Never animate more than needed to be noticed.

---

## 2. Typography

### Font stack

| Role | Family | Where |
|------|--------|-------|
| Display (heading, hero, big type) | **Shippori Mincho** | H1–H3, eyebrows, hero titles, section titles |
| Body / UI | **Inter Tight Variable** | Paragraphs, lists, buttons, form controls |
| Meta | **JetBrains Mono Variable** | Section numbers (§ 01), mono labels, captions |

Shippori Mincho supports both Latin and Japanese — critical for bilingual headlines.
Import only the weights and scripts needed to keep payload manageable:

```ts
import '@fontsource/shippori-mincho/latin-400.css';
import '@fontsource/shippori-mincho/latin-600.css';
import '@fontsource/shippori-mincho/japanese-400.css';
import '@fontsource/shippori-mincho/japanese-600.css';
import '@fontsource-variable/inter-tight';
import '@fontsource-variable/jetbrains-mono';
```

Body font-feature-settings: `'ss01', 'cv11'`. Headings use letter-spacing `-0.01em`
and mono uses tabular numerals.

### Scale

| Element | Desktop | Mobile | Weight | Tracking |
|---------|---------|--------|--------|----------|
| Hero headline (primary lang) | 72–88px | 40–48px | 600 | -0.01em |
| Hero headline (secondary lang) | 44–56px (~64% of primary) | 28–32px | 400 | -0.005em |
| Section H2 | 48–60px | 32–36px | 600 | -0.01em |
| Row/item H3 | 24–32px | 20–24px | 600 | -0.005em |
| Body | 17–20px / 1.55 | 16–17px / 1.55 | 400 | 0 |
| Eyebrow / meta label | 11px mono | 11px mono | 500 | 0.22em uppercase |
| Caption | 11–12px mono | 11px mono | 400 | 0.22em uppercase |

### The bilingual headline pattern

Heroes and CTAs render both English and Japanese lines. The language that is
**primary** for the page gets:

- the larger size,
- the `<h1>` semantic element,
- the default `lang` attribute on the page.

The other language appears below at ~64% of the primary size, in a warm-muted
color, with its own `lang` attribute. A `SeamDivider variant="inline"` sits
between them.

```
Thoughtful. Patient. Quantitative.
思慮深く、辛抱強く、定量的に。
─────────────────────────── ✦ ──
```

Pages in `/ja/` pass `primaryLang="ja"`; pages in `/` pass `primaryLang="en"`.

### Mono eyebrow convention

Every section begins with a mono-uppercase eyebrow that doubles as a dossier
section number:

```
§ 01 / TEAM
§ 02 / FOUNDER
§ 03 / MISSION
§ 04 / CONTACT
```

Tracking is a generous `0.22em`, color is kintsugi gold, size 11px. JP pages use the
same pattern with Japanese section names: `§ 01 / チーム`, `§ 02 / 使命`.

---

## 3. Color system

All colors are defined as CSS custom properties on `:root`. Use the tokens; do not
hardcode hex.

```css
/* Backgrounds */
--aw-color-bg-page:      rgb(244 240 232);  /* washi — default page bg */
--aw-color-bg-surface:   rgb(238 232 221);  /* warmer surface, for inset sections */
--aw-color-bg-sumi:      rgb(23 21 20);     /* sumi black — CTA bands, closing bands */

/* Text */
--aw-color-text-heading: rgb(17 15 13);
--aw-color-text-default: rgb(55 50 45);
--aw-color-text-muted:   rgb(107 99 88);
--aw-color-text-subtle:  rgb(140 131 118);
--aw-color-text-on-sumi: rgb(234 228 216);  /* washi-tone on sumi */

/* Lines */
--aw-color-border:       rgb(220 212 200);

/* Accents */
--aw-color-primary:      rgb(183 138 67);   /* kintsugi gold — lacquer, not glint */
--aw-color-accent:       rgb(183 138 67);
--aw-color-indigo:       rgb(38 58 94);     /* ai-zome — one accent max per page */
```

### Usage rules

- **Washi (`bg-page`)** is the default. Most sections sit on it.
- **Surface (`bg-surface`)** is a slightly deeper washi used to gently separate a
  section (e.g., an "about" band) without crossing into dark territory.
- **Sumi (`bg-sumi`)** is reserved for the closing CTA band and occasional emphasis
  sections. Always pair with `text-on-sumi`.
- **Kintsugi gold** is a lacquer color, not a neon. Use for:
  - the seam mark,
  - mono eyebrows / section numbers,
  - link underlines and outlined buttons,
  - small decorative accents.
- **Ai-zome indigo** is the wildcard. One deliberate use per page (e.g., an active
  nav underline, a single chart series). Never decorative.
- **Contrast:** gold on washi is borderline AA — use only for ≥18px text, underlines,
  or decorative marks. Ink (`text-heading`) on washi is AAA. `text-on-sumi` on
  `bg-sumi` is AAA.

### Selection & utilities

```css
::selection { background: rgb(183 138 67 / 28%); color: rgb(17 15 13); }
```

---

## 4. The kintsugi seam motif

A single reusable component drives the entire visual vocabulary:
`src/components/common/SeamDivider.astro`.

Three variants, two tones.

### Variants

- **`default`** — full-width hairline with a gold mini-segment at ~66–80% from the
  left, plus a tiny SVG zig-zag "seam mark" at 80%. Used between major sections.
- **`inline`** — shorter (max 520px), sits under a bilingual hero headline. Thin
  hairline to the left of the gold mark, a gold hairline stub to the right.
- **`mark`** — just the gold SVG mark, no rule. Used inline with small mono labels.

### SVG seam mark

```svg
<svg width="18" height="12" viewBox="0 0 18 12" fill="none">
  <path d="M2 6 L7 4 L9 8 L13 2 L16 7"
        stroke="currentColor" stroke-width="1.25"
        stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>
```

The path is a 5-point zig-zag that reads as a stylized repaired seam.

### Tones

- `tone="light"` — line color `rgb(17 15 13 / 18%)`, mark color gold. Default.
- `tone="sumi"` — line color `rgb(234 228 216 / 22%)`, mark color gold. For dark
  bands.

### Animation

Seams draw in from the left on scroll-into-view, once per page load, via a custom
Tailwind animation `animate-seam-draw` that maps to:

```css
@keyframes seamDraw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
```

`transform-origin: left; animation: seamDraw 600ms cubic-bezier(0.2, 0.7, 0.2, 1);`

Never animate a seam more than once. Never center the seam. Never loop.

### Rules for placing a seam

- Between every major section — replaces any other divider.
- Under bilingual hero headlines (inline variant).
- Never stack two seams adjacent.
- Never use `text-align: center` containers for seams; they live on grid lines.

---

## 5. Layout

### Grid

- `max-w-7xl` container (1280px) with padding `px-6 md:px-10`.
- 12-column grid (`md:grid md:grid-cols-12`) with `md:gap-16 lg:gap-24` between
  content columns in hero + split sections.
- Hero text sits **col-span 2–7** (leaves cols 8–12 empty — deliberate ma).
- Split sections (text + image) are col-span 7 text, col-span 5 image; reverse with
  `isReversed` as needed.
- Text-only split sections widen the text to col-span 10 (col-start 2) so the
  layout breathes rather than leaving a dead column.

### Section rhythm

A page is a sequence of numbered sections, each following the pattern:

```
(SeamDivider)
§ NN / SECTION LABEL          ← mono eyebrow
Section title.                 ← Shippori Mincho H2
Intro sentence, 52ch max.      ← Inter Tight body
Optional content (list / split / form)
```

Vertical rhythm: `py-24 md:py-36` for major sections, `py-16 md:py-24` for tighter
utility sections (forms, small lists). Sections are separated by a default
`SeamDivider` inside the top of the new section, not between sections.

### Paper-grain overlay

`src/components/common/PaperGrain.astro` renders an SVG fractal-noise overlay at
opacity 0.02–0.04 behind content. Apply it to any `<section>` that sits on washi to
add subtle warmth. Do not stack multiple grains in the same section.

---

## 6. Component inventory (v2)

All v2 widgets live in `src/components/widgets/v2/` and share the aesthetic above.
Use these before reaching for legacy AstroWind widgets.

### `HeroKintsugi`

Bilingual typography-led hero.

```astro
<HeroKintsugi
  eyebrow="§ 01 / TEAM"
  titleEn="Blending Quantitative Investing with Purposeful Philanthropy"
  titleJa="クオンツ投資と目的ある慈善活動の融合"
  subtitle="A boutique firm experience — financial expertise paired with an intense humanity for improving the lives of others."
  primaryLang="en"
  actions={[{ variant: 'primary', text: 'Contact →', href: '/contact/' }]}
/>
```

Key behaviors:
- Swaps which language is `<h1>` based on `primaryLang`.
- Applies correct `lang="en"` / `lang="ja"` attributes to both lines.
- SeamDivider (inline) between the two language lines.
- Mono eyebrow top-left. No image. No card chrome.
- Primary action is a `kintsugi-link` text-link, not a button chip.

### `FeaturesSeam`

Numbered offerings / locations / items list — replaces icon-grid widgets.

```astro
<FeaturesSeam
  id="locations"
  eyebrow="§ 02 / LOCATIONS"
  title="Find us."
  items={[
    { label: 'JAPAN / HQ',  title: 'Tokyo, Japan',     description: 'Minato-ku, Tokyo.' },
    { label: 'USA / OFFICE', title: 'Milton, Georgia', description: 'Greater Atlanta.' },
  ]}
/>
```

Each row: mono `§ 01` gutter, then optional mono label, Shippori title, short body,
optional right-aligned `Learn more →`. `SeamDivider` between rows. Wrap items in an
`<ol>` with `<li>` elements; the divider lives inside each `<li>`, never as a
direct child of the list.

### `ContentKintsugi`

Split text+image. Text column can contain `eyebrow`, `title`, `intro` (HTML ok),
and a numbered dossier `items` list. Image renders with a sumi-duotone filter
(`filter: grayscale(1) sepia(0.25) contrast(1.05) brightness(0.97)`) plus a subtle
gold overlay and a thin border.

```astro
<ContentKintsugi
  id="founder"
  eyebrow="§ 02 / FOUNDER"
  title="Kevin O'Neill Stoll"
  intro="..."
  items={[
    { title: 'Tokyo & Atlanta', description: '...' },
    { title: '20+ years advisory', description: '...' },
  ]}
  image={{ src: '~/assets/images/team-1.jpg', alt: 'Kevin Stoll' }}
  isReversed
/>
```

If no `image` is passed, the text column widens automatically — do not fake an
image column with empty space.

### `CTASumi`

Sumi-black closing band. Bilingual headline, SeamDivider at top, gold-outlined
primary button with sharp corners.

```astro
<CTASumi
  id="contact"
  eyebrow="§ 04 / CONTACT"
  titleEn="Start a conversation."
  titleJa="お話ししましょう。"
  subtitle="Reach out — whether about investment, philanthropy, or a shared curiosity."
  actions={[{ variant: 'primary', text: 'Begin a conversation', href: '/contact/' }]}
  primaryLang="en"
/>
```

### `SeamDivider` / `PaperGrain`

Low-level commons in `src/components/common/`. See §4 for SeamDivider.

---

## 7. Links and buttons

### The `.kintsugi-link` utility

The only link treatment in the system. Underline is gold, 1px, grows slightly on
hover/focus. No background chip, no rounded pill.

```html
<a href="/contact/" class="kintsugi-link font-sans text-[14px] tracking-wide">
  Follow Deerfield Green on LinkedIn →
</a>
```

```css
.kintsugi-link { position: relative; display: inline-flex; color: var(--aw-color-text-heading); text-decoration: none; padding-bottom: 0.18em; }
.kintsugi-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: var(--aw-color-primary); transform-origin: left; transition: transform 420ms cubic-bezier(0.2, 0.7, 0.2, 1); }
.kintsugi-link:hover::after { transform: scaleX(1.04) translateY(-1px); }
```

### Primary button (CTASumi only)

Sharp-cornered (no `border-radius`), 1px gold border, gold text, transparent
background. Hover: gold fill, sumi text. That's the only button chip in the system.
Everything else is a `.kintsugi-link`.

---

## 8. Imagery

Photographs are subdued, warm, and never glossy. All photos get the sumi-duotone
filter when used in `ContentKintsugi` so they match the palette:

```css
filter: grayscale(1) sepia(0.25) contrast(1.05) brightness(0.97);
```

A thin `border-color: var(--aw-color-border)` frames every photo, and a subtle
gold mix-blend-multiply overlay at 10% sits above the image to tie it to the palette.
Captions render as mono-uppercase 11px tracking-0.22em in `text-subtle`.

Unsplash photos keep their attribution — mono 10–11px, right-aligned, muted — with
UTM params preserved (`?utm_source=deerfieldgreen&utm_medium=referral`).

If an image doesn't survive the duotone (too saturated, too busy), retire it rather
than force it.

---

## 9. Motion

- **Seam draw-in**: one per seam, 600ms cubic-bezier, on scroll-into-view.
- **Text fade-in**: `motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade`
  with `animation-delay` staggered by 80ms (eyebrow 0ms, title 80ms, intro 160ms,
  items 240ms, image 320ms).
- **Link underline**: 420ms cubic-bezier scaleX on hover/focus.
- **No scroll parallax, no looping, no marquees, no bouncing buttons.**
- Respect `prefers-reduced-motion` via Tailwind's `motion-safe:` variant — all
  reveal animations are gated behind it.

---

## 10. Page architecture pattern

Every content page follows the same skeleton. Swap sections as needed; keep the
rhythm.

```astro
<Layout metadata={metadata}>
  <!-- Hero ************** -->
  <HeroKintsugi eyebrow="§ 01 / PAGE-NAME" titleEn="..." titleJa="..." primaryLang="en" />

  <!-- Primary content **** -->
  <ContentKintsugi id="..." eyebrow="§ 02 / ..." title="..." intro="..." items={...} image={...} />

  <!-- Secondary content ** -->
  <FeaturesSeam id="..." eyebrow="§ 03 / ..." title="..." items={...} />

  <!-- Closing CTA ******** -->
  <CTASumi id="contact" eyebrow="§ NN / CONTACT"
           titleEn="Start a conversation." titleJa="お話ししましょう。"
           actions={[{ variant: 'primary', text: '...', href: '/contact/' }]}
           primaryLang="en" />
</Layout>
```

- Sections are numbered `§ 01 …` in page order.
- Every page closes with `CTASumi` pointing to `/contact/` (or `/ja/contact/`).
- JP mirror pages (`/ja/*.astro`) use the same widgets with `primaryLang="ja"`,
  translated copy, and `§ 01 / チーム`-style eyebrows.

---

## 11. Tailwind configuration

Relevant extensions beyond stock AstroWind:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary:  'var(--aw-color-primary)',
      accent:   'var(--aw-color-accent)',
      indigo:   'var(--aw-color-indigo)',
      sumi:     'var(--aw-color-bg-sumi)',
      'on-sumi':'var(--aw-color-text-on-sumi)',
    },
    fontFamily: {
      sans:    ['var(--aw-font-sans)', ...defaultTheme.fontFamily.sans],
      serif:   ['var(--aw-font-serif)', ...defaultTheme.fontFamily.serif],
      heading: ['var(--aw-font-heading)', ...defaultTheme.fontFamily.sans],
      mono:    ['var(--aw-font-mono)', ...defaultTheme.fontFamily.mono],
    },
    animation: {
      'seam-draw': 'seamDraw 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both',
    },
    keyframes: {
      seamDraw: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
    },
  },
}
```

---

## 12. Anti-patterns (do NOT do these)

- ❌ Tabler icons, emoji bullets, or colorful flat icons on item lists. Use mono
  labels (`QUANT / AI`) instead.
- ❌ Drop shadows, rounded cards, soft-blur blobs, purple gradients.
- ❌ Centered hero layouts. Heroes are left-aligned with deliberate right-margin
  emptiness.
- ❌ Stacking two colors where one would do. If gold AND indigo appear in the same
  viewport, at least one is wrong.
- ❌ Localization as a language toggle. Bilingual typography is part of the design.
- ❌ Generic "professional advisory" stock photography. Duotone-convert or retire.
- ❌ Replacing the seam mark with a dot, a slash, or a Unicode arrow. The mark is
  the five-point SVG zig-zag in §4.
- ❌ Using Shippori Mincho for body text. It is a display face. Body is Inter Tight.
- ❌ Repeating more than three animations per page, or looping any animation.
- ❌ Adding a CTA band that isn't sumi. The sumi CTA is the page's closing beat.

---

## 13. Rollback reference

A snapshot of the pre-refresh design tokens lives at
`src/components/CustomStyles.legacy.astro` (not imported anywhere). To token-only
rollback without losing the new widgets, copy its contents over
`CustomStyles.astro`. The full pre-refresh state is preserved at git tag
`design-pre-kintsugi`.
