document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.querySelector("form");
    const nameField = form.querySelector(".name");
    const nameInput = nameField.querySelector("input");
    const emailField = form.querySelector(".email");
    const emailInput = emailField.querySelector("input");
    const passwordField = form.querySelector(".password");
    const passwordInput = passwordField.querySelector("input");
    const confirmPasswordField = form.querySelector(".confirm-password");
    const confirmPasswordInput = confirmPasswordField.querySelector("input");
    const submitBtn = form.querySelector('input[type="submit"]');
    const loginLink = document.querySelector('.sign-txt a');

    // Success message elements
    const successMessage = document.getElementById("successMessage");
    const overlay = document.getElementById("overlay");

    // Create loader element
    const loader = createLoader();
    document.body.appendChild(loader);

    // Form submission handler
    form.onsubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                showLoader(submitBtn, "Creating account...");
                
                // Simulate API call (replace with actual signup logic)
                await simulateApiCall(2000);
                
                hideLoader(submitBtn, "Sign Up");
                showSuccessMessage();
            } catch (error) {
                hideLoader(submitBtn, "Sign Up");
                alert("Signup failed. Please try again.");
            }
        }
    };

    // Login link handler
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoader(null, "Redirecting to login...");
            
            setTimeout(() => {
                window.location.href = this.href;
            }, 1500);
        });
    }

    // Helper functions
    function createLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p class="loader-text">Processing your request...</p>
            </div>
        `;
        return loader;
    }

    function showLoader(button, message) {
        const loaderText = loader.querySelector('.loader-text');
        if (message) loaderText.textContent = message;
        
        loader.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        if (button) {
            button.disabled = true;
            button.value = message || "Processing...";
        }
    }

    function hideLoader(button, defaultText) {
        loader.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        if (button) {
            button.disabled = false;
            button.value = defaultText || "Submit";
        }
    }

    function simulateApiCall(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    function validateForm() {
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === "") {
            showError(nameField, "Name can't be blank");
            isValid = false;
        } else if (nameInput.value.length < 3) {
            showError(nameField, "Name must be at least 3 characters");
            isValid = false;
        } else {
            removeError(nameField);
        }

        // Email validation
        if (emailInput.value.trim() === "") {
            showError(emailField, "Email can't be blank");
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailField, "Enter a valid email address");
            isValid = false;
        } else {
            removeError(emailField);
        }

        // Password validation
        if (passwordInput.value.trim() === "") {
            showError(passwordField, "Password can't be blank");
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordField, "Password must be at least 6 characters");
            isValid = false;
        } else {
            removeError(passwordField);
        }

        // Confirm password validation
        if (confirmPasswordInput.value.trim() === "") {
            showError(confirmPasswordField, "Please confirm your password");
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordField, "Passwords don't match");
            isValid = false;
        } else {
            removeError(confirmPasswordField);
        }

        return isValid;
    }

    function showError(field, message) {
        field.classList.add("error");
        field.querySelector(".error-txt").textContent = message;
    }

    function removeError(field) {
        field.classList.remove("error");
    }

    function validateEmail(email) {
        const re = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        return re.test(email);
    }

    function showSuccessMessage() {
        overlay.style.display = "block";
        successMessage.style.display = "block";
    }

    window.hideSuccessMessage = function() {
        overlay.style.display = "none";
        successMessage.style.display = "none";
        form.reset();
    };

    // Real-time validation
    nameInput.addEventListener('input', () => validateName());
    emailInput.addEventListener('input', () => validateEmailField());
    passwordInput.addEventListener('input', () => validatePassword());
    confirmPasswordInput.addEventListener('input', () => validateConfirmPassword());

    function validateName() {
        if (nameInput.value.length < 3 && nameInput.value.length > 0) {
            showError(nameField, "Name must be at least 3 characters");
        } else if (nameInput.value.length >= 3) {
            removeError(nameField);
        }
    }

    function validateEmailField() {
        if (emailInput.value.length > 0 && !validateEmail(emailInput.value)) {
            showError(emailField, "Enter a valid email address");
        } else if (validateEmail(emailInput.value)) {
            removeError(emailField);
        }
    }

    function validatePassword() {
        if (passwordInput.value.length > 0 && passwordInput.value.length < 6) {
            showError(passwordField, "Password must be at least 6 characters");
        } else if (passwordInput.value.length >= 6) {
            removeError(passwordField);
        }
    }

    function validateConfirmPassword() {
        if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordField, "Passwords don't match");
        } else if (confirmPasswordInput.value === passwordInput.value && passwordInput.value.length >= 6) {
            removeError(confirmPasswordField);
        }
    }
});