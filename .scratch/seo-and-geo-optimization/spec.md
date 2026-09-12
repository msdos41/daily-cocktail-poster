Status: closed
Completed: 2026-09-12
Created: 2026-09-12

# Specification: Comprehensive SEO & Generative Engine Optimization (GEO) Blueprint

## Executive Summary

Just One Sip (`justonesip.today`) currently possesses a solid technical baseline (SSG pre-rendering, bilingual `en`/`zh-CN` symmetry, valid canonicals, reciprocal `hreflang`, and basic Schema.org `Recipe`/`ItemList` markup).

However, an in-depth codebase audit reveals five critical architectural and discoverability bottlenecks:
1. **SVG Social & Search Visual Blindspot**: Cocktail detail pages reference `.svg` scenes, causing `socialImageMetadata` to fall back to the generic `/images/og-default-v2.jpg` for all drinks, forfeiting rich search thumbnails and differentiated social cards.
2. **Missing Keyword Taxonomy Landing Pages**: The high-volume search intent around base spirits ("Gin cocktails", "Bourbon drinks") is trapped behind client-side JavaScript DOM filtering on `/cocktails/` with no static URLs for search engines to index.
3. **Recipe Schema Inaccuracies & Semantic Gaps**: Cocktails declare an unrealistic `cookTime: "PT3M"`, omit `recipeCuisine`, `suitableForDiet`, glassware tools, and lack structured `FAQPage` markup.
4. **Content Thinness vs. AI Citation Density**: Cocktails provide single-sentence atmospheric descriptions. While aesthetically evocative under the "Midnight Pour" brand, they lack factual "Answer Capsules" (origin lore, flavor balance, substitution FAQ) that modern AI engines (Perplexity, ChatGPT, Claude, Google AI Overviews) require for direct attribution.
5. **Absence of GEO Standards**: The site lacks `/llms.txt` and `/llms-full.txt`, and `robots.txt` does not provide explicit discoverability hints for AI search agents.

This specification details a zero-compromise architectural enhancement that introduces high-citation GEO infrastructure, static spirit taxonomy hubs, rasterized OG assets, and curated editorial capsules—while strictly upholding the "Midnight Pour" aesthetic and pure static SSG constraints.

---

## Architecture & Design Principles

### 1. The Pure Static SSG Constraint
- No runtime server, database, or dynamic SSR.
- All taxonomy routes, markdown endpoints, and structured data must compile to pure HTML/XML/TXT in `dist/`.
- Verification must pass all assertions in `scripts/verify-static-output.mjs`.

### 2. The "Midnight Pour" Brand Harmony
- Avoid turning Just One Sip into a cluttered, ad-riddled food blog or generic SaaS directory.
- Preserve the low-bar-light editorial atmosphere:
  - Deep walnut/charred wood panels (`#15120f`, `#211b17`).
  - Warm cream ink (`#f7efe5`) and sparse vermouth gold (`#e3b35f`) cues.
  - New content modules (Origin & Lore, FAQ, Tasting Balance) must render as compact, collapsible, or low-contrast editorial capsules positioned below the main visual stage.

---

## Core Pillars & Implementation Blueprint

### Pillar 1: Base Spirit Taxonomy Landing Pages (SEO Keyword Hubs)

#### Problem
Users actively search for "Classic Gin Cocktails", "Rum Drink Recipes", and "Bourbon Cocktail List". Currently, `/cocktails/` handles spirit filtering solely via client-side DOM manipulation (`data-spirit-filter`). Crawlers cannot index spirit-specific catalogs.

#### Solution
Pre-render static taxonomy pages for each supported base spirit:
- Routes:
  - `/[locale]/cocktails/spirit/[spirit]/`
  - Canonical examples:
    - `https://justonesip.today/en/cocktails/spirit/gin/`
    - `https://justonesip.today/zh-cn/cocktails/spirit/gin/`
- Supported Spirit Slugs:
  - `gin`, `whiskey`, `rum`, `tequila`, `vodka`, `brandy`, `scotch`, `mezcal`
- SEO & Metadata on Spirit Pages:
  - Unique localized `<title>`: e.g., "Classic Gin Cocktails | Just One Sip" / "经典金酒鸡尾酒特辑 | 昨夜微醺"
  - Localized `<meta name="description">` targeting cocktail lovers exploring drinks made with that spirit.
  - Symmetrical `hreflang` tags (en, zh-CN, x-default).
  - Schema.org `CollectionPage` + `ItemList` indexing only cocktails matching that spirit.
  - BreadcrumbList: `Home` > `The Collection` > `[Spirit Name]`.
  - Static internal hyperlinks pointing to each cocktail detail page.

---

### Pillar 2: 1200x630 Raster OG & Search Thumbnail Generation

#### Problem
Social platforms (X/Twitter, WeChat, iMessage, LinkedIn) and Google Discover/Rich Results do not render SVG files as OpenGraph card images. Because cocktail posters are SVG scenes (`/images/cocktails/${id}-scene-mobile.svg`), `src/utils/seo.ts` detects `.svg` and falls back to the generic `og-default-v2.jpg`. Every cocktail shared on social media looks identical.

#### Solution
1. Generate or pre-render a 1200x630 raster image (WebP or JPG) for each cocktail:
   - Path: `/images/cocktails/${id}-og.jpg` or `/images/cocktails/${id}-og.webp`.
2. Update `socialImageMetadata` in `src/utils/seo.ts`:
   - If a cocktail has a raster OG asset, return its absolute URL with `image/jpeg` or `image/webp` and explicit dimensions `1200x630`.
3. In `src/pages/[locale]/cocktails/[slug].astro`:
   - Pass `cocktail.ogImage` (pointing to the raster asset) to `BaseLayout`.
4. Social cards and Google visual previews will display the cocktail's distinctive visual poster, dramatically increasing CTR.

---

### Pillar 3: Recipe Schema Perfection & Structured Data Upgrades

#### Problem
1. Detail pages output `cookTime: "PT3M"`. Cocktails are mixed and shaken/stirred, never cooked. Google Search Console flags cooking times on cold beverages as anomalous.
2. Missing high-value Recipe Schema properties:
   - `recipeCuisine` (e.g., "Italian" for Negroni, "American" for Old Fashioned, "Cuban" for Mojito).
   - `suitableForDiet: "https://schema.org/VeganDiet"` (when egg white is absent) or relevant dietary tags.
   - `tool` (e.g., "Shaker", "Bar spoon", "Mixing glass", glassware type).
   - `prepTime: "PT3M"`, `cookTime: "PT0M"`, `totalTime: "PT3M"`.
3. Absence of `FAQPage` schema on detail pages.

#### Solution
Refactor `cocktailStructuredData()` in `src/utils/structuredData.ts`:
```json
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "@id": "https://justonesip.today/en/cocktails/negroni/#recipe",
  "name": "Negroni",
  "recipeCategory": "Cocktail",
  "recipeCuisine": "Italian",
  "prepTime": "PT3M",
  "cookTime": "PT0M",
  "totalTime": "PT3M",
  "recipeYield": "1 serving",
  "recipeIngredient": [
    "30 ml London Dry Gin",
    "30 ml Campari",
    "30 ml Sweet Vermouth"
  ],
  "tool": ["Mixing glass", "Bar spoon", "Strainer"],
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "200 calories"
  },
  "suitableForDiet": "https://schema.org/VeganDiet"
}
```
Add an accompanying `FAQPage` structured data entity to answer the top 2-3 common questions per cocktail (e.g. glassware, best gin to use, classic 1:1:1 ratio explanation).

---

### Pillar 4: Curated Editorial Expansion ("Answer Capsules" for GEO)

#### Problem
Generative AI search engines (Perplexity, SearchGPT, Claude, Gemini, Google AI Overviews) extract direct, quotable, factual paragraphs with clear entity relationships.
Currently, our detail pages contain:
- Name + 1 poetic sentence
- Ingredients list
- 2-3 short prep steps

This lacks the entity density AI models need to cite Just One Sip as an authoritative source for cocktail history, flavor profiles, and expert bartending tips.

#### Solution
Enrich `src/data/cocktails.ts` with structured, localized editorial fields while maintaining the "Midnight Pour" aesthetic:
1. `history`: A concise 60-90 word historical capsule detailing origins, year, creator, and cultural lore (e.g., Count Camillo Negroni in Florence, 1919).
2. `flavorProfile`: Key taste dimensions (e.g., "Bitter, Herbal, Botanical, Spirit-forward").
3. `barTips`: 2-3 expert technique secrets (e.g., "Always use a large single ice cube to prevent over-dilution; express orange peel over the glass to release citrus oils").
4. `faqs`: 2-3 frequently asked questions with direct, authoritative answers.

#### UI Presentation Guardrails
- Keep the hero stage clean and atmospheric.
- Place editorial capsules beneath the recipe instructions in a refined, modular panel layout with subtle borders (`rgba(247, 239, 229, 0.08)`), warm typography, and optional accordion toggles for FAQs.

---

### Pillar 5: Generative Engine Optimization (GEO) Standards

#### 1. `/llms.txt` (Site-level AI Summary)
Deploy `public/llms.txt` following the emerging `/llms.txt` standard:
- H1: `# Just One Sip`
- Blockquote: Concise summary of what the site is (Curated bilingual daily cocktail guide, 33 classic IBA recipes, precise measurements in metric, historical provenance, zero ads).
- Core Sections:
  - System Instructions / Quick Reference (standard pour volumes, ratios).
  - Complete Cocktail Index grouped by Base Spirit with canonical URLs.
  - Link to `/llms-full.txt`.

#### 2. `/llms-full.txt` (Complete Machine-Readable Knowledge Base)
Static endpoint (`src/pages/llms-full.txt.ts` compiling to `/llms-full.txt`):
- Outputs complete recipes, exact measurements, origin capsules, flavor profiles, and instructions for all 33 cocktails in structured Markdown.
- Allows AI models (Perplexity, Claude, ChatGPT) to ingest the entire library in a single crawl pass.

#### 3. AI Crawler Directives in `robots.txt`
Update `public/robots.txt`:
```txt
User-agent: *
Allow: /

# Dedicated AI Search Engine Crawlers
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: https://justonesip.today/sitemap.xml
LLMs-Txt: https://justonesip.today/llms.txt
```

---

### Pillar 6: Sitemap Metadata & Horizontal Cross-Linking

#### 1. Sitemap `<lastmod>`
Update `src/pages/sitemap.xml.ts` to output `<lastmod>` for every entry:
- Derived from cocktail data publication date or repository build timestamp.
- Ensures Googlebot and Bingbot prioritize recently updated recipe entries.

#### 2. Related Cocktails Cross-Linking
On each cocktail detail page, render a discreet "Sister Drinks" or "If You Like This" shelf (2 related cocktails sharing base spirit or flavor profile):
- Example: Negroni detail page links to `Boulevardier` (Bourbon cousin) and `Aperol Spritz` (Italian aperitivo cousin).
- Strengthens search crawler graph connectivity and user session depth.

---

## Verification & Acceptance Criteria

1. **Static Build**: `npm run build` succeeds with zero errors.
2. **Static Verification Test Suite**: `npm run verify` passes with all new checks:
   - Validates all spirit taxonomy pages (`/[locale]/cocktails/spirit/[spirit]/`) exist with canonical and reciprocal `hreflang`.
   - Validates `ItemList` JSON-LD on all spirit pages.
   - Validates `Recipe` JSON-LD: `cookTime: "PT0M"`, `prepTime`, `recipeCuisine`, and `FAQPage` schema.
   - Validates `llms.txt` and `llms-full.txt` exist and contain all 33 cocktails.
   - Validates OpenGraph images resolve to valid raster URLs with explicit dimensions.
3. **Zero Visual Regression**: Midnight Pour low-light styling, responsive typography, and mobile performance remain uncompromised.
