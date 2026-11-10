#!/usr/bin/env python3
"""Build media/walker/sheet.webp, the single sprite sheet the hero walker runs on.

Run from the repo root:  python3 tools/build-walker-sheet.py   (needs Pillow + numpy)

The drawn side-view frames are all the same wide stride, so on their own he
slides along in a frozen pose. This takes ONE of them and makes a real walk
cycle out of it: the two legs are cut apart at the hips and swung past each
other (one planted, one lifted and carried forward, shoes kept rigid), while
the body rises over the planted leg and sinks into each step. Because every frame shares the
same upper body, the head and torso no longer jitter between frames.

Front and back walks keep two drawn poses each (one per foot), registered to
each other so the head holds still. Everything is laid out in one row of
220x320 cells, which is drawn at exactly 77x112 CSS px (whole pixels, so no
half-pixel shimmer). Left is the right cycle mirrored in CSS.

Cells:  0-5 side walk (one step) · 6-7 front walk · 8-9 back walk
        10 idle-front · 11 idle-back · 12 wave · 13 wave-both
"""
import math, os, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'media', 'walker')
W0, H = 210, 320          # source frame
CW = 220                  # sheet cell width
SIDE_FRAMES = 6           # poses per step
SWING = 55                # px a foot travels either side of the hips
RISE = 6                  # px the body lifts over the planted leg
LIFT = 11                 # px the travelling foot clears the ground


def load(name):
    return Image.open(os.path.join(SRC, name + '.png')).convert('RGBA')


def alpha(im):
    return np.array(im)[:, :, 3] > 40


def affine(im, coeffs, size=None):
    """Affine-resample with premultiplied alpha so edges do not pick up fringes."""
    out = im.convert('RGBa').transform(size or im.size, Image.AFFINE, coeffs, resample=Image.BICUBIC)
    return out.convert('RGBA')


def grow(im, k):
    """The walk frames were drawn ~1.5% smaller than the idles; scale about the feet."""
    cx = im.width / 2
    return affine(im, (1 / k, 0, cx - cx / k, 0, 1 / k, H - H / k))


def cell(im, cx):
    """Drop a 210-wide frame into a 220-wide cell with column cx at the cell centre."""
    out = Image.new('RGBA', (CW, H), (0, 0, 0, 0))
    return affine(im, (1, 0, cx - CW / 2, 0, 1, 0), (CW, H))


def torso_cx(im, y1=130, y2=200):
    a = alpha(im)[y1:y2]
    xs = np.nonzero(a.any(axis=0))[0]
    return (xs[0] + xs[-1]) / 2


def runs(row):
    out, x = [], 0
    while x < len(row):
        if row[x]:
            s = x
            while x < len(row) and row[x]:
                x += 1
            out.append((s, x - 1))
        else:
            x += 1
    return out


def side_cycle(base):
    """One step of walk frames from one stride pose."""
    a = alpha(base)
    # crotch: the first row where the silhouette splits into two wide legs and stays split
    apex = split = None
    for y in range(200, H - 10):
        ok = True
        for yy in range(y, y + 6):
            r = [r for r in runs(a[yy]) if r[1] - r[0] > 18]
            if len(r) != 2:
                ok = False
                break
        if ok:
            r = [r for r in runs(a[y + 2]) if r[1] - r[0] > 18]
            apex, split = y, (r[0][1] + r[1][0]) / 2
            break
    if apex is None:
        sys.exit('could not find the legs in the side frame')
    y0 = apex - 15                      # hip line: legs pivot here, just under the hands
    leg_h = H - y0

    # which leg each pixel below the hip line belongs to
    yy, xx = np.mgrid[0:H, 0:W0]
    split_at = np.full(H, split)
    prev = split
    for y in range(apex, H):
        r = [r for r in runs(a[y]) if r[1] - r[0] > 6]
        gaps = [(r[i][1] + r[i + 1][0]) / 2 for i in range(len(r) - 1)]
        if gaps:
            prev = min(gaps, key=lambda g: abs(g - prev))
        split_at[y] = prev
    arr = np.array(base)
    below = yy >= y0 - 3                # a few rows of overlap hide the seam
    front = below & (xx >= split_at[:, None])
    back = below & (xx < split_at[:, None])

    def layer(mask):
        l = arr.copy()
        l[~mask] = 0
        return Image.fromarray(l, 'RGBA')
    upper = arr.copy()
    upper[yy >= y0] = 0
    upper = Image.fromarray(upper, 'RGBA')

    # Feet stay rigid: below the ankle a leg is carried along, not sheared, so shoes keep their shape.
    ankle = H - 30
    def split_leg(mask):
        return layer(mask & (yy <= ankle + 2)), layer(mask & (yy >= ankle))
    legs = {'front': split_leg(front), 'back': split_leg(back)}

    # One step, SIDE_FRAMES poses: stride -> legs pass -> stride. Both legs are drawn alike, so
    # the next step is the same pictures again: the 'front' cut-out is always whichever leg is
    # ahead and 'back' whichever trails. The leg being carried forward is the lifted one — the
    # trailing leg until they pass, the leading leg after.
    frames = []
    for i in range(SIDE_FRAMES):
        t = i / SIDE_FRAMES                      # 0..1 through the step
        spread = abs(math.cos(math.pi * t))      # 1 = full stride, 0 = legs together
        mid = math.sin(math.pi * t)              # 0 at the strides, 1 as the legs pass
        rise = RISE * mid
        out = Image.new('RGBA', (W0, H), (0, 0, 0, 0))
        carried = 'back' if t < 0.5 else 'front'
        for name in (['front', 'back'] if carried == 'back' else ['back', 'front']):   # carried leg on top
            u0 = 1 if name == 'front' else -1
            shift = (spread - 1) * u0 * SWING
            lift = LIFT * mid if name == carried else 0
            sv = (leg_h + rise - lift) / leg_h
            hip = y0 - rise                      # where the hip line sits in this frame
            shin, foot = legs[name]
            # dest -> source:  ys = y0 + (yd - hip)/sv ;  xs = xd - shift*(ys - y0)/leg_h
            k = shift / leg_h / sv
            out.alpha_composite(affine(shin, (1, -k, k * hip, 0, 1 / sv, y0 - hip / sv)))
            out.alpha_composite(affine(foot, (1, 0, -shift * (ankle - y0) / leg_h, 0, 1 / sv, y0 - hip / sv)))
        out.alpha_composite(affine(upper, (1, 0, 0, 0, 1, rise)))
        frames.append(out)
    return frames


def register(ref, im, rows=(20, 120)):
    """Shift im sideways so its head sits where ref's does."""
    def cx(i):
        a = alpha(i)[rows[0]:rows[1]]
        xs = np.nonzero(a.any(axis=0))[0]
        return (xs[0] + xs[-1]) / 2
    d = cx(im) - cx(ref)
    return affine(im, (1, 0, d, 0, 1, 0))


def main():
    idle_h = alpha(load('idle-front')).any(axis=1).sum()
    walk_h = alpha(load('walk-front-1')).any(axis=1).sum()
    k = idle_h / walk_h

    cells = []
    base = grow(load('walk-right-1'), k)
    a = alpha(base)
    feet = np.nonzero(a[H - 20:].any(axis=0))[0]
    cx_side = (torso_cx(base) + (feet[0] + feet[-1]) / 2) / 2
    cells += [cell(f, cx_side) for f in side_cycle(base)]

    for d in ('front', 'back'):
        a_, b_ = grow(load(f'walk-{d}-1'), k), grow(load(f'walk-{d}-3'), k)
        b_ = register(a_, b_)
        cx = torso_cx(a_)
        cells += [cell(a_, cx), cell(b_, cx)]

    for n in ('idle-front', 'idle-back', 'wave', 'wave-both'):
        im = load(n)
        cells.append(cell(im, torso_cx(load('idle-front' if n != 'idle-back' else n)) if n != 'idle-back' else torso_cx(im)))

    sheet = Image.new('RGBA', (CW * len(cells), H), (0, 0, 0, 0))
    for i, c in enumerate(cells):
        sheet.alpha_composite(c, (i * CW, 0))
    out = os.path.join(SRC, 'sheet.webp')
    sheet.save(out, 'WEBP', quality=92, method=6, exact=False)
    print(f'{len(cells)} cells -> {os.path.relpath(out)}  {sheet.size}  {os.path.getsize(out) // 1024} KB')


if __name__ == '__main__':
    main()
