export {
  MOBILE_ART_DIRECTION_MAX_WIDTH,
  canLiftDailyCurtain,
  dailyCurtainHidesPoster,
  resolveDailyCurtainReveal,
} from "./dailyCurtainPolicy.js";

export const DAILY_POUR_STORAGE_KEY = "justonesip_daily_pour";

export type CachedDailyPour = {
  date: string;
  cocktailId: string;
  timestamp: number;
};

export function readCachedDailyPour(
  storage: { getItem(key: string): string | null } | null | undefined,
  todayKey: string,
): string | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(DAILY_POUR_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CachedDailyPour>;
    if (parsed && parsed.date === todayKey && typeof parsed.cocktailId === "string") {
      return parsed.cocktailId;
    }
  } catch {
    return null;
  }
  return null;
}

export function writeCachedDailyPour(
  storage: { setItem(key: string, value: string): void } | null | undefined,
  todayKey: string,
  cocktailId: string,
): void {
  if (!storage) return;
  try {
    const payload: CachedDailyPour = {
      date: todayKey,
      cocktailId,
      timestamp: Date.now(),
    };
    storage.setItem(DAILY_POUR_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota or disabled storage
  }
}
