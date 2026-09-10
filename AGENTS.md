# AGENTS.md

Project-specific instructions and guidelines for Just One Sip (`daily-cocktail-poster`).

---

## 1. Project Context & Architecture

### What is Just One Sip?
Just One Sip is a bilingual daily cocktail poster experience ("Midnight Pour" brand personality).
- **Core Concept:** One drink, one visual, one concise recipe every day.
- **Atmosphere:** Night-bar editorial, image-led, warm, compact, and atmospheric under low bar light.
- **Live Site:** `https://justonesip.today`

### Tech Stack
- **Framework:** [Astro](https://astro.build/) (Static Site Generation / SSG)
- **Language:** TypeScript (`strict: true`)
- **Styling:** Vanilla CSS (`src/styles/global.css` with CSS custom properties)
- **Icons:** `lucide-astro`
- **Output:** Fully static HTML in `dist/`

### Architectural Hard Constraints
1. **Pure Static Architecture:**
   - No runtime server, no database, no CMS, no backend API, no scheduled server rebuilds.
   - All dynamic scheduling is evaluated client-side in the user's local timezone.
2. **Daily Scheduling Source of Truth:**
   - The `date` field in `src/data/cocktails.ts` governs the schedule.
   - **Home page (`/[locale]/`):** Selects the cocktail matching today's local date (`date <= today`).
   - **Archive page (`/[locale]/archive`):** Shows only published cocktails (`date <= today`). **Future cocktails must NOT leak into static archive HTML markup or sitemap archive URLs.**
   - **Detail pages (`/[locale]/cocktails/[slug]`):** Fixed, permanent URLs that do not depend on the daily schedule.
3. **Bilingual by Default (`en` and `zh-CN`):**
   - Active locales: English (`en`) and Simplified Chinese (`zh-CN`).
   - Root `/` redirects to `/en/`.
   - Locales have symmetrical routing: `/[locale]/`, `/[locale]/archive`, `/[locale]/cocktails/[slug]`, `/[locale]/about`, `/[locale]/privacy`.
   - Any cocktail data change in `src/data/cocktails.ts` must provide complete and accurate translations for both `en` and `zh-CN`.
4. **Strict SEO & Metadata Standards:**
   - Canonical URLs on every page.
   - Symmetrical `hreflang` alternates (`en`, `zh-CN`, and `x-default`) matching canonicals.
   - Detail pages must output exactly one valid Schema.org `Recipe` JSON-LD block.
   - `404.html` must include `<meta name="robots" content="noindex,follow">` and must NOT appear in `sitemap.xml`.
   - Immersive pages must include the `data-share-payload` script.

---

## 2. Design System Principles ("Midnight Pour")

Reference: `DESIGN.md`

### Core Palette
- **Charred Walnut** (`#15120f`): Global dark page background.
- **Cream Ink** (`#f7efe5`): Primary text, icons, borders, and glass highlights (warm, not stark white).
- **Vermouth Gold** (`#e3b35f`): Accent cues, dates, kicker labels, and primary buttons.
- **Bitter Ruby** (`#d3513c`): Atmospheric accent in visuals/gradients (rarely carries UI text).
- **Deep Walnut Panel** (`#211b17`): Cards and meta-panel base.
- **Burnt Wood Panel** (`#2b221d`): Deeper panel layer.
- **Stage Black** (`#050403`): Media stage background.

### Named Rules
- **The Bar-Light Rule:** Gold is a cue, not a wash. Use it for labels, dates, and primary actions — never for broad background panels.
- **The Warm Neutral Rule:** Never use pure `#000` or `#fff`; all darks and lights must stay tinted toward the warm palette.
- **The Legibility Layer Rule:** Blur, shade, and shadow are allowed *only* where imagery would otherwise damage text or control readability. Avoid decorative glassmorphism or AI-template cliches.
- **The Natural Break Rule:** CJK and single-word titles prefer one line. Multi-word titles wrap only at natural break points (`word-break: keep-all; overflow-wrap: break-word;`). Zero horizontal overflow on mobile screens.
- **The Label Rarity Rule:** Uppercase tracked labels are strictly for orientation and recipe metadata. Do not turn every section into a label-plus-heading pattern.

### Anti-Patterns to Reject
- Generic AI-template cliches: purple gradients, decorative floating glass blobs, feature-marketing copy, repeated icon-card sections.
- Making the site look like a sterile recipe database or a SaaS landing page.
- Adding interactive states to chips that are purely informational tags.

---

## 3. Repository Structure

```text
daily-cocktail-poster/
├── DESIGN.md                  # Comprehensive design tokens and component guidelines
├── PRODUCT.md                 # Product definition, audience, and brand principles
├── README.md                  # Architecture overview, routes, and instructions
├── astro.config.mjs           # Astro configuration (site: https://justonesip.today)
├── package.json               # Scripts & dependencies
├── scripts/
│   └── verify-static-output.mjs # Static build verification test suite
├── src/
│   ├── components/            # Astro UI components (BrandMark, ImmersiveCocktail, etc.)
│   ├── data/
│   │   ├── cocktails.ts       # SOURCE OF TRUTH: Stable cocktail data & localized content
│   │   ├── cocktailCandidates.ts # Candidate backlog (internal, not imported in frontend)
│   │   └── heroAssets.ts      # Hero visual assets mapping
│   ├── i18n/
│   │   ├── config.ts          # Supported and planned locales
│   │   └── ui.ts              # Bilingual UI strings
│   ├── layouts/
│   │   └── BaseLayout.astro   # HTML document shell, SEO tags, hreflang, Open Graph
│   ├── pages/
│   │   ├── [locale]/          # Localized routes (index, archive, cocktails/[slug], etc.)
│   │   ├── images/            # Generated cocktail SVG endpoint
│   │   ├── 404.astro          # Error page (noindex, follow)
│   │   ├── index.astro        # Root redirect to /en/
│   │   └── sitemap.xml.ts     # Static XML sitemap generator
│   ├── styles/
│   │   └── global.css         # Global tokens, typography, and utility classes
│   └── utils/
│       └── seo.ts             # Canonical, hreflang, and JSON-LD helpers
```

---

## 4. Development & Verification Workflow

### Commands
```bash
# Start local development server
npm run dev

# Start local server with explicit binding (useful for browser/device testing)
npm run dev -- --host 127.0.0.1 --port 4321

# Type check & build static site to dist/
npm run build

# Preview static output
npm run preview

# Verify static build against hard constraints (Sitemap, SEO, JSON-LD, Future leaks)
npm run verify
```

### Verification Standard
Before concluding any task involving pages, data, routing, SEO, or layout:
1. Run `npm run build` — must succeed with zero Astro check/type errors.
2. Run `npm run verify` — must pass all assertions in `scripts/verify-static-output.mjs`:
   - All required pages exist for all supported locales.
   - Canonical and hreflang alternates are valid and reciprocal.
   - Detail pages contain valid Schema.org Recipe JSON-LD.
   - Immersive pages contain valid `data-share-payload`.
   - No future-dated cocktail titles/slugs leak into static archive HTML or sitemap archive links.
3. Check mobile responsiveness: ensure no horizontal scrollbars or word clipping occur on mobile viewports.

---

## 5. Context7 MCP

When generating code, setting up configurations, exploring external library APIs, or checking migration paths, prioritize using **Context7 MCP** (`resolve-library-id`, `query-docs`).

---

## 6. Git Commit Specification (Mandatory)

**Every change must be committed**, using Conventional Commits format. `test` and `feat` commits must be separated:

- **TDD Workflow**: First commit failing/passing tests (`test: <scope>: ...`), then commit the implementation (`feat: <scope>: ...`). Each is an independent commit.
- **Atomic Commits**: One commit per logical change. Only stage files directly related to the current change (`git add <files>`), avoiding sweeping changes or staging unrelated files.

Format:

```
<type>(<scope>): <subject>

<body>  # Optional
```

- `<type>`: `feat` (new feature) | `fix` (bug fix) | `refactor` (refactoring) | `test` (tests) | `docs` (documentation) | `chore` (maintenance/tooling) | `perf` (performance)
- `<scope>`: Affected package or subsystem, e.g. `core`, `renderer`, `web`, `ui`, `docs`, `xml`, `harness`
- `<subject>`: Imperative mood, lowercase start, max 50 characters, no trailing period.
- **Body**: English only. Do NOT use Chinese in commit messages.
- **No Trailers**: Prohibit automated tool attribution trailers (such as `Co-Authored-By: ...`).
- Examples:
  - `feat(core): implement manufacturing BOM and cut list generation`
  - `test(renderer): add test for document swapping in viewport culler`
  - `fix(web): wire setDocument and rebind subscriptions on vxf import`
  - `docs: update AGENTS.md with monorepo package boundaries`

Never commit secrets, credentials, `.env` files, or local temporary artifacts (strictly adhere to `.gitignore`).

---

## 7. Agent Skills

### Issue tracker

Issues and specs are tracked as local markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context (`CONTEXT.md` and `docs/adr/` at repo root). See `docs/agents/domain.md`.
