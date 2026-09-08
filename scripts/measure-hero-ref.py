"""Measure hero card geometry from the user's reference screenshot."""
from PIL import Image

img = Image.open('/home/z/my-project/upload/Screenshot 2026-09-08 163759.png').convert('RGB')
W, H = img.size
print(f'Screenshot: {W}x{H}')

def px(x, y):
    r, g, b = img.getpixel((x, y))
    return f'#{r:02X}{g:02X}{b:02X}'

# Find card edges by scanning for the steel blue (#6690B3-ish) region
def is_card_blue(x, y):
    r, g, b = img.getpixel((x, y))
    return 70 <= r <= 130 and 120 <= g <= 165 and 150 <= b <= 195

# horizontal scan at mid height
y_mid = 420
left = next((x for x in range(W) if is_card_blue(x, y_mid)), None)
right = next((x for x in range(W - 1, -1, -1) if is_card_blue(x, y_mid)), None)
# vertical scan at x=200 (avoid photo on right)
x_col = 200
top = next((y for y in range(H) if is_card_blue(x_col, y)), None)
bottom = next((y for y in range(H - 1, -1, -1) if is_card_blue(x_col, y)), None)

print(f'card left edge ~ x={left}, right ~ x={right}')
print(f'card top ~ y={top}, bottom ~ y={bottom}')
if left and right:
    print(f'card width = {right - left}px  | gutter L = {left}px, gutter R = {W - right}px')
if top and bottom:
    print(f'card height = {bottom - top}px  | gutter T = {top}px, gutter B = {H - bottom}px')

# text column: find first dark-ish/white text pixel row positions
# eyebrow text ~ y=222, heading starts y~250; left margin of text:
def first_text_x(y0, y1, x0, x1):
    """leftmost near-white pixel (text on blue) in a band"""
    for x in range(x0, x1):
        for y in range(y0, y1):
            r, g, b = img.getpixel((x, y))
            if r > 220 and g > 230 and b > 235:
                return x
    return None

tx = first_text_x(255, 300, left, left + 400)
print(f'heading text left starts at x={tx} → inner left padding = {tx - left}px')

# eyebrow top:
def first_text_y(x0, x1, y0, y1):
    for y in range(y0, y1):
        for x in range(x0, x1, 2):
            r, g, b = img.getpixel((x, y))
            if r > 200 and g > 210 and b > 220:
                return y
    return None

ty = first_text_y(left + 80, left + 400, top, top + 350)
print(f'eyebrow/first text top at y={ty} → inner top padding to eyebrow = {ty - top}px')

# stats bottom: find "25+" text (white) near bottom-left
sy = first_text_y(left + 80, left + 200, bottom - 260, bottom)
print(f'stats text top ~ y={sy} → from card bottom = {bottom - sy}px')

# sample colors
print('corner sample (outside card):', px(20, 450), '| card blue:', px(300, 200), '| bottom strip:', px(700, 875))
