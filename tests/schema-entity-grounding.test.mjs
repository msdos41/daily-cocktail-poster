import test from "node:test";
import assert from "node:assert/strict";
import { getAllCocktails, getCocktail } from "../src/data/cocktails.ts";
import { cocktailStructuredData, homeStructuredData, howToStepName } from "../src/utils/structuredData.ts";

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
      `PT${cocktail.prepMinutes}M`,
      `Recipe for ${cocktail.slug} must define prepTime from prepMinutes`,
    );
    assert.equal(
      recipe.totalTime,
      `PT${cocktail.prepMinutes}M`,
      `Recipe for ${cocktail.slug} must define totalTime from prepMinutes`,
    );
    if (cocktail.slug === "mojito") {
      assert.equal(recipe.prepTime, "PT5M", "Mojito prepTime must be PT5M");
    }
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
  assert.deepEqual(
    publisher.sameAs,
    ["https://x.com/msdos41_"],
    "Publisher sameAs must only include https://x.com/msdos41_",
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
        ibaClassificationUrls[cocktail.ibaCategory],
        `Recipe isBasedOn mismatch for ${cocktail.slug}`,
      );
    } else {
      assert.equal(
        recipe.isBasedOn,
        undefined,
        `Recipe for ${cocktail.slug} must not cite an IBA source`,
      );
    }
  }
});

const ibaClassificationUrls = {
  "The Unforgettables": "https://iba-world.com/cocktails/the-unforgettables/",
  "Contemporary Classics": "https://iba-world.com/cocktails/the-contemporary/",
  "New Era Drinks": "https://iba-world.com/cocktails/the-new-era/",
};

test("IBA categories match the live IBA taxonomy", () => {
  const bySlug = Object.fromEntries(getAllCocktails("en").map((cocktail) => [cocktail.slug, cocktail.ibaCategory]));

  assert.equal(bySlug.paloma, "New Era Drinks");
  assert.equal(bySlug["corpse-reviver-2"], "Contemporary Classics");
  assert.equal(bySlug["aperol-spritz"], "New Era Drinks");
  assert.equal(bySlug.gimlet, undefined);
  assert.equal(bySlug.painkiller, undefined);
  assert.equal(bySlug.negroni, "The Unforgettables");
  assert.equal(bySlug.mojito, "Contemporary Classics");
  assert.equal(bySlug["espresso-martini"], "New Era Drinks");
});

test("HowToStep names are derived from existing step text", () => {
  for (const locale of ["en", "zh-CN"]) {
    for (const cocktail of getAllCocktails(locale)) {
      const data = cocktailStructuredData({
        locale,
        cocktail,
        url: `https://justonesip.today/${locale === "zh-CN" ? "zh-cn" : "en"}/cocktails/${cocktail.slug}/`,
      });
      const recipe = data.find((item) => item["@type"] === "Recipe");
      assert.ok(recipe, `${locale} ${cocktail.slug}`);
      assert.equal(recipe.recipeInstructions.length, cocktail.steps.length, cocktail.slug);

      recipe.recipeInstructions.forEach((step, index) => {
        const source = cocktail.steps[index];
        assert.equal(step.name, howToStepName(source), `${locale} ${cocktail.slug} step ${index + 1}`);
        assert.equal(source.startsWith(step.name), true, `${locale} ${cocktail.slug} step ${index + 1} name must come from the step text`);
        assert.ok(step.name.length > 0, `${locale} ${cocktail.slug} step ${index + 1}`);
      });
    }
  }

  assert.equal(howToStepName("Dry shake bourbon, lemon, syrup, and egg white without ice."), "Dry shake bourbon, lemon, syrup, and egg white without ice");
  assert.equal(howToStepName("先将波本、柠檬汁、糖浆和蛋清不加冰干摇。"), "先将波本、柠檬汁、糖浆和蛋清不加冰干摇");
});

const FEATURED_RECIPE_IMAGE_SLUGS = [
  "whiskey-sour",
  "singapore-sling",
  "sazerac",
  "gimlet",
  "paper-plane",
  "aperol-spritz",
  "pina-colada",
];

test("featured Recipe images use the finished-drink photo, not the OG card", () => {
  for (const slug of FEATURED_RECIPE_IMAGE_SLUGS) {
    const cocktail = getCocktail("en", slug);
    assert.ok(cocktail, slug);
    const data = cocktailStructuredData({
      locale: "en",
      cocktail,
      url: `https://justonesip.today/en/cocktails/${slug}/`,
    });
    const recipe = data.find((item) => item["@type"] === "Recipe");
    assert.deepEqual(
      recipe.image,
      [`https://justonesip.today/images/cocktails/${slug}-recipe.webp`],
      slug,
    );
    assert.equal(cocktail.ogImage, `/images/cocktails/${slug}-og.webp`, slug);
    assert.equal(recipe.aggregateRating, undefined, slug);
  }
});
