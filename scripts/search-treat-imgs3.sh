#!/bin/bash
# Sequential image search — stdout captured, JSON extracted, long delays for 429
set -u
OUT=/home/z/my-project/scripts/imgsearch
mkdir -p "$OUT"

search() {
  local id="$1"; local q="$2"
  if [ -s "$OUT/$id.json" ] && python3 -c "import json;d=json.load(open('$OUT/$id.json'));exit(0 if d.get('success') and d.get('results') else 1)" 2>/dev/null; then
    echo "$id: cached OK"; return 0
  fi
  for attempt in 1 2 3; do
    echo "$id: attempt $attempt..."
    z-ai image-search -q "$q" --count 4 --gl us --no-rank > "$OUT/$id.raw.txt" 2>&1
    python3 - "$OUT/$id.raw.txt" "$OUT/$id.json" <<'PYEOF'
import sys, json, re
raw = open(sys.argv[1]).read()
m = re.search(r'^\{.*\}$', raw, re.S | re.M)
if m:
    try:
        d = json.loads(m.group(0))
        if d.get('success') and d.get('results'):
            json.dump(d, open(sys.argv[2], 'w'), indent=2)
            print('  saved OK')
            sys.exit(0)
    except Exception as e:
        pass
sys.exit(1)
PYEOF
    if [ -s "$OUT/$id.json" ]; then break; fi
    echo "  retry in 45s"; sleep 45
  done
  sleep 30
}

search cataract "cataract surgery performed by eye surgeon using operating microscope in hospital operating room"
search retina "retina examination with fundus camera digital eye scan in eye clinic"
search cornea "extreme close up macro photo of human eye iris and cornea"
search dry-eye "eye drops being applied to a patient eye for dry eye treatment"
search pediatric "child having eyes examined by optometrist with equipment"
search general "senior patient having comprehensive eye examination with slit lamp"

echo "--- final status ---"
for id in cataract lasik glaucoma retina cornea dry-eye pediatric general; do
  ok=$(python3 -c "import json;d=json.load(open('$OUT/$id.json'));print('OK', len(d.get('results',[])))" 2>/dev/null || echo "MISSING")
  echo "$id -> $ok"
done
