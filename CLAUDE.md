# polishedracing — Pete Michaliszyn's hire-me site

Single-page Astro 7 + Tailwind 4 static site. Design world = **PIT WALL** (F1 pit-wall telemetry). Read `PRODUCT.md` (truth) and `DESIGN.md` (visual system) before touching UI.

## Rules
- **Facts are frozen to the CV.** Numbers, riders, results and roles mirror `Petebot/projects/cv/cv-pete-michaliszyn-2026-general.pdf`. Change both or neither. Counting rule: UCI World Cup rounds only, top-5 through 2024, top-3 from 2025.
- **No fabrication:** no testimonials, no stock/AI imagery, no unverifiable claims. Evie Richards is not listed. Pidcock = Tokyo / British Cycling only.
- **Design skills:** follow `DESIGN.md` and the official `frontend-design` skill. Ignore other frontend "taste" skills for this repo; they contradict the committed world. Use `impeccable` (`detect`, `audit`, `polish`) and `review-animations` as review gates, not as direction.
- **Motion:** one authored load moment (hero boot). Everything else settles. Every animation wrapped in `prefers-reduced-motion` and deletable in five minutes.
- **Performance floor:** Lighthouse ≥ 95 all categories, < 100 KB JS, zero console errors.

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- Screenshots + Lighthouse: see `docs/verify.md`
- Deploy: Vercel (`vercel deploy` preview, `vercel deploy --prod` production). Domain: polishedracing.co.uk.

## Layout of the code
- `src/data/*.ts` — all content (stats, palmarès, career, riders, site config). Edit facts here only.
- `src/components/pitwall/*.astro` — one component per section, in page order in `src/pages/index.astro`.
- `src/styles/global.css` — Tailwind 4 `@theme` tokens + the few component classes.
- `src/scripts/pitwall.ts` — Lenis, GSAP boot sequence, NumberFlow, feed reveals, HUD clock, timing filters.
- `public/build-sheet-pete-michaliszyn.pdf` — the CV PDF served on the site.

## Git
Feature branches (`feature/`, `fix/`, `chore/`), conventional commits, never commit to main directly.

## Fig. 02 geometry overlay
`scripts/geom-photo.py` draws the manufacturer's chart over a real side-on photo using only the two axle pixel positions (scale = wheelbase). Regenerate with the command in `projects/cv/photos/README.md` (Petebot) if the photo or size changes; `src/assets/scalpel-photo-overlay.svg` is generated, do not hand-edit. `scripts/geom.py` is the old schematic drawing, kept for reference.
