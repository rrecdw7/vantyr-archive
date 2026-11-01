# Vantyr Archive

Vantyr가 직접 찍은 사진을 시리즈별 전시실에 걸어 두는 온라인 사진 전시관.

```
vantyr-archive/
├─ index.html      사이트 전체 (디자인 + 애니메이션 + 작품 목록)
├─ photos/         작품 사진 (긴 변 1600px 안팎 JPG 권장)
└─ music/          배경음악
```

---

## 작품 추가하기

1. 사진을 `photos/` 폴더에 넣어요. 파일 이름은 영어 소문자로 (예: `photos/rainyday.jpg`)
2. `index.html`에서 `const WORKS = [` 를 찾아, 맨 아래에 한 줄을 추가해요.

```js
{no:19, series:'night', src:'photos/rainyday.jpg', r:.75, title:'비 오는 밤', place:'동네 길', date:'2026.11.02', sym:'젖음', line:'비가 오면 길은 하늘을 한 번 더 비춘다.', note:'우산 없이 걷던 밤', alt:'비에 젖은 밤길과 가로등'},
```

| 항목 | 뜻 |
|---|---|
| `no` | 작품 번호. 마지막 번호 + 1 |
| `series` | 걸 전시실의 id (`sea`, `transit`, `night`, `lines`, `weather`, `dusk` …) |
| `src` | 사진 경로 |
| `r` | 사진 비율 = 가로 ÷ 세로 (정사각형 1, 세로 3:4 → .75, 가로 4:3 → 1.333) |
| `title` · `place` | 작품 제목 · 장소 |
| `date` | `2026.11.02` 형식. 모르면 `''` (표시 안 됨) |
| `sym` | 사진이 상징하는 단어 하나 → 「」 안에 표시 |
| `line` | 사진 아래 걸리는 한 문장 |
| `note` | 한 줄 기록. 없으면 `''` |
| `alt` | 사진 설명 (화면 낭독기, 검색용) |
| `featured:true` | 첫 화면 대표 작품으로 걸고 싶을 때만 (하나만) |
| `hd:true` | `photos/이름-1200.webp`, `이름-2400.webp` 고화질 파일이 있을 때만. 없으면 빼면 jpg로 보여요 |

> 고화질 WebP 파일은 Claude에게 사진을 보내며 "추가해줘"라고 하면 자동으로 만들어 올려요.

## 전시 리듬

`index.html`의 `PAIRS`와 `LARGE`로 조절해요.

```js
const PAIRS = [[5,9],[2,3],[15,18],[23,24]];  // 서로 닮은 두 작품을 한 화면에 나란히
const LARGE = [7,1,13,28,26];               // 화면 가득 크게 거는 작품
```

전시실에 `pause:'문장'`을 넣으면 작품이 4점 이상일 때 가운데쯤 문장만 있는 쉼표 화면이 생겨요.

전시실 목록, 각 전시실, 모든 작품 목록, 작품 보기 화면은 **자동으로** 바뀌어요.

## 전시실 추가하기

`const SERIES = [` 에 한 줄 추가:

```js
{id:'sky', no:'VII', title:'하늘', en:'Open Sky', epigraph:'고개를 들면 보이던 것들.'},
```

`epigraph`는 전시실을 여는 문장이에요. 그리고 `NEXT_ROOM`의 번호를 하나 올려요(VII → VIII).

## 배경음악 바꾸기

`music/`에 파일을 넣고, `index.html`의 `const MUSIC_SRC = ...` 경로를 바꿔요. 곡마다 음량이 다르면 `MUSIC_VOL`(0~1)로 맞춰요.
공개 사이트에서는 **자유 이용 녹음**(퍼블릭 도메인, CC0, CC BY)만 쓰고, CC BY면 연주자를 표기해요.

---

## 배포 (Vercel)

1. GitHub에 이 폴더를 저장소로 올리기
2. vercel.com → GitHub로 로그인 → **Add New → Project** → 이 저장소 선택 → **Deploy**
   (프레임워크 설정 없음, 빌드 명령 없음 — 그대로 Deploy)
3. 이후 저장소에 바뀐 파일이 올라가면 1분 안에 사이트가 자동으로 갱신돼요.
4. 도메인 연결: Vercel 프로젝트 → Settings → Domains

## 쓰는 기술

GSAP 3.12.5 + ScrollTrigger (애니메이션), Lenis 1.1.13 (부드러운 스크롤),
Google Fonts — Cormorant Garamond, Noto Serif KR.
빌드 과정 없는 HTML 한 장이라, 파일만 바꾸면 바로 반영돼요.

## 영어 버전

사이트 오른쪽 위 `KO / EN` 버튼으로 언어를 바꿔요. 한국어가 아닌 브라우저로 들어오면 처음부터 영어로 보여요.
작품을 추가할 때 `index.html`의 `const EN = {` 에도 한 줄을 넣으면 영어 화면에도 나와요. 없으면 한국어 그대로 보여요.

```js
29:['Title','Place','Symbol','One line.','Note (작가 기록 번역, 없으면 빈칸)'],
```

## 영상 작품 (움직이는 사진)

소리 없이 반복 재생되는 짧은 영상도 작품으로 걸 수 있어요.
- `videos/이름.mp4` (큰 화면용)와 `videos/이름-720.mp4` (휴대폰용)를 넣어요. 소리는 빼고 넣어요.
- 포스터(첫 장면) 사진을 `photos/이름.jpg`로 넣고, 작품 줄에 `video:'videos/이름'`을 추가해요.

## 로고

`brand/` 폴더에 있어요.
- `mark.svg` / `mark.png` — 해질녘 심볼 (어두운 배경용), `mark-dark-on-light.svg` — 밝은 배경용
- `lockup.svg` / `lockup.png` — 심볼 + Vantyr Archive (어두운 배경용), `lockup-dark-on-light.*` — 밝은 배경용
- `icon-512.png` — 프로필 사진 등 정사각형 아이콘
사이트 탭 아이콘은 `favicon.svg`, `favicon-32.png`, 휴대폰 홈 화면 아이콘은 `apple-touch-icon.png`예요.
