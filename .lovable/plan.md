# Complete editorial portfolio

## Scope
Finish the existing editorial redesign without changing portfolio content or contact functionality.

## Implementation
1. Refine the Connect section and footer into a cohesive editorial closing band, using the established warm neutral and burgundy design tokens.
2. Bring the remaining Education section and shared controls into the same restrained editorial style, removing legacy rounded, rotating, and heavy hover treatments.
3. Tighten responsive behavior across the hero, navigation, timelines, impact metrics, recognition gallery/lightbox, leadership domains, education, and contact form.
4. Preserve reduced-motion handling, section anchors, progressive disclosure, award lightbox, and Web3Forms submission behavior.
5. Update stale executive metadata so the page consistently reflects the current Vice President role.
6. Verify the full rendered page on desktop and mobile, including overflow, navigation, expandable experience details, lightbox interaction, form layout, and browser console errors.

## Technical details
- Reuse the existing Tailwind semantic tokens and design-system controls.
- Keep all changes within the current React/Vite structure; no backend or routing changes.
- Use Playwright at fixed desktop and mobile viewports for final visual and interaction checks.
