import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(projectRoot, "public", "images");
const negroniDesktop = path.join(imagesDir, "cocktails", "negroni-scene-desktop.webp");

const vignetteSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftVignette" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#15120f" stop-opacity="0.92" />
      <stop offset="35%" stop-color="#15120f" stop-opacity="0.75" />
      <stop offset="60%" stop-color="#15120f" stop-opacity="0.30" />
      <stop offset="85%" stop-color="#15120f" stop-opacity="0.0" />
    </linearGradient>
    <radialGradient id="goldGlow" cx="0.82" cy="0.45" r="0.5">
      <stop offset="0%" stop-color="#e3b35f" stop-opacity="0.12" />
      <stop offset="50%" stop-color="#d3513c" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#15120f" stop-opacity="0.0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#leftVignette)" />
  <rect width="1200" height="630" fill="url(#goldGlow)" />
</svg>
`;

const enSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <style>
    .kicker {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      fill: #e3b35f;
    }
    .title {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 68px;
      font-weight: 700;
      letter-spacing: -0.02em;
      fill: #f7efe5;
    }
    .divider {
      stroke: #e3b35f;
      stroke-opacity: 0.35;
      stroke-width: 1.5;
    }
    .tagline {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 26px;
      font-style: italic;
      letter-spacing: 0.01em;
      fill: #e6ded3;
    }
    .domain-tag {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      fill: #e3b35f;
      opacity: 0.85;
    }
  </style>
  <text x="120" y="195" class="kicker">MIDNIGHT POUR · DAILY COCKTAIL POSTER</text>
  <text x="120" y="275" class="title">JUST ONE SIP</text>
  <line x1="120" y1="312" x2="220" y2="312" class="divider" />
  <text x="120" y="365" class="tagline">One drink, one visual, every day.</text>
  <text x="120" y="510" class="domain-tag">justonesip.today</text>
</svg>
`;

const zhSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <style>
    .kicker {
      font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", ui-sans-serif, sans-serif;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.32em;
      fill: #e3b35f;
    }
    .title {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 66px;
      font-weight: 700;
      letter-spacing: -0.01em;
      fill: #f7efe5;
    }
    .subtitle {
      font-family: "Songti SC", "SimSun", "Noto Serif SC", serif;
      font-size: 34px;
      font-weight: 600;
      letter-spacing: 0.12em;
      fill: #f7efe5;
    }
    .divider {
      stroke: #e3b35f;
      stroke-opacity: 0.35;
      stroke-width: 1.5;
    }
    .tagline {
      font-family: "Songti SC", "SimSun", "Noto Serif SC", serif;
      font-size: 24px;
      letter-spacing: 0.16em;
      fill: #e6ded3;
    }
    .domain-tag {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      fill: #e3b35f;
      opacity: 0.85;
    }
  </style>
  <text x="120" y="180" class="kicker">午夜微醺 · 每日鸡尾酒海报</text>
  <text x="120" y="260" class="title">JUST ONE SIP</text>
  <text x="120" y="315" class="subtitle">微醺时刻</text>
  <line x1="120" y1="345" x2="220" y2="345" class="divider" />
  <text x="120" y="395" class="tagline">一杯 · 一画 · 一日常</text>
  <text x="120" y="510" class="domain-tag">justonesip.today</text>
</svg>
`;

export async function generateEnglishCard() {
  const baseBuffer = await sharp(negroniDesktop)
    .resize(1200, 630, { fit: "cover", position: "right" })
    .toBuffer();

  const enJpeg = await sharp(baseBuffer)
    .composite([
      { input: Buffer.from(vignetteSvg) },
      { input: Buffer.from(enSvg) },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();

  const enPath = path.join(imagesDir, "og-default-en.jpg");
  const v2Path = path.join(imagesDir, "og-default-v2.jpg");

  fs.writeFileSync(enPath, enJpeg);
  fs.writeFileSync(v2Path, enJpeg);

  console.log(`Generated og-default-en.jpg (${enJpeg.length} bytes) and copied to og-default-v2.jpg`);
  return enJpeg;
}

export async function generateChineseCard() {
  const baseBuffer = await sharp(negroniDesktop)
    .resize(1200, 630, { fit: "cover", position: "right" })
    .toBuffer();

  const zhJpeg = await sharp(baseBuffer)
    .composite([
      { input: Buffer.from(vignetteSvg) },
      { input: Buffer.from(zhSvg) },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();

  const zhPath = path.join(imagesDir, "og-default-zh.jpg");
  fs.writeFileSync(zhPath, zhJpeg);

  console.log(`Generated og-default-zh.jpg (${zhJpeg.length} bytes)`);
  return zhJpeg;
}

async function main() {
  const target = process.argv[2];
  if (target === "en") {
    await generateEnglishCard();
  } else if (target === "zh") {
    await generateChineseCard();
  } else {
    await generateEnglishCard();
    await generateChineseCard();
  }
}

const isDirectExecution = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectExecution) {
  main().catch((err) => {
    console.error("Failed to generate default social cards:", err);
    process.exit(1);
  });
}
