# SEO Architecture and Generative Engine Optimization (GEO)

To maximize discoverability across traditional search engines (Google, Bing) and emerging AI answer engines (Perplexity, ChatGPT, Claude, Google AI Overviews), we will expand Just One Sip's pure static architecture with base spirit taxonomy hubs, dedicated rasterized OpenGraph assets, enriched `Recipe` and `FAQPage` schemas, curated editorial answer capsules, and standard `/llms.txt` / `/llms-full.txt` feeds.

## Considered Options

- **Option 1: Status Quo (Client-Side Filtering & Minimal Single-Sentence Copy)**:
  - *Pros*: Zero maintenance overhead; keeps pages lightweight.
  - *Cons*: High-volume spirit search traffic ("Gin cocktails") is unindexed; SVG posters force social previews to fall back to a generic default image; detail pages are deemed "thin content" by search engines and lack quotable facts for AI answer engines.
- **Option 2: Aggressive Blog & Wikipedia-Style CMS Migration**:
  - *Pros*: Maximum word count and long-tail keyword stuffing.
  - *Cons*: Destroys the "Midnight Pour" editorial brand identity (clean, compact, atmospheric under low bar light); introduces CMS/database dependencies; ruins mobile reading speed.
- **Option 3 (Selected): Curated Editorial Capsules, Static Taxonomy SSG, and GEO Standards**:
  - *Pros*:
    1. Pre-renders static landing pages for base spirits (`/[locale]/cocktails/spirit/[spirit]/`) with dedicated `ItemList` structured data, capturing categorical search intent.
    2. Generates 1200x630 raster OG assets (WebP/JPG) so every cocktail has a rich, branded visual preview card across social platforms and Google Discover.
    3. Corrects Recipe Schema anomalies (removes erroneous `cookTime`, adds `recipeCuisine`, `tool`, `suitableForDiet`, and `FAQPage` markup).
    4. Enriches cocktail data with concise 60-90 word origin capsules, flavor profiles, and bartender tips displayed in low-contrast Midnight Pour panels.
    5. Deploys `/llms.txt` and `/llms-full.txt` alongside AI-friendly `robots.txt` directives, establishing Just One Sip as an authoritative citation target for generative search engines.
    6. Preserves 100% pure static SSG with zero runtime servers or databases.

## Consequences

- The cocktail data model in `src/data/cocktails.ts` is expanded with bilingual `originLore`, `flavorNotes`, `barTips`, `faqs`, and `relatedSlugs`.
- New static routes are introduced under `src/pages/[locale]/cocktails/spirit/[spirit].astro`.
- Social metadata in `src/utils/seo.ts` is wired to individual cocktail raster images, retiring the universal SVG fallback.
- `public/robots.txt` explicitly allows and points AI crawlers (`GPTBot`, `PerplexityBot`, `ClaudeBot`) to `sitemap.xml` and `llms.txt`.
- Static verification (`scripts/verify-static-output.mjs`) is updated to assert all spirit landing pages, Recipe Schema enhancements, raster OG metadata, and `llms.txt` files.
