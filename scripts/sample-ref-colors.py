"""Sample colors from the Golf Elevate reference with correct 1600x1200 scaling."""
from PIL import Image
from collections import Counter

img = Image.open('/home/z/my-project/download/shots/ref-golf-design.png').convert('RGB')
W, H = img.size
S = 1600 / 880.0  # displayed preview was ~880 wide

def region_colors(x0, y0, x1, y1, label, topn=6):
    """Sample dominant colors in a box given in preview coords."""
    X0, Y0, X1, Y1 = [int(v * S) for v in (x0, y0, x1, y1)]
    crop = img.crop((X0, Y0, X1, Y1)).resize((60, 60))
    cnt = Counter(crop.getdata())
    print(f'\n{label}  box=({X0},{Y0},{X1},{Y1})')
    for (r, g, b), n in cnt.most_common(topn):
        print(f'   #{r:02X}{g:02X}{b:02X}  x{n}')

# Preview coords (880x662 basis)
region_colors(200, 20, 480, 40,   'NAVBAR (dark green top strip)')
region_colors(30, 80, 560, 380,   'HERO (deep green photo)')
region_colors(60, 130, 130, 190,  'HERO dark corner (top-left)')
region_colors(250, 150, 400, 300, 'HERO display serif text zone')
region_colors(470, 40, 560, 62,   'CTA pill (Get Started)')
region_colors(30, 395, 560, 440,  'CREAM section (BUILT FOR GOLFERS bg)')
region_colors(220, 440, 460, 470, 'Headline text on cream')
region_colors(60, 440, 110, 462,  'Badge pill on cream')
region_colors(620, 30, 850, 240,  'DARK PANEL (YOUR BETTER GAME)')
region_colors(640, 55, 700, 75,   'Dark panel CTA button')
region_colors(720, 355, 845, 435, 'Testimonial green card')
region_colors(620, 510, 870, 650, 'PRICING dark section')
region_colors(655, 600, 700, 625, 'Price text highlight')
region_colors(60, 590, 200, 655,  'Stats/white card zone')
