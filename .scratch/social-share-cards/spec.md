# Feature Spec: Default Social Share Cards Redesign

## Status

closed

## Background & Problem

Currently, `og-default-v2.jpg` serves as the fallback Open Graph / social media sharing card for generic routes (Home, Collection, About, Privacy, 404). In production, it exhibits clear deficiencies:
1. **Lack of Brand Typography**: The image contains no brand name ("Just One Sip"), no slogan, and zero typographic hierarchy. When shared on social platforms (X/Twitter, WeChat, Discord, Telegram, Slack), it appears as an unfinished wireframe or draft card.
2. **Atmospheric Mismatch**: The vector outline of a 2D coupe glass clashes with the website's core "Midnight Pour" aesthetic (low-light bar, warm cream type, rich reflections, cocktail poster mood).
3. **Severe Visual Imbalance**: The left ~60% of the canvas is an empty dark brown field, while the right side has an isolated vector icon, lacking editorial framing.

## Approved Design Decisions (Grilling Session Consensus)

1. **Layout & Archetype (Editorial Magazine Poster)**:
   - Adopt a classic editorial split: left-side typography and right-side drink visual.
   - Implement a ~120px safe-zone inset around the canvas edges. This preserves visual impact in standard 1.91:1 horizontal previews (1200×630) while ensuring core brand recognition in 1:1 square or 4:3 cropped viewports (e.g. WeChat chats or mobile messaging previews).

2. **Visual Subject (Midnight Pour Negroni)**:
   - Feature a classic **Negroni** staged on a dark charred walnut bar under warm spotlight.
   - Incorporate key brand color tokens:
     - **Bitter Ruby** (`#d3513c`): rich red liquid reflection.
     - **Vermouth Gold** (`#e3b35f`): warm atmospheric backlight and halo.
     - **Charred Walnut** (`#15120f`): low-key bar counter and shadowy depth.
   - Elements include a hand-carved clear ice block, orange twist, and subtle glass condensation.

3. **Bilingual Separation & Content Hierarchy**:
   Instead of a compromised hybrid image, generate two dedicated localized assets:

   - **English Card (`public/images/og-default-en.jpg`)**:
     - Kicker (Vermouth Gold): `MIDNIGHT POUR · DAILY COCKTAIL POSTER`
     - Title (Cream Ink, Georgia Serif): `JUST ONE SIP`
     - Tagline / Slogan: `One drink, one visual, every day.`
     - Base Indicator / Domain: `justonesip.today`

   - **Chinese Card (`public/images/og-default-zh.jpg`)**:
     - Kicker (Vermouth Gold): `午夜微醺 · 每日鸡尾酒海报`
     - Title (Cream Ink, Georgia Serif): `JUST ONE SIP`
     - Subtitle (Serif / Songti): `微醺时刻`
     - Tagline / Slogan: `一杯 · 一画 · 一日常`
     - Base Indicator / Domain: `justonesip.today`

4. **Asset Production Pipeline**:
   - **Base Render**: High-resolution photorealistic rendering of the Negroni bar scene with natural vignette and fine film grain.
   - **Compositing**: Vector/script-driven typography overlay to guarantee crisp text rendering and precise brand hex codes (`#e3b35f`, `#f7efe5`).
   - **Export Target**: 1200×630px high-quality JPEG (< 150KB).

5. **Engineering & SEO Architecture**:
   - **`src/utils/seo.ts`**:
     - Introduce `defaultSocialImageForLocale(locale: Locale): string` returning the corresponding localized image path.
     - Update fallback image logic to consume the active locale.
   - **`src/layouts/BaseLayout.astro`**:
     - Bind default `image` prop dynamically based on `Astro.props.locale`.
   - **Backwards Compatibility**:
     - Retain `public/images/og-default-v2.jpg` as an exact copy/alias of `og-default-en.jpg` to prevent 404s on external cached links.
   - **Verification**:
     - Update `scripts/verify-static-output.mjs` to validate that English pages emit `og-default-en.jpg` and Chinese pages emit `og-default-zh.jpg`.

## Implementation Roadmap (When Resumed)

- [x] Task 1: Generate high-fidelity Negroni base stage visual.
- [x] Task 2: Composite typography overlays for EN and ZH cards into `public/images/og-default-en.jpg` and `public/images/og-default-zh.jpg`.
- [x] Task 3: Duplicate `og-default-en.jpg` to `public/images/og-default-v2.jpg` for backward compatibility.
- [x] Task 4: Update `src/utils/seo.ts` and `src/layouts/BaseLayout.astro` with locale-aware default image resolution.
- [x] Task 5: Update `scripts/verify-static-output.mjs` tests and run `npm run verify`.
