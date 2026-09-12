import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("robots.txt declares root and localized LLMs-Txt directives", () => {
  const robots = fs.readFileSync(path.join(root, "public/robots.txt"), "utf8");
  assert.ok(
    robots.includes("LLMs-Txt: https://justonesip.today/llms.txt"),
    "robots.txt must include root LLMs-Txt directive",
  );
  assert.ok(
    robots.includes("LLMs-Txt: https://justonesip.today/en/llms.txt"),
    "robots.txt must include /en/llms.txt directive",
  );
  assert.ok(
    robots.includes("LLMs-Txt: https://justonesip.today/zh-cn/llms.txt"),
    "robots.txt must include /zh-cn/llms.txt directive",
  );
});

test("root public/llms.txt acts as a bilingual hub pointing to English and Chinese feeds", () => {
  const llms = fs.readFileSync(path.join(root, "public/llms.txt"), "utf8");
  assert.ok(
    llms.includes("https://justonesip.today/en/llms.txt"),
    "llms.txt must link to /en/llms.txt",
  );
  assert.ok(
    llms.includes("https://justonesip.today/en/llms-full.txt"),
    "llms.txt must link to /en/llms-full.txt",
  );
  assert.ok(
    llms.includes("https://justonesip.today/zh-cn/llms.txt"),
    "llms.txt must link to /zh-cn/llms.txt",
  );
  assert.ok(
    llms.includes("https://justonesip.today/zh-cn/llms-full.txt"),
    "llms.txt must link to /zh-cn/llms-full.txt",
  );
});

test("localized llms endpoint source files exist and export GET and getStaticPaths", () => {
  const llmsEndpointPath = path.join(root, "src/pages/[locale]/llms.txt.ts");
  const llmsFullEndpointPath = path.join(root, "src/pages/[locale]/llms-full.txt.ts");

  assert.ok(
    fs.existsSync(llmsEndpointPath),
    "src/pages/[locale]/llms.txt.ts must exist",
  );
  assert.ok(
    fs.existsSync(llmsFullEndpointPath),
    "src/pages/[locale]/llms-full.txt.ts must exist",
  );

  const llmsSource = fs.readFileSync(llmsEndpointPath, "utf8");
  const llmsFullSource = fs.readFileSync(llmsFullEndpointPath, "utf8");

  assert.ok(llmsSource.includes("getStaticPaths"), "llms.txt.ts must export getStaticPaths");
  assert.ok(llmsSource.includes("export function GET") || llmsSource.includes("export const GET"), "llms.txt.ts must export GET");

  assert.ok(llmsFullSource.includes("getStaticPaths"), "llms-full.txt.ts must export getStaticPaths");
  assert.ok(llmsFullSource.includes("export function GET") || llmsFullSource.includes("export const GET"), "llms-full.txt.ts must export GET");
});
