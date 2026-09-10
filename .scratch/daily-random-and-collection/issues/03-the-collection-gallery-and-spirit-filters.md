# 03: The Collection Gallery and Spirit Filters

**What to build:**
Create the full, statically pre-rendered Collection gallery at `/[locale]/cocktails/`. Render all 33 cocktail cards in an editorial 6-column grid with tuned image crops, and provide accessible Base Spirit filter chips (All, Gin, Bourbon/Whiskey, Rum, Tequila, Vodka, Mezcal, Cognac, Cachaça) that filter the gallery instantaneously on the client.

**Blocked by:** 01: Deterministic Daily Selection and Data Decoupling

**Status:** closed
Completed: 2026-09-10

- [x] Route `/[locale]/cocktails/` renders statically for both `en` and `zh-CN`.
- [x] All 33 cocktail cards are present in the static HTML with images, localized titles, and links to `/cocktails/[slug]`.
- [x] First card adopts the enlarged featured presentation (`data-archive-featured="true"`), followed by standard 2-column cards.
- [x] Base Spirit filter chips are displayed above the grid and accurately categorize all 33 cocktails.
- [x] Clicking a filter chip filters visible cards instantly without network requests or layout breakage.
- [x] Active filter chips announce selection state (`aria-pressed="true"`) to assistive technologies.
- [x] Existing image crop rules (`object-position` in CSS) apply correctly across all 33 cards.
