import test from "node:test";
import assert from "node:assert/strict";
import {
  DAILY_POUR_STORAGE_KEY,
  readCachedDailyPour,
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
