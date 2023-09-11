const clear = document.querySelector('#clear');
const sign = document.querySelector('#sign');
const perct = document.querySelector('#perct');
const del = document.querySelector('#del');

const input = document.querySelector('#input');
const prev = document.querySelector('#prev');

const exp = [];
const peek = () => { return exp[exp.length-1]; }

const operts = document.querySelectorAll('.opert');
for (let opert of operts) {
    opert.addEventListener('click', () => {
        opert.classList.add('btnClickOpert');
        for (let otherOpert of operts) {
            if (otherOpert != opert) otherOpert.classList.remove('btnClickOpert');
        }
        if (input.innerText != '') {
            exp.push(parseFloat(input.innerText));
            input.innerText = '';
            prev.innerText = exp.join(' ');
            clear.innerText = 'AC';
        }
        else if (peek() == '+' || peek() == '-' || peek() == 'x' || peek() == '/' || peek() == '%') exp.pop();//opert overriding
        exp.push(opert.innerText);
    })
}

const btns = document.querySelectorAll('.btn');
for (let btn of btns) {
    if (btn.classList.contains('opert')) continue;
    btn.addEventListener('click', () => {
        for (let opert of operts) {
            opert.classList.remove('btnClickOpert');
        }
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

perct.addEventListener('click', () => {
    input.innerText = (Number.parseFloat(input.innerText)/100).toString();
})

equal.addEventListener('click', () => {
    clear.innerText = 'AC';
    if (input.innerText != '') exp.push(parseFloat(input.innerText)); 
    else if (peek() == '+' || peek() == '-' || peek() == 'x' || peek() == '/' || peek() == '%') exp.pop();
    input.innerText = '';
    prev.innerText = exp.join(' ');
    input.innerText = operationSolver(exp);
})

del.addEventListener('click', () => {
    input.innerText = input.innerText.slice(0, -1);
})

clear.addEventListener('click', () => {
    if (clear.innerText == 'C') clear.innerText = 'AC';
    else exp.splice(0);

    input.innerText = '';
    prev.innerText = exp.join(' ');
})

operationSolver = (exp) => {
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == '/') {
            let a = exp[i-1];
            let b = exp[i+1];
            let newNum = a/b;
            exp[i-1] = newNum;
            exp.splice(i, 2);
        }
    }
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == 'x') {
            let a = exp[i-1];
            let b = exp[i+1];
            let newNum = a*b;
            exp[i-1] = newNum;
            exp.splice(i, 2);
        }
    }
    let ans = exp[0];
    for (let i = 1; i < exp.length; i += 2) {
        if (exp[i] == '+') ans += exp[i+1];
        else ans -= exp[i+1];//subtract (-)
    }
    exp.splice(0, exp.length);
    return formatAns(ans);
}

formatAns = (ans) => {
    const decimalDigits = ans.toString().split('.')[1];
    if (decimalDigits && decimalDigits.length > 6) return ans.toFixed(6);
    else return ans;
}