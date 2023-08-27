const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');
const point = document.querySelector('#point');

const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const mult = document.querySelector('#mult');
const div = document.querySelector('#div');
const equal = document.querySelector('#equal');

const clear = document.querySelector('#clear');
const sign = document.querySelector('#sign');
const perct = document.querySelector('#perct');

const input = document.querySelector('#input');
const prev = document.querySelector('#prev');


const btns = document.querySelectorAll('.btn');
for (let btn of btns) {
    btn.addEventListener('click', () => {
        btn.classList.add('btnClick');
        setTimeout(() => {
            btn.classList.remove('btnClick');
        }, 100);
    })
}

const nums = document.querySelectorAll('.num');
for (let num of nums) {
    num.addEventListener('click', () => {
        clear.innerText = 'C';
        if (num.innerText == '.' && input.innerText.includes('.')) return; 
        if (input.innerText == '' && num.innerText == '.') input.innerText = '0'; 
        input.innerText += num.innerText;
    })
}

sign.addEventListener('click', (e) => {
    if (input.innerText == '') e.preventDefault();
    else if (input.innerText[0] == '-') input.innerText = input.innerText.substring(1);
    else input.innerText = '-' + input.innerText;
})

const exp = [];
const peek = () => { return exp[exp.length-1]; }

const operts = document.querySelectorAll('.opert');
for (let opert of operts) {
    opert.addEventListener('click', () => {
        exp.push(parseFloat(input.innerText));
        input.innerText = "";
        clear.innerText = 'AC';
        exp.push(opert.innerText);
    })
}

equal.addEventListener('click', () => {
    clear.innerText = 'AC';
    if (input.innerText != '') exp.push(parseFloat(input.innerText)); 
    else if (peek() == '+' || peek() == '-' || peek() == 'x' || peek() == '/' || peek() == '%') exp.pop();
    input.innerText = '';
    console.log(exp);

})

clear.addEventListener('click', () => {
    if (clear.innerText == 'C') {
        input.innerText = '';
        clear.innerText = 'AC';
    }
    else if (clear.innerText == 'AC') exp.splice(0);
})












