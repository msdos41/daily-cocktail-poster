# 06: Static Verification Test Suite Updates

**What to build:**
Update `scripts/verify-static-output.mjs` to rigorously enforce the new SEO and GEO constraints and prevent future regressions.
1. Add verification of base spirit taxonomy pages (`/[locale]/cocktails/spirit/[spirit]/`):
   - Assert HTML existence for all supported spirits across all locales.
   - Assert canonical URLs and reciprocal `hreflang` alternates.
   - Assert `ItemList` JSON-LD correctly matches cocktails of that spirit.
2. Add verification of updated `Recipe` and `FAQPage` JSON-LD:
   - Assert `cookTime` is eliminated or "PT0M".
   - Assert presence of `recipeCuisine` and valid dietary/tool metadata.
   - Assert detail pages include valid `FAQPage` schema.
3. Add verification of OpenGraph raster assets:
   - Assert detail pages reference raster OG images with explicit width and height.
   - Assert no detail page falls back to `og-default-v2.jpg`.
4. Add verification of `llms.txt` and `llms-full.txt`:
   - Assert `dist/llms.txt` and `dist/llms-full.txt` exist and contain all 33 cocktails.
5. Add verification of `robots.txt`:
   - Assert references to both `sitemap.xml` and `llms.txt`.
6. Add verification of `sitemap.xml`:
   - Assert `<lastmod>` is present for all URLs.

**Blocked by:**
- 01: SEO Schema Perfection and Sitemap Enrichment
- 02: Cocktail Dedicated Raster OG Images
- 03: Static Base Spirit Taxonomy Landing Pages
- 04: Midnight Pour Editorial Expansion
- 05: GEO LLMs.txt and AI Search Crawler Protocol

**Status:** ready-for-agent

- [ ] `scripts/verify-static-output.mjs` implements all validation rules for new routes, schemas, OG images, and llms.txt.
- [ ] `npm run build` succeeds with zero errors.
- [ ] `npm run verify` passes with 100% assertions green.
