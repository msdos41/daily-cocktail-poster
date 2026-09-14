import { defaultLocale, localeToPath, supportedLocales, type Locale } from "../i18n/config.ts";

export const site = "https://justonesip.today";
export const defaultSocialImage = "/images/og-default-en.jpg";
const defaultSocialImageWidth = 1200;
const defaultSocialImageHeight = 630;

export function defaultSocialImageForLocale(locale: Locale): string {
  if (locale === "zh-CN") {
    return "/images/og-default-zh.jpg";
  }
  return "/images/og-default-en.jpg";
}

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
  return pageUrlForLocalePath(defaultLocale, "/");
}

export function shareUrlForLocalePath(locale: Locale, path: string) {
  return pageUrlForLocalePath(locale, path);
}

export function socialImageUrl(image?: string, locale?: Locale) {
  return socialImageMetadata(image, locale).url;
}

export function socialImageMetadata(image?: string, locale?: Locale): SocialImageMetadata {
  const fallbackImage = locale ? defaultSocialImageForLocale(locale) : defaultSocialImage;
  const resolvedImage = image || fallbackImage;
  const url = new URL(resolvedImage, site);
  const pathname = url.pathname.toLowerCase();

  if (pathname.endsWith(".svg")) {
    return defaultSocialImageMetadata(locale);
  }

  const isKnown1200x630 =
    pathname === "/images/og-default-en.jpg" ||
    pathname === "/images/og-default-zh.jpg" ||
    pathname === "/images/og-default-v2.jpg" ||
    pathname === defaultSocialImage ||
    pathname.includes("-og.");

  return {
    url: url.toString(),
    type: socialImageType(pathname),
    ...(isKnown1200x630 && {
      width: defaultSocialImageWidth,
      height: defaultSocialImageHeight,
    }),
  };
}

function defaultSocialImageMetadata(locale?: Locale): SocialImageMetadata {
  const imagePath = locale ? defaultSocialImageForLocale(locale) : defaultSocialImage;
  return {
    url: absoluteUrl(imagePath),
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
  return withTrailingSlash(`/${localeToPath(locale)}${cleanPath === "/" ? "/" : cleanPath}`);
}

export function pageUrlForLocalePath(locale: Locale, path: string) {
  return absoluteUrl(routeForLocale(locale, path));
}

function withTrailingSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

export function alternateLinks(path: string) {
  const links = supportedLocales.map((locale) => ({
    locale,
    href: pageUrlForLocalePath(locale, path),
  }));

  return [
    ...links,
    {
      locale: "x-default",
      href: pageUrlForLocalePath(defaultLocale, path),
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
