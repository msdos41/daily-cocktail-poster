# Bilingual Generative Engine Feeds and Hierarchical Topic Silos

To resolve language asymmetry in machine-readable knowledge feeds, eliminate internal link silos between taxonomy hubs and cocktail detail pages, and strengthen knowledge graph entity resolution, Just One Sip will implement symmetrical bilingual `/llms.txt` endpoints, upgrade cocktail detail breadcrumbs to a 4-tier topic silo, and link recipes to canonical Wikidata entities while keeping catalog taxonomy strictly bounded to base spirits.

## Considered Options

- **Bilingual LLM Feeds Architecture**:
  - *Option 1 (Single mixed-language feed)*: Combine English and Chinese into one monolithic `/llms-full.txt`.
    - *Drawbacks*: Inefficient token overhead for LLM scrapers querying in a single language; violates the symmetrical `/en/` and `/zh-cn/` routing architecture.
  - *Option 2 (Selected - Symmetrical SSG Endpoints)*: Maintain `/llms.txt` as a root index and generate language-scoped feeds (`/[locale]/llms.txt` and `/[locale]/llms-full.txt`) via Astro dynamic endpoints.
    - *Benefits*: Aligns with `llmstxt.org` conventions; enables bot crawlers (DeepSeek, Kimi, ChatGPT, Claude) to ingest language-specific tokens cleanly.

- **Detail Breadcrumb Hierarchy**:
  - *Option 1 (Flat 3-tier hierarchy)*: Keep `Home > The Collection > [Cocktail]`.
    - *Drawbacks*: Leaves the 11 Base Spirit Hubs (`/cocktails/spirit/[spirit]/`) isolated from reciprocal detail-page breadcrumbs and breadcrumb schema.
  - *Option 2 (Selected - 4-tier Topic Silo)*: Upgrade to `Home > The Collection > [Base Spirit Hub] > [Cocktail]`.
    - *Benefits*: Connects detail pages back to their parent Base Spirit Hub using exact anchor text (e.g., "Gin Cocktails" / "金酒鸡尾酒"), establishing a reciprocal Topic Cluster in both UI and Schema.org `BreadcrumbList`.

- **Secondary Taxonomies (Flavor, Occasion, Glassware)**:
  - *Option 1 (Premature category proliferation)*: Introduce static routes for flavor profiles (`/cocktails/flavor/sour`) and drink styles (`/cocktails/style/equal-parts`).
    - *Drawbacks*: With a 33-cocktail catalog, splitting drinks across 20+ thin landing pages causes keyword cannibalization and thin content penalties.
  - *Option 2 (Selected - Deferred expansion)*: Maintain the 11 Base Spirit Hubs as the sole taxonomy until the catalog expands past 50 entries.

- **Knowledge Graph and Schema.org Hygiene**:
  - *Option 1 (Minimal Schema fix)*: Simply remove `cookTime: "PT0M"` from Recipe Schema.
  - *Option 2 (Selected - Comprehensive entity resolution)*: Remove `cookTime`, add official social `sameAs` to `Organization`, and add canonical `wikidataId` and `ibaCategory` entity mappings to `StableCocktail`.

## Consequences

- Symmetrical LLM endpoints will be introduced under `src/pages/[locale]/llms.txt.ts` and `src/pages/[locale]/llms-full.txt.ts`, with root `public/robots.txt` referencing both language feeds.
- Breadcrumbs in `src/pages/[locale]/cocktails/[slug].astro` and `src/utils/structuredData.ts` will reference the parent Base Spirit Hub.
- `StableCocktail` in `src/data/cocktails.ts` will house `wikidataId` and `ibaCategory` properties.
- Static verification assertions in `scripts/verify-static-output.mjs` will cover bilingual `/llms.txt` routes and 4-tier `BreadcrumbList` validation when implementation occurs.
