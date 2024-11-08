const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const buttonElement = document.getElementById('start');

buttonElement.addEventListener('click', () => {
    buttonElement.disabled = true; // 버튼 비활성화
    typedValueElement.disabled = false; // 입력 필드 활성화

    const quoteIndex = Math.floor(Math.random() * quotes.length); // 무작위 인덱스 생성
    const quote = quotes[quoteIndex]; // 무작위 인덱스 값으로 인용문 선택
    words = quote.split(' '); // 공백 문자를 기준으로 words 배열에 저장
    wordIndex = 0; // 초기화
    
    const spanWords = words.map(function(word) { return `<span>${word} </span>`}); 
  // span 태그로 감싼 후 배열에 저장
    quoteElement.innerHTML = spanWords.join(''); // 하나의 문자열로 결합 및 설정
    quoteElement.childNodes[0].className = 'highlight'; // 첫번째 단어 강조
    messageElement.innerText = ''; // 메시지 요소 초기화
    
    typedValueElement.value = ''; //입력 필드 초기화
    typedValueElement.focus(); // 포커스 설정
    
    startTime = new Date().getTime(); // 타이핑 시작 시간 기록
});

const catImage = document.getElementById('cat');
// // 이미지 배열
// const images = ['/home-week8/images/cat-1.jpg', '/home-week8/images/cat-2.jpg'];
// let currentImageIndex = 0;  // 현재 보여지는 이미지 인덱스
// let imageInterval;  // 이미지 변경을 위한 setInterval 저장
// let timeout;  // 1초 후 원래 이미지로 돌아가게 할 setTimeout

// function changeImage() {
//   // 이미지를 번갈아 변경
//   catImage.src = images[currentImageIndex];
//   catImage.style.height = '48px';  // 항상 고정된 높이로 설정
//   currentImageIndex = (currentImageIndex + 1) % images.length;  // 인덱스를 0, 1로 순환
// }

typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex]; // 현재 타이핑할 단어를 currentWord에 저장
    const typedValue = typedValueElement.value; // 입력한 값을 typedValue에 저장
    document.getElementById('start').disabled = true; // **버튼 비활성화
    typedValueElement.disabled = false; // 입력 필드 활성화
    catImage.src = "/home-week8/images/typing.gif"

    if (typedValue === currentWord && wordIndex === words.length - 1) { // 마지막 단어까지 정확히 입력했는 지 체크
      const elapsedTime = new Date().getTime() - startTime; // 타이핑에 소요된 시간 계산
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.` ;  // 타이핑 완료 메시지
      messageElement.innerText = message; //생성된 메시지 화면에 표시

      catImage.src = "/home-week8/images/cat-0.png"

      // **게임 완료 시 이벤트 리스너 비활성화
      typedValueElement.disabled = true; // 입력 필드 비활성화
      document.getElementById('start').disabled = false; // **버튼 활성화
      return; // 함수 종료
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) { // 입력된 값이 공백으로 끝났는지와 공백을 제거한 값이 현재 단어와 일치하는 지 확인
      typedValueElement.value = ''; // 입력 필드 초기화하여 다음 단어 입력 준비
      wordIndex++; // 다음 단어로 이동
      for (const wordElement of quoteElement.childNodes) { // 모든 강조 표시 제거
        wordElement.className = ''; // 클래스 제거
      }
      quoteElement.childNodes[wordIndex].className = 'highlight'; // 다음으로 타이핑할 단어에 클래스 추가
    } else if (currentWord.startsWith(typedValue)) { //현재 단어의 일부를 맞게 입력하고 있는 지 확인
      typedValueElement.className = ''; // 올바르면 클래스 제거
    } else {
      typedValueElement.className = 'error'; // 틀리면 error 클래스 추가
    }

});



// ---------- 모달창 ---------- //

// 최고 점수를 저장할 키 설정
const STORAGE_KEY = "topScores";

// 점수 초기화 및 로드 함수
function loadTopScores() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTopScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

// 모달 창 및 최고 점수 관련 함수
function showModal(currentScore) {
  const scores = loadTopScores();
  const topScoresElement = document.getElementById('top-scores');
  const currentScoreElement = document.getElementById('current-score');

  // 최고 점수 목록 표시
  topScoresElement.innerHTML = '';
  scores.forEach((score) => {
    const li = document.createElement('li');
    li.innerText = `${score.toFixed(2)} seconds`;
    topScoresElement.appendChild(li);
  });

  // 현재 점수 표시
  if (currentScore >= 0) {
    currentScoreElement.innerText = `Current Score : ${currentScore.toFixed(2)} seconds`;
  }
  else {
    currentScoreElement.innerText = `Current Score : - `;
  }

  // 모달 창 열기
  document.getElementById('score-modal').style.display = "block";
}

// 모달 닫기 기능
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('score-modal').style.display = "none";
});

// 'Show Top Scores' 버튼 클릭 시 모달 열기
document.getElementById('show-scores').addEventListener('click', () => {
  showModal(-1); // 현재 점수 없이 모달 창을 열기
});

// 타이핑 게임 완료 시 기록 저장 및 모달 열기
typedValueElement.addEventListener('input', () => {
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    const elapsedTime = (new Date().getTime() - startTime) / 1000;
    const message = `CONGRATULATIONS! You finished in ${elapsedTime.toFixed(2)} seconds.`;
    messageElement.innerText = message;

    // 입력 필드 및 버튼 활성화 상태 변경
    typedValueElement.disabled = true;
    buttonElement.disabled = false;

    // 최고 점수 업데이트
    let topScores = loadTopScores();
    topScores.push(elapsedTime);
    topScores.sort((a, b) => a - b); // 시간 오름차순으로 정렬
    topScores = topScores.slice(0, 3); // 상위 3개만 유지
    saveTopScores(topScores);

    // 모달 창 표시
    showModal(elapsedTime);
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // 다음 단어로 넘어가는 기존 로직
    typedValueElement.value = '';
    wordIndex++;
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    typedValueElement.className = '';
  } else {
    typedValueElement.className = 'error';
  }
});
