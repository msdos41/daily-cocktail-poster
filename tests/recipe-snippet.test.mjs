import test from "node:test";
import assert from "node:assert/strict";
import { getAllCocktails, getCocktail } from "../src/data/cocktails.ts";
import { cocktailStructuredData } from "../src/utils/structuredData.ts";
import {
  CHINESE_RECIPE_SNIPPET_MAX_LENGTH,
  chineseRecipeSnippet,
  recipeMetaDescription,
} from "../src/utils/recipeSnippet.ts";

test("Chinese Aperol Spritz search snippet lists measures and omits pour copy", () => {
  const cocktail = getCocktail("zh-CN", "aperol-spritz");
  assert.ok(cocktail);

  const snippet = recipeMetaDescription("zh-CN", cocktail);

  assert.equal(
    snippet,
    "阿佩罗橙光鸡尾酒配方：90 ml 普罗塞克、60 ml 阿佩罗、30 ml 苏打水、橙片。",
  );
  assert.equal(snippet.includes(cocktail.description), false);
});

test("Chinese search snippets keep a leading run of ingredients inside the length cap", () => {
  const cocktails = getAllCocktails("zh-CN");
  assert.equal(cocktails.length, 33);

  for (const cocktail of cocktails) {
    const snippet = recipeMetaDescription("zh-CN", cocktail);
    const prefix = `${cocktail.name}鸡尾酒配方：`;

    assert.equal(snippet.startsWith(prefix), true, cocktail.slug);
    assert.equal(snippet.endsWith("。"), true, cocktail.slug);
    assert.equal(snippet.includes(cocktail.description), false, cocktail.slug);
    assert.ok(snippet.length <= CHINESE_RECIPE_SNIPPET_MAX_LENGTH, `${cocktail.slug} snippet is ${snippet.length} characters`);

    let rest = snippet.slice(prefix.length, -1);
    const used = [];
    for (const ingredient of cocktail.ingredients) {
      if (rest === ingredient) {
        used.push(ingredient);
        rest = "";
        break;
      }
      const step = `${ingredient}、`;
      if (!rest.startsWith(step)) break;
      used.push(ingredient);
      rest = rest.slice(step.length);
    }

    assert.equal(rest, "", `${cocktail.slug} has trailing snippet text: ${rest}`);
    assert.ok(used.length > 0, cocktail.slug);
    assert.deepEqual(used, cocktail.ingredients.slice(0, used.length));

    if (used.length < cocktail.ingredients.length) {
      const overflow = chineseRecipeSnippet(cocktail.name, cocktail.ingredients.slice(0, used.length + 1));
      assert.ok(
        overflow.length > CHINESE_RECIPE_SNIPPET_MAX_LENGTH,
        `${cocktail.slug} dropped an ingredient that still fit`,
      );
    }
  }
});

test("an over-long ingredient list drops only trailing items", () => {
  const first = "量".repeat(34);
  const second = "料".repeat(34);
  const third = "尾".repeat(10);
  const snippet = chineseRecipeSnippet("测试", [first, second, third]);

  assert.equal(snippet, `测试鸡尾酒配方：${first}、${second}。`);
  assert.equal(snippet.includes(third), false);
});

test("English search snippets keep pour copy", () => {
  const cocktails = getAllCocktails("en");

  for (const cocktail of cocktails) {
    const snippet = recipeMetaDescription("en", cocktail);
    assert.equal(
      snippet,
      `${cocktail.description} Includes ingredients, glass, garnish, and mixing steps.`,
      cocktail.slug,
    );
  }
});

test("Recipe structured data keeps pour copy as its description", () => {
  for (const locale of ["en", "zh-CN"]) {
    for (const cocktail of getAllCocktails(locale)) {
      const data = cocktailStructuredData({
        locale,
        cocktail,
        url: `https://justonesip.today/en/cocktails/${cocktail.slug}/`,
      });
      const recipe = data.find((item) => item["@type"] === "Recipe");
      assert.equal(recipe.description, cocktail.description, `${locale} ${cocktail.slug}`);
    }
  }
});
