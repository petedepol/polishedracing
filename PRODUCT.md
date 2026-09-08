# Product

<!-- impeccable:product-schema 1 -->

<!-- Written 8 Sep 2026 from the approved design brief (Petebot/projects/cv/portfolio-site-design-brief.md, 23 Jun 2026), the content master, and CV v2 (31 Aug 2026). Pete asked for the work to proceed unattended; facts marked [inferred] were not confirmed in an interview. -->

## Platform

web

## Users

- **Primary:** World Cup MTB team principals, team managers and brand/sponsor marketing leads deciding a 2027 head-mechanic hire. They read timing screens and build sheets daily, open the link on a phone in a paddock or on a laptop between meetings, and decide in under a minute whether to reply.
- **Secondary:** riders and agents recommending a mechanic; industry contacts (Fox, Schwalbe, Cannondale, Shimano) checking who Pete is. [inferred]

## Product Purpose

A single-page hire-me site for Piotr "Polish Pete" Michaliszyn, World Cup MTB head mechanic. It exists because Cannondale Factory Racing's current structure ends after 2026 and Pete is out of contract on 31 Dec 2026. Success = a team boss replies (email/WhatsApp) or downloads the CV PDF. It replaces the old Polished Racing suspension-service site at the same domain.

## Positioning

Pete is the mechanic who builds the systems a race programme runs on: per-venue setup database, BYB suspension telemetry, tyre/pressure testing against power data, race-day planning software the whole team uses. The site itself is that claim made visible — a data-first, F1-pitwall rendering of a verified palmarès. Two Olympic gold campaigns, fourteen elite Worlds medals, 126 World Cup top finishes, twenty seasons, and four elite Worlds medals in one week in 2026 from the squad he runs. No other mechanic in the paddock can truthfully show that page.

## Operating Context

- Read cold from a WhatsApp/email link during the Sept–Dec 2026 hiring window; also sent alongside `cv-pete-michaliszyn-2026-general.pdf`.
- Deployed as a static Astro site (Vercel) at polishedracing.co.uk; source at github.com/petedepol/polishedracing.
- Content is maintained by Pete with Claude Code. Numbers must stay in lock-step with the CV in `Petebot/projects/cv/`.

## Capabilities and Constraints

- One page: hero → headline numbers → palmarès timing screen → Olympic golds → career timeline → marquee moments → rider roll-call → craft → rider development → origin → credentials → contact. Plus a 404.
- Static, no backend, no forms: contact is mailto + WhatsApp number + PDF download + LinkedIn.
- **Counting rule (non-negotiable):** WC tallies = UCI World Cup rounds only; top-5 through 2024, top-3 from 2025; every result verifiable against UCI / Roots & Rain records. Results belong to the riders; Pete's role is stated per row.
- **Truth rules:** no invented testimonials, no unverifiable claims, Evie Richards is not listed (no official relationship), Tom Pidcock = Tokyo/British Cycling only, CFR data and setups stay private.
- No photo or video assets exist yet (`public/images`, `public/videos` empty). The site must ship at full strength without them; photo frames are gated behind real assets.
- Performance floor: Lighthouse ≥ 95 all categories, < 100 KB JS, `prefers-reduced-motion` honoured, every animation deletable without breaking the page.

## Brand Commitments

- Name: Pete Michaliszyn — "Polish Pete" (real paddock nickname, used across MTB media). Trading name: Polished Racing.
- Voice: direct, honest, straight to the point; Pete is known for being honest sometimes to a fault. Professional, not stuffy. No emojis. Facts over adjectives.
- Visual lineage binding by Pete's choice: the site continues the design language of his own tools (Kenta Calculator, Race Day dashboard, career-stats infographic): dark canvas, mono data type, status colours used as status.

## Evidence on Hand

- Verified palmarès: `Petebot/projects/cv/rider-results-tally-2011-2026.md`, `achievements-verified-expanded.md`.
- CV v2 PDF (31 Aug 2026): `public/build-sheet-pete-michaliszyn.pdf` (copy of `cv-pete-michaliszyn-2026-general.pdf`).
- 2026 season facts: Val di Sole Worlds (Aldridge silver XCO + XCC, Punchard bronze XCO, Martin bronze XCC), Martin WC wins Lenzerheide + La Thuile (+1:07), overall lead into the final rounds.
- Absent, do not fabricate: photos, video, testimonials, press quotes, sponsor logos as endorsements.

## Product Principles

1. Verified beats impressive: every number traceable, counting rule visible on the page.
2. Boss-legible in five seconds: the palmarès reads like a results board they already trust.
3. Ships beautifully with zero photos, by design; real assets slot in later without changing the system.
4. The build is the proof: fast, accessible, hand-finished — "the mechanic who builds his own tools."
5. Deletable motion: any effect can be removed in five minutes at 11pm before a boss opens the link.

## Accessibility & Inclusion

Real `<table>` for the palmarès, keyboard-operable controls, visible focus, contrast ≥ 4.5:1 for text, reduced-motion respected, no accessibility overlays.
