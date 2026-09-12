# 02: Cocktail Dedicated Raster OG Images (1200x630)

**What to build:**
Resolve the OpenGraph social sharing and Google visual search blindspot where SVG poster images cause `src/utils/seo.ts` to fall back to the generic `/images/og-default-v2.jpg` for all cocktail pages.
1. Establish a pipeline to generate or pre-render 1200x630 raster images (WebP or JPG) for all 33 cocktails at `/images/cocktails/${id}-og.webp` (or JPG).
2. Update `src/utils/seo.ts` (`socialImageMetadata`) to detect and serve cocktail-specific raster images with explicit `1200x630` width and height dimensions and proper MIME types.
3. Wire `cocktail.ogImage` into `src/pages/[locale]/cocktails/[slug].astro` so search engines and social platforms render unique, branded visual cards for every cocktail.

**Blocked by:**
- None

**Status:** ready-for-agent

- [ ] Every cocktail has a 1200x630 raster OG preview asset accessible at build time.
- [ ] Detail pages output cocktail-specific `og:image`, `og:image:secure_url`, `og:image:width`, `og:image:height`, and `twitter:image`.
- [ ] No cocktail detail page falls back to the generic `og-default-v2.jpg`.
- [ ] `npm run build` succeeds with zero errors.
