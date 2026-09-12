import { getAllCocktails } from "@/data/cocktails";

export function GET() {
  const cocktails = getAllCocktails("en");

  const lines = [
    "# Just One Sip — Complete Cocktail Knowledge Base",
    "",
    "> Exhaustive machine-readable cocktail database featuring all 33 classic and modern craft cocktails curated by Just One Sip (https://justonesip.today). Every entry contains verified ingredient ratios, historical provenance lore, flavor notes, preparation steps, bartender secrets, and FAQs.",
    "",
    "---",
    "",
  ];

  for (const cocktail of cocktails) {
    lines.push(`## ${cocktail.name}`);
    lines.push("");
    lines.push(`- **Slug**: \`${cocktail.slug}\``);
    lines.push(`- **Canonical URL**: https://justonesip.today/en/cocktails/${cocktail.slug}/`);
    lines.push(`- **Base Spirit**: ${cocktail.baseSpirit}`);
    lines.push(`- **Glassware**: ${cocktail.glass}`);
    lines.push(`- **Estimated Calories**: ${cocktail.estimatedCalories} kcal`);
    lines.push(`- **Cuisine / Heritage**: ${cocktail.recipeCuisine || "International"}`);
    if (cocktail.suitableForDiet) {
      lines.push(`- **Dietary Suitability**: ${cocktail.suitableForDiet}`);
    }
    lines.push(`- **Subtitle**: *${cocktail.subtitle}*`);
    lines.push("");
    lines.push(`### Description`);
    lines.push(cocktail.description);
    lines.push("");
    lines.push(`### Origin & Historical Lore`);
    lines.push(cocktail.originLore || "");
    lines.push("");
    lines.push(`### Flavor Profile`);
    lines.push(cocktail.flavorNotes || cocktail.flavor);
    lines.push("");
    lines.push(`### Ingredients`);
    for (const ing of cocktail.ingredients) {
      lines.push(`- ${ing}`);
    }
    lines.push("");
    lines.push(`### Preparation Steps`);
    cocktail.steps.forEach((step, index) => {
      lines.push(`${index + 1}. ${step}`);
    });
    lines.push("");

    if (cocktail.barTips && cocktail.barTips.length > 0) {
      lines.push(`### Expert Bartender Secrets`);
      for (const tip of cocktail.barTips) {
        lines.push(`- ${tip}`);
      }
      lines.push("");
    }

    if (cocktail.faqs && cocktail.faqs.length > 0) {
      lines.push(`### Frequently Asked Questions`);
      for (const faq of cocktail.faqs) {
        lines.push(`**Q: ${faq.question}**`);
        lines.push(`A: ${faq.answer}`);
        lines.push("");
      }
    }

    if (cocktail.relatedSlugs && cocktail.relatedSlugs.length > 0) {
      lines.push(`### Companion Cocktails`);
      lines.push(`Related drinks: ${cocktail.relatedSlugs.join(", ")}`);
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
