# 05: SEO Structured Data, Sitemap and Static Verification

**What to build:**
Upgrade Schema.org structured data, sitemap generation, and the static output verification test suite to validate the new architecture. The Collection page emits `CollectionPage` and `ItemList` JSON-LD; detail pages emit three-tier `Recipe` breadcrumbs; `sitemap.xml` indexes `/cocktails/`; and `scripts/verify-static-output.mjs` validates 100% of collection cards, sitemap URLs, canonical links, hreflang tags, and JSON-LD payloads.

**Blocked by:**
- 02: Home Page Daily Pour and Surprise Me Shuffle Action
- 04: Navigation, Redirects and Detail Breadcrumbs

**Status:** closed
Completed: 2026-09-10

- [x] `/[locale]/cocktails/` emits valid Schema.org `CollectionPage` and `ItemList` JSON-LD listing all 33 cocktails with positions and URLs.
- [x] Detail pages emit Schema.org `Recipe` JSON-LD with three-level `BreadcrumbList` (`Home > The Collection > [Cocktail]`).
- [x] `sitemap.xml` includes `/[locale]/cocktails/` and all 33 detail pages for each locale, and excludes legacy `/archive` routes.
- [x] `scripts/verify-static-output.mjs` retires obsolete "future date leakage" assertions and validates full collection pre-rendering.
- [x] `npm run build` succeeds with zero Astro check/type errors.
- [x] `npm run verify` passes with 100% of assertions green.
