# 05: GEO LLMs.txt and AI Search Crawler Protocol

**What to build:**
Implement modern Generative Engine Optimization (GEO) infrastructure to facilitate ingestion, ranking, and direct citations by AI search models and agents.
1. Create `public/llms.txt`:
   - Summary of Just One Sip brand, editorial mission, metric measurement standards, and cocktail library breakdown.
   - Structured list of all 33 cocktails with canonical links.
   - Pointer to `/llms-full.txt`.
2. Create static endpoint `src/pages/llms-full.txt.ts`:
   - Pre-renders a complete single-file Markdown document containing recipes, exact measurements, origin capsules, flavor profiles, and preparation steps for all 33 drinks.
3. Update `public/robots.txt`:
   - Explicitly welcome AI crawlers (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Applebot-Extended`).
   - Add `LLMs-Txt: https://justonesip.today/llms.txt`.
   - Maintain `Sitemap: https://justonesip.today/sitemap.xml`.

**Blocked by:**
- 04: Midnight Pour Editorial Expansion (Answer Capsules & Cross-Linking)

**Status:** ready-for-agent

- [ ] `public/llms.txt` conforms to the llms.txt standard and references the cocktail library.
- [ ] `/llms-full.txt` compiles statically and outputs structured Markdown for all 33 cocktails.
- [ ] `public/robots.txt` declares explicit AI search bot access and references both sitemap and llms.txt.
- [ ] `npm run build` succeeds with zero errors.
