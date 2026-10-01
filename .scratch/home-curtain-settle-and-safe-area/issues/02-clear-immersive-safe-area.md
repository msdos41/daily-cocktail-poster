# 02: Clear the immersive safe area

**What to build:** On the home page and on cocktail detail pages, the immersive top bar and the recipe handle sit clear of the notch, the side insets, and the home indicator. The poster stays full bleed. Copy anchors and stage size stay as they are. The Collection, About, and Privacy keep their current header and viewport.

**Blocked by:** None (can start immediately).

**Status:** closed

- [x] The immersive top bar adds the top, left, and right safe-area insets to its existing padding, on both the home page and cocktail detail pages.
- [x] The recipe handle adds the bottom safe-area inset to its existing offset, on both the home page and cocktail detail pages.
- [x] The poster remains full bleed. Per-cocktail copy anchors do not gain an inset. Floating actions, including Surprise Me, share, and download, keep their current offsets.
- [x] A zero inset leaves the desktop placement unchanged.
- [x] The cover viewport flag is set only on immersive pages.
- [x] The Collection, About, Privacy, the missing page, and the root redirect keep the current viewport. The standard page header does not gain safe-area padding.
- [x] The static output gate covers the immersive viewport and the safe-area chrome. The build and the static verification pass.
