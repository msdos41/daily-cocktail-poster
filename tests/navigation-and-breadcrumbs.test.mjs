import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("astro.config.mjs defines 301 redirects from /archive to /cocktails/", async () => {
  const configModule = await import("../astro.config.mjs");
  const config = configModule.default;
  assert.ok(config.redirects, "astro.config.mjs must have redirects configured");
  assert.equal(config.redirects["/en/archive"], "/en/cocktails/");
  assert.equal(config.redirects["/zh-cn/archive"], "/zh-cn/cocktails/");
});

test("UtilityTopbar features The Collection link instead of archive", () => {
  const content = fs.readFileSync(path.join(root, "src/components/UtilityTopbar.astro"), "utf8");
  assert.ok(!content.includes("/archive"), "UtilityTopbar must not link to /archive");
  assert.ok(content.includes("/cocktails/"), "UtilityTopbar must link to /cocktails/");
  assert.ok(content.includes("theCollection"), "UtilityTopbar must use theCollection label");
});

test("BaseLayout footer features The Collection link instead of archive", () => {
  const content = fs.readFileSync(path.join(root, "src/layouts/BaseLayout.astro"), "utf8");
  assert.ok(!content.includes("/archive"), "BaseLayout footer must not link to /archive");
  assert.ok(content.includes("/cocktails/"), "BaseLayout footer must link to /cocktails/");
  assert.ok(content.includes("theCollection"), "BaseLayout footer must use theCollection label");
});

test("cocktail detail page features breadcrumbs returning to The Collection", () => {
  const content = fs.readFileSync(path.join(root, "src/pages/[locale]/cocktails/[slug].astro"), "utf8");
  assert.ok(content.includes("/cocktails/"), "Detail page must include link back to /cocktails/");
  assert.ok(content.includes("theCollection"), "Detail page must include theCollection in breadcrumbs");
});
