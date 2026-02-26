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
    const word = vocabulary[currentIndex];

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

        // 예문에서 단어 강조 표시
        const regex = new RegExp(`\\b(${word.english})\\b`, 'gi');
        const highlightedExample = word.example.replace(regex, '<span class="highlight-word">$1</span>');
        example.innerHTML = highlightedExample;

        exampleTranslation.textContent = word.exampleKorean;

        // 자동 소리 재생 (진입 시)
        const memorizeAutoplay = document.getElementById('memorizeAutoplayToggle');
        if (memorizeAutoplay && memorizeAutoplay.checked) {
            speakWord(word.english);
        }
    }, 150);

    // 진행 상태 업데이트
    currentCard.textContent = currentIndex + 1;
    const progress = ((currentIndex + 1) / vocabulary.length) * 100;
    progressFill.style.width = `${progress}%`;

    // 학습한 단어 추가
    studiedWords.add(currentIndex);
    studiedCount.textContent = studiedWords.size;

    // 버튼 상태 업데이트
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === vocabulary.length - 1;
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
    if (currentIndex < vocabulary.length - 1) {
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
    // 모든 모드 섹션을 찾아 비활성화
    document.querySelectorAll('.mode-section').forEach(m => m.classList.remove('active'));

    // 내부 퀴즈 관련 컨테이너들 숨김 처리
    document.querySelectorAll('.quiz-container').forEach(qc => qc.classList.add('hidden'));

    // 특정 서브 선택 화면들만 숨김 (스택 방지)
    const subSelections = ['studyDaySelection', 'daySelection', 'assignmentSection', 'memorizeContent'];
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

// 단어장 상세 데이터 (샘플)
let currentVocabWords = [];

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

// 홈 화면의 단어장 아이템 클릭 이벤트
document.querySelectorAll('.wordbook-item:not(.add-wordbook)').forEach(item => {
    item.addEventListener('click', () => {
        const bookName = item.querySelector('.wordbook-name').textContent;
        showVocabDetail(bookName);
    });
});

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

// ===== 즐겨찾기(별표) 토글 로직 =====
const favoriteBtn = document.getElementById('favoriteBtn');
favoriteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 카드 뒤집기 방지
    favoriteBtn.classList.toggle('favorited');

    // SVG 변경 (필요 시)
    const svg = favoriteBtn.querySelector('svg');
    if (favoriteBtn.classList.contains('favorited')) {
        svg.setAttribute('fill', '#ffd700');
        svg.setAttribute('stroke', '#ffd700');
    } else {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
    }
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

let currentPack = '';
let currentMemorizeSource = 'pack'; // 'pack' or 'wordbook'

function showPackSelection() {
    memorizeSelection.classList.remove('hidden');
    daySelection.classList.add('hidden');
    memorizeContent.classList.add('hidden');
}

function showDaySelection(packName, packTitleText) {
    currentPack = packName;
    selectedPackTitle.textContent = packTitleText;

    memorizeSelection.classList.add('hidden');
    daySelection.classList.remove('hidden');
    memorizeContent.classList.add('hidden');

    // Day 그리드 생성
    generateDayGrid();
}

function generateDayGrid() {
    dayGrid.innerHTML = '';

    for (let i = 1; i <= 30; i++) {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';

        // 고정 데이터 (나중에 DB 연동 시 변경)
        let completedCount;
        if (i < 5) completedCount = 30;
        else if (i < 15) completedCount = 25 - (i % 5);
        else if (i < 25) completedCount = 15 - (i % 6);
        else completedCount = 5 - (i % 3);

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
            startMemorize(i);
        });

        dayGrid.appendChild(dayCard);
    }
}

function startMemorize(dayNum, source = 'pack') {
    currentMemorizeSource = source;
    daySelection.classList.add('hidden');
    memorizeContent.classList.remove('hidden');

    // 상단 타이틀 업데이트
    if (source === 'pack') {
        const packTitleText = document.getElementById('selectedPackTitle').textContent;
        document.getElementById('memorizePackTitle').textContent = packTitleText;
        console.log(`${currentPack} - Day ${dayNum} 학습 시작`);
    }

    // 선택된 Day 정보로 초기화
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
    document.getElementById('quizSelection').style.display = 'block';
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

// 스펠링 퀴즈 토글
// 퀴즈 카드 토글 설정
const quizCards = [
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
    if (type === 'spelling') title.textContent = '스펠링 퀴즈: Day 선택';
    else if (type === 'wordToMeaning') title.textContent = '단어 퀴즈: Day 선택';
    else if (type === 'sentence') title.textContent = '문장 퀴즈: Day 선택';

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
        const speakingResultModal = document.getElementById('speakingResultModal');
        if (speakingResultModal) {
            speakingResultModal.classList.remove('hidden');
        }
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

