document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    
    [nameError, emailError, messageError].forEach(error => {
        error.style.display = "none";
    });

    let isValid = true;

    if (nameInput.value.trim() === "") {
        nameError.textContent = "Name cannot be blank";
        nameError.style.display = "block";
        isValid = false;
    }

    if (emailInput.value.trim() === "") {
        emailError.textContent = "Email cannot be blank";
        emailError.style.display = "block";
        isValid = false;
    } else if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailInput.value)) {
        emailError.textContent = "Enter a valid email address";
        emailError.style.display = "block";
        isValid = false;
    }

    if (messageInput.value.trim() === "") {
        messageError.textContent = "Message cannot be blank";
        messageError.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("successMessage").style.display = "block";
        document.getElementById("contactForm").reset();
        setTimeout(() => {
            document.getElementById("successMessage").style.display = "none";
        }, 3000);
    }
});

document.querySelectorAll("#contactForm input, #contactForm textarea").forEach(element => {
    element.addEventListener("invalid", e => e.preventDefault());
});
