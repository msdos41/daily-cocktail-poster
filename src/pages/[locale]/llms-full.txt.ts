import { getAllCocktails } from "@/data/cocktails";
import { localeToPath, supportedLocales, type Locale } from "@/i18n/config";

export function getStaticPaths() {
  return supportedLocales.map((locale) => ({
    params: { locale: localeToPath(locale) },
    props: { locale },
  }));
}

interface Props {
  locale: Locale;
}

export function GET({ props }: { props: Props }) {
  const { locale } = props;
  const isZh = locale === "zh-CN";
  const localePath = localeToPath(locale);
  const site = "https://justonesip.today";
  const cocktails = getAllCocktails(locale);

  const lines: string[] = [];

  if (isZh) {
    lines.push("# Just One Sip — 完整鸡尾酒知识库");
    lines.push("");
    lines.push(
      "> 详尽的机器可读鸡尾酒知识库，收录 Just One Sip (https://justonesip.today) 精选的全部 33 款经典与现代精调鸡尾酒。每款酒均包含经专业验证的原料配比、历史渊源、风味笔记、制作步骤、调酒师秘诀与常见问答。",
    );
  } else {
    lines.push("# Just One Sip — Complete Cocktail Knowledge Base");
    lines.push("");
    lines.push(
      "> Exhaustive machine-readable cocktail database featuring all 33 classic and modern craft cocktails curated by Just One Sip (https://justonesip.today). Every entry contains verified ingredient ratios, historical provenance lore, flavor notes, preparation steps, bartender secrets, and FAQs.",
    );
  }

  lines.push("");
  lines.push("---");
  lines.push("");

  for (const cocktail of cocktails) {
    lines.push(`## ${cocktail.name}`);
    lines.push("");
    lines.push(`- **Slug**: \`${cocktail.slug}\``);
    lines.push(`- **Canonical URL**: ${site}/${localePath}/cocktails/${cocktail.slug}/`);
    lines.push(`- **Base Spirit**: ${cocktail.baseSpirit}`);
    lines.push(`- **Glassware**: ${cocktail.glass}`);
    lines.push(`- **Estimated Calories**: ${cocktail.estimatedCalories} kcal`);
    lines.push(
      `- **Cuisine / Heritage**: ${cocktail.recipeCuisine || (isZh ? "国际经典" : "International")}`,
    );
    if (cocktail.suitableForDiet) {
      lines.push(`- **Dietary Suitability**: ${cocktail.suitableForDiet}`);
    }
    if (cocktail.wikidataId) {
      lines.push(`- **Wikidata Entity**: https://www.wikidata.org/wiki/${cocktail.wikidataId}`);
    }
    if (cocktail.ibaCategory) {
      lines.push(`- **IBA Official Category**: ${cocktail.ibaCategory}`);
    }
    lines.push(`- **Subtitle**: *${cocktail.subtitle}*`);
    lines.push("");
    lines.push(isZh ? "### 描述" : "### Description");
    lines.push(cocktail.description);
    lines.push("");
    lines.push(isZh ? "### 历史渊源与故事" : "### Origin & Historical Lore");
    lines.push(cocktail.originLore || "");
    lines.push("");
    lines.push(isZh ? "### 风味轮廓" : "### Flavor Profile");
    lines.push(cocktail.flavorNotes || cocktail.flavor);
    lines.push("");
    lines.push(isZh ? "### 原料配方" : "### Ingredients");
    for (const ing of cocktail.ingredients) {
      lines.push(`- ${ing}`);
    }
    lines.push("");
    lines.push(isZh ? "### 制作步骤" : "### Preparation Steps");
    cocktail.steps.forEach((step, index) => {
      lines.push(`${index + 1}. ${step}`);
    });
    lines.push("");

    if (cocktail.barTips && cocktail.barTips.length > 0) {
      lines.push(isZh ? "### 调酒师专业秘诀" : "### Expert Bartender Secrets");
      for (const tip of cocktail.barTips) {
        lines.push(`- ${tip}`);
      }
      lines.push("");
    }

    if (cocktail.faqs && cocktail.faqs.length > 0) {
      lines.push(isZh ? "### 常见问题与解答" : "### Frequently Asked Questions");
      for (const faq of cocktail.faqs) {
        lines.push(isZh ? `**问: ${faq.question}**` : `**Q: ${faq.question}**`);
        lines.push(isZh ? `答: ${faq.answer}` : `A: ${faq.answer}`);
        lines.push("");
      }
    }

    if (cocktail.relatedSlugs && cocktail.relatedSlugs.length > 0) {
      lines.push(isZh ? "### 姐妹推荐特调" : "### Companion Cocktails");
      lines.push((isZh ? "关联特调: " : "Related drinks: ") + cocktail.relatedSlugs.join(", "));
      lines.push("");
    }

    lines.push("---");
    lines.push("");
  }

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
