Status: closed

# Specification: Settle the Daily Curtain and clear the immersive safe area

## Problem Statement

On a phone, the home page's full-screen poster is unstable, and the controls on both poster pages sit under the system bars.

A visitor opening the Daily Pour sees the stage jump after it becomes visible. The published page is built for one calendar day, then the Daily Curtain replaces it with the visitor's local day. That replacement changes the cocktail, the poster, and the copy position while, or just as, the poster becomes visible. The phone may also download the build-time poster and then the poster that is actually shown. Mobile scene posters are large, so the extra request costs the first screen.

The same visitor on a phone with a notch or a home indicator finds the language and menu buttons, and the recipe handle, crowded into the system insets. This happens on the home page and on a cocktail detail page, because they share that chrome. The poster itself should remain full bleed.

Search traffic from Brazil, and the mix of brand, English, and Chinese queries, is not the problem this work solves. The stage's viewport height and the display font are also not this work. A late font swap may still move the title. A jump of the stage box itself may still leave the home page with a poor layout-shift score.

## Solution

The Daily Curtain keeps the home poster unseen until the local-day cocktail, its copy position, and its fitted title are in place. The browser requests only the one poster that will be shown: the mobile poster at the existing mobile art-direction width, and the desktop poster on a wider viewport.

Home and cocktail detail pages let the immersive top bar and the recipe handle clear the notch, the side insets, and the home indicator. The settled poster uses the same stage size and the same per-cocktail copy anchors as it does today. The Collection and the information pages stay as they are.

## User Stories

1. As a visitor opening the home page on a day other than the build day, I want the Daily Pour I see to be my local day's cocktail, so that the poster matches my calendar day.
2. As a visitor opening the home page, I want the poster, title, and copy to stay unseen until that local-day cocktail is the one on stage, so that I do not watch one drink turn into another.
3. As a visitor opening the home page, I want the copy to be in its final position before the poster appears, so that the title and ingredients do not jump after I can see them.
4. As a visitor opening the home page, I want the title to be fitted before the poster appears, so that a later shrink does not move the copy.
5. As a visitor on a phone, I want the home page to request only the mobile poster of the cocktail that will be shown, so that the first screen does not download a second scene.
6. As a visitor on a wider screen, I want the home page to request only the desktop poster of the cocktail that will be shown, so that the first screen does not download the mobile scene as well.
7. As a returning visitor on the same local day, I want the cached Daily Pour to choose that same single poster, so that a repeat visit still does not download the build-time scene.
8. As a visitor on a slow connection, I want the existing safety timeout to reveal the stage even when the poster is still decoding, so that the Daily Curtain does not hold the page shut.
9. As a visitor who prefers reduced motion, I want the curtain to reveal without a fade, so that the existing motion preference still holds.
10. As a visitor using Surprise Me after the curtain lifts, I want the shuffle to keep its current synchronized swap, so that this work does not change that action.
11. As a visitor reading in English, I want the curtain and the single poster request to behave the same way, so that the published English Locale is not a special case.
12. As a visitor reading in Simplified Chinese, I want the curtain and the single poster request to behave the same way, so that the published Chinese Locale is not a special case.
13. As a visitor on a notched phone, I want the language and menu buttons on the home page to sit clear of the notch, so that I can open them.
14. As a visitor on a notched phone, I want those same buttons on a cocktail detail page to sit clear of the notch, so that the shared top bar matches the home page.
15. As a visitor on a phone with a home indicator, I want the recipe handle on the home page to sit clear of that indicator, so that I can open the recipe.
16. As a visitor on a phone with a home indicator, I want the recipe handle on a cocktail detail page to sit clear of that indicator, so that I can scroll to the recipe.
17. As a visitor turning a phone sideways, I want the immersive top bar to clear the side insets, so that the brand and the menus stay tappable.
18. As a visitor on a phone, I want the poster to remain full bleed under the system bars, so that the safe area moves the controls and not the photograph.
19. As a visitor moving from the home page to that cocktail's detail page, I want the settled poster to use the same stage size and the same copy anchor, so that it is still the same poster.
20. As a visitor on a desktop browser, I want the safe-area insets to add nothing, so that the top bar and the recipe handle stay where they are.
21. As a visitor on The Collection, I want the gallery header and the cards to stay as they are, so that this work does not change the gallery.
22. As a visitor on About or Privacy, I want those pages to keep their current header, so that the safe area stays on the poster pages.
23. As a search crawler that does not run JavaScript, I want the home page to still contain the build-time cocktail's words, so that the document remains readable.
24. As a visitor without JavaScript, I want the home stage to show those build-time words on the stage background, so that the page does not depend on a poster request that never starts.
25. As a visitor on a cocktail detail page, I want that page's own poster to load as it does today, so that a fixed cocktail does not wait on the Daily Curtain.
26. As a visitor whose web font arrives late, I want the accepted title movement from that font swap to remain the only leftover type shift, so that the curtain does not pretend to solve font loading.
27. As a visitor on a phone whose browser chrome changes the viewport height, I want this work to leave the stage height alone, so that a shared height fix can still be done later on both poster pages together.

## Implementation Decisions

- The Daily Pour stays client-side and local to the visitor's calendar day. The site stays static. No locale, route, or cocktail-library change is part of this work.
- The Daily Curtain remains home-only. Cocktail detail pages do not veil, do not swap the cocktail, and do not strip their poster URL.
- A Daily Curtain reveal policy decides, before the veil lifts, which cocktail is shown and which single poster URL is requested. Inputs are the local date, the same-day cache when it matches, the viewport, and the catalog. At the existing mobile art-direction width the URL is that cocktail's mobile poster. Above that width the URL is that cocktail's desktop poster. The policy returns one URL.
- The home poster is not given a fetchable address in the initial document. The curtain assigns the policy's URL. An empty document address is not used, because that would request the page itself.
- The build-time cocktail's words stay in the home document for readers and crawlers that do not run the curtain. The curtain class still hides that copy only when JavaScript runs.
- While the veil is up, the home stage adopts the chosen cocktail's identity, copy, and per-cocktail copy anchor, then fits the title. The veil lifts only after that identity is applied and the title has been fitted. The existing decode wait and safety timeout still govern when the picture is ready. A slow decode must not move the stage box.
- The title is not fitted again when the web font finishes loading. A later viewport resize may still fit the title, as it does today.
- Stage width, stage height, per-cocktail copy anchors, and the display font's loading behavior stay as they are. Floating actions, including Surprise Me, share, and download, keep their current offsets.
- The immersive top bar clears the top inset and the left and right insets by adding them to its existing padding. The recipe handle clears the bottom inset by adding it to its existing offset. Both rules apply on the home page and on cocktail detail pages, because the chrome is shared. Insets of zero leave the desktop layout unchanged.
- The poster image stays full bleed. Copy anchors do not gain an inset. On a phone with a home indicator the handle moves up toward the copy, and the remaining gap can be as small as a few pixels. That tightness is accepted.
- The viewport cover flag is set only on immersive pages, so the insets exist where the chrome uses them. The Collection, About, Privacy, the missing page, and the root redirect keep the current viewport.
- The layout breakpoints at the two narrower widths stay as they are. The art-direction width that chooses the mobile poster stays as it is. Those widths are not aligned in this work.
- Surprise Me keeps its current synchronized swap and its idle buffer. This work does not change what it preloads after the curtain has lifted.

## Testing Decisions

- A good test describes what a visitor or a published document does. It does not pin private timers, class names, or the shape of the inline script.
- One behavioral seam: the Daily Curtain reveal policy. The existing daily-curtain tests are the prior art. Extend that policy's tests. Given a local date, a matching or stale cache, and a viewport, the policy names one cocktail and one poster URL. The mobile width selects the mobile poster. A wider width selects the desktop poster. The veil is allowed to lift only after the chosen identity is applied and the title has been fitted. Detail pages never ask this policy to hide their poster.
- One document seam, already used for published pages: the static output gate. Home documents in both published Locales do not put a fetchable poster address on the initial picture, still include the curtain for JavaScript visitors, and still include the build-time cocktail's words. Detail documents keep that cocktail's poster address and do not include the home curtain. Immersive documents use the cover viewport. The Collection, About, and Privacy do not. The immersive top bar and the recipe handle use the safe-area insets. The standard page header does not.
- Prior art for the document seam is the existing static output verification and the source-level navigation tests. Prior art for choosing a mobile or desktop poster URL is the Surprise Me image-target test.
- No browser lab is added. Field layout-shift scores and the accepted font swap are not asserted.

## Out of Scope

- Publishing any new Locale, including Brazilian Portuguese or Spanish.
- Changing titles, snippets, or landing pages because of Brazil traffic.
- Changing the stage height, the stage width unit, or the display font's loading.
- Aligning the art-direction width with the layout widths.
- Compressing scene posters, or changing how many images The Collection downloads while scrolling.
- Visible labels for the icon buttons, larger filter chips, or moving Surprise Me, share, and download.
- Adding safe-area padding to The Collection, About, Privacy, or any non-immersive header.
- A second title fit after the veil lifts, except the resize fitting that already exists.
- Removing the Surprise Me idle buffer.

## Further Notes

- The home stage box can still jump when the mobile browser settles the viewport height. Home and detail share that height. If the poor layout-shift score remains after this work, the next change adjusts that height on both poster pages together. It does not give the home page its own stage size.
- The display font can still restyle the title after the curtain lifts. That movement is accepted.
- The zero-flash curtain already hides the build-time cocktail from JavaScript visitors and reveals after decode or the safety timeout. This spec keeps that veil. It changes the initial picture so the build-time poster is not requested, and it requires the copy and the fitted title to be ready before the veil lifts.
- The daily selection remains the client-side, date-seeded Daily Pour. Nothing here reopens the editorial or taxonomy decisions.
