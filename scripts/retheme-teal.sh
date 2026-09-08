#!/usr/bin/env bash
# retheme-teal.sh — swap leftover emerald-era hardcoded hexes in components
# to the new Teal + Cream + Gold palette values. Idempotent: re-running
# finds nothing and exits 0. (globals.css is value-driven and handled separately.)
set -euo pipefail
cd "$(dirname "$0")/.."

FILES=$(grep -rlE '#(123C35|219880|35A78F|7CC5B2|BCE1D6|D8EEE7|E4F3EE|087A68|D6A84F)' src --include='*.tsx' --include='*.ts' || true)

if [ -z "${FILES}" ]; then
  echo "No hardcoded old-palette hexes found — nothing to do."
  exit 0
fi

echo "$FILES" | xargs -r sed -i \
  -e 's/#123C35/#163B3D/g' \
  -e 's/#219880/#1E9E9E/g' \
  -e 's/#35A78F/#35B8A6/g' \
  -e 's/#7CC5B2/#7BD0C4/g' \
  -e 's/#BCE1D6/#B7E6DD/g' \
  -e 's/#D8EEE7/#D9F2EC/g' \
  -e 's/#E4F3EE/#E6F5F0/g' \
  -e 's/#087A68/#087F8C/g' \
  -e 's/#D6A84F/#F4B942/g'

echo "Swapped old hexes to teal palette in:"
echo "$FILES"
