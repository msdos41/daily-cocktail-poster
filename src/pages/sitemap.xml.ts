import { getCocktailSlugs } from "@/data/cocktails";
import { supportedLocales } from "@/i18n/config";
import { absoluteUrl, routeForLocale } from "@/utils/seo";

const staticPaths = ["/", "/archive"];

export function GET() {
  const urls = [
    ...supportedLocales.flatMap((locale) =>
      staticPaths.map((path) => absoluteUrl(routeForLocale(locale, path))),
    ),
    ...supportedLocales.flatMap((locale) =>
      getCocktailSlugs().map((slug) => absoluteUrl(routeForLocale(locale, `/cocktails/${slug}`))),
    ),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
