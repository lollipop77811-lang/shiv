"""Crop key regions of the reference design for close visual inspection."""
from PIL import Image

img = Image.open('/home/z/my-project/download/shots/ref-golf-design.png').convert('RGB')
S = 1600 / 880.0

def crop(x0, y0, x1, y1, name, scale=1.0):
    X0, Y0, X1, Y1 = [int(v * S) for v in (x0, y0, x1, y1)]
    c = img.crop((X0, Y0, X1, Y1))
    if scale != 1.0:
        c = c.resize((int(c.width * scale), int(c.height * scale)))
    c.save(f'/home/z/my-project/download/shots/ref-{name}.png')
    print(name, c.size)

crop(20, 15, 580, 390, 'hero')          # full hero incl navbar
crop(20, 390, 580, 662, 'cream-section') # cream section
crop(600, 15, 880, 460, 'dark-panel')    # YOUR BETTER GAME panel
crop(600, 460, 880, 662, 'pricing')      # pricing + testimonial zone
