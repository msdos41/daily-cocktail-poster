import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllCocktails, getSpiritCategory, getSpiritTaxonomy } from "../src/data/cocktails.ts";
import { cocktailStructuredData } from "../src/utils/structuredData.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("cocktail detail page template markup includes 4-tier breadcrumb structure", () => {
  const template = fs.readFileSync(
    path.join(root, "src/pages/[locale]/cocktails/[slug].astro"),
    "utf8",
  );
  assert.ok(
    template.includes("getSpiritCategory"),
    "Detail template must import and use getSpiritCategory",
  );
  assert.ok(
    template.includes("getSpiritTaxonomy"),
    "Detail template must import and use getSpiritTaxonomy",
  );
  assert.ok(
    template.includes("/cocktails/spirit/"),
    "Detail template breadcrumb must link to Base Spirit Hub",
  );
});

test("cocktailStructuredData outputs a 4-tier BreadcrumbList across all locales and drinks", () => {
  const locales = [
    { locale: "en", path: "en" },
    { locale: "zh-CN", path: "zh-cn" },
  ];

  for (const { locale, path: localePath } of locales) {
    const cocktails = getAllCocktails(locale);
    for (const cocktail of cocktails) {
      const url = `https://justonesip.today/${localePath}/cocktails/${cocktail.slug}`;
      const data = cocktailStructuredData({ locale, cocktail, url });
      const breadcrumb = data.find((item) => item["@type"] === "BreadcrumbList");

      assert.ok(breadcrumb, `BreadcrumbList missing for ${cocktail.slug} in ${locale}`);
      const list = breadcrumb.itemListElement;
      assert.ok(Array.isArray(list), "itemListElement must be an array");
      assert.equal(
        list.length,
        4,
        `BreadcrumbList for ${cocktail.slug} (${locale}) must contain exactly 4 items, got ${list.length}`,
      );

      // Step 1: Home
      assert.equal(list[0].position, 1);
      assert.equal(list[0].item, `https://justonesip.today/${localePath}/`);

      // Step 2: The Collection
      assert.equal(list[1].position, 2);
      assert.equal(list[1].item, `https://justonesip.today/${localePath}/cocktails`);

      // Step 3: Base Spirit Hub
      const spiritCategory = getSpiritCategory(cocktail.baseSpirit);
      const taxonomy = getSpiritTaxonomy(locale, spiritCategory);
      assert.ok(taxonomy, `Taxonomy missing for ${spiritCategory} in ${locale}`);
      assert.equal(list[2].position, 3);
      assert.equal(list[2].name, taxonomy.name);
      assert.equal(
        list[2].item,
        `https://justonesip.today/${localePath}/cocktails/spirit/${spiritCategory}`,
      );

      // Step 4: Cocktail
      assert.equal(list[3].position, 4);
      assert.equal(list[3].name, cocktail.name);
      assert.equal(list[3].item, url);
    }
  }
});
