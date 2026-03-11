// 고등 기본 과정 영어 단어 데이터 (10개)
const vocabulary = [
    {
        english: "abundant",
        korean: "풍부한, 많은",
        example: "The region has abundant natural resources.",
        exampleKorean: "그 지역은 풍부한 천연자원을 가지고 있다."
    },
    {
        english: "achieve",
        korean: "성취하다, 달성하다",
        example: "She worked hard to achieve her goals.",
        exampleKorean: "그녀는 목표를 달성하기 위해 열심히 일했다."
    },
    {
        english: "benefit",
        korean: "이익, 혜택",
        example: "Regular exercise has many health benefits.",
        exampleKorean: "규칙적인 운동은 많은 건강상의 이점이 있다."
    },
    {
        english: "consider",
        korean: "고려하다, 생각하다",
        example: "We need to consider all possible options.",
        exampleKorean: "우리는 모든 가능한 선택사항을 고려해야 한다."
    },
    {
        english: "efficient",
        korean: "효율적인",
        example: "This is a more efficient way to solve the problem.",
        exampleKorean: "이것이 문제를 해결하는 더 효율적인 방법이다."
    },
    {
        english: "frequent",
        korean: "빈번한, 자주 일어나는",
        example: "He makes frequent visits to the library.",
        exampleKorean: "그는 도서관을 자주 방문한다."
    },
    {
        english: "influence",
        korean: "영향, 영향을 미치다",
        example: "Parents have a strong influence on their children.",
        exampleKorean: "부모는 자녀에게 강한 영향을 미친다."
    },
    {
        english: "maintain",
        korean: "유지하다, 보존하다",
        example: "It's important to maintain a healthy lifestyle.",
        exampleKorean: "건강한 생활방식을 유지하는 것이 중요하다."
    },
    {
        english: "obtain",
        korean: "얻다, 획득하다",
        example: "You need a permit to obtain this information.",
        exampleKorean: "이 정보를 얻으려면 허가가 필요하다."
    },
    {
        english: "significant",
        korean: "중요한, 의미 있는",
        example: "This discovery has significant implications.",
        exampleKorean: "이 발견은 중요한 의미를 가지고 있다."
    }
];

// 중등 기본 단어팩: CSV 기반 데이터 (Day별 단어 리스트)
let currentVocabulary = vocabulary;  // 암기/퀴즈에서 사용할 현재 단어 목록
let middleBasicByDay = null;         // { 1: [...], 2: [...], ... } CSV 파싱 결과 캐시

// Day 01 임베디드 데이터 (fetch 실패 시 file:// 등에서 사용)
const MIDDLE_BASIC_DAY01 = [
    { english: "tall", korean: "키가 큰 / 높은", example: "My brother is very tall.", exampleKorean: "내 남동생은 키가 매우 크다.", example2: "a tall building", exampleKorean2: "높은 건물" },
    { english: "cut", korean: "(cut-cut) 1. 베다 / 자르다", example: "I cut my finger.", exampleKorean: "나는 손가락을 베었다.", example2: "She cuts the cake.", exampleKorean2: "그녀는 그 케이크를 자른다." },
    { english: "have", korean: "(had-had) 1. 가지다 / 먹다, 마시다", example: "We have over one hundred languages.", exampleKorean: "교과서 우리는 100개가 넘는 언어를 가지고 있다.", example2: "He didn't have breakfast.", exampleKorean2: "그는 아침을 먹지 않았다." },
    { english: "meet", korean: "(met-met) 만나다", example: "Let's meet at three o'clock.", exampleKorean: "3시에 만나자." },
    { english: "see", korean: "(saw-seen) 1. 보다 / 알다, 이해하다", example: "I didn't see the car.", exampleKorean: "나는 그 차를 보지 못했다.", example2: "\"This book is mine.\" \"Oh, I see.\"", exampleKorean2: "\"이 책은 내 것이야.\" \"아, 알았어.\"" },
    { english: "from", korean: "[장소] …에서(부터) / [시각] …부터", example: "Let's walk from here.", exampleKorean: "여기에서부터 걸어가자.", example2: "The shop is open from 8 a.m. to 6 p.m.", exampleKorean2: "그 가게는 오전 8시부터 오후 6시까지 문을 연다." },
    { english: "what", korean: "무엇 / 어떤 것  형 무슨", example: "What did you find there?", exampleKorean: "교과서 너는 거기서 무엇을 찾았니?", example2: "What color do you like?", exampleKorean2: "너는 어떤 색을 좋아하니?" },
    { english: "actor", korean: "배우", example: "He is a movie actor.", exampleKorean: "그는 영화 배우이다.", example2: "actress", exampleKorean2: "명 여배우" },
    { english: "make", korean: "(made-made) 만들다", example: "I will make cookies.", exampleKorean: "나는 쿠키를 만들 것이다.", example2: "She made me a bag.", exampleKorean2: "그녀가 내게 가방을 만들어주었다." },
    { english: "friend", korean: "친구 / 벗", example: "I play soccer with my friends.", exampleKorean: "교과서 나는 친구들과 축구를 한다.", example2: "a best friend", exampleKorean2: "단짝" },
    { english: "large", korean: "큰, 넓은 small / 많은", example: "This room is very large.", exampleKorean: "이 방은 매우 크다.", example2: "a large family", exampleKorean2: "대가족 (식구가 많은 가족)" },
    { english: "heavy", korean: "무거운 light 0021 / (양·정도가) 많은, 심한", example: "This box is very heavy.", exampleKorean: "이 상자는 매우 무겁다.", example2: "heavy rain", exampleKorean2: "폭우" },
    { english: "school", korean: "학교", example: "I had a test at school.", exampleKorean: "나는 학교에서 시험을 봤다.", example2: "school", exampleKorean2: "은 그리스어에서 나온 말로 본래 ‘여가 시간', ‘휴식'이라는 의미를 가집니다." },
    { english: "room", korean: "방", example: "This house has three rooms.", exampleKorean: "이 집에는 방이 3개 있다." },
    { english: "dance", korean: "춤추다  명 춤 / 댄스", example: "Shall we dance?", exampleKorean: "춤추실래요?", example2: "folk dance", exampleKorean2: "민속 무용" },
    { english: "clean", korean: "깨끗한 dirty 0042  동 청소하다", example: "My hands are not clean.", exampleKorean: "내 손은 깨끗하지 않다.", example2: "He cleaned his room.", exampleKorean2: "그는 자신의 방을 청소했다." },
    { english: "bean", korean: "콩", example: "I had beans and rice for lunch.", exampleKorean: "교과서 나는 점심으로 콩과 밥을 먹었다.", example2: "coffee beans", exampleKorean2: "커피 콩" },
    { english: "soap", korean: "비누", example: "Wash your hands with soap.", exampleKorean: "비누로 너의 손을 씻어라." },
    { english: "come[be] from", korean: "… 출신이다 / …에서 오다", example: "He comes from Canada.", exampleKorean: "그는 캐나다 출신이다.", example2: "She is from India.", exampleKorean2: "교과서 그녀는 인도에서 왔다." },
    { english: "be going to-v", korean: "…할 것이다 / …할 예정이다", example: "We are going to go to the zoo.", exampleKorean: "우리는 그 동물원에 갈 것이다." }
];

const MIDDLE_BASIC_DAY02 = [
    { english: "light", korean: "빛 / (전깃)불, 전등  형 가벼운", example: "Plants need water and light.", exampleKorean: "식물은 물과 빛을 필요로 한다.", example2: "The guide turned off the lights in the cave.", exampleKorean2: "교과서 가이드는 동굴에 있는 불들을 껐다." },
    { english: "for", korean: "[목적] …을 위해 / [시간] … 동안", example: "We went home for dinner.", exampleKorean: "우리는 저녁 식사를 하러 집에 갔다.", example2: "I studied for three hours.", exampleKorean2: "나는 3시간 동안 공부했다." },
    { english: "eat", korean: "(ate-eaten) 먹다", example: "I eat an apple every day.", exampleKorean: "나는 매일 사과 한 개를 먹는다." },
    { english: "too", korean: "너무 / 또한, 게다가", example: "It's too hot today.", exampleKorean: "오늘은 너무 덥다.", example2: "I think so too.", exampleKorean2: "나 또한 그렇게 생각해." },
    { english: "lunch", korean: "점심 (식사)", example: "We have lunch at noon.", exampleKorean: "우리는 정오에 점심을 먹는다.", example2: "0064 breakfast", exampleKorean2: "명 아침 (식사)" },
    { english: "wait", korean: "기다리다 ((for))", example: "Please wait here.", exampleKorean: "여기에서 기다려주세요.", example2: "They are waiting for you.", exampleKorean2: "그들은 너를 기다리고 있다." },
    { english: "student", korean: "학생", example: "I'm a middle school student.", exampleKorean: "나는 중학생이다." },
    { english: "model", korean: "모형 / 모델", example: "The boy is making a model of a plane.", exampleKorean: "그 소년이 모형 비행기를 만들고 있다.", example2: "a fashion model", exampleKorean2: "패션모델" },
    { english: "young", korean: "어린 / 젋은", example: "He was a young man with long brown hair.", exampleKorean: "교과서 그는 긴 갈색 머리를 가진 젊은 남자였다.", example2: "young people", exampleKorean2: "젊은이들" },
    { english: "city", korean: "도시", example: "New York is a big city.", exampleKorean: "뉴욕은 대도시이다." },
    { english: "watch", korean: "보다  명 손목시계", example: "We watched a soccer match.", exampleKorean: "교과서 우리는 축구 경기를 봤다.", example2: "He is looking at his watch.", exampleKorean2: "그는 손목시계를 보고 있다." },
    { english: "hobby", korean: "취미", example: "I play the violin as a hobby.", exampleKorean: "나는 취미로 바이올린을 연주한다." },
    { english: "ago", korean: "… 전에 / 이전에", example: "We were in the same class twenty years ago.", exampleKorean: "교과서 우리는 20년 전에 같은 반이었다.", example2: "long ago", exampleKorean2: "옛날에, 오래전에" },
    { english: "classmate", korean: "급우 / 반 친구", example: "All of his classmates are nice.", exampleKorean: "그의 반 친구들은 모두 착하다." },
    { english: "dancer", korean: "춤추는 사람 / 무용수", example: "She is a ballet dancer.", exampleKorean: "그녀는 발레 무용수이다.", example2: "0015 dance", exampleKorean2: "동 춤추다; 명 춤, 댄스" },
    { english: "dirt", korean: "먼지, 때 / 흙", example: "Brush the dirt off your clothes.", exampleKorean: "너의 옷에 붙은 먼지를 털어내라.", example2: "The kids were playing with dirt.", exampleKorean2: "아이들은 흙을 가지고 놀고 있었다." },
    { english: "body", korean: "몸 / 신체", example: "Tomatoes are good for your body.", exampleKorean: "토마토는 너의 몸에 좋다." },
    { english: "classroom", korean: "교실 / 강의실", example: "Did they clean the classroom?", exampleKorean: "그들은 교실을 청소했니?" },
    { english: "go to school", korean: "학교에 다니다", example: "I went to school for six years.", exampleKorean: "나는 6년 동안 학교에 다녔다." },
    { english: "make friends", korean: "친구가 되다 / 친해지다", example: "I made friends with them.", exampleKorean: "나는 그들과 친구가 되었다.", example2: "IDIOMS & PHRASES", exampleKorean2: "영단어 우리말 뜻 영단어 우리말 뜻 잘 외워지지 않는 영단어를 아래 빈칸에 다시 써 봅시다." }
];

/**
 * CSV 한 행 파싱 (쌍따옴표 필드 처리)
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if ((c === ',' && !inQuotes) || (c === '\r' && !inQuotes)) {
            result.push(current.trim());
            current = '';
        } else if (c !== '\r') {
            current += c;
        }
    }
    result.push(current.trim());
    return result;
}

/**
 * 중등 기본 단어팩 CSV 로드 및 Day별로 그룹화
 */
async function loadMiddleBasicCSV() {
    if (middleBasicByDay !== null) return middleBasicByDay;
    try {
        const res = await fetch('middle_basic_voca_day01_50.csv');
        let text = await res.text();
        text = text.replace(/^\uFEFF/, ''); // BOM 제거
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length < 2) throw new Error('CSV 비어있음');
        const byDay = {};
        for (let i = 1; i < lines.length; i++) {
            const cols = parseCSVLine(lines[i]);
            if (cols.length < 6) continue;
            const dayLabel = (cols[0] || '').trim();  // "Day 01", "Day 02" ...
            const dayNum = parseInt(dayLabel.replace(/\D/g, ''), 10) || 1;
            const word = (cols[1] || '').trim();
            const meaning1 = (cols[2] || '').trim();
            const meaning2 = (cols[3] || '').trim();
            let example = (cols[4] || '').trim();
            let exampleKorean = (cols[5] || '').trim();
            let example2 = (cols[6] || '').trim();
            let exampleKorean2 = (cols[7] || '').trim();
            const korean = meaning2 ? `${meaning1} / ${meaning2}` : meaning1;
            if (!word) continue;
            if (!byDay[dayNum]) byDay[dayNum] = [];
            byDay[dayNum].push({
                english: word,
                korean: korean,
                example: example || '-',
                exampleKorean: exampleKorean || '-',
                example2: example2 || '',
                exampleKorean2: exampleKorean2 || ''
            });
        }
        middleBasicByDay = byDay;
        return byDay;
    } catch (err) {
        console.warn('중등 기본 CSV 로드 실패, 임베디드 데이터 사용:', err.message);
        middleBasicByDay = { 1: MIDDLE_BASIC_DAY01, 2: MIDDLE_BASIC_DAY02 };
        return middleBasicByDay;
    }
}

// ===== 암기모드 관련 변수 및 로직 =====
let currentIndex = 0;
let studiedWords = new Set();
let isFlipped = false;

// DOM 요소
const flashcard = document.getElementById('flashcard');
const flashcardInner = document.getElementById('flashcardInner');
const englishWord = document.getElementById('englishWord');
const koreanMeaning = document.getElementById('koreanMeaning');
const example = document.getElementById('example');
const exampleTranslation = document.getElementById('exampleTranslation');
const currentCard = document.getElementById('currentCard');
const progressFill = document.getElementById('progressFill');
const studiedCount = document.getElementById('studiedCount');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// 카드 업데이트 함수
function updateCard() {
    const list = currentVocabulary;
    if (!list || !list.length) return;
    const word = list[currentIndex];

    // 카드 뒤집기 리셋
    if (isFlipped) {
        flashcard.classList.remove('flipped');
        isFlipped = false;
    }

    // 내용 업데이트 (애니메이션을 위해 약간의 지연)
    setTimeout(() => {
        englishWord.textContent = word.english;
        koreanMeaning.textContent = word.korean;

        // 즐겨찾기 상태 초기화 (UI상으로만)
        const favoriteBtn = document.getElementById('favoriteBtn');
        favoriteBtn.classList.remove('favorited');
        const svg = favoriteBtn.querySelector('svg');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');

        // 예문에서 단어 강조 표시 (특수문자 이스케이프)
        const escaped = (word.english || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
        const highlightedExample = (word.example || '-').replace(regex, '<span class="highlight-word">$1</span>');
        example.innerHTML = highlightedExample;

        exampleTranslation.textContent = word.exampleKorean || '-';

        const exampleItem2 = document.getElementById('exampleItem2');
        const example2DOM = document.getElementById('example2');
        const exampleTranslation2DOM = document.getElementById('exampleTranslation2');

        if (exampleItem2 && example2DOM && exampleTranslation2DOM) {
            if (word.example2 && word.example2.trim() !== '') {
                const highlightedExample2 = word.example2.replace(regex, '<span class="highlight-word">$1</span>');
                example2DOM.innerHTML = highlightedExample2;
                exampleTranslation2DOM.textContent = word.exampleKorean2 || '-';
                exampleItem2.style.display = 'block';
            } else {
                exampleItem2.style.display = 'none';
            }
        }

        // 자동 소리 재생 (진입 시)
        const memorizeAutoplay = document.getElementById('memorizeAutoplayToggle');
        if (memorizeAutoplay && memorizeAutoplay.checked) {
            speakWord(word.english);
        }
    }, 150);

    // 진행 상태 업데이트
    currentCard.textContent = currentIndex + 1;
    const totalCardsEl = document.getElementById('totalCards');
    if (totalCardsEl) totalCardsEl.textContent = list.length;
    const totalWordsCount = document.getElementById('totalWordsCount');
    if (totalWordsCount) totalWordsCount.textContent = list.length;

    const progress = ((currentIndex + 1) / list.length) * 100;
    progressFill.style.width = `${progress}%`;

    // 학습한 단어 추가
    studiedWords.add(currentIndex);
    studiedCount.textContent = studiedWords.size;

    // 버튼 상태 업데이트
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === list.length - 1;
}

// 카드 뒤집기
flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
});

// 이전 버튼
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
});

// 다음 버튼
nextBtn.addEventListener('click', () => {
    if (currentVocabulary && currentIndex < currentVocabulary.length - 1) {
        currentIndex++;
        updateCard();
    }
});

// 키보드 단축키
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    } else if (e.key === ' ' || e.key === 'Enter') {
        if (document.getElementById('memorizeMode').classList.contains('active')) {
            e.preventDefault();
            flashcard.click();
        }
    } else if (e.key === 'f' || e.key === 'F') {
        // 단축키 f로 즐겨찾기 토글
        if (document.getElementById('memorizeMode').classList.contains('active')) {
            document.getElementById('favoriteBtn').click();
        }
    } else if (e.key === 's' || e.key === 'S') {
        // 단축키 s로 발음 듣기
        if (document.getElementById('memorizeMode').classList.contains('active')) {
            document.getElementById('audioBtn').click();
        }
    }
});

// ===== 모드 전환 (Bottom Navigation) =====
const memorizeNavBtn = document.getElementById('memorizeNavBtn');
const studyNavBtn = document.getElementById('studyNavBtn');
const storeNavBtn = document.getElementById('storeNavBtn');
const homeNavBtn = document.getElementById('homeNavBtn');
const myNavBtn = document.getElementById('myNavBtn');

const memorizeMode = document.getElementById('memorizeMode');
const studyMode = document.getElementById('studyMode');
const storeMode = document.getElementById('storeMode');
const homeMode = document.getElementById('homeMode');
const myMode = document.getElementById('myMode');
const wordPackMode = document.getElementById('wordPackMode');
const vocabularyDetailMode = document.getElementById('vocabularyDetailMode');

function deactivateAll() {
    memorizeNavBtn.classList.remove('active');
    studyNavBtn.classList.remove('active');
    storeNavBtn.classList.remove('active');
    homeNavBtn.classList.remove('active');
    myNavBtn.classList.remove('active');

    memorizeMode.classList.remove('active');
    studyMode.classList.remove('active');
    storeMode.classList.remove('active');
    homeMode.classList.remove('active');
    myMode.classList.remove('active');
    wordPackMode.classList.remove('active');
    if (myWordbookManageMode) myWordbookManageMode.classList.remove('active');
    const notificationSettingsMode = document.getElementById('notificationSettingsMode');
    if (notificationSettingsMode) notificationSettingsMode.classList.remove('active');
    const accountSecurityMode = document.getElementById('accountSecurityMode');
    if (accountSecurityMode) accountSecurityMode.classList.remove('active');
    const dataResetMode = document.getElementById('dataResetMode');
    if (dataResetMode) dataResetMode.classList.remove('active');

    // 모든 모드 섹션을 찾아 비활성화
    document.querySelectorAll('.mode-section').forEach(m => m.classList.remove('active'));

    // 내부 퀴즈 관련 컨테이너들 숨김 처리
    document.querySelectorAll('.quiz-container').forEach(qc => qc.classList.add('hidden'));

    // 특정 서브 선택 화면들만 숨김 (스택 방지)
    const subSelections = ['studyDaySelection', 'daySelection', 'assignmentSection', 'memorizeContent', 'studyPackSelection'];
    subSelections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const quizResults = document.getElementById('quizResults');
    if (quizResults) quizResults.classList.add('hidden');

    // 각 탭의 메인 선택 영역 준비
    const quizSelection = document.getElementById('quizSelection'); // 학습 탭 메인
    if (quizSelection) {
        quizSelection.classList.remove('hidden');
        quizSelection.style.display = 'block';
    }

    const memorizeSelection = document.getElementById('memorizeSelection'); // 암기 탭 메인
    if (memorizeSelection) {
        memorizeSelection.classList.remove('hidden');
    }

    // 화면 전환 시 항상 최상단으로 스크롤 리셋
    window.scrollTo(0, 0);
}

memorizeNavBtn.addEventListener('click', () => {
    deactivateAll();
    memorizeNavBtn.classList.add('active');
    memorizeMode.classList.add('active');
    showPackSelection();
});

studyNavBtn.addEventListener('click', () => {
    deactivateAll();
    studyNavBtn.classList.add('active');
    studyMode.classList.add('active');
    showQuizSelection();
});

storeNavBtn.addEventListener('click', () => {
    deactivateAll();
    storeNavBtn.classList.add('active');
    storeMode.classList.add('active');
});

homeNavBtn.addEventListener('click', () => {
    deactivateAll();
    homeNavBtn.classList.add('active');
    homeMode.classList.add('active');
    updateHomeStats();
});

myNavBtn.addEventListener('click', () => {
    deactivateAll();
    myNavBtn.classList.add('active');
    myMode.classList.add('active');
});

// ===== 내 단어장 관리 로직 =====

// toast alert
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 400);
    }, 2000);
}

// 단어장 선택 모달 관련
let currentWordToSave = null;
function openWordbookSelector(english, korean) {
    currentWordToSave = { english, korean };
    const modal = document.getElementById('wordbookSelectModal');
    const list = document.getElementById('wordbookSelectList');
    if (!modal || !list) return;

    list.innerHTML = '';
    myWordbooks.forEach(book => {
        const item = document.createElement('div');
        item.className = 'manage-item';
        item.style.cursor = 'pointer';
        item.innerHTML = `
            <div class="manage-item-info">
                <div class="manage-item-icon" style="background: ${book.color}22; color: ${book.color}">${book.emoji}</div>
                <div class="manage-item-text">
                    <div class="manage-item-name">${book.name}</div>
                    <div class="manage-item-count">단어: ${book.count}개 | 복습: ${book.reviewCount}회</div>
                </div>
            </div>
            <div class="manage-item-actions">
                <span style="color: var(--accent-color); font-weight: 700;">+ 추가</span>
            </div>
        `;

        item.addEventListener('click', () => {
            book.count++;
            modal.classList.add('hidden');
            showToast(`'${english}' 단어가 '${book.name}' 단어장에 추가되었습니다.`);

            if (typeof renderWordbookManageList === 'function' && document.getElementById('myWordbookManageMode').classList.contains('active')) {
                renderWordbookManageList();
            }
            updateHomeWordbooks();
        });

        list.appendChild(item);
    });

    modal.classList.remove('hidden');
}

// 모달 닫기 이벤트들
const closeWordbookSelectModal = document.getElementById('closeWordbookSelectModal');
if (closeWordbookSelectModal) {
    closeWordbookSelectModal.addEventListener('click', () => {
        document.getElementById('wordbookSelectModal').classList.add('hidden');
    });
}
const wordbookSelectModal = document.getElementById('wordbookSelectModal');
if (wordbookSelectModal) {
    wordbookSelectModal.addEventListener('click', (e) => {
        if (e.target === wordbookSelectModal) {
            wordbookSelectModal.classList.add('hidden');
        }
    });
}

// 퀴즈 모드 단어 저장 버튼들 이벤트 연결
const quizSaveBtns = ['spellingSaveBtn', 'sentenceSaveBtn', 'wordMeaningSaveBtn'];
quizSaveBtns.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const word = vocabulary[quizIndex];
            if (word) {
                openWordbookSelector(word.english, word.korean);
            }
        });
    }
});

// 내 단어장 데이터
let myWordbooks = [
    { id: 1, name: "중요 단어", color: "#ffd700", emoji: "⭐", count: 45, reviewCount: 12 },
    { id: 2, name: "헷갈리는 단어", color: "#ff7f50", emoji: "🔥", count: 32, reviewCount: 8 },
    { id: 3, name: "복습 예정", color: "#4db8ff", emoji: "📝", count: 18, reviewCount: 5 }
];

const openWordbookManageBtn = document.getElementById('openWordbookManageBtn');
const myWordbookManageMode = document.getElementById('myWordbookManageMode');
const backToMyFromManageBtn = document.getElementById('backToMyFromManageBtn');
const wordbookManageList = document.getElementById('wordbookManageList');
const addNewBookBtn = document.getElementById('addNewBookBtn');

if (openWordbookManageBtn) {
    openWordbookManageBtn.addEventListener('click', () => {
        deactivateAll();
        if (myWordbookManageMode) {
            myWordbookManageMode.classList.add('active');
            renderWordbookManageList();
        }
    });
}

if (backToMyFromManageBtn) {
    backToMyFromManageBtn.addEventListener('click', () => {
        deactivateAll();
        myNavBtn.classList.add('active');
        myMode.classList.add('active');
    });
}

function renderWordbookManageList() {
    if (!wordbookManageList) return;
    wordbookManageList.innerHTML = '';

    myWordbooks.forEach(book => {
        const item = document.createElement('div');
        item.className = 'manage-item';
        item.innerHTML = `
            <div class="manage-item-info">
                <div class="manage-item-icon" style="background: ${book.color}22; color: ${book.color}">${book.emoji}</div>
                <div class="manage-item-text">
                    <div class="manage-item-name">${book.name}</div>
                    <div class="manage-item-count">단어: ${book.count}개 | 복습: ${book.reviewCount}회</div>
                </div>
            </div>
            <div class="manage-item-actions">
                <button class="manage-rename-btn" data-id="${book.id}">이름 변경</button>
                <button class="manage-delete-btn" data-id="${book.id}">삭제</button>
            </div>
        `;

        // 이름 변경 로직
        item.querySelector('.manage-rename-btn').addEventListener('click', () => {
            const newName = prompt('단어장 이름을 입력하세요:', book.name);
            if (newName && newName.trim() !== '') {
                book.name = newName.trim();
                renderWordbookManageList();
                updateHomeWordbooks();
            }
        });

        // 삭제 로직
        item.querySelector('.manage-delete-btn').addEventListener('click', () => {
            if (confirm(`'${book.name}' 단어장을 삭제하시겠습니까?`)) {
                myWordbooks = myWordbooks.filter(b => b.id !== book.id);
                renderWordbookManageList();
                updateHomeWordbooks();
            }
        });

        wordbookManageList.appendChild(item);
    });
}

if (addNewBookBtn) {
    addNewBookBtn.addEventListener('click', () => {
        const name = prompt('새 단어장 이름을 입력하세요:');
        if (name && name.trim() !== '') {
            const newBook = {
                id: Date.now(),
                name: name.trim(),
                color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
                emoji: '📚',
                count: 0,
                reviewCount: 0
            };
            myWordbooks.push(newBook);
            renderWordbookManageList();
            updateHomeWordbooks();
        }
    });
}

// 홈 화면의 단어장 리스트 동적으로 업데이트하는 함수
function updateHomeWordbooks() {
    const homeWordbookList = document.querySelector('.wordbook-list');
    if (!homeWordbookList) return;

    // 기존 아이템들 삭제
    homeWordbookList.innerHTML = '';

    myWordbooks.forEach(book => {
        const item = document.createElement('div');
        item.className = 'wordbook-item';
        item.style.setProperty('--book-color', book.color);
        item.innerHTML = `
            <div class="wordbook-cover">${book.emoji}</div>
            <span class="wordbook-name">${book.name}</span>
            <span class="wordbook-reviews">${book.reviewCount}회 복습</span>
        `;
        item.addEventListener('click', () => showVocabDetail(book.name));
        homeWordbookList.appendChild(item);
    });
}

// 초기 홈 화면 업데이트 실행
updateHomeWordbooks();

// 단어장 상세 데이터 (샘플)
let currentVocabWords = [];

// ===== 학습 알림 설정 로직 =====

const openNotificationSettingsBtn = document.getElementById('openNotificationSettingsBtn');
const notificationSettingsMode = document.getElementById('notificationSettingsMode');
const backToMyFromNotificationBtn = document.getElementById('backToMyFromNotificationBtn');

if (openNotificationSettingsBtn) {
    openNotificationSettingsBtn.addEventListener('click', () => {
        deactivateAll();
        if (notificationSettingsMode) {
            notificationSettingsMode.classList.add('active');
        }
    });
}

if (backToMyFromNotificationBtn) {
    backToMyFromNotificationBtn.addEventListener('click', () => {
        deactivateAll();
        myNavBtn.classList.add('active');
        myMode.classList.add('active');
    });
}

// 각 토글 및 설정 변경 시 토스트 알림
const notificationToggles = [
    'pushNotificationToggle',
    'dailyMemorizeToggle', 'reviewRecommendationToggle', 'weeklyReportToggle'
];

notificationToggles.forEach(id => {
    const toggle = document.getElementById(id);
    if (toggle) {
        toggle.addEventListener('change', () => {
            const label = toggle.closest('.toggle-setting')?.querySelector('.setting-title')?.textContent || '설정';
            showToast(`${label}이(가) ${toggle.checked ? '활성화' : '비활성화'}되었습니다.`);
        });
    }
});

const nightStartTime = document.getElementById('nightStartTime');
const nightEndTime = document.getElementById('nightEndTime');
const nightTimeRangeArea = document.getElementById('nightTimeRangeArea');
const nightNotificationToggle = document.getElementById('nightNotificationToggle');

if (nightNotificationToggle && nightTimeRangeArea) {
    // 초기 상태 반영
    nightTimeRangeArea.style.opacity = nightNotificationToggle.checked ? '1' : '0.4';
    nightTimeRangeArea.style.pointerEvents = nightNotificationToggle.checked ? 'auto' : 'none';

    nightNotificationToggle.addEventListener('change', () => {
        nightTimeRangeArea.style.opacity = nightNotificationToggle.checked ? '1' : '0.4';
        nightTimeRangeArea.style.pointerEvents = nightNotificationToggle.checked ? 'auto' : 'none';
        showToast(`야간 알림 제한이 ${nightNotificationToggle.checked ? '활성화' : '비활성화'}되었습니다.`);
    });
}

if (nightStartTime) {
    nightStartTime.addEventListener('change', () => {
        showToast(`제한 시작 시간이 ${nightStartTime.value}로 설정되었습니다.`);
    });
}
if (nightEndTime) {
    nightEndTime.addEventListener('change', () => {
        showToast(`제한 종료 시간이 ${nightEndTime.value}로 설정되었습니다.`);
    });
}

const memorizeTimeInput = document.getElementById('memorizeTimeInput');
if (memorizeTimeInput) {
    memorizeTimeInput.addEventListener('change', () => {
        showToast(`알림 시간이 ${memorizeTimeInput.value}로 변경되었습니다.`);
    });
}

// ===== 계정 보안 로직 =====

const openAccountSecurityBtn = document.getElementById('openAccountSecurityBtn');
const accountSecurityMode = document.getElementById('accountSecurityMode');
const backToMyFromSecurityBtn = document.getElementById('backToMyFromSecurityBtn');

if (openAccountSecurityBtn) {
    openAccountSecurityBtn.addEventListener('click', () => {
        deactivateAll();
        if (accountSecurityMode) {
            accountSecurityMode.classList.add('active');
        }
    });
}

if (backToMyFromSecurityBtn) {
    backToMyFromSecurityBtn.addEventListener('click', () => {
        deactivateAll();
        myNavBtn.classList.add('active');
        myMode.classList.add('active');
    });
}

// 비밀번호 변경 버튼
const changePasswordBtn = document.getElementById('changePasswordBtn');
if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', () => {
        const currentPw = prompt('현재 비밀번호를 입력해주세요:');
        if (currentPw) {
            const newPw = prompt('새 비밀번호를 입력해주세요:');
            if (newPw) {
                showToast('비밀번호가 성공적으로 변경되었습니다.');
            }
        }
    });
}

// 로그아웃 버튼
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('정말 로그아웃 하시겠습니까?')) {
            showToast('성공적으로 로그아웃되었습니다.');
            setTimeout(() => location.reload(), 1500);
        }
    });
}

// 2단계 인증 토글
const twoFactorAuthToggle = document.getElementById('twoFactorAuthToggle');
if (twoFactorAuthToggle) {
    twoFactorAuthToggle.addEventListener('change', () => {
        showToast(`2단계 인증이 ${twoFactorAuthToggle.checked ? '설정' : '해제'}되었습니다.`);
    });
}

// ===== 데이터 초기화 로직 =====

const openDataResetBtn = document.getElementById('openDataResetBtn');
const dataResetMode = document.getElementById('dataResetMode');
const backToMyFromResetBtn = document.getElementById('backToMyFromResetBtn');

if (openDataResetBtn) {
    openDataResetBtn.addEventListener('click', () => {
        deactivateAll();
        if (dataResetMode) {
            dataResetMode.classList.add('active');
        }
    });
}

if (backToMyFromResetBtn) {
    backToMyFromResetBtn.addEventListener('click', () => {
        deactivateAll();
        myNavBtn.classList.add('active');
        myMode.classList.add('active');
    });
}

// 개별 초기화 버튼들
const resetWordbookBtn = document.getElementById('resetWordbookBtn');
if (resetWordbookBtn) {
    resetWordbookBtn.addEventListener('click', () => {
        if (confirm('모든 단어장과 저장된 단어가 삭제됩니다. 정말 초기화하시겠습니까?')) {
            myWordbooks = [];
            updateHomeWordbooks();
            showToast('단어장이 초기화되었습니다.');
        }
    });
}

const resetProgressBtn = document.getElementById('resetProgressBtn');
if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', () => {
        if (confirm('학습 진도와 성취도 기록이 모두 삭제됩니다. 정말 초기화하시겠습니까?')) {
            studiedWords = new Set();
            studiedCount.textContent = '0';
            showToast('학습 진도가 초기화되었습니다.');
        }
    });
}

const resetAllDataBtn = document.getElementById('resetAllDataBtn');
if (resetAllDataBtn) {
    resetAllDataBtn.addEventListener('click', () => {
        if (confirm('앱의 모든 데이터가 초기화되며 처음 상태로 돌아갑니다. 이 작업은 되돌릴 수 없습니다. 정말 진행하시겠습니까?')) {
            showToast('모든 데이터를 초기화 중입니다...');
            setTimeout(() => {
                localStorage.clear();
                location.reload();
            }, 2000);
        }
    });
}

// ===== 학습 스트레이크 달력 로직 =====

const streakCalendarModal = document.getElementById('streakCalendarModal');
const openStreakCalendar = document.getElementById('openStreakCalendar');
const closeStreakCalendarModal = document.getElementById('closeStreakCalendarModal');
const calendarMonthTitle = document.getElementById('calendarMonthTitle');
const calendarGrid = document.getElementById('calendarGrid');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let calendarDate = new Date(2026, 2, 1); // 2026년 3월 (Month는 0부터 시작)

function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // 헤더 업데이트
    calendarMonthTitle.textContent = `${year}년 ${month + 1}월`;

    // 그리드 초기화
    calendarGrid.innerHTML = '';

    // 해당 월의 첫 날과 마지막 날 계산
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 오늘 날짜 정보 (2026년 3월 4일 가정)
    const today = new Date(2026, 2, 4);

    // 빈 칸 추가 (첫 주)
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDiv);
    }

    // 일자 추가
    for (let d = 1; d <= lastDate; d++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = d;

        const currentIterDate = new Date(year, month, d);

        // 오늘 날짜 표시
        if (year === today.getFullYear() && month === today.getMonth() && d === today.getDate()) {
            dayDiv.classList.add('today');
        }

        // 학습 완료 및 스트레이크 시뮬레이션 (3월인 경우)
        if (year === 2026 && month === 2) {
            // 3월 1일 ~ 4일 연속 학습 (오늘이 4일이므로 4일 누적)
            if (d <= 4) {
                dayDiv.classList.add('streak-active');
                if (d === 4) dayDiv.classList.add('highlight'); // 오늘 강조
            }
        } else if (year === 2026 && month === 1) {
            // 2월 학습 데이터 시뮬레이션
            const activeDays = [6, 9, 19, 21, 23];
            const streakDays = [12, 13, 16, 17, 26, 27, 28];

            if (activeDays.includes(d)) {
                dayDiv.classList.add('active');
            } else if (streakDays.includes(d)) {
                dayDiv.classList.add('streak-active');
            }
        }

        calendarGrid.appendChild(dayDiv);
    }
}

if (openStreakCalendar) {
    openStreakCalendar.addEventListener('click', () => {
        streakCalendarModal.classList.remove('hidden');
        generateCalendar(calendarDate);
    });
}

if (closeStreakCalendarModal) {
    closeStreakCalendarModal.addEventListener('click', () => {
        streakCalendarModal.classList.add('hidden');
    });
}

streakCalendarModal.addEventListener('click', (e) => {
    if (e.target === streakCalendarModal) {
        streakCalendarModal.classList.add('hidden');
    }
});

if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        generateCalendar(calendarDate);
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        calendarDate.setMonth(calendarDate.getMonth() + 1);
        generateCalendar(calendarDate);
    });
}


// 단어장 상세 화면 표시
function showVocabDetail(bookName) {
    deactivateAll();
    const vocabMode = document.getElementById('vocabularyDetailMode');
    if (!vocabMode) return;

    vocabMode.classList.add('active');
    const titleEl = document.getElementById('currentVocabTitle');
    if (titleEl) titleEl.textContent = bookName;

    // 임의의 정적 데이터 생성 (나중에 실제 데이터 연동)
    const total = bookName === '중요 단어' ? 45 : 30;
    const masteredCount = Math.floor(total * 0.3);
    const learningCount = total - masteredCount;

    document.getElementById('vocabTotalCount').textContent = total;
    document.getElementById('vocabMasteredCount').textContent = masteredCount;
    document.getElementById('vocabLearningCount').textContent = learningCount;

    // 샘플 데이터 구성
    currentVocabWords = [
        { eng: 'abundant', kor: '풍부한, 많은', status: 'mastered' },
        { eng: 'consider', kor: '고려하다, 생각하다', status: 'learning' },
        { eng: 'efficient', kor: '효율적인', status: 'learning' },
        { eng: 'frequent', kor: '빈번한, 자주 일어나는', status: 'new' },
        { eng: 'maintain', kor: '유지하다, 보존하다', status: 'learning' }
    ];

    // 필터 초기화 (전체 선택)
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.filter === 'all');
    });

    renderVocabWords('all');
}

// 필터링된 단어 리스트 렌더링
function renderVocabWords(filterValue) {
    const listContainer = document.getElementById('vocabWordList');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    const filtered = filterValue === 'all'
        ? currentVocabWords
        : currentVocabWords.filter(w => w.status === filterValue);

    filtered.forEach(word => {
        const card = document.createElement('div');
        card.className = 'vocab-word-card';
        card.innerHTML = `
            <div class="word-main-info">
                <div class="word-eng">${word.eng}</div>
                <div class="word-kor">${word.kor}</div>
            </div>
            <div class="word-meta">
                <span class="mastery-tag tag-${word.status}">${word.status === 'mastered' ? 'Mastered' : word.status === 'learning' ? 'Learning' : 'New'}</span>
                <button class="word-speak-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </button>
            </div>
        `;

        card.querySelector('.word-speak-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            speakWord(word.eng);
        });

        listContainer.appendChild(card);
    });
}

// 필터 칩 클릭 이벤트 설정
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        // UI 상태 업데이트
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        // 필터링 적용
        renderVocabWords(chip.dataset.filter);
    });
});

// 홈 화면의 단어장 섹션 "모두보기" 버튼
const viewAllWordbooksBtn = document.querySelector('.home-section:nth-of-type(4) .view-all-btn');
if (viewAllWordbooksBtn) {
    viewAllWordbooksBtn.addEventListener('click', () => {
        deactivateAll();
        myNavBtn.classList.add('active');
        myWordbookManageMode.classList.add('active');
        renderWordbookManageList();
    });
}

// 홈 화면의 "새 목록" 추가 버튼
const addWordbookBtnHome = document.querySelector('.wordbook-item.add-wordbook');
if (addWordbookBtnHome) {
    addWordbookBtnHome.addEventListener('click', () => {
        deactivateAll();
        myNavBtn.classList.add('active');
        myWordbookManageMode.classList.add('active');
        renderWordbookManageList();
    });
}
// 단어장 상세에서 돌아가기
document.getElementById('backFromVocabDetail').addEventListener('click', () => {
    deactivateAll();
    homeNavBtn.classList.add('active');
    homeMode.classList.add('active');
});

// 퀴즈 시작 (스펠링)
document.getElementById('startVocabSpellingQuiz').addEventListener('click', () => {
    const bookName = document.getElementById('currentVocabTitle').textContent;
    startSpellingQuiz(`📚 ${bookName}`, 'wordbook');
});

// 퀴즈 시작 (단어 뜻)
document.getElementById('startVocabWordQuiz').addEventListener('click', () => {
    const bookName = document.getElementById('currentVocabTitle').textContent;
    startWordToMeaningQuiz(`📚 ${bookName}`, 'wordbook');
});

// 암기 시작 버튼 (기본 암기 모드 연동)
document.getElementById('startVocabStudy').addEventListener('click', () => {
    const bookName = document.getElementById('currentVocabTitle').textContent;
    startVocabMemorize(bookName);
});

// ===== 검색 기능 토글 로직 =====
const searchToggleBtn = document.getElementById('searchToggleBtn');
const searchCloseBtn = document.getElementById('searchCloseBtn');
const searchContainer = document.getElementById('searchContainer');

searchToggleBtn.addEventListener('click', () => {
    searchContainer.classList.remove('hidden');
    searchContainer.querySelector('.search-input').focus();
});

searchCloseBtn.addEventListener('click', () => {
    searchContainer.classList.add('hidden');
});

// ===== 즐겨찾기(별표) 클릭 시 단어장 추가 로직 =====
const favoriteBtn = document.getElementById('favoriteBtn');
favoriteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 카드 뒤집기 방지

    // 현재 암기 중인 단어 정보 가져오기
    const word = currentVocabulary && currentVocabulary[currentIndex] ? currentVocabulary[currentIndex] : vocabulary[currentIndex];
    if (word) {
        openWordbookSelector(word.english, word.korean);
    }

    // 시각적 피드백 (잠시 노란색으로 반짝임)
    favoriteBtn.classList.add('favorited');
    const svg = favoriteBtn.querySelector('svg');
    svg.setAttribute('fill', '#ffd700');
    svg.setAttribute('stroke', '#ffd700');

    setTimeout(() => {
        favoriteBtn.classList.remove('favorited');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
    }, 500);
});

// ===== 오디오 재생 로직 (TTS) =====
const audioBtn = document.getElementById('audioBtn');

function speakWord(word) {
    if ('speechSynthesis' in window) {
        // 이전 음성 중단
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.9; // 약간 천천히
        window.speechSynthesis.speak(utterance);
    }
}

audioBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 카드 뒤집기 방지
    const currentWord = englishWord.textContent;
    speakWord(currentWord);

    // 클릭 애니메이션 효과
    audioBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        audioBtn.style.transform = '';
    }, 200);
});

// ===== 암기모드 선택 로직 =====
const memorizeSelection = document.getElementById('memorizeSelection');
const daySelection = document.getElementById('daySelection');
const memorizeContent = document.getElementById('memorizeContent');
const dayGrid = document.getElementById('dayGrid');
const selectedPackTitle = document.getElementById('selectedPackTitle');
const backToPackSelectionBtn = document.getElementById('backToPackSelectionBtn');
const backToDaySelectionBtn = document.getElementById('backToDaySelectionBtn');

let currentPack = 'etymology';
let currentPackTitle = '능률VOCA 어원편 고등';
let currentMemorizeSource = 'pack'; // 'pack' or 'wordbook'

function showPackSelection() {
    memorizeSelection.classList.remove('hidden');
    daySelection.classList.add('hidden');
    memorizeContent.classList.add('hidden');
    currentVocabulary = vocabulary;
}

async function showDaySelection(packName, packTitleText) {
    currentPack = packName;
    currentPackTitle = packTitleText;
    selectedPackTitle.textContent = packTitleText;

    memorizeSelection.classList.add('hidden');
    daySelection.classList.remove('hidden');
    memorizeContent.classList.add('hidden');

    if (packName === 'middle_basic') {
        await loadMiddleBasicCSV();
    }
    generateDayGrid();
}

function generateDayGrid() {
    dayGrid.innerHTML = '';

    const isTrialPack = currentPack === 'etymology';
    const isMiddleBasic = currentPack === 'middle_basic';
    const totalDays = isMiddleBasic && middleBasicByDay
        ? Math.max(...Object.keys(middleBasicByDay).map(Number), 0) || 50
        : 30;

    for (let i = 1; i <= totalDays; i++) {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';

        const isLocked = isTrialPack && i > 1;
        if (isLocked) {
            dayCard.classList.add('locked');
        }

        let completedCount;
        let dayWordCount = 30;
        if (isMiddleBasic && middleBasicByDay && middleBasicByDay[i]) {
            dayWordCount = middleBasicByDay[i].length;
            completedCount = Math.min(Math.floor((i / totalDays) * dayWordCount), dayWordCount);
        } else {
            if (i < 5) completedCount = 30;
            else if (i < 15) completedCount = 25 - (i % 5);
            else if (i < 25) completedCount = 15 - (i % 6);
            else completedCount = 5 - (i % 3);
        }

        const isCompleted = !isLocked && completedCount === dayWordCount;
        if (isCompleted) dayCard.classList.add('completed');

        const percentage = (isLocked ? 0 : (completedCount / dayWordCount)) * 100;

        dayCard.innerHTML = `
            ${isLocked ? '<span class="lock-icon">🔒</span>' : (isCompleted ? '<span class="day-badge">🏅</span>' : '')}
            <div class="day-number">Day ${String(i).padStart(2, '0')}</div>
            <div class="day-stats">${isLocked ? '잠김' : completedCount + '/' + dayWordCount}</div>
            <div class="day-progress-container">
                <div class="day-progress-fill" style="width: ${isLocked ? 0 : percentage}%;"></div>
            </div>
        `;

        dayCard.addEventListener('click', () => {
            if (isLocked) {
                alert("단어팩 구매나 교재 구매인증 후 이용가능합니다");
            } else {
                startMemorize(i);
            }
        });

        dayGrid.appendChild(dayCard);
    }
}

function startMemorize(dayNum, source = 'pack') {
    currentMemorizeSource = source;
    daySelection.classList.add('hidden');
    memorizeContent.classList.remove('hidden');

    if (source === 'pack') {
        const packTitleText = document.getElementById('selectedPackTitle').textContent;
        document.getElementById('memorizePackTitle').textContent = packTitleText;
        if (currentPack === 'middle_basic' && middleBasicByDay && middleBasicByDay[dayNum]) {
            currentVocabulary = middleBasicByDay[dayNum];
        } else {
            currentVocabulary = vocabulary;
        }
        console.log(`${currentPack} - Day ${dayNum} 학습 시작`);
    } else {
        currentVocabulary = vocabulary;
    }

    studiedWords.clear();
    currentIndex = 0;
    updateCard();
}

function startVocabMemorize(bookName) {
    deactivateAll();
    memorizeNavBtn.classList.add('active');
    memorizeMode.classList.add('active');

    currentMemorizeSource = 'wordbook';
    memorizeSelection.classList.add('hidden');
    memorizeContent.classList.remove('hidden');

    document.getElementById('memorizePackTitle').textContent = bookName;

    currentVocabulary = vocabulary;
    currentIndex = 0;
    updateCard();
}

// 단어팩 버튼 이벤트들
document.querySelectorAll('.memorize-pack-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const pack = btn.dataset.pack;
        const packTitle = btn.querySelector('.pack-title').textContent;
        showDaySelection(pack, packTitle);
    });
});

backToPackSelectionBtn.addEventListener('click', showPackSelection);
backToDaySelectionBtn.addEventListener('click', () => {
    if (currentMemorizeSource === 'wordbook') {
        deactivateAll();
        vocabularyDetailMode.classList.add('active');
    } else {
        daySelection.classList.remove('hidden');
        memorizeContent.classList.add('hidden');
    }
    currentVocabulary = vocabulary;
});

// ===== PIN 인증 모달 로직 =====
const pinModal = document.getElementById('pinModal');
const enterPinBtn = document.getElementById('enterPinBtn');
const wordPackBtn = document.getElementById('wordPackBtn');
const backToStoreBtn = document.getElementById('backToStoreBtn');
const closePinModal = document.getElementById('closePinModal');
const verifyPinBtn = document.getElementById('verifyPinBtn');
const pinInput = document.getElementById('pinInput');
const pinErrorMessage = document.getElementById('pinErrorMessage');

// 단어팩 버튼 클릭 시 목록 표시
wordPackBtn.addEventListener('click', () => {
    storeMode.classList.remove('active');
    wordPackMode.classList.add('active');
});

// 단어팩 목록에서 돌아가기
backToStoreBtn.addEventListener('click', () => {
    wordPackMode.classList.remove('active');
    storeMode.classList.add('active');
});

// PIN 모달 열기 함수
function openPinModal() {
    pinModal.classList.remove('hidden');
    pinInput.focus();
}

enterPinBtn.addEventListener('click', openPinModal);

// 단어팩 목록 내의 버튼 클릭 이벤트 (이벤트 위임 사용)
document.addEventListener('click', (e) => {
    // PIN 인증 버튼
    if (e.target.classList.contains('pack-pin-btn')) {
        openPinModal();
    }
    // 구매하기 버튼
    else if (e.target.classList.contains('pack-buy-btn')) {
        const packTitle = e.target.closest('.word-pack-card').querySelector('.pack-title').textContent;
        alert(`[${packTitle}] 구매 페이지로 이동합니다.\n(현재는 준비 중인 기능입니다.)`);
    }
    // 1Day 체험 버튼
    else if (e.target.classList.contains('pack-trial-btn')) {
        const packTitle = e.target.closest('.word-pack-card').querySelector('.pack-title').textContent;
        alert(`[${packTitle}] 1일 체험이 시작되었습니다!\n오늘 하루 동안 모든 단어를 학습할 수 있습니다.`);
    }
});

closePinModal.addEventListener('click', () => {
    pinModal.classList.add('hidden');
    pinInput.value = '';
    pinErrorMessage.textContent = '';
});

// 모달 외부 클릭 시 닫기
pinModal.addEventListener('click', (e) => {
    if (e.target === pinModal) {
        closePinModal.click();
    }
});

verifyPinBtn.addEventListener('click', () => {
    const pin = pinInput.value;
    if (pin.length !== 8) {
        pinErrorMessage.textContent = '인증코드 8자리를 입력해주세요.';
        return;
    }

    // 준비 중인 기능 피드백
    alert(`입력하신 코드 [${pin}]는 확인 중입니다.\n이 기능은 현재 준비 중입니다.`);
    closePinModal.click();
});

// 입력 필드 엔터 키 이벤트
pinInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        verifyPinBtn.click();
    }
});

// ===== 학습모드 관련 변수 및 로직 =====
let currentQuizType = null;
let currentQuizSource = 'selection'; // 'selection' or 'day'
let quizIndex = 0;
let quizScore = 0;
let currentAnswer = '';
let blankedPositions = [];
let sentenceQuizStates = []; // 문장 퀴즈의 각 문제 상태 저장
let spellingQuizStates = []; // 스펠링 퀴즈의 각 문제 상태 저장
let wordToMeaningQuizStates = []; // 뜻 찾기 퀴즈의 각 문제 상태 저장
let countdownInterval = null; // 카운트다운 인터벌
let isQuizAutoPlayEnabled = true;

// 오디오 토글 상태 업데이트 함수
function updateQuizAudioToggleUI() {
    const toggles = [
        document.getElementById('spellingAutoplayToggle'),
        document.getElementById('sentenceAutoplayToggle'),
        document.getElementById('wordToMeaningAutoplayToggle'),
        document.getElementById('memorizeAutoplayToggle')
    ];
    toggles.forEach(checkbox => {
        if (checkbox) {
            checkbox.checked = isQuizAutoPlayEnabled;
        }
    });
}

// 토글 버튼 리스너
document.getElementById('spellingAutoplayToggle').addEventListener('change', (e) => {
    isQuizAutoPlayEnabled = e.target.checked;
    updateQuizAudioToggleUI();
});

document.getElementById('sentenceAutoplayToggle').addEventListener('change', (e) => {
    isQuizAutoPlayEnabled = e.target.checked;
    updateQuizAudioToggleUI();
});

document.getElementById('memorizeAutoplayToggle').addEventListener('change', (e) => {
    isQuizAutoPlayEnabled = e.target.checked;
    updateQuizAudioToggleUI();
});

document.getElementById('wordToMeaningAutoplayToggle').addEventListener('change', (e) => {
    isQuizAutoPlayEnabled = e.target.checked;
    updateQuizAudioToggleUI();
});

// 퀴즈 선택 화면 표시
function showQuizSelection(keepExpanded = false) {
    document.getElementById('studyCurrentPackName').textContent = currentPackTitle || "능률VOCA 어원편 고등";

    // 선택된 패키지 하이라이트 표시 업데이트
    document.querySelectorAll('.pack-select-btn').forEach(btn => {
        if (btn.dataset.pack === currentPack) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });

    document.getElementById('quizSelection').style.display = 'block';
    document.getElementById('studyPackSelection').classList.add('hidden');
    document.getElementById('spellingQuiz').classList.add('hidden');
    document.getElementById('sentenceQuiz').classList.add('hidden');
    document.getElementById('wordToMeaningQuiz').classList.add('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('assignmentSection').classList.add('hidden');
    document.getElementById('studyDaySelection').classList.add('hidden');

    // 확장 상태 관리
    if (!keepExpanded) {
        document.querySelectorAll('.quiz-option-card').forEach(card => {
            card.classList.remove('expanded');
        });
    }
}

// 학습 탭 단어팩 선택 화면
function showStudyPackSelection() {
    document.getElementById('quizSelection').style.display = 'none';
    const studyPackSelection = document.getElementById('studyPackSelection');
    studyPackSelection.classList.remove('hidden');

    const studyPackList = document.getElementById('studyPackList');
    studyPackList.innerHTML = '';

    // 보유한 단어팩 리스트 (암기 탭의 데이터와 동일하게 구성)
    const packs = [
        { id: 'middle_basic', title: '능률VOCA 중등 기본', thumb: 'assets/middle_basic_voca_thumb.png', progress: '11 / 40 Day' },
        { id: 'middle', title: '능률VOCA 어원편 중등', thumb: 'assets/middle_voca_thumb.png', progress: '15 / 60 Day' },
        { id: 'etymology', title: '능률VOCA 어원편 고등', thumb: 'assets/etymology_voca_thumb.png', progress: '40 / 80 Day' },
        { id: 'sat', title: '능률VOCA 수능 필수', thumb: 'assets/sat_voca_thumb.png', progress: '5 / 100 Day' },
        { id: 'package_sat', title: '내신+수능대비 패키지', thumb: 'assets/sat_voca_thumb.png', progress: '0 / 180 Day' }
    ];

    packs.forEach(pack => {
        const card = document.createElement('div');
        card.className = 'word-pack-card';
        card.innerHTML = `
            <div class="pack-thumbnail">
                <img src="${pack.thumb}" alt="${pack.title}">
            </div>
            <div class="word-pack-content">
                <div class="pack-title">${pack.title}</div>
                <div class="pack-stat-item">
                    <span class="stat-label">진행도</span>
                    <span class="stat-value">${pack.progress}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            currentPack = pack.id;
            currentPackTitle = pack.title;
            showQuizSelection();
        });
        studyPackList.appendChild(card);
    });
}

// 학습 탭 내 이벤트 리스너 추가 (단어팩 아코디언 메뉴 클릭)
document.querySelectorAll('.pack-select-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentPack = btn.dataset.pack;
        currentPackTitle = btn.querySelector('.sub-title').textContent;
        document.getElementById('studyCurrentPackName').textContent = currentPackTitle;

        // 선택된 상태 UI 업데이트
        document.querySelectorAll('.pack-select-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // 카드 닫기
        document.getElementById('currentPackCard').classList.remove('expanded');
    });
});
document.getElementById('backToQuizFromPackBtn').addEventListener('click', () => {
    showQuizSelection();
});

// 스펠링 퀴즈 토글
// 퀴즈 카드 토글 설정
const quizCards = [
    { toggleId: 'currentPackToggle', cardId: 'currentPackCard' },
    { toggleId: 'spellingQuizToggle', cardId: 'spellingQuizCard' },
    { toggleId: 'wordMeaningQuizToggle', cardId: 'wordMeaningQuizCard' },
    { toggleId: 'sentenceQuizToggle', cardId: 'sentenceQuizCard' }
];

quizCards.forEach(({ toggleId, cardId }) => {
    const toggle = document.getElementById(toggleId);
    const card = document.getElementById(cardId);
    if (toggle && card) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = card.classList.contains('expanded');

            // 다른 카드 닫기
            document.querySelectorAll('.quiz-option-card').forEach(c => {
                if (c.id !== cardId) c.classList.remove('expanded');
            });

            card.classList.toggle('expanded', !isExpanded);
        });
    }
});

// 스펠링 퀴즈 시작 (기본 로직 추출)
function startSpellingQuiz(modeTitle, source = 'selection') {
    deactivateAll();
    currentQuizType = 'spelling';
    currentQuizSource = source;
    quizIndex = 0;
    quizScore = 0;
    sentenceQuizStates = [];
    spellingQuizStates = [];
    if (countdownInterval) clearInterval(countdownInterval);

    // 서브 메뉴 타이틀 업데이트
    const display = document.getElementById('spellingSubModeDisplay');
    if (display) display.textContent = modeTitle || '';

    studyMode.classList.add('active');
    document.getElementById('quizSelection').style.display = 'none';
    document.getElementById('spellingQuiz').classList.remove('hidden');
    loadSpellingQuestion();
}

// 문장 퀴즈 시작
function startSentenceQuiz(modeTitle, source = 'selection') {
    deactivateAll();
    currentQuizType = 'sentence';
    currentQuizSource = source;
    quizIndex = 0;
    quizScore = 0;
    sentenceQuizStates = [];
    spellingQuizStates = [];
    wordToMeaningQuizStates = [];
    if (countdownInterval) clearInterval(countdownInterval);

    const display = document.getElementById('sentenceSubModeDisplay');
    if (display) display.textContent = modeTitle || '';

    studyMode.classList.add('active');
    document.getElementById('quizSelection').style.display = 'none';
    document.getElementById('sentenceQuiz').classList.remove('hidden');
    loadSentenceQuestion();
}

// 뜻 찾기 퀴즈 시작
function startWordToMeaningQuiz(modeTitle, source = 'selection') {
    deactivateAll();
    currentQuizType = 'wordToMeaning';
    currentQuizSource = source;
    quizIndex = 0;
    quizScore = 0;
    spellingQuizStates = [];
    sentenceQuizStates = [];
    wordToMeaningQuizStates = [];
    if (countdownInterval) clearInterval(countdownInterval);

    const display = document.getElementById('wordMeaningSubModeDisplay');
    if (display) display.textContent = modeTitle || '';

    studyMode.classList.add('active');
    document.getElementById('quizSelection').style.display = 'none';
    document.getElementById('wordToMeaningQuiz').classList.remove('hidden');
    loadWordToMeaningQuestion();
}

// 과제학습 시작
document.getElementById('assignmentQuizBtn').addEventListener('click', () => {
    document.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('expanded'));
    showAssignmentLearning();
});

// 서브 메뉴 클릭 이벤트
document.querySelectorAll('.sub-menu-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = btn.dataset.type;
        const mode = btn.dataset.mode;
        const modeTitle = btn.querySelector('.sub-title').textContent;

        if (mode === 'select-day') {
            showStudyDaySelection(type);
        } else {
            console.log(`Starting ${type} quiz in ${mode} mode`);
            if (type === 'spelling') startSpellingQuiz(modeTitle, 'selection');
            else if (type === 'wordToMeaning') startWordToMeaningQuiz(modeTitle, 'selection');
            else if (type === 'sentence') startSentenceQuiz(modeTitle, 'selection');
        }
    });
});

function showStudyDaySelection(type) {
    document.getElementById('quizSelection').style.display = 'none';
    document.getElementById('spellingQuiz').classList.add('hidden');
    document.getElementById('sentenceQuiz').classList.add('hidden');
    document.getElementById('wordToMeaningQuiz').classList.add('hidden');

    const selection = document.getElementById('studyDaySelection');
    selection.classList.remove('hidden');

    // 타이틀 업데이트
    const title = selection.querySelector('.quiz-title');
    const packPrefix = `[${currentPackTitle}] `;
    if (type === 'spelling') title.textContent = packPrefix + '스펠링 퀴즈: Day 선택';
    else if (type === 'wordToMeaning') title.textContent = packPrefix + '단어 퀴즈: Day 선택';
    else if (type === 'sentence') title.textContent = packPrefix + '문장 퀴즈: Day 선택';

    generateStudyDayGrid(type);
}

function generateStudyDayGrid(type) {
    const grid = document.getElementById('studyDayGrid');
    grid.innerHTML = '';

    for (let i = 1; i <= 30; i++) {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';

        // 고정 데이터 (나중에 DB 연동 시 변경)
        let completedCount;
        if (i < 8) completedCount = 30;
        else if (i < 20) completedCount = 22 - (i % 7);
        else completedCount = 12 - (i % 5);
        const isCompleted = completedCount === 30;
        if (isCompleted) dayCard.classList.add('completed');
        const percentage = (completedCount / 30) * 100;

        dayCard.innerHTML = `
            ${isCompleted ? '<span class="day-badge">🏅</span>' : ''}
            <div class="day-number">Day ${i}</div>
            <div class="day-stats">${completedCount}/30</div>
            <div class="day-progress-container">
                <div class="day-progress-fill" style="width: ${percentage}%;"></div>
            </div>
        `;

        dayCard.addEventListener('click', () => {
            document.getElementById('studyDaySelection').classList.add('hidden');
            if (type === 'spelling') startSpellingQuiz(`Day ${i}`, 'day');
            else if (type === 'wordToMeaning') startWordToMeaningQuiz(`Day ${i}`, 'day');
            else if (type === 'sentence') startSentenceQuiz(`Day ${i}`, 'day');
        });

        grid.appendChild(dayCard);
    }
}

// 퀴즈용 Day 선택에서 뒤로가기
document.getElementById('studyDayToQuizSelectionBtn').addEventListener('click', () => {
    document.getElementById('studyDaySelection').classList.add('hidden');
    document.getElementById('quizSelection').style.display = 'block';
});

function showAssignmentLearning() {
    deactivateAll();
    studyMode.classList.add('active');
    document.getElementById('quizSelection').style.display = 'none';
    document.getElementById('assignmentSection').classList.remove('hidden');
    renderAssignments();
}

function renderAssignments() {
    const assignmentList = document.getElementById('assignmentList');
    assignmentList.innerHTML = '';

    const assignments = [
        {
            id: 1,
            title: "능률VOCA 어원편 12-15일차 복습",
            teacher: "김철수 선생님",
            dueDate: "D-2 (02.25까지)",
            progress: 40,
            status: "in-progress"
        },
        {
            id: 2,
            title: "주간 핵심 단어 100선 테스트",
            teacher: "이영희 선생님",
            dueDate: "D-5 (02.28까지)",
            progress: 0,
            status: "ready"
        },
        {
            id: 3,
            title: "2월 2주차 보충 과제 (어근 위주)",
            teacher: "박지민 선생님",
            dueDate: "D-0 (오늘 마감)",
            progress: 100,
            status: "completed"
        }
    ];

    // 요약 정보 업데이트
    document.getElementById('totalAssignments').textContent = assignments.length;
    document.getElementById('pendingAssignments').textContent = assignments.filter(a => a.status !== 'completed').length;
    document.getElementById('completedAssignments').textContent = assignments.filter(a => a.status === 'completed').length;

    assignments.forEach(task => {
        const card = document.createElement('div');
        card.className = 'assignment-card';

        const isCompleted = task.status === 'completed';
        const buttonText = isCompleted ? '완료됨' : (task.progress > 0 ? '이어하기' : '시작하기');

        card.innerHTML = `
            <div class="assignment-info">
                <div class="assignment-header">
                    <span class="teacher-tag">${task.teacher}</span>
                    <span class="due-date" style="${task.dueDate.includes('오늘') ? 'color: #ff4d4d;' : ''}">${task.dueDate}</span>
                </div>
                <h4 class="assignment-title">${task.title}</h4>
                <div class="assignment-progress">
                    <div class="progress-bar-mini">
                        <div class="progress-fill-mini" style="width: ${task.progress}%; ${isCompleted ? 'background: #4facfe;' : ''}"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="progress-text">${task.progress}% 완료</span>
                        ${isCompleted ? '<span style="color: #4facfe; font-size: 0.8rem; font-weight: 700;">Excellent!</span>' : ''}
                    </div>
                </div>
            </div>
            <button class="start-assignment-btn ${isCompleted ? 'completed' : ''}" ${isCompleted ? 'disabled' : ''}>
                ${buttonText}
            </button>
        `;

        if (!isCompleted) {
            card.querySelector('.start-assignment-btn').addEventListener('click', () => {
                alert(`[${task.title}] 과제를 시작합니다!`);
            });
        }

        assignmentList.appendChild(card);
    });
}

document.getElementById('backFromAssignment').addEventListener('click', () => {
    document.getElementById('assignmentSection').classList.add('hidden');
    document.getElementById('quizSelection').style.display = 'block';
});

// 스펠링 퀴즈 로드
function loadSpellingQuestion() {
    if (quizIndex >= vocabulary.length) {
        showResults();
        return;
    }

    // 퀴즈 상태 초기화 (첫 시작 시)
    if (spellingQuizStates.length === 0) {
        spellingQuizStates = vocabulary.map(word => {
            const wordLower = word.english.toLowerCase();
            const numBlanks = Math.min(Math.floor(wordLower.length / 2), 3);
            const availablePositions = Array.from({ length: wordLower.length }, (_, i) => i);
            const blankedPositions = [];
            for (let i = 0; i < numBlanks; i++) {
                const randomIndex = Math.floor(Math.random() * availablePositions.length);
                blankedPositions.push(availablePositions[randomIndex]);
                availablePositions.splice(randomIndex, 1);
            }
            blankedPositions.sort((a, b) => a - b);

            return {
                isCorrect: false,
                blankedPositions: blankedPositions,
                currentAnswer: '',
                currentBlankIndex: 0
            };
        });
    }

    const word = vocabulary[quizIndex];
    const wordLower = word.english.toLowerCase();
    const state = spellingQuizStates[quizIndex];

    // UI 업데이트
    const dummyFailures = (word.english.length * 7) % 5;
    document.getElementById('spellingFailureCount').textContent = `${dummyFailures}번 틀림`;
    document.getElementById('spellingMeaning').textContent = word.korean;
    document.getElementById('spellingProgress').textContent = `${quizIndex + 1}/10`;
    document.getElementById('spellingFeedback').textContent = state.isCorrect ? '✅ 정답입니다!' : '';
    document.getElementById('spellingFeedback').className = state.isCorrect ? 'quiz-feedback correct' : 'quiz-feedback';
    document.getElementById('spellingCountdown').classList.add('hidden');

    if (countdownInterval) clearInterval(countdownInterval);

    // 자동 소리 재생
    if (isQuizAutoPlayEnabled && !state.isCorrect) {
        speakWord(word.english);
    }
    updateQuizAudioToggleUI();

    // 버튼 상태
    document.getElementById('spellingPrevBtn').disabled = quizIndex === 0;
    document.getElementById('spellingNextBtn').disabled = !state.isCorrect;

    // 단어 표시 구성
    let displayWord = '';
    for (let i = 0; i < wordLower.length; i++) {
        if (state.blankedPositions.includes(i)) {
            if (state.isCorrect || state.currentBlankIndex > state.blankedPositions.indexOf(i)) {
                displayWord += wordLower[i];
            } else {
                displayWord += '_';
            }
        } else {
            displayWord += wordLower[i];
        }
    }
    document.getElementById('spellingDisplay').textContent = displayWord;

    // 수동 오디오 재생 리스너 추가/업데이트
    const manualBtn = document.getElementById('spellingManualAudioBtn');
    if (manualBtn) {
        manualBtn.onclick = (e) => {
            e.stopPropagation();
            speakWord(word.english);
        };
    }

    // 글자 옵션 생성 (정답 글자 + 더미 글자)
    const correctLetters = state.blankedPositions.map(pos => wordLower[pos]);
    const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const dummyLetters = [];
    while (dummyLetters.length < 4) {
        const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
        if (!correctLetters.includes(randomLetter) && !dummyLetters.includes(randomLetter)) {
            dummyLetters.push(randomLetter);
        }
    }
    const letterOptions = [...correctLetters, ...dummyLetters].sort(() => Math.random() - 0.5);

    const letterOptionsContainer = document.getElementById('letterOptions');
    letterOptionsContainer.innerHTML = '';

    letterOptions.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        if (state.isCorrect) btn.classList.add('used');
        btn.textContent = letter;

        btn.addEventListener('click', () => {
            if (state.isCorrect || btn.classList.contains('used')) return;

            // 오답 피드백 초기화
            const feedback = document.getElementById('spellingFeedback');
            if (feedback.textContent.includes('틀렸습니다')) {
                feedback.textContent = '';
                feedback.className = 'quiz-feedback';
            }

            const correctLetter = wordLower[state.blankedPositions[state.currentBlankIndex]];

            if (letter === correctLetter) {
                btn.classList.add('correct');
                btn.classList.add('used');
                state.currentAnswer += letter;
                state.currentBlankIndex++;

                // 빈칸 채우기 업데이트
                let newDisplay = '';
                let tempIdx = 0;
                for (let i = 0; i < wordLower.length; i++) {
                    if (state.blankedPositions.includes(i)) {
                        if (tempIdx < state.currentBlankIndex) {
                            newDisplay += wordLower[i];
                        } else {
                            newDisplay += '_';
                        }
                        tempIdx++;
                    } else {
                        newDisplay += wordLower[i];
                    }
                }
                document.getElementById('spellingDisplay').textContent = newDisplay;

                if (state.currentBlankIndex === state.blankedPositions.length) {
                    state.isCorrect = true;
                    document.getElementById('spellingFeedback').textContent = '✅ 정답입니다!';
                    document.getElementById('spellingFeedback').className = 'quiz-feedback correct';
                    document.getElementById('spellingNextBtn').disabled = false;
                    quizScore++;
                    startSpellingCountdown();
                }
            } else {
                btn.classList.add('wrong');
                document.getElementById('spellingFeedback').textContent = '❌ 틀렸습니다!';
                document.getElementById('spellingFeedback').className = 'quiz-feedback wrong';
                setTimeout(() => {
                    btn.classList.remove('wrong');
                    document.getElementById('spellingFeedback').textContent = '';
                }, 1000);
            }
        });
        letterOptionsContainer.appendChild(btn);
    });
}

function startSpellingCountdown() {
    const countdownEl = document.getElementById('spellingCountdown');
    countdownEl.classList.remove('hidden');
    let count = 3;
    countdownEl.textContent = count;

    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
        } else {
            clearInterval(countdownInterval);
            countdownEl.classList.add('hidden');
            if (quizIndex < vocabulary.length - 1) {
                quizIndex++;
                loadSpellingQuestion();
            } else {
                showResults();
            }
        }
    }, 1000);
}

// 스펠링 네비게이션
document.getElementById('spellingPrevBtn').addEventListener('click', () => {
    if (countdownInterval) clearInterval(countdownInterval);
    if (quizIndex > 0) {
        quizIndex--;
        loadSpellingQuestion();
    }
});

document.getElementById('spellingNextBtn').addEventListener('click', () => {
    if (countdownInterval) clearInterval(countdownInterval);
    if (quizIndex < vocabulary.length - 1) {
        quizIndex++;
        loadSpellingQuestion();
    } else {
        showResults();
    }
});

// 문장 퀴즈 로드
function loadSentenceQuestion() {
    if (quizIndex >= vocabulary.length) {
        showResults();
        return;
    }

    // 퀴즈 상태 초기화 (첫 시작 시)
    if (sentenceQuizStates.length === 0) {
        sentenceQuizStates = vocabulary.map(word => {
            const sentence = word.example;
            const words = sentence.match(/\b[\w']+\b|[.,!?;]/g);
            return {
                isCorrect: false,
                constructedWords: [], // 인덱스 배열로 저장
                shuffledWords: [...words].sort(() => Math.random() - 0.5),
                originalWords: words
            };
        });
    }

    const word = vocabulary[quizIndex];
    const state = sentenceQuizStates[quizIndex];
    const words = state.originalWords;

    // UI 업데이트
    const dummyFailures = (word.english.length * 3) % 4;
    document.getElementById('sentenceFailureCount').textContent = `${dummyFailures}번 틀림`;
    document.getElementById('sentenceHint').textContent = `${word.english} - ${word.korean}`;
    document.getElementById('sentenceQuizTranslation').textContent = word.exampleKorean;
    document.getElementById('sentenceProgress').textContent = `${quizIndex + 1}/10`;
    document.getElementById('sentenceFeedback').textContent = state.isCorrect ? '✅ 정답입니다!' : '';
    document.getElementById('sentenceFeedback').className = state.isCorrect ? 'quiz-feedback correct' : 'quiz-feedback';

    // 자동 소리 재생
    if (isQuizAutoPlayEnabled && !state.isCorrect) {
        speakWord(words.join(' '));
    }
    updateQuizAudioToggleUI();

    const constructionArea = document.getElementById('sentenceConstruction');
    const wordPool = document.getElementById('wordPool');
    const sentenceAudioBtn = document.getElementById('sentenceAudioBtn');
    const sentenceResultAudioBtn = document.getElementById('sentenceResultAudioBtn');
    const sentenceResult = document.getElementById('sentenceResult');
    const aiSpeakingBtn = document.getElementById('aiSpeakingBtn');

    constructionArea.innerHTML = '';
    constructionArea.classList.toggle('empty', state.constructedWords.length === 0);
    wordPool.innerHTML = '';

    // 정답일 경우 단어 풀 숨기기 및 정리
    if (state.isCorrect) {
        wordPool.classList.add('hidden');
        constructionArea.style.border = 'none';
        constructionArea.style.background = 'transparent';
    } else {
        wordPool.classList.remove('hidden');
        constructionArea.style.border = '';
        constructionArea.style.background = '';
    }

    // 정답 결과 텍스트 처리
    if (state.isCorrect) {
        sentenceResult.textContent = words.join(' ');
        sentenceResult.classList.remove('hidden');
        if (sentenceResultAudioBtn) sentenceResultAudioBtn.classList.remove('hidden');
        aiSpeakingBtn.classList.remove('hidden');
    } else {
        sentenceResult.textContent = '';
        sentenceResult.classList.add('hidden');
        if (sentenceResultAudioBtn) sentenceResultAudioBtn.classList.add('hidden');
        aiSpeakingBtn.classList.add('hidden');
    }

    // 버튼 상태 업데이트
    document.getElementById('sentencePrevBtn').disabled = quizIndex === 0;
    document.getElementById('sentenceNextBtn').disabled = state.isCorrect ? false : true;

    // 단어 칩 생성 및 배치
    state.shuffledWords.forEach((w, index) => {
        const chip = document.createElement('div');
        chip.className = 'word-chip';
        chip.textContent = w;
        chip.dataset.word = w;
        chip.dataset.index = index; // 원래 shuffledWords에서의 인덱스

        // 이미 배치된 단어인지 확인 (constructedWords는 shuffledWords의 인덱스를 저장)
        if (state.constructedWords.includes(index)) {
            chip.classList.add('placed');
            constructionArea.appendChild(chip);
        } else {
            wordPool.appendChild(chip);
        }

        chip.addEventListener('click', () => {
            if (state.isCorrect) return; // 정답 맞춘 후에는 수정 불가

            if (chip.classList.contains('placed')) {
                // 문장 영역에서 단어 풀로 되돌리기
                chip.classList.remove('placed');
                wordPool.appendChild(chip);
                const idx = state.constructedWords.indexOf(index); // 인덱스로 찾기
                if (idx > -1) state.constructedWords.splice(idx, 1);
            } else {
                // 단어 풀에서 문장 영역으로 이동
                chip.classList.add('placed');
                constructionArea.appendChild(chip);
                state.constructedWords.push(index); // shuffledWords의 인덱스 저장
                constructionArea.classList.remove('empty');
            }

            // 오답 메시지 초기화
            const feedback = document.getElementById('sentenceFeedback');
            if (feedback.textContent.includes('틀렸습니다')) {
                feedback.textContent = '';
                feedback.className = 'quiz-feedback';
            }

            // 모든 단어를 선택했으면 확인 버튼 표시
            if (state.constructedWords.length === words.length) {
                document.getElementById('checkSentenceBtn').classList.remove('hidden');
            } else {
                document.getElementById('checkSentenceBtn').classList.add('hidden');
            }
        });
    });

    // 정답 확인 버튼
    const checkBtn = document.getElementById('checkSentenceBtn');

    // 초기 렌더링 시 확인 버튼 상태
    if (!state.isCorrect && state.constructedWords.length === words.length) {
        checkBtn.classList.remove('hidden');
    } else {
        checkBtn.classList.add('hidden');
    }

    // 수동 오디오 재생 리스너
    const playCorrectSentence = (e) => {
        if (e) e.stopPropagation();
        const correctSentence = words.join(' ');
        speakWord(correctSentence);
    };

    sentenceAudioBtn.onclick = playCorrectSentence;
    if (sentenceResultAudioBtn) sentenceResultAudioBtn.onclick = playCorrectSentence;

    aiSpeakingBtn.onclick = (e) => {
        e.stopPropagation();
        const state = sentenceQuizStates[quizIndex];
        const currentSentence = state ? state.originalWords.join(' ') : "";
        const currentTranslation = vocabulary[quizIndex] ? vocabulary[quizIndex].exampleKorean : "";
        startAiSpeaking(currentSentence, currentTranslation);
    };

    checkBtn.onclick = () => {
        // 현재 constructionArea에 있는 칩들의 텍스트를 순서대로 가져와 문장 구성
        const constructedSentence = Array.from(constructionArea.children)
            .map(chip => chip.textContent)
            .join(' ');

        const correctSentence = words.join(' ');

        if (constructedSentence === correctSentence) {
            document.getElementById('sentenceFeedback').textContent = '✅ 정답입니다!';
            document.getElementById('sentenceFeedback').className = 'quiz-feedback correct';

            state.isCorrect = true; // 정답 상태 업데이트

            // 정답 문장 표시
            sentenceResult.textContent = correctSentence;
            sentenceResult.classList.remove('hidden');
            if (sentenceResultAudioBtn) sentenceResultAudioBtn.classList.remove('hidden');

            speakWord(correctSentence);
            aiSpeakingBtn.classList.remove('hidden');
            checkBtn.classList.add('hidden'); // 정답 맞추면 확인 버튼 숨김
            document.getElementById('sentenceNextBtn').disabled = false; // 다음 버튼 활성화

            quizScore++;
        } else {
            document.getElementById('sentenceFeedback').textContent = '❌ 틀렸습니다. 다시 시도하세요!';
            document.getElementById('sentenceFeedback').className = 'quiz-feedback wrong';
        }
    };
}

// 네비게이션 버튼 리스너
document.getElementById('sentencePrevBtn').addEventListener('click', () => {
    if (quizIndex > 0) {
        quizIndex--;
        loadSentenceQuestion();
    }
});

document.getElementById('sentenceNextBtn').addEventListener('click', () => {
    if (quizIndex < vocabulary.length - 1) {
        quizIndex++;
        loadSentenceQuestion();
    } else {
        showResults();
    }
});

// 뜻 찾기 퀴즈 로드
function loadWordToMeaningQuestion() {
    if (quizIndex >= vocabulary.length) {
        showResults();
        return;
    }

    // 상태 초기화
    if (wordToMeaningQuizStates.length === 0) {
        wordToMeaningQuizStates = vocabulary.map(word => {
            // 다른 3개의 오답 영어 단어 가져오기
            const otherWords = vocabulary
                .filter(v => v.english !== word.english)
                .map(v => v.english);

            const shuffledOthers = otherWords.sort(() => Math.random() - 0.5);
            const selectedOthers = shuffledOthers.slice(0, 3);

            const options = [word.english, ...selectedOthers].sort(() => Math.random() - 0.5);

            return {
                isCorrect: false,
                options: options,
                selectedOption: null
            };
        });
    }

    const word = vocabulary[quizIndex];
    const state = wordToMeaningQuizStates[quizIndex];

    // UI 업데이트
    const dummyFailures = (word.english.length * 9) % 6;
    document.getElementById('meaningFailureCount').textContent = `${dummyFailures}번 틀림`;
    document.getElementById('wordToMeaningWord').textContent = word.korean; // 뜻 표시
    document.getElementById('wordToMeaningProgress').textContent = `${quizIndex + 1}/${vocabulary.length}`;
    document.getElementById('wordToMeaningFeedback').textContent = state.isCorrect ? '✅ 정답입니다!' : '';
    document.getElementById('wordToMeaningFeedback').className = state.isCorrect ? 'quiz-feedback correct' : 'quiz-feedback';

    // 소리 재생 (뜻을 보고 단어를 맞추는 것이므로, 정답을 맞췄을 때 소리를 들려주는 것이 자연스러움)
    // 혹은 문제 진입 시에는 소리를 안 들려주는 게 맞을 수도 있음 (힌트가 되니까)
    updateQuizAudioToggleUI();

    const optionsContainer = document.getElementById('meaningOptions');
    optionsContainer.innerHTML = '';

    state.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'meaning-option-btn';
        if (state.isCorrect && option === word.english) btn.classList.add('correct');
        else if (state.isCorrect && option === state.selectedOption && option !== word.english) btn.classList.add('wrong');

        btn.textContent = option;

        btn.addEventListener('click', () => {
            if (state.isCorrect) return;

            state.selectedOption = option;
            if (option === word.english) {
                state.isCorrect = true;
                btn.classList.add('correct');
                document.getElementById('wordToMeaningFeedback').textContent = '✅ 정답입니다!';
                document.getElementById('wordToMeaningFeedback').className = 'quiz-feedback correct';
                quizScore++;
                speakWord(word.english); // 정답 시 발음 들려주기
                document.getElementById('wordToMeaningNextBtn').disabled = false;

                // 1.5초 후 다음 문제로 자동 이동 (마지막 문제 아니면)
                setTimeout(() => {
                    if (quizIndex < vocabulary.length - 1 && state.isCorrect) {
                        quizIndex++;
                        loadWordToMeaningQuestion();
                    } else if (quizIndex === vocabulary.length - 1) {
                        showResults();
                    }
                }, 1500);
            } else {
                btn.classList.add('wrong');
                document.getElementById('wordToMeaningFeedback').textContent = '❌ 틀렸습니다. 다시 생각해보세요!';
                document.getElementById('wordToMeaningFeedback').className = 'quiz-feedback wrong';
                setTimeout(() => {
                    btn.classList.remove('wrong');
                    document.getElementById('wordToMeaningFeedback').textContent = '';
                }, 1000);
            }
        });
        optionsContainer.appendChild(btn);
    });

    document.getElementById('wordToMeaningPrevBtn').disabled = quizIndex === 0;
    document.getElementById('wordToMeaningNextBtn').disabled = !state.isCorrect;
}

// 네비게이션
document.getElementById('wordToMeaningPrevBtn').addEventListener('click', () => {
    if (quizIndex > 0) {
        quizIndex--;
        loadWordToMeaningQuestion();
    }
});

document.getElementById('wordToMeaningNextBtn').addEventListener('click', () => {
    if (quizIndex < vocabulary.length - 1) {
        quizIndex++;
        loadWordToMeaningQuestion();
    } else {
        showResults();
    }
});

document.getElementById('backFromWordToMeaning').addEventListener('click', showQuizSelection);

// 결과 표시
function showResults() {
    document.getElementById('spellingQuiz').classList.add('hidden');
    document.getElementById('sentenceQuiz').classList.add('hidden');
    document.getElementById('wordToMeaningQuiz').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');
    document.getElementById('scoreValue').textContent = quizScore;
}

// 퀴즈 재시작
document.getElementById('restartQuizBtn').addEventListener('click', () => {
    quizIndex = 0;
    quizScore = 0;
    sentenceQuizStates = []; // 상태 초기화
    spellingQuizStates = []; // 상태 초기화
    if (countdownInterval) clearInterval(countdownInterval);

    if (currentQuizType === 'spelling') {
        document.getElementById('quizResults').classList.add('hidden');
        document.getElementById('spellingQuiz').classList.remove('hidden');
        loadSpellingQuestion();
    } else if (currentQuizType === 'sentence') {
        document.getElementById('quizResults').classList.add('hidden');
        document.getElementById('sentenceQuiz').classList.remove('hidden');
        loadSentenceQuestion();
    } else if (currentQuizType === 'wordToMeaning') {
        document.getElementById('quizResults').classList.add('hidden');
        document.getElementById('wordToMeaningQuiz').classList.remove('hidden');
        loadWordToMeaningQuestion();
    }
});

// 학습 선택으로 돌아가기 (결과화면 확인 버튼)
document.getElementById('backToSelectionBtn').addEventListener('click', () => {
    if (currentQuizSource === 'day') {
        showStudyDaySelection(currentQuizType);
    } else if (currentQuizSource === 'wordbook') {
        deactivateAll();
        document.getElementById('vocabularyDetailMode').classList.add('active');
    } else {
        showQuizSelection();
    }
});
document.getElementById('backFromSpelling').addEventListener('click', () => {
    if (currentQuizSource === 'day') {
        showStudyDaySelection(currentQuizType);
    } else if (currentQuizSource === 'wordbook') {
        deactivateAll();
        document.getElementById('vocabularyDetailMode').classList.add('active');
    } else {
        showQuizSelection(true); // 메뉴 펼쳐진 상태 유지
    }
});
document.getElementById('backFromSentence').addEventListener('click', () => {
    if (currentQuizSource === 'day') {
        showStudyDaySelection(currentQuizType);
    } else {
        showQuizSelection(true);
    }
});
document.getElementById('backFromWordToMeaning').addEventListener('click', () => {
    if (currentQuizSource === 'day') {
        showStudyDaySelection(currentQuizType);
    } else if (currentQuizSource === 'wordbook') {
        deactivateAll();
        document.getElementById('vocabularyDetailMode').classList.add('active');
    } else {
        showQuizSelection(true);
    }
});

// ===== AI Speaking Logic =====
let speakingTimerInterval = null;
let speakingStartTime = 0;
let isRecording = false;

function startAiSpeaking(sentence, translation) {
    if (isRecording) stopRecording();
    deactivateAll();

    // 부모 섹션인 studyMode 활성화 및 기본 선택창 숨김
    studyMode.classList.add('active');
    const quizSelection = document.getElementById('quizSelection');
    if (quizSelection) {
        quizSelection.classList.add('hidden');
        quizSelection.style.display = 'none';
    }

    const speakingMode = document.getElementById('aiSpeakingMode');
    if (speakingMode) {
        speakingMode.classList.remove('hidden');
        speakingMode.classList.add('active');
        speakingMode.style.display = 'flex';
    }

    document.getElementById('speakingTargetSentence').textContent = sentence;
    document.getElementById('speakingTargetTranslation').textContent = translation;

    // UI 초기화
    resetSpeakingUI();

    // 이벤트 리스너 설정
    const listenBtn = document.getElementById('speakingListenBtn');
    listenBtn.onclick = () => speakWord(sentence);

    const backBtn = document.getElementById('backFromAiSpeaking');
    backBtn.onclick = () => {
        stopRecording();
        deactivateAll();
        studyMode.classList.add('active');
        document.getElementById('quizSelection').style.display = 'none';
        document.getElementById('sentenceQuiz').classList.remove('hidden');
    };

    const mainRecordBtn = document.getElementById('mainRecordBtn');
    mainRecordBtn.onclick = toggleRecording;

    const retryBtn = document.getElementById('retryRecordBtn');
    retryBtn.onclick = () => {
        resetSpeakingUI();
    };

    const analyzeBtn = document.getElementById('startAnalyzeBtn');
    analyzeBtn.onclick = () => {
        showSpeakingFeedback();
    };
}

function resetSpeakingUI() {
    isRecording = false;
    const mainRecordBtn = document.getElementById('mainRecordBtn');
    const mainArea = document.querySelector('.record-main-area');
    const visualizer = document.getElementById('speakingVisualizer');
    const helpText = document.getElementById('recordHelpText');
    const timer = document.getElementById('speakingTimer');
    const actions = document.getElementById('postRecordActions');

    mainRecordBtn.classList.remove('recording');
    if (mainArea) mainArea.classList.remove('hidden');
    visualizer.classList.remove('active');
    helpText.classList.remove('hidden');
    helpText.textContent = "버튼을 눌러 녹음 시작";
    timer.textContent = "00:00";

    if (actions) actions.classList.add('hidden');

    if (speakingTimerInterval) {
        clearInterval(speakingTimerInterval);
        speakingTimerInterval = null;
    }
}

function toggleRecording() {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording(true); // true means show actions
    }
}

function startRecording() {
    isRecording = true;
    const mainRecordBtn = document.getElementById('mainRecordBtn');
    const visualizer = document.getElementById('speakingVisualizer');
    const helpText = document.getElementById('recordHelpText');

    mainRecordBtn.classList.add('recording');
    visualizer.classList.add('active');
    helpText.textContent = "녹음 중... 다시 눌러 완료";

    speakingStartTime = Date.now();
    updateSpeakingTimer();
    speakingTimerInterval = setInterval(updateSpeakingTimer, 1000);

    // 실제 MediaRecorder를 사용하려면 권한 요청 등이 필요하지만, 
    // 여기서는 UI 피드백 위주로 구현
}

function stopRecording(showActions = false) {
    isRecording = false;
    const mainRecordBtn = document.getElementById('mainRecordBtn');
    const mainArea = document.querySelector('.record-main-area');
    const visualizer = document.getElementById('speakingVisualizer');
    const helpText = document.getElementById('recordHelpText');
    const actions = document.getElementById('postRecordActions');

    mainRecordBtn.classList.remove('recording');
    visualizer.classList.remove('active');

    if (showActions) {
        if (mainArea) mainArea.classList.add('hidden');
        if (helpText) helpText.classList.add('hidden');
        if (actions) actions.classList.remove('hidden');
    }

    if (speakingTimerInterval) {
        clearInterval(speakingTimerInterval);
        speakingTimerInterval = null;
    }
}

function updateSpeakingTimer() {
    const elapsed = Math.floor((Date.now() - speakingStartTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    document.getElementById('speakingTimer').textContent = `${mins}:${secs}`;

    // 30초 넘으면 자동 중단
    if (elapsed >= 30) {
        toggleRecording();
    }
}

function showSpeakingFeedback() {
    showToast("녹음을 완료했습니다. AI가 분석 중입니다...");

    // 로딩 시뮬레이션
    setTimeout(() => {
        const speakingResultModal = document.getElementById('speakingResultModal');
        if (speakingResultModal) {
            // 결과 데이터 시뮬레이션
            const scores = {
                accuracy: 85 + Math.floor(Math.random() * 10),
                fluency: 75 + Math.floor(Math.random() * 15),
                pronunciation: 80 + Math.floor(Math.random() * 10)
            };
            const totalScore = Math.floor((scores.accuracy + scores.fluency + scores.pronunciation) / 3);

            // 모달 UI 업데이트
            document.querySelector('.speaking-result-content .score-value').textContent = totalScore;

            document.getElementById('accuracyBar').style.width = scores.accuracy + '%';
            document.getElementById('fluencyBar').style.width = scores.fluency + '%';
            document.getElementById('pronunciationBar').style.width = scores.pronunciation + '%';

            document.getElementById('accuracyVal').textContent = scores.accuracy;
            document.getElementById('fluencyVal').textContent = scores.fluency;
            document.getElementById('pronunciationVal').textContent = scores.pronunciation;

            // 단어별 피드백 생성
            const sentence = document.getElementById('speakingTargetSentence').textContent;
            const wordsMatch = sentence.match(/\b[\w']+\b|[.,!?;]/g);
            const feedbackList = document.getElementById('speakingWordFeedbackList');
            if (feedbackList) {
                feedbackList.innerHTML = '';
                wordsMatch.forEach((w, i) => {
                    const fb = document.createElement('span');
                    fb.className = 'word-fb';
                    const rand = Math.random();
                    if (rand > 0.9) fb.classList.add('error');
                    else if (rand > 0.8) fb.classList.add('warning');
                    else fb.classList.add('correct');
                    fb.textContent = w;
                    feedbackList.appendChild(fb);
                });
            }

            // 평가 텍스트
            const evaluation = document.querySelector('.result-evaluation');
            if (evaluation) {
                if (totalScore >= 92) evaluation.textContent = "완벽한 발음이에요! 원어민 수준입니다.";
                else if (totalScore >= 85) evaluation.textContent = "훌륭합니다! 조금만 더 유창하게 말해보세요.";
                else evaluation.textContent = "좋은 시도입니다. 억양에 좀 더 신경 써보세요.";
            }

            const tip = document.getElementById('speakingFeedbackTip');
            if (tip) {
                const errorWords = Array.from(feedbackList.querySelectorAll('.word-fb.error, .word-fb.warning'));
                if (errorWords.length > 0) {
                    tip.textContent = `💡 '${errorWords[0].textContent}'의 발음에 주의하여 다시 시도해보세요.`;
                } else {
                    tip.textContent = "💡 정말 훌륭한 발음입니다! 계속 연습해보세요.";
                }
            }

            speakingResultModal.classList.remove('hidden');
        }
    }, 2000);
}

// 결과 모달 버튼 핸들러
document.querySelector('.retry-speaking-btn').onclick = () => {
    document.getElementById('speakingResultModal').classList.add('hidden');
    resetSpeakingUI();
};

document.querySelector('.finish-speaking-btn').onclick = () => {
    document.getElementById('speakingResultModal').classList.add('hidden');
    const backBtn = document.getElementById('backFromAiSpeaking');
    backBtn.click(); // 다시 센텐스 퀴즈로
};

// 모달 외부 클릭 닫기 (Speaking Result Modal)
document.getElementById('speakingResultModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('speakingResultModal')) {
        document.getElementById('speakingResultModal').classList.add('hidden');
    }
});

// ===== Digital Writing Pad Logic =====
const writingPadToggle = document.getElementById('writingPadToggle');
const writingPadContainer = document.getElementById('writingPadContainer');
const canvas = document.getElementById('writingCanvas');
const ctx = canvas.getContext('2d');
const clearPadBtn = document.getElementById('clearPadBtn');
const penThickness = document.getElementById('penThickness');
const colorPicker = document.getElementById('colorPicker');

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = '#ffffff';
let currentThickness = 3;

// 캔버스 크기 조정 함수
function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // 초기 선 스타일 설정
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentThickness;
}

// 그리기 시작
function startDrawing(e) {
    isDrawing = true;
    const pos = getMousePos(e);
    lastX = pos.x;
    lastY = pos.y;
}

// 그리기
function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const pos = getMousePos(e);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastX = pos.x;
    lastY = pos.y;
}

// 그리기 종료
function stopDrawing() {
    isDrawing = false;
}

// 마우스/터치 위치 계산
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

// 이벤트 리스너 등록
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', startDrawing, { passive: false });
canvas.addEventListener('touchmove', draw, { passive: false });
canvas.addEventListener('touchend', stopDrawing);

// 토글 기능
writingPadToggle.addEventListener('click', () => {
    writingPadContainer.classList.toggle('hidden');
    const isHidden = writingPadContainer.classList.contains('hidden');
    writingPadToggle.querySelector('span').textContent = isHidden ? '필기 노트 열기' : '필기 노트 닫기';

    // 레이아웃 최적화를 위한 클래스 토글
    document.querySelector('.container').classList.toggle('writing-pad-active', !isHidden);

    if (!isHidden) {
        // 열릴 때 캔버스 크기 재조정 (지연 필요)
        setTimeout(resizeCanvas, 400);
    }
});

// 색상 선택
colorPicker.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-swatch')) {
        // 기존 액티브 제거
        colorPicker.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        // 새 액티브 설정
        e.target.classList.add('active');
        currentColor = e.target.dataset.color;
        ctx.strokeStyle = currentColor;
    }
});

// 두께 조절
penThickness.addEventListener('input', (e) => {
    currentThickness = e.target.value;
    ctx.lineWidth = currentThickness;
});

// 전체 지우기
clearPadBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 창 크기 변경 시 대응
window.addEventListener('resize', resizeCanvas);

// 퀴즈 카드 별 아이콘 토글 기능
document.addEventListener('click', (e) => {
    const starBtn = e.target.closest('.save-card-btn');
    if (starBtn) {
        starBtn.classList.toggle('active');

        // 시각적 피드백: 반짝이는 애니메이션 효과 (선택 사항)
        if (starBtn.classList.contains('active')) {
            starBtn.style.transform = 'scale(1.4)';
            setTimeout(() => {
                starBtn.style.transform = '';
            }, 200);
        }
    }
});

// ===== 홈 화면 통계 업데이트 로직 =====
function updateHomeStats() {
    // 로컬 스토리지에서 데이터 로드 (없으면 기본값 사용)
    // 실제 앱이라면 서버나 더 정교한 DB에서 가져오겠지만, 여기선 데모용으로 localStorage를 활용합니다.
    let totalMemorized = parseInt(localStorage.getItem('totalMemorized'));
    let lastWeekMemorized = parseInt(localStorage.getItem('lastWeekMemorized'));

    // 데이터가 없는 경우 초기값 설정 (데모용)
    if (isNaN(totalMemorized)) {
        totalMemorized = 1248;
        localStorage.setItem('totalMemorized', totalMemorized);
    }
    if (isNaN(lastWeekMemorized)) {
        lastWeekMemorized = 1120;
        localStorage.setItem('lastWeekMemorized', lastWeekMemorized);
    }

    // UI 업데이트
    const totalCountEl = document.getElementById('totalMemorizedCount');
    const comparisonEl = document.getElementById('weeklyComparison');

    if (totalCountEl) {
        // 부드러운 숫자 카운팅 애니메이션 효과
        animateNumber(totalCountEl, parseInt(totalCountEl.textContent.replace(/,/g, '')), totalMemorized);
    }

    if (comparisonEl) {
        const diff = totalMemorized - lastWeekMemorized;
        const valueEl = comparisonEl.querySelector('.comparison-value');
        const suffixEl = comparisonEl.querySelector('.comparison-suffix');

        if (diff >= 0) {
            comparisonEl.className = 'comparison-badge positive';
            valueEl.textContent = `+${diff}`;
            if (suffixEl) suffixEl.textContent = '늘었어요!';
        } else {
            comparisonEl.className = 'comparison-badge negative';
            valueEl.textContent = `${diff}`;
            if (suffixEl) suffixEl.textContent = '줄었어요';
        }
    }

    // 성취도 그래프 애니메이션 트리거 (영역 삭제됨)
}

// 숫자 애니메이션 함수
function animateNumber(element, start, end) {
    if (start === end) {
        element.textContent = end.toLocaleString();
        return;
    }

    let current = start;
    const duration = 1000; // 1초
    const steps = 30;
    const increment = (end - start) / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

// 홈 화면 과제 카드 클릭 시 과제 학습 섹션으로 이동
document.getElementById('homeAssignmentCard').addEventListener('click', () => {
    // 1. 학습 탭 활성화
    studyNavBtn.click();
    // 2. 과제 학습 섹션 표시
    showAssignmentLearning();
});

// 홈 화면 학습 이어가기 버튼 클릭 시 암기 모드로 이동
const continueBtn = document.getElementById('continueLearningBtn');
if (continueBtn) {
    continueBtn.addEventListener('click', () => {
        deactivateAll();
        memorizeNavBtn.classList.add('active');
        memorizeMode.classList.add('active');
        // 현재 예시로 설정된 어원편으로 이동
        showDaySelection('etymology', '능률VOCA 어원편 고등');
    });
}

// ===== Teacher Mode Logic =====
const enterTeacherModeBtn = document.getElementById('enterTeacherModeBtn');

enterTeacherModeBtn.addEventListener('click', () => {
    // 관리자 페이지를 새 창으로 열기 (PC 환경 시뮬레이션)
    const adminWindow = window.open('admin.html', 'NE_VOCA_ADMIN', 'width=1200,height=800,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes');

    if (!adminWindow || adminWindow.closed || typeof adminWindow.closed == 'undefined') {
        alert('팝업 차단이 설정되어 있을 수 있습니다. 팝업 허용 후 다시 시도해주세요.');
    }
});

// 초기화
updateCard();
updateHomeStats();

// AI Speaking Result UI Dummy Trigger
document.addEventListener('DOMContentLoaded', () => {
    const speakingResultModal = document.getElementById('speakingResultModal');
    const closeSpeakingResult = document.getElementById('closeSpeakingResult');
    const finishSpeakingBtn = document.getElementById('finishSpeakingBtn');

    if (closeSpeakingResult) {
        closeSpeakingResult.addEventListener('click', () => {
            speakingResultModal.classList.add('hidden');
        });
    }

    if (finishSpeakingBtn) {
        finishSpeakingBtn.addEventListener('click', () => {
            speakingResultModal.classList.add('hidden');
        });
    }
});

