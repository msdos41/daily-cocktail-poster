import type { Locale } from "@/i18n/config";

export type CocktailId =
  | "negroni"
  | "margarita"
  | "old-fashioned"
  | "daiquiri"
  | "espresso-martini"
  | "aperol-spritz"
  | "mojito"
  | "manhattan"
  | "sazerac"
  | "paloma"
  | "paper-plane"
  | "boulevardier"
  | "mai-tai"
  | "last-word"
  | "aviation"
  | "french-75"
  | "gin-martini"
  | "corpse-reviver-2"
  | "jungle-bird"
  | "naked-and-famous"
  | "sidecar"
  | "gimlet"
  | "whiskey-sour"
  | "caipirinha"
  | "pina-colada"
  | "bees-knees"
  | "penicillin"
  | "pisco-sour"
  | "painkiller"
  | "vieux-carre"
  | "singapore-sling"
  | "dark-n-stormy"
  | "rusty-nail";

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

type SceneOnlyCocktailConfig = Pick<StableCocktail, "id" | "date" | "glass" | "baseSpirit">;

function createSceneOnlyCocktail({ id, date, glass, baseSpirit }: SceneOnlyCocktailConfig): StableCocktail {
  const sceneDesktop = `/images/cocktails/${id}-scene-desktop.svg`;
  const sceneMobile = `/images/cocktails/${id}-scene-mobile.svg`;

  return {
    id,
    slug: id,
    date,
    image: sceneMobile,
    heroImageDesktop: sceneDesktop,
    heroImageMobile: sceneMobile,
    backgroundDownloadDesktop: sceneDesktop,
    backgroundDownloadMobile: sceneMobile,
    posterImage: sceneMobile,
    shareBaseImage: sceneMobile,
    glass,
    baseSpirit,
  };
}

const stableCocktails: StableCocktail[] = [
  {
    id: "negroni",
    slug: "negroni",
    date: "2026-06-24",
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
    date: "2026-06-15",
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
    date: "2026-06-06",
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
    date: "2026-06-23",
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
    date: "2026-06-03",
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
    date: "2026-06-28",
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
    image: "/images/cocktails/mojito-scene-mobile.webp",
    heroImageDesktop: "/images/cocktails/mojito-scene-desktop.webp",
    heroImageMobile: "/images/cocktails/mojito-scene-mobile.webp",
    backgroundDownloadDesktop: "/images/cocktails/mojito-scene-desktop.webp",
    backgroundDownloadMobile: "/images/cocktails/mojito-scene-mobile.webp",
    posterImage: "/images/cocktails/mojito-scene-mobile.webp",
    shareBaseImage: "/images/cocktails/mojito-scene-mobile.webp",
    glass: "highball",
    baseSpirit: "white rum",
  },
  {
    id: "manhattan",
    slug: "manhattan",
    date: "2026-05-31",
    image: "/images/cocktails/manhattan-scene-mobile.webp",
    heroImageDesktop: "/images/cocktails/manhattan-scene-desktop.webp",
    heroImageMobile: "/images/cocktails/manhattan-scene-mobile.webp",
    backgroundDownloadDesktop: "/images/cocktails/manhattan-scene-desktop.webp",
    backgroundDownloadMobile: "/images/cocktails/manhattan-scene-mobile.webp",
    posterImage: "/images/cocktails/manhattan-scene-mobile.webp",
    shareBaseImage: "/images/cocktails/manhattan-scene-mobile.webp",
    glass: "coupe",
    baseSpirit: "rye whiskey",
  },
  {
    id: "sazerac",
    slug: "sazerac",
    date: "2026-06-01",
    image: "/images/cocktails/sazerac-scene-mobile.webp",
    heroImageDesktop: "/images/cocktails/sazerac-scene-desktop.webp",
    heroImageMobile: "/images/cocktails/sazerac-scene-mobile.webp",
    backgroundDownloadDesktop: "/images/cocktails/sazerac-scene-desktop.webp",
    backgroundDownloadMobile: "/images/cocktails/sazerac-scene-mobile.webp",
    posterImage: "/images/cocktails/sazerac-scene-mobile.webp",
    shareBaseImage: "/images/cocktails/sazerac-scene-mobile.webp",
    glass: "rocks",
    baseSpirit: "rye whiskey",
  },
  createSceneOnlyCocktail({
    id: "paloma",
    date: "2026-06-02",
    glass: "highball",
    baseSpirit: "tequila",
  }),
  createSceneOnlyCocktail({
    id: "paper-plane",
    date: "2026-06-19",
    glass: "coupe",
    baseSpirit: "bourbon",
  }),
  createSceneOnlyCocktail({
    id: "boulevardier",
    date: "2026-06-09",
    glass: "rocks",
    baseSpirit: "bourbon",
  }),
  createSceneOnlyCocktail({
    id: "mai-tai",
    date: "2026-06-05",
    glass: "rocks",
    baseSpirit: "rum",
  }),
  createSceneOnlyCocktail({
    id: "last-word",
    date: "2026-06-04",
    glass: "coupe",
    baseSpirit: "gin",
  }),
  createSceneOnlyCocktail({
    id: "aviation",
    date: "2026-06-22",
    glass: "coupe",
    baseSpirit: "gin",
  }),
  createSceneOnlyCocktail({
    id: "french-75",
    date: "2026-06-13",
    glass: "flute",
    baseSpirit: "gin",
  }),
  createSceneOnlyCocktail({
    id: "gin-martini",
    date: "2026-06-27",
    glass: "martini",
    baseSpirit: "gin",
  }),
  createSceneOnlyCocktail({
    id: "corpse-reviver-2",
    date: "2026-06-17",
    glass: "coupe",
    baseSpirit: "gin",
  }),
  createSceneOnlyCocktail({
    id: "jungle-bird",
    date: "2026-06-30",
    glass: "rocks",
    baseSpirit: "dark rum",
  }),
  createSceneOnlyCocktail({
    id: "naked-and-famous",
    date: "2026-06-12",
    glass: "coupe",
    baseSpirit: "mezcal",
  }),
  createSceneOnlyCocktail({
    id: "sidecar",
    date: "2026-06-11",
    glass: "coupe",
    baseSpirit: "cognac",
  }),
  createSceneOnlyCocktail({
    id: "gimlet",
    date: "2026-06-20",
    glass: "coupe",
    baseSpirit: "gin",
  }),
  createSceneOnlyCocktail({
    id: "whiskey-sour",
    date: "2026-06-29",
    glass: "rocks",
    baseSpirit: "bourbon",
  }),
  createSceneOnlyCocktail({
    id: "caipirinha",
    date: "2026-06-08",
    glass: "rocks",
    baseSpirit: "cachaca",
  }),
  createSceneOnlyCocktail({
    id: "pina-colada",
    date: "2026-06-14",
    glass: "hurricane",
    baseSpirit: "rum",
  }),
  createSceneOnlyCocktail({
    id: "bees-knees",
    date: "2026-06-07",
    glass: "coupe",
    baseSpirit: "gin",
  }),
  createSceneOnlyCocktail({
    id: "penicillin",
    date: "2026-06-21",
    glass: "rocks",
    baseSpirit: "scotch",
  }),
  createSceneOnlyCocktail({
    id: "pisco-sour",
    date: "2026-06-26",
    glass: "coupe",
    baseSpirit: "pisco",
  }),
  createSceneOnlyCocktail({
    id: "painkiller",
    date: "2026-06-18",
    glass: "tiki mug",
    baseSpirit: "dark rum",
  }),
  createSceneOnlyCocktail({
    id: "vieux-carre",
    date: "2026-07-01",
    glass: "rocks",
    baseSpirit: "rye whiskey",
  }),
  createSceneOnlyCocktail({
    id: "singapore-sling",
    date: "2026-06-10",
    glass: "highball",
    baseSpirit: "gin",
  }),
  createSceneOnlyCocktail({
    id: "dark-n-stormy",
    date: "2026-06-25",
    glass: "highball",
    baseSpirit: "dark rum",
  }),
  createSceneOnlyCocktail({
    id: "rusty-nail",
    date: "2026-06-16",
    glass: "rocks",
    baseSpirit: "scotch",
  }),
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
    manhattan: {
      name: "Manhattan",
      subtitle: "Rye, vermouth, and a polished cherry glow.",
      description:
        "A stirred whiskey classic where rye, sweet vermouth, and bitters meet in a clean, aromatic pour. It is compact, elegant, and endlessly worth revisiting.",
      heroIngredients: ["Rye Whiskey", "Sweet Vermouth", "Bitters"],
      ingredients: ["2 oz rye whiskey", "1 oz sweet vermouth", "2 dashes Angostura bitters", "Brandied cherry"],
      steps: [
        "Add whiskey, vermouth, and bitters to a mixing glass with ice.",
        "Stir until very cold and lightly diluted.",
        "Strain into a chilled coupe.",
        "Garnish with a brandied cherry.",
      ],
      tags: ["classic", "stirred", "spirit-forward", "whiskey"],
      flavor: "Smooth, herbal, gently sweet",
      glass: "Coupe",
      garnish: "Brandied cherry",
      baseSpirit: "Rye whiskey",
    },
    sazerac: {
      name: "Sazerac",
      subtitle: "Rye spice under an absinthe veil.",
      description:
        "A New Orleans icon with rye whiskey, Peychaud's bitters, sugar, and a whisper of absinthe. It is potent, aromatic, and built for slow attention.",
      heroIngredients: ["Rye Whiskey", "Peychaud's", "Absinthe"],
      ingredients: ["2 oz rye whiskey", "1/4 oz simple syrup", "3 dashes Peychaud's bitters", "Absinthe rinse", "Lemon peel"],
      steps: [
        "Rinse a chilled rocks glass with absinthe and discard the excess.",
        "Stir rye, syrup, and bitters with ice.",
        "Strain into the prepared glass without ice.",
        "Express a lemon peel over the drink and discard or garnish.",
      ],
      tags: ["classic", "stirred", "spirit-forward", "new-orleans"],
      flavor: "Spicy, herbal, anise-led",
      glass: "Rocks glass",
      garnish: "Lemon peel",
      baseSpirit: "Rye whiskey",
    },
    paloma: {
      name: "Paloma",
      subtitle: "Tequila, grapefruit, and salted sunshine.",
      description:
        "A tall tequila drink with lime, salt, and grapefruit soda. It is bright, bitter-edged, and one of the easiest ways to make citrus feel relaxed.",
      heroIngredients: ["Tequila", "Grapefruit", "Lime"],
      ingredients: ["2 oz blanco tequila", "1/2 oz lime juice", "Pinch of salt", "Grapefruit soda", "Grapefruit wedge"],
      steps: [
        "Add tequila, lime juice, and salt to a highball glass.",
        "Fill with ice and top with grapefruit soda.",
        "Stir gently to combine.",
        "Garnish with a grapefruit wedge.",
      ],
      tags: ["refreshing", "citrus", "highball", "tequila"],
      flavor: "Tart, bright, lightly bitter",
      glass: "Highball",
      garnish: "Grapefruit wedge",
      baseSpirit: "Tequila",
    },
    "paper-plane": {
      name: "Paper Plane",
      subtitle: "Equal parts, bittersweet lift.",
      description:
        "A modern equal-parts cocktail where bourbon, Aperol, amaro, and lemon lock into a clean bittersweet sour. It feels effortless because the balance is doing the work.",
      heroIngredients: ["Bourbon", "Aperol", "Lemon"],
      ingredients: ["3/4 oz bourbon", "3/4 oz Aperol", "3/4 oz Amaro Nonino", "3/4 oz lemon juice"],
      steps: [
        "Add all ingredients to a shaker with ice.",
        "Shake until cold.",
        "Fine strain into a chilled coupe.",
        "Serve without garnish.",
      ],
      tags: ["modern classic", "bittersweet", "equal-parts", "shaken"],
      flavor: "Bright, bitter-orange, balanced",
      glass: "Coupe",
      garnish: "None",
      baseSpirit: "Bourbon",
    },
    boulevardier: {
      name: "Boulevardier",
      subtitle: "Negroni's whiskey-lit cousin.",
      description:
        "A whiskey variation on the Negroni template, trading gin's snap for bourbon warmth. Campari keeps the finish bitter, clean, and memorable.",
      heroIngredients: ["Bourbon", "Campari", "Sweet Vermouth"],
      ingredients: ["1 1/2 oz bourbon", "1 oz Campari", "1 oz sweet vermouth", "Orange peel"],
      steps: [
        "Add bourbon, Campari, and vermouth to a mixing glass with ice.",
        "Stir until well chilled.",
        "Strain over a large cube in a rocks glass.",
        "Express an orange peel and garnish.",
      ],
      tags: ["bitter", "stirred", "whiskey", "aperitif"],
      flavor: "Bittersweet, warm, orange-led",
      glass: "Rocks glass",
      garnish: "Orange peel",
      baseSpirit: "Bourbon",
    },
    "mai-tai": {
      name: "Mai Tai",
      subtitle: "Rum, lime, orgeat, and island depth.",
      description:
        "A tiki classic that lets good rum carry almond, citrus, and orange notes. It is tropical without being lazy, layered without becoming heavy.",
      heroIngredients: ["Rum", "Lime", "Orgeat"],
      ingredients: ["2 oz aged rum", "3/4 oz lime juice", "1/2 oz orange curacao", "1/2 oz orgeat", "Mint sprig"],
      steps: [
        "Add rum, lime, curacao, and orgeat to a shaker with crushed ice.",
        "Shake briefly until chilled.",
        "Pour into a rocks glass with more crushed ice.",
        "Garnish with mint and a lime shell.",
      ],
      tags: ["tiki", "rum", "citrus", "nutty"],
      flavor: "Funky, tart, almond-rich",
      glass: "Rocks glass",
      garnish: "Mint sprig and lime shell",
      baseSpirit: "Rum",
    },
    "last-word": {
      name: "Last Word",
      subtitle: "Gin, herbs, cherry, and lime in balance.",
      description:
        "A precise equal-parts classic where gin, green Chartreuse, maraschino, and lime create a vivid herbal sour with a long finish.",
      heroIngredients: ["Gin", "Chartreuse", "Lime"],
      ingredients: ["3/4 oz gin", "3/4 oz green Chartreuse", "3/4 oz maraschino liqueur", "3/4 oz lime juice"],
      steps: [
        "Add all ingredients to a shaker with ice.",
        "Shake hard until cold.",
        "Fine strain into a chilled coupe.",
        "Serve without garnish.",
      ],
      tags: ["herbal", "equal-parts", "classic", "shaken"],
      flavor: "Herbal, tart, lightly sweet",
      glass: "Coupe",
      garnish: "None",
      baseSpirit: "Gin",
    },
    aviation: {
      name: "Aviation",
      subtitle: "A pale violet gin sour.",
      description:
        "A floral gin classic with lemon, maraschino, and a measured touch of creme de violette. It is delicate, tart, and visually unmistakable.",
      heroIngredients: ["Gin", "Lemon", "Violette"],
      ingredients: ["2 oz gin", "3/4 oz lemon juice", "1/2 oz maraschino liqueur", "1/4 oz creme de violette"],
      steps: [
        "Add all ingredients to a shaker with ice.",
        "Shake until very cold.",
        "Fine strain into a chilled coupe.",
        "Garnish with a cherry if desired.",
      ],
      tags: ["floral", "gin", "classic", "shaken"],
      flavor: "Floral, tart, lightly cherry",
      glass: "Coupe",
      garnish: "Optional cherry",
      baseSpirit: "Gin",
    },
    "french-75": {
      name: "French 75",
      subtitle: "Gin, lemon, and Champagne brightness.",
      description:
        "A sparkling classic that turns a gin sour into something crisp and celebratory. Lemon keeps it sharp, while bubbles make it feel light.",
      heroIngredients: ["Gin", "Lemon", "Champagne"],
      ingredients: ["1 oz gin", "1/2 oz lemon juice", "1/2 oz simple syrup", "Champagne", "Lemon twist"],
      steps: [
        "Shake gin, lemon juice, and syrup with ice.",
        "Strain into a flute.",
        "Top with chilled Champagne.",
        "Garnish with a lemon twist.",
      ],
      tags: ["sparkling", "classic", "citrus", "celebration"],
      flavor: "Crisp, bright, dry",
      glass: "Flute",
      garnish: "Lemon twist",
      baseSpirit: "Gin",
    },
    "gin-martini": {
      name: "Gin Martini",
      subtitle: "Cold gin, dry vermouth, clean focus.",
      description:
        "A minimalist stirred cocktail where temperature, dilution, and proportion matter. Dry vermouth frames the gin without hiding it.",
      heroIngredients: ["Gin", "Dry Vermouth", "Lemon"],
      ingredients: ["2 1/2 oz gin", "1/2 oz dry vermouth", "1 dash orange bitters", "Lemon twist or olive"],
      steps: [
        "Add gin, vermouth, and bitters to a mixing glass with ice.",
        "Stir until icy cold.",
        "Strain into a chilled martini glass.",
        "Garnish with a lemon twist or olive.",
      ],
      tags: ["classic", "stirred", "spirit-forward", "gin"],
      flavor: "Dry, crisp, botanical",
      glass: "Martini glass",
      garnish: "Lemon twist or olive",
      baseSpirit: "Gin",
    },
    "corpse-reviver-2": {
      name: "Corpse Reviver #2",
      subtitle: "A crisp gin sour with an absinthe edge.",
      description:
        "A pre-Prohibition revival drink with gin, orange liqueur, aromatized wine, lemon, and a light absinthe rinse. It is sharp, bright, and neatly bitter.",
      heroIngredients: ["Gin", "Lemon", "Absinthe"],
      ingredients: ["3/4 oz gin", "3/4 oz Cointreau", "3/4 oz Cocchi Americano", "3/4 oz lemon juice", "Absinthe rinse"],
      steps: [
        "Rinse a chilled coupe with absinthe and discard the excess.",
        "Shake gin, Cointreau, Cocchi Americano, and lemon with ice.",
        "Fine strain into the prepared glass.",
        "Serve immediately while very cold.",
      ],
      tags: ["classic", "citrus", "gin", "shaken"],
      flavor: "Tart, aromatic, lightly bitter",
      glass: "Coupe",
      garnish: "None",
      baseSpirit: "Gin",
    },
    "jungle-bird": {
      name: "Jungle Bird",
      subtitle: "Pineapple, rum, and Campari bite.",
      description:
        "A tropical drink with enough bitterness to stay focused. Dark rum and pineapple bring depth, while Campari keeps the finish vivid.",
      heroIngredients: ["Dark Rum", "Pineapple", "Campari"],
      ingredients: ["1 1/2 oz dark rum", "1 1/2 oz pineapple juice", "3/4 oz Campari", "1/2 oz lime juice", "1/2 oz simple syrup"],
      steps: [
        "Add all ingredients to a shaker with ice.",
        "Shake until cold and lightly frothy.",
        "Strain into a rocks glass over ice.",
        "Garnish with pineapple leaves or a lime wheel.",
      ],
      tags: ["tropical", "bitter", "rum", "shaken"],
      flavor: "Fruity, bitter, rum-rich",
      glass: "Rocks glass",
      garnish: "Pineapple leaves or lime",
      baseSpirit: "Dark rum",
    },
    "naked-and-famous": {
      name: "Naked and Famous",
      subtitle: "Smoky mezcal, Aperol, herbs, and lime.",
      description:
        "A modern equal-parts cocktail that combines mezcal smoke with Aperol, yellow Chartreuse, and lime. It is compact, vivid, and highly aromatic.",
      heroIngredients: ["Mezcal", "Aperol", "Lime"],
      ingredients: ["3/4 oz mezcal", "3/4 oz Aperol", "3/4 oz yellow Chartreuse", "3/4 oz lime juice"],
      steps: [
        "Add all ingredients to a shaker with ice.",
        "Shake until well chilled.",
        "Fine strain into a chilled coupe.",
        "Serve without garnish.",
      ],
      tags: ["modern classic", "smoky", "equal-parts", "shaken"],
      flavor: "Smoky, bittersweet, herbal",
      glass: "Coupe",
      garnish: "None",
      baseSpirit: "Mezcal",
    },
    sidecar: {
      name: "Sidecar",
      subtitle: "Cognac, lemon, and orange clarity.",
      description:
        "A bright cognac sour with orange liqueur and lemon. The drink is simple, polished, and sharper than its sugared rim suggests.",
      heroIngredients: ["Cognac", "Lemon", "Orange Liqueur"],
      ingredients: ["2 oz cognac", "3/4 oz Cointreau", "3/4 oz lemon juice", "Optional sugar rim"],
      steps: [
        "Prepare a chilled coupe with a partial sugar rim if desired.",
        "Shake cognac, Cointreau, and lemon juice with ice.",
        "Fine strain into the glass.",
        "Garnish with an orange twist.",
      ],
      tags: ["classic", "citrus", "cognac", "shaken"],
      flavor: "Tart, rounded, orange-bright",
      glass: "Coupe",
      garnish: "Orange twist",
      baseSpirit: "Cognac",
    },
    gimlet: {
      name: "Gimlet",
      subtitle: "Gin and lime, cut clean.",
      description:
        "An old-school gin sour that keeps the focus on lime and botanicals. It is cold, compact, and satisfying without extra decoration.",
      heroIngredients: ["Gin", "Lime", "Sugar"],
      ingredients: ["2 oz gin", "3/4 oz lime juice", "3/4 oz simple syrup"],
      steps: [
        "Add gin, lime juice, and syrup to a shaker with ice.",
        "Shake until very cold.",
        "Fine strain into a chilled coupe.",
        "Garnish with a lime wheel if desired.",
      ],
      tags: ["classic", "citrus", "gin", "simple"],
      flavor: "Crisp, tart, botanical",
      glass: "Coupe",
      garnish: "Optional lime wheel",
      baseSpirit: "Gin",
    },
    "whiskey-sour": {
      name: "Whiskey Sour",
      subtitle: "Bourbon, lemon, and a soft foam line.",
      description:
        "A foundational sour that balances whiskey warmth with lemon and sugar. Egg white is optional, but it gives the drink its classic silky top.",
      heroIngredients: ["Bourbon", "Lemon", "Sugar"],
      ingredients: ["2 oz bourbon", "3/4 oz lemon juice", "3/4 oz simple syrup", "1 egg white", "Angostura bitters"],
      steps: [
        "Dry shake bourbon, lemon, syrup, and egg white without ice.",
        "Add ice and shake again until cold.",
        "Strain into a rocks glass over fresh ice.",
        "Garnish with bitters.",
      ],
      tags: ["classic", "sour", "whiskey", "shaken"],
      flavor: "Tart, warm, lightly sweet",
      glass: "Rocks glass",
      garnish: "Angostura bitters",
      baseSpirit: "Bourbon",
    },
    caipirinha: {
      name: "Caipirinha",
      subtitle: "Cachaca, lime, sugar, and crushed rhythm.",
      description:
        "Brazil's direct, bright cocktail built from cachaca, lime, and sugar. It is rustic, grassy, and best when the lime oils stay alive.",
      heroIngredients: ["Cachaca", "Lime", "Sugar"],
      ingredients: ["2 oz cachaca", "1 lime, cut into wedges", "2 tsp sugar"],
      steps: [
        "Muddle lime wedges and sugar in a rocks glass.",
        "Add cachaca and crushed ice.",
        "Stir until cold and integrated.",
        "Serve with the lime pieces in the glass.",
      ],
      tags: ["citrus", "refreshing", "cachaca", "built"],
      flavor: "Grassy, tart, lightly sweet",
      glass: "Rocks glass",
      garnish: "Lime wedges",
      baseSpirit: "Cachaca",
    },
    "pina-colada": {
      name: "Pina Colada",
      subtitle: "Pineapple, coconut, and rum in full sun.",
      description:
        "A creamy tropical classic that works best when pineapple stays bright and the coconut is rich but controlled.",
      heroIngredients: ["Rum", "Pineapple", "Coconut"],
      ingredients: ["2 oz rum", "1 1/2 oz pineapple juice", "1 oz cream of coconut", "1/2 oz lime juice", "Pineapple wedge"],
      steps: [
        "Add rum, pineapple, coconut, lime, and crushed ice to a blender.",
        "Blend until smooth and cold.",
        "Pour into a hurricane glass.",
        "Garnish with pineapple.",
      ],
      tags: ["tropical", "creamy", "rum", "blended"],
      flavor: "Rich, fruity, coconut-sweet",
      glass: "Hurricane glass",
      garnish: "Pineapple wedge",
      baseSpirit: "Rum",
    },
    "bees-knees": {
      name: "Bee's Knees",
      subtitle: "Gin, lemon, honey, and clean lift.",
      description:
        "A Prohibition-era gin sour softened by honey syrup. It is simple, fragrant, and brighter than its small ingredient list suggests.",
      heroIngredients: ["Gin", "Lemon", "Honey"],
      ingredients: ["2 oz gin", "3/4 oz lemon juice", "3/4 oz honey syrup"],
      steps: [
        "Add gin, lemon juice, and honey syrup to a shaker with ice.",
        "Shake until cold.",
        "Fine strain into a chilled coupe.",
        "Garnish with a lemon twist if desired.",
      ],
      tags: ["classic", "gin", "honey", "shaken"],
      flavor: "Floral, tart, honeyed",
      glass: "Coupe",
      garnish: "Optional lemon twist",
      baseSpirit: "Gin",
    },
    penicillin: {
      name: "Penicillin",
      subtitle: "Scotch, ginger, honey, and smoke.",
      description:
        "A modern whiskey sour with blended Scotch, lemon, honey-ginger syrup, and an Islay float. It is warming, spicy, and smoky at the edge.",
      heroIngredients: ["Scotch", "Ginger", "Honey"],
      ingredients: ["2 oz blended Scotch", "3/4 oz lemon juice", "3/4 oz honey-ginger syrup", "1/4 oz Islay Scotch float", "Candied ginger"],
      steps: [
        "Shake blended Scotch, lemon, and honey-ginger syrup with ice.",
        "Strain into a rocks glass over fresh ice.",
        "Float Islay Scotch over the top.",
        "Garnish with candied ginger.",
      ],
      tags: ["modern classic", "smoky", "ginger", "whiskey"],
      flavor: "Smoky, spicy, honeyed",
      glass: "Rocks glass",
      garnish: "Candied ginger",
      baseSpirit: "Scotch",
    },
    "pisco-sour": {
      name: "Pisco Sour",
      subtitle: "Pisco, lime, and bitters over foam.",
      description:
        "A South American sour where pisco's grape character meets lime, sugar, and a silky egg-white cap finished with bitters.",
      heroIngredients: ["Pisco", "Lime", "Bitters"],
      ingredients: ["2 oz pisco", "3/4 oz lime juice", "3/4 oz simple syrup", "1 egg white", "Angostura bitters"],
      steps: [
        "Dry shake pisco, lime, syrup, and egg white without ice.",
        "Add ice and shake again until cold.",
        "Strain into a chilled coupe.",
        "Dot the foam with bitters.",
      ],
      tags: ["sour", "pisco", "foamy", "classic"],
      flavor: "Tart, floral, silky",
      glass: "Coupe",
      garnish: "Angostura bitters",
      baseSpirit: "Pisco",
    },
    painkiller: {
      name: "Painkiller",
      subtitle: "Rum, pineapple, coconut, and nutmeg.",
      description:
        "A rich tropical long drink with dark rum, pineapple, orange, coconut, and nutmeg. It is plush, sunny, and generous.",
      heroIngredients: ["Dark Rum", "Pineapple", "Coconut"],
      ingredients: ["2 oz dark rum", "4 oz pineapple juice", "1 oz orange juice", "1 oz cream of coconut", "Nutmeg"],
      steps: [
        "Shake rum, pineapple, orange, and coconut with ice.",
        "Pour into a tiki mug or tall glass over crushed ice.",
        "Top with freshly grated nutmeg.",
        "Garnish with pineapple or orange if desired.",
      ],
      tags: ["tropical", "rum", "creamy", "long drink"],
      flavor: "Rich, fruity, spiced",
      glass: "Tiki mug",
      garnish: "Fresh nutmeg",
      baseSpirit: "Dark rum",
    },
    "vieux-carre": {
      name: "Vieux Carre",
      subtitle: "Rye, cognac, vermouth, and New Orleans depth.",
      description:
        "A rich stirred classic with rye, cognac, sweet vermouth, Benedictine, and bitters. It is layered, aromatic, and quietly luxurious.",
      heroIngredients: ["Rye", "Cognac", "Vermouth"],
      ingredients: ["3/4 oz rye whiskey", "3/4 oz cognac", "3/4 oz sweet vermouth", "1/4 oz Benedictine", "Peychaud's and Angostura bitters"],
      steps: [
        "Add all ingredients to a mixing glass with ice.",
        "Stir until well chilled.",
        "Strain over a large cube in a rocks glass.",
        "Garnish with a lemon twist.",
      ],
      tags: ["classic", "stirred", "new-orleans", "spirit-forward"],
      flavor: "Rich, herbal, warming",
      glass: "Rocks glass",
      garnish: "Lemon twist",
      baseSpirit: "Rye whiskey",
    },
    "singapore-sling": {
      name: "Singapore Sling",
      subtitle: "Gin, cherry, pineapple, and a long pink glow.",
      description:
        "A tropical gin long drink with cherry, citrus, pineapple, and spice. It is colorful, structured, and more layered than it first appears.",
      heroIngredients: ["Gin", "Cherry", "Pineapple"],
      ingredients: ["1 1/2 oz gin", "1/2 oz cherry liqueur", "1/4 oz Cointreau", "1/4 oz Benedictine", "2 oz pineapple juice", "1/2 oz lime juice", "Grenadine and bitters"],
      steps: [
        "Shake all ingredients with ice.",
        "Strain into a highball glass over fresh ice.",
        "Top with a small splash of soda if desired.",
        "Garnish with a cherry and pineapple.",
      ],
      tags: ["tropical", "gin", "long drink", "fruity"],
      flavor: "Fruity, spiced, lightly tart",
      glass: "Highball",
      garnish: "Cherry and pineapple",
      baseSpirit: "Gin",
    },
    "dark-n-stormy": {
      name: "Dark 'n' Stormy",
      subtitle: "Dark rum riding over ginger heat.",
      description:
        "A tall, spicy highball of dark rum, ginger beer, and lime. It is direct, refreshing, and built around the bite of ginger.",
      heroIngredients: ["Dark Rum", "Ginger Beer", "Lime"],
      ingredients: ["2 oz dark rum", "1/2 oz lime juice", "Ginger beer", "Lime wedge"],
      steps: [
        "Fill a highball glass with ice.",
        "Add lime juice and ginger beer.",
        "Float dark rum over the top.",
        "Garnish with a lime wedge.",
      ],
      tags: ["highball", "ginger", "rum", "refreshing"],
      flavor: "Spicy, dark, citrusy",
      glass: "Highball",
      garnish: "Lime wedge",
      baseSpirit: "Dark rum",
    },
    "rusty-nail": {
      name: "Rusty Nail",
      subtitle: "Scotch and honeyed heather warmth.",
      description:
        "A two-ingredient classic pairing Scotch with Drambuie. It is simple, strong, and more complex than its build suggests.",
      heroIngredients: ["Scotch", "Drambuie", "Lemon"],
      ingredients: ["2 oz Scotch", "1/2 oz Drambuie", "Lemon peel"],
      steps: [
        "Add Scotch and Drambuie to a mixing glass with ice.",
        "Stir until cold.",
        "Strain over a large cube in a rocks glass.",
        "Express a lemon peel over the drink.",
      ],
      tags: ["classic", "two-ingredient", "stirred", "scotch"],
      flavor: "Honeyed, smoky, warming",
      glass: "Rocks glass",
      garnish: "Lemon peel",
      baseSpirit: "Scotch",
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
    manhattan: {
      name: "曼哈顿",
      subtitle: "黑麦威士忌、美思与樱桃光泽。",
      description:
        "一杯搅拌型威士忌经典，黑麦威士忌、甜味美思和苦精组成干净而有香气的酒体，优雅、紧凑，也很耐喝。",
      heroIngredients: ["黑麦威士忌", "甜味美思", "苦精"],
      ingredients: ["60 ml 黑麦威士忌", "30 ml 甜味美思", "2 滴安格斯图拉苦精", "酒渍樱桃"],
      steps: [
        "将威士忌、美思和苦精倒入加冰的调酒杯。",
        "搅拌至充分冰镇并略微稀释。",
        "滤入冰镇过的浅碟杯。",
        "用酒渍樱桃装饰。",
      ],
      tags: ["经典", "搅拌", "烈酒感", "威士忌"],
      flavor: "顺滑、草本、微甜",
      glass: "浅碟杯",
      garnish: "酒渍樱桃",
      baseSpirit: "黑麦威士忌",
    },
    sazerac: {
      name: "萨泽拉克",
      subtitle: "黑麦辛香覆上一层苦艾气息。",
      description:
        "新奥尔良经典，黑麦威士忌、Peychaud's 苦精、糖和少量苦艾酒组成浓烈而有辨识度的一杯。",
      heroIngredients: ["黑麦威士忌", "Peychaud's", "苦艾酒"],
      ingredients: ["60 ml 黑麦威士忌", "7.5 ml 单糖浆", "3 滴 Peychaud's 苦精", "苦艾酒润杯", "柠檬皮"],
      steps: [
        "用苦艾酒润过冰镇的古典杯，并倒掉多余部分。",
        "将黑麦威士忌、糖浆和苦精加冰搅拌。",
        "滤入准备好的杯中，不加冰。",
        "挤压柠檬皮释放香气，可丢弃或装饰。",
      ],
      tags: ["经典", "搅拌", "烈酒感", "新奥尔良"],
      flavor: "辛香、草本、茴香感",
      glass: "古典杯",
      garnish: "柠檬皮",
      baseSpirit: "黑麦威士忌",
    },
    paloma: {
      name: "帕洛玛",
      subtitle: "龙舌兰、葡萄柚和一点盐的阳光感。",
      description:
        "一杯高球型龙舌兰饮品，青柠、盐和葡萄柚汽水让酒体明亮、清爽，并带一点轻微苦味。",
      heroIngredients: ["龙舌兰", "葡萄柚", "青柠"],
      ingredients: ["60 ml 白龙舌兰", "15 ml 青柠汁", "一小撮盐", "葡萄柚汽水", "葡萄柚角"],
      steps: [
        "在高球杯中加入龙舌兰、青柠汁和盐。",
        "加冰后以葡萄柚汽水补满。",
        "轻轻搅拌。",
        "用葡萄柚角装饰。",
      ],
      tags: ["清爽", "柑橘", "高球", "龙舌兰"],
      flavor: "酸爽、明亮、微苦",
      glass: "高球杯",
      garnish: "葡萄柚角",
      baseSpirit: "龙舌兰",
    },
    "paper-plane": {
      name: "纸飞机",
      subtitle: "等量配方，苦甜起飞。",
      description:
        "一杯现代经典，波本、Aperol、阿玛罗和柠檬以等量组合，形成干净、苦甜而平衡的酸型鸡尾酒。",
      heroIngredients: ["波本", "Aperol", "柠檬"],
      ingredients: ["22.5 ml 波本", "22.5 ml Aperol", "22.5 ml Amaro Nonino", "22.5 ml 柠檬汁"],
      steps: [
        "将所有材料加入装冰的摇壶。",
        "摇至充分冰镇。",
        "细滤入冰镇过的浅碟杯。",
        "不需装饰。",
      ],
      tags: ["现代经典", "苦甜", "等量配方", "摇和"],
      flavor: "明亮、苦橙、平衡",
      glass: "浅碟杯",
      garnish: "无",
      baseSpirit: "波本",
    },
    boulevardier: {
      name: "布尔瓦迪耶",
      subtitle: "带威士忌温度的尼格罗尼近亲。",
      description:
        "以波本替代金酒的尼格罗尼变体，威士忌带来温暖厚度，金巴利保留清晰的苦味收尾。",
      heroIngredients: ["波本", "金巴利", "甜味美思"],
      ingredients: ["45 ml 波本", "30 ml 金巴利", "30 ml 甜味美思", "橙皮"],
      steps: [
        "将波本、金巴利和甜味美思倒入加冰的调酒杯。",
        "搅拌至充分冰镇。",
        "滤入放有大冰块的古典杯。",
        "挤压橙皮并装饰。",
      ],
      tags: ["苦味", "搅拌", "威士忌", "开胃酒"],
      flavor: "苦甜、温暖、橙香明显",
      glass: "古典杯",
      garnish: "橙皮",
      baseSpirit: "波本",
    },
    "mai-tai": {
      name: "迈泰",
      subtitle: "朗姆、青柠、杏仁糖浆和海岛层次。",
      description:
        "一杯 tiki 经典，让好朗姆撑起杏仁、柑橘和橙香。它有热带感，但并不松散。",
      heroIngredients: ["朗姆", "青柠", "杏仁糖浆"],
      ingredients: ["60 ml 陈年朗姆", "22.5 ml 青柠汁", "15 ml 橙味利口酒", "15 ml 杏仁糖浆", "薄荷枝"],
      steps: [
        "将朗姆、青柠汁、橙味利口酒和杏仁糖浆加碎冰摇和。",
        "短摇至冰镇。",
        "连冰倒入古典杯，并补充碎冰。",
        "用薄荷和青柠壳装饰。",
      ],
      tags: ["tiki", "朗姆", "柑橘", "坚果感"],
      flavor: "浓郁、酸爽、杏仁感",
      glass: "古典杯",
      garnish: "薄荷枝和青柠壳",
      baseSpirit: "朗姆",
    },
    "last-word": {
      name: "最后一言",
      subtitle: "金酒、草本、樱桃与青柠的平衡。",
      description:
        "一杯等量配方经典，金酒、绿 Chartreuse、黑樱桃利口酒和青柠组合出鲜明的草本酸甜感。",
      heroIngredients: ["金酒", "Chartreuse", "青柠"],
      ingredients: ["22.5 ml 金酒", "22.5 ml 绿 Chartreuse", "22.5 ml 黑樱桃利口酒", "22.5 ml 青柠汁"],
      steps: [
        "将所有材料加入装冰的摇壶。",
        "用力摇至冰镇。",
        "细滤入冰镇过的浅碟杯。",
        "不需装饰。",
      ],
      tags: ["草本", "等量配方", "经典", "摇和"],
      flavor: "草本、酸爽、微甜",
      glass: "浅碟杯",
      garnish: "无",
      baseSpirit: "金酒",
    },
    aviation: {
      name: "航空",
      subtitle: "淡紫色的金酒酸。",
      description:
        "一杯带花香的金酒经典，柠檬、黑樱桃利口酒和少量紫罗兰利口酒让它酸爽、细致，也很有视觉辨识度。",
      heroIngredients: ["金酒", "柠檬", "紫罗兰"],
      ingredients: ["60 ml 金酒", "22.5 ml 柠檬汁", "15 ml 黑樱桃利口酒", "7.5 ml 紫罗兰利口酒"],
      steps: [
        "将所有材料加入装冰的摇壶。",
        "摇至充分冰镇。",
        "细滤入冰镇过的浅碟杯。",
        "可用樱桃装饰。",
      ],
      tags: ["花香", "金酒", "经典", "摇和"],
      flavor: "花香、酸爽、轻微樱桃感",
      glass: "浅碟杯",
      garnish: "可选樱桃",
      baseSpirit: "金酒",
    },
    "french-75": {
      name: "法式 75",
      subtitle: "金酒、柠檬和香槟的明亮气泡。",
      description:
        "一杯气泡经典，把金酒酸变得清爽而有庆祝感。柠檬保持利落，气泡让酒体更轻盈。",
      heroIngredients: ["金酒", "柠檬", "香槟"],
      ingredients: ["30 ml 金酒", "15 ml 柠檬汁", "15 ml 单糖浆", "香槟", "柠檬皮"],
      steps: [
        "将金酒、柠檬汁和糖浆加冰摇和。",
        "滤入笛形杯。",
        "以冰镇香槟补满。",
        "用柠檬皮装饰。",
      ],
      tags: ["气泡", "经典", "柑橘", "庆祝"],
      flavor: "清脆、明亮、偏干",
      glass: "笛形杯",
      garnish: "柠檬皮",
      baseSpirit: "金酒",
    },
    "gin-martini": {
      name: "金酒马天尼",
      subtitle: "冰冷金酒、干味美思和清晰焦点。",
      description:
        "一杯极简搅拌型鸡尾酒，温度、稀释和比例都很关键。干味美思衬托金酒，而不是遮盖它。",
      heroIngredients: ["金酒", "干味美思", "柠檬"],
      ingredients: ["75 ml 金酒", "15 ml 干味美思", "1 滴橙味苦精", "柠檬皮或橄榄"],
      steps: [
        "将金酒、美思和苦精倒入加冰的调酒杯。",
        "搅拌至非常冰冷。",
        "滤入冰镇过的马天尼杯。",
        "用柠檬皮或橄榄装饰。",
      ],
      tags: ["经典", "搅拌", "烈酒感", "金酒"],
      flavor: "干爽、清脆、植物香",
      glass: "马天尼杯",
      garnish: "柠檬皮或橄榄",
      baseSpirit: "金酒",
    },
    "corpse-reviver-2": {
      name: "亡者复苏 #2",
      subtitle: "带苦艾边缘的清脆金酒酸。",
      description:
        "一杯禁酒令前后的经典复苏酒，金酒、橙味利口酒、芳香化葡萄酒、柠檬和少量苦艾酒构成明亮又利落的酸味。",
      heroIngredients: ["金酒", "柠檬", "苦艾酒"],
      ingredients: ["22.5 ml 金酒", "22.5 ml Cointreau", "22.5 ml Cocchi Americano", "22.5 ml 柠檬汁", "苦艾酒润杯"],
      steps: [
        "用苦艾酒润过冰镇浅碟杯，并倒掉多余部分。",
        "将金酒、Cointreau、Cocchi Americano 和柠檬汁加冰摇和。",
        "细滤入准备好的杯中。",
        "趁冰冷时饮用。",
      ],
      tags: ["经典", "柑橘", "金酒", "摇和"],
      flavor: "酸爽、芳香、轻微苦味",
      glass: "浅碟杯",
      garnish: "无",
      baseSpirit: "金酒",
    },
    "jungle-bird": {
      name: "丛林鸟",
      subtitle: "菠萝、朗姆和金巴利的苦味咬合。",
      description:
        "一杯带足够苦味的热带鸡尾酒。深色朗姆和菠萝带来厚度，金巴利让收尾保持鲜明。",
      heroIngredients: ["深色朗姆", "菠萝", "金巴利"],
      ingredients: ["45 ml 深色朗姆", "45 ml 菠萝汁", "22.5 ml 金巴利", "15 ml 青柠汁", "15 ml 单糖浆"],
      steps: [
        "将所有材料加入装冰的摇壶。",
        "摇至冰镇并略有泡沫。",
        "滤入装冰的古典杯。",
        "用菠萝叶或青柠轮装饰。",
      ],
      tags: ["热带", "苦味", "朗姆", "摇和"],
      flavor: "果香、苦味、朗姆厚度",
      glass: "古典杯",
      garnish: "菠萝叶或青柠",
      baseSpirit: "深色朗姆",
    },
    "naked-and-famous": {
      name: "Naked and Famous",
      subtitle: "烟熏梅斯卡尔、Aperol、草本和青柠。",
      description:
        "一杯现代等量配方鸡尾酒，把梅斯卡尔烟熏、Aperol、黄 Chartreuse 和青柠组合得紧凑而鲜明。",
      heroIngredients: ["梅斯卡尔", "Aperol", "青柠"],
      ingredients: ["22.5 ml 梅斯卡尔", "22.5 ml Aperol", "22.5 ml 黄 Chartreuse", "22.5 ml 青柠汁"],
      steps: [
        "将所有材料加入装冰的摇壶。",
        "摇至充分冰镇。",
        "细滤入冰镇过的浅碟杯。",
        "不需装饰。",
      ],
      tags: ["现代经典", "烟熏", "等量配方", "摇和"],
      flavor: "烟熏、苦甜、草本",
      glass: "浅碟杯",
      garnish: "无",
      baseSpirit: "梅斯卡尔",
    },
    sidecar: {
      name: "边车",
      subtitle: "干邑、柠檬和橙香的清晰线条。",
      description:
        "一杯明亮的干邑酸，橙味利口酒和柠檬让它简单、精确，也比糖边暗示的更利落。",
      heroIngredients: ["干邑", "柠檬", "橙味利口酒"],
      ingredients: ["60 ml 干邑", "22.5 ml Cointreau", "22.5 ml 柠檬汁", "可选糖边"],
      steps: [
        "可在冰镇浅碟杯上做半圈糖边。",
        "将干邑、Cointreau 和柠檬汁加冰摇和。",
        "细滤入杯中。",
        "用橙皮装饰。",
      ],
      tags: ["经典", "柑橘", "干邑", "摇和"],
      flavor: "酸爽、圆润、橙香明亮",
      glass: "浅碟杯",
      garnish: "橙皮",
      baseSpirit: "干邑",
    },
    gimlet: {
      name: "吉姆雷特",
      subtitle: "金酒与青柠，干净切入。",
      description:
        "一杯老派金酒酸，把焦点放在青柠和植物香上。冰冷、紧凑，不需要多余装饰。",
      heroIngredients: ["金酒", "青柠", "糖"],
      ingredients: ["60 ml 金酒", "22.5 ml 青柠汁", "22.5 ml 单糖浆"],
      steps: [
        "将金酒、青柠汁和糖浆加入装冰的摇壶。",
        "摇至充分冰镇。",
        "细滤入冰镇过的浅碟杯。",
        "可用青柠轮装饰。",
      ],
      tags: ["经典", "柑橘", "金酒", "简单"],
      flavor: "清脆、酸爽、植物香",
      glass: "浅碟杯",
      garnish: "可选青柠轮",
      baseSpirit: "金酒",
    },
    "whiskey-sour": {
      name: "威士忌酸",
      subtitle: "波本、柠檬和柔软泡沫。",
      description:
        "基础酸型鸡尾酒之一，用柠檬和糖平衡威士忌的温暖。蛋清可选，但会带来经典的丝滑泡沫。",
      heroIngredients: ["波本", "柠檬", "糖"],
      ingredients: ["60 ml 波本", "22.5 ml 柠檬汁", "22.5 ml 单糖浆", "1 个蛋清", "安格斯图拉苦精"],
      steps: [
        "先将波本、柠檬汁、糖浆和蛋清不加冰干摇。",
        "加冰后再次摇至冰镇。",
        "滤入装有新冰的古典杯。",
        "用苦精点缀泡沫。",
      ],
      tags: ["经典", "酸型", "威士忌", "摇和"],
      flavor: "酸爽、温暖、微甜",
      glass: "古典杯",
      garnish: "安格斯图拉苦精",
      baseSpirit: "波本",
    },
    caipirinha: {
      name: "卡皮里尼亚",
      subtitle: "卡莎萨、青柠、糖和碎冰节奏。",
      description:
        "巴西代表性鸡尾酒，由卡莎萨、青柠和糖直接组成。粗粝、清亮，关键是保留青柠油香。",
      heroIngredients: ["卡莎萨", "青柠", "糖"],
      ingredients: ["60 ml 卡莎萨", "1 个青柠切块", "2 茶匙砂糖"],
      steps: [
        "在古典杯中轻压青柠块和砂糖。",
        "加入卡莎萨和碎冰。",
        "搅拌至冰冷并融合。",
        "连同青柠块一起饮用。",
      ],
      tags: ["柑橘", "清爽", "卡莎萨", "杯中调制"],
      flavor: "青草感、酸爽、微甜",
      glass: "古典杯",
      garnish: "青柠块",
      baseSpirit: "卡莎萨",
    },
    "pina-colada": {
      name: "椰林飘香",
      subtitle: "菠萝、椰子和朗姆的盛夏感。",
      description:
        "一杯奶油感热带经典，最好让菠萝保持明亮，椰子足够浓郁但不过分沉重。",
      heroIngredients: ["朗姆", "菠萝", "椰子"],
      ingredients: ["60 ml 朗姆", "45 ml 菠萝汁", "30 ml 椰子奶油", "15 ml 青柠汁", "菠萝角"],
      steps: [
        "将朗姆、菠萝、椰子奶油、青柠和碎冰加入搅拌机。",
        "搅打至顺滑冰冷。",
        "倒入飓风杯。",
        "用菠萝装饰。",
      ],
      tags: ["热带", "奶油感", "朗姆", "搅打"],
      flavor: "浓郁、果香、椰子甜感",
      glass: "飓风杯",
      garnish: "菠萝角",
      baseSpirit: "朗姆",
    },
    "bees-knees": {
      name: "Bee's Knees",
      subtitle: "金酒、柠檬、蜂蜜和轻盈上扬。",
      description:
        "一杯禁酒令时期的金酒酸，用蜂蜜糖浆柔化柠檬酸度。简单、带香气，也比配方看起来更明亮。",
      heroIngredients: ["金酒", "柠檬", "蜂蜜"],
      ingredients: ["60 ml 金酒", "22.5 ml 柠檬汁", "22.5 ml 蜂蜜糖浆"],
      steps: [
        "将金酒、柠檬汁和蜂蜜糖浆加入装冰的摇壶。",
        "摇至冰镇。",
        "细滤入冰镇过的浅碟杯。",
        "可用柠檬皮装饰。",
      ],
      tags: ["经典", "金酒", "蜂蜜", "摇和"],
      flavor: "花香、酸爽、蜂蜜感",
      glass: "浅碟杯",
      garnish: "可选柠檬皮",
      baseSpirit: "金酒",
    },
    penicillin: {
      name: "盘尼西林",
      subtitle: "苏格兰威士忌、姜、蜂蜜和烟熏。",
      description:
        "一杯现代威士忌酸，调和苏格兰威士忌、柠檬、蜂蜜姜糖浆和少量艾雷岛威士忌浮层，温暖、辛香并带烟熏边缘。",
      heroIngredients: ["苏格兰威士忌", "姜", "蜂蜜"],
      ingredients: ["60 ml 调和苏格兰威士忌", "22.5 ml 柠檬汁", "22.5 ml 蜂蜜姜糖浆", "7.5 ml 艾雷岛威士忌浮层", "糖渍姜"],
      steps: [
        "将调和威士忌、柠檬汁和蜂蜜姜糖浆加冰摇和。",
        "滤入装有新冰的古典杯。",
        "在表面漂浮少量艾雷岛威士忌。",
        "用糖渍姜装饰。",
      ],
      tags: ["现代经典", "烟熏", "姜", "威士忌"],
      flavor: "烟熏、辛香、蜂蜜感",
      glass: "古典杯",
      garnish: "糖渍姜",
      baseSpirit: "苏格兰威士忌",
    },
    "pisco-sour": {
      name: "皮斯科酸",
      subtitle: "皮斯科、青柠和泡沫上的苦精。",
      description:
        "一杯南美酸型鸡尾酒，皮斯科的葡萄香、青柠、糖和蛋清泡沫结合，最后以苦精收尾。",
      heroIngredients: ["皮斯科", "青柠", "苦精"],
      ingredients: ["60 ml 皮斯科", "22.5 ml 青柠汁", "22.5 ml 单糖浆", "1 个蛋清", "安格斯图拉苦精"],
      steps: [
        "先将皮斯科、青柠汁、糖浆和蛋清不加冰干摇。",
        "加冰后再次摇至冰镇。",
        "滤入冰镇过的浅碟杯。",
        "在泡沫上点几滴苦精。",
      ],
      tags: ["酸型", "皮斯科", "泡沫", "经典"],
      flavor: "酸爽、花果香、丝滑",
      glass: "浅碟杯",
      garnish: "安格斯图拉苦精",
      baseSpirit: "皮斯科",
    },
    painkiller: {
      name: "止痛药",
      subtitle: "朗姆、菠萝、椰子和肉豆蔻。",
      description:
        "一杯丰厚的热带长饮，深色朗姆、菠萝、橙汁、椰子和肉豆蔻组合出饱满而阳光的口感。",
      heroIngredients: ["深色朗姆", "菠萝", "椰子"],
      ingredients: ["60 ml 深色朗姆", "120 ml 菠萝汁", "30 ml 橙汁", "30 ml 椰子奶油", "肉豆蔻"],
      steps: [
        "将朗姆、菠萝汁、橙汁和椰子奶油加冰摇和。",
        "倒入装有碎冰的 tiki 杯或高杯。",
        "撒上现磨肉豆蔻。",
        "可用菠萝或橙片装饰。",
      ],
      tags: ["热带", "朗姆", "奶油感", "长饮"],
      flavor: "浓郁、果香、香料感",
      glass: "Tiki 杯",
      garnish: "现磨肉豆蔻",
      baseSpirit: "深色朗姆",
    },
    "vieux-carre": {
      name: "旧广场",
      subtitle: "黑麦、干邑、美思和新奥尔良深度。",
      description:
        "一杯层次丰厚的搅拌经典，黑麦威士忌、干邑、甜味美思、Benedictine 和苦精带来复杂而奢华的香气。",
      heroIngredients: ["黑麦", "干邑", "美思"],
      ingredients: ["22.5 ml 黑麦威士忌", "22.5 ml 干邑", "22.5 ml 甜味美思", "7.5 ml Benedictine", "Peychaud's 与安格斯图拉苦精"],
      steps: [
        "将所有材料加入加冰的调酒杯。",
        "搅拌至充分冰镇。",
        "滤入放有大冰块的古典杯。",
        "用柠檬皮装饰。",
      ],
      tags: ["经典", "搅拌", "新奥尔良", "烈酒感"],
      flavor: "丰厚、草本、温暖",
      glass: "古典杯",
      garnish: "柠檬皮",
      baseSpirit: "黑麦威士忌",
    },
    "singapore-sling": {
      name: "新加坡司令",
      subtitle: "金酒、樱桃、菠萝和粉色长饮光泽。",
      description:
        "一杯热带金酒长饮，樱桃、柑橘、菠萝和香料让它色彩鲜明，也比第一眼看上去更有结构。",
      heroIngredients: ["金酒", "樱桃", "菠萝"],
      ingredients: ["45 ml 金酒", "15 ml 樱桃利口酒", "7.5 ml Cointreau", "7.5 ml Benedictine", "60 ml 菠萝汁", "15 ml 青柠汁", "红石榴糖浆和苦精"],
      steps: [
        "将所有材料加冰摇和。",
        "滤入装有新冰的高球杯。",
        "可用少量苏打水补满。",
        "用樱桃和菠萝装饰。",
      ],
      tags: ["热带", "金酒", "长饮", "果香"],
      flavor: "果香、香料感、微酸",
      glass: "高球杯",
      garnish: "樱桃和菠萝",
      baseSpirit: "金酒",
    },
    "dark-n-stormy": {
      name: "黑暗风暴",
      subtitle: "深色朗姆压过姜味热浪。",
      description:
        "一杯辛香高球，深色朗姆、姜汁汽水和青柠直接组合，清爽重点来自姜的刺激感。",
      heroIngredients: ["深色朗姆", "姜汁汽水", "青柠"],
      ingredients: ["60 ml 深色朗姆", "15 ml 青柠汁", "姜汁汽水", "青柠角"],
      steps: [
        "在高球杯中加满冰。",
        "加入青柠汁和姜汁汽水。",
        "将深色朗姆漂浮在表面。",
        "用青柠角装饰。",
      ],
      tags: ["高球", "姜", "朗姆", "清爽"],
      flavor: "辛香、深色糖蜜感、柑橘",
      glass: "高球杯",
      garnish: "青柠角",
      baseSpirit: "深色朗姆",
    },
    "rusty-nail": {
      name: "生锈钉",
      subtitle: "苏格兰威士忌和蜂蜜草本温度。",
      description:
        "一杯两种材料的经典，把苏格兰威士忌和 Drambuie 组合在一起。做法简单，但风味比结构更复杂。",
      heroIngredients: ["苏格兰威士忌", "Drambuie", "柠檬"],
      ingredients: ["60 ml 苏格兰威士忌", "15 ml Drambuie", "柠檬皮"],
      steps: [
        "将苏格兰威士忌和 Drambuie 加冰搅拌。",
        "搅拌至冰镇。",
        "滤入放有大冰块的古典杯。",
        "挤压柠檬皮释放香气。",
      ],
      tags: ["经典", "两种材料", "搅拌", "苏格兰威士忌"],
      flavor: "蜂蜜感、烟熏、温暖",
      glass: "古典杯",
      garnish: "柠檬皮",
      baseSpirit: "苏格兰威士忌",
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
