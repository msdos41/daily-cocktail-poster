# 04: Navigation, Redirects and Detail Breadcrumbs

**What to build:**
Update site navigation menus to feature The Collection, configure permanent HTTP 301 redirects from legacy `/archive` paths to `/cocktails/`, and enrich cocktail detail pages with intuitive back-links and breadcrumbs pointing through The Collection.

**Blocked by:** 03: The Collection Gallery and Spirit Filters

**Status:** ready-for-agent

- [ ] Topbar and footer menus replace "Past Picks" with "The Collection" (`/[locale]/cocktails/`).
- [ ] Active navigation indicators correctly highlight when visiting `/[locale]/cocktails/`.
- [ ] Legacy URLs `/en/archive` and `/zh-cn/archive` redirect (301) to `/en/cocktails/` and `/zh-cn/cocktails/`.
- [ ] Cocktail detail pages (`/[locale]/cocktails/[slug]`) include a visible link and visual breadcrumb returning to The Collection.
- [ ] Localized menu and breadcrumb labels are natural and accurate in both `en` and `zh-CN`.
