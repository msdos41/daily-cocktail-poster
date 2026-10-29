import { getAllCocktails, getCocktailsBySpirit, SUPPORTED_SPIRITS } from "@/data/cocktails";
import { supportedLocales, type Locale } from "@/i18n/config";
import { alternateLinks, pageUrlForLocalePath } from "@/utils/seo";

// Last commit (Asia/Shanghai) touching each page's source in src/pages/[locale]/.
// Update when the page content changes. Never use build time.
const STATIC_PAGE_LASTMOD: Record<string, string> = {
  "/": "2026-06-13",
  "/about": "2026-10-12",
  "/privacy": "2026-10-12",
};

const maxDate = (dates: string[]) => dates.reduce((a, b) => (b > a ? b : a), "");

type SitemapEntry = {
  path: string;
  url: string;
  lastmod: string;
};

export function GET() {
  const cocktails = getAllCocktails("en");
  const collectionLastmod = maxDate(cocktails.map((c) => c.updatedAt));

  const entries: SitemapEntry[] = supportedLocales.flatMap((locale) => [
    ...Object.entries(STATIC_PAGE_LASTMOD).map(([path, lastmod]) => sitemapEntry(locale, path, lastmod)),
    sitemapEntry(locale, "/cocktails", collectionLastmod),
    ...SUPPORTED_SPIRITS.map((spirit) =>
      sitemapEntry(
        locale,
        `/cocktails/spirit/${spirit}`,
        maxDate(getCocktailsBySpirit(locale, spirit).map((c) => c.updatedAt)) || collectionLastmod,
      ),
    ),
    ...cocktails.map((c) => sitemapEntry(locale, `/cocktails/${c.slug}`, c.updatedAt)),
  ]);

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
