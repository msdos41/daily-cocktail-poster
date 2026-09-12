import { getAllCocktails, getCocktailSlugs, SUPPORTED_SPIRITS } from "@/data/cocktails";
import { supportedLocales, type Locale } from "@/i18n/config";
import { alternateLinks, pageUrlForLocalePath } from "@/utils/seo";

const staticPaths = ["/", "/cocktails", "/about", "/privacy"];

type SitemapEntry = {
  path: string;
  url: string;
  lastmod: string;
};

export function GET() {
  const defaultDate = new Date().toISOString().slice(0, 10);
  const cocktails = getAllCocktails("en");
  const cocktailDateMap = new Map(cocktails.map((c) => [c.slug, c.date || defaultDate]));

  const entries: SitemapEntry[] = [
    ...supportedLocales.flatMap((locale) =>
      staticPaths.map((path) => sitemapEntry(locale, path, defaultDate)),
    ),
    ...supportedLocales.flatMap((locale) =>
      SUPPORTED_SPIRITS.map((spirit) =>
        sitemapEntry(locale, `/cocktails/spirit/${spirit}`, defaultDate),
      ),
    ),
    ...supportedLocales.flatMap((locale) =>
      getCocktailSlugs().map((slug) =>
        sitemapEntry(locale, `/cocktails/${slug}`, cocktailDateMap.get(slug) || defaultDate),
      ),
    ),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map((entry) => renderUrl(entry)).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function sitemapEntry(locale: Locale, path: string, lastmod: string): SitemapEntry {
  return {
    path,
    url: pageUrlForLocalePath(locale, path),
    lastmod,
  };
}

function renderUrl(entry: SitemapEntry) {
  const alternates = alternateLinks(entry.path)
    .map(
      (item) =>
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(item.locale)}" href="${escapeXml(item.href)}" />`,
    )
    .join("\n");

  return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
${alternates}
  </url>`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
