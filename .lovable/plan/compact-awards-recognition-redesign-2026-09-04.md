# Compact Awards & Recognition Redesign

## Scope
- Modify only the existing Awards / Recognition component.
- Preserve the current site theme, typography, colors, assets, and surrounding sections.

## Implementation
- Replace the oversized split-screen treatment with a compact section header and responsive award grid: one column on mobile, two on tablet, and three on desktop when more awards are added.
- Define a reusable award data model and card component. Seed it with the single CIO100 Award 2024 and its two existing photographs.
- Show the main cover image, title, year, organization, concise description, and accurate “2 Photos” count.
- Replace the current single-image lightbox with an award-scoped gallery modal containing award details, image counter, previous/next controls, close control, Escape and arrow-key support, body scroll locking, and touch swipe navigation.
- Keep animations subtle and disable them when reduced motion is preferred.

## Verification
- Check 1440px, 1024px, 768px, and 390px layouts for overflow, spacing, and image loading.
- Verify card opening, previous/next navigation, keyboard navigation, swipe behavior, backdrop/close controls, and background scroll locking.
