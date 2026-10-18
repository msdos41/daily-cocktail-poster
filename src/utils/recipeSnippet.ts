import type { Locale } from "../i18n/config.ts";
import { t } from "../i18n/ui.ts";

export const CHINESE_RECIPE_SNIPPET_MAX_LENGTH = 80;

type RecipeMetaSource = {
  name: string;
  description: string;
  ingredients: readonly string[];
};

export function chineseRecipeSnippet(
  name: string,
  ingredients: readonly string[],
  maxLength = CHINESE_RECIPE_SNIPPET_MAX_LENGTH,
): string {
  const prefix = `${name}鸡尾酒配方：`;
  const kept: string[] = [];

  for (const ingredient of ingredients) {
    const sentence = `${prefix}${[...kept, ingredient].join("、")}。`;
    if (sentence.length > maxLength && kept.length > 0) break;
    kept.push(ingredient);
  }

  return `${prefix}${kept.join("、")}。`;
}

export function recipeMetaDescription(locale: Locale, cocktail: RecipeMetaSource): string {
  if (locale === "zh-CN") {
    return chineseRecipeSnippet(cocktail.name, cocktail.ingredients);
  }

  return `${cocktail.description} ${t(locale, "cocktailRecipeDescriptionSuffix")}`;
}
