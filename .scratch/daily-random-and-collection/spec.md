Status: closed
Completed: 2026-09-10

# Specification: Daily Seeded Pseudo-Random Selection and The Collection Catalog

## Problem Statement

Visitors to Just One Sip currently encounter a cocktail schedule locked to arbitrary calendar dates. Under this model, all cocktails with future dates are deliberately hidden and inaccessible. Furthermore, the legacy past-picks archive page only displays drinks from the preceding 14 days and relies on client-side JavaScript filtering to suppress "future" items.

From a user perspective:
- Most of the hand-crafted cocktail posters in the library cannot be viewed or enjoyed.
- If today's scheduled drink does not appeal to a visitor's taste or available bar ingredients, they have no easy way to get another recommendation.
- Navigating an incomplete, time-restricted archive feels artificial and disappointing.
- Search engine crawlers cannot discover or index the majority of cocktail recipes through standard HTML hyperlinks, resulting in severe search visibility and discovery penalties.

## Solution

1. **Deterministic Daily Selection**: Replace calendar date scheduling with a deterministic date-seeded pseudo-random algorithm. Each day, the home page features a fresh **Daily Pour** that stays identical across all visits and devices for that user's local date, cycling evenly across the library without immediate repetition.
2. **Surprise Me Interaction**: Provide an on-demand shuffle action on the home page allowing visitors to immediately switch to an alternate random drink.
3. **The Collection Catalog**: Replace the legacy archive with a comprehensive, statically pre-rendered gallery displaying all 33 cocktails at once. Visitors can explore the complete visual poster library and filter drinks by **Base Spirit** (e.g., Gin, Whiskey, Rum, Tequila, Vodka, Mezcal).
4. **Pure Static Architecture & SEO Optimization**: Generate all collection cards statically at build time, wire bidirectional internal links between the collection and detail pages, emit Schema.org `ItemList` structured data, and establish permanent 301 redirects from legacy archive URLs.

## User Stories

1. As a cocktail enthusiast visiting the home page, I want to see a featured Daily Pour tailored to today's date, so that each day brings a new recommendation without repetitive calendar patterns.
2. As a visitor revisiting the home page multiple times during the same day, I want the Daily Pour to remain consistent, so that the recommendation feels intentional rather than erratic.
3. As a visitor sharing the home page link with a friend on the same day, I want them to see the exact same Daily Pour, so that we can discuss making the same drink tonight.
4. As a home bartender whose cabinet lacks the ingredients for today's Daily Pour, I want a "Surprise Me" shuffle button on the home page, so that I can immediately explore an alternate drink recommendation.
5. As a visitor clicking "Surprise Me", I want the visual and recipe details to transition smoothly, so that the browsing experience remains cinematic and atmospheric.
6. As a casual drinker, I want to open The Collection from the navigation menu, so that I can browse all cocktail posters in one continuous gallery.
7. As a cocktail lover who prefers gin, I want to click a "Gin" base spirit filter chip in The Collection, so that I can instantly view all gin-based cocktails without scrolling through unrelated spirits.
8. As a visitor with a specific base spirit filter active, I want to easily clear the filter or select "All", so that I can return to the full gallery.
9. As a mobile visitor browsing The Collection, I want all cocktail cards to load instantly without layout shifts or delayed script pop-in, so that I have a fast and responsive reading experience.
10. As a visitor viewing a cocktail card in The Collection, I want to see a clear visual crop, title, subtitle, and date tag, so that I can quickly gauge if the drink interests me.
11. As a visitor clicking a card in The Collection, I want to navigate directly to its dedicated recipe detail page, so that I can review full measurements, steps, and preparation tips.
12. As a visitor on a cocktail detail page, I want a clear navigation pathway back to The Collection, so that I can continue exploring other drinks.
13. As a Chinese-speaking visitor (`zh-CN`), I want the Daily Pour, The Collection, filter chips, and shuffle actions to be fully localized in natural Chinese, so that the experience feels native and accessible.
14. As an English-speaking visitor (`en`), I want all collection headings, filters, and shuffle tooltips to be presented in refined editorial English, matching the Midnight Pour tone.
15. As a user following a saved bookmark or external link to `/archive`, I want to be redirected seamlessly to `/cocktails/`, so that I never hit a broken link or 404 page.
16. As a search engine crawler (such as Googlebot), I want to crawl static HTML hyperlinks to all 33 cocktail detail pages directly from The Collection, so that every recipe page is discovered and indexed.
17. As a search engine indexing The Collection, I want to parse valid Schema.org `ItemList` structured data, so that Just One Sip can earn carousel and list rich snippets in search results.
18. As a user downloading an HD background from the home page after triggering "Surprise Me", I want the downloaded image to correspond to the newly selected cocktail, so that I receive the correct asset.
19. As a user sharing a cocktail to X or Reddit after shuffling on the home page, I want the share payload to reflect the current cocktail rather than the initial build fallback, so that my post contains accurate details and links.
20. As a visitor using assistive technology (screen reader), I want base spirit filter chips to indicate their selected state (`aria-pressed` or equivalent) and image cards to have descriptive alt text, so that I can navigate the collection comfortably.
21. As a visitor with `prefers-reduced-motion` enabled, I want shuffle and filter transitions to respect my system preferences without forced animations, so that the interface does not cause visual discomfort.

## Implementation Decisions

### 1. Selection Algorithm: Deterministic Seeded Pseudo-Random Rotation
- The Daily Pour is calculated using a deterministic hash of the visitor's local calendar date string (`YYYY-MM-DD`).
- The algorithm maps into a pre-computed pseudo-random permutation of cocktail identifiers, guaranteeing that all cocktails in the library are presented across a complete cycle before repeating, and preventing identical cocktails on consecutive days.
- The build process renders the static HTML using the build date's seed, while an inline pre-paint script executes in the user's browser before first paint to reconcile with the visitor's actual local calendar date.

### 2. Interactive "Surprise Me" Shuffle Action
- An icon button is positioned within the floating utility actions on the home page.
- Triggering the action cycles client-side through the library sequence without page reload.
- The DOM updates the visual background, copy, metadata, recipe sheet contents, HD download link, and social share payload in place.

### 3. The Collection Architecture & Routing
- The Collection page lives at canonical localized routes (`/[locale]/cocktails/`).
- The legacy archive routes (`/[locale]/archive/`) are permanently redirected (HTTP 301) to `/[locale]/cocktails/`.
- All cocktail cards are generated entirely as static HTML at build time using Astro SSG templates, eliminating client-side deferred payload parsing (`window.__ARCHIVE_PAYLOAD__`) and guaranteeing instantaneous Largest Contentful Paint (LCP).
- Top navigation and utility menus update their primary catalog link from "Past Picks" to "The Collection" (`/[locale]/cocktails/`).

### 4. Base Spirit Filtering
- A horizontal strip of filter chips is rendered above The Collection grid: `All` plus distinct Base Spirits identified across the library (e.g., Gin, Bourbon/Whiskey, Rum, Tequila, Vodka, Mezcal, Cognac, Cachaça).
- Filtering is managed via lightweight client-side state toggling data attributes on grid elements, keeping the page purely static while maintaining instant sub-millisecond filtering.
- Filter chips maintain accessible keyboard navigation and ARIA state announcements.

### 5. Structured Data & SEO Schema
- The Collection page emits Schema.org `CollectionPage` accompanied by an `ItemList` schema enumerating each cocktail's canonical URL and list position.
- Cocktail detail pages retain Schema.org `Recipe` structured data, with their `BreadcrumbList` updated to reflect the three-tier hierarchy: `Home` > `The Collection` > `Cocktail Name`.
- The XML sitemap (`/sitemap.xml`) replaces `/archive` entries with `/cocktails` entries and maintains accurate hreflang mappings.

### 6. Decoupling Calendar Dates in Data Model
- The `date` attribute on cocktail records is decoupled from visibility gating; no cocktails are classified as "future" or restricted from output.
- All library cocktails are recognized as active, permanent entries.

## Testing Decisions

### Test Seam: Static Build Output Verification (`scripts/verify-static-output.mjs`)
- The primary test seam is the post-build static output verification suite. This represents the highest possible integration seam, inspecting the compiled HTML files, HTTP redirect declarations, sitemap XML, and structured data payloads generated in `dist/`.
- Testing at this boundary validates the external contract seen by end users, CDNs, and search engine web crawlers, avoiding brittle reliance on internal Astro component implementation details.

### Test Coverage & Assertions
1. **Catalog Completeness**: Assert that `/[locale]/cocktails/index.html` exists for all supported locales (`en`, `zh-CN`) and contains static markup and valid links for every cocktail in the library.
2. **Legacy Route Redirection**: Assert that `/archive` routes are absent from static generation or configured with 301 redirects to `/cocktails/`.
3. **Structured Data Validation**:
   - Assert that `/[locale]/cocktails/` contains valid `ItemList` JSON-LD with correct position numbering and canonical item URLs.
   - Assert that all detail pages contain valid `Recipe` JSON-LD and correct three-step breadcrumbs.
4. **Canonical & Hreflang Reciprocity**: Assert that all collection and detail pages feature strict bidirectional `hreflang` tags matching canonical URLs.
5. **Sitemap Integrity**: Assert that `sitemap.xml` contains `/cocktails/` URLs, omits `/archive`, and matches the set of generated static pages.
6. **Zero Future Leak Assertions**: Retire obsolete "future date leakage" checks, replacing them with catalog-wide integrity checks.

## Out of Scope

- Multi-faceted search and filtering (e.g., combining spirit, glass type, and ABV simultaneously).
- Free-text search input with fuzzy matching.
- User accounts, favorites, saved drink lists, or personal recipe notes.
- Community ratings, comments, or review submissions.
- Content model expansions for ABV percentage, preparation technique, or historical origin anecdotes (deferred to follow-up content enhancement task).
- Server-side rendering (SSR), databases, or CMS integrations.

## Further Notes

- The design of The Collection must strictly adhere to the "Midnight Pour" design system (warm neutrals, Charred Walnut `#15120f` page base, Deep Walnut Panel `#211b17` cards, and Vermouth Gold `#e3b35f` accents).
- Existing custom image crop positions (`object-position` rules by cocktail ID in `src/styles/global.css`) must be preserved to guarantee perfect visual presentation across all 33 cards.
