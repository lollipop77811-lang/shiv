"""
Task 15 - hero cutout, step 2: run rembg (u2net alpha matting) on the
white-background exam render to produce a true transparent cutout PNG,
then trim transparent margins.
"""
from PIL import Image
from rembg import remove, new_session

SRC = "/home/z/my-project/public/images/hero-exam-cutout.png"
OUT = "/home/z/my-project/public/images/hero-exam-people.png"

session = new_session("isnet-general-use")  # better with white-on-white subjects

img = Image.open(SRC)
print("input:", img.size, img.mode)

result = remove(
    img,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=15,
    alpha_matting_erode_size=8,
)

# Trim fully-transparent margins so the asset hugs its subjects
bbox = result.getbbox()
print("bbox:", bbox)
if bbox:
    result = result.crop(bbox)

result.save(OUT)
print("saved:", OUT, result.size, result.mode)
