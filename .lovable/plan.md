# Add Awards section

## Scope
New dedicated section between Achievements and Skills showcasing the CIO100 2024 Award, with the two uploaded event photos and the provided description.

## Steps

1. **Save uploaded photos** as real image imports (Vercel-safe, following the project's no-`.asset.json` rule):
   - `src/assets/awards/cio100-2024-plaque.jpg` (photo receiving the plaque)
   - `src/assets/awards/cio100-2024-stage.jpg` (photo of the stage with name on screen)

2. **Create `src/components/AwardsSection.tsx`**:
   - `id="awards"` section, matching editorial style (`section-label`, `section-title`, spacing/padding consistent with other sections).
   - Section label: "Recognition" / Title: "Awards & honors".
   - One award card containing:
     - Two-column layout on desktop (photo gallery left, text right); stacked on mobile.
     - Photo side: primary image (plaque) with the stage image as a smaller offset/secondary tile — subtle rounded frame, border, soft shadow, hover lift.
     - Text side: award name "CIO100 Award — 2024", subtitle "19th CIO100 Awards & Symposium · IDG / IDC", organization "Nexus Select Malls", year badge "2024", and the provided description paragraph (lightly edited for portfolio tone; content preserved).
   - GSAP scroll-triggered fade/slide-up entrance consistent with other sections.

3. **Wire into `src/pages/Index.tsx`**: lazy-import `AwardsSection` and render it between `AchievementsSection` and `SkillsSection`.

4. **Add nav item** in `src/components/Navbar.tsx`: `{ label: "Awards", href: "#awards", id: "awards" }` inserted after Achievements. Active-section tracker already handles any id automatically.

5. **Update `public/sitemap.xml`** anchor list only if it enumerates section anchors (verify first; skip if it just lists `/`).

6. Build to confirm the new imports resolve.

## Notes
- No changes to existing sections' content.
- No `.asset.json`; images are bundled by Vite.
- Description text will be lightly polished to first-person portfolio voice but keeps all facts (CIO100 2024, 19th edition, IDG, IDC jury, Nexus Select Malls team, industry connection).
