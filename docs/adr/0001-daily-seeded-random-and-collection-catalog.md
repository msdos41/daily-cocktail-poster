# Daily Seeded Pseudo-Random Selection and Full Collection Catalog

To shift from rigid calendar date scheduling and a 14-day past-picks archive to an evergreen library, we will select the Daily Pour using a deterministic date-seeded pseudo-random algorithm (with an optional on-demand shuffle action) and replace the archive route with a fully pre-rendered Collection catalog at `/[locale]/cocktails/`.

## Considered Options

- **Option 1: Runtime server / API with database**: Requires server infrastructure and scheduled rebuilds, violating the zero-maintenance static SSG constraint.
- **Option 2: Client-side unseeded Math.random() on every load**: Breaks the shared "Daily Pour" ritual across visitors, produces hydration flash on static HTML, and yields inconsistent share links.
- **Option 3 (Selected): Deterministic date-seeded PRNG + Static Full Collection**: Retains daily consistency and timezone alignment without SSR, enables zero-flash SSG fallback, opens all 33 drinks to search engine crawlers in static HTML, and preserves user agency with a "Surprise Me" shuffle action.

## Consequences

- The `date` property in `cocktails.ts` is decoupled from future visibility gates; all cocktails become publicly indexed.
- The `/[locale]/archive` route is replaced by `/[locale]/cocktails/` with 301 redirects, eliminating client-side deferred rendering in favor of static compilation.
- Static verification (`scripts/verify-static-output.mjs`) retires future leak assertions in favor of complete catalog validation and `ItemList` schema verification.
