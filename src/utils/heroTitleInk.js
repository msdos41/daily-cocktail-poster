// SimSun and other CJK display faces leave a glyph-specific gap inside the
// em box. The hero title is much larger than the two lines under it, so that
// gap reads as a broken left edge. Shift the title until its ink matches.

const INK_SAMPLE_SIZE = 100;
const INK_ORIGIN_X = 24;

export function alignHeroTitleInk() {
  if (document.documentElement.lang !== "zh-CN") return;

  const title = document.querySelector("[data-hero-title]");
  if (!(title instanceof HTMLElement)) return;

  const references = ["[data-cocktail-subtitle]", "[data-hero-ingredients]"]
    .map((selector) => document.querySelector(selector))
    .filter((element) => element instanceof HTMLElement);
  if (!references.length) {
    title.style.removeProperty("transform");
    return;
  }

  const titleStyle = getComputedStyle(title);
  const titleSize = Number.parseFloat(titleStyle.fontSize);
  const titleInk = inkBearingRatio(titleStyle, title.textContent) * titleSize;
  let targetInk = Infinity;
  for (const element of references) {
    const style = getComputedStyle(element);
    const size = Number.parseFloat(style.fontSize);
    const ink = inkBearingRatio(style, element.textContent) * size;
    if (Number.isFinite(ink)) targetInk = Math.min(targetInk, ink);
  }

  if (!Number.isFinite(titleInk) || !Number.isFinite(targetInk)) return;

  const shift = targetInk - titleInk;
  if (Math.abs(shift) < 0.5) {
    title.style.removeProperty("transform");
    return;
  }

  title.style.transform = "translateX(" + shift.toFixed(2) + "px)";
}

function inkBearingRatio(style, text) {
  const first = Array.from(String(text || "").trim())[0];
  if (!first) return 0;

  const canvas = document.createElement("canvas");
  canvas.width = 180;
  canvas.height = 160;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return 0;

  context.font = style.fontWeight + " " + INK_SAMPLE_SIZE + "px " + style.fontFamily;
  if (!context.font.includes(INK_SAMPLE_SIZE + "px")) return 0;

  context.fillStyle = "#fff";
  context.textBaseline = "top";
  context.fillText(first, INK_ORIGIN_X, 16);

  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = image.data;
  let minX = canvas.width;
  for (let index = 0; index < pixels.length; index += 4) {
    if (pixels[index + 3] <= 20) continue;
    const x = (index / 4) % canvas.width;
    if (x < minX) minX = x;
  }

  if (minX === canvas.width) return 0;
  return (minX - INK_ORIGIN_X) / INK_SAMPLE_SIZE;
}
