import type { Locale } from "@/i18n/config";

export type CocktailId =
  | "negroni"
  | "margarita"
  | "old-fashioned"
  | "daiquiri"
  | "espresso-martini"
  | "aperol-spritz"
  | "mojito";

type StableCocktail = {
  id: CocktailId;
  slug: string;
  date: string;
  image: string;
  heroImageDesktop: string;
  heroImageMobile: string;
  backgroundDownloadDesktop: string;
  backgroundDownloadMobile: string;
  posterImage: string;
  shareBaseImage: string;
  glass: string;
  baseSpirit: string;
};

type LocalizedCocktail = {
  name: string;
  subtitle: string;
  description: string;
  heroIngredients: string[];
  ingredients: string[];
  steps: string[];
  tags: string[];
  flavor: string;
  glass: string;
  garnish: string;
  baseSpirit: string;
};

export type Cocktail = StableCocktail & LocalizedCocktail;

const stableCocktails: StableCocktail[] = [
  {
    id: "negroni",
    slug: "negroni",
    date: "2026-05-24",
    image: "/images/cocktails/negroni-poster.svg",
    heroImageDesktop: "/images/cocktails/negroni-scene-desktop.svg",
    heroImageMobile: "/images/cocktails/negroni-scene-mobile.svg",
    backgroundDownloadDesktop: "/images/cocktails/negroni-scene-desktop.svg",
    backgroundDownloadMobile: "/images/cocktails/negroni-scene-mobile.svg",
    posterImage: "/images/cocktails/negroni-poster.svg",
    shareBaseImage: "/images/cocktails/negroni-scene-mobile.svg",
    glass: "rocks",
    baseSpirit: "gin",
  },
  {
    id: "margarita",
    slug: "margarita",
    date: "2026-05-25",
    image: "/images/cocktails/margarita-poster.svg",
    heroImageDesktop: "/images/cocktails/margarita-scene-desktop.svg",
    heroImageMobile: "/images/cocktails/margarita-scene-mobile.svg",
    backgroundDownloadDesktop: "/images/cocktails/margarita-scene-desktop.svg",
    backgroundDownloadMobile: "/images/cocktails/margarita-scene-mobile.svg",
    posterImage: "/images/cocktails/margarita-poster.svg",
    shareBaseImage: "/images/cocktails/margarita-scene-mobile.svg",
    glass: "coupe",
    baseSpirit: "tequila",
  },
  {
    id: "old-fashioned",
    slug: "old-fashioned",
    date: "2026-05-26",
    image: "/images/cocktails/old-fashioned-poster.svg",
    heroImageDesktop: "/images/cocktails/old-fashioned-scene-desktop.svg",
    heroImageMobile: "/images/cocktails/old-fashioned-scene-mobile.svg",
    backgroundDownloadDesktop: "/images/cocktails/old-fashioned-scene-desktop.svg",
    backgroundDownloadMobile: "/images/cocktails/old-fashioned-scene-mobile.svg",
    posterImage: "/images/cocktails/old-fashioned-poster.svg",
    shareBaseImage: "/images/cocktails/old-fashioned-scene-mobile.svg",
    glass: "rocks",
    baseSpirit: "bourbon",
  },
  {
    id: "daiquiri",
    slug: "daiquiri",
    date: "2026-05-27",
    image: "/images/cocktails/daiquiri-poster.svg",
    heroImageDesktop: "/images/cocktails/daiquiri-scene-desktop.svg",
    heroImageMobile: "/images/cocktails/daiquiri-scene-mobile.svg",
    backgroundDownloadDesktop: "/images/cocktails/daiquiri-scene-desktop.svg",
    backgroundDownloadMobile: "/images/cocktails/daiquiri-scene-mobile.svg",
    posterImage: "/images/cocktails/daiquiri-poster.svg",
    shareBaseImage: "/images/cocktails/daiquiri-scene-mobile.svg",
    glass: "coupe",
    baseSpirit: "white rum",
  },
  {
    id: "espresso-martini",
    slug: "espresso-martini",
    date: "2026-05-28",
    image: "/images/cocktails/espresso-martini-poster.svg",
    heroImageDesktop: "/images/cocktails/espresso-martini-scene-desktop.svg",
    heroImageMobile: "/images/cocktails/espresso-martini-scene-mobile.svg",
    backgroundDownloadDesktop: "/images/cocktails/espresso-martini-scene-desktop.svg",
    backgroundDownloadMobile: "/images/cocktails/espresso-martini-scene-mobile.svg",
    posterImage: "/images/cocktails/espresso-martini-poster.svg",
    shareBaseImage: "/images/cocktails/espresso-martini-scene-mobile.svg",
    glass: "martini",
    baseSpirit: "vodka",
  },
  {
    id: "aperol-spritz",
    slug: "aperol-spritz",
    date: "2026-05-29",
    image: "/images/cocktails/aperol-spritz-poster.svg",
    heroImageDesktop: "/images/cocktails/aperol-spritz-scene-desktop.svg",
    heroImageMobile: "/images/cocktails/aperol-spritz-scene-mobile.svg",
    backgroundDownloadDesktop: "/images/cocktails/aperol-spritz-scene-desktop.svg",
    backgroundDownloadMobile: "/images/cocktails/aperol-spritz-scene-mobile.svg",
    posterImage: "/images/cocktails/aperol-spritz-poster.svg",
    shareBaseImage: "/images/cocktails/aperol-spritz-scene-mobile.svg",
    glass: "wine",
    baseSpirit: "aperol",
  },
  {
    id: "mojito",
    slug: "mojito",
    date: "2026-05-30",
    image: "/images/cocktails/mojito-poster.svg",
    heroImageDesktop: "/images/cocktails/mojito-scene-desktop.svg",
    heroImageMobile: "/images/cocktails/mojito-scene-mobile.svg",
    backgroundDownloadDesktop: "/images/cocktails/mojito-scene-desktop.svg",
    backgroundDownloadMobile: "/images/cocktails/mojito-scene-mobile.svg",
    posterImage: "/images/cocktails/mojito-poster.svg",
    shareBaseImage: "/images/cocktails/mojito-scene-mobile.svg",
    glass: "highball",
    baseSpirit: "white rum",
  },
];

const localizedCocktails: Record<Locale, Record<CocktailId, LocalizedCocktail>> = {
  en: {
    negroni: {
      name: "Negroni",
      subtitle: "Bitter ruby, slow evening.",
      description:
        "A compact Italian classic where gin, Campari, and sweet vermouth meet in equal measure. It is direct, aromatic, and built for a quiet golden-hour pour.",
      heroIngredients: ["Gin", "Campari", "Sweet Vermouth"],
      ingredients: ["1 oz gin", "1 oz Campari", "1 oz sweet vermouth", "Orange peel"],
      steps: [
        "Add gin, Campari, and sweet vermouth to a mixing glass with ice.",
        "Stir until well chilled.",
        "Strain over a large cube in a rocks glass.",
        "Express an orange peel over the drink and garnish.",
      ],
      tags: ["bitter", "classic", "aperitif", "stirred"],
      flavor: "Bittersweet, herbal, orange-led",
      glass: "Rocks glass",
      garnish: "Orange peel",
      baseSpirit: "Gin",
    },
    margarita: {
      name: "Margarita",
      subtitle: "Salt, lime, and clean tequila brightness.",
      description:
        "A sharp, sunlit sour that balances tequila, orange liqueur, and fresh lime. The salt rim keeps each sip vivid and crisp.",
      heroIngredients: ["Tequila", "Lime", "Orange Liqueur"],
      ingredients: ["2 oz blanco tequila", "1 oz lime juice", "3/4 oz orange liqueur", "Salt rim"],
      steps: [
        "Salt half the rim of a chilled coupe or rocks glass.",
        "Shake tequila, lime juice, and orange liqueur with ice.",
        "Strain into the prepared glass.",
        "Garnish with a lime wheel if desired.",
      ],
      tags: ["citrus", "refreshing", "sour", "tequila"],
      flavor: "Bright, tart, lightly sweet",
      glass: "Coupe or rocks glass",
      garnish: "Lime wheel and salt",
      baseSpirit: "Tequila",
    },
    "old-fashioned": {
      name: "Old Fashioned",
      subtitle: "Whiskey, sugar, bitters, patience.",
      description:
        "A restrained whiskey classic with just enough sweetness and bitters to frame the spirit. It is simple on paper and exacting in the glass.",
      heroIngredients: ["Whiskey", "Sugar", "Bitters"],
      ingredients: ["2 oz bourbon or rye", "1 tsp rich simple syrup", "2 dashes Angostura bitters", "Orange peel"],
      steps: [
        "Add syrup and bitters to a rocks glass.",
        "Add whiskey and a large cube.",
        "Stir briefly until chilled and slightly diluted.",
        "Express an orange peel over the surface and garnish.",
      ],
      tags: ["spirit-forward", "classic", "stirred", "whiskey"],
      flavor: "Warm, oaky, gently sweet",
      glass: "Rocks glass",
      garnish: "Orange peel",
      baseSpirit: "Whiskey",
    },
    daiquiri: {
      name: "Daiquiri",
      subtitle: "Rum, lime, sugar. Nothing to hide.",
      description:
        "A clean rum sour that proves three ingredients can carry a complete drink. Fresh lime and measured sugar keep it elegant instead of flashy.",
      heroIngredients: ["White Rum", "Lime", "Sugar"],
      ingredients: ["2 oz white rum", "1 oz lime juice", "3/4 oz simple syrup"],
      steps: [
        "Add rum, lime juice, and syrup to a shaker with ice.",
        "Shake hard until cold.",
        "Fine strain into a chilled coupe.",
        "Serve without garnish or with a small lime wheel.",
      ],
      tags: ["citrus", "simple", "shaken", "rum"],
      flavor: "Crisp, tart, clean",
      glass: "Coupe",
      garnish: "Optional lime wheel",
      baseSpirit: "White rum",
    },
    "espresso-martini": {
      name: "Espresso Martini",
      subtitle: "Night energy in a velvet coupe.",
      description:
        "A modern classic with vodka, coffee liqueur, and fresh espresso. It is dark, glossy, and built around a silky foam cap.",
      heroIngredients: ["Vodka", "Espresso", "Coffee Liqueur"],
      ingredients: ["1 1/2 oz vodka", "1 oz fresh espresso", "3/4 oz coffee liqueur", "1/4 oz simple syrup"],
      steps: [
        "Add all ingredients to a shaker with plenty of ice.",
        "Shake very hard to build foam.",
        "Fine strain into a chilled martini glass.",
        "Garnish with three coffee beans.",
      ],
      tags: ["coffee", "modern classic", "shaken", "after-dark"],
      flavor: "Roasted, silky, lightly sweet",
      glass: "Martini glass",
      garnish: "Coffee beans",
      baseSpirit: "Vodka",
    },
    "aperol-spritz": {
      name: "Aperol Spritz",
      subtitle: "Orange fizz for an open window.",
      description:
        "A low-effort Italian aperitif that layers Aperol, prosecco, and soda into a bright orange glass made for long afternoons.",
      heroIngredients: ["Prosecco", "Aperol", "Soda"],
      ingredients: ["3 oz prosecco", "2 oz Aperol", "1 oz soda water", "Orange slice"],
      steps: [
        "Fill a wine glass with ice.",
        "Add prosecco, then Aperol.",
        "Top with soda water and stir gently.",
        "Garnish with an orange slice.",
      ],
      tags: ["sparkling", "aperitif", "low-abv", "orange"],
      flavor: "Bittersweet, bubbly, citrusy",
      glass: "Wine glass",
      garnish: "Orange slice",
      baseSpirit: "Aperol",
    },
    mojito: {
      name: "Mojito",
      subtitle: "Mint, lime, and crushed daylight.",
      description:
        "A Cuban highball where mint and lime lift white rum into something tall, cold, and easy to revisit.",
      heroIngredients: ["White Rum", "Mint", "Lime"],
      ingredients: ["2 oz white rum", "1 oz lime juice", "3/4 oz simple syrup", "Mint leaves", "Soda water"],
      steps: [
        "Gently press mint with syrup and lime juice in a highball glass.",
        "Add rum and crushed ice.",
        "Top with soda water.",
        "Stir lightly and garnish with a mint sprig.",
      ],
      tags: ["mint", "refreshing", "highball", "rum"],
      flavor: "Fresh, citrusy, lightly sweet",
      glass: "Highball",
      garnish: "Mint sprig",
      baseSpirit: "White rum",
    },
  },
  "zh-CN": {
    negroni: {
      name: "内格罗尼",
      subtitle: "宝石红的苦甜，适合慢下来的夜晚。",
      description:
        "一杯紧凑而经典的意式鸡尾酒，金酒、金巴利和甜味美思等量组合，直接、草本、带着清晰的橙皮香气。",
      heroIngredients: ["金酒", "金巴利", "甜味美思"],
      ingredients: ["30 ml 金酒", "30 ml 金巴利", "30 ml 甜味美思", "橙皮"],
      steps: [
        "将金酒、金巴利和甜味美思倒入加冰的调酒杯。",
        "搅拌至充分冰镇。",
        "滤入放有大冰块的古典杯。",
        "挤压橙皮释放香气，并作为装饰。",
      ],
      tags: ["苦甜", "经典", "开胃酒", "搅拌"],
      flavor: "苦甜、草本、橙香明显",
      glass: "古典杯",
      garnish: "橙皮",
      baseSpirit: "金酒",
    },
    margarita: {
      name: "玛格丽塔",
      subtitle: "盐、青柠和干净明亮的龙舌兰。",
      description:
        "一杯清爽利落的酸型鸡尾酒，龙舌兰、橙味利口酒与新鲜青柠相互平衡，盐边让每一口更鲜明。",
      heroIngredients: ["龙舌兰", "青柠", "橙味利口酒"],
      ingredients: ["60 ml 白龙舌兰", "30 ml 青柠汁", "22.5 ml 橙味利口酒", "盐边"],
      steps: [
        "在冰镇过的杯口做半圈盐边。",
        "将龙舌兰、青柠汁和橙味利口酒加冰摇和。",
        "滤入准备好的杯中。",
        "可用青柠片装饰。",
      ],
      tags: ["柑橘", "清爽", "酸型", "龙舌兰"],
      flavor: "明亮、酸爽、微甜",
      glass: "浅碟杯或古典杯",
      garnish: "青柠片与盐边",
      baseSpirit: "龙舌兰",
    },
    "old-fashioned": {
      name: "古典鸡尾酒",
      subtitle: "威士忌、糖、苦精，以及耐心。",
      description:
        "一杯克制的威士忌经典，用少量甜味和苦精衬托基酒本身。配方看似简单，实际很考验平衡。",
      heroIngredients: ["威士忌", "糖", "苦精"],
      ingredients: ["60 ml 波本或黑麦威士忌", "1 茶匙浓糖浆", "2 滴安格斯图拉苦精", "橙皮"],
      steps: [
        "将糖浆和苦精加入古典杯。",
        "加入威士忌和一块大冰。",
        "短暂搅拌至冰镇并略微稀释。",
        "挤压橙皮释放香气，并作为装饰。",
      ],
      tags: ["烈酒感", "经典", "搅拌", "威士忌"],
      flavor: "温暖、橡木、微甜",
      glass: "古典杯",
      garnish: "橙皮",
      baseSpirit: "威士忌",
    },
    daiquiri: {
      name: "得其利",
      subtitle: "朗姆、青柠、糖，没有多余修饰。",
      description:
        "一杯干净的朗姆酸型鸡尾酒，证明三种材料也能构成完整风味。新鲜青柠和适量糖让它保持优雅。",
      heroIngredients: ["白朗姆", "青柠", "糖"],
      ingredients: ["60 ml 白朗姆", "30 ml 青柠汁", "22.5 ml 单糖浆"],
      steps: [
        "将朗姆、青柠汁和糖浆加入装冰的摇壶。",
        "用力摇至充分冰镇。",
        "细滤入冰镇过的浅碟杯。",
        "可不装饰，或用小片青柠装饰。",
      ],
      tags: ["柑橘", "简单", "摇和", "朗姆"],
      flavor: "清脆、酸爽、干净",
      glass: "浅碟杯",
      garnish: "可选青柠片",
      baseSpirit: "白朗姆",
    },
    "espresso-martini": {
      name: "浓缩马天尼",
      subtitle: "装在丝绒杯面里的夜间能量。",
      description:
        "一杯现代经典，伏特加、咖啡利口酒和新鲜浓缩咖啡构成深色光泽与细腻泡沫。",
      heroIngredients: ["伏特加", "浓缩咖啡", "咖啡利口酒"],
      ingredients: ["45 ml 伏特加", "30 ml 新鲜浓缩咖啡", "22.5 ml 咖啡利口酒", "7.5 ml 单糖浆"],
      steps: [
        "将所有材料加入装有大量冰块的摇壶。",
        "用力摇和以形成泡沫。",
        "细滤入冰镇马天尼杯。",
        "用三颗咖啡豆装饰。",
      ],
      tags: ["咖啡", "现代经典", "摇和", "夜晚"],
      flavor: "烘焙感、丝滑、微甜",
      glass: "马天尼杯",
      garnish: "咖啡豆",
      baseSpirit: "伏特加",
    },
    "aperol-spritz": {
      name: "阿佩罗橙光",
      subtitle: "打开窗时最适合的一杯橙色气泡。",
      description:
        "一杯轻松的意式开胃酒，阿佩罗、普罗塞克和苏打水叠出明亮橙色，适合漫长午后。",
      heroIngredients: ["普罗塞克", "阿佩罗", "苏打水"],
      ingredients: ["90 ml 普罗塞克", "60 ml 阿佩罗", "30 ml 苏打水", "橙片"],
      steps: [
        "在葡萄酒杯中加满冰块。",
        "先倒入普罗塞克，再加入阿佩罗。",
        "以苏打水补满并轻轻搅拌。",
        "用橙片装饰。",
      ],
      tags: ["气泡", "开胃酒", "低酒精", "橙味"],
      flavor: "苦甜、气泡感、柑橘味",
      glass: "葡萄酒杯",
      garnish: "橙片",
      baseSpirit: "阿佩罗",
    },
    mojito: {
      name: "莫吉托",
      subtitle: "薄荷、青柠，以及被敲碎的日光。",
      description:
        "一杯古巴高球，薄荷和青柠把白朗姆托起，清凉、修长，也很容易让人再来一杯。",
      heroIngredients: ["白朗姆", "薄荷", "青柠"],
      ingredients: ["60 ml 白朗姆", "30 ml 青柠汁", "22.5 ml 单糖浆", "薄荷叶", "苏打水"],
      steps: [
        "在高球杯中轻压薄荷、糖浆和青柠汁。",
        "加入朗姆和碎冰。",
        "以苏打水补满。",
        "轻轻搅拌，并用薄荷枝装饰。",
      ],
      tags: ["薄荷", "清爽", "高球", "朗姆"],
      flavor: "新鲜、柑橘、微甜",
      glass: "高球杯",
      garnish: "薄荷枝",
      baseSpirit: "白朗姆",
    },
  },
};

export function getAllCocktails(locale: Locale): Cocktail[] {
  return stableCocktails.map((stable) => ({
    ...stable,
    ...localizedCocktails[locale][stable.id],
  }));
}

export function getCocktail(locale: Locale, slug: string): Cocktail | undefined {
  return getAllCocktails(locale).find((cocktail) => cocktail.slug === slug);
}

type ScheduledItem = {
  date: string;
};

export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getScheduledCocktail<T extends ScheduledItem>(cocktails: T[], date = new Date()): T {
  const today = getLocalDateKey(date);
  const scheduled = cocktails.slice().sort((a, b) => a.date.localeCompare(b.date));
  const exact = scheduled.find((cocktail) => cocktail.date === today);

  if (exact) return exact;

  const published = scheduled.filter((cocktail) => cocktail.date <= today);
  return published[published.length - 1] ?? scheduled[0];
}

export function getPublishedCocktails<T extends ScheduledItem>(cocktails: T[], date = new Date()): T[] {
  const today = getLocalDateKey(date);
  return cocktails
    .filter((cocktail) => cocktail.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getDailyCocktail(locale: Locale, date = new Date()): Cocktail {
  return getScheduledCocktail(getAllCocktails(locale), date);
}

export function getCocktailSlugs() {
  return stableCocktails.map((cocktail) => cocktail.slug);
}
