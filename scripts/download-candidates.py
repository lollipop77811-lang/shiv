#!/usr/bin/env python3
"""Download top candidates per treatment for visual inspection."""
import json, os, urllib.request

OUT = "/home/z/my-project/scripts/imgstage"
os.makedirs(OUT, exist_ok=True)
SRC = "/home/z/my-project/scripts/imgsearch"

ids = ["cataract", "lasik", "glaucoma", "retina", "cornea", "dry-eye", "pediatric", "general"]
for tid in ids:
    d = json.load(open(f"{SRC}/{tid}.json"))
    for i, r in enumerate(d.get("results", [])[:3]):
        url = r["original_url"]
        ext = os.path.splitext(url)[1] or ".jpg"
        dest = f"{OUT}/{tid}-{i}{ext}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as resp, open(dest, "wb") as f:
                f.write(resp.read())
            print(f"{tid}-{i}: OK {os.path.getsize(dest)//1024}KB  <- {r['source']}")
        except Exception as e:
            print(f"{tid}-{i}: FAIL {e}")
