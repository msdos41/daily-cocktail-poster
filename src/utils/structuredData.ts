import type { Cocktail } from "@/data/cocktails";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { publicHomeUrl, site, socialImageMetadata } from "@/utils/seo";

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
};

const websiteReference = {
  "@id": `${site}/#website`,
};

export function homeStructuredData({ locale, description }: PageStructuredDataConfig): JsonLd[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteReference["@id"],
      name: "Just One Sip",
      url: publicHomeUrl(),
      description,
      inLanguage: locale,
      publisher: organization,
    },
  ];
}

export function archiveStructuredData(config: PageStructuredDataConfig): JsonLd[] {
  const { locale, url, title, description } = config;

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
      { name: t(locale, "home"), url: publicHomeUrl() },
      { name: t(locale, "pastPicks"), url },
    ]),
  ];
}

export function cocktailStructuredData({ locale, cocktail, url }: CocktailStructuredDataConfig): JsonLd[] {
  const image = socialImageMetadata(cocktail.posterImage).url;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Recipe",
      "@id": `${url}#recipe`,
      name: cocktail.name,
      description: cocktail.description,
      image: [image],
      url,
      inLanguage: locale,
      recipeCategory: "Cocktail",
      prepTime: "PT2M",
      cookTime: "PT3M",
      totalTime: "PT5M",
      recipeYield: "1",
      recipeIngredient: cocktail.ingredients,
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
      { name: t(locale, "home"), url: publicHomeUrl() },
      { name: cocktail.name, url },
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
