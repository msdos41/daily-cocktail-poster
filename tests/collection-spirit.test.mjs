import test from "node:test";
import assert from "node:assert/strict";
import { getAllCocktails, getSpiritCategory } from "../src/data/cocktails.ts";

const validCategories = new Set([
  "gin",
  "whiskey",
  "rum",
  "tequila",
  "vodka",
  "mezcal",
  "brandy",
  "scotch",
  "pisco",
  "cachaca",
  "aperol",
]);

test("every cocktail resolves to a valid spirit category in en and zh-CN", () => {
  const enCocktails = getAllCocktails("en");
  const zhCocktails = getAllCocktails("zh-CN");

  assert.equal(enCocktails.length, 33);
  assert.equal(zhCocktails.length, 33);

  for (let i = 0; i < 33; i++) {
    const en = enCocktails[i];
    const zh = zhCocktails[i];

    const enCat = getSpiritCategory(en.baseSpirit);
    const zhCat = getSpiritCategory(zh.baseSpirit);

    assert.ok(
      validCategories.has(enCat),
      `Cocktail ${en.id} (en: "${en.baseSpirit}") resolved to invalid category: ${enCat}`,
    );
    assert.ok(
      validCategories.has(zhCat),
      `Cocktail ${zh.id} (zh: "${zh.baseSpirit}") resolved to invalid category: ${zhCat}`,
    );
    assert.equal(
      enCat,
      zhCat,
      `Cocktail ${en.id} category mismatch between locales: en=${enCat}, zh=${zhCat}`,
    );
  }
});
