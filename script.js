let currentInput = '';

const resultLabel = document.getElementById('resultLabel');
const numberButtons = document.querySelectorAll('.btn-number');
const operationButtons = document.querySelectorAll('button.btn-oper:not([id])');

const equalButton = document.getElementById('btnEqual');
const dotButton = document.getElementById('btnDot');
const cButton = document.getElementById('btnC');
const cEButton = document.getElementById('btnCE');

let errorState = false;

cButton.addEventListener('click', pressC);
cEButton.addEventListener('click', pressCE);
equalButton.addEventListener('click', pressEqual);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        pressNumber(button.innerText);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        pressOperator(button.innerText);
    });
});

function updateResult() {
    resultLabel.innerText = currentInput;
}

const setError = () => action(() => {
    currentInput = 'Error';
    errorState = true;
});

function action(callback) {
    if (errorState) {
        currentInput = '';
        errorState = false;
    }
    callback();
    updateResult();
}

const pressNumber = num => action(() => currentInput += num);
const pressOperator = operator => action(() => currentInput += ` ${operator} `);

function pressEqual() {
    try {
        const result = eval(currentInput);
        if (result) action(() => currentInput = String(result));
        else setError();
    } catch (error) {
        setError();
    }
}

function pressC() {
    action(() => currentInput = '');
}

function pressCE() {
    if (currentInput.endsWith(" ")) action(() => currentInput = currentInput.slice(0, -2))
    action(() => currentInput = currentInput.slice(0, -1))
}