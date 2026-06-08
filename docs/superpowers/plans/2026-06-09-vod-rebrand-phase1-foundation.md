# VOD Rebrand Phase 1 — Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the new brand v2 foundation: Nunito Sans font, new color tokens, logo/pattern assets, and a global light-theme base — without touching any section component (Phase 3's job).

**Architecture:** All changes are in `globals.css`, `layout.tsx`, two asset-serving files (Header, shop), and static files in `public/`. A `PatternBackground` component is scaffolded but not wired into sections. Legacy color aliases keep existing section components building while their own restyle is deferred to Phase 3.

**Tech Stack:** Next.js App Router, Tailwind CSS 4 (`@theme inline`), self-hosted variable font via `@font-face`, `pdftoppm` (poppler) for PDF→PNG extraction, `cp` for file copies.

---

> **Note on transitional state:** After Phase 1, section components still reference `text-white`, `text-white/60`, etc., which will be low-contrast on the new cream background. This is expected and intentional — it will be resolved in Phase 3. The verification goal for Phase 1 is: build passes, cream background visible, Nunito Sans loads, orange logo in header.

---

## File Structure

**Create:**
- `public/fonts/NunitoSans-VariableFont.ttf`
- `public/fonts/NunitoSans-Italic-VariableFont.ttf`
- `public/patterns/lines-cream.png`
- `public/patterns/maze-mint-pine.png`
- `public/patterns/cells-sky-navy.png`
- `public/patterns/stripes-maroon-ember.png`
- `public/brand/logo-mark-teal.png`
- `public/brand/logo-mark-navy.png`
- `public/brand/logo-mark-orange.png`
- `public/brand/logo-mark-white.png`
- `public/brand/logo-stacked-orange.png`
- `public/brand/logo-stacked-teal.png`
- `public/brand/logo-stacked-navy.png`
- `public/brand/logo-stacked-white.png`
- `public/brand/logo-horizontal-orange.png`
- `public/brand/logo-horizontal-teal.png`
- `public/brand/logo-horizontal-navy.png`
- `public/brand/logo-horizontal-white.png`
- `src/components/ui/PatternBackground.tsx`
- `src/app/_pattern-check/page.tsx` ← **DELETED** at end of Task 8

**Modify:**
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/navigation/Header.tsx`
- `src/app/shop/page.tsx`

---

## Task 1: Copy Nunito Sans variable font files

**Files:**
- Create: `public/fonts/NunitoSans-VariableFont.ttf`
- Create: `public/fonts/NunitoSans-Italic-VariableFont.ttf`

- [ ] **Step 1: Copy font files into public/fonts/ with simplified names**

```bash
cp "/Users/dvkaa/Downloads/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf" \
   /Users/dvkaa/Projects/my-app/public/fonts/NunitoSans-VariableFont.ttf

cp "/Users/dvkaa/Downloads/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf" \
   /Users/dvkaa/Projects/my-app/public/fonts/NunitoSans-Italic-VariableFont.ttf
```

- [ ] **Step 2: Verify both files are present**

```bash
ls -lh /Users/dvkaa/Projects/my-app/public/fonts/NunitoSans*.ttf
```

Expected: two files, each ≥ 100 KB.

- [ ] **Step 3: Commit**

```bash
git add public/fonts/NunitoSans-VariableFont.ttf public/fonts/NunitoSans-Italic-VariableFont.ttf
git commit -m "brand: add Nunito Sans variable font files"
```

---

## Task 2: Replace font stack in globals.css and layout.tsx

**Files:**
- Modify: `src/app/globals.css` (lines 1–16, 85–90)
- Modify: `src/app/layout.tsx` (all)

- [ ] **Step 1: Replace the Roboto @font-face block and font-display class in globals.css**

Replace lines 3–15 (the `/* ── Roboto ── */` block and the 12 `@font-face` declarations):

```css
/* ── Nunito Sans Variable (self-hosted) ─────────────────────────────────────── */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 200 1000;
  font-display: swap;
  src: url('/fonts/NunitoSans-VariableFont.ttf') format('truetype');
}
@font-face {
  font-family: 'Nunito Sans';
  font-style: italic;
  font-weight: 200 1000;
  font-display: swap;
  src: url('/fonts/NunitoSans-Italic-VariableFont.ttf') format('truetype');
}
```

- [ ] **Step 2: Update body font-family in globals.css**

Find the `body { ... }` block and change:

```css
  font-family: 'Roboto', system-ui, -apple-system, sans-serif;
```

to:

```css
  font-family: 'Nunito Sans', system-ui, -apple-system, sans-serif;
```

- [ ] **Step 3: Replace .font-display utility in globals.css**

Replace the `.font-display` block (currently at end of file):

```css
/* ── Brand display — heavy Nunito Sans for editorial headlines ───────────────── */
.font-display {
  font-family: 'Nunito Sans', system-ui, -apple-system, sans-serif;
  font-weight: 800;
  font-style: normal;
}
```

- [ ] **Step 4: Remove Playfair Display from layout.tsx**

Replace the entire `src/app/layout.tsx` with:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Voice of the Desert | UNCCD COP17 Initiative',
  description:
    'A global expedition across 7 Eurasian deserts — uniting ultra-endurance sport, science, and documentary media to combat desertification.',
  keywords: ['UNCCD', 'COP17', 'desertification', 'Mongolia', 'Voice of the Desert', 'climate'],
  icons: [
    { rel: 'icon', url: '/brand/logo-mark-orange.png' },
    { rel: 'apple-touch-icon', url: '/brand/logo-mark-orange.png' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  )
}
```

Note: `body` styles (background, color, font-family) are now fully in `globals.css`. The `bg-obsidian text-white` Tailwind classes are removed — `globals.css` owns the base theme.

- [ ] **Step 5: Run build to verify no font or import errors**

```bash
cd /Users/dvkaa/Projects/my-app && npm run build 2>&1 | tail -20
```

Expected: build succeeds. If it fails with `Cannot find module 'next/font/google'` — that import was already removed in step 4. If it fails for another reason, inspect and fix before proceeding.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "brand: replace Roboto+Playfair with Nunito Sans variable font"
```

---

## Task 3: Replace color tokens in globals.css

**Files:**
- Modify: `src/app/globals.css` (`@theme inline` block, lines 17–32)

- [ ] **Step 1: Replace the entire @theme inline block**

Replace:

```css
@theme inline {
  /* Brand primaries (from brand guidelines v1.0) */
  --color-vermilion: #E03D1E;   /* Brand primary — camel mark, CTAs, Desert Motion */
  --color-teal:      #1E5855;   /* Basin Teal — Desert Science accent */
  --color-ochre:     #C8841A;   /* Ochre — Desert Voice accent */
  --color-bone:      #EDE8DC;   /* Brand light field */

  /* Legacy / supporting tones — kept for backward compat */
  --color-gold:    #D4AF37;
  --color-orange:  #FF6B35;
  --color-red:     #E34234;
  --color-sand:    #C9A84C;
  --color-green:   #2D7A4F;
  --color-obsidian:#050508;
  --color-slate:   #1A1A2E;
}
```

with:

```css
@theme inline {
  /* ── Brand v2 palette ───────────────────────────────────────────────────────── */
  --color-ember:   #F04E13;   /* Primary — logo, CTAs, links */
  --color-peach:   #FF7938;   /* Secondary orange — gradients, hovers */
  --color-cream:   #F8EBC8;   /* Primary light field / base background */
  --color-maroon:  #4F0006;   /* Primary dark contrast / body text */

  --color-mint:    #A1DBB0;   /* Pillar Green — light field */
  --color-pine:    #16433F;   /* Pillar Green — dark field */

  --color-sky:     #A0EDEF;   /* Pillar Blue — light field */
  --color-navy:    #00346F;   /* Pillar Blue — dark field */

  --color-violet:  #8C00B0;   /* Decorative accent */
  --color-magenta: #F10067;   /* Decorative accent */
  --color-lilac:   #D8B4E4;   /* Decorative accent */

  /* ── Legacy aliases — REMOVE when Phase 3 finishes restyling all sections ─── */
  --color-vermilion: var(--color-ember);
  --color-teal:      var(--color-pine);
  --color-ochre:     var(--color-peach);
  --color-bone:      var(--color-cream);
  --color-obsidian:  var(--color-maroon);
  --color-gold:      var(--color-peach);
  --color-orange:    var(--color-ember);
  --color-red:       var(--color-ember);
  --color-sand:      var(--color-cream);
  --color-green:     var(--color-mint);
  --color-slate:     var(--color-navy);
}
```

- [ ] **Step 2: Run build to verify all token references resolve**

```bash
cd /Users/dvkaa/Projects/my-app && npm run build 2>&1 | grep -E "error|Error|warn" | head -20
```

Expected: no errors about undefined CSS variables. Tailwind warnings about unknown utilities are acceptable — they won't block the build.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "brand: replace v1 color tokens with v2 palette + legacy aliases"
```

---

## Task 4: Flip base theme from dark to light

**Files:**
- Modify: `src/app/globals.css` (`body {}`, scrollbar, selection, `.divider-glow`, `.text-gradient-gold`)

- [ ] **Step 1: Update body background and text color**

In the `body { }` block, change:

```css
  background-color: #050508;
  color: white;
```

to:

```css
  background-color: #F8EBC8;
  color: #4F0006;
```

- [ ] **Step 2: Update scrollbar thumb color**

Change:

```css
::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.4); border-radius: 2px; }
```

to:

```css
::-webkit-scrollbar-thumb { background: rgba(240,78,19,0.4); border-radius: 2px; }
```

- [ ] **Step 3: Update ::selection color**

Change:

```css
::selection { background: rgba(212,175,55,0.25); color: white; }
```

to:

```css
::selection { background: rgba(240,78,19,0.25); color: #4F0006; }
```

- [ ] **Step 4: Update .divider-glow**

Change:

```css
  background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent);
```

to:

```css
  background: linear-gradient(90deg, transparent, rgba(240,78,19,0.3), transparent);
```

- [ ] **Step 5: Update .text-gradient-gold**

Change:

```css
  background: linear-gradient(135deg, #E03D1E, #C8841A);
```

to:

```css
  background: linear-gradient(135deg, #F04E13, #FF7938);
```

- [ ] **Step 6: Run build**

```bash
cd /Users/dvkaa/Projects/my-app && npm run build 2>&1 | tail -10
```

Expected: build succeeds.

- [ ] **Step 7: Start dev server and visual check**

```bash
cd /Users/dvkaa/Projects/my-app && npm run dev -- --port 4000 &
sleep 5
```

Open `http://localhost:4000` in browser. Verify:
- Page background is cream/warm beige (not dark)
- Text is dark maroon (not white on white)
- Navbar logo still appears (old SVG mark, will be replaced in Task 7)
- Console: no critical JS errors

Section content will look broken (white text on cream) — that is expected and will be fixed in Phase 3.

Kill dev server: `kill %1` (or close terminal tab).

- [ ] **Step 8: Commit**

```bash
git add src/app/globals.css
git commit -m "brand: flip base theme from dark ink to light cream"
```

---

## Task 5: Extract pattern textures from PATTERN.pdf

**Files:**
- Create: `public/patterns/lines-cream.png`, `maze-mint-pine.png`, `cells-sky-navy.png`, `stripes-maroon-ember.png`

- [ ] **Step 1: Create patterns directory**

```bash
mkdir -p /Users/dvkaa/Projects/my-app/public/patterns
```

- [ ] **Step 2: Render all 4 PDF pages to PNG**

```bash
pdftoppm -png -r 300 "/Users/dvkaa/Downloads/PATTERN.pdf" /tmp/pattern
ls /tmp/pattern-*.png
```

Expected: 4 files — `/tmp/pattern-1.png` through `/tmp/pattern-4.png`, each 2084×2084.

PDF page → pattern mapping (based on what each page shows):
- Page 1 (`pattern-1.png`): peach/cream wavy dash lines → `lines-cream`
- Page 2 (`pattern-2.png`): fingerprint maze, mint on dark pine → `maze-mint-pine`
- Page 3 (`pattern-3.png`): cell/crystal, sky blue on navy → `cells-sky-navy`
- Page 4 (`pattern-4.png`): diagonal stripes, ember orange on maroon → `stripes-maroon-ember`

- [ ] **Step 3: Copy to public/patterns/ with descriptive names**

```bash
cp /tmp/pattern-1.png /Users/dvkaa/Projects/my-app/public/patterns/lines-cream.png
cp /tmp/pattern-2.png /Users/dvkaa/Projects/my-app/public/patterns/maze-mint-pine.png
cp /tmp/pattern-3.png /Users/dvkaa/Projects/my-app/public/patterns/cells-sky-navy.png
cp /tmp/pattern-4.png /Users/dvkaa/Projects/my-app/public/patterns/stripes-maroon-ember.png
```

- [ ] **Step 4: Verify files and file sizes**

```bash
ls -lh /Users/dvkaa/Projects/my-app/public/patterns/
```

Expected: 4 PNG files, each in the 300–700 KB range. If any is missing, re-run step 2.

- [ ] **Step 5: Commit**

```bash
cd /Users/dvkaa/Projects/my-app
git add public/patterns/
git commit -m "brand: add pattern texture assets (lines, maze, cells, stripes)"
```

---

## Task 6: Copy logo files into public/brand/

**Files:**
- Create: 12 files in `public/brand/`

- [ ] **Step 1: Create brand directory**

```bash
mkdir -p /Users/dvkaa/Projects/my-app/public/brand
```

- [ ] **Step 2: Copy all 12 logo files with descriptive names**

Source files are in `~/Downloads/VOD/VOD BRANDING/`. The mapping (identified by image dimensions and dominant ink color):

```bash
LOGOS="/Users/dvkaa/Downloads/VOD/VOD BRANDING"
DEST="/Users/dvkaa/Projects/my-app/public/brand"

# Camel mark only (2500×2500 squares)
cp "$LOGOS/viber_image_2026-05-31_09-20-36-826.png" "$DEST/logo-mark-teal.png"
cp "$LOGOS/viber_image_2026-05-31_09-20-37-766.png" "$DEST/logo-mark-navy.png"
cp "$LOGOS/viber_image_2026-06-05_21-23-03-829.png" "$DEST/logo-mark-orange.png"
cp "$LOGOS/viber_image_2026-05-31_09-20-43-433.png" "$DEST/logo-mark-white.png"

# Stacked lockup — camel above "VOICE of the desert" (2500×2500 squares)
cp "$LOGOS/viber_image_2026-05-31_09-20-38-538.png" "$DEST/logo-stacked-orange.png"
cp "$LOGOS/viber_image_2026-05-31_09-20-39-361.png" "$DEST/logo-stacked-teal.png"
cp "$LOGOS/viber_image_2026-05-31_09-20-40-165.png" "$DEST/logo-stacked-navy.png"
cp "$LOGOS/viber_image_2026-05-31_09-20-44-188.png" "$DEST/logo-stacked-white.png"

# Horizontal lockup — camel left of "VOICE of the desert" (3802×1635 landscape)
cp "$LOGOS/viber_image_2026-05-31_09-20-40-962.png" "$DEST/logo-horizontal-orange.png"
cp "$LOGOS/viber_image_2026-05-31_09-20-41-807.png" "$DEST/logo-horizontal-teal.png"
cp "$LOGOS/viber_image_2026-05-31_09-20-42-663.png" "$DEST/logo-horizontal-navy.png"
cp "$LOGOS/viber_image_2026-05-31_09-20-44-980.png" "$DEST/logo-horizontal-white.png"
```

- [ ] **Step 3: Verify all 12 files are present**

```bash
ls /Users/dvkaa/Projects/my-app/public/brand/ | wc -l
```

Expected: `12`

- [ ] **Step 4: Commit**

```bash
cd /Users/dvkaa/Projects/my-app
git add public/brand/
git commit -m "brand: add v2 logo assets (mark, stacked, horizontal in all colorways)"
```

---

## Task 7: Update logo references in Header and shop page

**Files:**
- Modify: `src/components/navigation/Header.tsx` (line ~44)
- Modify: `src/app/shop/page.tsx` (line ~61)

Both files currently reference `/voice-of-the-desert-mark.svg`. In Phase 1 we swap to the orange mark PNG. (The header layout will be fully redesigned in Phase 3 to potentially use the horizontal lockup; for now, the mark fits the existing `h-10 w-auto` sizing.)

- [ ] **Step 1: Update logo src in Header.tsx**

Find:

```tsx
              src="/voice-of-the-desert-mark.svg"
```

Replace with:

```tsx
              src="/brand/logo-mark-orange.png"
```

- [ ] **Step 2: Update logo src in shop/page.tsx**

Find:

```tsx
            src="/voice-of-the-desert-mark.svg"
```

Replace with:

```tsx
            src="/brand/logo-mark-orange.png"
```

- [ ] **Step 3: Run build**

```bash
cd /Users/dvkaa/Projects/my-app && npm run build 2>&1 | tail -10
```

Expected: build succeeds.

- [ ] **Step 4: Quick visual check**

```bash
cd /Users/dvkaa/Projects/my-app && npm run dev -- --port 4000 &
sleep 5
```

Open `http://localhost:4000`. Verify:
- Header shows the orange camel mark (not the old SVG mark)
- Favicon in browser tab has changed to the orange PNG mark
- No broken image icons

Kill dev server after checking.

- [ ] **Step 5: Commit**

```bash
git add src/components/navigation/Header.tsx src/app/shop/page.tsx
git commit -m "brand: swap header and shop logos to v2 orange mark"
```

---

## Task 8: Build PatternBackground component + smoke-check + cleanup

**Files:**
- Create: `src/components/ui/PatternBackground.tsx`
- Create (temp): `src/app/_pattern-check/page.tsx`
- Delete (temp): `src/app/_pattern-check/page.tsx`

- [ ] **Step 1: Create PatternBackground component**

Create `src/components/ui/PatternBackground.tsx`:

```tsx
type Pattern = 'lines' | 'maze' | 'cells' | 'stripes'

const PATTERN_FILES: Record<Pattern, string> = {
  lines:   '/patterns/lines-cream.png',
  maze:    '/patterns/maze-mint-pine.png',
  cells:   '/patterns/cells-sky-navy.png',
  stripes: '/patterns/stripes-maroon-ember.png',
}

interface PatternBackgroundProps {
  pattern: Pattern
  opacity?: number
  className?: string
}

export default function PatternBackground({
  pattern,
  opacity = 0.15,
  className = '',
}: PatternBackgroundProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <div
        style={{
          opacity,
          backgroundImage: `url(${PATTERN_FILES[pattern]})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
        }}
        className="absolute inset-0"
      />
    </div>
  )
}
```

- [ ] **Step 2: Create temporary smoke-check route**

Create `src/app/_pattern-check/page.tsx`:

```tsx
import PatternBackground from '@/components/ui/PatternBackground'

const COMBOS: { pattern: 'lines' | 'maze' | 'cells' | 'stripes'; bg: string; label: string }[] = [
  { pattern: 'lines',   bg: '#F8EBC8', label: 'lines-cream (cream bg)'     },
  { pattern: 'maze',    bg: '#A1DBB0', label: 'maze-mint-pine (mint bg)'   },
  { pattern: 'cells',   bg: '#A0EDEF', label: 'cells-sky-navy (sky bg)'    },
  { pattern: 'stripes', bg: '#4F0006', label: 'stripes-maroon-ember (maroon bg)' },
]

export default function PatternCheck() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100vh' }}>
      {COMBOS.map(({ pattern, bg, label }) => (
        <div key={pattern} style={{ position: 'relative', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PatternBackground pattern={pattern} opacity={0.3} />
          <span style={{ position: 'relative', zIndex: 10, fontWeight: 700, color: pattern === 'stripes' ? '#fff' : '#4F0006' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Run dev server and verify patterns**

```bash
cd /Users/dvkaa/Projects/my-app && npm run dev -- --port 4000 &
sleep 5
```

Open `http://localhost:4000/_pattern-check`.

Verify all four quadrants show:
- Tiled wavy-line texture on cream background
- Tiled fingerprint/maze texture on mint background
- Tiled cell/crystal texture on sky-blue background
- Tiled diagonal stripe texture on maroon background

Each label should be legible over its pattern.

Kill dev server.

- [ ] **Step 4: Delete the smoke-check route**

```bash
rm -rf /Users/dvkaa/Projects/my-app/src/app/_pattern-check
```

- [ ] **Step 5: Commit**

```bash
cd /Users/dvkaa/Projects/my-app
git add src/components/ui/PatternBackground.tsx
git commit -m "brand: add PatternBackground component (wired in Phase 3)"
```

---

## Task 9: Final build verification

- [ ] **Step 1: Run production build**

```bash
cd /Users/dvkaa/Projects/my-app && npm run build 2>&1 | tail -20
```

Expected: build exits 0 with no errors. Warnings about unused CSS variables or image formats are acceptable.

- [ ] **Step 2: Start dev server for final visual pass**

```bash
cd /Users/dvkaa/Projects/my-app && npm run dev -- --port 4000 &
sleep 5
```

Open `http://localhost:4000` and verify ALL of:
- [ ] Page background is warm cream (`#F8EBC8`), not dark
- [ ] Body text is dark maroon, not white-on-white invisible
- [ ] Header shows orange camel mark logo (not old SVG)
- [ ] Browser tab favicon is the orange PNG mark
- [ ] Open DevTools → computed styles on `<body>` → font-family includes `Nunito Sans`
- [ ] Open DevTools → Network → filter by Font → confirm `NunitoSans-VariableFont.ttf` loaded (status 200)
- [ ] No 404 errors for any brand/pattern assets in Network tab

Kill dev server.

- [ ] **Step 3: Final commit if any loose changes**

```bash
cd /Users/dvkaa/Projects/my-app && git status
# Stage and commit any remaining unstaged changes if present
```
