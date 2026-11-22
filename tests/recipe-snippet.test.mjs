import test from "node:test";
import assert from "node:assert/strict";
import { getAllCocktails, getCocktail } from "../src/data/cocktails.ts";
import { cocktailStructuredData } from "../src/utils/structuredData.ts";
import {
  CHINESE_RECIPE_SNIPPET_MAX_LENGTH,
  chineseRecipeSnippet,
  recipeMetaDescription,
  recipePageTitle,
} from "../src/utils/recipeSnippet.ts";

test("Chinese Aperol Spritz search snippet uses the specific SEO description", () => {
  const cocktail = getCocktail("zh-CN", "aperol-spritz");
  assert.ok(cocktail);

  const snippet = recipeMetaDescription("zh-CN", cocktail);

  assert.equal(
    snippet,
    "轻松意式开胃酒：90 ml 普罗塞克、60 ml 阿佩罗与苏打水，2 分钟完成。明亮橙色，适合漫长午后。",
  );
  assert.equal(snippet.includes(cocktail.description), false);
});

test("Chinese search snippets keep a leading run of ingredients inside the length cap", () => {
  const cocktails = getAllCocktails("zh-CN");
  assert.equal(cocktails.length, 33);

  for (const cocktail of cocktails) {
    if (cocktail.seoDescription) {
      assert.equal(recipeMetaDescription("zh-CN", cocktail), cocktail.seoDescription, cocktail.slug);
      continue;
    }

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
      const candidate = `${prefix}${[...used, cocktail.ingredients[used.length]].join("、")}。`;
      assert.ok(
        candidate.length > CHINESE_RECIPE_SNIPPET_MAX_LENGTH,
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
    if (cocktail.seoDescription) {
      assert.equal(snippet, cocktail.seoDescription, cocktail.slug);
      continue;
    }

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

const FEATURED_SEARCH_SNIPPETS = {
  "whiskey-sour": {
    enTitle: "Whiskey Sour Recipe: 2 oz Bourbon, Egg White Optional",
    enDescription:
      "A foundational sour with 2 oz bourbon, lemon, and sugar, ready in 4 minutes. Egg white is optional, but it gives the drink its classic silky top.",
    zhTitle: "威士忌酸配方：60 ml 波本，蛋清可选",
    zhDescription: "基础酸型做法：60 ml 波本搭配柠檬与糖，4 分钟完成。蛋清可选，但会带来经典的丝滑泡沫。",
  },
  "singapore-sling": {
    enTitle: "Singapore Sling Recipe: 1 1/2 oz Gin, Cherry and Pineapple",
    enDescription:
      "A tropical gin long drink with 1 1/2 oz gin, cherry, citrus, pineapple, and spice, ready in 4 minutes. It is colorful, structured, and more layered than it first appears.",
    zhTitle: "新加坡司令配方：45 ml 金酒，樱桃与菠萝",
    zhDescription: "热带金酒长饮：45 ml 金酒搭配樱桃、柑橘与菠萝，4 分钟完成。色彩鲜明，也比第一眼看上去更有结构。",
  },
  sazerac: {
    enTitle: "Sazerac Recipe: 2 oz Rye, Absinthe Rinse",
    enDescription:
      "A New Orleans icon with 2 oz rye whiskey, Peychaud's bitters, sugar, and a whisper of absinthe, ready in 4 minutes. It is potent, aromatic, and built for slow attention.",
    zhTitle: "萨泽拉克配方：60 ml 黑麦，苦艾酒润杯",
    zhDescription: "新奥尔良经典：60 ml 黑麦威士忌，配 Peychaud's 苦精与苦艾酒润杯，4 分钟完成。浓烈而有辨识度。",
  },
  gimlet: {
    enTitle: "Gimlet Recipe: 2 oz Gin and Lime",
    enDescription:
      "An old-school gin sour with 2 oz gin, lime, and sugar, ready in 3 minutes. It is cold, compact, and satisfying without extra decoration.",
    zhTitle: "吉姆雷特配方：60 ml 金酒与青柠",
    zhDescription: "老派金酒酸：60 ml 金酒搭配青柠与糖，3 分钟完成。冰冷、紧凑，不需要多余装饰。",
  },
  "paper-plane": {
    enTitle: "Paper Plane Recipe: Equal Parts, 3/4 oz Bourbon",
    enDescription:
      "A modern equal-parts cocktail with 3/4 oz each of bourbon, Aperol, amaro, and lemon, ready in 3 minutes. It feels effortless because the balance is doing the work.",
    zhTitle: "纸飞机配方：等量组合，22.5 ml 波本",
    zhDescription: "现代等量经典：波本、Aperol、阿玛罗和柠檬各 22.5 ml，3 分钟完成。干净、苦甜而平衡。",
  },
  "aperol-spritz": {
    enTitle: "Aperol Spritz Recipe: 3 oz Prosecco, 2 oz Aperol",
    enDescription:
      "A low-effort Italian aperitif that layers 3 oz prosecco, 2 oz Aperol, and soda into a bright orange glass, ready in 2 minutes.",
    zhTitle: "阿佩罗橙光配方：90 ml 普罗塞克，60 ml 阿佩罗",
    zhDescription: "轻松意式开胃酒：90 ml 普罗塞克、60 ml 阿佩罗与苏打水，2 分钟完成。明亮橙色，适合漫长午后。",
  },
  "pina-colada": {
    enTitle: "Pina Colada Recipe: 2 oz Rum, Pineapple and Coconut",
    enDescription:
      "A creamy tropical classic with 2 oz rum, pineapple, and coconut, ready in 4 minutes. It works best when pineapple stays bright and the coconut is rich but controlled.",
    zhTitle: "椰林飘香配方：60 ml 朗姆，菠萝与椰子",
    zhDescription: "奶油感热带经典：60 ml 朗姆搭配菠萝与椰子，4 分钟完成。让菠萝保持明亮，椰子浓郁但不过分沉重。",
  },
};

test("featured cocktails use more specific search titles and descriptions", () => {
  for (const [slug, expected] of Object.entries(FEATURED_SEARCH_SNIPPETS)) {
    const en = getCocktail("en", slug);
    const zh = getCocktail("zh-CN", slug);
    assert.ok(en && zh, slug);

    assert.equal(recipePageTitle("en", en), expected.enTitle, `${slug} en title`);
    assert.equal(recipeMetaDescription("en", en), expected.enDescription, `${slug} en description`);
    assert.equal(recipePageTitle("zh-CN", zh), expected.zhTitle, `${slug} zh title`);
    assert.equal(recipeMetaDescription("zh-CN", zh), expected.zhDescription, `${slug} zh description`);
    assert.notEqual(recipeMetaDescription("en", en), en.description, `${slug} en meta stays off the body copy`);
    assert.notEqual(recipeMetaDescription("zh-CN", zh), zh.description, `${slug} zh meta stays off the body copy`);
  }
});

test("default recipe titles still use the shared suffix", () => {
  const en = getCocktail("en", "mojito");
  const zh = getCocktail("zh-CN", "mojito");
  assert.ok(en && zh);
  assert.equal(recipePageTitle("en", en), "Mojito Cocktail Recipe");
  assert.equal(recipePageTitle("zh-CN", zh), "莫吉托鸡尾酒配方");
});
