import test from "node:test";
import assert from "node:assert/strict";
import { getAllCocktails } from "../src/data/cocktails.ts";
import { cocktailStructuredData, homeStructuredData } from "../src/utils/structuredData.ts";

test("Recipe structured data omits cookTime and includes prepTime", () => {
  const cocktails = getAllCocktails("en");
  for (const cocktail of cocktails) {
    const data = cocktailStructuredData({
      locale: "en",
      cocktail,
      url: `https://justonesip.today/en/cocktails/${cocktail.slug}/`,
    });
    const recipe = data.find((item) => item["@type"] === "Recipe");
    assert.ok(recipe, `Recipe schema missing for ${cocktail.slug}`);
    assert.equal(
      recipe.cookTime,
      undefined,
      `Recipe for ${cocktail.slug} must not define cookTime`,
    );
    assert.equal(
      recipe.prepTime,
      "PT3M",
      `Recipe for ${cocktail.slug} must define prepTime PT3M`,
    );
    assert.equal(
      recipe.totalTime,
      "PT3M",
      `Recipe for ${cocktail.slug} must define totalTime PT3M`,
    );
  }
});

test("Organization structured data includes official social profile sameAs", () => {
  const homeData = homeStructuredData({
    locale: "en",
    url: "https://justonesip.today/en/",
    description: "Daily cocktail guide",
  });
  const website = homeData.find((item) => item["@type"] === "WebSite");
  assert.ok(website, "WebSite schema missing");
  const publisher = website.publisher;
  assert.ok(publisher, "Publisher missing in WebSite schema");
  assert.ok(Array.isArray(publisher.sameAs), "Publisher sameAs must be an array");
  assert.ok(
    publisher.sameAs.includes("https://x.com/justonesip_app"),
    "Publisher sameAs must include https://x.com/justonesip_app",
  );
});

test("All 33 cocktails have canonical wikidataId and IBA categories mapped", () => {
  const enCocktails = getAllCocktails("en");
  const zhCocktails = getAllCocktails("zh-CN");
  assert.equal(enCocktails.length, 33);
  assert.equal(zhCocktails.length, 33);

  const validIbaCategories = new Set([
    "The Unforgettables",
    "Contemporary Classics",
    "New Era Drinks",
  ]);

  for (let i = 0; i < 33; i++) {
    const en = enCocktails[i];
    const zh = zhCocktails[i];

    assert.ok(
      typeof en.wikidataId === "string" && en.wikidataId.startsWith("Q"),
      `Cocktail ${en.slug} missing valid wikidataId (got ${en.wikidataId})`,
    );
    assert.equal(
      en.wikidataId,
      zh.wikidataId,
      `wikidataId mismatch between locales for ${en.slug}`,
    );

    if (en.ibaCategory) {
      assert.ok(
        validIbaCategories.has(en.ibaCategory),
        `Cocktail ${en.slug} has invalid IBA category: ${en.ibaCategory}`,
      );
      assert.equal(
        en.ibaCategory,
        zh.ibaCategory,
        `ibaCategory mismatch between locales for ${en.slug}`,
      );
    }
  }
});

test("Recipe schema links to Wikidata via sameAs and IBA via isBasedOn", () => {
  const cocktails = getAllCocktails("en");
  for (const cocktail of cocktails) {
    const data = cocktailStructuredData({
      locale: "en",
      cocktail,
      url: `https://justonesip.today/en/cocktails/${cocktail.slug}/`,
    });
    const recipe = data.find((item) => item["@type"] === "Recipe");
    assert.ok(recipe, `Recipe schema missing for ${cocktail.slug}`);

    if (cocktail.wikidataId) {
      assert.equal(
        recipe.sameAs,
        `https://www.wikidata.org/wiki/${cocktail.wikidataId}`,
        `Recipe sameAs mismatch for ${cocktail.slug}`,
      );
    }

    if (cocktail.ibaCategory) {
      assert.equal(
        recipe.isBasedOn,
        "https://iba-world.com/iba-official-cocktails/",
        `Recipe isBasedOn mismatch for ${cocktail.slug}`,
      );
    }
  }
});
