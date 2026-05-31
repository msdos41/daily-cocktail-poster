import { defaultLocale, localeToPath, supportedLocales, type Locale } from "@/i18n/config";

const site = "https://justonesip.today";

export function absoluteUrl(path: string) {
  return new URL(path, site).toString();
}

export function routeForLocale(locale: Locale, path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${localeToPath(locale)}${cleanPath === "/" ? "/" : cleanPath}`;
}

export function alternateLinks(path: string) {
  const links = supportedLocales.map((locale) => ({
    locale,
    href: absoluteUrl(routeForLocale(locale, path)),
  }));

  return [
    ...links,
    {
      locale: "x-default",
      href: absoluteUrl(routeForLocale(defaultLocale, path)),
    },
  ];
}
