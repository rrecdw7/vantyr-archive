"""새 작품 사진을 사이트에 걸 수 있게 준비하는 도구.

사용법 (저장소 맨 위 폴더에서):
    python tools/add_photo.py 원본.jpg 이름 [--mode normal|film|night] [--blur x0,y0,x1,y1]

하는 일
  1. 사이트 공통 색감으로 보정 (필름 톤: 검정 살짝 띄우기, 하이라이트 롤오프, 채도 정리,
     그림자는 남색·밝은 곳은 살짝 따뜻하게, 공통 필름 그레인)
       --mode film  : 이미 필름 앱으로 찍은 사진(제주 사진들처럼) → 약하게
       --mode night : 밤 사진 → 어둠은 살리고 그림자의 탁한 녹색기만 뺌
  2. photos/이름-1200.webp, photos/이름-2400.webp, photos/이름.jpg(1600) 생성
  3. 흐릿한 미리보기(LQ)를 index.html 의 `const LQ = {` 에 넣음
  4. 벽에 번질 빛 색(GLOW)과 비율(r)을 계산해서 data.js 에 넣을 줄을 출력
  --blur : 번호판·얼굴 등을 가릴 영역(원본 픽셀 좌표). 여러 번 쓸 수 있음.

필요한 것: pip install pillow numpy opencv-python
"""
import argparse, base64, colorsys, io, os, re, sys
import numpy as np, cv2
from PIL import Image, ImageOps, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def grade(rgb, mode='normal', seed=7):
    x = rgb.astype(np.float32) / 255
    s = .35 if mode == 'film' else 1.0
    night = mode == 'night'
    black = (.022 if night else .045) * s; white = 1 - .045 * s
    k = 1 - (.03 if night else .09) * s
    y = np.clip(.5 + (x - .5) * k, 0, 1); y = black + y * (white - black)
    y = np.where(y > .8, .8 + (y - .8) * (1 - .25 * s), y)
    lab = cv2.cvtColor(np.clip(y, 0, 1).astype(np.float32), cv2.COLOR_RGB2LAB)
    C = np.hypot(lab[..., 1], lab[..., 2]).mean()
    f = float(np.clip((15 / max(C, 1)) ** .33, .86, 1.04)); f = 1 + (f - 1) * s
    lab[..., 1] *= f; lab[..., 2] *= f
    L = lab[..., 0] / 100
    sh = np.clip(1 - L / .45, 0, 1) ** 1.5; hi = np.clip((L - .6) / .4, 0, 1)
    if night:
        d = 1 - .6 * np.clip(1 - L / .25, 0, 1); lab[..., 1] *= d; lab[..., 2] *= d
    lab[..., 1] += s * (0.5 * hi - 0.4 * sh)
    lab[..., 2] += s * (1.4 * hi - 3.0 * sh)
    y = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)
    h, w = y.shape[:2]; rng = np.random.default_rng(seed)
    g = rng.standard_normal((h, w)).astype(np.float32)
    g = cv2.GaussianBlur(g, (0, 0), .7 * max(w, h) / 2000); g /= g.std() + 1e-6
    lum = y.mean(2, keepdims=True); amp = (.016 if mode != 'film' else .009) * (0.6 + 0.8 * lum * (1 - lum) * 4) / 1.4
    return (np.clip(y + g[..., None] * amp, 0, 1) * 255 + .5).astype(np.uint8)


def glow_color(im):
    a = np.asarray(im.convert('RGB').resize((128, 128)), dtype=np.float32) / 255
    hsv = cv2.cvtColor(a, cv2.COLOR_RGB2HSV); H, S, V = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    m = (S > .18) & (V > .15); w = (S * V)[m]; hh = H[m]
    if w.sum() < 3: hue, sat = 220, .25
    else:
        hist, _ = np.histogram(hh, bins=36, range=(0, 360), weights=w)
        hist = np.convolve(np.r_[hist[-2:], hist, hist[:2]], [1, 2, 3, 2, 1], 'valid')
        hue = int(hist.argmax()) * 10 + 5
        sel = np.abs(((hh - hue + 180) % 360) - 180) < 20
        sat = float(np.clip(np.average(S[m][sel], weights=w[sel]) * 1.1, .28, .6))
    r, g, b = colorsys.hsv_to_rgb(hue / 360, sat, .82)
    return '#%02x%02x%02x' % (int(r * 255), int(g * 255), int(b * 255))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('name')
    ap.add_argument('--mode', default='normal', choices=['normal', 'film', 'night'])
    ap.add_argument('--blur', action='append', default=[], help='x0,y0,x1,y1 (원본 좌표)')
    a = ap.parse_args()
    if not re.fullmatch(r'[a-z0-9]+', a.name): sys.exit('이름은 영어 소문자/숫자만 (예: rainyday)')
    im = ImageOps.exif_transpose(Image.open(a.src)).convert('RGB')
    for box in a.blur:
        bx = tuple(int(v) for v in box.split(','))
        r = im.crop(bx); r = r.resize((8, 6)).resize(r.size, Image.BILINEAR).filter(ImageFilter.GaussianBlur(6)); im.paste(r, bx)
    out = Image.fromarray(grade(np.asarray(im), a.mode))
    P = os.path.join(ROOT, 'photos')
    for w, q in [(1200, 82), (2400, 86)]:
        c = out.copy(); c.thumbnail((w, w), Image.LANCZOS); c.save(f'{P}/{a.name}-{w}.webp', 'WEBP', quality=q, method=6)
    c = out.copy(); c.thumbnail((1600, 1600), Image.LANCZOS); c.save(f'{P}/{a.name}.jpg', 'JPEG', quality=82, optimize=True, progressive=True)
    t = out.copy(); t.thumbnail((24, 24)); b = io.BytesIO(); t.save(b, 'JPEG', quality=50)
    lq = 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()
    idx = os.path.join(ROOT, 'index.html'); h = open(idx, encoding='utf-8').read()
    h, n = re.subn(r'"%s": "data:image/jpeg;base64,[^"]*", ' % a.name, '', h)
    assert h.count('const LQ = {') == 1
    h = h.replace('const LQ = {', f'const LQ = {{"{a.name}": "{lq}", ', 1)
    open(idx, 'w', encoding='utf-8').write(h)
    r = round(out.width / out.height, 3)
    print(f'완료: photos/{a.name}-1200.webp, -2400.webp, .jpg / LQ {"교체" if n else "추가"}')
    print(f'비율 r = {r}   빛 색 GLOW = {glow_color(out)}')
    print(f"data.js WORKS 줄 예시: {{no:??, series:'??', src:'photos/{a.name}.jpg', hd:true, r:{r}, title:'', place:'', date:'', sym:'', line:'', note:'', alt:''}},")


if __name__ == '__main__':
    main()
