# Mobile responsive verification

Verified in the Codex browser on 2026-10-10 against the local production build.

- Widths: 320, 360, 375, 390, 430, 768, 1024 and 1440px.
- 80 layout checks: home, library, Studio, try-on, stories, sources, saved Lookbook, outfit results, garment detail and story detail. No document horizontal overflow (`scrollWidth <= clientWidth`).
- Library: all 19 cards; one column at 320px, two from 360px, three on tablet, four on desktop. Search for “bà ba” returns one card; the filter panel exposes six selects.
- Studio: one column below 1024px, preview before controls; desktop remains two columns. Red swatch updates SVG fill; selecting nón lá adds its SVG layer. Saving creates a visible Lookbook card. Browser Back and Forward restore the corresponding page.
- Results: test server without credentials returns three clearly labeled sample cards with SVG previews. Cards are vertical on mobile. Cultural details expand. Existing API tests verify both Gemini and GPT response contracts and preservation of selections.
- Navigation: menu closes after navigation and with Escape. At 768 × 390px the dropdown stays within viewport height and scrolls internally.
- Compare: two saved outfits produce a six-row table. The comparison region scrolls horizontally without widening the document.
- Uploaded background: original PNG retained; WebP reduces 2,739,977 bytes to 1,697,264 bytes. Decoded RGB pixels compare identically. Browser loads the WebP background.
- Build and all 22 existing automated tests pass.

This verifies responsive browser layouts, not physical iOS/Android devices. Safari iOS and Samsung Internet were not available for direct testing. Local `.env` and provider selection are unchanged by this responsive work; no hosted deployment was performed.
