import test from "node:test";
import assert from "node:assert/strict";
import {
  getAllCocktails,
  getCocktailSlugs,
  getDailyCocktail,
  getDailyCocktailSlug,
  getLocalDateKey,
} from "../src/data/cocktails.ts";

test("getAllCocktails returns all 33 cocktails permanently active", () => {
  const enCocktails = getAllCocktails("en");
  const zhCocktails = getAllCocktails("zh-CN");
  assert.equal(enCocktails.length, 33);
  assert.equal(zhCocktails.length, 33);
  assert.equal(getCocktailSlugs().length, 33);
});

test("getDailyCocktailSlug is deterministic for the same date key", () => {
  const dateStr = "2026-09-10";
  const slug1 = getDailyCocktailSlug(dateStr);
  const slug2 = getDailyCocktailSlug(dateStr);
  const slug3 = getDailyCocktailSlug(new Date("2026-09-10T12:00:00Z"));
  assert.equal(slug1, slug2);
  assert.equal(typeof slug1, "string");
  assert.ok(getCocktailSlugs().includes(slug1));
});

test("adjacent dates produce distinct cocktails", () => {
  const baseDate = new Date("2026-01-01T00:00:00Z");
  for (let i = 0; i < 100; i++) {
    const d1 = new Date(baseDate.getTime() + i * 86400000);
    const d2 = new Date(baseDate.getTime() + (i + 1) * 86400000);
    const slug1 = getDailyCocktailSlug(d1);
    const slug2 = getDailyCocktailSlug(d2);
    assert.notEqual(
      slug1,
      slug2,
      `Adjacent dates ${getLocalDateKey(d1)} and ${getLocalDateKey(d2)} must not match (both produced ${slug1})`,
    );
  }
});

test("full 33-day cycle traverses every cocktail in the catalog without omission", () => {
  const baseDate = new Date("2026-06-01T00:00:00Z");
  const allSlugs = new Set(getCocktailSlugs());
  const seenSlugs = new Set();

  for (let i = 0; i < 33; i++) {
    const d = new Date(baseDate.getTime() + i * 86400000);
    const slug = getDailyCocktailSlug(d);
    seenSlugs.add(slug);
  }

  assert.equal(seenSlugs.size, 33, "A 33-day cycle must yield 33 unique cocktails");
  for (const slug of allSlugs) {
    assert.ok(seenSlugs.has(slug), `Catalog slug ${slug} was missing from the 33-day cycle`);
  }
});

test("getDailyCocktail returns complete localized cocktail for a given date", () => {
  const d = new Date("2026-09-10T08:00:00Z");
  const enCocktail = getDailyCocktail("en", d);
  const zhCocktail = getDailyCocktail("zh-CN", d);

  assert.equal(enCocktail.slug, zhCocktail.slug);
  assert.ok(enCocktail.name.length > 0);
  assert.ok(zhCocktail.name.length > 0);
  assert.notEqual(enCocktail.name, zhCocktail.name);
});
