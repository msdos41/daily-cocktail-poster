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
const requiredPublicPaths = ["/", "/404.html", "/sitemap.xml"];
const errors = [];
const summary = {
  pages: 0,
  sitemapUrls: 0,
  recipes: 0,
  itemLists: 0,
  sharePayloads: 0,
  collectionsVerified: 0,
};

main();

function main() {
  assert(fileExists(distDir), "dist/ does not exist. Run npm run build before npm run verify.");

  const slugs = readCocktailSlugs();
  const sitemapXml = readRequired(path.join(distDir, "sitemap.xml"), "sitemap.xml");
  const sitemapEntries = sitemapXml ? verifySitemap(sitemapXml, slugs) : [];

  verifyRequiredPages(slugs);
  verify404(sitemapXml);
  verifyContentPages(slugs);
  verifyCollectionPages(slugs);
  verifyLegacyArchiveRedirects();

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
  console.log(`- Checked ${summary.itemLists} ItemList JSON-LD blocks.`);
  console.log(`- Checked ${summary.sharePayloads} share payloads.`);
  console.log(`- Verified The Collection catalog pre-renders all ${slugs.length} cocktails.`);
}

function verifyRequiredPages(slugs) {
  for (const publicPath of requiredPublicPaths) {
    assert(fileExists(filePathForPublicPath(publicPath)), `Missing required generated page: ${publicPath}`);
  }

  for (const locale of locales) {
    for (const contentPath of staticContentPaths) {
      const publicPath = routeForLocalePath(locale.locale, contentPath);
      assert(fileExists(filePathForPublicPath(publicPath)), `Missing required generated page: ${publicPath}`);
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

    assert(html.includes('data-archive-featured="true"'), `${publicPath} must include featured card presentation.`);
    assert(html.includes('data-spirit-filter="all"'), `${publicPath} must include spirit filter chips.`);

    summary.collectionsVerified += 1;
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
    const alternates = Array.from(block.matchAll(/<xhtml:link\b[^>]*>/g)).map((linkMatch) => {
      const attrs = parseAttrs(linkMatch[0]);
      return {
        hreflang: attrs.hreflang,
        href: attrs.href,
      };
    });

    return { loc, alternates };
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

  if (publicPath.endsWith(".html") || publicPath.endsWith(".xml")) {
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
