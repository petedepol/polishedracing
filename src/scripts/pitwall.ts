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
  if (reduced) { title.classList.add('ready'); return; }
  const split = SplitText.create(title, { type: 'lines,words,chars', mask: 'lines', linesClass: 'hero-line' });
  title.classList.add('ready');

  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.hero-eyebrow', { opacity: 0, duration: .4 }, 0)
    .from(split.chars, { yPercent: 110, duration: .9, stagger: 0.02 }, 0.05)
    .from('.hero-copy > *', { opacity: 0, y: 12, duration: .7, stagger: 0.08 }, 0.45)
    .from('.hero-photo', { opacity: 0, scale: 1.04, duration: 1.6, ease: 'power2.out' }, 0)
    .from('.hero-credit', { opacity: 0, duration: .6 }, 1.4);
}

/* ---------- Geometry chart: draws itself in when it scrolls into view ---------- */
/* Fig. 02: a scan line sweeps the photo; the chart geometry appears behind it, numbers tick to value */
const geo = document.querySelector<SVGSVGElement>('.geometry');
if (geo && !reduced) {
  const clip = geo.querySelector<SVGRectElement>('.geo-clip-rect');
  const scan = geo.querySelector<SVGLineElement>('.scan');
  const labels = Array.from(geo.querySelectorAll<SVGTextElement>('text[data-v]'));
  const finals = labels.map((t) => t.textContent ?? '');
  if (clip && scan) {
    const W = geo.viewBox.baseVal.width;
    clip.setAttribute('width', '0');
    const gio = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      gio.disconnect();
      const tl = gsap.timeline();
      tl.set(scan, { opacity: 1 }, 0)
        .to(clip, { attr: { width: W }, duration: 1.7, ease: 'power1.inOut' }, 0)
        .to(scan, { attr: { x1: W, x2: W }, duration: 1.7, ease: 'power1.inOut' }, 0)
        .to(scan, { opacity: 0, duration: .35 }, 1.5);
      labels.forEach((t, i) => {
        const target = Number(t.dataset.v); const prefix = t.dataset.prefix ?? '';
        const dec = finals[i].includes('.') ? 1 : 0; const suffix = finals[i].endsWith('°') ? '°' : '';
        const o = { v: 0 };
        tl.to(o, { v: target, duration: .9, ease: 'power3.out', onUpdate: () => { t.textContent = `${prefix} ${o.v.toFixed(dec)}${suffix}`; }, onComplete: () => { t.textContent = finals[i]; } }, 0.35 + i * 0.07);
      });
    }, { threshold: 0.4 });
    gio.observe(geo);
  }
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
type Flow = HTMLElement & { update: (v: number) => void; transformTiming: EffectTiming; spinTiming?: EffectTiming; format?: Intl.NumberFormatOptions; };
const flows = Array.from(document.querySelectorAll<Flow>('number-flow[data-target]'));
flows.forEach((f) => {
  if (f.closest('#geo-stats')) f.format = { useGrouping: false, maximumFractionDigits: 1 };   // millimetres, not thousands
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


/* ---------- Film strip: mouse wheel goes sideways, drag to scroll, arrow buttons ---------- */
const film = document.querySelector<HTMLElement>('.film');
if (film) {
  film.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;            // trackpad already scrolling sideways
    const max = film.scrollWidth - film.clientWidth;
    const atEnd = e.deltaY > 0 ? film.scrollLeft >= max - 1 : film.scrollLeft <= 1;
    if (atEnd) return;                                              // let the page carry on
    e.preventDefault(); film.scrollLeft += e.deltaY;
  }, { passive: false });
  let drag: { x: number; left: number; moved: boolean } | null = null;
  film.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; drag = { x: e.clientX, left: film.scrollLeft, moved: false }; film.classList.add('is-dragging'); });
  window.addEventListener('pointermove', (e) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 3) drag.moved = true; film.scrollLeft = drag.left - dx; });
  window.addEventListener('pointerup', () => { if (!drag) return; drag = null; film.classList.remove('is-dragging'); });
  const step = () => (film.querySelector<HTMLElement>('.film-frame')?.offsetWidth ?? 400) + 1;
  document.querySelectorAll<HTMLButtonElement>('[data-film-nav]').forEach((b) => b.addEventListener('click', () => film.scrollBy({ left: (b.dataset.filmNav === 'next' ? 1 : -1) * step(), behavior: 'smooth' })));
}

/* ---------- Build sheet: a point on the photo and its row light up together ---------- */
const spots = Array.from(document.querySelectorAll<HTMLElement | SVGElement>('[data-spot]'));
const peersOf = (n: string) => spots.filter((p) => (p as HTMLElement).dataset.spot === n);
const setHot = (n: string, on: boolean) => peersOf(n).forEach((p) => p.classList.toggle('is-hot', on));
spots.forEach((el) => {
  const n = (el as HTMLElement).dataset.spot ?? '';
  el.addEventListener('pointerenter', () => setHot(n, true));
  el.addEventListener('pointerleave', () => setHot(n, false));
  el.addEventListener('click', () => { const on = !el.classList.contains('is-hot'); spots.forEach((p) => p.classList.remove('is-hot')); if (on) setHot(n, true); });
});
const geoStats = document.getElementById('geo-stats');
if (geoStats && !reduced) {
  const sio = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    geoStats.querySelectorAll<Flow>('number-flow[data-target]').forEach((f, i) => setTimeout(() => f.update(Number(f.dataset.target)), 900 + i * 90));
    sio.disconnect();
  }, { threshold: 0.5 });
  sio.observe(geoStats);
}
