"""Geometry overlay for a real side-on bike photograph.

Every frame point is DERIVED from the manufacturer's chart (mm / degrees) and only two measured
pixel positions: the rear and front axle centres in the photo. The wheelbase computed from the chart
sets the px/mm scale, so if the lines land on the real frame the chart and the photo agree.

Usage: python3 scripts/geom-photo.py --img-w 2048 --img-h 1366 --ra 512,882 --fa 1502,882 --wheel-r 309 \
         --ha 66.6 --sta 75.5 --reach 450 --stack 595 --ht 90 --cs 438 --bbdrop 42 --offset 45 --wheel 370 \
         --out src/assets/scalpel-photo-overlay.svg [--test-html /tmp/test.html --test-img /path/photo.jpg]
"""
import argparse, base64, math, pathlib

p = argparse.ArgumentParser()
for k, d in [('ha', 66.6), ('sta', 75.5), ('reach', 450), ('stack', 595), ('ht', 90), ('cs', 438), ('bbdrop', 42), ('offset', 45), ('wheel', 370), ('st', 440)]:
    p.add_argument('--' + k, type=float, default=d)
p.add_argument('--img-w', type=int, default=2048); p.add_argument('--img-h', type=int, default=1366)
p.add_argument('--ra', default='512,882'); p.add_argument('--fa', default='1502,882'); p.add_argument('--wheel-r', type=float, default=309)
p.add_argument('--label', default='CANNONDALE SCALPEL · SIZE M · 120/120 MM')
p.add_argument('--out', default='src/assets/scalpel-photo-overlay.svg')
p.add_argument('--test-html', default=''); p.add_argument('--test-img', default='')
a = p.parse_args()
r = math.radians
RA = tuple(float(v) for v in a.ra.split(',')); FA = tuple(float(v) for v in a.fa.split(','))
W, H = a.img_w, a.img_h

# --- chart geometry in mm (BB origin, x forward, y UP) ---
ra_mm = (-math.sqrt(a.cs**2 - a.bbdrop**2), a.bbdrop)
htt_mm = (a.reach, a.stack)
x_axis = htt_mm[0] + (htt_mm[1] - a.bbdrop) / math.tan(r(a.ha))
fa_mm = (x_axis + a.offset / math.sin(r(a.ha)), a.bbdrop)
wb_mm = fa_mm[0] - ra_mm[0]
trail_mm = (a.wheel * math.cos(r(a.ha)) - a.offset) / math.sin(r(a.ha))

# --- map mm → photo px using the two axles ---
s = (FA[0] - RA[0]) / wb_mm                       # px per mm
tilt = math.atan2(FA[1] - RA[1], FA[0] - RA[0])   # photo not perfectly level? rotate everything with the axle line
def P(mm):
    """mm point (BB origin, y up) → photo px (y down), rotated by the axle tilt."""
    dx, dy = (mm[0] - ra_mm[0]) * s, -(mm[1] - ra_mm[1]) * s
    return (RA[0] + dx * math.cos(tilt) - dy * math.sin(tilt), RA[1] + dx * math.sin(tilt) + dy * math.cos(tilt))

BB = P((0, 0)); HTt = P(htt_mm); FAp = P(fa_mm)
HTb = P((htt_mm[0] + a.ht * math.cos(r(a.ha)), htt_mm[1] - a.ht * math.sin(r(a.ha))))
ground_mm = a.bbdrop - a.wheel
GR = P((ra_mm[0], ground_mm)); GF = P((fa_mm[0], ground_mm))
axis_top = P((htt_mm[0] - 150 * math.cos(r(a.ha)), htt_mm[1] + 150 * math.sin(r(a.ha))))
axis_ground_x = htt_mm[0] + (htt_mm[1] - ground_mm) / math.tan(r(a.ha))
AG = P((axis_ground_x, ground_mm))
STt = P((-(a.st + 230) * math.cos(r(a.sta)), (a.st + 230) * math.sin(r(a.sta))))

def f(v): return f'{v:.1f}'
def line(p1, p2, cls, extra=''): return f'<line class="{cls}" x1="{f(p1[0])}" y1="{f(p1[1])}" x2="{f(p2[0])}" y2="{f(p2[1])}"{extra}/>'
def circ(c, rad, cls): return f'<circle class="{cls}" cx="{f(c[0])}" cy="{f(c[1])}" r="{rad}"/>'
def text(pt, s_, cls='dim', anchor='middle', dx=0, dy=0, value=None, prefix=''):
    dv = f' data-v="{value}" data-prefix="{prefix}"' if value is not None else ''
    return f'<text class="{cls}" x="{f(pt[0]+dx)}" y="{f(pt[1]+dy)}" text-anchor="{anchor}"{dv}>{s_}</text>'
def tick(pt, n, cls='dimline', L=14):   # short tick perpendicular to unit normal n
    return line((pt[0] - n[0]*L, pt[1] - n[1]*L), (pt[0] + n[0]*L, pt[1] + n[1]*L), cls)
def dim_between(p1, p2, offset_vec, label, value, prefix, key=False, label_side=1, guides=True):
    """dimension parallel to p1→p2, displaced by offset_vec (px); ticks at both ends; guides from the points."""
    q1 = (p1[0] + offset_vec[0], p1[1] + offset_vec[1]); q2 = (p2[0] + offset_vec[0], p2[1] + offset_vec[1])
    d = (q2[0] - q1[0], q2[1] - q1[1]); L = math.hypot(*d); u = (d[0]/L, d[1]/L); n = (-u[1], u[0])
    on = math.hypot(*offset_vec); nv = (offset_vec[0]/on, offset_vec[1]/on)
    cls_l = 'dimline key' if key else 'dimline'; cls_t = 'dim key' if key else 'dim'
    out = [line(q1, q2, cls_l), tick(q1, n, cls_l), tick(q2, n, cls_l)]
    if guides: out += [line(p1, (q1[0] + nv[0]*22, q1[1] + nv[1]*22), 'guide'), line(p2, (q2[0] + nv[0]*22, q2[1] + nv[1]*22), 'guide')]
    mid = ((q1[0] + q2[0]) / 2 + nv[0] * 34 * label_side, (q1[1] + q2[1]) / 2 + nv[1] * 34 * label_side)
    if abs(u[0]) > 0.7: anchor, dy = 'middle', (12 if nv[1] > 0 else 0)
    else: anchor, dy = ('end' if nv[0] < 0 else 'start'), 12
    out.append(text(mid, f'{prefix} {value:.0f}', cls_t, anchor=anchor, dy=dy, value=int(round(value)), prefix=prefix))
    return ''.join(out)

o = []
o.append(f'<svg xmlns="http://www.w3.org/2000/svg" class="geometry" viewBox="0 0 {W} {H}" fill="none" stroke-linecap="round" stroke-linejoin="round" font-family="JetBrains Mono, ui-monospace, monospace" role="img" aria-label="{a.label}: geometry dimensions drawn over a side-on photograph of the race bike">')
o.append('<defs><clipPath id="geo-clip"><rect class="geo-clip-rect" x="0" y="0" width="%d" height="%d"/></clipPath></defs>' % (W, H))
o.append('<g class="geo" clip-path="url(#geo-clip)">')
# ground + steering axis
o.append(line((GR[0] - 120, GR[1]), (GF[0] + 160, GF[1]), 'guide'))
o.append(line(axis_top, AG, 'axis'))
# frame skeleton: dashed chart lines on the real frame
o.append(line(HTt, HTb, 'skel')); o.append(line(HTb, BB, 'skel')); o.append(line(BB, RA, 'skel')); o.append(line(BB, STt, 'skel')); o.append(line(STt, HTt, 'skel'))
# dims
o.append(dim_between(GR, GF, (0, 62), 'WHEELBASE', wb_mm, 'WHEELBASE', key=True, label_side=1))
o.append(dim_between(BB, (HTt[0], BB[1]), (0, -(BB[1] - HTt[1]) - 120), 'REACH', a.reach, 'REACH', key=True, label_side=-1))
o.append(dim_between((HTt[0], BB[1]), HTt, (150, 0), 'STACK', a.stack, 'STACK', label_side=1))
d = (BB[0] - RA[0], BB[1] - RA[1]); L = math.hypot(*d); n = (-d[1]/L, d[0]/L)
if n[1] < 0: n = (-n[0], -n[1])
o.append(dim_between(RA, BB, (n[0]*70, n[1]*70), 'CHAINSTAY', a.cs, 'CHAINSTAY', label_side=1))
o.append(dim_between(RA, (RA[0], BB[1]), (-170, 0), 'BB DROP', a.bbdrop, 'BB DROP', label_side=-1))
# trail: ticks at axis/ground and contact patch
o.append(tick(AG, (0, 1), 'dimline', 12)); o.append(tick(GF, (0, 1), 'dimline', 12)); o.append(line(AG, GF, 'dimline'))
o.append(text((GF[0] + 40, GF[1] + 62), f'TRAIL {trail_mm:.0f}', 'dim', anchor='start', dy=12, value=int(round(trail_mm)), prefix='TRAIL'))
# head angle arc + labels
arc_r = 120
ax1 = (AG[0] - arc_r, AG[1]); ang = r(a.ha)
ax2 = (AG[0] - arc_r * math.cos(ang), AG[1] - arc_r * math.sin(ang))
o.append(f'<path class="dimline key" d="M {f(ax1[0])} {f(ax1[1])} A {arc_r} {arc_r} 0 0 1 {f(ax2[0])} {f(ax2[1])}"/>')
o.append(text((HTt[0] + 60, HTt[1] - 150), f'HEAD ANGLE {a.ha:.1f}°', 'dim key ha', anchor='start', value=a.ha, prefix='HEAD ANGLE'))
o.append(text((HTt[0] + 60, HTt[1] - 150), f'OFFSET {a.offset:.0f} MM · SEAT ANGLE {a.sta:.1f}°', 'sub', anchor='start', dy=40))
# key points
for c in (RA, FAp, BB, HTt):
    o.append(circ(c, 18, 'ring')); o.append(circ(c, 6, 'dot'))
o.append('</g>')
o.append(f'<line class="scan" x1="0" y1="0" x2="0" y2="{H}"/>')
o.append('</svg>')
svg = '\n'.join(o)
pathlib.Path(a.out).write_text(svg)
print(f'wrote {a.out}: scale {s:.4f} px/mm · wheelbase {wb_mm:.0f} mm · trail {trail_mm:.0f} mm · tilt {math.degrees(tilt):.2f}° · BB {BB[0]:.0f},{BB[1]:.0f} · HTt {HTt[0]:.0f},{HTt[1]:.0f} · FA(chart) {FAp[0]:.0f},{FAp[1]:.0f}')

if a.test_html:
    b64 = base64.b64encode(pathlib.Path(a.test_img).read_bytes()).decode()
    css = '''.geometry{position:absolute;inset:0;width:100%;height:100%}.dimline{stroke:#C6FF2E;stroke-width:2;stroke-dasharray:6 8;opacity:.95}.guide{stroke:#C6FF2E;stroke-width:1.2;opacity:.45}.axis{stroke:#C6FF2E;stroke-width:1.5;stroke-dasharray:4 10;opacity:.8}.skel{stroke:#EDEFF2;stroke-width:2;stroke-dasharray:3 9;opacity:.6}.ring{stroke:#C6FF2E;stroke-width:2}.dot{fill:#C6FF2E}.dim{fill:#C6FF2E;font-size:34px;letter-spacing:.08em;paint-order:stroke;stroke:#0A0B0D;stroke-width:10;stroke-linejoin:round}.sub{fill:#AEB6BF;font-size:26px;letter-spacing:.06em;paint-order:stroke;stroke:#0A0B0D;stroke-width:8}.scan{display:none}'''
    html = f'<meta charset="utf-8"><style>body{{margin:0;background:#0A0B0D}}.wrap{{position:relative;width:1400px}}.wrap img{{display:block;width:100%;height:auto;filter:grayscale(.75) contrast(1.05) brightness(.7)}}{css}</style><div class="wrap"><img src="data:image/jpeg;base64,{b64}">{svg}</div>'
    pathlib.Path(a.test_html).write_text(html); print('test html written')
