# Voice of the Desert — Site Restructure Design Spec
**Date:** 2026-06-10  
**Reference:** https://www.green-mongolia.com/  
**Status:** Approved

---

## Overview

Restructure the Voice of the Desert website layout inspired by Green Mongolia Hub's structural patterns — 2-column splits, eyebrow labels, card grids, tabbed sections, and a dedicated footer — while preserving VOD's dark desert aesthetic (background `#050508`, Vermilion `#E03D1E`, Basin Teal `#1E5855`, Ochre `#C8841A`, Playfair Display headlines).

---

## Page Structure

**Before:**
```
Hero → About → Actions → Team → Partners → Sponsors → Merch → News → Contact
```

**After:**
```
1.  Hero
2.  Stats Bar          (new)
3.  Featured Video     (new)
4.  About
5.  Actions
6.  Team
7.  Gallery            (new)
8.  Testimonials       (new)
9.  Partners
10. Sponsors
11. Merch
12. News
13. Contact
14. Footer             (new)
```

---

## Section Designs

### 1. Hero (restructured)

**What changes:**
- Remove the 4 animated stats from the Hero body — they move to the Stats Bar below
- Add a second CTA button: primary "Explore the Journey", secondary "Donate Now" (outline style)
- Ticker strip, video background, headline, tagline, description remain unchanged

**Layout:** Full-screen, centred content, same as current.

---

### 2. Stats Bar (new)

**Purpose:** Immediately after Hero — a compact, high-impact strip showing expedition scale.

**Layout:** Full-width horizontal strip, 4 equal columns separated by thin vertical dividers (`white/10`).

**Content per column:**
| Stat | Unit | Label |
|---|---|---|
| 16,000 | KM | Expedition route |
| 7 | Nations | Countries crossed |
| 120 | Days | Expedition duration |
| 100M+ | Reach | Global audience |

**Visual:**
- Background: `#0a0a0d`
- Top border: 1px solid Vermilion
- Number: large, bold, white — animated count-up on scroll entry (Framer Motion)
- Unit: Vermilion, monospace, smaller
- Label: `white/45`, monospace, small, tracking wide
- EN/MN labels from existing `translations.ts` keys (`statsLabel.*`, `statsSubLabel.*`)

---

### 3. Featured Video (new)

**Purpose:** Hook the visitor with expedition footage before reading the mission.

**Layout:** 2-column (55/45), dark bg (`#050508`), Vermilion left-border accent on the left column.

**Left column:**
- Eyebrow: "DESERT MOTION"
- Heading: "Watch the Expedition" (Playfair Display)
- Description: 2 lines about the expedition film/trailer
- 3 feature rows with icons:
  - Globe icon: "16,000 KM across 7 nations"
  - Calendar icon: "120-day live expedition"
  - Film icon: "2 documentaries · daily coverage"
- CTA: "Watch Trailer →" (Vermilion button)

**Right column:**
- YouTube iframe embed (responsive 16:9)
- Rounded corners (`rounded-2xl`)
- Subtle Vermilion/Ochre border glow (`box-shadow`)
- Placeholder URL: use existing trailer URL if available, else a YouTube embed placeholder

**EN/MN:** Both languages supported via `useLanguage` hook.

---

### 4. About (restructured)

**What changes:** Currently a centred text block. Becomes a 2-column split.

**Layout:** 2-column (55/45), eyebrow above heading.

**Left column:**
- Eyebrow: "THE MISSION" (EN) / "ЭРХЭМ ЗОРИЛГО" (MN)
- Heading: "The Mission" (Playfair Display)
- Paragraph 1: existing `about.body` translation (first half)
- Paragraph 2: existing `about.body` translation (second half)
- External link: "Green Mongolia Hub NGO – UNCCD CSO Profile →" with arrow icon

**Right column:**
- Full-height expedition/desert photo
- Image source: existing asset from `/public/` (e.g., team or landscape photo)
- `object-fit: cover`, rounded corners

---

### 5. Actions — Three Pillars (restructured)

**What changes:** Eyebrow label added above heading. Coloured top-border accent per card.

**Layout:** 3-column horizontal card grid (unchanged).

**Additions:**
- Section eyebrow: "THREE PILLARS" above "Three pillars, one route."
- Each card gets a 2px coloured top border:
  - Desert Motion: Vermilion `#E03D1E`
  - Desert Science: Basin Teal `#1E5855`
  - Desert Voice: Ochre `#C8841A`

**Everything else:** Unchanged.

---

### 6. Team (minor change)

**What changes:** Eyebrow label added only.

- Section eyebrow: "THE TEAM" above "Meet the Team"

**Everything else:** Unchanged.

---

### 7. Gallery (new)

**Purpose:** Visual evidence of the expedition — photos, science fieldwork, media moments.

**Layout:** Masonry-style grid — 3 columns desktop, 2 columns tablet, 1 column mobile.

**Per item:**
- Image (from `/public/` existing assets or placeholder slots)
- On hover: dark gradient overlay slides up from bottom
- Overlay content: caption text (short), pillar tag (Motion / Science / Voice) in pillar accent colour

**Section header:**
- Eyebrow: "THE EXPEDITION"
- Heading: "Moments from the Route" (Playfair Display)

**Item count:** 6–8 images. Empty slots show a placeholder with a subtle border and camera icon until real assets are added.

**EN/MN:** Section heading and eyebrow translated. Caption text can be EN-only initially.

---

### 8. Testimonials (new)

**Purpose:** Social proof from UNCCD officials, expedition partners, scientists.

**Layout:** Centred section, 3 cards in a row (desktop), 1 column (mobile).

**Per card:**
- Large `"` in Vermilion (Playfair Display, very large)
- Quote body in `white/80`, Playfair Display italic, 3–4 lines
- Attribution: `white/45`, monospace, small — "— Name · Organisation"
- Card bg: `white/[0.03]`, border `white/8`, rounded `rounded-2xl`

**Section header:**
- Eyebrow: "TESTIMONIALS"
- Heading: "Voices of Support" (Playfair Display)

**Initial content:** 3 placeholder testimonials — UNCCD official, expedition partner, science collaborator. Replace with real quotes when available.

**EN/MN:** Full translation support.

---

### 9. Partners (restructured)

**What changes:** 2-column split + tabbed logo grid with 4 partner categories.

**Layout:** 2-column (45/55).

**Left column:**
- Eyebrow: "OUR PARTNERS"
- Heading: "Joined by Global Institutions" (Playfair Display)
- 1–2 sentences: partnership mission statement
- CTA: "Become a Partner →" (outline button, Vermilion border)

**Right column — tabbed logo grid:**
4 tabs with Vermilion active underline:
1. **Strategic Partners**
2. **Local Partners**
3. **International Partners**
4. **Member Communities**

Each tab shows a responsive logo grid (existing logos assigned to appropriate tab). Active tab underlined in Vermilion. Tab switching: client-side state, no page reload. Logos without partners yet show placeholder border slots.

**Data:** Partner data extended in `constants.ts` to include a `category: 'strategic' | 'local' | 'international' | 'community'` field per partner.

---

### 10. Sponsors (minor change)

**What changes:** Eyebrow label added only.

- Section eyebrow: "OUR SPONSORS" above "Our Sponsors"

**Everything else:** Unchanged (Platinum / Gold / Supporting tier structure stays).

---

### 11. Merch (minor change)

**What changes:** Eyebrow label added only.

- Section eyebrow: "EXPEDITION GEAR" above the Merch heading

**Everything else:** Unchanged.

---

### 12. News (restructured)

**What changes:** Upgrade to a full image-led 3-column card grid.

**Layout:** 3-column card grid desktop, 2-col tablet, 1-col mobile.

**Per card:**
- Top image (16:9, `object-cover`, rounded top)
- Category pill (expedition / science / media / press) — coloured per `CATEGORY_COLOR` from `constants.ts`
- Heading (Playfair Display, 2 lines max)
- Excerpt (1 line, `white/50`)
- Date (monospace, small, `white/30`)
- "Read more →" text link in Vermilion

**Section header:**
- Eyebrow: "LATEST NEWS"
- Heading: "Stay Updated" (Playfair Display)

**Below grid:** "View All →" CTA button (outline, centred).

**Data:** Existing `NEWS` array from `constants.ts` — add an `image` field per news item (placeholder `/public/news/` paths).

---

### 13. Contact (restructured)

**What changes:** Currently a centred form. Becomes a 2-column split.

**Layout:** 2-column (45/55).

**Left column:**
- Eyebrow: "GET IN TOUCH"
- Heading: "Send Us a Message" (Playfair Display)
- 3 contact info rows with icons:
  1. Email icon + `contact@voiceofdesert.org`
  2. Globe icon + `voiceofdesert.org`
  3. Instagram/Facebook icons + social handles

**Right column:**
- Existing contact form (name, email, message, Send button)
- Honeypot anti-spam stays
- Rate limiting unchanged

---

### 14. Footer (new)

**Purpose:** Replace the current implicit footer (copyright line at bottom of Contact) with a dedicated multi-column footer.

**Layout:** 4 columns on `#070709` background, separated by thin `white/8` dividers. Padding: `py-16`.

| Col 1 | Col 2 | Col 3 | Col 4 |
|---|---|---|---|
| VOD camel logo (white) | Quick Links | Three Pillars | Contact |
| Tagline: "Run the route. Read the land. Raise the voice." | Home, About, Pillars, Team, Merch, Contact | Desert Motion, Desert Science, Desert Voice | `contact@voiceofdesert.org` |
| Social icons row (Instagram, Facebook, YouTube) | | Each links to Actions section | `voiceofdesert.org` |

**Bottom bar** (full width, `border-t border-white/8`, `py-4`):
```
© 2026 Voice of the Desert · All rights reserved · UNCCD COP17 Initiative · Powered by UGC Mongolia
```
Centred, monospace, `white/25`, small.

**EN/MN:** Footer link labels translated. Tagline translated.

---

## Cross-Cutting Concerns

### Eyebrow Labels
Every section gets a small eyebrow above its heading:
- Style: monospace, all-caps, tracking `[0.4em]`, `white/40`, `text-[10px]`
- Flanked by short horizontal rules: `<div class="w-8 h-px bg-vermilion/40" />` on each side
- This is the single most visible GMH structural pattern and should be applied consistently

### Dividers
Current `divider-glow` lines between sections in `page.tsx` are kept between all sections except between Contact and Footer (they are visually joined).

### Section Nav (`SectionNav.tsx`)
The dot nav needs updating to register the new sections: Stats Bar, Featured Video, Gallery, Testimonials, Footer. Add `id` attributes to each new section's wrapper.

### Translations (`translations.ts`)
New keys needed:
- `video.eyebrow`, `video.title`, `video.desc`, `video.feature1/2/3`, `video.cta`
- `gallery.eyebrow`, `gallery.title`
- `testimonials.eyebrow`, `testimonials.title`
- `footer.tagline`, `footer.quicklinks`, `footer.pillars`, `footer.contact`
- `news.eyebrow`, `news.viewAll`
- `partners.cta`, `partners.tabs.*` (4 tab labels)

### Constants (`constants.ts`)
- `PARTNERS` array: add `category` field (`'strategic' | 'local' | 'international' | 'community'`)
- `NEWS` array: add `image` field per item
- `TESTIMONIALS` array: new — `{ quote, authorName, authorRole, authorOrg }`
- `GALLERY_ITEMS` array: new — `{ src, caption, pillar }`

### New Components
| File | Description |
|---|---|
| `src/components/sections/StatsBar.tsx` | Animated count-up strip |
| `src/components/sections/FeaturedVideo.tsx` | 2-col video section |
| `src/components/sections/Gallery.tsx` | Masonry image grid |
| `src/components/sections/Testimonials.tsx` | 3-card quote section |
| `src/components/navigation/Footer.tsx` | 4-col footer |

### Modified Components
| File | Change |
|---|---|
| `src/components/sections/Hero.tsx` | Remove stats, add second CTA |
| `src/components/sections/About.tsx` | 2-column split |
| `src/components/sections/Actions.tsx` | Eyebrow + coloured card top borders |
| `src/components/sections/Team.tsx` | Eyebrow label |
| `src/components/sections/Partners.tsx` | 2-col split + tabbed logo grid + category data |
| `src/components/sections/Sponsors.tsx` | Eyebrow label |
| `src/components/sections/Merch.tsx` | Eyebrow label |
| `src/components/sections/News.tsx` | Full image-card grid redesign |
| `src/components/sections/Contact.tsx` | 2-column split |
| `src/app/page.tsx` | Insert new sections in order, add Footer |
| `src/lib/constants.ts` | Add category to partners, image to news, new arrays |
| `src/lib/translations.ts` | New i18n keys |
| `src/components/ui/SectionNav.tsx` | Register new section IDs |

---

## Out of Scope
- Shop (`/shop`) page — no changes
- API routes — no changes
- DonationModal — no changes
- VideoBackground, NoiseOverlay, CustomCursor, Loader — no changes
- Branding tokens (colours, fonts, CSS variables) — no changes
