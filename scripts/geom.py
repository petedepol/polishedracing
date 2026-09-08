"""Side-view XC bike geometry drawing → SVG. All inputs in mm / degrees; BB at origin, x forward, y up.
Usage: python3 geom.py --ha 66.5 --sta 75.5 --reach 460 --stack 620 --ht 110 --cs 436 --bbdrop 45 --wb 1180 --offset 45 --wheel 370 [--out file.svg]
"""
import argparse, math, json
p = argparse.ArgumentParser()
for k, d in [('ha', 66.5), ('sta', 75.5), ('reach', 460), ('stack', 620), ('ht', 110), ('cs', 436), ('bbdrop', 45), ('wb', 1180), ('offset', 45), ('wheel', 370), ('st', 440), ('tyre', 61)]:
    p.add_argument('--' + k, type=float, default=d)
p.add_argument('--label', default='SCALPEL · SIZE M')
p.add_argument('--sublabel', default='')
p.add_argument('--out', default='geom.svg')
a = p.parse_args()
r = math.radians
# --- key points (mm, y up) ---
BB = (0.0, 0.0)
RA = (-math.sqrt(a.cs**2 - a.bbdrop**2), a.bbdrop)               # rear axle
HTt = (a.reach, a.stack)                                            # head tube top (centre)
HTb = (HTt[0] + a.ht * math.cos(r(a.ha)), HTt[1] - a.ht * math.sin(r(a.ha)))  # head tube bottom
# steering axis at axle height, then offset perpendicular → front axle
x_axis = HTt[0] + (HTt[1] - a.bbdrop) / math.tan(r(a.ha))
FA = (x_axis + a.offset / math.sin(r(a.ha)), a.bbdrop)
wb_calc = FA[0] - RA[0]
trail = (a.wheel * math.cos(r(a.ha)) - a.offset) / math.sin(r(a.ha))
STt = (-a.st * math.cos(r(a.sta)), a.st * math.sin(r(a.sta)))      # seat tube top
SP = (-(a.st + 230) * math.cos(r(a.sta)), (a.st + 230) * math.sin(r(a.sta)))  # saddle rail point
SSj = (-(a.st - 55) * math.cos(r(a.sta)), (a.st - 55) * math.sin(r(a.sta)))   # seat-stay junction (flex stays join high)
# fork crown (Lefty) sits on the steering axis just below the head tube
crown = (HTb[0] + 28 * math.cos(r(a.ha)), HTb[1] - 28 * math.sin(r(a.ha)))
# --- svg helpers (flip y) ---
W, H = 1400, 900
ox, oy = 600, 560   # BB position on canvas
S = 0.64
def P(pt): return (ox + pt[0] * S, oy - pt[1] * S)
def L(a_, b_, cls='frame', extra=''): 
    (x1, y1), (x2, y2) = P(a_), P(b_); return f'<line class="{cls}" x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" {extra}/>'
def C(c, rad, cls='wheel', extra=''): 
    x, y = P(c); return f'<circle class="{cls}" cx="{x:.1f}" cy="{y:.1f}" r="{rad*S:.1f}" {extra}/>'
def T(pt, s, cls='dim', dx=0, dy=0, anchor='start'):
    x, y = P(pt); return f'<text class="{cls}" x="{x+dx:.1f}" y="{y+dy:.1f}" text-anchor="{anchor}">{s}</text>'
def dim_h(y, x1, x2, label, above=True, key=False):  # horizontal dimension line at height y between x1..x2
    off = 1 if above else -1; dl = 'dimline key' if key else 'dimline'; dc = 'dim key' if key else 'dim'
    return (L((x1, y), (x2, y), dl) + L((x1, y - 12*off), (x1, y + 12*off), dl) + L((x2, y - 12*off), (x2, y + 12*off), dl) + T(((x1 + x2) / 2, y), label, dc, dy=-8 if above else 20, anchor='middle'))
def dim_v(x, y1, y2, label, left=True):
    off = 1 if left else -1
    return (L((x, y1), (x, y2), 'dimline') + L((x - 12*off, y1), (x + 12*off, y1), 'dimline') + L((x - 12*off, y2), (x + 12*off, y2), 'dimline') + T((x, (y1 + y2) / 2), label, 'dim', dx=-8 if left else 8, anchor='end' if left else 'start'))
out = [f'<svg xmlns="http://www.w3.org/2000/svg" class="geometry" viewBox="30 40 {W-60} {H-45}" fill="none" stroke-linecap="round" stroke-linejoin="round" font-family="JetBrains Mono, ui-monospace, monospace" role="img" aria-label="{a.label}: dimensioned side-view geometry drawing of the race bike">',
 '<style>.frame{stroke:#EDEFF2;stroke-width:3}.frame2{stroke:#EDEFF2;stroke-width:2.2}.wheel{stroke:#AEB6BF;stroke-width:1.6}.rim{stroke:#8B93A0;stroke-width:1}.spoke{stroke:#2A2F37;stroke-width:1}.lefty{stroke:#8B93A0;stroke-width:5}.shock{stroke:#3A4049;stroke-width:9}.dimline{stroke:#C6FF2E;stroke-width:1;stroke-dasharray:3 4;opacity:.9}.dim{fill:#C6FF2E;font-size:20px;letter-spacing:.08em}.sub{fill:#8B93A0;font-size:16px;letter-spacing:.06em}.axis{stroke:#767E8B;stroke-width:1;stroke-dasharray:2 5}.ghost{stroke:#3A4049;stroke-width:1}</style>']
# wheels + spokes
for c in (RA, FA):
    out.append(C(c, a.wheel)); out.append(C(c, a.wheel - a.tyre, 'rim')); out.append(C(c, 16, 'wheel'))
    for i in range(16):
        ang = i * math.pi / 8; out.append(L((c[0] + 16 * math.cos(ang), c[1] + 16 * math.sin(ang)), (c[0] + (a.wheel - a.tyre) * math.cos(ang), c[1] + (a.wheel - a.tyre) * math.sin(ang)), 'spoke'))
# frame
out += [L(HTt, HTb, 'frame'), L(HTb, BB, 'frame'), L(HTt, STt, 'frame'), L(BB, STt, 'frame'), L(BB, RA, 'frame2')]
# shock: under the top tube, from a rocker near the seat tube top forward along the top tube
piv = (-(a.st - 70) * math.cos(r(a.sta)), (a.st - 70) * math.sin(r(a.sta)))     # rocker pivot on the seat tube, just under the top tube
rock = (piv[0] + 48, piv[1] - 22)                                                 # rocker front arm → shock eye, slightly below the pivot
tt_mid = (STt[0] + 0.78 * (HTt[0] - STt[0]), STt[1] + 0.78 * (HTt[1] - STt[1]) - 40)   # shock front mount under the top tube, near the head junction
out += [L(RA, piv, 'frame2'), L(piv, rock, 'frame2'), L(rock, tt_mid, 'shock'), L(rock, tt_mid, 'frame2'), C(piv, 6, 'wheel'), C(rock, 5, 'wheel'), C(tt_mid, 5, 'wheel')]
# cassette, rotor, chain
out += [C(RA, 46, 'rim'), C(RA, 34, 'rim'), C(RA, 80, 'ghost'), C(FA, 80, 'ghost')]
out += [L((RA[0], RA[1] + 46), (BB[0], BB[1] + 68), 'ghost'), L((RA[0], RA[1] - 46), (BB[0], BB[1] - 68), 'ghost')]
# seatpost + saddle, bars/stem
out += [L(STt, SP, 'frame2'), L((SP[0] - 120, SP[1] + 14), (SP[0] + 120, SP[1] + 6), 'frame')]
stem_end = (HTt[0] + 65 * math.cos(r(a.ha - 10)), HTt[1] + 65 * math.sin(r(a.ha - 10)) * 0.25 + 12)
out += [L(HTt, stem_end, 'frame2'), L((stem_end[0] - 40, stem_end[1] + 8), (stem_end[0] + 40, stem_end[1] - 8), 'frame')]
# steering axis + Lefty (single leg, behind the wheel from drive side)
out += [L((HTt[0] - 60 * math.cos(r(a.ha)), HTt[1] + 60 * math.sin(r(a.ha))), (x_axis - 40 * math.cos(r(a.ha)), a.bbdrop - 40 * math.sin(r(a.ha))), 'axis')]
leg_top = (crown[0] + a.offset * math.sin(r(a.ha)), crown[1] + a.offset * math.cos(r(a.ha)))
out += [L(crown, leg_top, 'frame2'), L(leg_top, FA, 'lefty'), C(FA, 22, 'wheel')]
# crank + chainring
out += [C(BB, 68, 'wheel'), C(BB, 9, 'wheel'), L(BB, (BB[0] + 172.5 * math.cos(r(-25)), BB[1] + 172.5 * math.sin(r(-25))), 'frame2')]
# dimensions
top = a.stack + 150
out += [dim_h(a.bbdrop - a.wheel - 30, RA[0], FA[0], f'WHEELBASE {wb_calc:.0f}', above=True, key=True),
        dim_h(top - 60, 0, a.reach, f'REACH {a.reach:.0f}', key=True),
        dim_v(a.reach + 260, 0, a.stack, f'STACK {a.stack:.0f}', left=False),
        dim_h(-a.bbdrop - 95, RA[0], 0, f'CHAINSTAY {a.cs:.0f}', above=False),
        dim_v(RA[0] - 90, a.bbdrop, 0, f'BB DROP {a.bbdrop:.0f}', left=True)]
out += [L((0, 0), (0, top - 50), 'axis'), L((a.reach, HTt[1]), (a.reach, top - 50), 'axis'), L((RA[0], a.bbdrop), (RA[0], a.bbdrop - a.wheel - 40), 'axis'), L((FA[0], a.bbdrop), (FA[0], a.bbdrop - a.wheel - 40), 'axis')]
out += [T((HTt[0] + 70, HTt[1] - 20), f'HEAD ANGLE {a.ha:.1f}°', 'dim', anchor='start'), T((HTt[0] + 70, HTt[1] - 20), f'OFFSET {a.offset:.0f} MM · TRAIL {trail:.0f} MM', 'sub', dy=20, anchor='start')]
out += [T((STt[0] - 30, STt[1] + 95), f'SEAT ANGLE {a.sta:.1f}°', 'dim', anchor='end'), T(((RA[0] + FA[0]) / 2, -a.wheel - 78), a.label, 'sub', anchor='middle')]
if a.sublabel: out.append(T(((RA[0] + FA[0]) / 2, -a.wheel - 78), a.sublabel, 'sub', dy=20, anchor='middle'))
out.append('</svg>')
open(a.out, 'w').write('\n'.join(out))
print(json.dumps({'wheelbase_calc': round(wb_calc), 'trail': round(trail, 1), 'front_axle': [round(v) for v in FA], 'rear_axle': [round(v) for v in RA], 'ht_bottom': [round(v) for v in HTb]}))
