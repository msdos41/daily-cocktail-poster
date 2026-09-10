# 02: Home Page Daily Pour and Surprise Me Shuffle Action

**What to build:**
Update the home page to display the Daily Pour determined by the date-seeded PRNG, and equip the action bar with an interactive "Surprise Me" shuffle button. Triggering "Surprise Me" cycles the view on demand to an alternate cocktail from the library without page reload, updating the background visual, copy, recipe dialog, HD download link, and social share payload seamlessly.

**Blocked by:** 01: Deterministic Daily Selection and Data Decoupling

**Status:** closed
Completed: 2026-09-10

- [x] Home page renders the build date's Daily Pour in static HTML fallback.
- [x] Client inline pre-paint script checks visitor's local date and aligns DOM before initial paint, preventing hydration flicker.
- [x] A "Surprise Me" icon button is added to the floating action bar on the home page.
- [x] Clicking "Surprise Me" switches the hero visual, cocktail title, subtitle, and recipe sheet to an alternate cocktail.
- [x] The HD background download link updates its target URL and file name after a shuffle.
- [x] The share tray (X, Reddit, clipboard) updates its share URL, cocktail name, and slug payload after a shuffle.
- [x] Shuffle transitions respect `prefers-reduced-motion` preferences.
