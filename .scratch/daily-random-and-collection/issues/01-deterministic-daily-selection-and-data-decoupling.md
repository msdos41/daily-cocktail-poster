# 01: Deterministic Daily Selection and Data Decoupling

**What to build:**
Decouple the cocktail dataset from calendar dates and implement a deterministic date-seeded pseudo-random selection algorithm. Any given calendar date key (`YYYY-MM-DD`) in a visitor's local timezone deterministically resolves to a specific cocktail from the complete 33-drink library. The sequence cycles through all library drinks across a full cycle without repeating on consecutive days.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] The cocktail data model treats all 33 cocktails as permanently active, removing date-based publication gating.
- [ ] The selection algorithm accepts a date and returns a deterministic cocktail index/slug.
- [ ] Multiple calls with the same date key produce the exact same cocktail recommendation.
- [ ] Adjacent dates yield different cocktails, preventing back-to-back duplicate recommendations.
- [ ] Full cycle traversal presents every cocktail in the catalog before restarting.
- [ ] User timezone offsets at date boundaries resolve to the correct local calendar day.
