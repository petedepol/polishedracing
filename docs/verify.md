# Verify the build

Full-page screenshots (desktop 1440 + mobile 390, with scroll-triggered reveals fired) and a Lighthouse run. Playwright is not a project dependency; install it once globally or in a scratch folder:

```sh
npm i -g playwright && npx playwright install chromium
npm run build
python3 -m http.server 4399 -d dist &
node scripts/shoot.mjs http://localhost:4399/ <label>      # writes ./shots/<label>-{desktop,mobile}.png (+ -fold)
npx -y lighthouse http://localhost:4399/ --preset=desktop --output=json --output-path=lh.json --chrome-flags="--headless=new" --quiet
```

Design detector (Impeccable), run once after UI edits:

```sh
~/.claude/skills/impeccable/scripts/impeccable detect --json src/components/pitwall src/styles/global.css
```

Floor: Lighthouse ≥ 95 in every category, zero console errors, `prefers-reduced-motion` renders the final state without motion.
