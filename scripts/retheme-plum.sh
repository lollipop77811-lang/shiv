#!/bin/bash
# Shiv Netralay re-theme: Navy/Azure -> Midnight Plum / Orchid / Ivory
# Renames token families and swaps hardcoded blue hexes in SVG decorations.
set -e
cd /home/z/my-project/src

echo "== Token family renames =="
# navy-*  -> plum-*   (deep brand)
grep -rl 'navy-' . | xargs -r sed -i 's/\bnavy-/plum-/g'
# azure-* -> orchid-* (soft plum -> lavender ramp)
grep -rl 'azure-' . | xargs -r sed -i 's/\bazure-/orchid-/g'
# ice-*   -> ivory-*  (light tint)  \b prevents "service-" -> "servory-" corruption
grep -rl '\bice-' . | xargs -r sed -i 's/\bice-/ivory-/g'

echo "== Hardcoded hex swaps in components =="
swap() { # $1 old hex  $2 new hex
  grep -rl "$1" . | xargs -r sed -i "s/$1/$2/g"
}
# deep navy -> midnight plum
swap '#0a2540' '#3B2447'
# azure-500 -> orchid-500
swap '#2e97d8' '#8A6E96'
# azure-400 -> orchid-400 (lavender)
swap '#55aee2' '#B89BC6'
# azure-300 -> orchid-300
swap '#8cc8ec' '#C9B1D5'
# faq deco light blues -> lavender tints
swap '#cfe6f2' '#E4D9EC'
swap '#bcd8ea' '#D5C2E0'
swap '#d9ebf5' '#EAE1F1'

echo "== Remaining blue-ish hexes check (excluding globals.css) =="
grep -rn '#[0-9a-fA-F]\{6\}' --include='*.tsx' . | grep -viE '#(3B2447|8A6E96|B89BC6|C9B1D5|E4D9EC|D5C2E0|EAE1F1)' || echo "none found"

echo "== rgba() scan in components =="
grep -rn 'rgba(' --include='*.tsx' . | head -20 || true

echo "== Warm ink swap (cool slate -> plum-tinted ink) =="
sed -i 's/\bslate-600\b/ink-600/g; s/\bslate-500\b/ink-500/g; s/\bslate-400\b/ink-400/g' $(grep -rl 'slate-' .) || true
grep -rn 'slate-' --include='*.tsx' . || echo "no slate left"

echo "Done."
