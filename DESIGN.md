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

What we avoid: centred text over an empty gradient, darkened stock photos, three identical
icon cards, gradient text, glassmorphism. (The original "Mapbox-style dark sections" were dropped
after client feedback; see Colour.)

## Colour

**Revised after client feedback (Nov 2026): "too dark".** The client pointed to bcg.com as the
look they like: mostly white and warm-stone pages, a deep green for headings and strong
surfaces, and one bright green used boldly for highlights. We follow that pattern with our own
values. The logo keeps its blue gradient; blue water and green land read together as Earth.
The site has no dark mode.

| Token | Value | Role |
| --- | --- | --- |
| `ink` | `#0F3324` | Deep forest green: headings, primary buttons, small chips on imagery. Dark bands only over photos. |
| `ink-soft` | `#1B4A36` | Raised surfaces inside the rare dark area. |
| `brand-dark` | `#0E5A36` | Button and link hover. |
| `brand` | `#17784A` | Links, eyebrows, focus rings, active nav (5.5:1 on white, 4.7:1 on stone). |
| `brand-light` | `#8FE07C` | Bright leaf green: highlight buttons, the CTA band, contour lines. Always with `ink` text (8.6:1), never as text on white. |
| `brand-tint` | `#E7F6E1` | Mint bands (process, internships, capabilities), icon tiles, hover. |
| `accent` | `#F08A3C` | Pre-launch "Needs client input" markers and process dots only. |
| `accent-strong` | `#A84D0E` | Accent as text on white. |
| `graphite` | `#23282C` | Body text. |
| `muted` | `#5A6470` | Secondary text, captions (5.2:1 on stone). |
| `line` | `#E3E1DC` | Borders and dividers. |
| `surface` | `#F4F4F1` | Light grey band. |
| `stone` | `#F1EDE6` | Warm band: page headers and footer. |
| white | `#FFFFFF` | Default page background. |
| `success` / `warning` / `danger` | `#1F7A4D` / `#A84D0E` / `#C23B3B` | Form states. |

Rules: pages are light; bands alternate white, `surface`, `brand-tint` and `stone`; one
`brand-light` moment per page (usually the closing CTA); text on `brand-light` is always `ink`.

## Typography

| Use | Family | Why |
| --- | --- | --- |
| h1, h2, big numbers, quotes | **Source Serif 4** 300/400 | A light editorial serif at display sizes, the "consulting report" voice the client liked. |
| h3, body, UI | **Inter** 400/500/600 | Neutral, excellent at small sizes; card titles stay sans and semibold. |
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
