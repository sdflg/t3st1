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

/**
 * Loads Disqus comments dynamically, handling initial load and reloads.
 */
function loadDisqus() {
    // Disqus configuration
    var disqus_config = function () {
        this.page.url = window.location.href;
        this.page.identifier = 'lotto-page-1'; // Unique identifier for the page
    };

    // If DISQUS is already loaded, reset it
    if (window.DISQUS) {
        DISQUS.reset({
            reload: true,
            config: disqus_config
        });
    } else {
        // If DISQUS is not loaded, create and append the script
        (function() {
            var d = document, s = d.createElement('script');
            s.src = 'https://t3st1.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    // Reload Disqus on theme change to ensure it renders correctly
    loadDisqus();
}

drawButton.addEventListener('click', drawLottoNumber);
themeToggle.addEventListener('click', toggleTheme);

// Initial actions on page load
drawLottoNumber();
loadDisqus();
