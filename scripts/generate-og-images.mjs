import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cocktailsDir = path.join(projectRoot, "public", "images", "cocktails");
const cocktailDataPath = path.join(projectRoot, "src", "data", "cocktails.ts");

async function main() {
  const source = fs.readFileSync(cocktailDataPath, "utf8");
  const stableMatch = source.match(/const stableCocktails:[\s\S]*?=\s*\[([\s\S]*?)\];/);
  if (!stableMatch) {
    throw new Error("Could not find stableCocktails in src/data/cocktails.ts");
  }

  const body = stableMatch[1];
  const slugs = [];
  const seen = new Set();
  const pattern = /slug:\s*"([^"]+)"|createSceneOnlyCocktail\(\s*\{\s*id:\s*"([^"]+)"/g;
  let match;

  while ((match = pattern.exec(body)) !== null) {
    const slug = match[1] || match[2];
    if (!seen.has(slug)) {
      seen.add(slug);
      slugs.push(slug);
    }
  }

  console.log(`Generating 1200x630 OG images for ${slugs.length} cocktails...`);

  for (const slug of slugs) {
    const inputDesktop = path.join(cocktailsDir, `${slug}-scene-desktop.webp`);
    const outputOg = path.join(cocktailsDir, `${slug}-og.webp`);

    if (!fs.existsSync(inputDesktop)) {
      console.warn(`Source desktop image not found for ${slug}: ${inputDesktop}`);
      continue;
    }

    await sharp(inputDesktop)
      .resize(1200, 630, {
        fit: "cover",
        position: "center",
      })
      .webp({ quality: 85 })
      .toFile(outputOg);

    console.log(`  ✓ Generated ${slug}-og.webp`);
  }

  console.log("All OG images generated successfully.");
}

main().catch((err) => {
  console.error("Failed to generate OG images:", err);
  process.exit(1);
});
