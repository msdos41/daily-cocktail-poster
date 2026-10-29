import test from "node:test";
import assert from "node:assert/strict";
import { getAllCocktails } from "../src/data/cocktails.ts";
import { cocktailStructuredData } from "../src/utils/structuredData.ts";

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

test("every cocktail has static publishedAt <= updatedAt ISO dates", () => {
  for (const locale of ["en", "zh-CN"]) {
    for (const c of getAllCocktails(locale)) {
      assert.match(c.publishedAt, ISO_DAY, c.slug);
      assert.match(c.updatedAt, ISO_DAY, c.slug);
      assert.ok(c.publishedAt <= c.updatedAt, c.slug);
    }
  }
});

test("Recipe JSON-LD carries datePublished and dateModified", () => {
  for (const c of getAllCocktails("en")) {
    const recipe = cocktailStructuredData({ locale: "en", cocktail: c, url: `https://justonesip.today/en/cocktails/${c.slug}/` }).find((item) => item["@type"] === "Recipe");
    assert.equal(recipe.datePublished, c.publishedAt, c.slug);
    assert.equal(recipe.dateModified, c.updatedAt, c.slug);
  }
});
