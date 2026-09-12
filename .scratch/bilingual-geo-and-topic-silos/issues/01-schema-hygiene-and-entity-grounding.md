# 01: Schema.org Hygiene and Knowledge Graph Entity Grounding

**What to build:**
Ensure all cocktail detail pages and publisher schema strictly comply with search engine rich result guidelines and link into the global Knowledge Graph. Eliminate anomalous cooking times from cold beverage recipes, verify the publisher organization entity with official social profile links, and ground all 33 cocktail recipes to canonical Wikidata entity identifiers and official International Bartenders Association (IBA) categories. When search engines and answer bots inspect structured data, recipes report zero validation warnings and unambiguously resolve to global entity registries.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Cocktail `Recipe` structured data omits `cookTime` entirely, retaining only `prepTime` and `totalTime`.
- [ ] Publisher `Organization` structured data includes `sameAs` referencing the official social profile (`https://x.com/justonesip_app`).
- [ ] Cocktail data model supports universal `wikidataId` and `ibaCategory` attributes across all 33 catalog drinks.
- [ ] Cocktail `Recipe` structured data renders `sameAs` pointing to canonical Wikidata URIs (e.g., `https://www.wikidata.org/wiki/Q1342603`) and `isBasedOn` pointing to official IBA cocktail classification when present.
- [ ] Static output verification suite (`npm run verify`) verifies that no `Recipe` block contains `cookTime`, that `Organization` includes valid `sameAs`, and that entity attributes pass schema assertions.
- [ ] Site builds cleanly with `npm run build` and passes `npm run verify` with zero warnings.
