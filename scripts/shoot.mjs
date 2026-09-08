import { chromium } from 'playwright';
const [,, url, label] = process.argv;
const browser = await chromium.launch();
const out = new URL('./shots/', import.meta.url).pathname;
for (const [name, vp] of Object.entries({ desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } })) {
  const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += Math.round(vp.height * 0.6)) { await page.evaluate(y => window.scrollTo(0, y), y); await page.waitForTimeout(160); }
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}${label}-${name}.png`, fullPage: true });
  // hero-only crop at first viewport
  await page.screenshot({ path: `${out}${label}-${name}-fold.png`, fullPage: false });
  console.log(`${label}-${name}: height ${h}px, console errors: ${errors.length}${errors.length ? '\n  ' + errors.join('\n  ') : ''}`);
  await page.close();
}
await browser.close();
