# 01: SEO Schema Perfection and Sitemap Enrichment

**What to build:**
Refactor Schema.org structured data and static sitemap output to address technical SEO defects and enrich search engine indexation.
1. Correct cocktail `Recipe` Schema: eliminate bogus `cookTime: "PT3M"` (cocktails are mixed/stirred/shaken, not cooked; set `cookTime: "PT0M"` or omit, keep `prepTime: "PT3M"` and `totalTime: "PT3M"`).
2. Add high-value semantic properties: `recipeCuisine` (e.g., Italian, American, Cuban), `suitableForDiet` (e.g., VeganDiet), and bar tool entities (`tool`).
3. Output `FAQPage` structured data on cocktail detail pages to unlock FAQ rich snippets in search results.
4. Update `src/pages/sitemap.xml.ts` to output valid `<lastmod>` timestamps for all URLs derived from data publication dates or build timestamps.

**Blocked by:**
- None

**Status:** ready-for-agent

- [ ] Detail page `Recipe` Schema removes unrealistic `cookTime` and properly sets `prepTime` / `totalTime`.
- [ ] Detail page `Recipe` Schema includes `recipeCuisine`, `tool`, and `suitableForDiet` when applicable.
- [ ] Detail page outputs `FAQPage` Schema with 2-3 structured questions and answers per cocktail.
- [ ] `sitemap.xml` emits compliant ISO 8601 `<lastmod>` tags for all static paths and detail pages.
- [ ] `npm run build` succeeds with zero errors.
