// Contact sheet: grid of previews (embedded as data URIs so no file:// restrictions) → PNG per 20.
import { chromium } from 'playwright'; import fs from 'fs'; import path from 'path';
const [,, dir, outPrefix, perArg] = process.argv; const per = Number(perArg || 20);
const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f)).sort();
const b = await chromium.launch();
for (let i = 0; i < files.length; i += per) {
  const chunk = files.slice(i, i + per);
  const cells = chunk.map((f, j) => { const b64 = fs.readFileSync(path.join(dir, f)).toString('base64'); return `<figure><img src="data:image/jpeg;base64,${b64}"><figcaption>${i + j + 1}. ${f}</figcaption></figure>`; }).join('');
  const html = `<style>body{margin:0;background:#111;color:#eee;font:13px monospace}main{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;padding:8px}figure{margin:0;background:#1a1a1a}img{width:100%;height:240px;object-fit:cover;display:block}figcaption{padding:5px 6px}</style><main>${cells}</main>`;
  const p = await b.newPage({ viewport: { width: 1600, height: 100 + Math.ceil(chunk.length / 5) * 275 } });
  await p.setContent(html); await p.waitForTimeout(500);
  await p.screenshot({ path: `${outPrefix}-${String(i / per + 1).padStart(2, '0')}.png`, fullPage: true }); await p.close();
}
await b.close(); console.log(`${files.length} files → ${Math.ceil(files.length / per)} sheet(s)`);
