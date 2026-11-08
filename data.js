/* Vantyr Archive — 전시 데이터 
   사진·전시실을 추가할 때는 이 파일을 고쳐요. */
/* =========================================================
   전시 데이터
   SERIES : 전시실 (epigraph = 전시실을 여는 문장)
   WORKS  : 작품 (sym = 상징하는 단어, line = 한 줄, note = 그때의 기억)
   ========================================================= */
const SERIES = [
  {id:'sea',     no:'I',   title:'바다와 바람',   en:'Sea & Wind',      epigraph:'바람을 맞으며, 파도와 같이 있던 오후.', pause:'같은 바다라도, 바람이 다르면 다른 사진이 된다.',
     epigraph_en:'An afternoon with the wind in my face, beside the waves.', pause_en:'Even the same sea becomes a different photograph when the wind changes.'},
  {id:'transit', no:'II',  title:'이동하는 순간', en:'In Transit',      epigraph:'어딘가로 향하는 동안에만 보이는 풍경이 있다.', pause:'비몽사몽한 대합실에서, 설렘이 가득했던 길까지.',
     epigraph_en:'Some landscapes appear only while you are on your way.', pause_en:'From a half-asleep waiting lounge to a road full of excitement.'},
  {id:'night',   no:'III', title:'밤의 거리',     en:'After Dark',      epigraph:'불이 꺼진 뒤에야 보이는 길.', epigraph_en:'The road you only see once the lights go out.'},
  {id:'lines',   no:'IV',  title:'소실점',        en:'Vanishing Point', epigraph:'모든 길은 결국 한 점으로 모인다.', epigraph_en:'Every road gathers, in the end, into a single point.'},
  {id:'weather', no:'V',   title:'날씨',          en:'Weathers',        epigraph:'같은 자리도 날씨가 바뀌면 다른 곳이 된다.', pause:'맑음도 흐림도, 지나가는 동안에만 볼 수 있다.',
     epigraph_en:'The same place becomes somewhere else when the weather turns.', pause_en:'Clear or cloudy, you can only see it while it passes.'},
  {id:'dusk',    no:'VI',  title:'해질녘',        en:'Afterglow',       epigraph:'해가 지는 동안에만, 하늘은 이런 색을 낸다.', epigraph_en:'Only while the sun is setting does the sky make these colors.'},
];
/* each room has its own wall colour, like a museum; each work spills its own light onto the wall */
const WALL = {base:'#0D1017', sea:'#0A1619', transit:'#0D1321', night:'#06070B', lines:'#150F10', weather:'#0E1419', dusk:'#160F19'};
const GLOW = {1:'#86b1d1',2:'#96aed1',3:'#81a2d1',4:'#c2d196',5:'#93b7d1',6:'#91b6d1',7:'#91abd1',8:'#91b6d1',9:'#6ea8d1',10:'#d1966c',11:'#87a6d1',12:'#d1ad7c',13:'#d15e53',14:'#7dbcd1',15:'#d15e53',16:'#d1bd82',17:'#d1a98d',18:'#d19f7b',19:'#d1535e',20:'#d1c863',21:'#779dd1',22:'#779cd1',23:'#d19b75',24:'#7b9ed1',25:'#d1879f',26:'#b09ccf',27:'#96a5d1',28:'#739ad1',29:'#6c96d1',30:'#93a9c4'};
const NEXT_ROOM = {no:'VII', note:'새로 찍은 사진이 모이면 열립니다', note_en:'Opens when new photographs gather'};
/* 전시 리듬: 나란히 걸 두 작품(서로 닮은 사진), 크게 걸 작품 */
const PAIRS = [[5,9],[2,3],[15,18],[23,24],[29,30]];
const LARGE = [7,1,13,28,26];
const WORKS = [
  {no:1,  series:'transit', src:'photos/airport.jpg', hd:true,    r:.99,   title:'떠나기 전',          place:'공항',          date:'2026.10.27', sym:'경계',     line:'떠나는 순간은 늘 창문 너머에서 먼저 시작된다.',      note:'비몽사몽, 멍하니 앉아 있던 대합실', alt:'공항 대합실 창 너머로 보이는 산과 활주로'},
  {no:2,  series:'transit', src:'photos/cabin.jpg', hd:true,      r:.753,  title:'기내',              place:'비행기 안',      date:'2026.10.27', sym:'귀환',     line:'다시 왔다는 건, 한 번은 떠났었다는 뜻이다.',        note:'제주에 다시 왔구나, 실감한 순간', alt:'승객들이 짐을 정리하는 비행기 기내'},
  {no:3,  series:'transit', src:'photos/bus.jpg', hd:true,        r:.753,  title:'이동하는 길',        place:'버스 안',        date:'2026.10.27', sym:'설렘',     line:'도착보다 먼저 오는 것이 있다. 가는 길의 두근거림.',  note:'설렘이 가득했던 길', alt:'주황색 커튼이 달린 관광버스 내부'},
  {no:4,  series:'transit', src:'photos/show.jpg', hd:true,       r:1,     title:'오후의 공연',        place:'제주',          date:'2026.10.27', sym:'의외',     line:'기대하지 않은 곳에서 가장 오래 남는 장면이 온다.',   note:'기대보다 훨씬 재밌었던 공연', alt:'숲을 배경으로 말을 탄 배우들이 펼치는 야외 공연'},
  {no:5,  series:'sea',     src:'photos/biyangdo.jpg', hd:true,   r:1,     title:'비양도가 보이는 오후', place:'제주 협재',      date:'2026.10.27', sym:'거리',     line:'닿을 수 없어서 더 선명한 섬.',                   note:'에메랄드 빛의 바다색은 난생처음 보는 바다의 색이었다. 나는 멍하니 바라볼 수밖에 없었다.', alt:'에메랄드빛 파도 너머로 보이는 비양도'},
  {no:6,  series:'sea',     src:'photos/turbines.jpg', hd:true,   r:.754,  title:'바다 위의 바람개비',  place:'제주 서쪽 바다',  date:'2026.10.27', sym:'바람',     line:'보이지 않는 것이 가장 많은 것을 움직인다.',         note:'내가 마치 판타지물에 들어온 것 같았다. 강한 바람과 친구들의 웃음소리 속에서, 나는 그 풍경을 보고 자연은 정말로 아름다운 것이구나를 느꼈다.', alt:'현무암 해안 너머 수평선에 늘어선 해상 풍력발전기'},
  {no:7,  series:'sea',     src:'photos/waves.jpg', hd:true,      r:1.327, title:'밀려오는 것들',      place:'제주 바다',      date:'2026.10.27', sym:'반복',     line:'파도는 한 번도 같은 모양으로 돌아오지 않는다.',      note:'자연은 평상시엔 아름답다. 하지만 이 자연이 분노할 땐 걷잡을 수 없이 무서워지는 것이 자연이다.', alt:'하얗게 부서지는 파도와 멀리 보이는 풍력발전기'},
  {no:8,  series:'sea',     src:'photos/hyeopjae.jpg', hd:true,   r:1,     title:'구름이 낮던 날',      place:'제주 협재',      date:'2026.10.27', sym:'동화',     line:'현실이 잠깐 그림처럼 보이는 순간이 있다.',         note:'애니메이션 속 한 장면 같던 색감, 보자마자 이거다 싶었던 순간', alt:'구름이 낮게 깔린 협재 해변과 현무암 해안', featured:true},
  {no:9,  series:'sea',     src:'photos/island.jpg', hd:true,     r:1,     title:'섬이 보이는 언덕',     place:'제주',          date:'2026.10.28', sym:'고요',     line:'아무 일도 없던 오후가 가장 오래 기억된다.',         note:'이렇게 땅과, 바다와, 하늘의 경계선이 뚜렷할 수가 있는가. 미적으로 완벽한 곳이다.', alt:'잔디 언덕과 야자수 너머로 보이는 푸른 바다와 작은 섬'},
  {no:10, series:'transit', src:'photos/flight.jpg', hd:true,     r:1,     title:'돌아오는 하늘',       place:'비행기 안',      date:'2026.10.28', sym:'끝과 시작', line:'노을은 하루의 끝이면서, 돌아갈 곳의 시작이다.',      note:'제주의 끝을 보며 씁쓸하면서도, 집에 간다는 기쁨이 있으면서도, 나는 묵묵히 노을이 있는 창가를 바라본다.', alt:'어두운 비행기 창 너머 수평선에 남은 주황빛 노을'},
  {no:11, series:'sea',     src:'photos/beachwalk.jpg', hd:true,  r:1,     title:'바다를 걷는 사람',    place:'바닷가',        date:'', sym:'걸음',     line:'바다 앞에서는 누구나 조금 천천히 걷는다.',          note:'', alt:'맑은 하늘 아래 파도가 밀려오는 모래사장을 걷는 사람'},
  {no:12, series:'night',   src:'photos/schoolzone.jpg', hd:true, r:.75,   title:'200m 앞',           place:'밤의 동네 길',   date:'', sym:'예감',     line:'가장 조용한 길에도 다가오는 무언가가 있다.',         note:'', alt:'가로등과 은행나무가 늘어선 밤의 어린이보호구역 도로와 200m 표지판'},
  {no:13, series:'night',   src:'photos/taillights.jpg', hd:true, r:1.333, title:'멀어지는 불빛',       place:'밤길',          date:'', sym:'이별',     line:'멀어지는 것들은 늘 붉은빛을 남긴다.',              note:'', alt:'어둠 속에서 흔들리며 멀어지는 자동차의 붉은 후미등'},
  {no:14, series:'transit', src:'photos/bridge.jpg', hd:true,     r:.75,   title:'구름 쪽으로',         place:'다리 위',        date:'', sym:'향함',     line:'길은 끝나도, 하늘은 계속 이어진다.',               note:'나는 늘 그런 생각을 한다. 예전 사람들은 구름 위를 신들의 장소라고 생각했다. 하지만 구름 위는 아무것도 없다는 사실을 깨달으면 무슨 느낌이었을까. 그들에겐 하늘이란 무엇일까. 늘 그런 생각을 한다.', alt:'거대한 구름을 향해 다리 위를 달리는 자동차와 오토바이'},
  {no:15, series:'lines',   src:'photos/corridor.jpg', hd:true,   r:1.097, title:'붉은 기둥 사이',      place:'회랑',          date:'', sym:'통로',     line:'끝에는 언제나 빛이 기다리고 있다.',                note:'', alt:'붉은 기둥과 단청이 끝까지 이어지다 빛으로 열리는 긴 회랑'},
  {no:16, series:'night',   src:'photos/parklamp.jpg', hd:true,   r:.75,   title:'가로등 아래 계단',     place:'밤의 공원',      date:'', sym:'홀로',     line:'어둠이 깊을수록 하나의 빛이 길이 된다.',            note:'', alt:'앙상한 나무 사이 가로등 하나가 비추는 밤 공원의 계단'},
  {no:17, series:'transit', src:'photos/bluebus.jpg', hd:true,    r:1.333, title:'파란 버스',          place:'시골길',        date:'', sym:'일상',     line:'매일 지나가는 것이 어느 날 장면이 된다.',            note:'늘 보았던, 성서2번 버스. 익숙함이 소중한 것을 흐려지게 만든다.', alt:'앙상한 나무가 선 시골길을 달려오는 파란 버스'},
  {no:18, series:'lines',   src:'photos/alley.jpg', hd:true,      r:1.333, title:'틈',                place:'골목',          date:'', sym:'틈',       line:'벽과 벽 사이에도 길은 난다.',                     note:'', alt:'낡은 벽 두 개 사이로 좁게 난 골목길'},
  {no:19, series:'weather', src:'photos/mailbox.jpg', hd:true,   r:1.333, title:'빨간 우편함',        place:'시골 마을',      date:'', sym:'기다림',   line:'아무도 오지 않는 한낮에도, 우편함은 누군가를 기다린다.', note:'', alt:'한여름 시골길 담장에 달린 빨간 우편함과 멀리 보이는 하얀 집'},
  {no:20, series:'night',   src:'photos/store.jpg', hd:true,     r:1.333, title:'밤의 편의점',        place:'밤의 거리',      date:'', sym:'머묾',     line:'밤에도 불을 켜 둔 곳이 있어, 길이 덜 외롭다.',          note:'', alt:'어두운 나무 사이로 환하게 불이 켜진 밤의 편의점'},
  {no:21, series:'weather', src:'photos/kite.jpg', hd:true,      r:1.333, title:'연',               place:'하늘',          date:'', sym:'자유',     line:'줄이 있어서, 연은 더 높이 난다.',                    note:'', alt:'파란 하늘 높이 떠 있는 긴 꼬리의 새 모양 연'},
  {no:22, series:'weather', src:'photos/rainfield.jpg', hd:true, r:1.333, title:'비 오는 들판',        place:'시골 마을',      date:'', sym:'비',       line:'비는 풍경의 목소리를 낮춘다.',                        note:'', alt:'비에 젖은 난간 너머로 안개 낀 산과 물 고인 논'},
  {no:23, series:'dusk',    src:'photos/sunset.jpg', hd:true,    r:1.333, title:'전선 너머의 해',     place:'학교 담장 앞',      date:'', sym:'저묾',     line:'해는 전선 사이로, 천천히 하루를 내려놓는다.',          note:'', alt:'주황빛 하늘 아래 전선과 전봇대 사이로 산 너머로 지는 해'},
  {no:24, series:'dusk',    src:'photos/dusk.jpg', hd:true,      r:1.333, title:'해가 진 뒤',         place:'학교 담장 앞',      date:'', sym:'여운',     line:'해가 지고 나서야, 먼 산의 윤곽이 보인다.',              note:'', alt:'푸른 저녁 하늘과 노란 지평선, 앙상한 나무와 학교 담장 너머의 산 능선'},
  {no:25, series:'dusk',    src:'photos/pinksky.jpg', hd:true,   r:.75,   title:'분홍빛 저녁',        place:'산 아래 길',     date:'', sym:'물듦',     line:'하루의 끝은, 언제나 조금 붉게 물든다.',                note:'', alt:'분홍빛으로 물든 저녁 구름과 산 아래 굽은 길의 흰 자동차'},
  {no:26, series:'dusk',    src:'photos/hand.jpg', hd:true,      r:1,     title:'상생의 손',          place:'호미곶',         date:'', sym:'닿음',     line:'바다는 끝내 잡히지 않아서, 손은 계속 펼쳐져 있다.',     note:'', alt:'분홍빛 저녁 하늘 아래 바다 위로 솟은 청동 손 조형물'},
  {no:27, series:'weather', src:'photos/storm.jpg', hd:true,     r:.75,   title:'소나기 전',          place:'초등학교 운동장', date:'', sym:'전조',     line:'하늘이 먼저 무거워지고, 비는 그 다음에 온다.',           note:'', alt:'무거운 먹구름 아래 피어오르는 흰 뭉게구름과 운동장의 나무들'},
  {no:28, series:'weather', src:'photos/lenscloud.jpg', hd:true, r:2.257, title:'렌즈구름',           place:'초등학교 운동장', date:'', sym:'정지',     line:'바람이 산을 넘을 때, 구름은 잠시 멈춰 선다.',            note:'', alt:'파란 여름 하늘, 산 위에 길게 걸린 렌즈 모양 구름과 빈 운동장의 축구 골대'},
  {no:29, series:'transit', src:'photos/wing.jpg', hd:true,      r:.753,  title:'구름 위의 날개',     place:'제주로 가는 하늘', date:'2026.10.27', sym:'높이',     line:'구름 위에서는, 아래의 일들이 잠시 아주 작아진다.',      note:'', alt:'비행기 창밖으로 보이는 날개 끝과 끝없이 깔린 구름'},
  {no:30, series:'transit', src:'photos/taxi.jpg', hd:true, video:'videos/taxi', r:.754, title:'땅에 닿은 날개', place:'제주공항', date:'2026.10.27', sym:'도착',     line:'하늘에 있던 날개가, 천천히 땅의 속도를 배운다.',        note:'', alt:'흐린 하늘 아래 제주공항 활주로를 천천히 달리는 비행기 날개 (영상)'},
];

/* English version of each work — [title, place, symbol, line, note] (note: 작가 기록의 영어 번역) */
const EN = {
  1:['Before Leaving','Airport','Threshold','Leaving always begins first, on the other side of a window.','Half-asleep, sitting blankly in the waiting lounge.'],
  2:['In Flight','On the plane','Return','To come back means you once left.','The moment it sank in: I was back in Jeju.'],
  3:['On the Way','On the bus','Anticipation','Something arrives before the arrival — the flutter of the road there.','A road full of excitement.'],
  4:['Afternoon Show','Jeju','Surprise','The scenes that stay longest come from where you expected nothing.','A show far more fun than I expected.'],
  5:['Biyangdo in the Afternoon','Hyeopjae, Jeju','Distance','An island made clearer by being out of reach.','That emerald sea was a color I had never seen in my life. All I could do was stare.'],
  6:['Pinwheels on the Sea','West coast of Jeju','Wind','What we cannot see moves the most.','It felt as if I had stepped into a fantasy. In the strong wind and my friends’ laughter, looking at that view, I felt how truly beautiful nature is.'],
  7:['What Comes Rolling In','Jeju sea','Repetition','No wave ever returns in the same shape.','Nature is beautiful on ordinary days. But when it rages, it becomes uncontrollably terrifying — that, too, is nature.'],
  8:['A Day of Low Clouds','Hyeopjae, Jeju','Fairy Tale','There are moments when the real world looks, briefly, like a painting.','Colors like a scene from an animated film — the moment I knew, this is it.'],
  9:['Hill Facing the Island','Jeju','Stillness','The afternoons when nothing happened are remembered the longest.','How can the lines between land, sea and sky be this clear? An aesthetically perfect place.'],
  10:['The Sky Home','On the plane','End & Beginning','A sunset is the end of a day, and the beginning of the way home.','Watching Jeju come to an end — bittersweet, and yet glad to be going home — I quietly gaze at the window where the sunset is.'],
  11:['Walking by the Sea','Seaside','Steps','Before the sea, everyone walks a little slower.',''],
  12:['200 m Ahead','A night street','Premonition','Even the quietest road has something coming.',''],
  13:['Fading Lights','Night road','Farewell','What drifts away always leaves a red light behind.',''],
  14:['Toward the Clouds','On a bridge','Heading','The road ends; the sky goes on.','I always find myself thinking this. People long ago believed the place above the clouds belonged to the gods. What would it have felt like to realize there is nothing up there? What was the sky to them? I always find myself thinking this.'],
  15:['Between Red Pillars','Corridor','Passage','There is always light waiting at the end.',''],
  16:['Steps Under a Streetlight','Park at night','Alone','The deeper the dark, the more a single light becomes a path.',''],
  17:['The Blue Bus','Country road','Everyday','What passes by every day becomes, one day, a scene.','The Seongseo No. 2 bus I always saw. Familiarity blurs the things that are precious.'],
  18:['The Gap','Alley','Gap','Even between wall and wall, a path opens.',''],
  19:['Red Mailbox','Country village','Waiting','Even at noon, when no one comes, the mailbox waits for someone.',''],
  20:['Store at Night','Night street','Lingering','Somewhere keeps its lights on at night, so the road feels less lonely.',''],
  21:['Kite','Sky','Freedom','Because of the string, the kite flies higher.',''],
  22:['Rainy Fields','Country village','Rain','Rain lowers the voice of a landscape.',''],
  23:['Sun Beyond the Wires','By the school fence','Setting','Between the wires, the sun slowly lays the day down.',''],
  24:['After Sunset','By the school fence','Echo','Only after the sun goes down do the far mountains show their outline.',''],
  25:['Pink Evening','Road below the hills','Tinge','The end of a day is always tinged a little red.',''],
  26:['Hand of Harmony','Homigot','Reach','The sea can never be held, so the hand stays open.',''],
  27:['Before the Shower','Elementary school field','Omen','The sky grows heavy first; the rain comes after.',''],
  28:['Lenticular Cloud','Elementary school field','Pause','When the wind crosses the mountain, the cloud stops for a moment.',''],
  29:['Wing Above the Clouds','The sky to Jeju','Height','Above the clouds, everything below grows very small for a while.',''],
  30:['Wing on the Ground','Jeju Airport','Arrival','The wing that was in the sky slowly learns the speed of the ground.',''],
};
