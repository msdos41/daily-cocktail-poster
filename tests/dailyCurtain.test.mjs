import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  DAILY_POUR_SEQUENCE,
  getAllCocktails,
  getDailyCocktailSlug,
} from "../src/data/cocktails.ts";
import {
  DAILY_POUR_STORAGE_KEY,
  canLiftDailyCurtain,
  dailyCurtainHidesPoster,
  readCachedDailyPour,
  resolveDailyCurtainReveal,
  writeCachedDailyPour,
} from "../src/utils/dailyCurtain.ts";

function createMockStorage(initial = {}) {
  const store = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

test("readCachedDailyPour returns null when storage is missing or empty", () => {
  assert.equal(readCachedDailyPour(null, "2026-09-15"), null);
  assert.equal(readCachedDailyPour(undefined, "2026-09-15"), null);
  const storage = createMockStorage();
  assert.equal(readCachedDailyPour(storage, "2026-09-15"), null);
});

test("readCachedDailyPour returns cocktailId when cached date matches today", () => {
  const storage = createMockStorage({
    [DAILY_POUR_STORAGE_KEY]: JSON.stringify({
      date: "2026-09-15",
      cocktailId: "vieux-carre",
      timestamp: Date.now(),
    }),
  });

  assert.equal(readCachedDailyPour(storage, "2026-09-15"), "vieux-carre");
});

test("readCachedDailyPour returns null when cached date is from a previous day (cache invalidation)", () => {
  const storage = createMockStorage({
    [DAILY_POUR_STORAGE_KEY]: JSON.stringify({
      date: "2026-09-14",
      cocktailId: "mojito",
      timestamp: Date.now() - 86400000,
    }),
  });

  assert.equal(readCachedDailyPour(storage, "2026-09-15"), null);
});

test("readCachedDailyPour returns null on corrupt JSON in storage", () => {
  const storage = createMockStorage({
    [DAILY_POUR_STORAGE_KEY]: "invalid-json{{",
  });

  assert.equal(readCachedDailyPour(storage, "2026-09-15"), null);
});

test("writeCachedDailyPour writes date, cocktailId, and timestamp payload", () => {
  const storage = createMockStorage();
  writeCachedDailyPour(storage, "2026-09-15", "negroni");

  const raw = storage.getItem(DAILY_POUR_STORAGE_KEY);
  assert.ok(raw);
  const parsed = JSON.parse(raw);
  assert.equal(parsed.date, "2026-09-15");
  assert.equal(parsed.cocktailId, "negroni");
  assert.ok(typeof parsed.timestamp === "number");
});

const revealCatalog = [
  {
    id: "negroni",
    heroImageMobile: "/images/cocktails/negroni-scene-mobile.webp",
    heroImageDesktop: "/images/cocktails/negroni-scene-desktop.webp",
  },
  {
    id: "whiskey-sour",
    heroImageMobile: "/images/cocktails/whiskey-sour-scene-mobile.webp",
    heroImageDesktop: "/images/cocktails/whiskey-sour-scene-desktop.webp",
  },
];

test("reveal policy at the mobile art-direction width names one mobile poster", () => {
  const reveal = resolveDailyCurtainReveal({
    todayKey: "2026-01-01",
    cache: null,
    viewportWidth: 720,
    sequence: ["negroni", "whiskey-sour"],
    cocktails: revealCatalog,
  });

  assert.equal(reveal.cocktailId, "negroni");
  assert.equal(reveal.posterUrl, revealCatalog[0].heroImageMobile);
});

test("reveal policy above the mobile art-direction width names one desktop poster", () => {
  const reveal = resolveDailyCurtainReveal({
    todayKey: "2026-01-01",
    cache: null,
    viewportWidth: 721,
    sequence: ["negroni", "whiskey-sour"],
    cocktails: revealCatalog,
  });

  assert.equal(reveal.cocktailId, "negroni");
  assert.equal(reveal.posterUrl, revealCatalog[0].heroImageDesktop);
});

test("a matching same-day cache selects that cocktail's single poster", () => {
  const reveal = resolveDailyCurtainReveal({
    todayKey: "2026-01-02",
    cache: { date: "2026-01-02", cocktailId: "negroni" },
    viewportWidth: 390,
    sequence: ["negroni", "whiskey-sour"],
    cocktails: revealCatalog,
  });

  assert.equal(reveal.cocktailId, "negroni");
  assert.equal(reveal.posterUrl, revealCatalog[0].heroImageMobile);
});

test("a stale cache does not select the cached cocktail", () => {
  const reveal = resolveDailyCurtainReveal({
    todayKey: "2026-01-02",
    cache: { date: "2026-01-01", cocktailId: "negroni" },
    viewportWidth: 1280,
    sequence: ["negroni", "whiskey-sour"],
    cocktails: revealCatalog,
  });

  assert.equal(reveal.cocktailId, "whiskey-sour");
  assert.equal(reveal.posterUrl, revealCatalog[1].heroImageDesktop);
});

test("an unknown same-day cache id falls back to the date-seeded cocktail", () => {
  const reveal = resolveDailyCurtainReveal({
    todayKey: "2026-01-01",
    cache: { date: "2026-01-01", cocktailId: "not-a-cocktail" },
    viewportWidth: 800,
    sequence: ["negroni", "whiskey-sour"],
    cocktails: revealCatalog,
  });

  assert.equal(reveal.cocktailId, "negroni");
  assert.equal(reveal.posterUrl, revealCatalog[0].heroImageDesktop);
});

test("reveal policy matches the published daily selection and returns one poster", () => {
  const cocktails = getAllCocktails("en").map((cocktail) => ({
    id: cocktail.id,
    heroImageMobile: cocktail.heroImageMobile,
    heroImageDesktop: cocktail.heroImageDesktop,
  }));
  const todayKey = "2026-03-15";
  const reveal = resolveDailyCurtainReveal({
    todayKey,
    cache: null,
    viewportWidth: 1200,
    sequence: DAILY_POUR_SEQUENCE,
    cocktails,
  });
  const chosen = cocktails.find((cocktail) => cocktail.id === reveal.cocktailId);

  assert.equal(reveal.cocktailId, getDailyCocktailSlug(todayKey));
  assert.ok(chosen);
  assert.equal(reveal.posterUrl, chosen.heroImageDesktop);
  assert.notEqual(reveal.posterUrl, chosen.heroImageMobile);
});

test("the veil lifts only after identity is applied, the title is fitted, and the picture is ready", () => {
  assert.equal(
    canLiftDailyCurtain({ identityApplied: false, titleFitted: true, pictureReady: true }),
    false,
  );
  assert.equal(
    canLiftDailyCurtain({ identityApplied: true, titleFitted: false, pictureReady: true }),
    false,
  );
  assert.equal(
    canLiftDailyCurtain({ identityApplied: true, titleFitted: true, pictureReady: false }),
    false,
  );
  assert.equal(
    canLiftDailyCurtain({ identityApplied: true, titleFitted: true, pictureReady: true }),
    true,
  );
});

test("detail pages never ask the daily curtain to hide their poster", () => {
  assert.equal(dailyCurtainHidesPoster("detail"), false);
  assert.equal(dailyCurtainHidesPoster("home"), true);
});

test("the home stage swaps its pinned poster when art direction changes", () => {
  const content = fs.readFileSync(new URL("../src/components/ImmersiveCocktail.astro", import.meta.url), "utf8");
  const marker = 'isMobileMedia.addEventListener("change"';
  const at = content.indexOf(marker);
  assert.notEqual(at, -1, "art-direction media must be observed");

  const handler = content.slice(at, at + 280);
  assert.match(handler, /syncArtDirectedPoster/);

  const bodyAt = content.indexOf("function syncArtDirectedPoster");
  assert.notEqual(bodyAt, -1, "the home stage must be able to swap the pinned poster");
  const body = content.slice(bodyAt, bodyAt + 1600);
  assert.match(body, /getTargetHeroImageUrl/);
  assert.match(body, /removeAttribute\("srcset"\)/);
  assert.match(body, /heroImageMobile/);
});
