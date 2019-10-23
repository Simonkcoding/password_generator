// DOM
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// generate event listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbol, length);
})

// copy chipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    if (!password){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('copied!');
})

// generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. initialize pw var
    // 2. filter out unchecked type
    // 3. loop over length call generator function for each type
    // 4. add final password to pw var and return

    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item =>
        Object.values(item)[0]
    );

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]; //upper,lower,number,symbol

            generatedPassword += randomFunc[funcName](); //invoke the values functions
        })
    }

    return generatedPassword.slice(0, length);
}

// generator function

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// const getRandomLower = () => {
//     return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
// }

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}=-_+';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
