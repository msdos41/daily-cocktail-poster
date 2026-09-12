# 01: Synchronized Hero Image Swap and Viewport-Aware Preloading

**What to build:**
Refactor the client-side shuffle logic in `ImmersiveCocktail.astro` so that when a user clicks the "Surprise Me" shuffle button, the cocktail copy and background image update strictly in unison. Eliminate the visual discrepancy where copy renders immediately while the image lags over remote network connections.

**Status:** closed
Completed: 2026-09-12

## Context & Root Cause
- When clicking `[data-surprise-me]`, `applyDailyCocktail()` synchronously mutates DOM text nodes, but assigning `<img src>` and `<source srcset>` triggers an asynchronous HTTP request.
- The browser paints the previous cocktail's image while waiting for the new image to download, causing a 300ms–1500ms mismatch between text and visuals.
- The existing `.is-shuffling` animation has a fixed 200ms duration, uncoupled from actual image network completion.

## Detailed Requirements & Implementation Blueprint

1. **Pre-decode and Synchronized DOM Flipping**:
   - In `ImmersiveCocktail.astro` client script, define an asynchronous loading flow for shuffle requests.
   - When a next cocktail candidate is selected:
     - Determine active target image URL according to `window.matchMedia("(max-width: 720px)").matches` (`heroImageMobile` vs `heroImageDesktop`).
     - Create an in-memory `Image` object:
       ```typescript
       const preloader = new Image();
       preloader.src = targetImageUrl;
       ```
     - Await `preloader.decode().catch(() => {})` with a fallback safety timeout of 2500ms.
     - Only after `decode()` resolves (or timeout expires), update both the text nodes and the DOM `<picture>` (`<source>` and `<img>`) together in the same tick.

2. **Stage Dimming & Transition Lifecycle**:
   - On click, add `stage.classList.add("is-shuffling")` (dimming stage to `opacity: 0.25`).
   - Remove `is-shuffling` only AFTER both text and image DOM mutations are complete, triggering a smooth 250ms fade-in.
   - If `prefers-reduced-motion: reduce` is enabled, keep the synchronized logic but omit CSS opacity transitions.

3. **Concurrency & Race-Condition Handling**:
   - Maintain a module-level `currentShuffleToken = 0`.
   - On each click, increment `currentShuffleToken`.
   - After awaiting image decode, verify that the local token still matches `currentShuffleToken`. If superseded by a newer click, abandon DOM updates for the stale request.

4. **Idle & Hover Preloading Buffer**:
   - Implement an idle preloader that listens for `requestIdleCallback` (or `setTimeout(..., 1500)` fallback).
   - If `navigator.connection?.saveData` is true, skip idle preloading.
   - Otherwise, pre-instantiate `Image` objects for 3 unselected cocktails from `dailyCocktails` matching current viewport dimensions to populate the HTTP/memory cache.
   - On `mouseenter` or `focus` on the `[data-surprise-me]` button, prime 1 additional candidate image into cache if not already preloaded.

5. **Style Updates**:
   - Verify and tune `.immersive-stage.is-shuffling` in `src/styles/global.css` so that the dimming state smoothly bridges the network latency gap without visual harshness.

## Acceptance Criteria
- [x] Clicking "Surprise Me" never exhibits a state where the new cocktail name is displayed over the previous cocktail's image.
- [x] Rapid clicks on "Surprise Me" do not produce out-of-order image flashes or race conditions.
- [x] When an image is already cached, transition executes immediately without artificial latency.
- [x] On slow networks or image failure, the 2.5s fallback fires, restoring stage interactivity and best-effort display.
- [x] `npm run build` and `npm run verify` pass cleanly.
