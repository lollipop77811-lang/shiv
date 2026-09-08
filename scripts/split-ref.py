"""Split the tall reference screenshot into viewable chunks."""
from PIL import Image

img = Image.open('/home/z/my-project/upload/7e1f1c5496a07f7416c8659938c8a2f2.webp').convert('RGB')
W, H = img.size
print(f'Reference: {W}x{H}')

n = 8
chunk_h = H // n
for i in range(n):
    y0 = i * chunk_h
    y1 = min(H, (i + 1) * chunk_h + 60)
    c = img.crop((0, y0, W, y1))
    # downscale to width 1000 for viewing
    scale = 1000 / c.width
    c = c.resize((1000, int(c.height * scale)))
    c.save(f'/home/z/my-project/download/shots/ref-part{i+1}.png')
print('saved', n, 'parts')
