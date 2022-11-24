let modal = document.querySelector('.captcha-modal');
let login = document.getElementById('login-btn');
let submit = document.getElementById('captcha-submit');
let successPage = 'http://127.0.0.1:5500/logged.html';

// let user = document.forms['login-form']['username'].value;
// let password = document.forms['login-form']['password'].value;

let img = document.querySelector('.captcha-img');
let opt1 = document.getElementById('captcha-opt-label-1');
let opt2 = document.getElementById('captcha-opt-label-2');
let opt3 = document.getElementById('captcha-opt-label-3');
let opt4 = document.getElementById('captcha-opt-label-4');

let rightAnswers = [];
let wrongAnswers = [];

let dataset = [
    {
        src: '/res/1.png',
        firstAns: 'Canguro',
        secondAns: 'Mela',
        wrongAns1: 'Pallone',
        wrongAns2: 'Incendio',
    },
    {
        src: '/res/2.png',
        firstAns: 'Cane',
        secondAns: 'Chitarra',
        wrongAns1: 'Trottola',
        wrongAns2: 'Scimpanzè',
    },
    {
        src: '/res/3.png',
        firstAns: 'Barca',
        secondAns: 'Martello',
        wrongAns1: 'Zanzara',
        wrongAns2: 'Aeroplano',
    },
    {
        src: '/res/4.png',
        firstAns: 'Ponte',
        secondAns: 'Rosa',
        wrongAns1: 'Bastone',
        wrongAns2: 'Onda',
    }
];


function showCaptcha() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (username != '' && username != null && password != '' && password != null) {
        generateCaptcha();
        modal.classList.add('is-active');
    }
    else alert('Inserisci uno username ed una password.');
};

function generateCaptcha() {
    let rand = Math.floor(Math.random() * dataset.length);
    let pickedImg = dataset[rand];
    img.src = pickedImg.src;
    let options = [pickedImg.firstAns, pickedImg.secondAns, pickedImg.wrongAns1, pickedImg.wrongAns2];

    // bruttissimo, refactoring necessario
    rand = Math.floor(Math.random() * options.length);
    opt1.innerText = options[rand];
    if (opt1.innerText == pickedImg.firstAns || opt1.innerText == pickedImg.secondAns) {
        rightAnswers.push('captcha-opt-1');
    } else {
        wrongAnswers.push('captcha-opt-1');
    }
    options.splice(rand, 1);

    rand = Math.floor(Math.random() * options.length);
    opt2.innerText = options[rand];
    if (opt2.innerText == pickedImg.firstAns || opt2.innerText == pickedImg.secondAns) {
        rightAnswers.push('captcha-opt-2');
    } else {
        wrongAnswers.push('captcha-opt-2');
    }
    options.splice(rand, 1);

    rand = Math.floor(Math.random() * options.length);
    opt3.innerText = options[rand];
    if (opt3.innerText == pickedImg.firstAns || opt3.innerText == pickedImg.secondAns) {
        rightAnswers.push('captcha-opt-3');
    } else {
        wrongAnswers.push('captcha-opt-3');
    }
    options.splice(rand, 1);

    opt4.innerText = options[0];
    if (opt4.innerText == pickedImg.firstAns || opt4.innerText == pickedImg.secondAns) {
        rightAnswers.push('captcha-opt-4');
    } else {
        wrongAnswers.push('captcha-opt-4');
    }
}

function loginSuccess() {
    window.location.replace(successPage);
}

function loginFailed() {
    document.getElementById('captcha-opt-1').checked = false;
    document.getElementById('captcha-opt-2').checked = false;
    document.getElementById('captcha-opt-3').checked = false;
    document.getElementById('captcha-opt-4').checked = false;
    alert('Verifica fallita! Riprovare.');
    generateCaptcha();
}

function validateCaptcha() {
    console.log('click');
    if (
        document.getElementById(rightAnswers[0]).checked == true
        && document.getElementById(rightAnswers[1]).checked == true) {
        if (document.getElementById(wrongAnswers[0]).checked == false
            && document.getElementById(wrongAnswers[1]).checked == false) { // change conditions
            rightAnswers = [];
            wrongAnswers = [];
            return loginSuccess();
        }

    }
    rightAnswers = [];
    wrongAnswers = [];
    return loginFailed();

};

login.addEventListener('click', showCaptcha);
submit.addEventListener('click', validateCaptcha);