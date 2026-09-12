# 03: Static Base Spirit Taxonomy Landing Pages

**What to build:**
Create statically pre-rendered landing pages for each base spirit (`gin`, `whiskey`, `rum`, `tequila`, `vodka`, `brandy`, `scotch`, `mezcal`) at `/[locale]/cocktails/spirit/[spirit]/` to capture high-intent categorical search traffic ("Classic Gin Cocktails", "Rum Drink Recipes").
1. Create dynamic SSG route `src/pages/[locale]/cocktails/spirit/[spirit].astro`.
2. Generate unique, localized `<title>` and `<meta name="description">` for each spirit category.
3. Emit Schema.org `CollectionPage` and `ItemList` JSON-LD indexing only the cocktails matching the specific spirit.
4. Render three-level `BreadcrumbList` (`Home > The Collection > [Spirit]`).
5. Render clean static grid of cocktail cards matching the Midnight Pour visual style.
6. Include all spirit taxonomy URLs in `sitemap.xml` with symmetrical `hreflang` alternates (`en`, `zh-CN`, `x-default`).

**Blocked by:**
- None

**Status:** ready-for-agent

- [ ] Routes `/[locale]/cocktails/spirit/[spirit]/` statically generate for all active spirits and locales.
- [ ] Each spirit page has unique localized SEO title, meta description, and canonical URL.
- [ ] Each spirit page outputs valid `CollectionPage`, `ItemList`, and `BreadcrumbList` JSON-LD.
- [ ] `sitemap.xml` contains all spirit taxonomy URLs with reciprocal `hreflang` alternates.
- [ ] `npm run build` succeeds with zero errors.
