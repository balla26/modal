// Get the email input field
const emailInput = document.querySelector('.otp-card input[type="email"]');

// Get the "Next" button
const nextButton2 = document.getElementById('nextButton2');

// Event listener for the email input field
emailInput.addEventListener('input', () => {
  if (isValidEmail(emailInput.value)) {
    nextButton2.removeAttribute('disabled');
  } else {
    nextButton2.setAttribute('disabled', true);
  }
});

// Function to validate email address using regular expression
function isValidEmail(email) {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Function to handle next button click
nextButton2.addEventListener('click', function() {
  // Hide the current section
  var currentSection = document.querySelector('.otp-card');
  currentSection.style.display = 'none';
  var exclamationIcon = document.querySelector('.modal-circle i.fa-circle-exclamation');
  exclamationIcon.style.display = 'none';

  // Show the OTP verification section
  var otpVerificationSection = document.getElementById('otpVerificationCard2');
  otpVerificationSection.style.display = 'block';
  var checkIcon = document.querySelector('.modal-circle i.fa-circle-check');
  checkIcon.style.display = 'block';
  var circleCheck2 = document.getElementById('circleCheck2');
  circleCheck2.style.display = 'block';

  // Autofocus on the first OTP input field
  var firstOTPInput = document.querySelector('#otpVerificationCard2 .otp-card-inputs input');
  firstOTPInput.focus();

  // Event listener for the OTP input fields
  const otpInputs = document.querySelectorAll('#otpVerificationCard2 .otp-card-inputs input');
  for (let i = 0; i < otpInputs.length; i++) {
    const currentInput = otpInputs[i];
    currentInput.addEventListener('input', () => {
      handleInput(currentInput, otpInputs, i);
    });
    currentInput.addEventListener('keydown', (event) => {
      handleBackspace(event, currentInput, otpInputs, i);
    });
  }

  // Function to handle input in OTP input fields
  function handleInput(input, inputs, currentIndex) {
    const inputValue = input.value;
    const isValidDigit = /^\d$/.test(inputValue);

    if (isValidDigit) {
      if (inputValue !== '') {
        input.value = inputValue.slice(-1); // Only keep the last digit
      }

      if (currentIndex < inputs.length - 1 && inputValue !== '') {
        inputs[currentIndex + 1].focus(); // Move focus to the next input field
      }
    } else {
      input.value = ''; // Clear the input if it's not a valid digit
    }

    checkSubmitButtonState();
  }

  // Function to handle backspace key in OTP input fields
  function handleBackspace(event, input, inputs, currentIndex) {
    if (event.key === 'Backspace' && input.value === '') {
      if (currentIndex > 0) {
        inputs[currentIndex - 1].focus(); // Move focus to the previous input field
      }
    }

    checkSubmitButtonState();
  }

  // Function to check the state of the submit button
  function checkSubmitButtonState() {
    const otpValues = Array.from(otpInputs).map((input) => input.value);
    const isAllDigitsEntered = otpValues.every((value) => value.length === 1);
    const submitButton = document.getElementById('verifyButton2');
    if (isAllDigitsEntered) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', true);
    }
  }

  // Initial check for the submit button state
  checkSubmitButtonState();
});
