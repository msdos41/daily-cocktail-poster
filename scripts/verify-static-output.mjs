import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(projectRoot, "dist");
const cocktailDataPath = path.join(projectRoot, "src", "data", "cocktails.ts");

const site = "https://justonesip.today";
const defaultLocale = "en";
const locales = [
  { locale: "en", path: "en" },
  { locale: "zh-CN", path: "zh-cn" },
];
const staticContentPaths = ["/", "/cocktails", "/about", "/privacy"];
const requiredPublicPaths = [
  "/",
  "/404.html",
  "/sitemap.xml",
  "/robots.txt",
  "/llms.txt",
  "/llms-full.txt",
  "/en/llms.txt",
  "/en/llms-full.txt",
  "/zh-cn/llms.txt",
  "/zh-cn/llms-full.txt",
  "/images/og-default-en.jpg",
  "/images/og-default-zh.jpg",
  "/images/og-default-v2.jpg",
];
const spiritSlugs = [
  "gin",
  "whiskey",
  "rum",
  "tequila",
  "vodka",
  "mezcal",
  "brandy",
  "scotch",
  "pisco",
  "cachaca",
  "aperol",
];
const errors = [];
const summary = {
  pages: 0,
  sitemapUrls: 0,
  recipes: 0,
  itemLists: 0,
  faqPages: 0,
  sharePayloads: 0,
  collectionsVerified: 0,
  spiritTaxonomiesVerified: 0,
  llmFeeds: 0,
};

main();

function main() {
  assert(fileExists(distDir), "dist/ does not exist. Run npm run build before npm run verify.");

  const slugs = readCocktailSlugs();
  const sitemapXml = readRequired(path.join(distDir, "sitemap.xml"), "sitemap.xml");
  const sitemapEntries = sitemapXml ? verifySitemap(sitemapXml, slugs) : [];

  verifyRequiredPages(slugs);
  verify404(sitemapXml);
  verifyRobots();
  verifyLLMs(slugs);
  verifyContentPages(slugs);
  verifyCollectionPages(slugs);
  verifySpiritTaxonomyPages(slugs);
  verifyLegacyArchiveRedirects();
  verifyCssTokens();
  verifyDefaultSocialImages();

  if (errors.length > 0) {
    console.error(`Static verification failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Static verification passed.");
  console.log(`- Checked ${summary.pages} content pages.`);
  console.log(`- Checked ${summary.sitemapUrls || sitemapEntries.length} sitemap URLs.`);
  console.log(`- Checked ${summary.recipes} Recipe JSON-LD blocks.`);
  console.log(`- Checked ${summary.faqPages} FAQPage JSON-LD blocks.`);
  console.log(`- Checked ${summary.itemLists} ItemList JSON-LD blocks.`);
  console.log(`- Checked ${summary.sharePayloads} share payloads.`);
  console.log(`- Verified The Collection catalog pre-renders all ${slugs.length} cocktails.`);
  console.log(`- Verified ${summary.spiritTaxonomiesVerified} spirit taxonomy landing pages.`);
  console.log(`- Verified ${summary.llmFeeds} LLM knowledge feeds.`);
}

function verifyRequiredPages(slugs) {
  for (const publicPath of requiredPublicPaths) {
    assert(fileExists(filePathForPublicPath(publicPath)), `Missing required generated page: ${publicPath}`);
  }

  const rootHtml = readRequired(filePathForPublicPath("/"), "/");
  if (rootHtml) {
    const expectedRootOg = `${site}/images/og-default-en.jpg`;
    const ogImage = getMetaContent(rootHtml, "property", "og:image", "/");
    assert(ogImage === expectedRootOg, `/ og:image must be ${expectedRootOg}, got ${ogImage || "none"}`);
    const twitterImage = getMetaContent(rootHtml, "name", "twitter:image", "/");
    assert(twitterImage === expectedRootOg, `/ twitter:image must be ${expectedRootOg}, got ${twitterImage || "none"}`);
  }

  for (const locale of locales) {
    for (const contentPath of staticContentPaths) {
      const publicPath = routeForLocalePath(locale.locale, contentPath);
      assert(fileExists(filePathForPublicPath(publicPath)), `Missing required generated page: ${publicPath}`);
    }

    for (const spirit of spiritSlugs) {
      const publicPath = routeForLocalePath(locale.locale, `/cocktails/spirit/${spirit}`);
      assert(fileExists(filePathForPublicPath(publicPath)), `Missing required spirit taxonomy page: ${publicPath}`);
    }

    for (const slug of slugs) {
      const publicPath = routeForLocalePath(locale.locale, `/cocktails/${slug}`);
      assert(fileExists(filePathForPublicPath(publicPath)), `Missing required cocktail detail page: ${publicPath}`);
    }
  }
}

function verify404(sitemapXml) {
  const html = readRequired(path.join(distDir, "404.html"), "404.html");
  if (!html) return;

  const robots = getMetaContent(html, "name", "robots", "404.html");
  assert(normalizeRobots(robots) === "noindex,follow", "404.html must include meta robots=noindex,follow.");

  if (sitemapXml) {
    assert(!sitemapXml.includes("404.html"), "sitemap.xml must not include 404.html.");
    assert(!sitemapXml.includes(`${site}/404`), "sitemap.xml must not include a 404 URL.");
  }
}

function verifyRobots() {
  const robotsTxt = readRequired(path.join(distDir, "robots.txt"), "robots.txt");
  if (!robotsTxt) return;

  assert(robotsTxt.includes("Sitemap: https://justonesip.today/sitemap.xml"), "robots.txt must include Sitemap directive.");
  assert(robotsTxt.includes("LLMs-Txt: https://justonesip.today/llms.txt"), "robots.txt must include root LLMs-Txt directive.");
  assert(robotsTxt.includes("LLMs-Txt: https://justonesip.today/en/llms.txt"), "robots.txt must include /en/llms.txt directive.");
  assert(robotsTxt.includes("LLMs-Txt: https://justonesip.today/zh-cn/llms.txt"), "robots.txt must include /zh-cn/llms.txt directive.");
  assert(robotsTxt.includes("GPTBot"), "robots.txt must include GPTBot directive.");
  assert(robotsTxt.includes("PerplexityBot"), "robots.txt must include PerplexityBot directive.");
}

function verifyLLMs(slugs) {
  const llmsTxt = readRequired(path.join(distDir, "llms.txt"), "llms.txt");
  if (llmsTxt) {
    for (const slug of slugs) {
      assert(llmsTxt.includes(slug), `llms.txt must mention cocktail slug ${slug}.`);
    }
    summary.llmFeeds += 1;
  }

  const llmsFullTxt = readRequired(path.join(distDir, "llms-full.txt"), "llms-full.txt");
  if (llmsFullTxt) {
    for (const slug of slugs) {
      assert(llmsFullTxt.includes(slug), `llms-full.txt must mention cocktail slug ${slug}.`);
    }
    summary.llmFeeds += 1;
  }

  for (const locale of locales) {
    const localizedLlms = readRequired(path.join(distDir, locale.path, "llms.txt"), `${locale.path}/llms.txt`);
    if (localizedLlms) {
      for (const slug of slugs) {
        assert(localizedLlms.includes(slug), `${locale.path}/llms.txt must mention cocktail slug ${slug}.`);
      }
      summary.llmFeeds += 1;
    }

    const localizedLlmsFull = readRequired(path.join(distDir, locale.path, "llms-full.txt"), `${locale.path}/llms-full.txt`);
    if (localizedLlmsFull) {
      for (const slug of slugs) {
        assert(localizedLlmsFull.includes(slug), `${locale.path}/llms-full.txt must mention cocktail slug ${slug}.`);
      }
      summary.llmFeeds += 1;
    }
  }
}

function verifyContentPages(slugs) {
  const pages = [];

  for (const locale of locales) {
    for (const contentPath of staticContentPaths) {
      pages.push({
        locale: locale.locale,
        contentPath,
        publicPath: routeForLocalePath(locale.locale, contentPath),
        kind: contentPath === "/" ? "home" : contentPath.slice(1),
      });
    }

    for (const spirit of spiritSlugs) {
      pages.push({
        locale: locale.locale,
        contentPath: `/cocktails/spirit/${spirit}`,
        publicPath: routeForLocalePath(locale.locale, `/cocktails/spirit/${spirit}`),
        kind: "spirit",
        spirit,
      });
    }

    for (const slug of slugs) {
      pages.push({
        locale: locale.locale,
        contentPath: `/cocktails/${slug}`,
        publicPath: routeForLocalePath(locale.locale, `/cocktails/${slug}`),
        kind: "detail",
        slug,
      });
    }
  }

  for (const page of pages) {
    const pageId = page.publicPath;
    const html = readRequired(filePathForPublicPath(page.publicPath), pageId);
    if (!html) continue;

    const canonical = urlForLocalePath(page.locale, page.contentPath);
    verifyCanonicalAndHreflang(html, page, canonical);
    verifyJsonLd(html, page, canonical, slugs);

    if (page.kind === "detail") {
      const ogImage = getMetaContent(html, "property", "og:image", pageId);
      assert(Boolean(ogImage), `${pageId} must include og:image.`);
      if (ogImage) {
        assert(!ogImage.endsWith(".svg"), `${pageId} og:image must not be SVG.`);
        assert(!ogImage.includes("og-default"), `${pageId} og:image must not fall back to default: ${ogImage}`);
      }
      const ogWidth = getMetaContent(html, "property", "og:image:width", pageId);
      const ogHeight = getMetaContent(html, "property", "og:image:height", pageId);
      assert(ogWidth === "1200", `${pageId} og:image:width must be 1200, got ${ogWidth}`);
      assert(ogHeight === "630", `${pageId} og:image:height must be 630, got ${ogHeight}`);

      const sisterCardImgs = [...html.matchAll(/<img[^>]+class="sister-card-img"[^>]*>/g)];
      assert(sisterCardImgs.length > 0, `${pageId} must have sister cards.`);
      for (const match of sisterCardImgs) {
        const src = match[0].match(/src="([^"]+)"/)?.[1];
        assert(
          Boolean(src && src.includes("desktop")),
          `${pageId} sister card image must use desktop visual, got: ${src}`,
        );
      }

      assert(!html.includes('editorial-capsule'), `${pageId} must not use obsolete editorial-capsule class.`);
      assert(html.includes('detail-editorial-columns'), `${pageId} must include detail-editorial-columns.`);
      assert(html.includes('editorial-tips-list'), `${pageId} must include editorial-tips-list.`);
      assert(html.includes('class="detail-breadcrumbs"'), `${pageId} must include detail-breadcrumbs.`);
      assert(html.includes('/cocktails/spirit/'), `${pageId} detail-breadcrumbs must link to base spirit hub.`);
    }

    if (page.kind === "home" || page.kind === "cocktails" || page.kind === "about" || page.kind === "privacy") {
      const expectedOg = page.locale === "zh-CN"
        ? `${site}/images/og-default-zh.jpg`
        : `${site}/images/og-default-en.jpg`;
      const ogImage = getMetaContent(html, "property", "og:image", pageId);
      assert(ogImage === expectedOg, `${pageId} og:image must be ${expectedOg}, got ${ogImage || "none"}`);
      const twitterImage = getMetaContent(html, "name", "twitter:image", pageId);
      assert(twitterImage === expectedOg, `${pageId} twitter:image must be ${expectedOg}, got ${twitterImage || "none"}`);
    }

    if (page.kind === "home" || page.kind === "detail") {
      verifySharePayload(html, page, canonical);
    }

    summary.pages += 1;
  }
}

function verifySitemap(sitemapXml, slugs) {
  const entries = parseSitemap(sitemapXml);
  const locs = entries.map((entry) => entry.loc);
  const expectedUrls = expectedSitemapUrls(slugs);
  const locSet = new Set(locs);

  summary.sitemapUrls = entries.length;

  for (const loc of locs) {
    assert(loc.startsWith(`${site}/`), `sitemap URL must use ${site}: ${loc}`);
    assert(loc !== `${site}/`, "sitemap.xml must not include the root redirect URL.");
    assert(!loc.includes("404"), `sitemap.xml must not include error pages: ${loc}`);
    assert(fileExists(filePathForPublicUrl(loc)), `sitemap URL has no generated file: ${loc}`);
  }

  for (const loc of locs) {
    const firstIndex = locs.indexOf(loc);
    const lastIndex = locs.lastIndexOf(loc);
    assert(firstIndex === lastIndex, `sitemap URL appears more than once: ${loc}`);
  }

  for (const expectedUrl of expectedUrls) {
    assert(locSet.has(expectedUrl), `sitemap.xml is missing expected URL: ${expectedUrl}`);
  }

  for (const loc of locs) {
    assert(expectedUrls.includes(loc), `sitemap.xml includes unexpected URL: ${loc}`);
  }

  for (const entry of entries) {
    assert(
      /^\d{4}-\d{2}-\d{2}/.test(entry.lastmod),
      `sitemap entry ${entry.loc} must have valid ISO 8601 lastmod, got "${entry.lastmod}".`,
    );

    const parsed = parseLocalePath(new URL(entry.loc).pathname);
    if (!parsed) {
      assert(false, `sitemap URL is not locale-scoped: ${entry.loc}`);
      continue;
    }

    verifyAlternates(entry.alternates, parsed.contentPath, `sitemap ${entry.loc}`);
  }

  return entries;
}

function verifyCanonicalAndHreflang(html, page, canonical) {
  const pageId = page.publicPath;
  const canonicals = getTags(html, "link")
    .map((tag) => parseAttrs(tag))
    .filter((attrs) => attrs.rel === "canonical")
    .map((attrs) => attrs.href);

  assert(canonicals.length === 1, `${pageId} must include exactly one canonical link.`);
  assert(canonicals[0] === canonical, `${pageId} canonical must be ${canonical}, got ${canonicals[0] || "none"}.`);

  const ogUrl = getMetaContent(html, "property", "og:url", pageId);
  assert(ogUrl === canonical, `${pageId} og:url must match canonical ${canonical}, got ${ogUrl || "none"}.`);

  const alternates = getTags(html, "link")
    .map((tag) => parseAttrs(tag))
    .filter((attrs) => attrs.rel === "alternate")
    .map((attrs) => ({ hreflang: attrs.hreflang, href: attrs.href }));

  verifyAlternates(alternates, page.contentPath, pageId);
}

function verifyJsonLd(html, page, canonical, slugs) {
  const items = parseJsonLd(html, page.publicPath);
  const recipes = items.filter((item) => hasJsonLdType(item, "Recipe"));

  if (page.kind === "cocktails") {
    const collections = items.filter((item) => hasJsonLdType(item, "CollectionPage"));
    assert(collections.length === 1, `${page.publicPath} must include CollectionPage JSON-LD.`);

    const itemLists = items.filter((item) => hasJsonLdType(item, "ItemList"));
    assert(itemLists.length === 1, `${page.publicPath} must include ItemList JSON-LD.`);
    if (itemLists.length === 1) {
      const list = itemLists[0].itemListElement;
      assert(Array.isArray(list), `${page.publicPath} ItemList itemListElement must be an array.`);
      assert(
        list.length === slugs.length,
        `${page.publicPath} ItemList must list all ${slugs.length} cocktails, got ${list ? list.length : 0}.`,
      );
      if (Array.isArray(list)) {
        list.forEach((entry, idx) => {
          const position = idx + 1;
          assert(entry["@type"] === "ListItem", `${page.publicPath} ItemList item ${position} must be ListItem.`);
          assert(entry.position === position, `${page.publicPath} ItemList item ${position} position must be ${position}.`);
          assert(typeof entry.url === "string" && entry.url.length > 0, `${page.publicPath} ItemList item ${position} url is required.`);
        });
      }
      summary.itemLists = (summary.itemLists || 0) + 1;
    }
    return;
  }

  if (page.kind === "spirit") {
    const collections = items.filter((item) => hasJsonLdType(item, "CollectionPage"));
    assert(collections.length === 1, `${page.publicPath} must include CollectionPage JSON-LD.`);

    const itemLists = items.filter((item) => hasJsonLdType(item, "ItemList"));
    assert(itemLists.length === 1, `${page.publicPath} must include ItemList JSON-LD.`);
    if (itemLists.length === 1) {
      const list = itemLists[0].itemListElement;
      assert(Array.isArray(list) && list.length > 0, `${page.publicPath} ItemList itemListElement must be a non-empty array.`);
      if (Array.isArray(list)) {
        list.forEach((entry, idx) => {
          const position = idx + 1;
          assert(entry["@type"] === "ListItem", `${page.publicPath} ItemList item ${position} must be ListItem.`);
          assert(entry.position === position, `${page.publicPath} ItemList item ${position} position must be ${position}.`);
          assert(typeof entry.url === "string" && entry.url.length > 0, `${page.publicPath} ItemList item ${position} url is required.`);
        });
      }
      summary.itemLists = (summary.itemLists || 0) + 1;
    }

    const breadcrumbs = items.filter((item) => hasJsonLdType(item, "BreadcrumbList"));
    assert(breadcrumbs.length === 1, `${page.publicPath} must include BreadcrumbList JSON-LD.`);
    if (breadcrumbs.length === 1) {
      const list = breadcrumbs[0].itemListElement;
      assert(Array.isArray(list) && list.length === 3, `${page.publicPath} BreadcrumbList must have 3 items.`);
      if (Array.isArray(list) && list.length === 3) {
        assert(list[0].position === 1, `${page.publicPath} Breadcrumb step 1 position must be 1.`);
        assert(list[1].position === 2, `${page.publicPath} Breadcrumb step 2 position must be 2.`);
        assert(
          list[1].item === urlForLocalePath(page.locale, "/cocktails"),
          `${page.publicPath} Breadcrumb step 2 item must point to /cocktails, got ${list[1].item}.`,
        );
        assert(list[2].position === 3, `${page.publicPath} Breadcrumb step 3 position must be 3.`);
      }
    }
    return;
  }

  if (page.kind !== "detail") {
    assert(recipes.length === 0, `${page.publicPath} must not include Recipe JSON-LD.`);
    return;
  }

  assert(recipes.length === 1, `${page.publicPath} must include exactly one Recipe JSON-LD block.`);
  if (recipes.length !== 1) return;

  const recipe = recipes[0];
  const expectedRecipeId = `${canonical}#recipe`;

  assert(recipe["@id"] === expectedRecipeId, `${page.publicPath} Recipe @id must be ${expectedRecipeId}.`);
  assert(recipe.url === canonical, `${page.publicPath} Recipe url must be ${canonical}.`);
  assert(recipe.mainEntityOfPage === canonical, `${page.publicPath} Recipe mainEntityOfPage must be ${canonical}.`);
  assert(recipe.inLanguage === page.locale, `${page.publicPath} Recipe inLanguage must be ${page.locale}.`);
  assert(Array.isArray(recipe.image) && recipe.image.length > 0, `${page.publicPath} Recipe image must be a non-empty array.`);
  assert(
    Array.isArray(recipe.recipeIngredient) && recipe.recipeIngredient.length > 0,
    `${page.publicPath} Recipe recipeIngredient must be a non-empty array.`,
  );
  assert(
    recipe.nutrition && recipe.nutrition["@type"] === "NutritionInformation" && typeof recipe.nutrition.calories === "string",
    `${page.publicPath} Recipe nutrition.calories must be present.`,
  );
  assert(recipe.publisher && recipe.publisher["@type"] === "Organization", `${page.publicPath} Recipe publisher must be an Organization.`);

  assert(recipe.cookTime === undefined, `${page.publicPath} Recipe cookTime must be omitted, got ${recipe.cookTime}.`);
  assert(typeof recipe.prepTime === "string" && recipe.prepTime.length > 0, `${page.publicPath} Recipe prepTime is required.`);
  assert(typeof recipe.recipeCuisine === "string" && recipe.recipeCuisine.length > 0, `${page.publicPath} Recipe recipeCuisine is required.`);
  assert(Array.isArray(recipe.tool) && recipe.tool.length > 0, `${page.publicPath} Recipe tool must be a non-empty array.`);
  if (recipe.suitableForDiet !== undefined) {
    assert(
      recipe.suitableForDiet === "https://schema.org/VeganDiet",
      `${page.publicPath} Recipe suitableForDiet must be VeganDiet, got ${recipe.suitableForDiet}.`,
    );
  }
  assert(
    recipe.publisher &&
      recipe.publisher["@type"] === "Organization" &&
      Array.isArray(recipe.publisher.sameAs) &&
      recipe.publisher.sameAs.includes("https://x.com/justonesip_app"),
    `${page.publicPath} Recipe publisher must be an Organization with verified sameAs.`,
  );
  if (recipe.sameAs !== undefined) {
    assert(
      typeof recipe.sameAs === "string" && recipe.sameAs.startsWith("https://www.wikidata.org/wiki/Q"),
      `${page.publicPath} Recipe sameAs must link to Wikidata, got ${recipe.sameAs}.`,
    );
  }
  if (recipe.isBasedOn !== undefined) {
    assert(
      recipe.isBasedOn === "https://iba-world.com/iba-official-cocktails/",
      `${page.publicPath} Recipe isBasedOn must link to IBA cocktails, got ${recipe.isBasedOn}.`,
    );
  }

  const steps = recipe.recipeInstructions;
  assert(Array.isArray(steps) && steps.length > 0, `${page.publicPath} Recipe recipeInstructions must be a non-empty array.`);

  if (Array.isArray(steps)) {
    steps.forEach((step, index) => {
      const position = index + 1;
      assert(step["@type"] === "HowToStep", `${page.publicPath} Recipe step ${position} must be a HowToStep.`);
      assert(step.position === position, `${page.publicPath} Recipe step ${position} position must be ${position}.`);
      assert(typeof step.text === "string" && step.text.length > 0, `${page.publicPath} Recipe step ${position} text is required.`);
      assert(step.url === `${canonical}#recipe-step-${position}`, `${page.publicPath} Recipe step ${position} URL must point to #recipe-step-${position}.`);
    });
  }

  const breadcrumbs = items.filter((item) => hasJsonLdType(item, "BreadcrumbList"));
  assert(breadcrumbs.length === 1, `${page.publicPath} must include BreadcrumbList JSON-LD.`);
  if (breadcrumbs.length === 1) {
    const list = breadcrumbs[0].itemListElement;
    assert(Array.isArray(list) && list.length === 4, `${page.publicPath} BreadcrumbList must have 4 items.`);
    if (Array.isArray(list) && list.length === 4) {
      assert(list[0].position === 1, `${page.publicPath} Breadcrumb step 1 position must be 1.`);
      assert(
        list[0].item === urlForLocalePath(page.locale, "/"),
        `${page.publicPath} Breadcrumb step 1 item must point to home, got ${list[0].item}.`,
      );
      assert(list[1].position === 2, `${page.publicPath} Breadcrumb step 2 position must be 2.`);
      assert(
        list[1].item === urlForLocalePath(page.locale, "/cocktails"),
        `${page.publicPath} Breadcrumb step 2 item must point to /cocktails, got ${list[1].item}.`,
      );
      assert(list[2].position === 3, `${page.publicPath} Breadcrumb step 3 position must be 3.`);
      assert(
        typeof list[2].item === "string" && list[2].item.includes("/cocktails/spirit/"),
        `${page.publicPath} Breadcrumb step 3 item must point to spirit hub, got ${list[2].item}.`,
      );
      assert(list[3].position === 4, `${page.publicPath} Breadcrumb step 4 position must be 4.`);
      assert(
        list[3].item === canonical,
        `${page.publicPath} Breadcrumb step 4 item must point to ${canonical}, got ${list[3].item}.`,
      );
    }
  }

  const faqPages = items.filter((item) => hasJsonLdType(item, "FAQPage"));
  assert(faqPages.length === 1, `${page.publicPath} must include FAQPage JSON-LD.`);
  if (faqPages.length === 1) {
    assert(Array.isArray(faqPages[0].mainEntity) && faqPages[0].mainEntity.length >= 2, `${page.publicPath} FAQPage mainEntity must have at least 2 questions.`);
    summary.faqPages = (summary.faqPages || 0) + 1;
  }

  summary.recipes += 1;
}

function verifySharePayload(html, page, canonical) {
  const payload = parseSharePayload(html, page.publicPath);
  if (!payload) return;

  assert(payload.shareUrl === canonical, `${page.publicPath} shareUrl must be ${canonical}, got ${payload.shareUrl || "none"}.`);

  if (page.kind === "detail") {
    assert(payload.filenameBase === page.slug, `${page.publicPath} filenameBase must be ${page.slug}, got ${payload.filenameBase || "none"}.`);
  }

  summary.sharePayloads += 1;
}

function verifyCollectionPages(slugs) {
  for (const locale of locales) {
    const publicPath = routeForLocalePath(locale.locale, "/cocktails");
    const html = readRequired(filePathForPublicPath(publicPath), publicPath);
    if (!html) continue;

    for (const slug of slugs) {
      const cardHrefPattern = new RegExp(`href=["'][^"']*/cocktails/${escapeRegExp(slug)}/?["']`);
      assert(cardHrefPattern.test(html), `${publicPath} static markup must link to cocktail slug ${slug}.`);

      const cardIdPattern = new RegExp(`data-cocktail-id=["']${escapeRegExp(slug)}["']`);
      assert(cardIdPattern.test(html), `${publicPath} static markup must include card for cocktail id ${slug}.`);
    }

    assert(html.includes('archive-card-featured-visual'), `${publicPath} must include featured responsive visual.`);
    assert(html.includes('archive-card-standard-visual'), `${publicPath} must include standard visual.`);
    assert(html.includes('data-archive-featured="true"'), `${publicPath} must include featured card presentation.`);
    assert(html.includes('data-spirit-filter="all"'), `${publicPath} must include spirit filter chips.`);

    summary.collectionsVerified += 1;
  }
}

function verifySpiritTaxonomyPages(slugs) {
  for (const locale of locales) {
    for (const spirit of spiritSlugs) {
      const publicPath = routeForLocalePath(locale.locale, `/cocktails/spirit/${spirit}`);
      const html = readRequired(filePathForPublicPath(publicPath), publicPath);
      if (!html) continue;

      assert(html.includes('class="archive-grid"'), `${publicPath} must include archive-grid.`);
      assert(html.includes('class="filter-chips"'), `${publicPath} must include filter chips.`);
      summary.spiritTaxonomiesVerified += 1;
    }
  }
}

function verifyLegacyArchiveRedirects() {
  for (const locale of locales) {
    const archiveFile = path.join(distDir, locale.path, "archive", "index.html");
    if (fileExists(archiveFile)) {
      const html = readRequired(archiveFile, `${locale.path}/archive`);
      const targetPath = `/${locale.path}/cocktails/`;
      assert(
        html.includes(targetPath),
        `${locale.path}/archive redirect must point to ${targetPath}`,
      );
    }
  }
}

function verifyCssTokens() {
  const astroDir = path.join(distDir, "_astro");
  if (!fileExists(astroDir)) return;
  const files = fs.readdirSync(astroDir).filter((f) => f.endsWith(".css"));
  for (const file of files) {
    const css = fs.readFileSync(path.join(astroDir, file), "utf8");
    assert(!css.includes("--color-ink"), `Bundled CSS ${file} must not reference undefined token --color-ink`);
    assert(!css.includes("--font-serif"), `Bundled CSS ${file} must not reference undefined token --font-serif`);
  }
}

function verifyDefaultSocialImages() {
  const enCard = path.join(distDir, "images", "og-default-en.jpg");
  const zhCard = path.join(distDir, "images", "og-default-zh.jpg");
  const v2Card = path.join(distDir, "images", "og-default-v2.jpg");

  assert(fileExists(enCard), "Missing dist/images/og-default-en.jpg.");
  assert(fileExists(zhCard), "Missing dist/images/og-default-zh.jpg.");
  assert(fileExists(v2Card), "Missing dist/images/og-default-v2.jpg.");

  if (fileExists(enCard)) {
    const enSize = fs.statSync(enCard).size;
    assert(enSize < 150000, `og-default-en.jpg must be under 150KB, got ${enSize} bytes.`);
  }

  if (fileExists(zhCard)) {
    const zhSize = fs.statSync(zhCard).size;
    assert(zhSize < 150000, `og-default-zh.jpg must be under 150KB, got ${zhSize} bytes.`);
  }

  if (fileExists(enCard) && fileExists(v2Card)) {
    const enBuf = fs.readFileSync(enCard);
    const v2Buf = fs.readFileSync(v2Card);
    assert(enBuf.equals(v2Buf), "og-default-v2.jpg must be an exact copy of og-default-en.jpg for backwards compatibility.");
  }
}

function verifyAlternates(alternates, contentPath, context) {
  const expected = expectedAlternates(contentPath);
  const seen = new Map();

  for (const alternate of alternates) {
    if (alternate.hreflang) {
      seen.set(alternate.hreflang, alternate.href);
    }
  }

  assert(alternates.length === expected.length, `${context} must include exactly ${expected.length} hreflang alternates.`);
  assert(seen.size === expected.length, `${context} must include ${expected.length} unique hreflang alternates.`);

  for (const item of expected) {
    assert(seen.has(item.hreflang), `${context} is missing hreflang=${item.hreflang}.`);
    assert(seen.get(item.hreflang) === item.href, `${context} hreflang=${item.hreflang} must be ${item.href}, got ${seen.get(item.hreflang) || "none"}.`);
  }

  for (const hreflang of seen.keys()) {
    assert(expected.some((item) => item.hreflang === hreflang), `${context} includes unexpected hreflang=${hreflang}.`);
  }
}

function expectedSitemapUrls(slugs) {
  const urls = [];

  for (const locale of locales) {
    for (const contentPath of staticContentPaths) {
      urls.push(urlForLocalePath(locale.locale, contentPath));
    }
  }

  for (const locale of locales) {
    for (const spirit of spiritSlugs) {
      urls.push(urlForLocalePath(locale.locale, `/cocktails/spirit/${spirit}`));
    }
  }

  for (const locale of locales) {
    for (const slug of slugs) {
      urls.push(urlForLocalePath(locale.locale, `/cocktails/${slug}`));
    }
  }

  return urls;
}

function expectedAlternates(contentPath) {
  return [
    ...locales.map((locale) => ({
      hreflang: locale.locale,
      href: urlForLocalePath(locale.locale, contentPath),
    })),
    {
      hreflang: "x-default",
      href: urlForLocalePath(defaultLocale, contentPath),
    },
  ];
}

function readCocktailSlugs() {
  const source = readRequired(cocktailDataPath, "src/data/cocktails.ts");
  if (!source) return [];

  const stableMatch = source.match(/const stableCocktails:[\s\S]*?=\s*\[([\s\S]*?)\];/);
  assert(Boolean(stableMatch), "Could not find stableCocktails in src/data/cocktails.ts.");

  const body = stableMatch ? stableMatch[1] : "";
  const slugs = [];
  const seen = new Set();
  const pattern = /slug:\s*"([^"]+)"|createSceneOnlyCocktail\(\s*\{\s*id:\s*"([^"]+)"/g;
  let match;

  while ((match = pattern.exec(body)) !== null) {
    const slug = match[1] || match[2];
    if (!seen.has(slug)) {
      seen.add(slug);
      slugs.push(slug);
    }
  }

  assert(slugs.length > 0, "Could not extract cocktail slugs from src/data/cocktails.ts.");
  return slugs;
}

function parseSitemap(sitemapXml) {
  return Array.from(sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)).map((match) => {
    const block = match[1];
    const loc = decodeXml(textBetween(block, "loc") || "");
    const lastmod = decodeXml(textBetween(block, "lastmod") || "");
    const alternates = Array.from(block.matchAll(/<xhtml:link\b[^>]*>/g)).map((linkMatch) => {
      const attrs = parseAttrs(linkMatch[0]);
      return {
        hreflang: attrs.hreflang,
        href: attrs.href,
      };
    });

    return { loc, lastmod, alternates };
  });
}

function parseJsonLd(html, pageId) {
  const items = [];

  for (const match of html.matchAll(/<script\b(?=[^>]*\btype="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      items.push(JSON.parse(match[1]));
    } catch (error) {
      assert(false, `${pageId} contains invalid JSON-LD: ${error.message}`);
    }
  }

  return items;
}

function parseSharePayload(html, pageId) {
  const match = html.match(/<script\b(?=[^>]*\bdata-share-payload\b)[^>]*>([\s\S]*?)<\/script>/);
  assert(Boolean(match), `${pageId} must include data-share-payload JSON.`);

  if (!match) return undefined;

  try {
    return JSON.parse(match[1]);
  } catch (error) {
    assert(false, `${pageId} contains invalid data-share-payload JSON: ${error.message}`);
    return undefined;
  }
}

function getTags(html, tagName) {
  return Array.from(html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))).map((match) => match[0]);
}

function parseAttrs(tag) {
  const attrs = {};
  const body = tag.replace(/^<[^/\s>]+\s*/i, "").replace(/\/?>$/i, "");
  const pattern = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let match;

  while ((match = pattern.exec(body)) !== null) {
    const [, name, doubleQuoted, singleQuoted, unquoted] = match;
    attrs[name] = decodeHtml(doubleQuoted ?? singleQuoted ?? unquoted ?? "");
  }

  return attrs;
}

function getMetaContent(html, attrName, attrValue, pageId) {
  const values = getTags(html, "meta")
    .map((tag) => parseAttrs(tag))
    .filter((attrs) => attrs[attrName] === attrValue)
    .map((attrs) => attrs.content);

  assert(values.length <= 1, `${pageId} must not include multiple meta ${attrName}=${attrValue} tags.`);
  return values[0];
}

function hasJsonLdType(item, type) {
  const value = item?.["@type"];
  return value === type || (Array.isArray(value) && value.includes(type));
}

function parseLocalePath(pathname) {
  for (const locale of locales) {
    const prefix = `/${locale.path}`;
    if (pathname === `${prefix}/`) {
      return { locale: locale.locale, contentPath: "/" };
    }

    if (pathname.startsWith(`${prefix}/`)) {
      const withoutLocale = pathname.slice(prefix.length).replace(/\/$/, "");
      return { locale: locale.locale, contentPath: withoutLocale || "/" };
    }
  }

  return undefined;
}

function routeForLocalePath(localeValue, contentPath) {
  const locale = locales.find((item) => item.locale === localeValue);
  assert(Boolean(locale), `Unsupported locale: ${localeValue}`);

  const cleanPath = contentPath.startsWith("/") ? contentPath : `/${contentPath}`;
  return `/${locale.path}${cleanPath === "/" ? "/" : `${cleanPath}/`}`;
}

function urlForLocalePath(localeValue, contentPath) {
  return `${site}${routeForLocalePath(localeValue, contentPath)}`;
}

function filePathForPublicUrl(url) {
  return filePathForPublicPath(new URL(url).pathname);
}

function filePathForPublicPath(publicPath) {
  if (publicPath === "/") {
    return path.join(distDir, "index.html");
  }

  if (
    publicPath.endsWith(".html") ||
    publicPath.endsWith(".xml") ||
    publicPath.endsWith(".txt") ||
    publicPath.endsWith(".jpg") ||
    publicPath.endsWith(".jpeg") ||
    publicPath.endsWith(".png") ||
    publicPath.endsWith(".webp") ||
    publicPath.endsWith(".svg") ||
    publicPath.endsWith(".ico")
  ) {
    return path.join(distDir, publicPath.replace(/^\//, ""));
  }

  const normalized = publicPath.replace(/^\//, "").replace(/\/$/, "");
  return path.join(distDir, normalized, "index.html");
}

function isExpectedCocktailDetailUrl(href, slug) {
  try {
    const pathname = new URL(href).pathname;
    return locales.some((locale) => pathname === `/${locale.path}/cocktails/${slug}/`);
  } catch {
    return false;
  }
}

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeRobots(value) {
  return (value || "").toLowerCase().replace(/\s+/g, "");
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, "");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function textBetween(value, tagName) {
  const match = value.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`));
  return match ? match[1].trim() : undefined;
}

function decodeXml(value) {
  return value
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function decodeHtml(value) {
  return decodeXml(value);
}

function readRequired(filePath, label) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    assert(false, `Missing required file: ${label}`);
    return "";
  }
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}
