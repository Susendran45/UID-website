const form = document.querySelector("form");
const nField = form.querySelector(".fullname");
const nInput = nField.querySelector("input");
const eField = form.querySelector(".email");
const eInput = eField.querySelector("input");
const pField = form.querySelector(".password");
const pInput = pField.querySelector("input");
const cField = form.querySelector(".confirm-password");
const cInput = cField.querySelector("input");
const MIN_PASSWORD_LENGTH = 6;

form.onsubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (nInput.value.trim() === "") {
        nField.querySelector(".error-txt").style.display = "block";
        isValid = false;
    } else {
        nField.querySelector(".error-txt").style.display = "none";
    }

    if (eInput.value.trim() === "") {
        eField.querySelector(".error-txt").style.display = "block";
        isValid = false;
    } else if (!checkEmail()) {
        eField.querySelector(".error-txt").textContent = "Enter a valid email address";
        eField.querySelector(".error-txt").style.display = "block";
        isValid = false;
    } else {
        eField.querySelector(".error-txt").style.display = "none";
    }

    if (pInput.value.trim() === "") {
        pField.querySelector(".error-txt").style.display = "block";
        isValid = false;
    } else if (pInput.value.length < MIN_PASSWORD_LENGTH) {
        pField.querySelector(".error-txt").textContent = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
        pField.querySelector(".error-txt").style.display = "block";
        isValid = false;
    } else {
        pField.querySelector(".error-txt").style.display = "none";
    }

    if (cInput.value.trim() === "") {
        cField.querySelector(".error-txt").textContent = "Please confirm your password";
        cField.querySelector(".error-txt").style.display = "block";
        isValid = false;
    } else if (cInput.value !== pInput.value) {
        cField.querySelector(".error-txt").textContent = "Passwords don't match";
        cField.querySelector(".error-txt").style.display = "block";
        isValid = false;
    } else {
        cField.querySelector(".error-txt").style.display = "none";
    }

    if (isValid) {
        window.location.href = "payment.html";
    }
};

function checkEmail() {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return eInput.value.match(pattern);
}
