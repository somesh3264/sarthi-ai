# Sarthi AI — Design system

Direction for the website rebuild, starting with the homepage (branch `redesign/homepage`).
Every page should use these tokens by name (Tailwind classes such as `bg-ink`, `text-brand`),
never raw hex values.

## Direction

**"The map is the product."** Sarthi AI sells what it sees from above, so the site leads with real
imagery and real map conventions, on a calm, technical, light-first layout.

What we took from established GIS / Earth-observation sites (studied from their public sites
as we know them; the UXKIN reference library was not connected, so no side-by-side token
comparison was done):

| Site | Pattern we borrow |
| --- | --- |
| Planet | Full-bleed satellite imagery as the hero; image metadata (sensor, date, place) shown as small mono captions. |
| Esri | One confident brand blue for actions; white/very light grey content sections; strict left-aligned grid. |
| Mapbox | Dark "map canvas" sections alternating with light content; precise, small UI labels. |
| SatSure | Indian EO company: outcomes for named sectors (agri, infra, energy) instead of technology lists. |
| Genesys International | Services shown as a scannable index, not as decorative cards. |

What we avoid: centred text over an empty gradient, darkened stock photos, green/gold palettes
unrelated to the logo, three identical icon cards, gradient text, glassmorphism.

## Colour

Built from the logo gradient (`#0C447C → #1D6FA5 → #6FB3DC`), one warm accent and cool neutrals.
The site has no dark mode; "dark" below means dark sections on the light page.

| Token | Value | Role |
| --- | --- | --- |
| `ink` | `#0B1F33` | Headings on light; background of dark sections (hero, CTA band, footer). |
| `ink-soft` | `#14324F` | Raised surfaces and borders inside dark sections. |
| `brand-dark` | `#0C447C` | Logo dark stop. Button hover, link hover. |
| `brand` | `#1D6FA5` | Primary: buttons, links, focus rings, active nav. 5.4:1 on white. |
| `brand-light` | `#6FB3DC` | Logo light stop. Links, labels and focus rings **on dark** (7.3:1 on `ink`). Never body text on white. |
| `brand-tint` | `#E8F2FA` | Tinted backgrounds: icon tiles, selected states. |
| `accent` | `#F08A3C` | One warm accent (sun / sand / map marker). Markers, small highlights and data on dark only. Never body text on white (2.5:1). |
| `accent-strong` | `#A84D0E` | Accent as text on white: badges such as "In development" (5.6:1). |
| `graphite` | `#26364A` | Body text (12.3:1 on white). |
| `muted` | `#52637A` | Secondary text, captions (6.1:1 on white). |
| `line` | `#D9E2EB` | Borders, dividers, table rules. |
| `surface` | `#F3F6F9` | Alternate section background. |
| white | `#FFFFFF` | Default page background. |
| `success` / `warning` / `danger` | `#1F7A4D` / `#A84D0E` / `#C23B3B` | Form states. |

Rules: one blue for every action; the accent appears at most once or twice per screen; dark
sections use `ink` (never green, never a gradient blob).

## Typography

| Use | Family | Why |
| --- | --- | --- |
| Headings | **Archivo** 600/700 | Grotesque with an engineering, cartographic feel; tight and legible at display sizes. |
| Body / UI | **Inter** 400/500/600 | Neutral, excellent at small sizes. |
| Data labels | **IBM Plex Mono** 500 | Coordinates, dates, sensor names, step numbers: the "map legend" voice. |

There is no global `font-family` rule on `*`; `body` sets Inter and headings opt in with
`font-heading` (applied to `h1–h3` in the base layer).

Scale (rem / line-height):

| Token | Size | Use |
| --- | --- | --- |
| `display` | 3.5 → 4.25 (lg) / 1.05 | Homepage H1 only. 2.5 on phones. |
| `h2` | 2.25 / 1.15 (1.875 on phones) | Section titles. |
| `h3` | 1.25 / 1.35 | Card and list titles. |
| `lead` | 1.125 / 1.6 | Intro paragraphs. |
| `body` | 1 / 1.65 | Default. Max line ~68ch. |
| `small` | 0.875 / 1.5 | Captions, secondary. |
| `label` | 0.75 / 1.4, mono, uppercase, 0.08em tracking | Eyebrows, metadata. |

## Layout and spacing

- **One container**: `.container-page` = max width **80rem (1280px)**, side padding 20px (phone),
  32px (≥640px), 40px (≥1024px). Header, every section and footer use it, so all content starts
  on the same left edge.
- Headings are **left-aligned** everywhere. No centred sections.
- **Spacing scale (4px base)**: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Section padding**: 96px top/bottom on desktop (`py-24`), 64px on phones (`py-16`).
- Grid: 12 columns, 32px gutter on desktop, 24px on phones.

## Shape and depth

- Radius: `4px` (badges, inputs), `8px` (buttons, cards, images). No pill-shaped section cards.
- Borders do the separating (1px `line`); one shadow only, for the sticky header on scroll:
  `0 1px 0 line, 0 8px 24px -16px rgba(11,31,51,0.35)`.

## Components

- **Primary button**: `bg-brand text-white`, hover `bg-brand-dark`, 8px radius, 44px min height.
- **Secondary button**: 1px `line` border, `text-ink`, hover border `brand`.
- **On-dark button**: `bg-white text-ink`, hover `bg-brand-tint`.
- **Text link**: `text-brand` + arrow, underline on hover.
- **Focus**: 2px outline, 2px offset, `brand` on light / `brand-light` on dark. Visible on every
  interactive element.
- **Eyebrow**: mono `label` with a short 24px rule before it.
- **Image caption ("map plate")**: mono label with place, sensor and date, e.g.
  `SENTINEL-2 · BHADLA, RAJASTHAN · JAN 2025`.
- **Placeholder** (pre-launch only): dashed `accent-strong` outline + "Needs client input" label.
  Must be removed before launch.
- Header: white, sticky, logo left, nav right, "Contact us" as the primary button.
- Footer: `ink` background, same container, four columns.

## Imagery and icons

- **Real Earth observation first.** Sentinel-2 scenes from `src/assets/satellite/` (credit:
  "Contains modified Copernicus Sentinel data"), shown at full colour, never darkened. Text on
  imagery sits on a solid `ink` panel, not on a dark overlay.
- Map furniture as decoration: coordinate ticks, scale bars, contour lines in `brand-light` at low
  opacity. No glowing cyan graphics.
- Stock photos only when they show real fieldwork (drones, survey teams); never as backgrounds.
- Icons: one 24px line set, 1.75px stroke, in `brand`, on a `brand-tint` 40px tile.
