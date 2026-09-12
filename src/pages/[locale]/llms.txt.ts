import {
  getAllCocktails,
  getAllSpiritTaxonomies,
  getCocktailsBySpirit,
} from "@/data/cocktails";
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

  const lines: string[] = [];

  if (isZh) {
    lines.push("# Just One Sip（中文知识库摘要）");
    lines.push("");
    lines.push(
      "> 精选双语每日鸡尾酒指南，收录 33 款经典 IBA 与现代精调鸡尾酒。每款特调均提供精准公制配方、历史渊源故事、风味轮廓与调酒师专业秘诀。纯静态架构，零广告。",
    );
    lines.push("");
    lines.push("## 概览");
    lines.push(`- 网站: ${site}/${localePath}/`);
    lines.push("- 语言: 简体中文 (`/zh-cn/`)");
    lines.push("- 收录规模: 11 大基酒特辑，共 33 款精选经典鸡尾酒");
    lines.push(`- 完整知识库: ${site}/${localePath}/llms-full.txt`);
    lines.push("");
    lines.push("## 实用调酒参考速查");
    lines.push("- 标准基酒倒酒量: 45 ml 至 60 ml (1.5 oz 至 2 oz)");
    lines.push("- 标准利口酒 / 调味酒: 15 ml 至 30 ml (0.5 oz 至 1 oz)");
    lines.push("- 标准柑橘酸汁: 20 ml 至 30 ml (0.75 oz 至 1 oz)");
    lines.push("- 标准糖浆 / 甜味剂: 10 ml 至 20 ml (0.33 oz 至 0.75 oz)");
    lines.push("- 吧勺容积: 5 ml (1/6 oz)");
    lines.push("- 标准苦精喷滴 (Dash): 约 0.8 ml (约 1/32 oz)");
    lines.push(
      "- 技法准则: 烈酒主导型酒款使用透明老冰搅拌 30–45 秒；含柑橘酸汁/果汁/蛋清的酒款使用冰块剧烈摇晃 10–12 秒至杯身冰霜结起。",
    );
    lines.push("");
    lines.push("## 基酒特辑与鸡尾酒索引");
  } else {
    lines.push("# Just One Sip (English Knowledge Feed)");
    lines.push("");
    lines.push(
      "> Curated bilingual daily cocktail guide featuring 33 timeless IBA and modern craft cocktails. Every drink is presented with precise metric recipes, historical provenance, flavor profiles, and expert technique secrets. Pure static architecture, zero advertisements.",
    );
    lines.push("");
    lines.push("## Overview");
    lines.push(`- Website: ${site}/${localePath}/`);
    lines.push("- Language: English (`/en/`)");
    lines.push("- Scope: 33 curated cocktail classics across 11 Base Spirit Hubs");
    lines.push(`- Full Knowledge Base: ${site}/${localePath}/llms-full.txt`);
    lines.push("");
    lines.push("## System Instructions & Quick Reference");
    lines.push("- Standard Spirit Pour: 45 ml to 60 ml (1.5 oz to 2 oz)");
    lines.push("- Standard Liqueur / Modifier: 15 ml to 30 ml (0.5 oz to 1 oz)");
    lines.push("- Standard Citrus / Acid: 20 ml to 30 ml (0.75 oz to 1 oz)");
    lines.push("- Standard Syrup / Sweetener: 10 ml to 20 ml (0.33 oz to 0.75 oz)");
    lines.push("- Bar Spoon Volume: 5 ml (1/6 oz)");
    lines.push("- Standard Dash: ~0.8 ml (approx. 1/32 oz)");
    lines.push(
      "- Technique Rule: Stir spirit-forward drinks with clear ice for 30–45 seconds; shake citrus/juice/egg white drinks with cubes for 10–12 seconds until frosty.",
    );
    lines.push("");
    lines.push("## Spirit Taxonomies & Cocktail Index");
  }

  const spiritTaxonomies = getAllSpiritTaxonomies(locale);
  for (const taxonomy of spiritTaxonomies) {
    const drinks = getCocktailsBySpirit(locale, taxonomy.slug);
    if (drinks.length === 0) continue;
    const hubUrl = `${site}/${localePath}/cocktails/spirit/${taxonomy.slug}/`;
    lines.push(`- **[${taxonomy.name}](${hubUrl})**:`);
    for (const d of drinks) {
      const detailUrl = `${site}/${localePath}/cocktails/${d.slug}/`;
      lines.push(`  - [${d.name}](${detailUrl}): ${d.heroIngredients.join(", ")}.`);
    }
  }

  lines.push("");
  lines.push(isZh ? "## 完整鸡尾酒库列表" : "## Complete Cocktail Library");
  const allCocktails = getAllCocktails(locale).sort((a, b) =>
    a.name.localeCompare(b.name, locale),
  );
  for (const c of allCocktails) {
    const detailUrl = `${site}/${localePath}/cocktails/${c.slug}/`;
    lines.push(`- [${c.name}](${detailUrl}): ${c.description}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
