# Voice of the Desert — Rebrand Phase 1: Foundation

**Date:** 2026-06-09
**Status:** Approved for planning

## Context

Voice of the Desert is adopting a new brand identity (v2), supplied as:
- `~/Downloads/COLOR PALETTE.pdf` — new color swatches
- `~/Downloads/PATTERN.pdf` — 4 organic raster pattern textures
- `~/Downloads/GRAPHIC MOTIF.pdf` — example color-block + pattern + logo layouts per colorway
- `~/Downloads/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf` + italic variant — new typeface
- `~/Downloads/VOD/VOD BRANDING/*.png` — 12 logo lockup/mark files in three colorways (orange, navy, teal)

This is a **full replacement** of the v1 brand (Vermilion `#E03D1E` / Basin Teal `#1E5855` / Ochre `#C8841A`, Playfair Display + Roboto, dark `#050508` "Ink" theme) recorded in the brand guidelines memory.

The rebrand is too large for one implementation pass, so it is broken into four phases:

1. **Foundation** (this spec) — tokens, fonts, logo/pattern assets, base theme flip
2. Hero — re-tint the R3F 3D scene from dark to light/warm
3. Content sections — restyle About/Actions/Team/Partners/Sponsors/Merch/News/Contact
4. Secondary surfaces — `/shop`, `DonationModal`, footer, metadata/favicon

Phase 1 unblocks all later phases by establishing the tokens, assets, and base theme they'll build on.

## Goals

- Replace the v1 color system with the new palette, mapped onto the existing 3-pillar structure
- Replace Playfair Display + Roboto with self-hosted Nunito Sans Variable everywhere
- Bring the new logo files and pattern textures into the project as usable assets
- Flip the global base theme from dark (`#050508` + white text) to light (cream field + dark text)

Out of scope for this phase: restyling the Hero 3D scene or any individual content section — those are later phases and may still reference v1 tokens until their own phase lands (acceptable transitional state).

## Design

### A. Color tokens

Replace the `vermilion`/`teal`/`ochre`/`bone`/`obsidian`/`slate`/legacy tokens in `globals.css` `@theme inline` with:

| Token | Hex | Role |
|---|---|---|
| `--color-ember` | `#F04E13` | Primary brand — logo, CTAs, links, primary pillar accent (replaces Vermilion) |
| `--color-cream` | `#F8EBC8` | Primary light field / default background |
| `--color-maroon` | `#4F0006` | Primary dark contrast — body text on light fields, dark color blocks |
| `--color-mint` | `#A1DBB0` | Pillar Green — light field |
| `--color-pine` | `#16433F` | Pillar Green — dark field/contrast (derived shade matching motif sheet; no explicit hex supplied) |
| `--color-sky` | `#A0EDEF` | Pillar Blue — light field |
| `--color-navy` | `#00346F` | Pillar Blue — dark field/contrast |
| `--color-violet` | `#8C00B0` | Decorative accent (sparing use) |
| `--color-magenta` | `#F10067` | Decorative accent (sparing use) |
| `--color-lilac` | `#D8B4E4` | Decorative accent (sparing use) |
| `--color-peach` | `#FF7938` | Secondary orange tint (cards, hovers, gradients alongside Ember) |

`--color-pine` has no explicit hex in the supplied palette — it's derived to visually match the dark teal shown pairing with Mint in `GRAPHIC MOTIF.pdf` page 2. If the brand owner later supplies an exact value, swap it in (single token, no cascading changes needed).

### B. Typography

- Copy `NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf` and `NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf` into `public/fonts/`
- Add `@font-face` rules in `globals.css` declaring `'Nunito Sans'` as a variable font (`font-weight: 200 1000`, normal + italic), `font-display: swap`
- Set `--font-sans: 'Nunito Sans', system-ui, -apple-system, sans-serif` and apply to `body`
- Update `.font-display` to use the same family at a heavier weight (e.g. `font-weight: 800`) instead of `var(--font-display, 'Georgia', serif)`
- Remove the `Playfair_Display` import, `playfair` const, and its `variable` class from `layout.tsx`
- Remove the 12 self-hosted Roboto `@font-face` declarations (superseded)

### C. Logo & pattern assets

**Logos** — copy from `~/Downloads/VOD/VOD BRANDING/` into `public/brand/`:
- `logo-horizontal-orange.png` / `logo-horizontal-navy.png` — full "VOICE of the desert" wordmark lockups
- `logo-mark-orange.png` / `logo-mark-teal.png` / `logo-mark-navy.png` — camel-only marks
- `logo-stacked-orange.png` / `logo-stacked-teal.png` / `logo-stacked-navy.png` — square badge lockups (camel over wordmark)

Update `layout.tsx` metadata `icons` to reference the new orange mark for favicon/apple-touch-icon, and update any direct references to `/voice-of-the-desert-mark.svg` and `/logo.png` across components to the new orange horizontal lockup (primary) or navy mark (when placed on light/bright color blocks where orange-on-cream contrast is weak).

**Patterns** — extract the 4 raster textures from `PATTERN.pdf` with `pdfimages -png`, recolor/save into `public/patterns/`:
- `lines-cream.png` (wavy lines, cream/peach — pairs with Ember/Cream sections)
- `maze-mint-pine.png` (fingerprint/maze, mint on pine — pairs with Green pillar sections)
- `cells-sky-navy.png` (cell/crystal, sky on navy — pairs with Blue pillar sections)
- `stripes-maroon-ember.png` (diagonal stripes, ember on maroon — pairs with dark contrast blocks)

Add a small `PatternBackground` component (`src/components/ui/PatternBackground.tsx`) that renders an absolutely-positioned, low-opacity, tiled background image behind a section's content — takes a `pattern` prop selecting one of the four textures (`'lines' | 'maze' | 'cells' | 'stripes'`, mapped internally to the asset filenames). It is not wired into any section in this phase — that wiring is Phase 3's job. Its correctness is verified directly (render it in isolation / Storybook-less smoke check via a temporary route or unit test that asserts the right image src and classes), not via a placeholder left in production markup.

### D. Theme flip

In `globals.css`:
- `body` background changes from `#050508` to `var(--color-cream)`, text color from `white` to `var(--color-maroon)`
- `::-webkit-scrollbar-thumb` and `::selection` change from gold-tinted (`rgba(212,175,55,…)`) to ember-tinted (`rgba(240,78,19,…)`)
- `.text-gradient-gold` gradient changes from `#E03D1E, #C8841A` to `#F04E13, #FF7938` (Ember → Peach)
- `.divider-glow` gradient changes from gold-tinted to ember-tinted
- Remove now-unused legacy tokens (`gold`, `orange`, `red`, `sand`, `green`, `obsidian`, `slate`)

`layout.tsx`'s `<body className="min-h-full bg-obsidian text-white">` changes to reference the new cream/maroon tokens (or relies on the new `body` base styles — whichever is cleaner given Tailwind's `@theme inline` token generation).

## Transitional state

Components in `src/components/sections/*` still reference `bg-vermilion`, `text-vermilion`, `bg-obsidian`, `text-white/60`, etc. After Phase 1 lands, Tailwind will no longer generate utilities for the removed tokens, so **these components will fail to build** unless updated. Two options:

1. Keep old token names as aliases pointing to new hex values during the transition (e.g. `--color-vermilion: var(--color-ember)`), removed once Phase 3 finishes restyling all sections
2. Do a mechanical find-and-replace of old → new token names across all section components as part of Phase 1, even though their surrounding layout/spacing/dark-theme assumptions won't be fully restyled until Phase 3

**Decision: Option 1 (aliases).** This keeps Phase 1 focused on foundation work and avoids touching section files twice. Add a small "legacy alias" block to `@theme inline`:
```
--color-vermilion: var(--color-ember);
--color-teal:      var(--color-pine);
--color-ochre:     var(--color-peach);
--color-bone:      var(--color-cream);
--color-obsidian:  var(--color-maroon);
```
This block is deleted in Phase 3 once all sections reference the new names directly.

## Testing

- `npm run build` succeeds with no missing-token / missing-font errors
- Visual check on `localhost:4000`: page loads with cream background, dark maroon text, Nunito Sans rendering (inspect via devtools computed font-family), new logo/favicon visible in browser tab
- No console errors about missing font files or broken image paths
