import { getCocktailSlugs, type CocktailId } from "@/data/cocktails";
import { renderHeroSvg, type HeroVariant } from "@/data/heroAssets";

type AssetParams = {
  asset: string;
};

export function getStaticPaths() {
  return getCocktailSlugs().flatMap((slug) => [
    { params: { asset: `${slug}-scene-desktop` } },
    { params: { asset: `${slug}-scene-mobile` } },
  ]);
}

export function GET({ params }: { params: AssetParams }) {
  const match = params.asset.match(/^(.+)-scene-(desktop|mobile)$/);

  if (!match) {
    return new Response("Not found", { status: 404 });
  }

  const slug = match[1] as CocktailId;
  const variant = match[2] as HeroVariant;

  if (!getCocktailSlugs().includes(slug)) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(renderHeroSvg(slug, variant), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
