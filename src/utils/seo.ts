import { defaultLocale, localeToPath, supportedLocales, type Locale } from "@/i18n/config";

export const site = "https://justonesip.today";
const defaultSocialImage = "/images/og-default.jpg";
const defaultSocialImageWidth = 1200;
const defaultSocialImageHeight = 630;

export type SocialImageMetadata = {
  url: string;
  type: string;
  width?: number;
  height?: number;
};

export function absoluteUrl(path: string) {
  return new URL(path, site).toString();
}

export function publicHomeUrl() {
  return site;
}

export function shareUrlForLocalePath(locale: Locale, path: string) {
  if (path === "/") return publicHomeUrl();
  return absoluteUrl(routeForLocale(locale, path));
}

export function socialImageUrl(image = defaultSocialImage) {
  return socialImageMetadata(image).url;
}

export function socialImageMetadata(image = defaultSocialImage): SocialImageMetadata {
  const url = new URL(image || defaultSocialImage, site);
  const pathname = url.pathname.toLowerCase();

  if (pathname.endsWith(".svg")) {
    return defaultSocialImageMetadata();
  }

  return {
    url: url.toString(),
    type: socialImageType(pathname),
    ...(pathname === defaultSocialImage && {
      width: defaultSocialImageWidth,
      height: defaultSocialImageHeight,
    }),
  };
}

function defaultSocialImageMetadata(): SocialImageMetadata {
  return {
    url: absoluteUrl(defaultSocialImage),
    type: "image/jpeg",
    width: defaultSocialImageWidth,
    height: defaultSocialImageHeight,
  };
}

function socialImageType(pathname: string) {
  if (pathname.endsWith(".webp")) return "image/webp";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
  return "image/jpeg";
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

export function openGraphLocale(locale: Locale) {
  if (locale === "zh-CN") return "zh_CN";
  return "en_US";
}

export function alternateOpenGraphLocales(locale: Locale) {
  return supportedLocales.filter((item) => item !== locale).map(openGraphLocale);
}
