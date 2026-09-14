# 01: Locale-Aware Social Image Infrastructure

**What to build:** Refactor the social image resolution pipeline and verification suite so default social preview images adapt to the page's active locale while maintaining seamless backward compatibility for legacy image URLs.

**Blocked by:** None (can start immediately)

**Status:** closed

- [x] `defaultSocialImageForLocale(locale)` resolves `/images/og-default-en.jpg` for English and `/images/og-default-zh.jpg` for Chinese
- [x] The base layout automatically applies the locale-appropriate default image for non-cocktail routes without manual per-page overrides
- [x] The legacy default image path remains accessible as a fallback alias to protect cached external links
- [x] Static verification suite tests pass, validating that English and Chinese pages output their designated default Open Graph metadata
