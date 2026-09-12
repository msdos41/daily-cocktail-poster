import type { Locale } from "@/i18n/config";
import type { CocktailId } from "./cocktails";

export type CocktailFAQ = {
  question: string;
  answer: string;
};

export type CocktailEditorialData = {
  recipeCuisine: string;
  tools: string[];
  suitableForDiet?: string;
  originLore: string;
  flavorNotes: string;
  barTips: string[];
  faqs: CocktailFAQ[];
  relatedSlugs: [string, string];
};

export const cocktailEditorials: Record<Locale, Record<CocktailId, CocktailEditorialData>> = {
  en: {
    negroni: {
      recipeCuisine: "Italian",
      tools: ["Mixing glass", "Bar spoon", "Jigger", "Julep strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Born in Florence in 1919 at Caffè Casoni when Count Camillo Negroni requested his Americano cocktail strengthened with gin instead of soda water. Bartender Fosco Scarselli honored the order, adding an orange slice to distinguish it from the lemon garnish of the Americano.",
      flavorNotes: "Bittersweet, botanical, orange-led, herbal",
      barTips: [
        "Stir for 30 seconds with dense ice to achieve proper 20-25% dilution without watering down the bitter profile.",
        "Express a fresh orange peel directly over the glass surface to coat the top with aromatic citrus oils.",
      ],
      faqs: [
        {
          question: "What is the classic Negroni ratio?",
          answer: "The classic Negroni uses an equal 1:1:1 ratio: 30ml (1 oz) London Dry Gin, 30ml Campari, and 30ml Sweet Vermouth.",
        },
        {
          question: "Should a Negroni be shaken or stirred?",
          answer: "Always stirred. Shaking introduces air bubbles and clouds the cocktail, diminishing its silky texture and brilliant ruby clarity.",
        },
      ],
      relatedSlugs: ["boulevardier", "aperol-spritz"],
    },
    margarita: {
      recipeCuisine: "Mexican",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Originated in Mexico during the late 1930s or 1940s, widely linked to bartender Carlos 'Danny' Herrera in Tijuana or socialite Margarita Sames in Acapulco. Built upon the classic Daisy cocktail architecture, replacing brandy with 100% blue agave tequila and adding a salted rim.",
      flavorNotes: "Crisp, tart, saline, citrus-forward, earthy agave",
      barTips: [
        "Salt only half the rim of the glass so the drinker can choose the level of salinity with each sip.",
        "Always use freshly squeezed lime juice; bottled lime juice contains preservatives that ruin the balance.",
      ],
      faqs: [
        {
          question: "What type of tequila works best in a Margarita?",
          answer: "A quality 100% Blue Agave Blanco tequila offers the cleanest, most vibrant agave and citrus expression.",
        },
        {
          question: "What is the classic Margarita ratio?",
          answer: "The classic IBA recipe uses a 7:4:3 ratio: 50ml Tequila Blanco, 30ml Triple Sec or Cointreau, and 20ml fresh lime juice.",
        },
      ],
      relatedSlugs: ["paloma", "daiquiri"],
    },
    "old-fashioned": {
      recipeCuisine: "American",
      tools: ["Mixing glass", "Bar spoon", "Muddler", "Jigger"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "The primordial cocktail template, dating back to 1806 when a cocktail was defined simply as spirits, sugar, water, and bitters. Formalized in the 1880s at the Pendennis Club in Louisville, Kentucky, before being introduced to New York's Waldorf-Astoria bar.",
      flavorNotes: "Spirit-forward, rich oak, gentle caramel, warm spices",
      barTips: [
        "Use a single large, clear ice sphere or block to ensure slow, steady dilution that keeps the whiskey cold without becoming watery.",
        "Gently muddle the sugar cube with bitters and a dash of water until dissolved before adding whiskey and ice.",
      ],
      faqs: [
        {
          question: "Bourbon or Rye whiskey for an Old Fashioned?",
          answer: "Rye yields a spicier, crisper profile favored in historic recipes; Bourbon offers a sweeter, rounder vanilla and caramel character.",
        },
        {
          question: "Should you muddle fruit in an Old Fashioned?",
          answer: "Classic pre-Prohibition technique avoids muddling cherries or orange pulp; only an expressed orange twist is needed for aromatic finish.",
        },
      ],
      relatedSlugs: ["manhattan", "sazerac"],
    },
    daiquiri: {
      recipeCuisine: "Cuban",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Invented around 1898 in the Cuban mining town of Daiquirí by American mining engineer Jennings Cox. Later perfected and immortalized at Havana's El Floridita bar by legendary cantinero Constantino Ribalaigua Vert, beloved by Ernest Hemingway.",
      flavorNotes: "Bright, crisp, sweet-tart balance, mineral rum finish",
      barTips: [
        "Shake vigorously for 12-15 seconds with hard ice to chill rapidly and create tiny ice aeration bubbles across the top.",
        "Double strain through a fine mesh strainer to catch tiny ice shards for a velvety, crystalline pour.",
      ],
      faqs: [
        {
          question: "What rum is best for a classic Daiquiri?",
          answer: "A clean, lightly aged Cuban or Puerto Rican white rum (Carta Blanca) produces the purest citrus-forward balance.",
        },
        {
          question: "Is a classic Daiquiri frozen or blended?",
          answer: "A true classic Daiquiri is shaken with ice and served up in a chilled coupe glass, never frozen in an electric blender.",
        },
      ],
      relatedSlugs: ["margarita", "gimlet"],
    },
    "espresso-martini": {
      recipeCuisine: "British",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created in 1983 by legendary London bartender Dick Bradsell at Fred's Club. A fashion model famously walked up and asked for a drink that would 'wake me up and then f**k me up.' Bradsell combined fresh hot espresso with vodka and coffee liqueur.",
      flavorNotes: "Dark roast cocoa, bittersweet, roasted hazelnut, silky crema",
      barTips: [
        "Freshly pulled espresso with natural crema is mandatory; cold coffee or concentrate cannot produce the signature dense foam crown.",
        "Shake with maximum vigor immediately after pouring the hot espresso into the ice to build a thick, velvety head.",
      ],
      faqs: [
        {
          question: "How do you get the thick foam on an Espresso Martini?",
          answer: "Combine hot freshly brewed espresso with hard ice and shake hard for 15 seconds to emulsify the espresso oils into a dense crema.",
        },
        {
          question: "What do the three coffee beans on top signify?",
          answer: "Traditionally placed in a triangle, they represent health, wealth, and happiness.",
        },
      ],
      relatedSlugs: ["manhattan", "gin-martini"],
    },
    "aperol-spritz": {
      recipeCuisine: "Italian",
      tools: ["Wine glass", "Bar spoon", "Jigger"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Originated in the Veneto region of Italy in the early 20th century, evolving from 19th-century Austro-Hungarian soldiers diluting Italian wine with a splash ('spritz') of sparkling water. Aperol was introduced in Padua in 1919 and became the definitive bitter partner.",
      flavorNotes: "Bright citrus, effervescent, bittersweet orange, rhubarb",
      barTips: [
        "Follow the 3-2-1 rule: 3 parts Prosecco (90ml), 2 parts Aperol (60ml), and 1 splash of soda water (30ml).",
        "Add ice first, followed by Prosecco, then Aperol in a circular pour to allow natural mixing without defizzing the bubbles.",
      ],
      faqs: [
        {
          question: "Why add Prosecco before Aperol?",
          answer: "Pouring the denser Aperol over the sparkling Prosecco creates natural blending, minimizing the need to stir and preserving effervescence.",
        },
        {
          question: "Can I substitute soda water with tonic?",
          answer: "Club soda or seltzer is preferred; tonic water contains quinine and added sugars that clash with Aperol's delicate bittersweet notes.",
        },
      ],
      relatedSlugs: ["negroni", "french-75"],
    },
    mojito: {
      recipeCuisine: "Cuban",
      tools: ["Highball glass", "Muddler", "Bar spoon", "Jigger"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Traced back to 16th-century Havana where privateer Sir Francis Drake's crew brewed aguardiente with mint, lime, and sugarcane to ward off illness ('El Draque'). Refined into the modern highball with white rum at Havana's Bodeguita del Medio.",
      flavorNotes: "Herbaceous spearmint, zesty lime, mild cane sweetness, refreshing soda",
      barTips: [
        "Press mint leaves gently with the muddler; twisting or bruising breaks cell walls and releases bitter chlorophyll.",
        "Use crushed ice to pack the glass tightly, ensuring prolonged chill and proper mint leaf suspension throughout the drink.",
      ],
      faqs: [
        {
          question: "What type of mint is traditional in a Cuban Mojito?",
          answer: "Hierba buena (Mentha nemorosa) is the traditional Cuban wild mint, known for a gentler, more floral citrus-mint profile than standard spearmint.",
        },
        {
          question: "Is simple syrup or granulated sugar preferred?",
          answer: "Fine granulated cane sugar provides authentic texture as it dissolves, though 1:1 simple syrup ensures immediate, uniform sweetness.",
        },
      ],
      relatedSlugs: ["daiquiri", "caipirinha"],
    },
    manhattan: {
      recipeCuisine: "American",
      tools: ["Mixing glass", "Bar spoon", "Jigger", "Julep strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Invented in the early 1870s at New York City's Manhattan Club. Popular legend credits a banquet hosted by Lady Randolph Churchill (Winston Churchill's mother), though documented bar history reveals it was invented by a bartender named Black at the club on Broadway.",
      flavorNotes: "Spirit-forward, baking spices, dark stone fruit, herbal vermouth",
      barTips: [
        "Rye whiskey provides classic peppery backbone; if using sweeter bourbon, dial back the sweet vermouth slightly.",
        "Always keep sweet vermouth refrigerated once opened to prevent oxidation and souring.",
      ],
      faqs: [
        {
          question: "What is the classic Manhattan ratio?",
          answer: "The timeless formula is 2:1: 2 oz (60ml) Rye Whiskey, 1 oz (30ml) Sweet Vermouth, and 2 dashes Angostura bitters.",
        },
        {
          question: "What cherry should garnish a Manhattan?",
          answer: "Use authentic Italian Marasca cherries (like Luxardo); never use neon-red bleached maraschino cherries packed in corn syrup.",
        },
      ],
      relatedSlugs: ["old-fashioned", "boulevardier"],
    },
    sazerac: {
      recipeCuisine: "American",
      tools: ["Two rocks glasses", "Mixing glass", "Bar spoon", "Jigger"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created in the 1830s in New Orleans by apothecary Antoine Amédée Peychaud, initially using Sazerac de Forge et Fils cognac. When phylloxera devastated French vineyards in the 1870s, local bartenders transitioned to American rye whiskey and added an absinthe rinse.",
      flavorNotes: "Aromatic anise, spicy rye, floral Peychaud bitters, lemon oils",
      barTips: [
        "Chill the serving glass thoroughly, rinse with genuine absinthe, and dump the excess so only an aromatic coating remains.",
        "Express lemon peel over the drink and discard it (or place on the rim); do not drop the peel into the glass.",
      ],
      faqs: [
        {
          question: "Is absinthe necessary for a Sazerac?",
          answer: "Yes, the absinthe rinse provides the defining anise aromatics. Herbsaint or Pastis can serve as traditional New Orleans substitutes.",
        },
        {
          question: "Why is a Sazerac served without ice?",
          answer: "Serving it neat in a well-chilled glass prevents dilution, allowing the high-proof rye and herbal bitters to evolve as the glass warms.",
        },
      ],
      relatedSlugs: ["old-fashioned", "vieux-carre"],
    },
    paloma: {
      recipeCuisine: "Mexican",
      tools: ["Highball glass", "Bar spoon", "Jigger"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Widely recognized as Mexico's most popular tequila highball, credited to Don Javier Delgado Corona, owner and bartender of La Capilla in Tequila, Jalisco. Named after 'La Paloma' ('The Dove'), a beloved 19th-century folk song.",
      flavorNotes: "Tart grapefruit, mineral agave, effervescent, saline brightness",
      barTips: [
        "Rim half the glass with coarse sea salt or chili-lime salt (Tajín) to heighten the bittersweet grapefruit finish.",
        "Add a splash of freshly squeezed lime juice to brighten the sweetness of standard grapefruit sodas.",
      ],
      faqs: [
        {
          question: "Can I use fresh grapefruit juice instead of grapefruit soda?",
          answer: "Yes. Shake 50ml tequila with 45ml fresh pink grapefruit juice and 15ml lime, then top with 60ml club soda and 10ml agave syrup.",
        },
        {
          question: "Which grapefruit soda is traditional in Mexico?",
          answer: "Squirt or Jarritos Toronja are the authentic Mexican choices, delivering bright citrus tartness.",
        },
      ],
      relatedSlugs: ["margarita", "french-75"],
    },
    "paper-plane": {
      recipeCuisine: "American",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created in 2008 by renowned modern bartender Sam Ross (Milk & Honey, Attaboy) for The Violet Hour in Chicago. Named after the M.I.A. hip-hop anthem 'Paper Planes' that was on repeat in the bar during recipe development.",
      flavorNotes: "Bittersweet, herbal alpine, bright lemon, warm bourbon oak",
      barTips: [
        "Use genuine Amaro Nonino Quintessentia; its grappa and botanical base cannot be replicated with heavier dark amari.",
        "Keep the ratio strictly equal (1:1:1:1) to maintain the delicate sweet-bitter-sour equilibrium.",
      ],
      faqs: [
        {
          question: "What are the four ingredients in a Paper Plane?",
          answer: "Equal parts (22.5ml each) Bourbon, Aperol, Amaro Nonino, and fresh lemon juice.",
        },
        {
          question: "How does the Paper Plane relate to the Last Word?",
          answer: "Sam Ross created the drink as a bourbon-and-amaro riff on the equal-parts Last Word architecture.",
        },
      ],
      relatedSlugs: ["last-word", "naked-and-famous"],
    },
    boulevardier: {
      recipeCuisine: "French",
      tools: ["Mixing glass", "Bar spoon", "Jigger", "Strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created in Paris during Prohibition by Erskine Gwynne, an American writer and publisher who founded 'The Boulevardier' magazine. Recorded in 1927 by Harry McElhone at Harry's New York Bar in Paris in 'Barflies and Cocktails'.",
      flavorNotes: "Rich bourbon vanilla, bittersweet gentian, warm herbal spice",
      barTips: [
        "A slightly spirit-forward 45ml bourbon to 30ml Campari and 30ml sweet vermouth ratio prevents the whiskey from being overwhelmed by Campari.",
        "Serve with an expressed orange peel or brandied cherry depending on whether you want citrus lift or rich confectionery depth.",
      ],
      faqs: [
        {
          question: "How does a Boulevardier differ from a Negroni?",
          answer: "The Boulevardier swaps gin for bourbon or rye whiskey, resulting in a richer, warmer, and less herbal profile.",
        },
        {
          question: "Should you serve a Boulevardier up or on the rocks?",
          answer: "Both are acceptable: served 'up' in a coupe for focused aromatics, or over a large rock for slower sipping.",
        },
      ],
      relatedSlugs: ["negroni", "manhattan"],
    },
    "mai-tai": {
      recipeCuisine: "Polynesian-American",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Invented in 1944 by Victor 'Trader Vic' Bergeron at his Oakland, California restaurant. After mixing a 17-year-old J. Wray & Nephew Jamaican rum with lime, orange curaçao, and orgeat, Tahitian guest Carrie Guild exclaimed, 'Maita'i roa a'e!' ('Out of this world!').",
      flavorNotes: "Nutty almond, funky Jamaican rum, bright lime, rich curaçao",
      barTips: [
        "Authentic orgeat (almond syrup with orange flower water) is the indispensable culinary soul of a genuine 1944 Mai Tai.",
        "Garnish with a spent half lime shell and fresh mint sprig to resemble an island with a palm tree.",
      ],
      faqs: [
        {
          question: "Does a real Mai Tai contain pineapple or orange juice?",
          answer: "No. The original 1944 Trader Vic recipe contains no fruit juice other than fresh lime. Pineapple and orange juices were tourist additions in 1950s Hawaii.",
        },
        {
          question: "What rum blend works best?",
          answer: "Blend 30ml funky pot-still Jamaican rum (like Appleton or Smith & Cross) with 30ml Martinique Rhum Agricole for authentic complex depth.",
        },
      ],
      relatedSlugs: ["jungle-bird", "painkiller"],
    },
    "last-word": {
      recipeCuisine: "American",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Developed during Prohibition around 1916 at the Detroit Athletic Club and first published in Ted Saucier's 1951 book 'Bottoms Up'. Rediscovered and popularized globally in 2004 by Murray Stenson at Seattle's Zig Zag Café.",
      flavorNotes: "Pungent alpine herbal, maraschino cherry sweetness, sharp lime, botanical gin",
      barTips: [
        "Green Chartreuse is 55% ABV and intensely botanical; strict 1:1:1:1 balance is crucial to prevent herbal dominance.",
        "Shake hard to achieve cold temperature and micro-aeration that tames the potent proof.",
      ],
      faqs: [
        {
          question: "What is Green Chartreuse?",
          answer: "A French herbal liqueur produced by Carthusian Monks since 1737 from a secret recipe of 130 alpine plants and flowers.",
        },
        {
          question: "Can I substitute Maraschino liqueur with cherry brandy?",
          answer: "No. Luxardo Maraschino is a dry, clear distillate of sour Marasca cherries and crushed pits, imparting a delicate nutty, floral profile rather than syrup.",
        },
      ],
      relatedSlugs: ["paper-plane", "corpse-reviver-2"],
    },
    aviation: {
      recipeCuisine: "American",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created in the early 1900s by Hugo Ensslin, head bartender at the Hotel Wallick in New York City, and published in his 1916 'Recipes for Mixed Drinks'. Designed to evoke the dawn of modern aviation, with Crème de Violette imparting a sky-blue hue.",
      flavorNotes: "Floral violet, stone fruit almond, tart lemon, dry botanical juniper",
      barTips: [
        "Crème de Violette can easily overwhelm the drink; measure no more than a bar spoon (5ml) to maintain a soft sky-blue tint rather than soapy purple.",
        "Use a classic London Dry Gin with pronounced juniper to stand tall against the floral liqueur.",
      ],
      faqs: [
        {
          question: "What gives the Aviation its distinctive color?",
          answer: "Crème de Violette, a liqueur flavored with natural violet blossoms, yields its iconic pale lavender-sky tint.",
        },
        {
          question: "Can you make an Aviation without Crème de Violette?",
          answer: "Yes, this variation was popularized by the 1930 Savoy Cocktail Book, though it lacks the signature floral aromatics and sky-blue hue.",
        },
      ],
      relatedSlugs: ["last-word", "gin-martini"],
    },
    "french-75": {
      recipeCuisine: "French",
      tools: ["Cocktail shaker", "Jigger", "Champagne flute"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created around 1915 at the New York Bar in Paris by Harry McElhone. Named after the French 75mm M1897 field gun renowned for rapid-fire accuracy, with drinkers joking the cocktail hit with the same concussive kick.",
      flavorNotes: "Crisp brioche bubbles, tart lemon, herbal gin, celebratory lift",
      barTips: [
        "Use a dry, brut Champagne or quality traditional-method sparkling wine so the drink finishes clean and crisp.",
        "Shake the gin, lemon juice, and syrup thoroughly before straining into the flute and topping with cold champagne.",
      ],
      faqs: [
        {
          question: "Gin or Cognac for a French 75?",
          answer: "While French tradition sometimes uses Cognac (especially in New Orleans' Arnaud's), the globally recognized IBA standard is London Dry Gin.",
        },
        {
          question: "Should a French 75 be served with ice?",
          answer: "Traditionally served without ice in a chilled Champagne flute, preserving delicate carbonation and elegant visual bubbles.",
        },
      ],
      relatedSlugs: ["gimlet", "aperol-spritz"],
    },
    "gin-martini": {
      recipeCuisine: "American",
      tools: ["Mixing glass", "Bar spoon", "Jigger", "Julep strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Evolved in the late 19th century from the sweeter Martinez cocktail. By the 1920s and 1930s, London Dry Gin and dry French vermouth took center stage, becoming the international symbol of cosmopolitan sophistication and mid-century elegance.",
      flavorNotes: "Pure juniper, crisp botanical, dry white wine, subtle salinity",
      barTips: [
        "Stir continuously for 45-50 seconds; a Martini must be served as close to freezing temperature (-3°C) as possible.",
        "Keep gin in the freezer and store dry vermouth in the refrigerator to maximize viscosity and minimize unwanted dilution.",
      ],
      faqs: [
        {
          question: "What is the classic Dry Martini ratio?",
          answer: "The classic 5:1 ratio uses 60ml (2 oz) London Dry Gin and 10ml to 15ml Dry Vermouth, stirred with 1 dash orange bitters.",
        },
        {
          question: "Why does James Bond ask for it shaken, not stirred?",
          answer: "Shaking aerates and rapidly chills the drink with tiny ice crystals, though connoisseurs prefer stirring for an oily, crystalline clarity.",
        },
      ],
      relatedSlugs: ["aviation", "negroni"],
    },
    "corpse-reviver-2": {
      recipeCuisine: "British",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Published in 1930 by Harry Craddock in 'The Savoy Cocktail Book'. Part of the historical 'corpse reviver' family of morning-after restorative drinks, Craddock famously warned: 'Four of these taken in swift succession will unrevive the corpse again.'",
      flavorNotes: "Aromatic anise, bright citrus, floral Cocchi Americano / Lillet, crisp gin",
      barTips: [
        "Only coat the inside of the chilled coupe with absinthe; do not pour free absinthe into the shaker.",
        "Use Cocchi Americano or Kina L'Aéro d'Or to recreate the bitter cinchona bark flavor originally present in vintage Kina Lillet.",
      ],
      faqs: [
        {
          question: "What is the formula for Corpse Reviver #2?",
          answer: "Equal parts (22.5ml each) of Gin, Cointreau, Lillet Blanc / Cocchi Americano, and fresh lemon juice, with an absinthe rinse.",
        },
        {
          question: "What does an absinthe rinse do?",
          answer: "It coats the interior of the glassware with aromatic essential oils that perfume every sip without overwhelming the palate with licorice.",
        },
      ],
      relatedSlugs: ["last-word", "gimlet"],
    },
    "jungle-bird": {
      recipeCuisine: "Malaysian",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created in 1973 by beverage manager Jeffrey Ong at the Aviary Bar of the Kuala Lumpur Hilton in Malaysia. Served as a welcome drink to hotel guests and later introduced to international cocktail literature by John J. Poister in 1989.",
      flavorNotes: "Rich molasses, bittersweet gentian, tropical pineapple froth, tart lime",
      barTips: [
        "Use unsweetened fresh pineapple juice; vigorous shaking will whip the pineapple enzymes into a dense, pillowy froth.",
        "Blackstrap rum or a heavy pot-still Jamaican rum provides essential smoky molasses depth against bitter Campari.",
      ],
      faqs: [
        {
          question: "Why is Campari used in a tropical rum drink?",
          answer: "Campari's intense bitter gentian and orange peel profile cuts through rich dark rum and sweet pineapple, creating extraordinary complexity.",
        },
        {
          question: "How do you achieve the thick foam head on a Jungle Bird?",
          answer: "Fresh raw pineapple juice contains natural proteins and enzymes that froth generously when shaken hard with ice.",
        },
      ],
      relatedSlugs: ["mai-tai", "negroni"],
    },
    "naked-and-famous": {
      recipeCuisine: "American",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Invented in 2011 by Joaquín Simó at New York City's renowned cocktail den Death & Co. Created as a mezcal-based descendant of the Last Word and Paper Plane, Simó dubbed it 'the bastard love child of a classic Last Word and a Paper Plane'.",
      flavorNotes: "Earthy woodsmoke, bitter gentian, alpine herbs, bright tart lime",
      barTips: [
        "Choose an artisanal espadín mezcal with clean mineral smoke rather than overwhelming industrial ash.",
        "Yellow Chartreuse is essential (not Green); it is sweeter, milder (43% ABV), and spiced with honey, saffron, and anise.",
      ],
      faqs: [
        {
          question: "What are the four equal ingredients in a Naked and Famous?",
          answer: "Equal parts (22.5ml each) Mezcal, Yellow Chartreuse, Aperol, and fresh lime juice.",
        },
        {
          question: "Can I use Green Chartreuse instead of Yellow?",
          answer: "Not without altering the drink; Green Chartreuse is 55% ABV and far more medicinal, which will overpower the delicate Aperol.",
        },
      ],
      relatedSlugs: ["paper-plane", "last-word"],
    },
    sidecar: {
      recipeCuisine: "French",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created at the end of World War I, claimed by both Harry's New York Bar in Paris and the Buck's Club in London. Named after the motorcycle sidecar in which an eccentric American army captain was routinely chauffeured to and from the Parisian bistro.",
      flavorNotes: "Warm cognac oak, candied orange, bright lemon tartness, sugar-crust sweetness",
      barTips: [
        "Sugar only the outer half of the rim using fine superfine sugar so it doesn't fall into the drink and make it cloying.",
        "A quality VSOP Cognac provides rounded vanilla and dried fruit notes that harmoniously integrate with Cointreau.",
      ],
      faqs: [
        {
          question: "What is the standard Sidecar ratio?",
          answer: "The classic French school uses 50ml (1.75 oz) Cognac, 20ml Cointreau, and 20ml fresh lemon juice.",
        },
        {
          question: "Is the sugared rim mandatory?",
          answer: "While traditional, modern craft bartenders often omit it or sugar half the rim, letting the natural Cognac and citrus sweetness shine.",
        },
      ],
      relatedSlugs: ["daiquiri", "vieux-carre"],
    },
    gimlet: {
      recipeCuisine: "British",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Developed in the late 19th century by the British Royal Navy to combat scurvy among sailors. Credited to Surgeon Rear-Admiral Sir Thomas Gimlette, who prescribed mixing daily gin rations with Rose's lime cordial to ensure compliance.",
      flavorNotes: "Sharp lime cordial, piney juniper, crisp, sweet-tart balance",
      barTips: [
        "Crafting homemade lime cordial (using lime juice, zest, sugar, and a pinch of citric acid) elevates the drink far above artificial commercial cordials.",
        "Shake vigorously with dense ice and double-strain into a frozen coupe glass for a crystal-clear presentation.",
      ],
      faqs: [
        {
          question: "What is the difference between lime juice and lime cordial?",
          answer: "Lime cordial is sweetened and infused with aromatic lime peel oils and acids, providing deeper citrus complexity than plain lime juice.",
        },
        {
          question: "Should a Gimlet be made with gin or vodka?",
          answer: "Gin is the historic naval standard, though a Vodka Gimlet became popular in mid-century American bars.",
        },
      ],
      relatedSlugs: ["daiquiri", "aviation"],
    },
    "whiskey-sour": {
      recipeCuisine: "American",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: undefined,
      originLore:
        "First recorded in print by Jerry Thomas in the 1862 'Bartender's Guide', though consumed by American sailors and frontiersmen decades prior. The addition of egg white (sometimes called a Boston Sour) became popular in the early 20th century to create a silky, frothy head.",
      flavorNotes: "Vanilla oak, bright lemon, creamy mouthfeel, aromatic spice",
      barTips: [
        "Perform a 'reverse dry shake' (shake with ice first to chill, strain out ice, then shake dry without ice) for the densest, silkiest egg white meringue.",
        "Drop 3 dashes of Angostura bitters directly onto the foam head to mask raw egg aromatics with warm baking spice.",
      ],
      faqs: [
        {
          question: "Why use egg white in a Whiskey Sour?",
          answer: "Egg white does not alter the flavor, but adds luxurious silky texture and creates a velvety white foam head on the cocktail.",
        },
        {
          question: "Can I make a vegan Whiskey Sour?",
          answer: "Yes, substitute egg white with 15ml (0.5 oz) of aquafaba (chickpea water), which whips into an identical velvety foam.",
        },
      ],
      relatedSlugs: ["penicillin", "old-fashioned"],
    },
    caipirinha: {
      recipeCuisine: "Brazilian",
      tools: ["Rocks glass", "Muddler", "Bar spoon"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "The national cocktail of Brazil, originating around 1918 in the countryside of São Paulo as a folk remedy against the Spanish flu. Its name derives from 'caipira', meaning a rural country person from the interior of Brazil.",
      flavorNotes: "Fresh grassy sugarcane, intense lime oils, crisp sweetness, raw earthiness",
      barTips: [
        "Cut the lime into small wedges and trim out the white central pith to prevent bitter astringency when muddling.",
        "Build and muddle directly in the rocks glass, dissolving granulated sugar into the lime juices before adding crushed ice and cachaça.",
      ],
      faqs: [
        {
          question: "What is the difference between cachaça and rum?",
          answer: "Rum is typically fermented from cooked sugarcane molasses, whereas Brazilian cachaça is distilled directly from fresh unrefined sugarcane juice.",
        },
        {
          question: "What is a Caipiroska?",
          answer: "A Caipiroska is a popular international variation that substitutes vodka for Brazilian cachaça.",
        },
      ],
      relatedSlugs: ["mojito", "daiquiri"],
    },
    "pina-colada": {
      recipeCuisine: "Puerto Rican",
      tools: ["Blender or Cocktail shaker", "Jigger", "Hurricane glass"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created in San Juan, Puerto Rico, in 1954 by bartender Ramón 'Monchito' Marrero at the Caribe Hilton Hotel. Declared the official national drink of Puerto Rico in 1978. The name literally translates to 'strained pineapple'.",
      flavorNotes: "Rich coconut cream, tropical pineapple, golden rum warmth, creamy decadence",
      barTips: [
        "Use genuine Coco López cream of coconut, not coconut milk or water, to get the authentic velvety sweetness.",
        "Shaking hard with crushed ice creates a lighter, silkier cocktail than heavy machine blending.",
      ],
      faqs: [
        {
          question: "What is cream of coconut vs coconut milk?",
          answer: "Cream of coconut (like Coco López) is heavily sweetened coconut cream designed for bartending; coconut milk is unsweetened and much thinner.",
        },
        {
          question: "What rum works best in a Piña Colada?",
          answer: "A combination of light white rum for crispness and aged golden rum for caramel depth produces the most balanced cocktail.",
        },
      ],
      relatedSlugs: ["painkiller", "mai-tai"],
    },
    "bees-knees": {
      recipeCuisine: "American",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Fine mesh strainer"],
      suitableForDiet: undefined,
      originLore:
        "Devised during American Prohibition in the 1920s, widely credited to Frank Meier of the Hôtel Ritz Paris. The addition of rich honey syrup and fresh lemon juice was cleverly used to mask the harsh smell and rough taste of homemade 'bathtub gin'.",
      flavorNotes: "Floral honey, tart lemon zest, botanical juniper, round sweetness",
      barTips: [
        "Dilute honey with warm water in a 3:1 ratio to make honey syrup; pure cold honey will instantly seize and stick to the ice in the shaker.",
        "Use a floral honey like orange blossom or clover to complement the gin botanicals.",
      ],
      faqs: [
        {
          question: "What does the phrase 'Bee's Knees' mean?",
          answer: "A 1920s American flapper slang phrase meaning 'the best' or 'outstanding', matching other vintage idioms like 'the cat's pajamas'.",
        },
        {
          question: "Why can't you put pure honey straight into the shaker?",
          answer: "Ice chills honey immediately, turning it rock-hard. Pre-diluting it into a 3:1 honey syrup allows it to incorporate smoothly.",
        },
      ],
      relatedSlugs: ["gimlet", "french-75"],
    },
    penicillin: {
      recipeCuisine: "American",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer", "Bar spoon"],
      suitableForDiet: undefined,
      originLore:
        "Created in 2005 by Australian bartender Sam Ross at the famed Milk & Honey bar in New York City. Built upon the Gold Rush template, Ross combined blended Scotch with homemade honey-ginger syrup and floated peaty Islay single malt Scotch on top.",
      flavorNotes: "Peaty campfire smoke, spicy ginger, floral honey, mellow malt",
      barTips: [
        "Pour the peaty Islay Scotch gently over the back of a bar spoon so it floats on the surface, releasing intense peat aromatics on every inhale.",
        "Use fresh ginger juice blended with honey for an authentic, spicy culinary kick.",
      ],
      faqs: [
        {
          question: "What gives the Penicillin its medicinal name?",
          answer: "The peaty, iodine-rich smoke of Islay Scotch combined with soothing hot ginger, honey, and lemon evokes classic home remedies and apothecary medicine.",
        },
        {
          question: "Can I use single malt Scotch for the entire drink?",
          answer: "Use smooth blended Scotch (like Monkey Shoulder or Famous Grouse) for the base, reserving expensive Islay single malt (Laphroaig) purely for the aromatic top float.",
        },
      ],
      relatedSlugs: ["whiskey-sour", "rusty-nail"],
    },
    "pisco-sour": {
      recipeCuisine: "Peruvian",
      tools: ["Cocktail shaker", "Jigger", "Hawthorne strainer"],
      suitableForDiet: undefined,
      originLore:
        "Created in Lima, Peru, in the early 1920s by American expat Victor Vaughen Morris at Morris' Bar. Further refined by Peruvian bartender Mario Bruiget at the Gran Hotel Bolívar, who added egg white and aromatic Angostura bitters.",
      flavorNotes: "Bright grape floral, tart Key lime, silky foam, warm aromatic bitters",
      barTips: [
        "The traditional Peruvian ratio is 3:1:1 (3 parts Pisco, 1 part lime juice, 1 part simple syrup).",
        "Place 3 tiny drops of Angostura bitters on the foam crown; they provide a visual accent and neutralize the raw aroma of the egg white.",
      ],
      faqs: [
        {
          question: "What is Pisco?",
          answer: "Pisco is an unaged South American brandy distilled from fermented grape must, native to Peru and Chile, celebrated for floral and fruity esters.",
        },
        {
          question: "Is Peruvian Pisco different from Chilean Pisco?",
          answer: "Peruvian Pisco is strictly single-distilled in copper pot stills without water dilution or oak aging, preserving intense varietal grape terroir.",
        },
      ],
      relatedSlugs: ["whiskey-sour", "daiquiri"],
    },
    painkiller: {
      recipeCuisine: "British Virgin Islands",
      tools: ["Cocktail shaker", "Jigger", "Hurricane glass"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created in the 1970s by Daphne Henderson at the Soggy Dollar Bar on Jost Van Dyke in the British Virgin Islands, so named because patrons had to swim ashore to reach the beach bar. Pusser's Rum later trademarked the official recipe.",
      flavorNotes: "Rich dark rum, creamy coconut, pineapple acidity, warm freshly grated nutmeg",
      barTips: [
        "Freshly grated whole nutmeg over the top of the drink is essential; pre-ground powdered nutmeg lacks the essential oils that define the aroma.",
        "Use high-proof Navy rum (like Pusser's British Navy Rum) to cut through the richness of coconut cream and orange juice.",
      ],
      faqs: [
        {
          question: "How does a Painkiller differ from a Piña Colada?",
          answer: "The Painkiller adds fresh orange juice to pineapple and coconut cream, uses rich dark Navy rum instead of light rum, and is dusted with aromatic nutmeg.",
        },
        {
          question: "What is the origin of the Soggy Dollar Bar name?",
          answer: "The bar had no dock, so guests anchored boats offshore and swam in, paying for drinks with water-soaked dollar bills.",
        },
      ],
      relatedSlugs: ["pina-colada", "mai-tai"],
    },
    "vieux-carre": {
      recipeCuisine: "American",
      tools: ["Mixing glass", "Bar spoon", "Jigger", "Julep strainer"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Invented in 1938 by Walter Bergeron, head bartender at the iconic Carousel Bar inside the Hotel Monteleone in New Orleans. Named in honor of the city's historic French Quarter ('Vieux Carré' or 'Old Square').",
      flavorNotes: "Complex herbal herbal liqueur, spicy rye, velvety Cognac, deep botanical bitters",
      barTips: [
        "Use both Angostura and Peychaud's bitters in equal measure to honor the classic New Orleans aromatic balance.",
        "Stir patiently with large ice cubes until chilled; the combination of high-proof rye and Cognac softens into decadent silkiness.",
      ],
      faqs: [
        {
          question: "What spirits make up a Vieux Carré?",
          answer: "A split-base of equal parts Rye Whiskey, Cognac, and Sweet Vermouth, accented with Bénédictine liqueur and Creole bitters.",
        },
        {
          question: "What is Bénédictine?",
          answer: "A French herbal liqueur developed by Alexandre Le Grand in the 19th century, flavored with 27 plants, herbs, and spices.",
        },
      ],
      relatedSlugs: ["sazerac", "manhattan"],
    },
    "singapore-sling": {
      recipeCuisine: "Singaporean",
      tools: ["Cocktail shaker", "Jigger", "Highball glass"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created around 1915 by Hainanese bartender Ngiam Tong Boon at the Long Bar in Raffles Hotel, Singapore. Designed so that colonial ladies, who were socially forbidden from drinking public alcohol, could sip gin disguised as punch.",
      flavorNotes: "Cherry fruit, herbal complexity, effervescent pineapple, botanical gin",
      barTips: [
        "Use genuine Cherry Heering liqueur and D.O.M. Bénédictine; synthetic cherry syrup turns the cocktail into generic punch.",
        "Shake vigorously with fresh pineapple juice to build a creamy coral-pink froth before topping with soda.",
      ],
      faqs: [
        {
          question: "Why was the Singapore Sling originally created?",
          answer: "In early 20th-century Singapore, etiquette forbade women from consuming alcohol publicly; Ngiam created a pink punch-like cocktail that looked innocent.",
        },
        {
          question: "What glass is traditional for a Singapore Sling?",
          answer: "A tall hurricane or highball glass garnished with a pineapple wedge and Maraschino cherry.",
        },
      ],
      relatedSlugs: ["french-75", "gin-martini"],
    },
    "dark-n-stormy": {
      recipeCuisine: "Bermudian",
      tools: ["Highball glass", "Bar spoon", "Jigger"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "Created in Bermuda after World War I by British naval officers who paired local Gosling's Black Seal Rum with spicy ginger beer brewed by the Royal Naval Officers' Club. Named when a sailor noted the dark rum float resembled a cloud 'only a fool or a dead man would sail under.'",
      flavorNotes: "Molasses spice, fiery ginger, lime snap, effervescent refreshment",
      barTips: [
        "Fill the glass with spicy ginger beer first, then gently float the dark rum on top to create the dramatic stormy cloud aesthetic.",
        "Use real brewed ginger beer with visible sediment and ginger bite, not tame ginger ale soda.",
      ],
      faqs: [
        {
          question: "Is Dark 'n Stormy a trademarked cocktail?",
          answer: "Yes, Gosling Brothers Ltd. holds the registered trademark; under legal definition, it must be prepared with Gosling's Black Seal Rum.",
        },
        {
          question: "How is ginger beer different from ginger ale?",
          answer: "Ginger beer is traditionally brewed and fermented, producing intense spicy ginger heat, whereas ginger ale is mild carbonated ginger-flavored soda.",
        },
      ],
      relatedSlugs: ["mojito", "painkiller"],
    },
    "rusty-nail": {
      recipeCuisine: "Scottish",
      tools: ["Mixing glass or Rocks glass", "Bar spoon", "Jigger"],
      suitableForDiet: undefined,
      originLore:
        "Originated in 1937 under the name B.I.F. at the British Industries Fair. Modernized in the 1960s at the 21 Club in Manhattan and famously adopted as the signature drink of the Rat Pack (Frank Sinatra, Dean Martin, Sammy Davis Jr.).",
      flavorNotes: "Heather honey, peat smoke, herbal spice, warming malt",
      barTips: [
        "Stir gently over a massive clear ice rock; slow dilution is key to allowing the honeyed sweetness of Drambuie to soften the Scotch.",
        "Express a fresh lemon peel over the glass to cut through the liqueur's dense sweetness with crisp citrus oils.",
      ],
      faqs: [
        {
          question: "What is Drambuie?",
          answer: "A Scottish golden liqueur crafted from aged Scotch whisky, Scottish heather honey, aromatic herbs, and secret spices.",
        },
        {
          question: "What is the classic Rusty Nail ratio?",
          answer: "The classic ratio is 2:1 (45ml Blended Scotch to 25ml Drambuie), though modern palates often prefer 3:1 for a drier finish.",
        },
      ],
      relatedSlugs: ["penicillin", "old-fashioned"],
    },
  },
  "zh-CN": {
    negroni: {
      recipeCuisine: "意式",
      tools: ["调酒杯", "吧勺", "量酒器", "茱莉普滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "1919年诞生于意大利佛罗伦萨的卡索尼咖啡馆（Caffè Casoni）。卡米洛·内格罗尼伯爵（Count Camillo Negroni）要求调酒师福斯科·斯卡塞利将美式咖啡鸡尾酒（Americano）中的苏打水替换为金酒以增加烈度。调酒师用橙片代替了原有的柠檬皮，标志着经典内格罗尼的诞生。",
      flavorNotes: "苦甜平衡、草本芬芳、橙皮清香、浓郁直接",
      barTips: [
        "使用老冰块在调酒杯中匀速搅拌30秒，获得20-25%的理想化水率，保证酒体圆润而苦韵不减。",
        "将新鲜橙皮置于杯口上方对折挤压，让橙皮精油充分雾化附着在酒液表面提升香气层次。",
      ],
      faqs: [
        {
          question: "内格罗尼的经典比例是什么？",
          answer: "国际调酒师协会（IBA）经典比例为均等的1:1:1：30毫升伦敦干金酒、30毫升金巴利（Campari）和30毫升红威末酒（甜苦艾酒）。",
        },
        {
          question: "内格罗尼应该摇和还是搅拌？",
          answer: "必须搅拌。摇和会打入细碎空气气泡使酒液浑浊，破坏其标志性的红宝石透亮色泽与丝滑稠密的口感。",
        },
      ],
      relatedSlugs: ["boulevardier", "aperol-spritz"],
    },
    margarita: {
      recipeCuisine: "墨西哥",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "20世纪30至40年代诞生于墨西哥，普遍认为是蒂华纳调酒师卡洛斯·埃雷拉或社交名媛玛格丽特·萨姆斯所创。它以经典黛西（Daisy）鸡尾酒架构为基础，将白兰地替换为100%蓝色龙舌兰酒，搭配标志性的盐边。",
      flavorNotes: "酸爽明亮、咸感矿物、植物辛香、微甜平衡",
      barTips: [
        "抹盐边时建议仅蘸取半圈杯口，方便饮用者自由选择每口的咸度体验。",
        "切忌使用瓶装浓缩柠檬汁，鲜榨青柠汁是保留天然柑橘酸香与微苦层次的灵魂。",
      ],
      faqs: [
        {
          question: "制作玛格丽特选用什么龙舌兰最好？",
          answer: "推荐选用100% Blue Agave（纯蓝色龙舌兰）的Blanco（银色/未陈酿）龙舌兰，能呈现最纯粹干净的植物草本风味与柑橘香。",
        },
        {
          question: "玛格丽特的经典配方比例是什么？",
          answer: "IBA经典比例通常为7:4:3，即50毫升龙舌兰、30毫升君度橙酒（Cointreau）和20毫升新鲜青柠汁。",
        },
      ],
      relatedSlugs: ["paloma", "daiquiri"],
    },
    "old-fashioned": {
      recipeCuisine: "美式",
      tools: ["调酒杯", "吧勺", "压汁棒", "量酒器"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "最原始的鸡尾酒原型，可追溯至1806年鸡尾酒最早的文字定义：烈酒、糖、水与苦精。19世纪80年代由肯塔基州路易斯维尔的彭德尼斯俱乐部（Pendennis Club）定型，并经由纽约华尔道夫酒店名扬世界。",
      flavorNotes: "酒感沉稳、橡木烘烤、焦糖温润、香料余韵",
      barTips: [
        "选用单一整颗高纯度老冰块（透明大方冰或老冰球），降低化水速度，保持低温而不稀释威士忌的麦香与酒体。",
        "将方糖置于杯中，滴入苦精与极少温水，用压棒彻底捣化融合后再加入威士忌与冰块慢搅。",
      ],
      faqs: [
        {
          question: "古典鸡尾酒用波本还是黑麦威士忌？",
          answer: "黑麦威士忌（Rye）带有更多胡椒与谷物辛香，更贴近历史原貌；波本威士忌（Bourbon）则带来更浓厚的香草、太妃糖与甜润木质香。",
        },
        {
          question: "做古典鸡尾酒需要捣碎橙肉或樱桃吗？",
          answer: "禁酒令时期的改良做法会捣碎水果，但经典复古做法仅使用橙皮挤压释放天然精油，保持纯净利落的酒香。",
        },
      ],
      relatedSlugs: ["manhattan", "sazerac"],
    },
    daiquiri: {
      recipeCuisine: "古巴",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重细滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "1898年前后由美国采矿工程师詹宁斯·考克斯在古巴戴克里铁矿区发明。后由哈瓦那传奇小佛罗里达酒吧（El Floridita）的调酒大师康斯坦蒂诺·里巴拉伊瓜推向巅峰，深受文豪海明威钟爱。",
      flavorNotes: "酸甜清脆、甘蔗清香、轻盈爽利、纯净优雅",
      barTips: [
        "使用硬质老冰块剧烈摇和12至15秒，使空气充分乳化果汁与酒液，在表面激起极细密的微晶浮沫。",
        "使用双重细滤网过滤，隔绝细碎小冰碴，保证入口如丝缎般柔滑纯粹。",
      ],
      faqs: [
        {
          question: "经典戴克里是用白朗姆还是深色朗姆？",
          answer: "正统经典戴克里采用古巴或加勒比白朗姆酒（Carta Blanca），凸显青柠酸香与甘蔗原始鲜爽。",
        },
        {
          question: "经典戴克里是沙冰还是滤出直接饮用？",
          answer: "纯正经典戴克里是摇和后滤入冰镇浅碟香槟杯（Coupe）中饮用，并非冰沙搅拌机打出的沙冰款。",
        },
      ],
      relatedSlugs: ["margarita", "gimlet"],
    },
    "espresso-martini": {
      recipeCuisine: "英式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "1983年由伦敦传奇调酒大师迪克·布拉德塞尔（Dick Bradsell）在Fred's Club发明。一位当红超模要求一杯能'让我清醒，又让我微醺'的酒，布拉德塞尔便将新鲜现萃的热浓缩咖啡与伏特加、咖啡利口酒混合摇匀。",
      flavorNotes: "深烘可可、烘烤榛果、苦甜适口、丰厚油脂泡沫",
      barTips: [
        "必须使用新鲜萃取且带有一层厚油脂（Crema）的热浓缩咖啡，冷萃液或即溶咖啡无法产生标志性的乳化厚奶沫。",
        "浓缩咖啡刚冲出注入壶后应立即加大块硬冰全力暴摇，令天然咖啡油脂在剧烈温差与撞击下生成持久奶沫。",
      ],
      faqs: [
        {
          question: "浓缩咖啡马天尼表面厚厚的油脂泡沫怎么做出来的？",
          answer: "新鲜浓缩咖啡自带的植物油脂在加冰高速猛烈摇和15秒后充分乳化，静置后自然浮在表层形成厚厚奶沫。",
        },
        {
          question: "杯顶漂浮的三颗咖啡豆代表什么寓意？",
          answer: "这是传统意大利与英式酒吧礼仪，三颗咖啡豆分别象征健康、财富与幸福。",
        },
      ],
      relatedSlugs: ["manhattan", "gin-martini"],
    },
    "aperol-spritz": {
      recipeCuisine: "意式",
      tools: ["大葡萄酒杯", "吧勺", "量酒器"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "起源于意大利威尼托大区，演变自19世纪奥匈帝国士兵向浓郁意大利葡萄酒中喷入（Spritz）苏打水降度的习俗。1919年阿佩罗开胃酒在帕多瓦诞生后，与普罗塞克起泡酒结合成了享誉全球的金色日落特调。",
      flavorNotes: "柑橘清香、气泡跳跃、草本苦甜、阳光明朗",
      barTips: [
        "严格遵循3-2-1黄金法则：3份普罗塞克（90毫升）、2份阿佩罗（60毫升）、1份苏打水（30毫升）。",
        "先放满大冰块，再倒起泡酒，最后螺旋注入阿佩罗，让比重自然的对流融合，无需大幅度搅拌以保全气泡。",
      ],
      faqs: [
        {
          question: "为什么要先倒普罗塞克起泡酒再倒阿佩罗？",
          answer: "阿佩罗比重大于起泡酒，自上而下沉降能实现天然均匀混合，避免多余搅拌释放二氧化碳导致跑气。",
        },
        {
          question: "苏打水可以用汤力水代替吗？",
          answer: "不推荐。汤力水含有奎宁和大量糖分，会掩盖破坏阿佩罗本身大黄与龙胆草的轻盈草本层次。",
        },
      ],
      relatedSlugs: ["negroni", "french-75"],
    },
    mojito: {
      recipeCuisine: "古巴",
      tools: ["高球杯", "压汁棒", "吧勺", "量酒器"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "可追溯至16世纪哈瓦那，英国私掠船长弗朗西斯·德雷克的船员用甘蔗烈酒配上薄荷、青柠与糖水御寒治病（时称El Draque）。后在哈瓦那五分钱小酒馆（La Bodeguita del Medio）定型为现代朗姆高球。",
      flavorNotes: "留兰薄荷、新鲜青柠、甘蔗甘润、气泡爽口",
      barTips: [
        "压榨薄荷叶时只需轻压释放叶片腺体精油，切勿大力扭转或碾碎叶肉，否则会释出苦涩叶绿素。",
        "填入大量碎冰并将薄荷叶与青柠块从杯底提拉至杯身各处，确保冰爽与香气在整杯中均匀分布。",
      ],
      faqs: [
        {
          question: "制作莫吉托最好的薄荷是什么品种？",
          answer: "古巴传统使用圆叶留兰香薄荷（Hierba Buena），香气比普通欧薄荷更柔润温和，带有微微柑橘芳香。",
        },
        {
          question: "白砂糖与糖浆哪种更好？",
          answer: "传统古巴做法使用细蔗糖粒带来微磨砂质感；而使用1:1蔗糖糖浆则能确保快速完全溶解，甜度更匀称。",
        },
      ],
      relatedSlugs: ["daiquiri", "caipirinha"],
    },
    manhattan: {
      recipeCuisine: "美式",
      tools: ["调酒杯", "吧勺", "量酒器", "茱莉普滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "19世纪70年代初诞生于纽约曼哈顿俱乐部。民间常传闻由丘吉尔之母伦道夫·丘吉尔夫人举办宴会时发明，但历史记载实为该俱乐部一位名为布莱克的传奇调酒师所创，被称为鸡尾酒皇后。",
      flavorNotes: "酒体醇厚、胡椒辛香、暗红果味、苦艾草本",
      barTips: [
        "黑麦威士忌的胡椒辛辣感是支撑红威末酒果香甜感的坚实骨架；开封后的红威末酒必须冷藏保存以防氧化发酸。",
        "搅拌时手腕发力平缓顺滑，将酒液温度降至接近0℃同时保持澄澈无瑕。",
      ],
      faqs: [
        {
          question: "曼哈顿的经典配比是怎样的？",
          answer: "最经得起考验的比例为2:1：60毫升黑麦威士忌、30毫升甜红威末酒，加2滴安格仕苦精（Angostura）。",
        },
        {
          question: "曼哈顿装饰选用什么樱桃？",
          answer: "必须使用浸泡在天然黑樱桃汁中的意大利马拉斯卡樱桃（如Luxardo），切勿使用人工染色的鲜红糖精樱桃。",
        },
      ],
      relatedSlugs: ["old-fashioned", "boulevardier"],
    },
    sazerac: {
      recipeCuisine: "美式",
      tools: ["两个古典杯", "调酒杯", "吧勺", "量酒器"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "19世纪30年代诞生于新奥尔良，药剂师安东·佩绍德最初使用干邑白兰地调制。19世纪70年代法国葡萄根瘤蚜虫害导致干邑断供，当地调酒师转而使用美洲黑麦威士忌，并加入苦艾酒（Absinthe）润杯，成为新奥尔良官方鸡尾酒。",
      flavorNotes: "茴香幽香、辛辣黑麦、花香苦精、柠檬精油",
      barTips: [
        "准备两只杯子，一只用来在冰水中彻底冰杯并喷洒苦艾酒润杯，另一只调酒杯搅拌酒液，滤入后不加冰块饮用。",
        "将柠檬皮对折挤入精油后即可弃置或搭在杯沿，切勿扔进酒中，以免果肉苦白破坏香气纯粹度。",
      ],
      faqs: [
        {
          question: "萨泽拉克为什么一定要润杯苦艾酒？",
          answer: "苦艾酒的草本八角与茴香香气附着在杯壁，使得每次凑近杯口都能闻到幽深草本气息，却不喧宾夺主。",
        },
        {
          question: "为什么萨泽拉克杯中不留冰块？",
          answer: "纯饮无冰（Neat）能保持酒精度与香气的浓度，避免冰块融化过水，随着杯壁微温逐步释放黑麦层次。",
        },
      ],
      relatedSlugs: ["old-fashioned", "vieux-carre"],
    },
    paloma: {
      recipeCuisine: "墨西哥",
      tools: ["高球杯", "吧勺", "量酒器"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "墨西哥当地最流行、饮用量最大的龙舌兰鸡尾酒，相传由哈利斯科州特基拉镇La Capilla酒吧传奇老板唐·哈维尔发明。名字源自19世纪家喻户晓的墨西哥民歌《鸽子》（La Paloma）。",
      flavorNotes: "红柚微酸、气泡爽利、龙舌兰清润、咸香提味",
      barTips: [
        "在杯沿一侧滚上一道细海盐或墨西哥辣椒盐（Tajín），能衬托出西柚的果甜并中和微涩。",
        "如果使用的西柚苏打偏甜，可额外补入5-10毫升新鲜青柠汁提鲜平衡酸度。",
      ],
      faqs: [
        {
          question: "帕洛玛用新鲜西柚汁好还是西柚苏打好？",
          answer: "传统墨西哥街头做法使用西柚苏打（如Squirt或Jarritos）；现代精酿酒吧也常用鲜榨红柚汁加少量糖浆并以气泡水补足。",
        },
        {
          question: "帕洛玛与玛格丽特有什么核心区别？",
          answer: "玛格丽特是短饮、酸甜浓郁型；帕洛玛是长饮高球、西柚果味主导且带有充沛碳酸气泡，更为解渴爽口。",
        },
      ],
      relatedSlugs: ["margarita", "french-75"],
    },
    "paper-plane": {
      recipeCuisine: "美式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "2008年由现代调酒大师萨姆·罗斯（Sam Ross）为芝加哥The Violet Hour酒吧创作。名字取自研发当时酒吧循环播放的嘻哈歌手M.I.A.成名金曲《Paper Planes》。",
      flavorNotes: "阿尔卑斯草本、苦甜优雅、明亮柠檬酸、温暖波本橡木",
      barTips: [
        "必须使用正统诺尼诺阿玛罗（Amaro Nonino），其特有的渣酿白兰地底蕴与草本果香是其他深色草本苦酒无法替代的。",
        "严格遵守1:1:1:1各四分之一的等比例构架，任何一种原料过多都会打破酸、苦、甜、烈的微妙平衡。",
      ],
      faqs: [
        {
          question: "纸飞机鸡尾酒的四种配料是什么？",
          answer: "等比例（各22.5毫升）的波本威士忌、阿佩罗开胃酒、诺尼诺阿玛罗利口酒（Amaro Nonino）与新鲜柠檬汁。",
        },
        {
          question: "纸飞机和临别一语（Last Word）有什么关系？",
          answer: "萨姆·罗斯正是以临别一语等比例架构为灵感，用波本和意大利草本苦酒进行现代变体创作。",
        },
      ],
      relatedSlugs: ["last-word", "naked-and-famous"],
    },
    boulevardier: {
      recipeCuisine: "法式",
      tools: ["调酒杯", "吧勺", "量酒器", "滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "20世纪20年代禁酒令时期诞生于巴黎，由移居法国的美国作家、《花花公子》（The Boulevardier）月刊创始人厄斯金·格温所创。1927年被哈利·麦克尔霍恩收录于著名的《Barflies and Cocktails》一书中。",
      flavorNotes: "浓郁焦糖香草、龙胆草苦香、红果微甘、坚实温暖",
      barTips: [
        "采用稍多威士忌的比例（45毫升波本配各30毫升金巴利与甜苦艾），能防止高酒精度的苦味完全淹没威士忌的麦香与橡木质感。",
        "可根据个人偏好选用橙皮（提亮柑橘精油清新度）或酒渍樱桃（加深甜润尾韵）。",
      ],
      faqs: [
        {
          question: "花花公子（Boulevardier）和内格罗尼有什么区别？",
          answer: "花花公子将金酒替换为波本或黑麦威士忌，赋予整杯酒更厚重温暖的香草、木质与焦糖底蕴。",
        },
        {
          question: "花花公子推荐加冰块还是直接纯饮？",
          answer: "两种皆可。盛入浅碟香槟杯直接纯饮风味聚焦深邃；放入老方冰慢饮则苦味更柔和舒展。",
        },
      ],
      relatedSlugs: ["negroni", "manhattan"],
    },
    "mai-tai": {
      recipeCuisine: "美式波利尼西亚",
      tools: ["摇酒壶", "量酒器", "霍桑滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "1944年由提基（Tiki）文化先驱维克多·伯杰龙（Trader Vic）在加州奥克兰创立。当他把用17年牙买加朗姆酒调好的酒端给大溪地朋友品尝时，对方惊呼'Maita'i roa a'e!'（大溪地语：无与伦比的美妙！），因而得名。",
      flavorNotes: "烘烤杏仁香、野生牙买加朗姆酯香、清亮青柠、柑橘果甜",
      barTips: [
        "正统欧洽糖（Orgeat，天然杏仁橙花糖浆）是1944年配方的灵魂核心，绝不可用普通白糖浆简单代替。",
        "挤完汁的青柠壳浮于酒面，插上茂盛鲜薄荷枝，象征南太平洋的热带岛屿与棕榈树。",
      ],
      faqs: [
        {
          question: "真正的经典迈泰有菠萝汁或橙汁吗？",
          answer: "绝对没有。1944年Trader Vic原始配方中除了新鲜青柠汁外没有任何热带果汁；菠萝汁与橙汁是50年代夏威夷旅游业的改良产物。",
        },
        {
          question: "迈泰怎样调配朗姆酒最正宗？",
          answer: "建议混合30毫升重酯类牙买加壶式蒸馏朗姆酒与30毫升马提尼克岛农业朗姆酒（Rhum Agricole），获得浓郁深邃的复合风味。",
        },
      ],
      relatedSlugs: ["jungle-bird", "painkiller"],
    },
    "last-word": {
      recipeCuisine: "美式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重细滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "约于1916年禁酒令前期诞生于底特律体育俱乐部（Detroit Athletic Club），1951年收录于特德·索谢的著作中。沉寂半个多世纪后，2004年被西雅图Zig Zag传奇调酒师默里·斯滕森重新发掘，掀起了席卷全球的经典复兴风潮。",
      flavorNotes: "高山草本幽香、黑樱桃核仁甘美、青柠锐利、松针杜松子",
      barTips: [
        "绿荨麻酒（Green Chartreuse）酒精度高达55%且草本味极浓，必须严格保持1:1:1:1均等比例以防药草味失衡。",
        "用力摇和使极低温度锁住高酒精度，带来丝滑平衡的舌尖触感。",
      ],
      faqs: [
        {
          question: "绿荨麻酒（Green Chartreuse）是什么？",
          answer: "由法国卡尔特会修士自1737年起秘密酿制的天然草本利口酒，采用130种高山植物与草药浸泡蒸馏而成。",
        },
        {
          question: "可以用普通樱桃利口酒替代黑樱桃酒（Maraschino）吗？",
          answer: "不能。Luxardo黑樱桃酒是用酸樱桃连同果核一起蒸馏的干型澄清烈酒，带有独特的杏仁坚果香与花香，而非甜腻果酱味。",
        },
      ],
      relatedSlugs: ["paper-plane", "corpse-reviver-2"],
    },
    aviation: {
      recipeCuisine: "美式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "20世纪初由纽约瓦里克酒店（Hotel Wallick）首席调酒师雨果·恩斯林创作，载于1916年出版的鸡尾酒谱。旨在致敬人类翱翔蓝天的飞行时代拂晓，紫罗兰利口酒为整杯酒带来如初晴天际般的淡蓝微紫色泽。",
      flavorNotes: "紫罗兰花香、樱桃果仁、清新柠檬、杜松子干香",
      barTips: [
        "紫罗兰利口酒极易压过其他风味，建议精准控制在一吧勺（约5毫升），呈现通透晴空浅蓝色，过多会呈现肥皂水质感。",
        "选用杜松子风味挺拔的伦敦干金酒，能与花果香气形成稳固对峙与支撑。",
      ],
      faqs: [
        {
          question: "飞行鸡尾酒特有的天蓝色从何而来？",
          answer: "来自紫罗兰利口酒（Crème de Violette），由天然紫罗兰花瓣萃取调配而成。",
        },
        {
          question: "没有紫罗兰酒能做飞行吗？",
          answer: "1930年萨伏伊鸡尾酒手册曾删去该成分，此时口感类似金酒酸酒，但缺少了标志性的蓝天色泽与幽微花香。",
        },
      ],
      relatedSlugs: ["last-word", "gin-martini"],
    },
    "french-75": {
      recipeCuisine: "法式",
      tools: ["摇酒壶", "量酒器", "香槟笛形杯"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "一战期间（约1915年）由哈利·麦克尔霍恩在巴黎纽约酒吧研发。以法国当时著名的75毫米野战轻型加农炮命名，据说品尝时气泡与烈酒的冲击感就像挨了一记精准的75毫米炮弹后劲。",
      flavorNotes: "清爽起泡、烘烤酵母、柠檬酸香、草本金酒、轻盈欢欣",
      barTips: [
        "选择口感干爽（Brut）的高品质香槟或传统法起泡酒，收口干净利落不甜腻。",
        "金酒、柠檬汁与糖浆先行加冰摇透彻底冰镇，滤入长相思笛形杯后再注入冰香槟，保留最佳气泡。",
      ],
      faqs: [
        {
          question: "法式75是用金酒还是干邑白兰地？",
          answer: "早期法国与新奥尔良传统常使用干邑，但IBA国际通用规范以伦敦干金酒为主流基酒。",
        },
        {
          question: "法式75杯中需要加冰块吗？",
          answer: "传统上直接盛入冰镇香槟杯中不加冰块饮用，能够最大程度展示气泡升腾的美感与细腻度。",
        },
      ],
      relatedSlugs: ["gimlet", "aperol-spritz"],
    },
    "gin-martini": {
      recipeCuisine: "美式",
      tools: ["调酒杯", "吧勺", "量酒器", "茱莉普滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "19世纪晚期由马丁内斯（Martinez）鸡尾酒演化而来。到了20世纪二三十年代，伦敦干金酒与法国干苦艾酒确立了现代马天尼的严谨身姿，成为西方流行文化中无可替代的'鸡尾酒之王'与绅士优雅标志。",
      flavorNotes: "纯粹杜松子、凛冽草本、干白葡萄酒芬芳、优雅微咸",
      barTips: [
        "匀速顺滑搅拌45至50秒，必须将酒体温度降至零度甚至微负（-2℃至-3℃）形成微稠油滑质感。",
        "金酒可预先冷冻，干苦艾酒开封后务必冷藏，以防芳香物质挥发氧化酸败。",
      ],
      faqs: [
        {
          question: "经典干马天尼的标准比例是多少？",
          answer: "经典干马天尼（Dry Martini）普遍采用5:1配比：60毫升干金酒对12毫升干苦艾酒，配一滴橙味苦精。",
        },
        {
          question: "为什么詹姆斯·邦德要'摇匀而不是搅拌'？",
          answer: "摇和会打破酒液产生微气泡与冰碴使降温极快，但专业调酒通常坚持搅拌以保全清亮如水晶的质感与厚实酒体。",
        },
      ],
      relatedSlugs: ["aviation", "negroni"],
    },
    "corpse-reviver-2": {
      recipeCuisine: "英式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "1930年收录于哈里·克拉多克的《萨伏伊鸡尾酒手册》。属于历史上著名的'还魂酒'家族，专供宿醉晨起醒神，克拉多克曾调侃：'连喝四杯这酒，原本复活的尸体只怕又要归西了。'",
      flavorNotes: "八角茴香微苦、明亮柑橘、白利口酒花香、金酒挺拔",
      barTips: [
        "只需用苦艾酒在冰好的酒杯内壁薄薄润上一圈并倒掉多余残液，切勿直接将苦艾酒倒入摇酒壶。",
        "选用Cocchi Americano或Kina L'Aéro d'Or能够忠实还原当年老配方中富含金鸡纳树皮的苦香微涩感。",
      ],
      faqs: [
        {
          question: "还魂酒2号的配方比例是什么？",
          answer: "等比例（各22.5毫升）的金酒、君度橙酒、丽叶白葡萄酒（Lillet Blanc/Cocchi）和新鲜柠檬汁，附苦艾酒润杯。",
        },
        {
          question: "润杯的作用是什么？",
          answer: "让草本茴香芳香精油附着在杯口玻璃上，饮用时先声夺人，又不会破坏内里酒液的平衡感。",
        },
      ],
      relatedSlugs: ["last-word", "gimlet"],
    },
    "jungle-bird": {
      recipeCuisine: "马来西亚",
      tools: ["摇酒壶", "量酒器", "霍桑滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "1973年由吉隆坡希尔顿酒店鸟舍酒吧（Aviary Bar）首席调酒师杰弗里·翁（Jeffrey Ong）创作，作为给客人的迎宾特调。1989年被约翰·波伊斯特收录至鸡尾酒著作而走向世界。",
      flavorNotes: "浓郁焦糖糖蜜、金巴利草本苦韵、热带菠萝果香、青柠明爽",
      barTips: [
        "选用未加糖的新鲜生榨菠萝汁，强力剧烈摇和能将菠萝酵素乳化成厚达一厘米的丰满绵密泡沫。",
        "基酒推荐选用深黑糖蜜朗姆酒（Blackstrap）或牙买加高酯朗姆，方能压制住金巴利的强劲苦涩。",
      ],
      faqs: [
        {
          question: "热带朗姆鸡尾酒里为什么会出现金巴利（Campari）？",
          answer: "金巴利的龙胆草与苦橙皮苦味巧妙化解了深色朗姆酒的厚重与菠萝汁的高甜，赋予前所未有的开胃深度。",
        },
        {
          question: "丛林鸟表面厚厚的奶白色泡沫是怎么来的？",
          answer: "鲜榨菠萝汁富含天然蛋白质和活性酶，在与硬冰高速撞击碰撞摇和后会天然膨胀乳化成绵厚浮沫。",
        },
      ],
      relatedSlugs: ["mai-tai", "negroni"],
    },
    "naked-and-famous": {
      recipeCuisine: "美式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "2011年由纽约著名酒吧Death & Co明星调酒师华金·西莫（Joaquín Simó）创作。他将其幽默地称为'经典临别一语和纸飞机生下的私生子'，是当代以龙舌兰植物烈酒为核心的新经典代表。",
      flavorNotes: "矿物泥土烟熏、草本微苦、龙胆甜润、酸爽青柠",
      barTips: [
        "选择风味干净、带有天然泥土与矿石烟熏香气的手工Espadín梅斯卡尔，避免过度工业化浓烟味。",
        "必须使用黄荨麻酒（Yellow Chartreuse，43% ABV），其较绿荨麻酒更温和甘润，带有藏红花与蜂蜜香气，能与阿佩罗无缝融汇。",
      ],
      faqs: [
        {
          question: "赤身成名的四种成分是什么？",
          answer: "等比例（各22.5毫升）的梅斯卡尔烟熏龙舌兰、黄荨麻酒、阿佩罗开胃酒和新鲜青柠汁。",
        },
        {
          question: "可以用绿荨麻酒代替黄荨麻酒吗？",
          answer: "不可替代。绿荨麻酒酒精度高达55%且药草味极烈，会彻底盖过阿佩罗柔和的果香。",
        },
      ],
      relatedSlugs: ["paper-plane", "last-word"],
    },
    sidecar: {
      recipeCuisine: "法式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "第一次世界大战结束时诞生，巴黎哈利纽约酒吧和伦敦巴克俱乐部均宣称发明权。相传以当时经常乘坐跨斗摩托车（Sidecar）往返于巴黎小酒馆的一位美国陆战队上尉命名。",
      flavorNotes: "干邑陈年橡木、糖渍橙皮香气、柠檬明快、糖边清甜",
      barTips: [
        "仅在杯沿外侧滚上细砂糖圈（半圈即可），避免糖粒落入杯中破坏鸡尾酒本身的干爽骨架。",
        "选用优质VSOP干邑白兰地，其干果、香草与花香能与君度橙酒的精油感完美契合。",
      ],
      faqs: [
        {
          question: "边车鸡尾酒的经典配方比例是什么？",
          answer: "正统法国配方一般为5:2:2：50毫升干邑白兰地、20毫升君度橙酒、20毫升新鲜柠檬汁。",
        },
        {
          question: "糖边是必须制作的吗？",
          answer: "糖边虽然是传统标志，但现代调酒师常选择做半圈糖边或完全免除，让客人纯粹感受干邑与柑橘的自然甜酸。",
        },
      ],
      relatedSlugs: ["daiquiri", "vieux-carre"],
    },
    gimlet: {
      recipeCuisine: "英式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "19世纪晚期诞生于英国皇家海军舰队，旨在预防船员远洋坏血病。相传由海军军医总监托马斯·吉姆莱特爵士（Sir Thomas Gimlette）倡导将每日配给的金酒与玫瑰牌青柠浓缩汁混合饮用。",
      flavorNotes: "锐利柑橘、杜松子松针、酸甜利落、冰透澄澈",
      barTips: [
        "自制青柠浓浆（鲜青柠汁浸泡青柠果皮精油与蔗糖慢熬）相比市售工业果露能够带来惊人的鲜活果皮精油芬芳。",
        "加入大块硬冰全力快速摇匀，双重滤网滤入冰镇浅碟香槟杯，酒体澄澈无任何冰渣。",
      ],
      faqs: [
        {
          question: "青柠汁和青柠浓浆（Lime Cordial）有什么区别？",
          answer: "青柠浓浆富含果皮精油和浓缩糖酸，比单调的新鲜青柠汁风味更丰富深沉，带有一抹糖渍果皮香。",
        },
        {
          question: "吉姆莱特用金酒还是伏特加？",
          answer: "英国海军历史原版始终采用干金酒，不过20世纪中叶伏特加吉姆莱特也在美式酒吧广为流行。",
        },
      ],
      relatedSlugs: ["daiquiri", "aviation"],
    },
    "whiskey-sour": {
      recipeCuisine: "美式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重滤网"],
      suitableForDiet: undefined,
      originLore:
        "1862年杰里·托马斯在第一部《调酒师指南》中首次正式记载，但其实早在19世纪初就已是美国水手和拓荒者的日常饮品。20世纪初引入蛋白作为乳化剂（又称波士顿酸酒），成就了如今广受追捧的绵密奶盖质感。",
      flavorNotes: "香草橡木、柠檬酸爽、如丝绵密乳化、烘焙香料余韵",
      barTips: [
        "采用'反向干摇法'（先加冰摇冷摇透，滤除冰块后再无冰空摇10秒），可产生最绵密致密的蛋白雪顶奶沫。",
        "在洁白泡沫顶端滴入三滴安格仕苦精并用竹签拉花，能彻底掩盖生蛋腥味并提供美妙香料前调。",
      ],
      faqs: [
        {
          question: "威士忌酸酒加蛋白的作用是什么？",
          answer: "蛋白本身没有味道，但在剧烈摇和后会产生丝绒般润滑的质感，并在顶部形成一层厚厚的细腻泡沫。",
        },
        {
          question: "如果素食或不吃生鸡蛋怎么办？",
          answer: "可用15毫升鹰嘴豆水（Aquafaba）替代蛋白，摇出的泡沫质感与生蛋白几乎完全一致且无任何异味。",
        },
      ],
      relatedSlugs: ["penicillin", "old-fashioned"],
    },
    caipirinha: {
      recipeCuisine: "巴西",
      tools: ["古典杯", "压汁棒", "吧勺"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "巴西国饮鸡尾酒，约1918年起源于圣保罗州乡村，最初作为抵御西班牙流感的民间偏方。其名字源自'caipira'，意为来自巴西内陆偏远乡村的淳朴乡民。",
      flavorNotes: "天然青绿甘蔗草本、浓郁青柠果皮精油、清甜直接、原始奔放",
      barTips: [
        "将青柠切成小角并剔除中央白色果芯，压汁时只需挤出汁水与表皮精油，避免压碎苦涩白色内膜。",
        "直接在古典杯中就地捣压砂糖与青柠角，完全化开后再填满碎冰注入卡莎萨烈酒，风味最接地气。",
      ],
      faqs: [
        {
          question: "巴西卡莎萨（Cachaça）和普通朗姆酒有什么区别？",
          answer: "朗姆酒多用熬煮后的废糖蜜发酵，而巴西卡莎萨必须由新鲜未精炼的原生甘蔗原汁直接发酵蒸馏，带有独特的青绿植物芳香。",
        },
        {
          question: "什么是卡皮罗斯卡（Caipiroska）？",
          answer: "这是巴西国饮风靡全球后的流行变体，将巴西甘蔗酒替换为伏特加。",
        },
      ],
      relatedSlugs: ["mojito", "daiquiri"],
    },
    "pina-colada": {
      recipeCuisine: "波多黎各",
      tools: ["搅拌机或摇酒壶", "量酒器", "飓风杯"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "1954年由调酒师拉蒙·马雷罗在波多黎各圣胡安的加勒比希尔顿酒店发明。1978年被正式指定为波多黎各官方国饮，西班牙语原意即为'过滤菠萝汁'。",
      flavorNotes: "浓郁椰子乳脂、热带熟甜菠萝、金朗姆香草焦糖、柔滑冰爽",
      barTips: [
        "务必选用调酒专用的椰子甜奶油（如Coco López Cream of Coconut），切忌使用普通稀薄无糖椰汁或椰浆烹饪乳。",
        "加碎冰用摇酒壶剧烈爆摇相比搅拌机打冰沙口感更细腻轻盈，不会因过度稀释变得水感扁平。",
      ],
      faqs: [
        {
          question: "椰子甜奶油（Cream of Coconut）和椰浆有什么区别？",
          answer: "椰子甜奶油含高浓度糖分与天然乳化椰油，专供调制热带鸡尾酒；普通椰浆无糖且较稀薄。",
        },
        {
          question: "皮纳科拉达用什么朗姆酒最好？",
          answer: "建议搭配白朗姆的清爽与陈年金朗姆的太妃糖香，带来更立体的甘蔗风味基底。",
        },
      ],
      relatedSlugs: ["painkiller", "mai-tai"],
    },
    "bees-knees": {
      recipeCuisine: "美式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "双重滤网"],
      suitableForDiet: undefined,
      originLore:
        "诞生于20世纪20年代美国禁酒令时期，广泛归功于巴黎丽兹酒店传奇调酒师弗兰克·迈尔。当时加入大量鲜柠檬汁与天然花蜜，巧妙掩盖了私酿'浴缸金酒'的劣质粗糙气味。",
      flavorNotes: "百花蜂蜜芬芳、清新柠檬微酸、杜松子松香、温润饱满",
      barTips: [
        "蜂蜜必须先用温水按3:1或2:1比例稀释成蜂蜜糖浆，纯蜂蜜遇冷冰块会瞬间冻结凝固贴在壶壁无法化开。",
        "选用柑橘花蜜或三叶草蜜能与金酒的植物芳香相得益彰，切忌使用风味过冲的深色荞麦蜜。",
      ],
      faqs: [
        {
          question: "'Bee's Knees'这个俚语是什么意思？",
          answer: "源自20年代爵士时代的美国潮流俚语，意为'极其出众、顶呱呱的优秀之物'。",
        },
        {
          question: "为什么蜂蜜不能直接倒进加冰摇酒壶？",
          answer: "冰块会使纯蜂蜜立刻硬化结块，无法与酸汁和烈酒充分乳化溶解。",
        },
      ],
      relatedSlugs: ["gimlet", "french-75"],
    },
    penicillin: {
      recipeCuisine: "美式",
      tools: ["摇酒壶", "量酒器", "霍桑滤网", "吧勺"],
      suitableForDiet: undefined,
      originLore:
        "2005年由澳大利亚调酒大师萨姆·罗斯在纽约传奇酒吧Milk & Honey发明。在现代经典金潮（Gold Rush）架构上，将苏格兰调和威士忌与自制蜂蜜生姜糖浆结合，并在表层浮上一层泥煤单一麦芽威士忌。",
      flavorNotes: "艾雷岛篝火烟熏、生姜微辛火热、蜂蜜花香、麦芽圆润",
      barTips: [
        "艾雷岛泥煤威士忌只需轻轻顺着吧勺背面引流漂浮在表面，让饮用者每抿一口都先闻到汹涌的烟熏药香。",
        "自制生姜汁糖浆应使用新鲜生姜压汁，生姜的辛辣能激活蜂蜜的甜度并中和泥煤重口味。",
      ],
      faqs: [
        {
          question: "盘尼西林（青霉素）的名字是怎么来的？",
          answer: "艾雷岛威士忌的泥煤与碘酒药感，配合热姜、蜂蜜、柠檬，神似传统暖身防感冒的药剂偏方而得名。",
        },
        {
          question: "可以用单一麦芽威士忌调制整杯酒吗？",
          answer: "不推荐。用温和顺滑的调和苏格兰威士忌打底，顶层漂浮少量昂贵强劲的艾雷岛单麦（如拉弗格）才是其精妙精髓。",
        },
      ],
      relatedSlugs: ["whiskey-sour", "rusty-nail"],
    },
    "pisco-sour": {
      recipeCuisine: "秘鲁",
      tools: ["摇酒壶", "量酒器", "霍桑滤网"],
      suitableForDiet: undefined,
      originLore:
        "20世纪20年代初诞生于秘鲁利马，由莫里斯酒吧美籍老板维克多·莫里斯所创。后由玻利瓦尔大酒店调酒大师马里奥·布鲁伊盖特完善加入蛋白与安格仕苦精，被奉为秘鲁无可争议的国饮文化遗产。",
      flavorNotes: "天然葡萄果香、秘鲁青柠清酸、蛋白雪顶丝滑、香料点缀",
      barTips: [
        "秘鲁经典黄金比例为3:1:1（3份皮斯科、1份酸橙汁、1份糖浆）。",
        "在洁白泡沫顶端精准滴上3滴安格仕苦精，既是美学点睛之笔，又能中和生蛋白气味。",
      ],
      faqs: [
        {
          question: "什么是皮斯科（Pisco）？",
          answer: "皮斯科是南美洲秘鲁和智利传承数百年的纯天然白兰地，由新鲜发酵的葡萄汁经铜壶单次蒸馏而成，不经橡木桶陈酿。",
        },
        {
          question: "秘鲁皮斯科与智利皮斯科有何不同？",
          answer: "秘鲁皮斯科法规极为严格，蒸馏后严禁加水稀释度数，亦不经橡木桶，完整保留葡萄品种最原始的风土芬芳。",
        },
      ],
      relatedSlugs: ["whiskey-sour", "daiquiri"],
    },
    painkiller: {
      recipeCuisine: "英属维尔京群岛",
      tools: ["摇酒壶", "量酒器", "飓风杯"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "20世纪70年代由达芙妮·亨德森在英属维尔京群岛约斯特范戴克岛的'湿美元酒吧'（Soggy Dollar Bar）发明。因为该海滩没有码头，酒客必须跳入海中游上海滩，身上的美元全被打湿，故而得名。后由普瑟英国海军朗姆酒注册为官方配方。",
      flavorNotes: "深色海军朗姆酒烈香、浓厚椰香、热带复合酸甜、现磨肉豆蔻辛香",
      barTips: [
        "必须使用整颗肉豆蔻在酒体表面现磨出香粉，预先磨好的包装肉豆蔻粉缺乏挥发性精油，无法还原标志香气。",
        "选用深重酒体的高酒精度海军朗姆酒，能够有力击穿椰浆与菠萝橙汁的厚重甜度。",
      ],
      faqs: [
        {
          question: "止痛药（Painkiller）和皮纳科拉达有什么区别？",
          answer: "止痛药额外加入了新鲜橙汁，采用厚重深色的英国海军朗姆酒替代白朗姆，并在顶层撒满异香扑鼻的现磨肉豆蔻粉。",
        },
        {
          question: "湿美元酒吧名字的由来是什么？",
          answer: "酒吧坐落在无码头沙滩，客人只能涉水游泳上岸，付账时钞票全都是湿漉漉的。",
        },
      ],
      relatedSlugs: ["pina-colada", "mai-tai"],
    },
    "vieux-carre": {
      recipeCuisine: "美式",
      tools: ["调酒杯", "吧勺", "量酒器", "茱莉普滤网"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "1938年由新奥尔良蒙特莱昂酒店（Hotel Monteleone）旋转木马酒吧首席调酒师沃尔特·伯杰龙创作。致敬该市著名的历史文化街区法国区（法语原名'Vieux Carré'，意为老广场）。",
      flavorNotes: "法式本笃草本芬芳、辛烈黑麦威士忌、干邑天鹅绒质感、深邃苦精",
      barTips: [
        "同时使用等量的安格仕苦精与佩绍德苦精，这是还原新奥尔良克里奥尔风味香气的经典平衡秘籍。",
        "使用大冰块耐心细致慢速搅拌至透凉，让高酒精度黑麦与干邑在低温融水下展现如丝缎般的柔顺质感。",
      ],
      faqs: [
        {
          question: "老广场（Vieux Carré）是由哪些烈酒构成的？",
          answer: "采用黑麦威士忌、干邑白兰地和甜红苦艾酒构成的三元核心基底，并辅以法国本笃草本利口酒与克里奥尔双重苦精。",
        },
        {
          question: "什么是本笃利口酒（Bénédictine D.O.M.）？",
          answer: "19世纪在法国诺曼底修道院传承基础上复原的草本利口酒，由27种珍贵草本与高山植物经多次蒸馏萃取陈酿而成。",
        },
      ],
      relatedSlugs: ["sazerac", "manhattan"],
    },
    "singapore-sling": {
      recipeCuisine: "新加坡",
      tools: ["摇酒壶", "量酒器", "高球杯"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "约于1915年由海南籍华人调酒师严崇文（Ngiam Tong Boon）在新加坡莱佛士酒店长酒吧（Long Bar）创作。当时殖民地社交礼仪禁止女性在公共场合饮酒，严崇文便用果汁与樱桃白兰地将金酒伪装成看似无害的粉红潘趣酒。",
      flavorNotes: "樱桃甜润、多重复合草本、菠萝绵密气泡、金酒暗藏",
      barTips: [
        "必须使用正统希灵樱桃利口酒（Cherry Heering）与D.O.M.本笃酒，廉价合成樱桃糖浆会彻底使其沦为低质果汁汽水。",
        "加入未加糖鲜榨菠萝汁大力摇和，能在杯顶激荡起珊瑚粉红色的厚密果沫层。",
      ],
      faqs: [
        {
          question: "新加坡司令最初诞生的背景是什么？",
          answer: "20世纪初的新加坡，名媛闺秀在公开场合饮酒被视为有伤风化；调酒师特制了这杯粉红如热带潘趣的酒品，让女性在社交场上自然品饮。",
        },
        {
          question: "新加坡司令用什么杯子？",
          answer: "高耸的大高球杯或飓风杯，饰以红樱桃与新鲜热带菠萝角。",
        },
      ],
      relatedSlugs: ["french-75", "gin-martini"],
    },
    "dark-n-stormy": {
      recipeCuisine: "百慕大",
      tools: ["高球杯", "吧勺", "量酒器"],
      suitableForDiet: "https://schema.org/VeganDiet",
      originLore:
        "一战后诞生于百慕大群岛，由英国皇家海军军官俱乐部发酵自酿的辛辣姜汁啤酒，与当地著名的高斯林黑海豹朗姆酒（Gosling's Black Seal）碰撞结合。据传一位老水手看其深黑沉降的云雾状外观，感叹它就像'只有傻子或死人才敢扬帆起航的暴风雨阴霾天'。",
      flavorNotes: "深色糖蜜辛香、生姜灼热回甘、青柠明爽、气泡通透",
      barTips: [
        "先在高球杯中倒满冰块与辛辣姜汁啤酒，最后用吧勺将深色朗姆酒缓慢浮倒在顶层，营造出阴云密布的风暴渐变视觉效果。",
        "必须使用带有微小沉淀物、辣度强劲的真正发酵型Ginger Beer，而非市售温和清淡的Ginger Ale果味汽水。",
      ],
      faqs: [
        {
          question: "莫斯黑暗风暴（Dark 'n Stormy）是注册商标吗？",
          answer: "是的，百慕大高斯林兄弟有限公司（Gosling Brothers Ltd）持有其全球注册商标，法定要求必须使用高斯林黑海豹朗姆酒调制。",
        },
        {
          question: "姜汁啤酒（Ginger Beer）与干姜水（Ginger Ale）有何区别？",
          answer: "姜汁啤酒由生姜真正发酵酿造，姜辣感十足且口感厚实；干姜水只是带有生姜香精的碳酸甜汽水。",
        },
      ],
      relatedSlugs: ["mojito", "painkiller"],
    },
    "rusty-nail": {
      recipeCuisine: "苏格兰",
      tools: ["调酒杯或古典杯", "吧勺", "量酒器"],
      suitableForDiet: undefined,
      originLore:
        "1937年以'B.I.F.'之名在英国工业博览会崭露头角。20世纪60年代在纽约21俱乐部由调酒师重新定型并命名为'生锈钉'，成为弗兰克·辛纳屈、迪恩·马丁等好莱坞'鼠党'（Rat Pack）巨星每夜必点的招牌风度私享特调。",
      flavorNotes: "石楠花蜂蜜、苏格兰泥煤烟熏、温润药草香料、麦芽醇厚",
      barTips: [
        "放入一颗晶莹剔透的手凿大方冰在杯中慢搅，适度缓慢的化水稀释是让杜林标（Drambuie）浓甜与苏格兰威士忌麦香完全融化交织的关键。",
        "将薄薄的柠檬果皮在酒面反折，喷出天然柑橘精油，能瞬间化解蜂蜜利口酒的滞重感。",
      ],
      faqs: [
        {
          question: "杜林标（Drambuie）是什么利口酒？",
          answer: "苏格兰传世蜂蜜威士忌利口酒，以陈年苏格兰威士忌为基酒，调和苏格兰石楠花蜜、高山草本植物与秘密香料配方。",
        },
        {
          question: "生锈钉的经典比例是多少？",
          answer: "传统经典比例为2:1（45毫升苏格兰威士忌配25毫升杜林标）；现代许多酒吧偏爱3:1的干爽利落收口。",
        },
      ],
      relatedSlugs: ["penicillin", "old-fashioned"],
    },
  },
};
