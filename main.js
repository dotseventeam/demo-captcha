let modal = document.querySelector('.captcha-modal');
let login = document.getElementById('login-btn');
let submit = document.getElementById('captcha-submit');
let successPage = 'http://127.0.0.1:5500/logged.html';

function showCaptcha() {
    modal.classList.add('is-active');
};

function loginSuccess() {
    window.location.replace(successPage);
}

function loginFailed() {
    console.log('login failed');
}

function validateCaptcha() {
    let answers = [true, true]; // replace with real answers
    if (answers[0] && answers[1]) { // change conditions
        loginSuccess();
    } else {
        loginFailed();
    }
};

login.addEventListener('click', showCaptcha);
submit.addEventListener('click', validateCaptcha);