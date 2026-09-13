<div align="center">

# Just One Sip

*One drink, one visual, one concise recipe every day.*

[![Astro](https://img.shields.io/badge/Astro-v5.1-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Active](https://img.shields.io/badge/Status-Active%20MVP-success)](#status)
[![Live Site](https://img.shields.io/badge/Live-justonesip.today-e3b35f)](https://justonesip.today)

[English](README.md) | [简体中文](README.zh-CN.md)

</div>

---

## Introduction

### Summary
**Just One Sip** is a bilingual daily cocktail poster and discovery experience built on a pure static Astro architecture.
Designed with a "Midnight Pour" editorial personality—warm charred walnut backgrounds, cream ink typography, and subtle bitter ruby accents—the platform makes discovering cocktails feel like encountering an evocative visual poster under low bar light, rather than sifting through a sterile database.

Live site: [https://justonesip.today](https://justonesip.today)

### Features
- 🍸 **Daily Pour Recommendation**: Evaluated entirely client-side using deterministic, date-seeded pseudo-random rotation aligned with each visitor's local calendar day.
- 🎲 **On-Demand "Surprise Me" Shuffle**: Instantly cycle through alternative picks without waiting for the next calendar day.
- 📚 **The Collection Hub**: A statically pre-rendered gallery exhibiting 33 classic cocktails with responsive grid cards and base-spirit filter chips.
- 📜 **Non-Intrusive Recipe Drawer**: A bottom sheet presenting trustworthy measurements, concise method steps, glassware recommendations, and flavor profile tags.
- 🖼️ **HD Wallpaper Download & Sharing**: Download device-tailored high-resolution wallpapers and share via streamlined X and Reddit trays.
- 🌐 **Bilingual by Design**: Full symmetrical parity between English (`en`) and Simplified Chinese (`zh-CN`) with strict typographic overflow prevention.
- 🚀 **Strict SEO & Metadata Standards**: Canonical links, bidirectional `hreflang` tags, Open Graph meta, and valid Schema.org `Recipe` / `ItemList` JSON-LD blocks.

---

## Requirements

- **Node.js**: `>= 18.17.1` (Recommended: 20.x LTS)
- **Package Manager**: `npm` (`>= 9.x`)

---

## Configuration

Key configuration files include:

- **`astro.config.mjs`**: Declares static site base URL (`https://justonesip.today`) and static build options.
- **`src/i18n/config.ts`**: Configures `supportedLocales`, reserved `plannedLocales`, and route mappings.
- **`src/data/cocktails.ts`**: Central source of truth for cocktail recipes, ingredients, flavor tags, and asset mappings.

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/msdos41/daily-cocktail-poster.git
cd daily-cocktail-poster
npm install
```

---

## Usage

### Local Development
Start the local development server:

```bash
npm run dev
```

To test on mobile devices across the local network:

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

### Route Overview

| Path | Type | Description |
| :--- | :--- | :--- |
| `/` | Redirect | 302 redirect to default locale `/en/` |
| `/[locale]/` | Immersive Daily | Deterministically scheduled daily cocktail poster & recipe |
| `/[locale]/cocktails` | The Collection | Static gallery of all 33 cocktails with base-spirit filter chips |
| `/[locale]/cocktails/[slug]` | Detail Page | Permanent recipe URL with Schema.org Recipe JSON-LD |
| `/[locale]/archive` | Redirect | 301 permanent redirect to `/[locale]/cocktails` |
| `/sitemap.xml` | Sitemap | Pre-rendered static XML sitemap |

---

## Development

### Directory Structure

```text
daily-cocktail-poster/
├── DESIGN.md                  # Comprehensive design tokens, colors & typography rules
├── PRODUCT.md                 # Product definition, audience & brand principles
├── astro.config.mjs           # Astro SSG configuration
├── scripts/
│   └── verify-static-output.mjs # Static build compliance verification suite
├── src/
│   ├── components/            # Astro UI components (BrandMark, ImmersiveCocktail, etc.)
│   ├── data/
│   │   ├── cocktails.ts       # Source of truth: 33 curated cocktail datasets
│   │   ├── cocktailCandidates.ts # Internal backlog & scheduling candidate data
│   │   └── heroAssets.ts      # Visual asset mappings
│   ├── i18n/                  # Internationalization configs and dictionary
│   ├── layouts/               # BaseLayout HTML shell, SEO & meta tags
│   ├── pages/                 # Static page routes
│   └── styles/
│       └── global.css         # Global CSS tokens and utility classes
```

### Building & Verification
Compile static output and verify against strict production constraints:

```bash
# Type check and build static files to dist/
npm run build

# Preview static distribution locally
npm run preview

# Run comprehensive static verification suite
npm run verify
```

> **The Verification Suite (`verify`) ensures:**
> 1. All localized routes exist and contain canonical and reciprocal `hreflang` tags.
> 2. Cocktail detail pages output valid Schema.org `Recipe` JSON-LD blocks.
> 3. Immersive pages include valid `data-share-payload`.
> 4. Error page (`404.html`) contains `noindex` and is excluded from `sitemap.xml`.

---

## Changelog

### v0.1.0 (MVP) - 2026
- ✨ Launched static Astro 5 MVP with full bilingual support (`en` and `zh-CN`).
- 🍸 Introduced deterministic date-seeded pseudo-random Daily Pour rotation with "Surprise Me" shuffle.
- 📚 Delivered The Collection hub pre-rendering 33 library cocktails with base-spirit filtering.
- 📱 Integrated non-intrusive recipe bottom sheet, device-specific HD wallpaper download, and share tray.
- 🔍 Implemented comprehensive SEO infrastructure with Schema.org Recipe JSON-LD.

---

## FAQ

**Q: Why a pure static site (SSG) instead of SSR or a backend database?**  
A: For blazing performance, zero hosting maintenance, and rock-solid durability. The Daily Pour calculates deterministically in the client's local timezone, delivering a fresh daily experience without requiring dynamic server rendering or database calls.

**Q: What is the current format of cocktail visual assets?**  
A: High-quality, fast-loading responsive SVG graphics. The data layer is engineered with clean `heroImageDesktop` / `heroImageMobile` contracts, allowing future replacement with high-resolution photography or AI-rendered imagery without code changes.

---

## Support

### Documentation
- [DESIGN.md](DESIGN.md): Comprehensive design system tokens, color palettes, and UI rules.
- [PRODUCT.md](PRODUCT.md): Brand voice ("Midnight Pour"), user personas, and accessibility standards.

### Release Planning
- 🎨 **High-Resolution Imagery**: Transition to refined photographic or rendered visual assets.
- 🌍 **Language Expansion**: Roll out support for additional planned locales (`es`, `ja`, `fr`).
- 🔎 **Multi-Dimensional Discovery**: Flavor-based filtering (e.g. smoky, bitter, floral) in The Collection.

### Contact & Community
- **Website**: [https://justonesip.today](https://justonesip.today)
- **Feedback & Discussions**: Please open an issue or start a discussion on [GitHub Issues](https://github.com/msdos41/daily-cocktail-poster/issues).

---

## Contributing

Contributions to recipe precision, translation fidelity, and accessibility are warmly welcomed!

1. Fork the repo and create your feature branch (`git checkout -b feat/my-cocktail`).
2. Update data in `src/data/cocktails.ts` with complete `en` and `zh-CN` translations.
3. Adhere to Conventional Commits standards (`feat: ...`, `fix: ...`).
4. Ensure `npm run build` and `npm run verify` pass with zero errors.
5. Open a Pull Request with a clear summary of your changes.

### Contributors
Thanks to all contributors and cocktail enthusiasts who help shape Just One Sip!

---

## License

- Source code is released under the [MIT License](LICENSE).
- Cocktail recipes curation, localized copy, and brand assets retain original copyright.

---

## Status

🟢 **Active (Production MVP)**: The MVP is live and maintained at [https://justonesip.today](https://justonesip.today).
