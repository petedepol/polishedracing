"""Intake: convert HEIC/JPG from a source folder into oriented 1000px JPEG previews + a JSON manifest (dimensions, orientation, EXIF date).
Usage: python3 photo-intake.py <src_dir> <out_dir>
"""
import sys, os, json, subprocess, glob
src, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
files = sorted([f for f in glob.glob(os.path.join(src, '*')) if f.lower().endswith(('.heic', '.jpg', '.jpeg', '.png'))])
manifest = []
for f in files:
    base = os.path.splitext(os.path.basename(f))[0]
    dst = os.path.join(out, base + '.jpg')
    # sips honours EXIF orientation when writing JPEG only if we ask it to rotate by the stored orientation; simplest robust path: convert, then read orientation and rotate.
    subprocess.run(['sips', '-s', 'format', 'jpeg', '-Z', '1000', f, '--out', dst], capture_output=True)
    props = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', '-g', 'orientation', '-g', 'creation', f], capture_output=True, text=True).stdout
    info = {k.strip(): v.strip() for k, v in (l.split(':', 1) for l in props.splitlines()[1:] if ':' in l)}
    try:
        from PIL import Image, ImageOps
        im = Image.open(dst); im2 = ImageOps.exif_transpose(im)
        if im2 is not None and im2.size != im.size: im2.save(dst, quality=88)
    except Exception: pass
    manifest.append({'file': os.path.basename(f), 'preview': os.path.basename(dst), **info})
json.dump(manifest, open(os.path.join(out, 'manifest.json'), 'w'), indent=1)
print(f'{len(manifest)} previews → {out}')
