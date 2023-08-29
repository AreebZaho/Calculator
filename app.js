const equal = document.querySelector('#equal');
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const mult = document.querySelector('#mult');
const div = document.querySelector('#div');

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
        opert.classList.add('btnClick');//added perma shine to operators until another button pressed
        for (let otherOpert of operts) {//other operts shine removed
            if (otherOpert != opert) otherOpert.classList.remove('btnClick');
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
    if (btn.classList.contains('opert')) continue;//not applying quick flash on operators
    btn.addEventListener('click', () => {
        //remove shining from operator
        for (let opert of operts) {
            opert.classList.remove('btnClick');
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

equal.addEventListener('click', () => {
    clear.innerText = 'AC';
    if (input.innerText != '') exp.push(parseFloat(input.innerText)); 
    else if (peek() == '+' || peek() == '-' || peek() == 'x' || peek() == '/' || peek() == '%') exp.pop();
    input.innerText = '';
    prev.innerText = exp.join(' ');
    console.log(exp);

    let ans = operationSolver(exp);
    exp.splice(0, exp.length);//emptying expression array
    exp.push(ans);
    input.innerText = ans;
    console.log(ans);

})

del.addEventListener('click', () => {
    input.innerText = input.innerText.slice(0, -1);
})

clear.addEventListener('click', () => {
    if (clear.innerText == 'C') {
        input.innerText = '';
        clear.innerText = 'AC';
    }
    else exp.splice(0);
    prev.innerText = exp.join(' ');
})

operationSolver = (exp) => {
    let div = [];
    //resolving divides
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] != '/') div.push(exp[i]);
        else {
            let a = div[div.length-1];
            let b = exp[i+1];
            let newNum = a/b;
            div[div.length-1] = newNum;
            i++;
        }
    }
    console.log(div);
    //resolving multiply
    let mult = [];
    for (let i = 0; i < div.length; i++) {
        if (div[i] != 'x') mult.push(div[i]);
        else {
            let a = mult[mult.length-1];
            let b = div[i+1];
            let newNum = a*b;
            mult[mult.length-1] = newNum;
            i++;
        }
    }
    console.log(mult);
    //resolving + and -
    let ans = mult[0];
    for (let i = 1; i < mult.length-1; i += 2) {
        if (mult[i] == '+') ans += mult[i+1];
        else ans -= mult[i+1];//subtract (-)
    }
    // console.log(ans);
    return ans;
}


