export const MOBILE_ART_DIRECTION_MAX_WIDTH = 720;

const DAILY_POUR_EPOCH_UTC = Date.UTC(2026, 0, 1);

function dayNumberForDateKey(dateKey) {
  const parts = String(dateKey).split("-").map(Number);
  const utc = Date.UTC(parts[0], parts[1] - 1, parts[2]);
  return Math.floor((utc - DAILY_POUR_EPOCH_UTC) / 86400000);
}

/**
 * @param {{
 *   todayKey: string,
 *   cache: { date?: string, cocktailId?: string } | null,
 *   viewportWidth: number,
 *   sequence: readonly string[],
 *   cocktails: readonly { id: string, heroImageMobile: string, heroImageDesktop: string }[],
 * }} input
 * @returns {{ cocktailId: string, posterUrl: string } | null}
 */
export function resolveDailyCurtainReveal(input) {
  const cocktails = input.cocktails ?? [];
  if (!cocktails.length) return null;

  const knownIds = cocktails.map((cocktail) => cocktail.id);
  let cocktailId = null;
  const cache = input.cache;
  if (
    cache &&
    cache.date === input.todayKey &&
    typeof cache.cocktailId === "string" &&
    knownIds.includes(cache.cocktailId)
  ) {
    cocktailId = cache.cocktailId;
  } else {
    const sequence = input.sequence ?? [];
    const n = sequence.length || cocktails.length;
    const index = ((dayNumberForDateKey(input.todayKey) % n) + n) % n;
    const seeded = sequence[index];
    cocktailId = knownIds.includes(seeded) ? seeded : cocktails[0].id;
  }

  const cocktail = cocktails.find((item) => item.id === cocktailId) ?? cocktails[0];
  const posterUrl =
    input.viewportWidth <= MOBILE_ART_DIRECTION_MAX_WIDTH
      ? cocktail.heroImageMobile
      : cocktail.heroImageDesktop;

  return {
    cocktailId: cocktail.id,
    posterUrl,
  };
}

/**
 * @param {{ identityApplied?: boolean, titleFitted?: boolean, pictureReady?: boolean } | null | undefined} state
 * @returns {boolean}
 */
export function canLiftDailyCurtain(state) {
  return Boolean(state && state.identityApplied && state.titleFitted && state.pictureReady);
}

/**
 * @param {"home" | "detail"} variant
 * @returns {boolean}
 */
export function dailyCurtainHidesPoster(variant) {
  return variant === "home";
}
