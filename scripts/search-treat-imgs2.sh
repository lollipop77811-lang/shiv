#!/bin/bash
# Sequential image search with delays (avoids 429)
set -u
OUT=/home/z/my-project/scripts/imgsearch
mkdir -p "$OUT"

search() {
  local id="$1"; local q="$2"
  if [ -s "$OUT/$id.json" ] && python3 -c "import json;d=json.load(open('$OUT/$id.json'));exit(0 if d.get('success') and d.get('results') else 1)" 2>/dev/null; then
    echo "$id: cached OK"; return 0
  fi
  echo "$id: searching..."
  z-ai image-search -q "$q" --count 4 --gl us --no-rank -o "$OUT/$id.json" >/dev/null 2>&1
  sleep 20
}

search cataract "cataract surgery performed by eye surgeon using operating microscope in hospital operating room"
sleep 15
search retina "retina examination with fundus camera digital eye scan in eye clinic"
sleep 15
search cornea "extreme close up macro photo of human eye iris and cornea"
sleep 15
search dry-eye "eye drops being applied to a patient eye for dry eye treatment"
sleep 15
search pediatric "child having eyes examined by optometrist with equipment"
sleep 15
search general "senior patient having comprehensive eye examination with slit lamp"

for id in cataract lasik glaucoma retina cornea dry-eye pediatric general; do
  ok=$(python3 -c "import json;d=json.load(open('$OUT/$id.json'));print('OK', len(d.get('results',[])))" 2>/dev/null || echo "MISSING")
  echo "$id -> $ok"
done
