# Feature Spec: Surprise Me Image & Copy Synchronization

## Background & Problem

In production/remote server deployment, clicking the "Surprise Me" shuffle button on the home page causes an obvious visual discrepancy:
1. **Synchronous Text vs. Asynchronous Image**: The cocktail name and metadata update synchronously in the DOM, while the background `<picture>` / `<img>` initiates an asynchronous HTTP fetch for the WebP scene image (100KB–250KB).
2. **Visual Desync**: The browser continues displaying the previous cocktail's image while downloading the new one. Users see the new cocktail name paired with the previous cocktail's visual for 300ms–1500ms before it abruptly snaps in.
3. **Mismatched Animation Timer**: The current `.is-shuffling` CSS class only dims opacity for a hardcoded 200ms `setTimeout`, which expires long before remote image transfer finishes.

## Approved Design Decisions (Grilling Session Consensus)

1. **Hybrid Synchronization Strategy (Memory Decode + Idle Buffer)**:
   - When "Surprise Me" is triggered, DOM text and image are swapped **simultaneously** in the exact same frame once the new image is in-memory decoded (`img.decode()`).
   - If the candidate image is already in browser cache, the swap occurs instantaneously (0 delay).
   - If not cached, the stage dims and waits for image readiness before updating text and visual together.

2. **Stage Dimming Transition ("Midnight Pour" Tone)**:
   - Smoothly dim stage content (`opacity: 0.25`) upon click.
   - Once decoded, update text + image and smoothly restore opacity with a 250ms cubic-bezier transition.
   - Skip opacity transitions when `prefers-reduced-motion: reduce` is active (instant synchronized swap).

3. **Race-Condition Protection (Request Token)**:
   - Use a monotonically increasing `requestId` counter.
   - If the user clicks "Surprise Me" repeatedly, prior in-flight image loads are superseded; only the latest request updates the DOM.

4. **Bandwidth-Conscious Idle Preloading**:
   - **Media-Query Accuracy**: Only preload images matching the current viewport (`heroImageMobile` for `max-width: 720px`, `heroImageDesktop` otherwise).
   - **Data Saver Awareness**: Respect `navigator.connection?.saveData`. If active, disable background idle preloading and fetch on-demand only.
   - **Idle Buffer**: After initial render and when browser enters idle state (`requestIdleCallback` or 1.5s delay), preload a small buffer of 3 random candidate cocktails (~350KB total).
   - **Hover / Focus Preload**: When hovering or focusing the Surprise Me button, prime an additional uncached candidate into memory.

5. **2.5s Timeout & Failure Circuit Breaker**:
   - If network degradation or error prevents `img.decode()` within 2500ms, immediately exit dimming and force DOM update to avoid freezing the UI in a dimmed state.

## Scope of Changes

- `src/components/ImmersiveCocktail.astro`: Client script update to coordinate `applyDailyCocktail`, token tracking, memory `img.decode()`, idle buffer queue, and fallback timer.
- `src/styles/global.css`: Refine `.immersive-stage.is-shuffling` transition rules to support dynamic dimming and smooth resolution.
