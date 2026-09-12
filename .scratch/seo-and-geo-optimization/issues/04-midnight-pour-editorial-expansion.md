# 04: Midnight Pour Editorial Expansion (Answer Capsules & Cross-Linking)

**What to build:**
Enrich cocktail data and detail pages with curated, high-density editorial information ("Answer Capsules") to dramatically increase citation probability in AI search engines (Perplexity, ChatGPT, Claude, Google AI Overviews), while strictly adhering to the Midnight Pour design principles.
1. Extend `src/data/cocktails.ts` data model with localized editorial fields:
   - `originLore`: 60-90 words detailing creation year, city, creator, and historical context.
   - `flavorNotes`: Structured taste attributes (e.g. "Bitter, Herbal, Botanical, Spirit-forward").
   - `barTips`: 2-3 expert technique secrets (ice temperature, peel expression, dilution).
   - `faqs`: 2-3 common questions and direct, concise answers.
   - `relatedSlugs`: 2 related drinks to establish semantic cross-linking.
2. Update `src/pages/[locale]/cocktails/[slug].astro` UI:
   - Render a refined, low-contrast editorial section below the recipe steps on charred walnut panels (`#211b17`).
   - Add a subtle "Sister Pours" / "Related Drinks" horizontal shelf linking to related cocktails.
   - Guardrails: zero generic bloated blog styling, zero purple gradients, zero popups.

**Blocked by:**
- None

**Status:** closed
Completed: 2026-09-12

- [x] All 33 cocktails provide complete bilingual (`en` and `zh-CN`) editorial fields in `src/data/cocktails.ts`.
- [x] Detail pages render the curated editorial section adhering to the "Midnight Pour" design tokens.
- [x] Detail pages display horizontal cross-links to 2 related cocktails.
- [x] Mobile responsive layout maintains zero horizontal scroll and high readability.
- [x] `npm run build` succeeds with zero errors.
