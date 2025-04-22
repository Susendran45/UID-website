const MIN_ZIP_LENGTH = 4;
const qrPayBtn = document.getElementById('qrPayBtn');
const successMessage = document.getElementById('qrSuccessMessage');

qrPayBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('name');
    const nameError = nameInput.nextElementSibling;
    if (nameInput.value.trim() === '') {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    const emailInput = document.getElementById('email');
    const emailError = emailInput.nextElementSibling;
    if (emailInput.value.trim() === '') {
        emailError.textContent = "Email can't be blank";
        emailError.style.display = 'block';
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = "Enter a valid email address";
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    const addressInput = document.getElementById('address');
    const addressError = addressInput.nextElementSibling;
    if (addressInput.value.trim() === '') {
        addressError.style.display = 'block';
        isValid = false;
    } else {
        addressError.style.display = 'none';
    }

    const cityInput = document.getElementById('city');
    const cityError = cityInput.nextElementSibling;
    if (cityInput.value.trim() === '') {
        cityError.style.display = 'block';
        isValid = false;
    } else {
        cityError.style.display = 'none';
    }

    const zipInput = document.getElementById('zip');
    const zipError = zipInput.nextElementSibling;
    if (zipInput.value.trim() === '') {
        zipError.textContent = "Zip code can't be blank";
        zipError.style.display = 'block';
        isValid = false;
    } else if (!validateZip(zipInput.value)) {
        zipError.textContent = `Zip code must be at least ${MIN_ZIP_LENGTH} digits`;
        zipError.style.display = 'block';
        isValid = false;
    } else {
        zipError.style.display = 'none';
    }

    if (isValid) {
        qrPayBtn.style.display = 'none';
        successMessage.style.display = 'block';
    }
});

function validateEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email);
}

function validateZip(zip) {
    return zip.length >= MIN_ZIP_LENGTH && /^\d+$/.test(zip);
}
