export type HeroImageTarget = {
  heroImageMobile: string;
  heroImageDesktop: string;
};

export function getTargetHeroImageUrl(
  cocktail: HeroImageTarget,
  isMobile: boolean,
): string {
  return isMobile ? cocktail.heroImageMobile : cocktail.heroImageDesktop;
}

export function selectShuffleCandidate<T extends { id: string }>(
  candidates: T[],
  currentId?: string | null,
  randomFn: () => number = Math.random,
): T | null {
  const eligible = candidates.filter((item) => item.id !== currentId);
  if (eligible.length === 0) return null;
  const index = Math.floor(randomFn() * eligible.length);
  return eligible[index] ?? eligible[0] ?? null;
}

export function pickIdlePreloadTargets<
  T extends { id: string; heroImageMobile: string; heroImageDesktop: string },
>(
  candidates: T[],
  currentId: string | null | undefined,
  isMobile: boolean,
  preloadedUrls: Set<string>,
  limit = 3,
): string[] {
  const eligible = candidates.filter((item) => item.id !== currentId);
  const targets: string[] = [];

  for (const item of eligible) {
    const url = getTargetHeroImageUrl(item, isMobile);
    if (!preloadedUrls.has(url) && !targets.includes(url)) {
      targets.push(url);
      if (targets.length >= limit) {
        break;
      }
    }
  }

  return targets;
}

export interface ShuffleTokenManager {
  next(): number;
  isCurrent(token: number): boolean;
  current(): number;
}

export function createShuffleTokenManager(): ShuffleTokenManager {
  let activeToken = 0;

  return {
    next() {
      activeToken += 1;
      return activeToken;
    },
    isCurrent(token: number) {
      return token === activeToken;
    },
    current() {
      return activeToken;
    },
  };
}
