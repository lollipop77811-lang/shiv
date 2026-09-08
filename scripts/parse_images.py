import json, re, os

os.makedirs('/home/z/my-project/public/images', exist_ok=True)
OUT = {}

for name in ['img-hero', 'img-doctors', 'img-tech', 'img-clinic', 'img-surgery']:
    path = f'/home/z/my-project/scripts/{name}.json'
    raw = open(path, encoding='utf-8').read()
    # strip CLI log lines before first {
    start = raw.find('{')
    data = json.loads(raw[start:])
    results = data.get('results', [])
    OUT[name] = results
    print(f'== {name}: success={data.get("success")} count={len(results)}')
    for i, r in enumerate(results):
        print(f'  [{i}] {r["original_url"]} ({r.get("original_width")}x{r.get("original_height")}) {r.get("source","")}')

json.dump(OUT, open('/home/z/my-project/scripts/images-index.json', 'w'), indent=1)
