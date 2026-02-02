const groupEl = document.getElementById('group');
const numberEl = document.getElementById('number');
const drawButton = document.getElementById('draw-button');
const themeToggle = document.getElementById('theme-toggle');

function drawLottoNumber() {
    // 1조에서 5조까지 랜덤 생성
    const group = Math.floor(Math.random() * 5) + 1;

    // 000000에서 999999까지 6자리 숫자 랜덤 생성
    const number = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    groupEl.textContent = group;
    numberEl.textContent = number;
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

drawButton.addEventListener('click', drawLottoNumber);
themeToggle.addEventListener('click', toggleTheme);

// Initial actions on page load
drawLottoNumber();
