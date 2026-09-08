// PIT WALL runtime. Every effect here is optional: delete this file and the page still renders its final state.
import Lenis from 'lenis';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import 'number-flow';

gsap.registerPlugin(SplitText);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const settle = 'cubic-bezier(0.16, 1, 0.3, 1)';

/* ---------- Smooth scroll (Lenis) synced to GSAP's ticker ---------- */
if (!reduced) {
  const lenis = new Lenis({ autoRaf: false, lerp: 0.1, anchors: { offset: -48 } });
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- HUD: session clock + lap bar fallback ---------- */
const clock = document.getElementById('hud-clock');
if (clock) {
  const end = Date.UTC(2026, 11, 31, 23, 59, 59);
  const tick = () => { const d = Math.max(0, Math.ceil((end - Date.now()) / 86400000)); clock.textContent = `T−${d} DAYS · OUT OF CONTRACT 31 DEC 2026`; };
  tick(); setInterval(tick, 60000);
}
if (!CSS.supports('animation-timeline: scroll()')) {
  const bar = document.querySelector<HTMLElement>('.lap-bar');
  const upd = () => { const d = document.documentElement; if (bar) bar.style.transform = `scaleX(${d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight)})`; };
  addEventListener('scroll', upd, { passive: true }); upd();
}

/* ---------- Hero boot: the one authored moment ---------- */
function boot() {
  const title = document.querySelector<HTMLElement>('.hero-title');
  if (!title) return;
  const geo = document.querySelector<SVGElement>('.geometry');
  const strokes = geo ? Array.from(geo.querySelectorAll<SVGGeometryElement>('line, circle')) : [];
  const texts = geo ? Array.from(geo.querySelectorAll('text')) : [];
  if (reduced) { title.classList.add('ready'); return; }

  strokes.forEach((el) => { el.setAttribute('pathLength', '1'); el.style.strokeDasharray = '1'; el.style.strokeDashoffset = '1'; });
  const split = SplitText.create(title, { type: 'lines,words,chars', mask: 'lines', linesClass: 'hero-line' });
  title.classList.add('ready');

  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.hero-eyebrow', { opacity: 0, duration: .4 }, 0)
    .from(split.chars, { yPercent: 110, duration: .9, stagger: 0.02 }, 0.05)
    .from('.hero-copy > *', { opacity: 0, y: 12, duration: .7, stagger: 0.08 }, 0.45)
    .to(strokes, { strokeDashoffset: 0, duration: .8, stagger: 0.011, ease: 'power2.out' }, 0.2)
    .from(texts, { opacity: 0, duration: .5, stagger: 0.03 }, 1.3)
    .from('.hero-scroll', { opacity: 0, duration: .6 }, 1.8);
}
document.fonts.ready.then(boot);

/* ---------- Scroll reveals: feed rows stream in, blocks settle ---------- */
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .feed-row').forEach((el) => io.observe(el));

/* ---------- Instrument cluster: digits tick to value (NumberFlow) ---------- */
type Flow = HTMLElement & { update: (v: number) => void; transformTiming: EffectTiming; spinTiming?: EffectTiming; };
const flows = Array.from(document.querySelectorAll<Flow>('number-flow[data-target]'));
flows.forEach((f) => {
  f.transformTiming = { duration: 900, easing: settle };
  f.spinTiming = { duration: 900, easing: settle };
  f.update(reduced ? Number(f.dataset.target) : 0);
});
const cluster = document.getElementById('cluster');
if (cluster && !reduced) {
  const cio = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    flows.forEach((f, i) => setTimeout(() => f.update(Number(f.dataset.target)), i * 70));
    cio.disconnect();
  }, { threshold: 0.3 });
  cio.observe(cluster);
}

/* ---------- Timing screen: filter the feed like a results board ---------- */
const group = document.querySelector<HTMLElement>('[data-filter-group]');
if (group) {
  const rows = Array.from(document.querySelectorAll<HTMLElement>('#palmares .feed-row'));
  const count = document.getElementById('feed-count');
  group.querySelectorAll<HTMLButtonElement>('button[data-filter]').forEach((btn) => btn.addEventListener('click', () => {
    const f = btn.dataset.filter!;
    group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    let n = 0;
    rows.forEach((row) => {
      const show = f === 'all' || row.dataset.kind === f || row.dataset.disc === f;
      row.hidden = !show; if (show) row.classList.add('is-in');
      if (show && row.tagName === 'TR') n++;
    });
    if (count) count.textContent = String(n);
  }));
}
