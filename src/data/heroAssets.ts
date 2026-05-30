import type { CocktailId } from "./cocktails";

export type HeroVariant = "desktop" | "mobile";

type HeroAsset = {
  background: [string, string, string];
  accent: string;
  glow: string;
  drink: string;
  garnish: string;
  title: string;
  ingredients: string;
};

export const heroAssets: Record<CocktailId, HeroAsset> = {
  negroni: {
    background: ["#120f0d", "#33120f", "#6b1b16"],
    accent: "#e3b35f",
    glow: "#d3513c",
    drink: "#a91f19",
    garnish: "#f0a94a",
    title: "Negroni",
    ingredients: "GIN / CAMPARI / SWEET VERMOUTH",
  },
  margarita: {
    background: ["#081b1b", "#195247", "#d8b75a"],
    accent: "#f7efe5",
    glow: "#bddf6a",
    drink: "#dff1c2",
    garnish: "#b8df61",
    title: "Margarita",
    ingredients: "TEQUILA / LIME / ORANGE LIQUEUR",
  },
  "old-fashioned": {
    background: ["#0f0b09", "#3a2118", "#8b4b24"],
    accent: "#e0a458",
    glow: "#ba6a2b",
    drink: "#9b4e20",
    garnish: "#f08d35",
    title: "Old Fashioned",
    ingredients: "WHISKEY / BITTERS / ORANGE PEEL",
  },
  daiquiri: {
    background: ["#0a2122", "#24676b", "#d3dec0"],
    accent: "#f7efe5",
    glow: "#a7d864",
    drink: "#e8f3dc",
    garnish: "#a8d96a",
    title: "Daiquiri",
    ingredients: "WHITE RUM / LIME / SIMPLE SYRUP",
  },
  "espresso-martini": {
    background: ["#080605", "#1a100d", "#4c2b1c"],
    accent: "#d5aa74",
    glow: "#6f3c24",
    drink: "#24120d",
    garnish: "#c98d5a",
    title: "Espresso Martini",
    ingredients: "VODKA / ESPRESSO / COFFEE LIQUEUR",
  },
  "aperol-spritz": {
    background: ["#32120a", "#e05d2c", "#fff1c8"],
    accent: "#15120f",
    glow: "#ff9b3d",
    drink: "#e86631",
    garnish: "#ffb84d",
    title: "Aperol Spritz",
    ingredients: "APEROL / PROSECCO / SODA WATER",
  },
  mojito: {
    background: ["#082018", "#237a4e", "#9bd6a4"],
    accent: "#f7efe5",
    glow: "#2d9b62",
    drink: "#d8f3d0",
    garnish: "#2f9b63",
    title: "Mojito",
    ingredients: "WHITE RUM / LIME / MINT / SODA",
  },
  manhattan: {
    background: ["#0d0807", "#342018", "#7b3b24"],
    accent: "#d5a15e",
    glow: "#8f4a2c",
    drink: "#7c331f",
    garnish: "#9f2531",
    title: "Manhattan",
    ingredients: "RYE WHISKEY / SWEET VERMOUTH / BITTERS",
  },
  sazerac: {
    background: ["#0b0907", "#2a1b14", "#6e4a25"],
    accent: "#e4c16e",
    glow: "#b98535",
    drink: "#8d4a1f",
    garnish: "#f0d36d",
    title: "Sazerac",
    ingredients: "RYE WHISKEY / PEYCHAUD'S / ABSINTHE",
  },
  paloma: {
    background: ["#111718", "#27616a", "#f0a45f"],
    accent: "#ffe4cf",
    glow: "#ff8f63",
    drink: "#f2b77f",
    garnish: "#f06d75",
    title: "Paloma",
    ingredients: "TEQUILA / GRAPEFRUIT / LIME",
  },
  "paper-plane": {
    background: ["#151018", "#6b2c35", "#f28749"],
    accent: "#f4d7a1",
    glow: "#e55f44",
    drink: "#d25a37",
    garnish: "#f0bd56",
    title: "Paper Plane",
    ingredients: "BOURBON / APEROL / AMARO / LEMON",
  },
  boulevardier: {
    background: ["#100b08", "#3d1813", "#8a341f"],
    accent: "#e1b764",
    glow: "#c34b2f",
    drink: "#9d291c",
    garnish: "#ee9442",
    title: "Boulevardier",
    ingredients: "BOURBON / CAMPARI / SWEET VERMOUTH",
  },
  "mai-tai": {
    background: ["#081314", "#1e5e61", "#d99a4b"],
    accent: "#f5e2b5",
    glow: "#db7d38",
    drink: "#c77932",
    garnish: "#41a55e",
    title: "Mai Tai",
    ingredients: "RUM / LIME / ORGEAT / CURACAO",
  },
  "last-word": {
    background: ["#07150e", "#274a28", "#9ccf68"],
    accent: "#f3e9c8",
    glow: "#74a948",
    drink: "#b4d36a",
    garnish: "#4ca35d",
    title: "Last Word",
    ingredients: "GIN / CHARTREUSE / MARASCHINO / LIME",
  },
  aviation: {
    background: ["#0f1022", "#40376b", "#b9a8d8"],
    accent: "#f0e8ff",
    glow: "#8c78cc",
    drink: "#b9a6df",
    garnish: "#6f477a",
    title: "Aviation",
    ingredients: "GIN / LEMON / MARASCHINO / VIOLETTE",
  },
  "french-75": {
    background: ["#101616", "#5b6a4c", "#f2d48a"],
    accent: "#fff4d1",
    glow: "#e6ca72",
    drink: "#f4df9a",
    garnish: "#f2cb5c",
    title: "French 75",
    ingredients: "GIN / LEMON / CHAMPAGNE",
  },
  "gin-martini": {
    background: ["#080d10", "#1d3441", "#a8c5c9"],
    accent: "#e8f3f2",
    glow: "#7fa2a7",
    drink: "#d8eeec",
    garnish: "#9fb45a",
    title: "Gin Martini",
    ingredients: "GIN / DRY VERMOUTH / LEMON",
  },
  "corpse-reviver-2": {
    background: ["#11120d", "#4a4d35", "#d7c77c"],
    accent: "#f4efd1",
    glow: "#c7bd62",
    drink: "#e0d58a",
    garnish: "#7ea17c",
    title: "Corpse Reviver #2",
    ingredients: "GIN / COINTREAU / COCCHI / LEMON",
  },
  "jungle-bird": {
    background: ["#07120d", "#18492e", "#b74431"],
    accent: "#f3d27a",
    glow: "#c54d37",
    drink: "#b4362c",
    garnish: "#69a848",
    title: "Jungle Bird",
    ingredients: "DARK RUM / PINEAPPLE / CAMPARI",
  },
  "naked-and-famous": {
    background: ["#120c09", "#5a2a17", "#d46938"],
    accent: "#f0d09a",
    glow: "#d65c32",
    drink: "#d76b33",
    garnish: "#b8b84a",
    title: "Naked and Famous",
    ingredients: "MEZCAL / APEROL / CHARTREUSE / LIME",
  },
  sidecar: {
    background: ["#130f0a", "#4b2f1a", "#c58a48"],
    accent: "#f2d6a5",
    glow: "#c67835",
    drink: "#d09a54",
    garnish: "#efb35b",
    title: "Sidecar",
    ingredients: "COGNAC / COINTREAU / LEMON",
  },
  gimlet: {
    background: ["#071717", "#285c55", "#b8d982"],
    accent: "#eef7d7",
    glow: "#9bc95c",
    drink: "#d7eeb1",
    garnish: "#8cc64b",
    title: "Gimlet",
    ingredients: "GIN / LIME / SIMPLE SYRUP",
  },
  "whiskey-sour": {
    background: ["#120d08", "#4c2f18", "#d9a04f"],
    accent: "#f6dfb8",
    glow: "#d1843d",
    drink: "#d9923a",
    garnish: "#cf3d2f",
    title: "Whiskey Sour",
    ingredients: "BOURBON / LEMON / SUGAR / EGG WHITE",
  },
  caipirinha: {
    background: ["#071a12", "#287447", "#d7d068"],
    accent: "#f2f2c7",
    glow: "#8cc64e",
    drink: "#e5e59d",
    garnish: "#8fd45e",
    title: "Caipirinha",
    ingredients: "CACHACA / LIME / SUGAR",
  },
  "pina-colada": {
    background: ["#0c1821", "#2d6f78", "#f2cf7a"],
    accent: "#fff0c9",
    glow: "#e9c35f",
    drink: "#f0dfb7",
    garnish: "#55a46a",
    title: "Pina Colada",
    ingredients: "RUM / PINEAPPLE / COCONUT",
  },
  "bees-knees": {
    background: ["#10130b", "#5b4d1e", "#e3bd4b"],
    accent: "#fff1b8",
    glow: "#e3b540",
    drink: "#f0d56f",
    garnish: "#f1d65f",
    title: "Bee's Knees",
    ingredients: "GIN / LEMON / HONEY",
  },
  penicillin: {
    background: ["#0f0c08", "#3c2a18", "#b77a38"],
    accent: "#f0d29b",
    glow: "#b56e2f",
    drink: "#c7823b",
    garnish: "#dfbd61",
    title: "Penicillin",
    ingredients: "SCOTCH / GINGER / HONEY / LEMON",
  },
  "pisco-sour": {
    background: ["#10110e", "#6b6548", "#e1d39a"],
    accent: "#fff4d5",
    glow: "#d6c577",
    drink: "#f0e3bc",
    garnish: "#b66b34",
    title: "Pisco Sour",
    ingredients: "PISCO / LIME / SUGAR / EGG WHITE",
  },
  painkiller: {
    background: ["#0b1720", "#2e5669", "#d7994a"],
    accent: "#f3dcaa",
    glow: "#d6843f",
    drink: "#d99a55",
    garnish: "#e1c05b",
    title: "Painkiller",
    ingredients: "DARK RUM / PINEAPPLE / COCONUT",
  },
  "vieux-carre": {
    background: ["#100b08", "#321c16", "#7a4a2c"],
    accent: "#d9ad72",
    glow: "#8e5631",
    drink: "#7b3f25",
    garnish: "#e5c06f",
    title: "Vieux Carre",
    ingredients: "RYE / COGNAC / VERMOUTH / BENEDICTINE",
  },
  "singapore-sling": {
    background: ["#10111a", "#74334f", "#e58f7a"],
    accent: "#ffe1d5",
    glow: "#dd6b6d",
    drink: "#df6f75",
    garnish: "#e3bd57",
    title: "Singapore Sling",
    ingredients: "GIN / CHERRY / PINEAPPLE / LIME",
  },
  "dark-n-stormy": {
    background: ["#080b10", "#17283b", "#5d4630"],
    accent: "#d9bd8c",
    glow: "#7a5735",
    drink: "#4b2417",
    garnish: "#a5c85d",
    title: "Dark 'n' Stormy",
    ingredients: "DARK RUM / GINGER BEER / LIME",
  },
  "rusty-nail": {
    background: ["#0e0a08", "#332017", "#8d552c"],
    accent: "#dda85b",
    glow: "#a8662f",
    drink: "#9a5a28",
    garnish: "#e0c06b",
    title: "Rusty Nail",
    ingredients: "SCOTCH / DRAMBUIE / LEMON",
  },
};

export function renderHeroSvg(id: CocktailId, variant: HeroVariant) {
  const asset = heroAssets[id];
  const isMobile = variant === "mobile";
  const width = isMobile ? 1080 : 2400;
  const height = isMobile ? 1920 : 1350;
  const glassScale = isMobile ? 1.18 : 1;
  const centerX = isMobile ? 540 : 1420;
  const centerY = isMobile ? 900 : 700;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${asset.background[0]}"/>
      <stop offset=".55" stop-color="${asset.background[1]}"/>
      <stop offset="1" stop-color="${asset.background[2]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="50%">
      <stop offset="0" stop-color="${asset.glow}" stop-opacity=".68"/>
      <stop offset=".52" stop-color="${asset.glow}" stop-opacity=".24"/>
      <stop offset="1" stop-color="${asset.glow}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="24"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <circle cx="${centerX}" cy="${centerY}" r="${isMobile ? 520 : 430}" fill="url(#glow)"/>
  <ellipse cx="${centerX + (isMobile ? -140 : -250)}" cy="${centerY + 285}" rx="${260 * glassScale}" ry="${36 * glassScale}" fill="#000" opacity=".28" filter="url(#soft)"/>
  <g transform="translate(${centerX - 260 * glassScale} ${centerY - 360 * glassScale}) scale(${glassScale})">
    <ellipse cx="260" cy="82" rx="230" ry="48" fill="#f8efe4" opacity=".92"/>
    <ellipse cx="260" cy="80" rx="182" ry="27" fill="${asset.drink}" opacity=".92"/>
    <path d="M56 92h408l-78 510H134z" fill="#f8efe4" opacity=".88"/>
    <path d="M98 210h324l-50 326H148z" fill="${asset.drink}" opacity=".88"/>
    <circle cx="330" cy="310" r="82" fill="${asset.garnish}" opacity=".88"/>
    <path d="M238 292c78-88 180-80 246 0-78 42-160 42-246 0z" fill="#f5d18a" opacity=".82"/>
    <rect x="154" y="160" width="112" height="112" rx="14" fill="#fff" opacity=".38" transform="rotate(-13 210 216)"/>
    <rect x="262" y="202" width="96" height="96" rx="14" fill="#fff" opacity=".26" transform="rotate(12 310 250)"/>
  </g>
  <g opacity=".18">
    <path d="M${isMobile ? 40 : 90} ${height - 180} C ${width * 0.3} ${height - 300}, ${width * 0.58} ${height - 80}, ${width - 60} ${height - 220}" fill="none" stroke="${asset.accent}" stroke-width="2"/>
    <path d="M${width - 440} 120 C ${width - 260} 260, ${width - 240} 470, ${width - 90} 600" fill="none" stroke="${asset.accent}" stroke-width="2"/>
  </g>
  <rect x="${isMobile ? 54 : 96}" y="${isMobile ? 56 : 82}" width="${width - (isMobile ? 108 : 192)}" height="${height - (isMobile ? 112 : 164)}" fill="none" stroke="${asset.accent}" stroke-width="${isMobile ? 2 : 3}" opacity=".18"/>
</svg>`;
}
