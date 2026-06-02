---
name: Just One Sip
description: A bilingual daily cocktail poster experience with one drink, one visual, every day.
colors:
  charred-walnut: "#15120f"
  deep-walnut-panel: "#211b17"
  burnt-wood-panel: "#2b221d"
  stage-black: "#050403"
  poster-black: "#0e0d0b"
  cream-ink: "#f7efe5"
  smoked-taupe: "#c7b7a6"
  bitter-ruby: "#d3513c"
  vermouth-gold: "#e3b35f"
  dark-label-ink: "#1a120e"
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(3.4rem, 8vw, 7.8rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "0"
  immersive-display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(4.8rem, 12vw, 10rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "0"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.02rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.14em"
rounded:
  menu-item: "7px"
  card: "8px"
  toast: "16px"
  sheet: "18px 18px 0 0"
  pill: "999px"
  circle: "50%"
spacing:
  topbar-x: "clamp(14px, 3vw, 34px)"
  topbar-y: "clamp(16px, 3vw, 34px)"
  page-gutter: "16px"
  compact-gap: "10px"
  card-gap: "22px"
  section-y: "56px"
components:
  icon-button:
    textColor: "{colors.cream-ink}"
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
  recipe-handle:
    textColor: "{colors.cream-ink}"
    rounded: "{rounded.pill}"
    height: "42px"
    padding: "0 16px"
  archive-card:
    backgroundColor: "{colors.deep-walnut-panel}"
    textColor: "{colors.cream-ink}"
    rounded: "{rounded.card}"
  button-primary:
    backgroundColor: "{colors.vermouth-gold}"
    textColor: "{colors.dark-label-ink}"
    rounded: "{rounded.card}"
    padding: "12px 18px"
---

# Design System: Just One Sip

## 1. Overview

**Creative North Star: "Midnight Pour"**

Just One Sip is a poster-first cocktail surface. The daily drink should feel staged under low bar light: full-bleed imagery, warm cream type, a gold cue for orientation, and compact controls that stay out of the frame until needed.

The system is brand-first, not workflow-first. Utility exists in tight layers: icon tools, small menus, a bottom recipe sheet, and a visual archive. Avoid AI-template cliches, generic hero/card grids, purple gradients, decorative glassmorphism, and feature-marketing copy.

**Key Characteristics:**
- Image-led immersive viewports with text placed directly over the poster scene.
- Warm dark neutrals, cream text, bitter red atmosphere, and vermouth-gold labels.
- Georgia display type for cocktail names, system sans for clear recipe and UI text.
- Compact circular icon controls, pill handles, and 8px content cards.
- Bilingual title fitting and mobile overflow prevention are core brand constraints.

## 2. Colors

The palette is a night-bar palette: charred dark surfaces, warm cream text, bitter ruby atmosphere, and gold used as the smallest readable signal.

### Primary

- **Charred Walnut** (`#15120f`): The global page background and theme color. It keeps non-immersive pages connected to the low-light poster mood.
- **Cream Ink** (`#f7efe5`): Primary text, icons, borders, and glass highlights. It is warm instead of pure white.
- **Vermouth Gold** (`#e3b35f`): Orientation labels, dates, primary detail-page buttons, and key ingredient labels.

### Secondary

- **Bitter Ruby** (`#d3513c`): Atmospheric accent used in background gradients and generated cocktail scenes. It should rarely carry UI text.
- **Smoked Taupe** (`#c7b7a6`): Secondary body text, footer text, nav defaults, and muted card copy.

### Neutral

- **Deep Walnut Panel** (`#211b17`): Card and meta-panel base.
- **Burnt Wood Panel** (`#2b221d`): Stronger panel surface when a deeper layer is needed.
- **Stage Black** (`#050403`): Immersive stage background behind full-bleed media.
- **Poster Black** (`#0e0d0b`): Image placeholder and poster-frame backing.
- **Dark Label Ink** (`#1a120e`): Text on Vermouth Gold buttons.

### Named Rules

**The Bar-Light Rule.** Gold is a cue, not a wash. Use it for labels, dates, and the single strongest action, not for broad panels.

**The Warm Neutral Rule.** Never introduce pure `#000` or `#fff`; every dark and light should stay tinted toward the existing warm palette.

## 3. Typography

**Display Font:** Georgia with Times New Roman and serif fallback.
**Body Font:** Inter with system sans fallbacks.
**Label Font:** Inter with system sans fallbacks.

**Character:** The type pairing is classic and direct: Georgia gives cocktail names a poster headline quality, while the sans stack keeps recipes, controls, and metadata readable.

### Hierarchy

- **Immersive Display** (700, `clamp(4.8rem, 12vw, 10rem)`, `0.94`): Full-screen cocktail names. Runtime fitting may reduce the size to protect single-line CJK and single-word titles.
- **Display** (700, `clamp(3.4rem, 8vw, 7.8rem)`, `0.9`): Detail and archive page titles.
- **Headline** (700, `clamp(1.6rem, 3vw, 2.4rem)`, normal): Section and sheet headings.
- **Body** (400, `1.02rem`, `1.75`): Descriptions and recipe copy. Keep prose short and below roughly 65ch where layout allows.
- **Label** (700, `0.78rem`, `0.14em`, uppercase): Kicker text, metadata labels, and menu labels.

### Named Rules

**The Natural Break Rule.** Do not force hard word breaking. CJK and single-word titles prefer one line; multi-word names may wrap only at natural breaks.

**The Label Rarity Rule.** Uppercase tracked labels are for orientation and recipe metadata only. Do not turn every section into a label-plus-heading pattern.

## 4. Elevation

Depth is functional and image-first. The system uses shadow, blur, and translucent dark layers to keep text and controls legible over full-bleed imagery. This is not decorative glassmorphism; if the blur does not protect readability or state, remove it.

### Shadow Vocabulary

- **Ambient Sheet** (`0 24px 80px rgba(0, 0, 0, 0.38)`): Recipe dialog and large framed surfaces.
- **Ambient Menu** (`0 24px 80px rgba(0, 0, 0, 0.42)`): Utility menu panels floating over imagery.
- **Compact Control** (`0 14px 44px rgba(0, 0, 0, 0.24)`): Floating share/download controls.
- **Toast Lift** (`0 16px 46px rgba(0, 0, 0, 0.34)`): Tooltip and copied-state feedback.

### Named Rules

**The Legibility Layer Rule.** Shade, blur, and shadow are allowed only where imagery would otherwise damage text or control clarity.

## 5. Components

### Buttons

- **Shape:** Compact rectangles use 8px corners; immersive tools use 44px circles; recipe access uses a pill.
- **Primary:** Vermouth Gold background with Dark Label Ink text, 12px by 18px padding, and no extra shadow.
- **Hover / Focus:** Use a subtle border or background shift and small translateY motion. Focus must remain visible.
- **Icon Buttons:** Circular, translucent dark, cream icon, thin cream border, and blur only over imagery.

### Chips

- **Style:** Tags are cream/taupe text in pill borders with transparent backgrounds.
- **State:** Current chips are informational, not filters. Do not add selected states unless the archive becomes interactive.

### Cards / Containers

- **Corner Style:** 8px corners for archive cards, meta tiles, recipe columns, and poster frames.
- **Background:** Deep Walnut Panel at about 68 to 72 percent opacity over the dark page.
- **Shadow Strategy:** Cards are mostly flat; poster frames and dialogs may use Ambient Sheet.
- **Border:** Thin warm cream borders at low opacity.
- **Internal Padding:** 16px for compact meta tiles, 18px for archive text, and 22px to 34px for recipe columns.

### Inputs / Fields

No input system exists in the current MVP. If future forms are added, inherit the 8px shape, warm cream border, Charred Walnut background, and Vermouth Gold focus cue.

### Navigation

Navigation is icon-first. The brand mark, language picker, and more menu sit in compact circular controls. Menus use a translucent dark panel, 8px radius, low-opacity cream border, and active links marked by brighter text plus a soft cream background.

### Signature Components

**Immersive Hero:** Full-bleed image, multi-layer shade, bottom-left copy, floating right-side tools, and a bottom-centered recipe handle. It is the default first impression.

**Recipe Sheet:** Bottom modal sheet with rounded top corners, dark translucent backing, internal scroll, concise metadata grid, tags, ingredients, and steps.

**Archive Card:** Text-free cocktail visual first, localized date/name/subtitle below. Cards must not show future scheduled cocktails after client filtering.

## 6. Do's and Don'ts

### Do:

- **Do** keep the home and detail pages poster-first with full-bleed imagery.
- **Do** use Charred Walnut, Cream Ink, Vermouth Gold, and Bitter Ruby as the core system colors.
- **Do** keep icon controls compact and labeled for assistive technology.
- **Do** preserve bilingual title fitting and avoid horizontal overflow on mobile.
- **Do** use blur, shade, and shadow only as legibility layers over imagery.

### Don't:

- **Don't** use AI-template cliches: generic hero/card-grid patterns, purple gradients, decorative glassmorphism, feature-marketing copy, repeated icon-card sections, or empty visual decoration.
- **Don't** introduce a sterile recipe-app layout where the visual becomes secondary.
- **Don't** use pure black or pure white.
- **Don't** add colored side-stripe borders, gradient text, oversized rounded icon cards, or nested cards.
- **Don't** add SSR, database, CMS, API, or schedule-dependent server behavior for visual-system work.
