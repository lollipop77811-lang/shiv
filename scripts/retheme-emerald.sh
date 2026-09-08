#!/bin/bash
# Shiv Netralay re-theme #2: Midnight Plum -> Emerald + Cream + Champagne Gold
# 1) Neutralize token family names (plum->brand, orchid->jade, amber->gold)
# 2) Swap hardcoded plum hexes inside component SVG decorations
set -e
cd /home/z/my-project/src

echo "== Token family renames (palette-neutral) =="
grep -rl 'plum-'  . | xargs -r sed -i 's/\bplum-/brand-/g'
grep -rl 'orchid-' . | xargs -r sed -i 's/\borchid-/jade-/g'
grep -rl 'amber-'  . | xargs -r sed -i 's/\bamber-400\b/gold-500/g'

echo "== Hardcoded hex swaps in components (SVG decorations) =="
swap() { grep -rl "$1" . | xargs -r sed -i "s/$1/$2/g"; }
# midnight plum -> forest charcoal
swap '#3B2447' '#123C35'
# orchid-500 -> jade-500
swap '#8A6E96' '#219880'
# lavender accent -> soft emerald accent
swap '#B89BC6' '#35A78F'
# orchid-300 -> jade-300
swap '#C9B1D5' '#7CC5B2'
# faq deco lavender tints -> pale green tints
swap '#E4D9EC' '#D8EEE7'
swap '#D5C2E0' '#BCE1D6'
swap '#EAE1F1' '#E4F3EE'
# selection tint (if any left in tsx)
swap '#DAC8E3' '#C8E8DE'

echo "== Leftover plum/orchid/amber/lavender hex check =="
grep -rniE '#(3B2447|8A6E96|B89BC6|C9B1D5|E4D9EC|D5C2E0|EAE1F1|DAC8E3|9A7DAB|6B5378)' --include='*.tsx' . || echo "none in components"

echo "Done."
