import { chromium } from 'playwright';
const [,, svgPath, outPng] = process.argv; const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
const svg = await import('fs').then(fs => fs.readFileSync(svgPath, 'utf8'));
await p.setContent(`<body style="margin:0;background:#0A0B0D">${svg}</body>`); await p.waitForTimeout(300); await p.screenshot({ path: outPng }); await b.close(); console.log('svg shot');
