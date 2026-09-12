import test from "node:test";
import assert from "node:assert/strict";
import {
  getTargetHeroImageUrl,
  selectShuffleCandidate,
  pickIdlePreloadTargets,
  createShuffleTokenManager,
} from "../src/utils/shuffleSync.ts";

test("getTargetHeroImageUrl selects mobile or desktop image based on viewport", () => {
  const cocktail = {
    heroImageMobile: "/images/cocktails/negroni-scene-mobile.webp",
    heroImageDesktop: "/images/cocktails/negroni-scene-desktop.webp",
  };

  assert.equal(getTargetHeroImageUrl(cocktail, true), "/images/cocktails/negroni-scene-mobile.webp");
  assert.equal(getTargetHeroImageUrl(cocktail, false), "/images/cocktails/negroni-scene-desktop.webp");
});

test("selectShuffleCandidate excludes current cocktail ID", () => {
  const cocktails = [
    { id: "negroni", name: "Negroni" },
    { id: "daiquiri", name: "Daiquiri" },
    { id: "mojito", name: "Mojito" },
  ];

  // When current is negroni, candidate must be daiquiri or mojito
  for (let i = 0; i < 20; i++) {
    const candidate = selectShuffleCandidate(cocktails, "negroni");
    assert.ok(candidate);
    assert.notEqual(candidate.id, "negroni");
  }

  // When only one cocktail matches current, returns null
  assert.equal(selectShuffleCandidate([{ id: "negroni" }], "negroni"), null);
  assert.equal(selectShuffleCandidate([], "negroni"), null);
});

test("pickIdlePreloadTargets filters out current cocktail and already-preloaded URLs", () => {
  const cocktails = [
    { id: "c1", heroImageMobile: "/m1.webp", heroImageDesktop: "/d1.webp" },
    { id: "c2", heroImageMobile: "/m2.webp", heroImageDesktop: "/d2.webp" },
    { id: "c3", heroImageMobile: "/m3.webp", heroImageDesktop: "/d3.webp" },
    { id: "c4", heroImageMobile: "/m4.webp", heroImageDesktop: "/d4.webp" },
  ];

  const preloaded = new Set(["/d2.webp"]);

  // Desktop viewport: should exclude c1 (currentId) and c2 (already preloaded)
  const targets = pickIdlePreloadTargets(cocktails, "c1", false, preloaded, 3);
  assert.deepEqual(targets, ["/d3.webp", "/d4.webp"]);

  // Mobile viewport: /m2.webp is not in preloaded set, so c2 is eligible
  const mobileTargets = pickIdlePreloadTargets(cocktails, "c1", true, preloaded, 2);
  assert.equal(mobileTargets.length, 2);
  assert.ok(!mobileTargets.includes("/m1.webp"));
});

test("createShuffleTokenManager handles concurrency and supersedes stale tokens", () => {
  const manager = createShuffleTokenManager();
  assert.equal(manager.current(), 0);

  const token1 = manager.next();
  assert.equal(token1, 1);
  assert.ok(manager.isCurrent(token1));

  const token2 = manager.next();
  assert.equal(token2, 2);
  // token1 is now superseded and stale
  assert.equal(manager.isCurrent(token1), false);
  assert.equal(manager.isCurrent(token2), true);
});
