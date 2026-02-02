import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC9Le4nVivvAfkjHsfJdW4cLmxQaPYY1UM",
    authDomain: "t3st1-f1468.firebaseapp.com",
    projectId: "t3st1-f1468",
    storageBucket: "t3st1-f1468.firebasestorage.app",
    messagingSenderId: "890095653625",
    databaseURL: "https://t3st1-f1468-default-rtdb.asia-southeast1.firebasedatabase.app/",
    appId: "1:890095653625:web:9b5b4ddf4ef56a55cd0828",
    measurementId: "G-4SCY9VVQ70"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app); // Initialize Firebase Authentication

const groupEl = document.getElementById('group');
const numberEl = document.getElementById('number');
const drawButton = document.getElementById('draw-button');
const themeToggle = document.getElementById('theme-toggle');
const draw5Button = document.getElementById('draw-5-button');
const clearHistoryButton = document.getElementById('clear-history-button'); // New reference
const lottoDisplayWrapper = document.querySelector('.lotto-display-wrapper'); // New reference
const historyList = document.getElementById('history-list'); // New reference

// Login/Signup Elements
const loginIdInput = document.getElementById('login-id');
const loginPwInput = document.getElementById('login-pw');
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');

// New Signup Form Elements
const loginControls = document.getElementById('login-controls');
const signupForm = document.getElementById('signup-form');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const signupConfirmPasswordInput = document.getElementById('signup-confirm-password');
const signupSubmitButton = document.getElementById('signup-submit-button');
const signupBackButton = document.getElementById('signup-back-button');


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

// Function to handle user sign up
async function handleSignUp() {
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;
    const confirmPassword = signupConfirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("회원가입 성공! 이제 로그인해주세요.");
        hideSignupForm(); // Automatically hide signup form after successful registration
    } catch (error) {
        alert("회원가입 실패: " + error.message);
    }
}

// Function to handle user sign in
async function handleSignIn() {
    const email = loginIdInput.value;
    const password = loginPwInput.value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("로그인 성공! 환영합니다.");
        // Optionally redirect or update UI
    } catch (error) {
        alert("로그인 실패: " + error.message);
    }
}



drawButton.addEventListener('click', handleSingleDraw);
themeToggle.addEventListener('click', toggleTheme);
draw5Button.addEventListener('click', handleConsecutiveDraws);
clearHistoryButton.addEventListener('click', clearHistory); // New event listener

loginButton.addEventListener('click', handleSignIn);
signupButton.addEventListener('click', showSignupForm);
signupSubmitButton.addEventListener('click', handleSignUp);
signupBackButton.addEventListener('click', hideSignupForm);

// Function to show the signup form
function showSignupForm() {
    loginControls.style.display = 'none';
    signupForm.style.display = 'block';
}

// Function to hide the signup form
function hideSignupForm() {
    loginControls.style.display = 'block';
    signupForm.style.display = 'none';
}

// Initial actions on page load
handleSingleDraw(); // Perform one draw on page load to show initial numbers
