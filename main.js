const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

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
