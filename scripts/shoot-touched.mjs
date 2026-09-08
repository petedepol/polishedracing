import { chromium } from 'playwright';
const [base, out] = [process.argv[2], process.argv[3]];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base, { waitUntil: 'networkidle' });
const h = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 600) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(100); }
await page.waitForTimeout(1200);
const o = page.locator('section.blueprint-grid').first(); await o.scrollIntoViewIfNeeded(); await page.waitForTimeout(1000); await o.screenshot({ path: `${out}/origin2.png` });
for (const i of [6, 11]) { const f = page.locator('.film-frame').nth(i); await f.scrollIntoViewIfNeeded(); await page.waitForTimeout(700); await f.screenshot({ path: `${out}/frame${i}.png` }); }
console.log('done'); await browser.close();
