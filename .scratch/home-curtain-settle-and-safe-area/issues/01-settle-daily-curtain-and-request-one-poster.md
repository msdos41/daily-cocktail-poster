# 01: Settle the Daily Curtain and request one poster

**What to build:** On the home page, the Daily Curtain keeps the poster unseen until the visitor's local-day Daily Pour, its copy position, and its fitted title are in place. The browser requests only the one poster that will be shown. A phone requests that cocktail's mobile poster. A wider screen requests its desktop poster. The build-time poster is not downloaded first. Cocktail detail pages still show their own poster immediately. Surprise Me is unchanged.

**Blocked by:** None (can start immediately).

**Status:** closed

- [x] The reveal policy, given a local date, a same-day or stale cache, and a viewport, names one cocktail and one poster URL.
- [x] At the existing mobile art-direction width, that URL is the mobile poster. Above that width, it is the desktop poster.
- [x] A matching same-day cache selects that cached cocktail's single poster. A stale cache does not.
- [x] The veil lifts only after the chosen cocktail's identity and copy position are applied and the title has been fitted.
- [x] The home document in both published Locales does not put a fetchable poster address on the initial picture, and does not use an empty address that would request the page itself.
- [x] JavaScript visitors still get the Daily Curtain. Readers and crawlers that do not run it still receive the build-time cocktail's words.
- [x] The existing decode wait, safety timeout, and reduced-motion reveal still hold.
- [x] The title is not fitted again when the web font finishes loading. A viewport resize may still fit the title.
- [x] Stage size, per-cocktail copy anchors, and the display font's loading behavior stay as they are.
- [x] Detail pages keep their own poster address and do not run the home curtain.
- [x] Surprise Me keeps its synchronized swap and its idle buffer.
- [x] The policy tests and the static output gate cover this behavior. The build and the static verification pass.
