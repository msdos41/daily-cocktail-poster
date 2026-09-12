# 03: Symmetrical Bilingual LLM Feeds and AI Crawler Protocol

**What to build:**
Enable full parity for AI answer engines and generative crawlers across English and Simplified Chinese by implementing dedicated, localized machine-readable knowledge base feeds (`/[locale]/llms.txt` and `/[locale]/llms-full.txt`). The Chinese feeds supply exact metric measurements, historical provenance, flavor profiles, preparation techniques, and Wikidata/IBA entity references in Simplified Chinese, while the English feeds provide identical parity for English crawlers. The root `/llms.txt` is restructured into a bilingual navigation index conforming to `llmstxt.org`, and `public/robots.txt` explicitly points AI bots to the localized feeds.

**Blocked by:** 01: Schema.org Hygiene and Knowledge Graph Entity Grounding

**Status:** ready-for-agent

- [ ] Astro static endpoint `src/pages/[locale]/llms.txt.ts` statically generates `/en/llms.txt` and `/zh-cn/llms.txt` containing categorized cocktail indexes and links to full knowledge bases in the respective language.
- [ ] Astro static endpoint `src/pages/[locale]/llms-full.txt.ts` statically generates `/en/llms-full.txt` and `/zh-cn/llms-full.txt` containing exhaustive, structured markdown representations for all 33 cocktails in the respective language (including lore, flavor notes, bar tips, FAQs, and Wikidata/IBA entity references).
- [ ] Root `public/llms.txt` acts as an entrypoint overview and language hub pointing directly to `/en/llms.txt`, `/en/llms-full.txt`, `/zh-cn/llms.txt`, and `/zh-cn/llms-full.txt`.
- [ ] Root `public/robots.txt` declares `LLMs-Txt` directives pointing to the localized feeds alongside the root index.
- [ ] Static output verification suite (`npm run verify`) verifies that all 4 localized feeds and the root files exist on disk, contain all 33 cocktail slugs, and present valid, uncorrupted UTF-8 text for both locales.
- [ ] Site builds cleanly with `npm run build` and passes `npm run verify`.
