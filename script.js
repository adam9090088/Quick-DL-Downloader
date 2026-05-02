let display = document.getElementById('display');
let currentValue = '';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = '';
        shouldResetDisplay = false;
    }

    if (num === '.' && currentValue.includes('.')) return;
    if (currentValue === '0' && num !== '.') {
        currentValue = num;
    } else {
        currentValue += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentValue === '' && previousValue === '') return;

    if (previousValue !== '' && currentValue !== '' && operator) {
        calculateResult();
    }

    operator = op;
    previousValue = currentValue;
    currentValue = '';
    shouldResetDisplay = true;
}

function calculateResult() {
    if (!operator || previousValue === '' || currentValue === '') return;

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 0;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = null;
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentValue = '';
    previousValue = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLastChar() {
    currentValue = currentValue.toString().slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = currentValue || '0';
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-') {
        appendOperator(e.key);
    } else if (e.key === '*') {
        e.preventDefault();
        appendOperator('*');
    } else if (e.key === '/') {
        e.preventDefault();
        appendOperator('/');
    } else if (e.key === '%') {
        appendOperator('%');
    } else if (e.key === 'Enter') {
        e.preventDefault();
        calculateResult();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLastChar();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();