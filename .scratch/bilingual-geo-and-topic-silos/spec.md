Status: ready-for-agent
Created: 2026-09-12

# Specification: Bilingual Generative Engine Feeds and Hierarchical Topic Silos

## Problem Statement

As Just One Sip has grown to 33 classic cocktails and 11 Base Spirit Hubs, two critical discoverability bottlenecks have emerged:
1. **Language Asymmetry in Generative Engine Feeds**: The machine-readable knowledge base feeds (`/llms.txt` and `/llms-full.txt`) are exclusively written in English. When bilingual or Chinese-first AI engines (such as DeepSeek, Kimi, Doubao, or ChatGPT processing Chinese queries) crawl the site for cocktail recipes, origin lore, and bartender techniques, they receive no structured Chinese knowledge feed—despite the website possessing complete, high-quality Simplified Chinese editorial content.
2. **Broken Internal Link Silos & Flat Breadcrumbs**: Cocktail detail pages currently implement a flat 3-tier breadcrumb (`Home > The Collection > [Cocktail]`). This completely bypasses the 11 Base Spirit Hubs, leaving them disconnected from the detail pages in the visual navigation hierarchy and in Schema.org `BreadcrumbList` structured data. Search engine bots lack clear parent-child topical signals between the specific cocktail and its foundation spirit.
3. **Knowledge Graph Disconnect**: The Recipe Schema contains an obsolete `cookTime: "PT0M"` attribute that triggers warnings in beverage recipes, while missing authoritative entity disambiguation identifiers (Wikidata QIDs, IBA Official classification) and publisher social profile verification (`sameAs`).

## Solution

1. **Symmetrical Bilingual Generative Engine Feeds**: Establish dedicated, language-scoped LLM endpoints (`/en/llms.txt`, `/en/llms-full.txt`, `/zh-cn/llms.txt`, `/zh-cn/llms-full.txt`) paired with a bilingual index in the root `/llms.txt`. Both feeds are declared in `robots.txt` for AI crawlers.
2. **4-Tier Topic Silo Breadcrumbs**: Upgrade cocktail detail page navigation and Schema.org `BreadcrumbList` to `Home > The Collection > [Base Spirit Hub] > [Cocktail Name]` using exact taxonomy keywords (e.g. "Gin Cocktails" / "金酒鸡尾酒"), establishing a reciprocal Topic Cluster.
3. **Semantic Knowledge Graph Resolution**: Eliminate `cookTime` from cocktail recipes, enrich the publisher Organization with official social `sameAs` links, and integrate universal Wikidata entity identifiers and IBA categorization into the core cocktail facts model.
4. **Preserved Catalog Density**: Enforce an architectural boundary that prevents splitting the 33-cocktail catalog into thin secondary category landing pages (flavors, glassware, or occasions) until the drink library reaches 50+ cocktails.

## User Stories

1. As a Chinese-speaking user querying an AI answer engine (such as DeepSeek or Kimi) about the history and ratio of a classic cocktail, I want the AI to retrieve accurate, verified facts from Just One Sip's Chinese knowledge feed, so that I receive an authoritative answer with exact metric measurements and historical provenance.
2. As an English-speaking user querying ChatGPT Search or Perplexity about cocktail recipes, I want the engine to cite Just One Sip's English LLM feed, so that I get concise bartender secrets and dilution advice.
3. As an autonomous AI crawler (such as GPTBot, ClaudeBot, or PerplexityBot), I want to discover language-specific LLM endpoints in `robots.txt` and the root `llms.txt`, so that I can ingest the site's content with minimal token consumption and without linguistic confusion.
4. As a cocktail enthusiast visiting a cocktail detail page, I want to see a breadcrumb linking to its parent Base Spirit Hub (e.g., Gin Cocktails), so that I can easily navigate to all other drinks crafted with that same spirit.
5. As a search engine bot (Googlebot, Bingbot), I want to parse a 4-tier `BreadcrumbList` JSON-LD schema on detail pages, so that I can understand the hierarchical taxonomy structure and index the site's topic clusters accurately.
6. As a search engine crawler evaluating rich results, I want the cocktail `Recipe` structured data to omit meaningless cooking times, so that the page encounters zero schema validation warnings in search console tools.
7. As a semantic search engine constructing entity graphs, I want cocktail detail schemas to reference canonical Wikidata entity IDs and IBA World Cocktail classifications, so that the cocktail is unambiguously identified in the global knowledge graph.
8. As a social media platform displaying publisher identity, I want the publisher `Organization` schema to declare verified social handles (`sameAs`), so that the brand entity is linked to its official social accounts.
9. As a mobile visitor exploring the collection, I want breadcrumbs with full taxonomy titles to wrap or scroll naturally without breaking mobile screen layouts, so that the Midnight Pour visual experience remains polished.
10. As a site maintainer, I want all bilingual LLM feeds to be generated automatically at build time from the single source of truth in the cocktail data layer, so that content changes never result in desynchronized knowledge feeds.
11. As a site maintainer, I want automated verification tests to assert the existence, syntax, and contents of both English and Chinese `/llms.txt` and `/llms-full.txt` files, so that any feed regressions are caught prior to deployment.
12. As a site maintainer, I want static verification tests to ensure all cocktail detail pages contain valid 4-tier breadcrumbs in both HTML and JSON-LD, so that taxonomy regressions are impossible to deploy unnoticed.

## Implementation Decisions

### 1. Bilingual LLM Feeds Architecture
- **Root Feed (`/llms.txt`)**: Functions as a bilingual navigation hub and project brief adhering to `llmstxt.org` specifications. It contains summary metadata, quick bar measurement rules, and links to both English and Chinese full knowledge feeds.
- **Language-Scoped Static Endpoints**: Implement dynamic build endpoints that generate:
  - `/[locale]/llms.txt`: A concise markdown index of all 33 cocktails for that locale, organized by Base Spirit Hub.
  - `/[locale]/llms-full.txt`: An exhaustive, machine-readable knowledge base containing exact recipes, lore, flavor notes, preparation steps, bartender secrets, and FAQs in the target language.
- **Crawler Directives**: Update the root `robots.txt` file to declare both language feed URLs alongside the root index.

### 2. Hierarchical Breadcrumb & Topic Silo Linking
- **Breadcrumb Structure**: Modify the detail page breadcrumb layout and structured data from `[Home, The Collection, Cocktail]` to `[Home, The Collection, Base Spirit Hub, Cocktail]`.
- **Anchor Text Convention**: The Base Spirit Hub step must use the full taxonomy title (e.g., "Gin Cocktails" / "金酒鸡尾酒") rather than a bare spirit name, matching the `<h1>` and `<title>` of the target taxonomy page to reinforce topic authority.
- **Structured Data Alignment**: The `BreadcrumbList` schema in the recipe structured data generator must output 4 items with matching URLs and titles.

### 3. Entity Resolution & Schema.org Cleanup
- **Recipe Schema Hygiene**: Remove the `cookTime` property completely from the cocktail `Recipe` JSON-LD generator. Retain `prepTime: "PT3M"` and `totalTime: "PT3M"`.
- **Publisher Entity Enhancement**: Add `sameAs: ["https://x.com/justonesip_app"]` to the `Organization` structured data object.
- **Cocktail Facts Model Expansion**: Extend the core stable cocktail model with optional entity properties:
  - `wikidataId?: string` (e.g. `"Q1342603"` for Negroni)
  - `ibaCategory?: string` (e.g. `"The Unforgettables"`, `"Contemporary Classics"`, or `"New Era Drinks"`)
- **Semantic Link Output**: Output these entity references in `Recipe` schema via `isBasedOn` (linking to IBA classification) and `sameAs` (linking to Wikidata URI), and include them as structured bullet points in both English and Chinese `llms-full.txt`.

### 4. Taxonomy Boundary Rule
- Explicitly reject introducing sub-taxonomies (by flavor profile, drinking occasion, glass style, or era) while the catalog contains under 50 cocktails. The 11 Base Spirit Hubs remain the sole category classification to prevent thin content penalties.

## Testing Decisions

### What Makes a Good Test
- Tests must verify external artifacts and build outputs rather than internal function calls.
- In a pure static SSG architecture, the ultimate test seam is the compiled output directory (`dist/`).
- Every assertion must validate observable contracts: HTTP routes existing on disk, valid JSON-LD parsing, reciprocal link references, and correct string content in public feeds.

### Modules to Test
- **Static Output Verification Suite**: The primary test seam for all changes.
  - Assert that `/en/llms.txt`, `/en/llms-full.txt`, `/zh-cn/llms.txt`, and `/zh-cn/llms-full.txt` exist in `dist/`.
  - Assert that each language feed contains all 33 cocktail slugs and correct localized text.
  - Assert that `robots.txt` contains references to both localized LLM feeds.
  - Assert that all 66 cocktail detail pages (`en` and `zh-CN`) output a 4-tier `BreadcrumbList` JSON-LD with valid step positions and URLs.
  - Assert that all cocktail detail pages do not contain `cookTime` in their `Recipe` JSON-LD.
  - Assert that `Organization` JSON-LD contains verified `sameAs` arrays.

### Prior Art
- Existing verification script (`scripts/verify-static-output.mjs`) already verifies `sitemap.xml`, hreflang symmetry, legacy redirects, Recipe schema presence, and ItemList validity.
- All new assertions should be integrated directly into this verification suite.

## Out of Scope

1. **Secondary Taxonomy Pages**: Static routes for flavors (sour, bitter, highball), occasions, or difficulty are strictly deferred until the library exceeds 50 drinks.
2. **Interactive Rating System**: Adding user review submission forms or mock star ratings is prohibited to avoid violating Google Search Console aggregate rating policies.
3. **Server-Side APIs**: No dynamic endpoints, database connections, or search API routes.
4. **Visual Overhauls**: The Midnight Pour aesthetic, color palette, and layout of the cocktail poster remain unchanged.

## Further Notes

- All changes maintain 100% compatibility with static hosting (Cloudflare Pages, GitHub Pages, Vercel Static).
- The domain terms `Base Spirit Hub` and `Sister Pours` are registered in `CONTEXT.md` and must be respected across all implementation tickets.
- Architectural rationale is preserved in `docs/adr/0003-bilingual-llm-feeds-and-hierarchical-topic-silos.md`.
