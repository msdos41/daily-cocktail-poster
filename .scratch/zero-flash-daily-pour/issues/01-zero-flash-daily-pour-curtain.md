# 01: Zero-Flash Daily Pour Curtain & Synchronized Reveal

Status: resolved

## Context & Problem
On the Just One Sip home page, the static HTML is compiled with whatever cocktail matched the build-time date (Mojito from August 28). When opened on any other date, client-side JS evaluates the user's local date and swaps the DOM elements. This causes an ugly visual flash: visitors see Mojito flash briefly before the text and image jump to today's cocktail.

## Acceptance Criteria
- [x] For JavaScript-enabled visitors, the home stage never visibly flashes an incorrect build-time cocktail (Mojito) before today's cocktail is resolved.
- [x] Progressive enhancement: Crawlers and no-JS visitors receive full, valid static HTML markup and semantic metadata without regression.
- [x] Decode-First Synchronization: Hero image and cocktail copy reveal simultaneously in a single frame once the image is decoded in memory (or upon a 500–600ms safety timeout).
- [x] 300ms smooth warm-light fade-in transition, honoring `prefers-reduced-motion: reduce` (instant reveal when reduced motion is preferred).
- [x] LocalStorage caching under `justonesip_daily_pour`: Same-day repeat visits bypass loading latency and render instantaneously (0ms).
- [x] Cocktail detail pages (`/[locale]/cocktails/[slug]`) and collection hubs are completely unaffected by home-only curtain logic.
- [x] `npm run build` and `npm run verify` pass with zero errors.

## Implementation Tasks
1. **Utility & State Management**:
   - Implement date matching, localStorage cache reader/writer, and image decode helper in `src/utils/dailyCurtain.ts` (or extend `src/utils/shuffleSync.ts`).
2. **Head Anti-FOUC Marker & Progressive Enhancement**:
   - Add early synchronous class marker on document/stage to establish curtain veil only when JS is active.
3. **Stage Markup & Lifecycle in `ImmersiveCocktail.astro`**:
   - Update prepaint script and client-side initialization to wait for decode before lifting curtain and atomic DOM update.
4. **Style Transitions in `src/styles/global.css`**:
   - Add `.is-pending-daily` / curtain rules with 300ms cubic-bezier transition, respecting motion preferences.
5. **Static Verification Tests**:
   - Add assertions to `scripts/verify-static-output.mjs` to verify curtain markers and payload integrity.

## Comments
- Implemented `src/utils/dailyCurtain.ts` with unit test suite in `tests/dailyCurtain.test.mjs`.
- Added `js-daily-curtain` head script to `src/layouts/BaseLayout.astro` strictly for home page (`path === "/"`).
- Refined `ImmersiveCocktail.astro` prepaint and module initialization to coordinate localStorage caching (`justonesip_daily_pour`), decode-first preloading, and curtain unveiling.
- Added smooth 300ms cubic-bezier opacity transition to `src/styles/global.css`, respecting `prefers-reduced-motion`.
- Verified static build output via `npm run build` and `npm run verify` (100% clean pass).
