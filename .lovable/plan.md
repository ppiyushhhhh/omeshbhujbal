# Remove `.asset.json` dependency for Leela logo

## Scope
Only `src/assets/logos/the-leela.jfif.asset.json` is used via a `.asset.json` import in this project. All other logos (`nexus.jfif`, `vi.jfif`, `ge.jfif`, `mahindra.jfif`, `mahajan.jfif`) are already real image imports.

## Steps

1. Download the binary from the current CDN URL (`/__l5e/assets-v1/6325967b-8cac-48f0-bd21-643732de4010/the-leela.jfif` via the preview host) and save it to `src/assets/logos/the-leela.jfif` as a real file bundled by Vite.

2. Delete `src/assets/logos/the-leela.jfif.asset.json`.

3. Edit `src/components/ExperienceSection.tsx`:
   - Change `import leelaLogo from "@/assets/logos/the-leela.jfif.asset.json";` to `import leelaLogo from "@/assets/logos/the-leela.jfif";`
   - Change `logo: leelaLogo.url` to `logo: leelaLogo`.

4. Repo-wide search for `.asset.json`, `/__l5e/`, and `assets-v1` to confirm no other references remain (grep first, remove any leftovers).

5. Verify `src/assets/logos/` contains only real image files.

6. Run `bun run build` to confirm Vite bundles the new import and the production build succeeds.

7. Report: files modified/created/deleted and grep confirmation of zero remaining `/__l5e/` references.

## Notes
No UI or design changes. Behavior identical — same logo image, just bundled through Vite instead of served from Lovable's CDN, which makes it portable to Vercel.
