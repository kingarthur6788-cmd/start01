const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 테마 초기 설정
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  body.setAttribute('data-theme', currentTheme);
  themeToggle.textContent = currentTheme === 'dark' ? '화이트 모드' : '다크 모드';
}

themeToggle.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '화이트 모드' : '다크 모드';
});

generateBtn.addEventListener('click', () => {
  lottoNumbersContainer.innerHTML = ''; // 기존 번호 초기화

  for (let i = 0; i < 10; i++) {
    const numberSet = generateLottoNumbers();
    const sortedNumbers = numberSet.sort((a, b) => a - b);
    const lottoSetDiv = createLottoSetElement(sortedNumbers);
    lottoNumbersContainer.appendChild(lottoSetDiv);
  }
});

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
}

function createLottoSetElement(numbers) {
  const lottoSetDiv = document.createElement('div');
  lottoSetDiv.className = 'lotto-set';

  numbers.forEach(number => {
    const numberDiv = document.createElement('div');
    numberDiv.className = 'lotto-number';
    numberDiv.textContent = number;
    lottoSetDiv.appendChild(numberDiv);
  });

  return lottoSetDiv;
}
