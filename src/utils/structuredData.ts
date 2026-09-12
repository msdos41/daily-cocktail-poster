import type { Cocktail } from "../data/cocktails.ts";
import type { Locale } from "../i18n/config.ts";
import { t } from "../i18n/ui.ts";
import { pageUrlForLocalePath, publicHomeUrl, site, socialImageMetadata } from "./seo.ts";

export type JsonLd = {
  [key: string]: JsonLdValue;
};

type JsonLdValue = string | number | boolean | null | JsonLd | JsonLdValue[];

type PageStructuredDataConfig = {
  locale: Locale;
  url: string;
  title: string;
  description: string;
};

type CocktailStructuredDataConfig = {
  locale: Locale;
  cocktail: Cocktail;
  url: string;
};

const organization = {
  "@type": "Organization",
  "@id": `${site}/#organization`,
  name: "Just One Sip",
  url: publicHomeUrl(),
  sameAs: ["https://x.com/justonesip_app"],
};

const websiteReference = {
  "@id": `${site}/#website`,
};

export function homeStructuredData({ locale, url, description }: PageStructuredDataConfig): JsonLd[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteReference["@id"],
      name: "Just One Sip",
      url,
      description,
      inLanguage: locale,
      publisher: organization,
    },
  ];
}

type CollectionStructuredDataConfig = PageStructuredDataConfig & {
  cocktails: Cocktail[];
};

export function collectionStructuredData(config: CollectionStructuredDataConfig): JsonLd[] {
  const { locale, url, title, description, cocktails } = config;
  const homeUrl = pageUrlForLocalePath(locale, "/");

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#collection`,
      url,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: websiteReference,
      publisher: organization,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#itemlist`,
      name: title,
      numberOfItems: cocktails.length,
      itemListElement: cocktails.map((cocktail, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: cocktail.name,
        url: pageUrlForLocalePath(locale, `/cocktails/${cocktail.slug}`),
      })),
    },
    breadcrumbStructuredData([
      { name: t(locale, "home"), url: homeUrl },
      { name: t(locale, "theCollection"), url },
    ]),
  ];
}

export function archiveStructuredData(config: PageStructuredDataConfig): JsonLd[] {
  const { locale, url, title, description } = config;
  const homeUrl = pageUrlForLocalePath(locale, "/");

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#collection`,
      url,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: websiteReference,
      publisher: organization,
    },
    breadcrumbStructuredData([
      { name: t(locale, "home"), url: homeUrl },
      { name: t(locale, "pastPicks"), url },
    ]),
  ];
}

export function cocktailStructuredData({ locale, cocktail, url }: CocktailStructuredDataConfig): JsonLd[] {
  const image = socialImageMetadata(cocktail.ogImage || cocktail.posterImage).url;
  const homeUrl = pageUrlForLocalePath(locale, "/");

  const items: JsonLd[] = [
    {
      "@context": "https://schema.org",
      "@type": "Recipe",
      "@id": `${url}#recipe`,
      name: cocktail.name,
      description: cocktail.description,
      image: [image],
      url,
      inLanguage: locale,
      datePublished: cocktail.date,
      recipeCategory: "Cocktail",
      recipeCuisine: cocktail.recipeCuisine,
      prepTime: "PT3M",
      totalTime: "PT3M",
      recipeYield: "1 serving",
      recipeIngredient: cocktail.ingredients,
      tool: cocktail.tools,
      ...(cocktail.wikidataId && {
        sameAs: `https://www.wikidata.org/wiki/${cocktail.wikidataId}`,
      }),
      ...(cocktail.ibaCategory && {
        isBasedOn: "https://iba-world.com/iba-official-cocktails/",
      }),
      ...(cocktail.suitableForDiet && { suitableForDiet: cocktail.suitableForDiet }),
      recipeInstructions: cocktail.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text: step,
        url: `${url}#recipe-step-${index + 1}`,
      })),
      nutrition: {
        "@type": "NutritionInformation",
        calories: `${cocktail.estimatedCalories} calories`,
      },
      keywords: cocktail.tags.join(", "),
      author: organization,
      publisher: organization,
      mainEntityOfPage: url,
    },
    breadcrumbStructuredData([
      { name: t(locale, "home"), url: homeUrl },
      { name: t(locale, "theCollection"), url: pageUrlForLocalePath(locale, "/cocktails") },
      { name: cocktail.name, url },
    ]),
  ];

  if (cocktail.faqs && cocktail.faqs.length > 0) {
    items.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: cocktail.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return items;
}

type SpiritTaxonomyStructuredDataConfig = PageStructuredDataConfig & {
  cocktails: Cocktail[];
  spiritName: string;
};

export function spiritTaxonomyStructuredData(config: SpiritTaxonomyStructuredDataConfig): JsonLd[] {
  const { locale, url, title, description, cocktails, spiritName } = config;
  const homeUrl = pageUrlForLocalePath(locale, "/");
  const collectionUrl = pageUrlForLocalePath(locale, "/cocktails");

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#collection`,
      url,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: websiteReference,
      publisher: organization,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#itemlist`,
      name: title,
      numberOfItems: cocktails.length,
      itemListElement: cocktails.map((cocktail, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: cocktail.name,
        url: pageUrlForLocalePath(locale, `/cocktails/${cocktail.slug}`),
      })),
    },
    breadcrumbStructuredData([
      { name: t(locale, "home"), url: homeUrl },
      { name: t(locale, "theCollection"), url: collectionUrl },
      { name: spiritName, url },
    ]),
  ];
}

export function infoPageStructuredData(config: PageStructuredDataConfig): JsonLd[] {
  const { locale, url, title, description } = config;
  const homeUrl = pageUrlForLocalePath(locale, "/");

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: websiteReference,
      publisher: organization,
    },
    breadcrumbStructuredData([
      { name: t(locale, "home"), url: homeUrl },
      { name: title, url },
    ]),
  ];
}

function breadcrumbStructuredData(items: Array<{ name: string; url: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
