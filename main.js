const groupEl = document.getElementById('group');
const numberEl = document.getElementById('number');
const drawButton = document.getElementById('draw-button');
const themeToggle = document.getElementById('theme-toggle');
const draw5Button = document.getElementById('draw-5-button');
const clearHistoryButton = document.getElementById('clear-history-button'); // New reference
const lottoDisplayWrapper = document.querySelector('.lotto-display-wrapper'); // New reference
const historyList = document.getElementById('history-list'); // New reference

/**
 * Generates a random lottery group and number.
 * @returns {{group: number, number: string}} The generated lottery numbers.
 */
function generateLottoNumber() {
    const group = Math.floor(Math.random() * 5) + 1;
    const number = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return { group, number };
}

/**
 * Updates the main display with the given lottery numbers.
 * @param {number} group
 * @param {string} number
 */
function updateCurrentDisplay(group, number) {
    groupEl.textContent = group;
    numberEl.textContent = number;
}

/**
 * Adds a generated lottery number to the history list.
 * @param {number} group
 * @param {string} number
 */
function addDrawToHistory(group, number) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="history-item">${group}조 ${number}</span>`;
    // Add to the top of the list
    if (historyList.firstChild) {
        historyList.insertBefore(listItem, historyList.firstChild);
    } else {
        historyList.appendChild(listItem);
    }
}

/**
 * Handles a single lottery draw: generates, updates display, and adds to history.
 */
function handleSingleDraw() {
    const { group, number } = generateLottoNumber();
    updateCurrentDisplay(group, number);
    addDrawToHistory(group, number);
}

/**
 * Handles 5 consecutive lottery draws: generates, updates display, and adds to history for each.
 */
function handleConsecutiveDraws() {
    let count = 0;
    const interval = setInterval(() => {
        const { group, number } = generateLottoNumber();
        updateCurrentDisplay(group, number);
        addDrawToHistory(group, number);
        count++;
        if (count === 5) {
            clearInterval(interval);
        }
    }, 300); // 0.3초마다 추첨
}

/**
 * Clears all entries from the history list.
 */
function clearHistory() {
    historyList.innerHTML = '';
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

drawButton.addEventListener('click', handleSingleDraw);
themeToggle.addEventListener('click', toggleTheme);
draw5Button.addEventListener('click', handleConsecutiveDraws);
clearHistoryButton.addEventListener('click', clearHistory); // New event listener

// Initial actions on page load
handleSingleDraw(); // Perform one draw on page load to show initial numbers
