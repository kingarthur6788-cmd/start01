const generateBtn = document.getElementById('generate-btn');
const generatePensionBtn = document.getElementById('generate-pension-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const pensionNumbersContainer = document.getElementById('pension-numbers');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 테마 초기 설정
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateToggleText(currentTheme);

function updateToggleText(theme) {
  themeToggle.textContent = theme === 'dark' ? '화이트 모드' : '다크 모드';
}

themeToggle.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateToggleText(newTheme);
});

// 로또 번호 생성
generateBtn.addEventListener('click', () => {
  lottoNumbersContainer.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const numbers = generateLottoNumbers().sort((a, b) => a - b);
    const setDiv = createNumberSetElement(numbers, 'lotto-number');
    lottoNumbersContainer.appendChild(setDiv);
  }
});

// 연금복권 번호 생성
generatePensionBtn.addEventListener('click', () => {
  pensionNumbersContainer.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const pensionData = generatePensionNumbers();
    const setDiv = document.createElement('div');
    setDiv.className = 'lotto-set';

    // 조
    const groupDiv = document.createElement('div');
    groupDiv.className = 'lotto-number pension-group';
    groupDiv.textContent = `${pensionData.group}조`;
    setDiv.appendChild(groupDiv);

    // 6자리 번호
    pensionData.numbers.forEach(num => {
      const numDiv = document.createElement('div');
      numDiv.className = 'lotto-number pension-number';
      numDiv.textContent = num;
      setDiv.appendChild(numDiv);
    });

    pensionNumbersContainer.appendChild(setDiv);
  }
});

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers);
}

function generatePensionNumbers() {
  const group = Math.floor(Math.random() * 5) + 1; // 1~5조
  const numbers = [];
  for (let i = 0; i < 6; i++) {
    numbers.push(Math.floor(Math.random() * 10)); // 0~9
  }
  return { group, numbers };
}

function createNumberSetElement(numbers, className) {
  const setDiv = document.createElement('div');
  setDiv.className = 'lotto-set';
  numbers.forEach(number => {
    const numberDiv = document.createElement('div');
    numberDiv.className = className;
    numberDiv.textContent = number;
    setDiv.appendChild(numberDiv);
  });
  return setDiv;
}
