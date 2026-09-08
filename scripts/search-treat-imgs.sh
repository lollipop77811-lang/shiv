#!/bin/bash
# Search stock images for the 8 treatment cards (parallel searches)
set -u
OUT=/home/z/my-project/scripts/imgsearch
mkdir -p "$OUT"

declare -A QUERIES=(
  [cataract]="cataract surgery performed by eye surgeon using operating microscope in hospital operating room"
  [lasik]="LASIK laser eye surgery procedure ophthalmologist preparing patient"
  [glaucoma]="eye pressure measurement tonometry glaucoma test at optometrist clinic"
  [retina]="retina examination with fundus camera digital eye scan in eye clinic"
  [cornea]="extreme close up macro photo of human eye iris and cornea"
  [dry-eye]="eye drops being applied to a patient eye for dry eye treatment"
  [pediatric]="child having eyes examined by optometrist with equipment"
  [general]="senior patient having comprehensive eye examination with slit lamp"
)

for id in "${!QUERIES[@]}"; do
  q="${QUERIES[$id]}"
  z-ai image-search -q "$q" --count 4 --gl us --no-rank -o "$OUT/$id.json" &
done
wait
echo "--- done ---"
for id in "${!QUERIES[@]}"; do
  ok=$(python3 -c "import json;d=json.load(open('$OUT/$id.json'));print(d.get('success'), len(d.get('results',[])))" 2>/dev/null || echo "parse-fail")
  echo "$id -> $ok"
done
