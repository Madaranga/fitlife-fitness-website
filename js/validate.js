/* Simple, readable email pattern - good enough for client-side checks */
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(fieldWrapper, errorEl, message) {
  fieldWrapper.classList.add('has-error');
  errorEl.textContent = message;
  errorEl.classList.add('show');
}

function clearError(fieldWrapper, errorEl) {
  fieldWrapper.classList.remove('has-error');
  errorEl.textContent = '';
  errorEl.classList.remove('show');
}

function showFormMessage(el, message, type) {
  el.textContent = message;
  el.className = 'form-message ' + type;
}

document.addEventListener('DOMContentLoaded', function () {

  /* =====================================================
     REGISTRATION FORM (register.html)
     Three mandatory-validated fields (JavaScript only):
       1. Full Name        - text input, must not be empty
       2. Email Address     - email input, must match a valid format
       3. Plan Duration      - radio group, one option must be chosen
     ===================================================== */
  var registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var isValid = true;

      /* 1. Full Name */
      var nameWrap = document.getElementById('fullNameField');
      var nameInput = document.getElementById('fullName');
      var nameError = document.getElementById('fullNameError');
      if (nameInput.value.trim() === '') {
        showError(nameWrap, nameError, 'Please enter your full name.');
        isValid = false;
      } else {
        clearError(nameWrap, nameError);
      }

      /* 2. Email Address */
      var emailWrap = document.getElementById('emailField');
      var emailInput = document.getElementById('emailAddress');
      var emailError = document.getElementById('emailError');
      if (emailInput.value.trim() === '') {
        showError(emailWrap, emailError, 'Please enter your email address.');
        isValid = false;
      } else if (!EMAIL_PATTERN.test(emailInput.value.trim())) {
        showError(emailWrap, emailError, 'Please enter a valid email address (e.g. name@example.com).');
        isValid = false;
      } else {
        clearError(emailWrap, emailError);
      }

      /* 3. Plan Duration (radio group) */
      var durationWrap = document.getElementById('durationField');
      var durationError = document.getElementById('durationError');
      var durationChosen = document.querySelector('input[name="duration"]:checked');
      if (!durationChosen) {
        showError(durationWrap, durationError, 'Please select a plan duration.');
        isValid = false;
      } else {
        clearError(durationWrap, durationError);
      }

      var messageBox = document.getElementById('registerMessage');

      if (isValid) {
        showFormMessage(messageBox, 'Registration submitted successfully! Our trainers will contact you shortly.', 'success');
        registerForm.reset();
      } else {
        showFormMessage(messageBox, 'Please fix the highlighted fields before submitting.', 'error');
      }
    });
  }

  /* MINI CONTACT FORM (about.html)*/
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var isValid = true;

      var nameWrap = document.getElementById('contactNameField');
      var nameInput = document.getElementById('contactName');
      var nameError = document.getElementById('contactNameError');
      if (nameInput.value.trim() === '') {
        showError(nameWrap, nameError, 'Please enter your name.');
        isValid = false;
      } else {
        clearError(nameWrap, nameError);
      }

      var emailWrap = document.getElementById('contactEmailField');
      var emailInput = document.getElementById('contactEmail');
      var emailError = document.getElementById('contactEmailError');
      if (emailInput.value.trim() === '') {
        showError(emailWrap, emailError, 'Please enter your email address.');
        isValid = false;
      } else if (!EMAIL_PATTERN.test(emailInput.value.trim())) {
        showError(emailWrap, emailError, 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError(emailWrap, emailError);
      }

      var messageBox = document.getElementById('contactMessageBox');

      if (isValid) {
        showFormMessage(messageBox, 'Message sent! Our support desk will reply within 24 hours.', 'success');
        contactForm.reset();
      } else {
        showFormMessage(messageBox, 'Please fix the highlighted fields before submitting.', 'error');
      }
    });
  }

});
