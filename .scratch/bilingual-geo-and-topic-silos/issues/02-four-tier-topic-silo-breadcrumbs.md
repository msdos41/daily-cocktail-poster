# 02: Four-Tier Topic Silo Breadcrumbs and Internal Linking

**What to build:**
Upgrade cocktail detail pages so that their visual breadcrumbs and Schema.org `BreadcrumbList` reflect a 4-tier topic silo hierarchy (`Home > The Collection > [Base Spirit Hub] > [Cocktail Name]`). The third breadcrumb step uses the full taxonomy title (e.g. "Gin Cocktails" / "金酒鸡尾酒") and links directly to the corresponding Base Spirit Hub page (`/cocktails/spirit/[spirit]/`). This eliminates the internal link disconnect between taxonomy hubs and individual cocktails, passing topical PageRank and providing search engines with a clear, reciprocal site hierarchy.

**Blocked by:** None (can start immediately)

**Status:** closed
Completed: 2026-09-12

- [x] Visual breadcrumb on all cocktail detail pages (`src/pages/[locale]/cocktails/[slug].astro`) displays 4 steps: `Home > The Collection > [Base Spirit Hub] > [Cocktail Name]`.
- [x] The third breadcrumb step links to the correct localized Base Spirit Hub URL (`/${locale}/cocktails/spirit/${spirit}/`).
- [x] The third breadcrumb anchor text uses the full localized taxonomy name (e.g. "Gin Cocktails" in English, "金酒鸡尾酒" in Simplified Chinese).
- [x] Schema.org `BreadcrumbList` on all 66 detail pages contains exactly 4 `ListItem` elements with sequential positions (1 to 4), matching URLs and names.
- [x] Visual breadcrumb styling maintains responsive wrapping/layout under the Midnight Pour aesthetic without horizontal overflow on mobile viewports.
- [x] Static output verification suite (`npm run verify`) verifies that all detail pages contain valid 4-tier HTML breadcrumbs and matching 4-item `BreadcrumbList` JSON-LD blocks.
- [x] Site builds cleanly with `npm run build` and passes `npm run verify`.
