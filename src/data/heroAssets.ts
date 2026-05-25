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
