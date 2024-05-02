const inputField = document.getElementById('inputField');
const timeDisplay = document.getElementById('time');
const correctWordsDisplay = document.getElementById('correctWords');
const wpmDisplay = document.getElementById('wpm');
const resetBtn = document.getElementById('resetBtn');
const quote = "The quick brown fox jumps over the lazy dog.";
let timer;
let startTime;
let correctWordsCount = 0;

// Initialize the test
function init() {
    inputField.value = '';
    correctWordsCount = 0;
    timeDisplay.textContent = '0';
    correctWordsDisplay.textContent = '0';
    wpmDisplay.textContent = '0';
    clearInterval(timer);
}

// Calculate words per minute
function calculateWPM() {
    const elapsedTimeInSeconds = (Date.now() - startTime) / 1000;
    const wordsTyped = inputField.value.trim().split(' ').length;
    const wpm = Math.round((wordsTyped / elapsedTimeInSeconds) * 60);
    return wpm;
}

// Update stats
function updateStats() {
    const words = inputField.value.trim().split(' ');
    correctWordsCount = words.filter(word => quote.includes(word)).length;
    correctWordsDisplay.textContent = correctWordsCount;
    wpmDisplay.textContent = calculateWPM();
}

// Start the test
function startTest() {
    startTime = Date.now();
    timer = setInterval(() => {
        const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
        timeDisplay.textContent = elapsedTimeInSeconds;
        updateStats();
    }, 1000);
}

// Event listeners
resetBtn.addEventListener('click', init);
inputField.addEventListener('input', () => {
    if (!timer) startTest();
    updateStats();
});

// Initialize the test
init();
