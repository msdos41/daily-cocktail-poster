# Feature Spec: Zero-Flash Daily Pour on Home Page

## Problem Statement

When visiting the Just One Sip home page (`/` or `/[locale]/`), visitors experience a jarring visual flash: the page initially renders an outdated static build-time cocktail (Mojito) for a split second, and then abruptly snaps to today's local-date cocktail (such as Vieux Carré or Negroni) with a harsh text and image jump.

From the visitor's perspective:
1. They see Mojito's visual and text appear briefly, leading them to think Mojito is today's featured pour.
2. Moments later, the headline, recipe, and poster visual abruptly change without transition, making the site feel erratic, unpolished, and broken.
3. On repeat visits during the same day, this unnecessary switch still flashes before settling on today's cocktail.

## Solution

Implement an atmospheric "Midnight Pour" stage curtain and decode-first reveal on the home page:
1. **Zero Flash of Incorrect Cocktail**: The home stage starts in a warm dark bar ambiance (Charred Walnut `#15120f`). An inline synchronous script resolves today's cocktail in the visitor's local timezone and initiates image pre-decoding before first paint. The outdated build-time cocktail is never visibly flashed to JavaScript-enabled users.
2. **Decode-First Synchronized Reveal**: Once the target cocktail's poster image has decoded in memory, the hero visual and recipe copy smoothly fade in together over 300ms.
3. **Instant 0ms Same-Day Repeat Visits**: The visitor's local date and resolved cocktail slug are cached in `localStorage`. Repeat visits within the same calendar day bypass loading delays and render immediately without flash.
4. **Resilient Progressive Enhancement**: Search crawlers, social preview bots, and no-JS visitors continue to receive fully intact semantic markup and fallback content, preserving 100% SEO integrity and accessibility.

## User Stories

1. As a first-time visitor opening the home page, I want to see the correct daily cocktail for my local calendar date without seeing an unrelated cocktail flash first, so that the experience feels intentional and cohesive.
2. As a first-time visitor, I want the hero title, subtitle, ingredients, and background image to reveal simultaneously, so that I never see mismatched text paired with an old image.
3. As a night-time reader, I want the initial loading moment to match the warm, dark Midnight Pour aesthetic rather than a harsh white or jarring pop, so that my eyes remain comfortable under low light.
4. As a returning visitor who has already visited today, I want the home page to open instantly with today's cocktail in 0ms, so that navigating back to home feels instantaneous.
5. As a visitor in a different time zone (e.g. UTC+8 or UTC-5), I want the daily cocktail to strictly reflect my local calendar day, so that the date badge and cocktail recommendation match my actual day.
6. As a visitor on a slow or degraded cellular connection, I want a safety fallback timeout (500–600ms) that reveals the stage even if the hero image takes longer to download, so that the interface never hangs indefinitely.
7. As a user with `prefers-reduced-motion` enabled on my operating system, I want the reveal transition to appear instantly without opacity animations, so that my motion sensitivity is respected.
8. As an international user switching between English and Simplified Chinese, I want the daily curtain and cached daily pour to update smoothly in both languages without state corruption.
9. As a search engine crawler or no-JS user, I want the static HTML response to contain complete, semantic cocktail copy and valid schema metadata, so that indexing and machine readability remain completely uncompromised.
10. As a visitor clicking "Surprise Me", I want the existing shuffle flow to continue working seamlessly alongside the initial-load daily curtain without race conditions.
11. As a visitor crossing midnight while the tab remains open or reopening the tab the next day, I want the date check to automatically invalidate the previous day's cache and transition cleanly to the new day's cocktail.
12. As a visitor navigating to cocktail detail pages (`/[locale]/cocktails/[slug]`) or collection hubs, I want those pages to render normally without unnecessary home-only curtain overhead.

## Implementation Decisions

1. **Architecture & Timezone Execution**:
   - Maintain the hard architectural constraint of pure static generation (SSG) with no backend, no server runtime, and no scheduled server rebuilds.
   - All dynamic scheduling is evaluated client-side in the visitor's local timezone.

2. **Progressive Enhancement & Anti-FOUC Head Marker**:
   - In `<head>` (via the layout shell), execute an inline synchronous script that marks the document with a daily curtain class (e.g. `js-daily-curtain`) before body rendering.
   - Crawlers and no-JS environments do not execute the script, rendering the static HTML content normally with full semantic markup.
   - In CSS, when the stage is in the home variant and the curtain class is active, the initial cocktail copy and hero image are veiled behind the ambient stage background until marked ready.

3. **Decode-First Synchronization Lifecycle**:
   - A synchronous inline script placed immediately before the stage resolves the daily cocktail slug using the deterministic date-seeded sequence and visitor's local date.
   - Initiate background pre-decoding (`Image.decode()`) of the target hero image matching the current viewport (`heroImageMobile` for `<= 720px`, `heroImageDesktop` otherwise).
   - Once decoded (or when a 500–600ms safety timer elapses), apply the target cocktail copy, attributes, and image source in a single atomic frame, then remove the pending curtain state to trigger the 300ms fade-in.

4. **LocalStorage Caching & Invalidation Contract**:
   - Use a dedicated storage key (e.g. `justonesip_daily_pour`).
   - Stored payload structure:
     ```typescript
     type CachedDailyPour = {
       date: string; // "YYYY-MM-DD" in local time
       slug: string; // Cocktail slug
       timestamp: number; // Cache creation epoch ms
     };
     ```
   - On load, if `cached.date === currentLocalDateKey` and the slug is valid, the inline script immediately binds the cached cocktail before the first paint, achieving 0ms repeat-visit performance.
   - If the date does not match, the cache is updated with the freshly calculated day selection.

5. **Motion and Design System Standards**:
   - Transition duration: `300ms cubic-bezier(0.2, 0, 0, 1)`.
   - Motion suppression: When `prefers-reduced-motion: reduce` is active, transition duration is set to `0ms` (instant atomic reveal).
   - Maintain the Bar-Light and Warm Neutral design rules: ambient stage black / charred walnut (`#15120f`) during any veil period, with zero stark white or unstyled flickers.

6. **Component Boundaries**:
   - Encapsulate the curtain and early-load synchronization logic strictly within the home variant of the immersive experience (`variant === "home"`).
   - Detail pages (`variant === "detail"`) remain completely static and bypass all home-specific curtain and daily-pour swap scripts.

## Testing Decisions

- **Testing Principles**: Tests must verify observable behavior and hard constraints (rendering output, correct attributes, lack of flash/FOUC classes on no-JS, valid JSON payloads) rather than private implementation details.
- **Modules Tested**:
  - `src/components/ImmersiveCocktail.astro`: Verification that curtain attributes and inline prepaint scripts are correctly rendered only on home variants.
  - `scripts/verify-static-output.mjs`: High-level static verification suite (`npm run verify`) checking that:
    - Dist output for all locales contains the required inline anti-flash script and semantic fallbacks.
    - Detail pages and collection pages do not include home curtain scripts.
    - JSON-LD and share payloads remain 100% valid.
  - Utility logic (date key formatting, day sequence indexing, and storage payload validation) tested via automated assertions.
- **Prior Art**: Modeled on `scripts/verify-static-output.mjs` and the synchronization pattern established in `src/utils/shuffleSync.ts`.

## Out of Scope

- Scheduled CI/CD or server-side rebuilds at midnight.
- Adding serverless functions, edge middleware, or dynamic runtime servers.
- Altering the deterministic `DAILY_POUR_SEQUENCE` array or cocktail recipe editorial content.
- Changes to detail page (`/[locale]/cocktails/[slug]`) static generation.

## Further Notes

- The solution directly resolves the issue where `dist/` HTML generated during a build on August 28 statically baked Mojito into the markup, while local client dates in September caused an immediate jarring swap.
- The decode-first approach ensures that slow network conditions gracefully hold the ambient stage rather than rendering broken half-loaded images or mismatched text.
