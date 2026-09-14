#!/usr/bin/env python3
"""Chroma-key the green plate into a transparent cutout of the exam scene.

Pipeline (matching the proven approach from the original build):
1. border-connected two-tier green flood fill (strong green + weak-green
   shadowed green) so enclosed dark pockets are handled without eating
   dark device parts
2. Gaussian-feathered alpha for soft edges
3. green despill on surviving pixels (kill green fringe)
4. trim transparent margins
Input : public/images/hero-exam-green.png
Output: public/images/hero-exam-people.png
"""
import numpy as np
from PIL import Image, ImageFilter

SRC = "/home/z/my-project/public/images/hero-exam-green.png"
OUT = "/home/z/my-project/public/images/hero-exam-people.png"


def green_distance(arr: np.ndarray) -> np.ndarray:
    """How 'green' each pixel is: G minus the max of R and B."""
    r, g, b = arr[..., 0].astype(int), arr[..., 1].astype(int), arr[..., 2].astype(int)
    return g - np.maximum(r, b)


def flood_from_border(mask: np.ndarray) -> np.ndarray:
    """Keep only green-mask pixels connected to the image border (BFS)."""
    from collections import deque

    h, w = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if mask[y, x] and not seen[y, x]:
                seen[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if mask[y, x] and not seen[y, x]:
                seen[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True
                q.append((ny, nx))
    return seen


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    arr = np.asarray(img)
    gd = green_distance(arr)

    # two tiers: solid green background, then weaker (shadowed/spill) green
    strong = gd > 40
    weak = (gd > 14) & ~strong
    bg_candidate = strong | weak

    # keep only background connected to the border — protects green-ish
    # reflections INSIDE the device/people from being erased
    bg = flood_from_border(bg_candidate)

    alpha = np.full(arr.shape[:2], 255, dtype=np.uint8)
    alpha[bg] = 0

    # feather the cutout edge slightly
    a_img = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1.1))
    alpha = np.array(a_img)  # copy — filtered result is read-only
    alpha[bg & (alpha < 40)] = 0  # re-harden deep background

    out = np.dstack([arr, alpha]).astype(np.int16)

    # despill: where green dominates, cap G at the R/B ceiling
    r, g, b = out[..., 0], out[..., 1], out[..., 2]
    spill = (g > ((r + b) // 2)) & (alpha > 0)
    out[..., 1] = np.where(spill, (r + b) // 2, g)

    Image.fromarray(out.astype(np.uint8), "RGBA").save(OUT)

    # trim fully transparent margins
    img2 = Image.open(OUT)
    bbox = img2.getbbox()
    if bbox:
        img2 = img2.crop(bbox)
    img2.save(OUT)
    print("cutout written:", OUT, img2.size)


if __name__ == "__main__":
    main()
