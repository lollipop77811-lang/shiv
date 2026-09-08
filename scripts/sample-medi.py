"""Sample exact colors from the MediCare reference screenshot."""
from PIL import Image
from collections import Counter

img = Image.open('/home/z/my-project/upload/7e1f1c5496a07f7416c8659938c8a2f2.webp').convert('RGB')
W, H = img.size  # 1905 x 10251
S = 1905 / 1000.0  # preview basis was 1000 wide

def region(x0, y0, x1, y1, label, topn=5):
    X0, Y0, X1, Y1 = [int(v * S) for v in (x0, y0, x1, y1)]
    crop = img.crop((X0, Y0, X1, Y1)).resize((50, 50))
    cnt = Counter(crop.getdata())
    print(f'\n{label}')
    for (r, g, b), n in cnt.most_common(topn):
        print(f'   #{r:02X}{g:02X}{b:02X}  x{n}')

region(150, 55, 500, 72,   'TOP BAR navy')
region(120, 57, 240, 70,   'Top bar phone yellow')
region(10, 10, 60, 200,    'PAGE BG light blue')
region(60, 100, 400, 180,  'HERO steel blue (upper left)')
region(450, 480, 600, 560, 'HERO blue lower area')
region(120, 395, 240, 425, 'YELLOW CTA button')
region(60, 620, 900, 660,  'CREAM logo bar')
region(200, 200, 700, 260, 'Hero heading white')
region(60, 780, 900, 830,  'WHITE SHEET content area')
region(130, 990, 870, 1120,'Specialties container yellow glow')
region(150, 1030, 350, 1100,'Specialty white card')
region(130, 1200, 200, 1250,'Specialty icon yellow')
region(400, 1180, 620, 1230,'Heading dark text')
region(620, 1400, 830, 1600,'Blue photo card')
region(590, 1590, 700, 1660,'YELLOW BLOB behind photo')
region(80, 2560, 900, 2700,'ABOUT steel blue card')
region(590, 2540, 620, 2560,'About check circle yellow')
region(600, 2650, 700, 2680,'About yellow button')
region(60, 3300, 900, 3450,'Testimonials cream + yellow sun')
region(400, 3560, 500, 3620,'Testimonial white card')
region(430, 3700, 480, 3720,'Stars yellow')
region(60, 4600, 900, 4750,'EXPERTS section bg')
region(220, 4650, 380, 4800,'Doctor photo bg')
region(60, 5150, 900, 5300,'APPOINTMENT navy section')
region(560, 5200, 780, 5400,'Form white card')
region(580, 5390, 760, 5430,'Form submit yellow')
region(100, 5800, 400, 6000,'Contact cream card')
region(60, 6600, 900, 6800,'Footer white card')
region(60, 6300, 900, 6500,'Footer zone yellow gradient')
