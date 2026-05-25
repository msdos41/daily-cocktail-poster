export const defaultLocale = "en" as const;

export const supportedLocales = ["en", "zh-CN"] as const;

export const plannedLocales = [
  "es",
  "fr",
  "de",
  "pt-BR",
  "it",
  "ja",
  "ko",
  "zh-Hant",
] as const;

export type Locale = (typeof supportedLocales)[number];

export const localePath: Record<Locale, string> = {
  en: "en",
  "zh-CN": "zh-cn",
};

export const localeLabel: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
};

export function localeToPath(locale: Locale) {
  return localePath[locale];
}

export function pathToLocale(pathLocale: string): Locale | undefined {
  return supportedLocales.find((locale) => localePath[locale] === pathLocale);
}

export function localizedPath(locale: Locale, path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${localeToPath(locale)}${cleanPath === "/" ? "/" : cleanPath}`;
}
