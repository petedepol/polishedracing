import { chromium } from 'playwright';
const [base, out] = [process.argv[2], process.argv[3]];
const b = await chromium.launch();
for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const p = await b.newPage({ viewport: vp, deviceScaleFactor: name === 'mobile' ? 2 : 1 });
  await p.goto(base, { waitUntil: 'networkidle' });
  const fig = p.locator('.geometry-fig').first();
  await fig.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  await fig.screenshot({ path: `${out}/geofig-${name}-mid.png` });   // mid-scan
  await p.waitForTimeout(3200);
  await fig.screenshot({ path: `${out}/geofig-${name}.png` });
  if (name === 'desktop') { await fig.hover(); await p.waitForTimeout(900); await fig.screenshot({ path: `${out}/geofig-${name}-hover.png` }); }
  await p.close();
}
await b.close(); console.log('ok');
